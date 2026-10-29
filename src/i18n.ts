/*
  Idioma do site: PT-BR (raiz).
  O idioma de cada página vem do <html lang="..."> do index.html correspondente.
  Para mudar um texto, edite aqui. As artes ficam em public/cv/.
*/

export type Lang = 'pt-br';

export const LANG: Lang = 'pt-br';

/* Endereço de cada página nos 3 idiomas (o seletor de idioma usa esta tabela) */
export const ROTAS: Record<string, Record<Lang, string>> = {
  home: { 'pt-br': '/' },
  sites: { 'pt-br': '/sites-profissionais' },
  lojas: { 'pt-br': '/lojas-virtuais' },
  sistemas: { 'pt-br': '/sistemas-sob-medida' },
  seguranca: { 'pt-br': '/seguranca-digital' },
  custo: { 'pt-br': '/quanto-custa-um-site' },
  privacidade: { 'pt-br': '/politica-de-privacidade' },
  termos: { 'pt-br': '/termos-de-uso' },
};
export const rota = (k: keyof typeof ROTAS) => ROTAS[k][LANG];

const MSG: Record<Lang, string> = {
  'pt-br': 'Olá! Vim pelo site e quero um orçamento.',
};
export const WPP = `https://wa.me/5541997580656?text=${encodeURIComponent(MSG[LANG])}`;

/* Pasta das artes do idioma */
const P = LANG === 'pt-br' ? '' : `/${LANG}`;

export const ARTE =
  LANG === 'pt-br'
    ? {
        heroDesk: '/cv/hero-desktop-v3.webp', heroDesk1000: '/cv/hero-desktop-v3-1000.webp', heroMob: '/cv/hero-mobile.webp',
        servDesk: '/cv/servicos-desktop-v2.webp', servDesk1000: '/cv/servicos-desktop-v2-1000.webp', servMob: '/cv/servicos-mobile-v3.webp',
        procDesk: '/cv/processo-desktop-v4.webp', procMob: '/cv/processo-mobile-v5.webp',
        faqTopo: '/cv/faq3-topo.webp', rodape: '/cv/rodape-v5.webp',
      }
    : {
        heroDesk: `/cv${P}/hero-desktop.webp`, heroDesk1000: `/cv${P}/hero-desktop-1000.webp`, heroMob: `/cv${P}/hero-mobile.webp`,
        servDesk: `/cv${P}/servicos-desktop.webp`, servDesk1000: `/cv${P}/servicos-desktop-1000.webp`, servMob: `/cv${P}/servicos-mobile.webp`,
        procDesk: `/cv${P}/processo-desktop.webp`, procMob: `/cv${P}/processo-mobile.webp`,
        faqTopo: `/cv${P}/faq3-topo.webp`, rodape: `/cv${P}/rodape.webp`,
      };

/* Cards do FAQ (computador): imagem fechada e aberta + altura da aberta */
export const FAQ_IMG: [string, string, number][] = (() => {
  const alt: Record<Lang, number[]> = {
    'pt-br': [741, 791, 791, 791, 741, 641],
  };
  return [1, 2, 3, 4, 5, 6].map((n, i) => {
    const nome = LANG === 'pt-br' && n === 6 ? 'q6-v2' : `q${n}`;
    return [`/cv${P}/faq/${nome}.webp`, `/cv${P}/faq/${nome}-aberta.webp`, alt[LANG][i]];
  });
})();

/* Respostas do FAQ (celular): imagem e altura, na ordem das fatias da arte */
export const FAQM: { s: string; r: string; rh: number }[] = (() => {
  const alt: Record<Lang, number[]> = {
    'pt-br': [519, 519, 519, 461, 519, 403],
  };
  return [1, 2, 3, 4, 5, 6].map((n, i) => ({
    s: `/cv${P}/faqm/s${n}.webp`,
    r: LANG === 'pt-br' && n === 6 ? '/cv/faqm/r6-v2.webp' : `/cv${P}/faqm/r${n}.webp`,
    rh: alt[LANG][i],
  }));
})();

