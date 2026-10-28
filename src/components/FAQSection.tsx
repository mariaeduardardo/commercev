import React, { useState } from 'react';
import { FAQS } from '../data/siteData';
import './faq.css';

/*
  Seção "Perguntas frequentes" no design aprovado.
  - Topo (selo, título 3D e subtítulo) e fundo vêm da arte em public/cv/.
  - Os cards são HTML: abrem e fecham ao clicar, e o texto é lido pelo Google e pelas IAs.
  - As perguntas e respostas ficam em src/data/siteData.ts (FAQS). Aqui aparecem as 6, em 3 colunas.
*/

const PERGUNTAS = FAQS.slice(0, 6);

export const FAQSection: React.FC = () => {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <section id="faq" className={`cvf2${aberta !== null ? ' expandida' : ''}`} aria-labelledby="cvf2-titulo">
      <div className="cvf2-in">
      <div className="cvf2-topo">
        <img src="/cv/faq2-topo.webp" alt="" width={2576} height={464} loading="lazy" />
        <div className="cvf2-sr">
          <h2 id="cvf2-titulo">Perguntas frequentes</h2>
          <p>Transparência absoluta do início ao fim. Veja as respostas para as principais dúvidas dos nossos clientes.</p>
        </div>
      </div>

      <div className="cvf2-corpo">
        <div className="cvf2-grade">
          {[0, 1, 2].map((col) => (
            <div className="cvf2-col" key={col}>
              {PERGUNTAS.map((f, i) => ({ f, i })).filter(({ i }) => i % 3 === col).map(({ f, i }) => {
                const open = aberta === i;
                return (
                  <div key={f.question} className={`cvf2-card${open ? ' aberto' : ''}`}>
                    <h3>
                      <button
                        type="button"
                        className="cvf2-pergunta"
                        aria-expanded={open}
                        aria-controls={`cvf2-r${i}`}
                        id={`cvf2-p${i}`}
                        onClick={() => setAberta(open ? null : i)}
                      >
                        <span>{f.question}</span>
                        <span className="cvf2-seta" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </span>
                      </button>
                    </h3>
                    <div className="cvf2-resposta" id={`cvf2-r${i}`} role="region" aria-labelledby={`cvf2-p${i}`} hidden={!open}>
                      <p>{f.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default FAQSection;
