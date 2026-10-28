import React from 'react';
import './process.css';

/*
  Seção "Processo transparente" igual à imagem de referência.
  Os textos dos cards estão desenhados dentro da arte (public/cv/processo-*.webp),
  para ficarem sempre legíveis, inclusive em navegadores com "modo escuro forçado".
  A lista abaixo repete os mesmos textos de forma invisível, só para Google, IAs
  e leitores de tela. Se mudar um texto aqui, a arte também precisa ser refeita.
*/

type Etapa = { titulo: string; texto: string };

const ETAPAS: Etapa[] = [
  {
    titulo: 'Briefing & Diagnóstico',
    texto: 'Entendemos o seu modelo de negócio, seus diferenciais e o comportamento de compra do seu cliente ideal para desenhar a estratégia mais eficiente.',
  },
  {
    titulo: 'Design de Alta Fidelidade',
    texto: 'Criamos a interface visual com base em neurodesign corporativo, paleta sofisticada e hierarquia perfeita para conduzir o olhar até o botão de contato.',
  },
  {
    titulo: 'Desenvolvimento & Performance',
    texto: 'Codificamos o projeto com as tecnologias mais modernas do mercado, garantindo fluidez mobile-first, segurança e velocidade máxima no carregamento.',
  },
  {
    titulo: 'Lançamento & Código 100% Seu',
    texto: 'Colocamos sua solução no ar, realizamos testes de ponta e entregamos o acesso completo, sem dependência de mensalidades da agência.',
  },
];

const Cards: React.FC = () => (
  <ol className="cvp-sr">
    {ETAPAS.map((e) => (
      <li key={e.titulo}>
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
      <Cards />
    </div>

    <div className="cvp-arte cvp-desk">
      <img src="/cv/processo-desktop-v2.webp" alt="" width={2576} height={1438} loading="lazy" />
      
    </div>

    <div className="cvp-arte cvp-mob">
      <img src="/cv/processo-mobile-v3.webp" alt="" width={1080} height={1874} loading="lazy" />
      
    </div>
  </section>
);

export default ProcessSection;
