import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const securityHeadersPlugin = {
  name: 'security-headers',
  configureServer(server: any) {
    server.middlewares.use((_req: any, res: any, next: any) => {
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; base-uri 'self'; form-action 'self' https://wa.me; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests;"
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
        "default-src 'self'; base-uri 'self'; form-action 'self' https://wa.me; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self'; connect-src 'self' https:; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests;"
      );
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      next();
    });
  },
};

export default defineConfig({
  base: './',
  plugins: [react(), securityHeadersPlugin],
  /* 2 páginas iniciais: PT-BR (raiz) e EN (/en/) */
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        en: 'en/index.html',
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
});
