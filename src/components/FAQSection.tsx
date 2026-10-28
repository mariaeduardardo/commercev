import React, { useState } from 'react';
import { ARTE, FAQ_IMG, FAQM, t } from '../i18n';
import './faq.css';

/*
  Seção "Perguntas frequentes" no design aprovado.
  - Topo (selo, título 3D e subtítulo) e fundo vêm da arte em public/cv/.
  - Os cards são HTML: abrem e fecham ao clicar, e o texto é lido pelo Google e pelas IAs.
  - As perguntas e respostas ficam em src/data/siteData.ts (FAQS). Aqui aparecem as 6, em 3 colunas.
*/

const PERGUNTAS = t.faq.qa.map(([question, answer]) => ({ question, answer }));

/* imagens dos cards: [fechado, aberto] e tamanhos (os textos estão desenhados na imagem) */
const IMG: [string, string][] = FAQ_IMG.map(([f, a]) => [f, a]);
const TAM: [number, number][][] = FAQ_IMG.map(([, , h]) => [[924, 377], [924, h]]);

/* Celular: a arte vertical aprovada, fatiada por card. Ao tocar, a resposta aparece logo abaixo do card. */
const MOB_BASE = [{"s": "/cv/faqm/s1.webp", "sw": 1438, "sh": 1011, "r": "/cv/faqm/r1.webp", "rw": 1438, "rh": 519, "q": 0, "hot": [18.369, 73.029, 63.172, 25.49], "seta": [73.134, 81.719, 5.702]}, {"s": "/cv/faqm/s2.webp", "sw": 1438, "sh": 270, "r": "/cv/faqm/r2.webp", "rw": 1438, "rh": 519, "q": 3, "hot": [18.369, 5.911, 63.172, 88.288], "seta": [73.134, 34.87, 5.702]}, {"s": "/cv/faqm/s3.webp", "sw": 1438, "sh": 291, "r": "/cv/faqm/r3.webp", "rw": 1438, "rh": 519, "q": 1, "hot": [18.369, 5.245, 63.172, 89.444], "seta": [73.134, 35.877, 5.702]}, {"s": "/cv/faqm/s4.webp", "sw": 1438, "sh": 293, "r": "/cv/faqm/r4.webp", "rw": 1438, "rh": 461, "q": 4, "hot": [18.369, 5.28, 63.172, 89.274], "seta": [73.134, 35.923, 5.702]}, {"s": "/cv/faqm/s5.webp", "sw": 1438, "sh": 289, "r": "/cv/faqm/r5.webp", "rw": 1438, "rh": 519, "q": 2, "hot": [18.369, 5.179, 63.172, 89.618], "seta": [73.134, 35.8, 5.702]}, {"s": "/cv/faqm/s6.webp", "sw": 1438, "sh": 422, "r": "/cv/faqm/r6.webp", "rw": 1438, "rh": 461, "q": 5, "hot": [18.369, 4.07, 63.172, 59.541], "seta": [73.134, 24.125, 5.702]}];
const MOB = MOB_BASE.map((m, i) => ({ ...m, s: FAQM[i].s, r: FAQM[i].r, rh: FAQM[i].rh }));

export const FAQSection: React.FC = () => {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <section id="faq" className={`cvf2${aberta !== null ? ' expandida' : ''}`} aria-labelledby="cvf2-titulo">
      <div className="cvf2-in cvf2-desk">
      <div className="cvf2-topo">
        <img src={ARTE.faqTopo} alt="" width={2576} height={464} loading="lazy" decoding="async" />
        <div className="cvf2-sr">
          <h2 id="cvf2-titulo">{t.faq.h2}</h2>
          <p>{t.faq.p}</p>
        </div>
      </div>

      <div className="cvf2-corpo">
        <div className="cvf2-grade">
          {[0, 1, 2].map((col) => (
            <div className="cvf2-col" key={col}>
              {PERGUNTAS.map((f, i) => ({ f, i })).filter(({ i }) => i % 3 === col).map(({ f, i }) => {
                const open = aberta === i;
                return (
                  <div key={f.question} className="cvf2-card" style={{ order: i }}>
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
                        <picture>
                          <img
                            src={IMG[i][open ? 1 : 0]}
                            alt=""
                            width={TAM[i][open ? 1 : 0][0]}
                            height={TAM[i][open ? 1 : 0][1]}
                            loading="lazy"
                            decoding="async"
                          />
                        </picture>
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

      {/* Versão celular (até 900 px) */}
      <div className="cvf2-m">
        {MOB.map((s, n) => {
          const open = aberta === s.q;
          return (
            <React.Fragment key={n}>
              <div className="cvf2-m-s">
                <img src={s.s} alt="" width={s.sw} height={s.sh} loading="lazy" decoding="async" />
                <button
                  type="button"
                  className="cvf2-m-hot"
                  aria-expanded={open}
                  aria-controls={`cvf2-r${s.q}`}
                  style={{ left: `${s.hot[0]}%`, top: `${s.hot[1]}%`, width: `${s.hot[2]}%`, height: `${s.hot[3]}%` }}
                  onClick={() => setAberta(open ? null : s.q)}
                  onPointerEnter={() => { new Image().src = s.r; }}
                >
                  <span className="cvf2-sr">{PERGUNTAS[s.q].question}</span>
                </button>
                {open && (
                  <img className="cvf2-m-seta" src="/cv/faqm/seta-cima.webp" alt="" style={{ left: `${s.seta[0]}%`, top: `${s.seta[1]}%`, width: `${s.seta[2]}%` }} />
                )}
              </div>
              {open && <img className="cvf2-m-r" src={s.r} alt="" width={s.rw} height={s.rh} />}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
