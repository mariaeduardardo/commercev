import React from 'react';
import './process.css';

/*
  Seção "Processo transparente" igual ao design aprovado.
  A arte (fundo, título 3D, números, ícones e mascote) fica em public/cv/.
  Os textos dos cards são HTML de verdade, posicionados em % sobre a arte
  e com tamanho de fonte proporcional à largura (cqw), para o Google e as
  IAs conseguirem ler e para você poder editar o texto aqui.
*/

type Etapa = { titulo: string; texto: string };

const ETAPAS: Etapa[] = [
  {
    titulo: 'Briefing & Diagnóstico',
    texto: 'Entendemos o seu modelo de negócio, seus diferenciais e o comportamento de compra do seu cliente ideal para desenhar a estratégia mais eficiente.',
  },
  {
    titulo: 'Design de Alta Fidelidade',
    texto: 'Criamos a interface visual com paleta sofisticada e hierarquia clara, para conduzir o olhar do visitante até o botão de contato.',
  },
  {
    titulo: 'Desenvolvimento & Performance',
    texto: 'Codificamos o projeto com tecnologias modernas, garantindo fluidez no celular, segurança e carregamento rápido.',
  },
  {
    titulo: 'Lançamento & Código 100% Seu',
    texto: 'Colocamos sua solução no ar, testamos tudo e entregamos o acesso completo ao projeto.',
  },
];

/* Posição de cada card na arte: left, top e width em % da largura/altura da imagem */
const POS_DESKTOP = [
  { l: 8.6, t: 63.6, w: 15.6 },
  { l: 27.9, t: 63.6, w: 15.6 },
  { l: 47.15, t: 63.6, w: 15.8 },
  { l: 66.5, t: 63.6, w: 12.4 },
];
const POS_MOBILE = [
  { l: 39.1, t: 29.9, w: 43.5 },
  { l: 39.1, t: 46.9, w: 43.5 },
  { l: 39.1, t: 63.4, w: 43.5 },
  { l: 39.1, t: 79.7, w: 31.5 },
];

const Cards: React.FC<{ pos: typeof POS_DESKTOP }> = ({ pos }) => (
  <ol className="cvp-lista">
    {ETAPAS.map((e, i) => (
      <li
        key={e.titulo}
        className="cvp-card"
        style={{ left: `${pos[i].l}%`, top: `${pos[i].t}%`, width: `${pos[i].w}%` }}
      >
        <h3>{e.titulo}</h3>
        <p>{e.texto}</p>
      </li>
    ))}
  </ol>
);

export const ProcessSection: React.FC = () => (
  <section id="como-funciona" className="cvp" aria-labelledby="cvp-titulo">
    {/* Título e subtítulo estão na arte; aqui ficam em texto para Google, IAs e leitores de tela */}
    <div className="cvp-sr">
      <p>Processo transparente</p>
      <h2 id="cvp-titulo">Como tiramos sua ideia do papel em 4 etapas ágeis</h2>
      <p>Metodologia sem enrolação. Você acompanha cada passo com alinhamento contínuo e previsão de entrega.</p>
    </div>

    <div className="cvp-arte cvp-desk">
      <img src="/cv/processo-desktop.webp" alt="" width={2400} height={1792} loading="lazy" />
      <Cards pos={POS_DESKTOP} />
    </div>

    <div className="cvp-arte cvp-mob">
      <img src="/cv/processo-mobile.webp" alt="" width={1438} height={2576} loading="lazy" />
      <Cards pos={POS_MOBILE} />
    </div>
  </section>
);

export default ProcessSection;
