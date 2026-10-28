import React from 'react';
import { ARTE, t } from '../i18n';
import './process.css';

/*
  Seção "Processo transparente" igual à imagem de referência.
  Os textos dos cards estão desenhados dentro da arte (public/cv/processo-*.webp e as versões de cada idioma),
  para ficarem sempre legíveis, inclusive em navegadores com "modo escuro forçado".
  O texto abaixo repete os mesmos textos de forma invisível, para Google, IAs e leitores de tela.
  Os textos ficam em src/i18n.ts. Se mudar um texto lá, a arte também precisa ser refeita.
*/

export const ProcessSection: React.FC = () => (
  <section id="como-funciona" className="cvp" aria-labelledby="cvp-titulo">
    <div className="cvp-sr">
      <p>{t.proc.selo}</p>
      <h2 id="cvp-titulo">{t.proc.h2}</h2>
      <p>{t.proc.p}</p>
      <ol className="cvp-sr">
        {t.proc.etapas.map(([titulo, texto]) => (
          <li key={titulo}>
            <h3>{titulo}</h3>
            <p>{texto}</p>
          </li>
        ))}
      </ol>
    </div>

    <div className="cvp-arte cvp-desk">
      <img src={ARTE.procDesk} alt="" width={2576} height={1438} loading="lazy" decoding="async" />
    </div>

    <div className="cvp-arte cvp-mob">
      <img src={ARTE.procMob} alt="" width={1080} height={1874} loading="lazy" decoding="async" />
    </div>
  </section>
);

export default ProcessSection;
