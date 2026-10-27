import React from 'react';
import './footer-mobile.css';

/*
  Rodapé idêntico ao design aprovado (arte única em public/cv/rodape.webp).
  Os links são áreas clicáveis invisíveis posicionadas em % sobre a arte.
  "Preferências de cookies" leva à seção de cookies da Política de Privacidade.
*/

const WPP = 'https://wa.me/554197580656';

type Hotspot = { label: string; href: string; x1: number; y1: number; x2: number; y2: number };

const LINKS: Hotspot[] = [
    { label: "Falar no WhatsApp", href: WPP, x1: 94, y1: 427, x2: 633, y2: 537 },
    { label: "Sites profissionais", href: "/sites-profissionais", x1: 1267, y1: 195, x2: 1726, y2: 266 },
    { label: "Lojas virtuais", href: "/lojas-virtuais", x1: 1267, y1: 284, x2: 1726, y2: 353 },
    { label: "Sistemas sob medida", href: "/sistemas-sob-medida", x1: 1267, y1: 369, x2: 1726, y2: 436 },
    { label: "Segurança digital", href: "/seguranca-digital", x1: 1267, y1: 454, x2: 1726, y2: 521 },
    { label: "Manutenção e suporte", href: "#servicos", x1: 1267, y1: 541, x2: 1726, y2: 610 },
    { label: "Sobre", href: "#como-funciona", x1: 223, y1: 841, x2: 336, y2: 890 },
    { label: "Projetos", href: "#servicos", x1: 223, y1: 909, x2: 369, y2: 957 },
    { label: "Política de Privacidade", href: "/politica-de-privacidade", x1: 223, y1: 976, x2: 602, y2: 1027 },
    { label: "Termos de Uso", href: "/termos-de-uso", x1: 223, y1: 1045, x2: 478, y2: 1095 },
    { label: "Preferências de cookies", href: "/politica-de-privacidade#cookies", x1: 223, y1: 1112, x2: 613, y2: 1164 },
    { label: "WhatsApp: +55 (41) 9758-0656", href: WPP, x1: 1069, y1: 819, x2: 1487, y2: 903 },
    { label: "E-mail: commercevisual@hotmail.com", href: "mailto:commercevisual@hotmail.com", x1: 1069, y1: 920, x2: 1661, y2: 1003 },
    { label: "Instagram: @commercevisual", href: "https://www.instagram.com/commercevisual/", x1: 1069, y1: 1019, x2: 1460, y2: 1107 },
];

const Parte: React.FC<{ src: string; w: number; h: number; items?: Hotspot[] }> = ({ src, w, h, items = [] }) => (
  <div className="relative leading-[0]">
    <img src={src} alt="" width={w} height={h} loading="lazy" className="block h-auto w-full" />
    {items.map((it, i) => {
      const external = it.href.startsWith('http');
      const cookies = false; // banner de cookies removido: o link leva à seção de cookies da Política
      return (
        <a
          key={i}
          href={it.href}
          aria-label={it.label}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...(cookies ? { 'data-cvc-open': '' } : {})}
          className="absolute block rounded-2xl transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#ff861a]"
          style={{
            left: `${(it.x1 / w) * 100}%`,
            top: `${(it.y1 / h) * 100}%`,
            width: `${((it.x2 - it.x1) / w) * 100}%`,
            height: `${((it.y2 - it.y1) / h) * 100}%`,
          }}
        />
      );
    })}
  </div>
);

export const Footer: React.FC = () => (
  <footer className="bg-[#fdea1c]">
    {/* Texto real para Google e leitores de tela (a arte é imagem) */}
    <div className="sr-only">
      <p>Commerce Visual — Sites, sistemas e segurança digital para o seu negócio.</p>
      <address>
        WhatsApp +55 (41) 9758-0656 · commercevisual@hotmail.com · Instagram @commercevisual ·
        Atendimento 100% online para todo o Brasil, Estados Unidos e Europa · Segunda a sexta, 9h às 18h (horário de Brasília)
      </address>
      <p>© {new Date().getFullYear()} Commerce Visual. Todos os direitos reservados. CNPJ: 68.961.224/0001-01.</p>
    </div>
    {/* Arte única: as 3 partes do design unidas, sem cortes */}
    {/* largura máxima de 1240px para não ocupar espaço demais em telas grandes */}
    <nav aria-label="Rodapé" className="cvf-desk mx-auto max-w-[1240px]">
      <Parte src="/cv/rodape.webp" w={2170} h={1587} items={LINKS} />
    </nav>

    {/* Versão celular (até 760px), feita em código */}
    <div className="cvf-m">
      <img className="cvf-m-logo" src="/cv/logo.webp" alt="Commerce Visual" width="520" height="165" loading="lazy" />
      <p className="cvf-m-slogan">Sites, sistemas e segurança digital para o seu negócio.</p>
      <a className="cvf-m-btn" href="https://wa.me/554197580656" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm4.5 11.96c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03 4.75 4.75 0 0 0 1 2.52 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg> Fale com a gente</a>
      <img className="cvf-m-mascote" src="/cv/mascote.webp" alt="" width="900" height="845" loading="lazy" />
      <div className="cvf-m-sep" />

      <h3>Empresa</h3>
      <ul>
        <li><a href="#como-funciona">Sobre</a></li>
        <li><a href="#servicos">Projetos</a></li>
        <li><a href="/politica-de-privacidade">Política de Privacidade</a></li>
        <li><a href="/termos-de-uso">Termos de Uso</a></li>
        <li><a href="/politica-de-privacidade#cookies">Preferências de cookies</a></li>
      </ul>

      <h3>Contato</h3>
      <address>
        <a className="cvf-m-item" href="https://wa.me/554197580656" target="_blank" rel="noopener noreferrer"><span className="cvf-m-ic"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm4.5 11.96c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03 4.75 4.75 0 0 0 1 2.52 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg></span><span><small>WhatsApp</small><strong>+55 (41) 9758-0656</strong></span></a>
        <a className="cvf-m-item" href="mailto:commercevisual@hotmail.com"><span className="cvf-m-ic"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span><span><small>E-mail</small><strong>commercevisual@hotmail.com</strong></span></a>
        <a className="cvf-m-item" href="https://www.instagram.com/commercevisual/" target="_blank" rel="noopener noreferrer"><span className="cvf-m-ic"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></span><span><small>Instagram</small><strong>@commercevisual</strong></span></a>
        <p className="cvf-m-item" style={{ margin: 0 }}><span className="cvf-m-ic"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.5-7-11.5a7 7 0 0 1 14 0C19 14.5 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg></span><span><small>Área de atendimento</small><strong>Atendimento 100% online para todo o Brasil, Estados Unidos e Europa.</strong></span></p>
        <p className="cvf-m-item" style={{ margin: 0 }}><span className="cvf-m-ic"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span><span><small>Horário</small><strong>Segunda a sexta, 9h às 18h (horário de Brasília)</strong></span></p>
      </address>

      <div className="cvf-m-bottom">
        <p>© {new Date().getFullYear()} Commerce Visual. Todos os direitos reservados.</p>
        <div className="cvf-m-row">
          <span>CNPJ: 68.961.224/0001-01</span>
          <span className="cvf-m-ssl"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg> Site seguro (SSL)</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