type Hs = { x1: number; y1: number; x2: number; y2: number };
/* Áreas clicáveis do topo (computador, escala 1672x940) e do celular (escala 863x1823) */
const k = 1672 / 1600;
const esc = (a: number[]): Hs => ({ x1: Math.round(a[0] * k), y1: 37, x2: Math.round(a[2] * k), y2: 80 });
export const HERO_HS: { menu: Hs[]; link: Hs; linkMob: Hs } =
  {
          menu: [
            { x1: 402, y1: 37, x2: 486, y2: 80 }, { x1: 509, y1: 37, x2: 627, y2: 80 },
            { x1: 650, y1: 37, x2: 776, y2: 80 }, { x1: 799, y1: 37, x2: 915, y2: 80 },
          ],
          link: { x1: 452, y1: 708, x2: 684, y2: 750 },
          linkMob: { x1: 56, y1: 1058, x2: 386, y2: 1110 },
        };

/* Links do rodapé (escala 2576x1093): Projetos, Política, Termos, Cookies */
export const RODAPE_LINKS: Hs[] =
  [
          { x1: 917, y1: 461, x2: 1064, y2: 511 }, { x1: 917, y1: 532, x2: 1296, y2: 582 },
          { x1: 917, y1: 603, x2: 1167, y2: 653 }, { x1: 917, y1: 674, x2: 1311, y2: 724 },
        ];

type Txt = {
  h1: string; altHero: string; altServ: string; menu: string[]; menuAria: string; abrirMenu: string; fecharMenu: string;
  conversar: string; querProjeto: string; conhecaServicos: string; idioma: string;
  serv: { h2: string; itens: [string, string | null, string][]; h3a: string; pa: string; h3b: string; pb: string; h3c: string; pc: string; custo: string; criar: string; possSites: string; possSist: string };
  proc: { selo: string; h2: string; p: string; etapas: [string, string][] };
  faq: { h2: string; p: string; qa: [string, string][] };
  rod: {
    inicio: string; fale: string; projetos: string; privacidade: string; termos: string; cookies: string;
    slogan: string; empresa: string; contato: string; area: string; areaTxt: string; horario: string; horarioTxt: string;
    direitos: string; cnpj: string; seguro: string; nav: string;
  };
};

