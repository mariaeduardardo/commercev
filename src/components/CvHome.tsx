import React, { useCallback, useEffect, useRef, useState } from 'react';
import './mobile-menu.css';
import './cap.css';
import { ARTE, HERO_HS, WPP, rota, t } from '../i18n';

/*
  Página inicial idêntica aos designs aprovados.
  As artes ficam em public/cv/ e os botões são áreas clicáveis invisíveis
  posicionadas em % sobre cada imagem (funcionam em qualquer largura).
  Para mudar um link, edite o "href" na lista da seção correspondente.
*/


type Hotspot = { label: string; href: string; x1: number; y1: number; x2: number; y2: number };

/* Desenha as áreas clicáveis. w/h = tamanho original da arte em pixels. */
const Hotspots: React.FC<{ w: number; h: number; items: Hotspot[] }> = ({ w, h, items }) => (
  <>
    {items.map((it, i) => {
      const external = it.href.startsWith('http');
      return (
        <a
          key={i}
          href={it.href}
          aria-label={it.label}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="absolute block rounded-full transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#ff861a]"
          style={{
            left: `${(it.x1 / w) * 100}%`,
            top: `${(it.y1 / h) * 100}%`,
            width: `${((it.x2 - it.x1) / w) * 100}%`,
            height: `${((it.y2 - it.y1) / h) * 100}%`,
          }}
        />
      );
    })}
  </>
);

/* GIF transparente de 1x1: a versão escondida (celular ou computador) não baixa a imagem */
const VAZIO = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const SIZES = '(max-width: 1600px) 100vw, 1600px';

const Arte: React.FC<{
  src: string; alt: string; w: number; h: number; eager?: boolean; children?: React.ReactNode;
  /* 'desk' = só aparece acima de 760px; 'mob' = só até 760px */
  only: 'desk' | 'mob';
  srcSet?: string;
}> = ({ src, alt, w, h, eager, children, only, srcSet }) => (
  <div className="relative leading-[0]">
    <picture>
      <source media={only === 'desk' ? '(max-width: 760px)' : '(min-width: 761px)'} srcSet={VAZIO} />
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? SIZES : undefined}
        alt={alt}
        width={w}
        height={h}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...(eager ? { fetchpriority: 'high' } : {})}
        className="block h-auto w-full"
      />
    </picture>
    {children}
  </div>
);

const Ic: React.FC<{ d: React.ReactNode }> = ({ d }) => (
  <span className="mm-ic">
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  </span>
);
const Seta = () => (
  <svg className="mm-seta" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
);

const MenuCelular: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const painel = useRef<HTMLElement>(null);
  const fechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fechar.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && painel.current) {
        const f = painel.current.querySelectorAll<HTMLElement>('button, a[href]');
        const p = f[0], u = f[f.length - 1];
        if (e.shiftKey && document.activeElement === p) { e.preventDefault(); u.focus(); }
        else if (!e.shiftKey && document.activeElement === u) { e.preventDefault(); p.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; };
  }, [onClose]);

  const itens = [
    { href: '#inicio', label: t.menu[0], d: <><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /></>, atual: true },
    { href: '#servicos', label: t.menu[1], d: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></> },
    { href: '#como-funciona', label: t.menu[2], d: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h6a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8" /></> },
    { href: '#faq', label: t.menu[3], d: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7" /><path d="M12 17h.01" /></> },
  ];

  return (
    <div className="img-menu" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="mm-fundo" onClick={onClose} />
      <nav className="mm-painel" aria-label={t.menuAria} ref={painel}>
        <div className="mm-topo">
          <img src="/cv/logo.webp" alt="Commerce Visual" width={380} height={121} />
          <button type="button" className="mm-fechar" aria-label={t.fecharMenu} onClick={onClose} ref={fechar}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <ul className="mm-lista">
          {itens.map((it) => (
            <li key={it.label}>
              <a href={it.href} aria-current={it.atual ? 'page' : undefined} onClick={onClose}>
                <Ic d={it.d} />{it.label}<Seta />
              </a>
            </li>
          ))}
        </ul>
        <a href="https://www.instagram.com/commercevisual/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Commerce Visual" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, margin: '12px 0 0 4px', fontWeight: 600 }}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /></svg>Instagram @commercevisual</a>
        <img className="mm-mascote" src="/cv/mascote.webp" alt="" aria-hidden="true" width={432} height={405} loading="lazy" decoding="async" />
        <a className="mm-cta" href={WPP} target="_blank" rel="noopener noreferrer">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm4.5 11.96c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03 4.75 4.75 0 0 0 1 2.52 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" /></svg>
          {t.conversar}
        </a>
      </nav>
    </div>
  );
};

