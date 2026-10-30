import { createHash } from 'node:crypto';
import { readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

const securityHeadersPlugin = {
  name: 'security-headers',
  configureServer(server: any) {
    server.middlewares.use((_req: any, res: any, next: any) => {
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; base-uri 'self'; form-action 'self' https://wa.me; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests;"
      );
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      next();
    });
  },
  configurePreviewServer(server: any) {
    server.middlewares.use((_req: any, res: any, next: any) => {
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; base-uri 'self'; form-action 'self' https://wa.me; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; script-src 'self'; connect-src 'self' https:; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests;"
      );
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      next();
    });
  },
};

const inlineEntryCssPlugin = {
  name: 'inline-entry-css',
  apply: 'build' as const,
  enforce: 'post' as const,
  generateBundle: {
    order: 'post' as const,
    handler(_options: unknown, bundle: Record<string, any>) {
      let html: any;
      for (const fileName in bundle) {
        const asset = bundle[fileName];
        if (asset.type === 'asset' && asset.fileName.endsWith('.html')) {
          html = asset;
          break;
        }
      }
      if (!html) return;

      const inlinedCss: string[] = [];
      html.source = String(html.source).replace(/<link\b(?=[^>]*\brel="stylesheet")[^>]*>/g, (link) => {
        const href = link.match(/\bhref="([^"]+\.css)"/)?.[1];
        if (!href) return link;

        const fileName = href.replace(/^(\.\/|\/)/, '');
        let asset: any;
        for (const bundleFileName in bundle) {
          const entry = bundle[bundleFileName];
          if (entry.type === 'asset' && entry.fileName === fileName) {
            asset = entry;
            break;
          }
        }
        if (!asset) return link;

        inlinedCss.push(fileName);
        return `<style>${String(asset.source)}</style>`;
      });

      for (const fileName of inlinedCss) delete bundle[fileName];
    },
  },
};

const minifyCopiedAssetsPlugin = {
  name: 'minify-copied-assets',
  apply: 'build' as const,
  async writeBundle(outputOptions: { dir?: string }) {
    const outputDir = resolve(outputOptions.dir || 'dist');
    const siteScriptPath = join(outputDir, 'site.js');
    const siteScript = await readFile(siteScriptPath, 'utf8');
    const minifiedScript = await transformWithEsbuild(siteScript, siteScriptPath, {
      loader: 'js',
      minify: true,
      target: 'es2020',
      legalComments: 'none',
    });
    await writeFile(siteScriptPath, minifiedScript.code);

    const htmlFiles: string[] = [];
    const collectHtmlFiles = async (directory: string): Promise<void> => {
      for (const entry of await readdir(directory, { withFileTypes: true })) {
        const filePath = join(directory, entry.name);
        if (entry.isDirectory()) await collectHtmlFiles(filePath);
        else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(filePath);
      }
    };

    await collectHtmlFiles(outputDir);
    for (const filePath of htmlFiles) {
      const html = await readFile(filePath, 'utf8');
      const styleTag = /<style\b([^>]*)>([\s\S]*?)<\/style>/gi;
      const matches: RegExpExecArray[] = [];
      let match: RegExpExecArray | null;
      while ((match = styleTag.exec(html)) !== null) matches.push(match);

      let minifiedHtml = html;
      for (const [fullTag, attributes, css] of matches) {
        const minifiedCss = await transformWithEsbuild(css, `${filePath}.css`, {
          loader: 'css',
          minify: true,
          target: 'es2020',
        });
        minifiedHtml = minifiedHtml.replace(fullTag, `<style${attributes}>${minifiedCss.code}</style>`);
      }

      if (minifiedHtml !== html) await writeFile(filePath, minifiedHtml);
    }

    const outputFiles: string[] = [];
    const collectOutputFiles = async (directory: string): Promise<void> => {
      for (const entry of await readdir(directory, { withFileTypes: true })) {
        const filePath = join(directory, entry.name);
        if (entry.isDirectory()) await collectOutputFiles(filePath);
        else if (entry.isFile()) outputFiles.push(filePath);
      }
    };
    await collectOutputFiles(outputDir);

    const hashedAssets: [string, string][] = [];
    for (const filePath of outputFiles) {
      const relativePath = relative(outputDir, filePath).split(sep).join('/');
      if (relativePath.startsWith('assets/')) continue;
      if (!/\.(?:png|jpe?g|gif|webp|svg|ico|woff2?|ttf|otf|js|css)$/i.test(relativePath)) continue;

      const extension = extname(relativePath);
      const baseName = relativePath.slice(0, -extension.length);
      if (/\.[a-f0-9]{12}$/.test(baseName)) continue;

      const content = await readFile(filePath);
      const hash = createHash('sha256').update(content).digest('hex').slice(0, 12);
      const hashedPath = `${baseName}.${hash}${extension}`;
      await rename(filePath, join(outputDir, hashedPath));
      hashedAssets.push([relativePath, hashedPath]);
    }

    const referenceFiles = outputFiles.filter((filePath) =>
      /\.(?:html|js|css|xml|json|txt|webmanifest)$/i.test(filePath),
    );
    for (const filePath of referenceFiles) {
      const original = await readFile(filePath, 'utf8').catch(() => null);
      if (original === null) continue;
      let updated = original;
      for (const [source, hashed] of hashedAssets) {
        updated = updated.replaceAll(source, hashed);
      }
      if (updated !== original) await writeFile(filePath, updated);
    }
  },
};

export default defineConfig(({ command }) => ({
  base: './',
  plugins: [react(), securityHeadersPlugin, inlineEntryCssPlugin, minifyCopiedAssetsPlugin],
  ...(command === 'build' ? { esbuild: { drop: ['console', 'debugger'] } } : {}),
  resolve: command === 'build' ? {
    alias: [
      { find: /^react-dom\/test-utils$/, replacement: 'preact/test-utils' },
      { find: /^react-dom\/client$/, replacement: 'preact/compat/client' },
      { find: /^react\/jsx-runtime$/, replacement: 'preact/jsx-runtime' },
      { find: /^react-dom$/, replacement: 'preact/compat' },
      { find: /^react$/, replacement: 'preact/compat' },
    ],
  } : undefined,
  /* página inicial PT-BR (raiz) */
  build: {
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      treeshake: true,
      input: {
        main: 'index.html',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    open: false,
  },
}));
