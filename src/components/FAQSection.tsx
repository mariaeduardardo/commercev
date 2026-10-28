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

/* imagens dos cards: [fechado, aberto] */
const IMG: [string, string][] = [
  ['/cv/faq/q1.webp', '/cv/faq/q1-aberta.webp'],
  ['/cv/faq/q2.webp', '/cv/faq/q2-aberta.webp'],
  ['/cv/faq/q3.webp', '/cv/faq/q3-aberta.webp'],
  ['/cv/faq/q4.webp', '/cv/faq/q4-aberta.webp'],
  ['/cv/faq/q5.webp', '/cv/faq/q5-aberta.webp'],
  ['/cv/faq/q6.webp', '/cv/faq/q6-aberta.webp'],
];

/* tamanho (largura x altura) das imagens dos cards: fechado e aberto */
const TAM: [number, number][][] = [[[924, 377], [924, 741]], [[924, 377], [924, 791]], [[924, 377], [924, 791]], [[924, 377], [924, 791]], [[924, 377], [924, 741]], [[924, 377], [924, 691]]];

export const FAQSection: React.FC = () => {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <section id="faq" className={`cvf2${aberta !== null ? ' expandida' : ''}`} aria-labelledby="cvf2-titulo">
      <div className="cvf2-in">
      <div className="cvf2-topo">
        <img src="/cv/faq3-topo.webp" alt="" width={2576} height={464} loading="lazy" decoding="async" />
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
                  <div key={f.question} className="cvf2-card">
                    <h3>
                      <button
                        type="button"
                        className="cvf2-pergunta"
                        aria-expanded={open}
                        aria-controls={`cvf2-r${i}`}
                        id={`cvf2-p${i}`}
                        onClick={() => setAberta(open ? null : i)}
                        onPointerEnter={() => { new Image().src = IMG[i][1]; }}
                      >
                        {/* o card é uma imagem (fica igual em qualquer navegador, mesmo com "modo escuro forçado") */}
                        <img
                          src={IMG[i][open ? 1 : 0]}
                          alt=""
                          width={TAM[i][open ? 1 : 0][0]}
                          height={TAM[i][open ? 1 : 0][1]}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="cvf2-sr">{f.question}</span>
                      </button>
                    </h3>
                    <div className="cvf2-sr" id={`cvf2-r${i}`} role="region" aria-labelledby={`cvf2-p${i}`}>
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