export const CvHero: React.FC = () => {
  const [open, setOpen] = useState(false);
  const fecharMenu = useCallback(() => setOpen(false), []);

  return (
    <header id="inicio" className="bg-[#ffe94d]">
      {/* Texto para Google e leitores de tela (a arte é imagem) */}
      <h1 className="sr-only">{t.h1}</h1>

      {/* Desktop (acima de 760px) */}
      <div className="hidden min-[761px]:block">
        <div className="cv-cap" style={{ ['--cap-bg' as string]: `url('${ARTE.heroDesk}')`, ['--cap-bg-1440' as string]: `url('${ARTE.heroDesk1440}')` }}>
          <div className="cv-cap-in">
            <Arte only="desk" src={ARTE.heroDesk} srcSet={`${ARTE.heroDesk1000} 1000w, ${ARTE.heroDesk1440} 1440w, ${ARTE.heroDesk} 1600w`} alt={t.altHero} w={1672} h={940} eager>
              <Hotspots w={1672} h={940} items={[
                ...HERO_HS.menu.map((h, i) => ({ label: t.menu[i], href: ['#inicio', '#servicos', '#como-funciona', '#faq'][i], ...h })),
                { label: `${t.conversar} — WhatsApp`, href: WPP, x1: 1330, y1: 27, x2: 1620, y2: 88 },
                { label: t.querProjeto, href: WPP, x1: 66, y1: 694, x2: 418, y2: 766 },
                { label: t.conhecaServicos, href: '#servicos', ...HERO_HS.link },
              ]} />
            </Arte>
          </div>
        </div>
      </div>

      {/* Celular (até 760px) */}
      <div className="min-[761px]:hidden">
        <Arte only="mob" src={ARTE.heroMob} alt={t.altHero} w={750} h={1584} eager>
          <Hotspots w={863} h={1823} items={[
            { label: t.querProjeto, href: WPP, x1: 50, y1: 938, x2: 575, y2: 1038 },
            { label: t.conhecaServicos, href: '#servicos', ...HERO_HS.linkMob },
          ]} />
          {/* botão do menu (☰ da arte) */}
          <button
            type="button"
            aria-label={t.abrirMenu}
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="absolute rounded-xl focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ff861a]"
            style={{ left: `${(750 / 863) * 100}%`, top: `${(38 / 1823) * 100}%`, width: `${(64 / 863) * 100}%`, height: `${(58 / 1823) * 100}%` }}
          />
        </Arte>
      </div>

      {/* Menu do celular: painel lateral amarelo na identidade da marca */}
      {open && <MenuCelular onClose={fecharMenu} />}
    </header>
  );
};

export const CvSolucoes: React.FC = () => {
  const sv = t.serv;
  return (
  <section id="servicos" className="bg-[#eaf2ff]">
    {/* Texto das artes em HTML (o visitante vê a arte; Google, IAs e leitores de tela leem este texto) */}
    <div className="sr-only">
      <h2>{sv.h2}</h2>
      <ul>
        {sv.itens.map(([nome, chave, desc]) => (
          <li key={nome}>{chave ? <a href={rota(chave)}>{nome}</a> : nome}: {desc}</li>
        ))}
      </ul>
      <h3>{sv.h3a}</h3>
      <p>{sv.pa}</p>
      <h3>{sv.h3b}</h3>
      <p>{sv.pb}</p>
      <h3>{sv.h3c}</h3>
      <p>{sv.pc}</p>
      <p><a href={rota('custo')}>{sv.custo}</a></p>
    </div>

    <div className="hidden min-[761px]:block">
      <div className="cv-cap" style={{ ['--cap-bg' as string]: `url('${ARTE.servDesk}')` }}>
        <div className="cv-cap-in">
          <Arte only="desk" src={ARTE.servDesk} srcSet={`${ARTE.servDesk1000} 1000w, ${ARTE.servDesk} 1600w`} alt={t.altServ} w={1672} h={941}>
            <Hotspots w={1672} h={941} items={[
              { label: sv.criar, href: WPP, x1: 122, y1: 559, x2: 498, y2: 615 },
              { label: sv.possSites, href: WPP, x1: 128, y1: 858, x2: 350, y2: 902 },
              { label: sv.possSist, href: WPP, x1: 869, y1: 858, x2: 1110, y2: 902 },
            ]} />
          </Arte>
        </div>
      </div>
    </div>

    <div className="min-[761px]:hidden">
      <Arte only="mob" src={ARTE.servMob} alt={t.altServ} w={727} h={2164}>
        <Hotspots w={727} h={2164} items={[
          { label: sv.criar, href: WPP, x1: 54, y1: 930, x2: 506, y2: 990 },
          { label: sv.possSites, href: WPP, x1: 64, y1: 1596, x2: 280, y2: 1656 },
          { label: sv.possSist, href: WPP, x1: 64, y1: 1986, x2: 316, y2: 2046 },
        ]} />
      </Arte>
    </div>
  </section>
  );
};