export const T: Record<Lang, Txt> = {
  'pt-br': {
    h1: 'Commerce Visual — Seu negócio sem limites. Criação de sites, lojas virtuais e sistemas sob medida.',
    altHero: 'Seu negócio sem limites. Criação de sites e sistemas. Ideias criativas. Soluções digitais feitas para o seu negócio.',
    altServ: 'Soluções digitais para suas ideias: sites profissionais, sistemas sob medida, lojas virtuais e design responsivo. Suas ideias em experiências reais. Sites que valorizam sua marca. Sistemas que organizam seu negócio.',
    menu: ['Início', 'Serviços', 'Processo', 'Dúvidas'], menuAria: 'Menu principal', abrirMenu: 'Abrir menu', fecharMenu: 'Fechar menu',
    conversar: 'Vamos conversar', querProjeto: 'Quero meu projeto', conhecaServicos: 'Conheça nossos serviços', idioma: 'Idioma',
    serv: {
      h2: 'Soluções digitais para suas ideias',
      itens: [
        ['Sites profissionais', 'sites', 'presença digital com a sua identidade.'],
        ['Sistemas sob medida', 'sistemas', 'soluções para a rotina do seu negócio.'],
        ['Lojas virtuais', 'lojas', 'seu catálogo em uma experiência de compra.'],
        ['Design responsivo', null, 'experiências para diferentes telas.'],
        ['Segurança digital', 'seguranca', 'proteção para o site e os dados da sua empresa.'],
      ],
      h3a: 'Suas ideias. Em experiências reais.', pa: 'Criamos sites e sistemas que conectam sua marca ao digital.',
      h3b: 'Sites que valorizam sua marca', pb: 'Design estratégico para atrair, engajar e converter.',
      h3c: 'Sistemas que organizam seu negócio', pc: 'Mais controle, organização e produtividade no seu dia a dia.',
      custo: 'Quanto custa um site profissional', criar: 'Vamos criar seu projeto',
      possSites: 'Conheça as possibilidades de sites', possSist: 'Conheça as possibilidades de sistemas',
    },
    proc: {
      selo: 'Processo transparente', h2: 'Como tiramos sua ideia do papel em 4 etapas ágeis',
      p: 'Metodologia sem enrolação. Você acompanha cada passo com alinhamento contínuo e previsão de entrega.',
      etapas: [
        ['Briefing & Diagnóstico', 'Entendemos o seu modelo de negócio, seus diferenciais e o comportamento de compra do seu cliente ideal para desenhar a estratégia mais eficiente.'],
        ['Design de Alta Fidelidade', 'Criamos a interface visual com base em neurodesign corporativo, paleta sofisticada e hierarquia perfeita para conduzir o olhar até o botão de contato.'],
        ['Desenvolvimento & Performance', 'Codificamos o projeto com as tecnologias mais modernas do mercado, garantindo fluidez mobile-first, segurança e velocidade máxima no carregamento.'],
        ['Lançamento & Código 100% Seu', 'Colocamos sua solução no ar, realizamos testes de ponta e entregamos o acesso completo, sem dependência de mensalidades da agência.'],
      ],
    },
    faq: {
      h2: 'Perguntas frequentes', p: 'Transparência absoluta do início ao fim. Veja as respostas para as principais dúvidas dos nossos clientes.',
      qa: [
        ['Eu realmente não preciso pagar mensalidades para a Commerce Visual?', 'Exato! O projeto é 100% seu com pagamento único de desenvolvimento, sem mensalidades obrigatórias. Você tem total autonomia, mas também pode optar por pacotes de suporte e manutenção caso queira nossa ajuda contínua.'],
        ['Qual o prazo médio de entrega de uma Landing Page ou Site?', 'Para Landing Pages de alta conversão, nosso prazo médio de entrega varia de 5 a 10 dias úteis após a aprovação do briefing e alinhamento de conteúdo. Para sistemas sob medida, o cronograma é estipulado de acordo com a complexidade técnica acordada.'],
        ['O site funciona com total perfeição em celulares e tablets?', 'Sim, aplicamos a abordagem estrita Mobile-First. Mais de 85% dos cliques vindos de campanhas chegam através de smartphones, por isso cada botão, texto e elemento é ajustado com precisão milimétrica para uma experiência tátil ultra-rápida.'],
        ['Como o site é integrado com o meu WhatsApp?', "Configuramos botões inteligentes com mensagens pré-formatadas. Quando o visitante clica no botão do site, ele já abre o WhatsApp com um texto personalizado (ex: 'Olá, vim pelo site e gostaria de um orçamento'), facilitando o início imediato do atendimento pela sua equipe."],
        ['Vocês auxiliam na escolha de hospedagem e domínio?', 'Sim, fornecemos todo o direcionamento consultivo para que você registre seu domínio próprio (.com.br) e contrate a hospedagem mais veloz e econômica para a sua necessidade, mantendo tudo 100% no seu nome.'],
        ['Quais são as formas de pagamento disponíveis?', 'Trabalhamos com condições transparentes: 50% de entrada para iniciarmos o projeto e os 50% restantes na conclusão e aprovação final. Aceitamos PIX e cartão de crédito.'],
      ],
    },
    rod: {
      inicio: 'Commerce Visual — página inicial', fale: 'Fale com a gente no WhatsApp', projetos: 'Projetos', privacidade: 'Política de Privacidade',
      termos: 'Termos de Uso', cookies: 'Preferências de cookies', slogan: 'Sites, sistemas e segurança digital para o seu negócio.',
      empresa: 'Empresa', contato: 'Contato', area: 'Área de atendimento', areaTxt: 'Atendimento 100% online para todo o Brasil.',
      horario: 'Horário', horarioTxt: 'Segunda a sexta, 9h às 18h (horário de Brasília)', direitos: 'Todos os direitos reservados.',
      cnpj: 'CNPJ: 68.961.224/0001-01', seguro: 'Site seguro (SSL)', nav: 'Rodapé',
    },
  },
};

export const t = T[LANG];

