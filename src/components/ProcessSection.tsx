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
    texto: 'Entendemos o seu negócio, seus diferenciais e o seu cliente ideal para desenhar a estratégia mais eficiente.',
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
  { l: 10.25, t: 73.6, w: 17.6 },
  { l: 31.15, t: 73.6, w: 17.6 },
  { l: 52.25, t: 73.6, w: 17.6 },
  { l: 73.4, t: 73.6, w: 17.0 },
];
const POS_MOBILE = [
  { l: 39.1, t: 29.9, w: 43.5 },
  { l: 39.1, t: 46.9, w: 43.5 },
  { l: 39.1, t: 63.4, w: 43.5 },
  { l: 39.1, t: 79.7, w: 31.5 },
];

const Cards: React.FC<{ pos: typeof POS_DESKTOP; tituloNaArte?: boolean }> = ({ pos, tituloNaArte }) => (
  <ol className="cvp-lista">
    {ETAPAS.map((e, i) => (
      <li
        key={e.titulo}
        className="cvp-card"
        style={{ left: `${pos[i].l}%`, top: `${pos[i].t}%`, width: `${pos[i].w}%` }}
      >
        {/* no computador o título do card já está na arte; aqui fica só para leitores e Google */}
        <h3 className={tituloNaArte ? 'cvp-sr' : undefined}>{e.titulo}</h3>
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
      <img src="/cv/processo-desktop.webp" alt="" width={2576} height={1438} loading="lazy" />
      <Cards pos={POS_DESKTOP} tituloNaArte />
    </div>

    <div className="cvp-arte cvp-mob">
      <img src="/cv/processo-mobile.webp" alt="" width={1438} height={2576} loading="lazy" />
      <Cards pos={POS_MOBILE} />
    </div>
  </section>
);

export default ProcessSection;
