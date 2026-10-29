import React from 'react';
import { LANG, ROTAS, lembrarIdioma, t, type Lang } from '../i18n';
import './lang.css';

/* Seletor de idioma: só texto (PT-BR | EN). Leva para a mesma página no outro idioma. */
const OPCOES: { l: Lang; rotulo: string; nome: string; hreflang: string }[] = [
  { l: 'pt-br', rotulo: 'PT-BR', nome: 'Português (Brasil)', hreflang: 'pt-BR' },
  { l: 'en', rotulo: 'EN', nome: 'English', hreflang: 'en' },
];

export const LangSwitch: React.FC<{ pagina?: keyof typeof ROTAS; className?: string; style?: React.CSSProperties }> = ({ pagina = 'home', className = '', style }) => (
  <nav className={`cv-lang ${className}`} aria-label={t.idioma} style={style}>
    {OPCOES.map((o) => (
      <a
        key={o.l}
        href={ROTAS[pagina][o.l]}
        hrefLang={o.hreflang}
        lang={o.hreflang}
        aria-label={o.nome}
        aria-current={o.l === LANG ? 'true' : undefined}
        onClick={() => lembrarIdioma(o.l)}
      >
        {o.rotulo}
      </a>
    ))}
  </nav>
);

export default LangSwitch;
