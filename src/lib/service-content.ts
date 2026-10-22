import { SPECIALIZED_OFFERS } from "./solution-content.ts";

export interface ServiceContent {
  slug: string;
  kind?: "product" | "solution";
  name: string;
  shortName: string;
  seoTitle: string;
  category: string;
  description: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  intro: string;
  applications: Array<{ title: string; text: string }>;
  steps: Array<{ title: string; text: string }>;
  requirements: string[];
  limits: string;
  example: { title: string; before: string; after: string };
  faqs: Array<{ question: string; answer: string }>;
}

// Datas editoriais mudam somente quando o conteúdo muda.
export const SERVICES: ServiceContent[] = [
  ...SPECIALIZED_OFFERS,
  {
    slug: "desenvolvimento-web",
    name: "Criação de sites e lojas virtuais",
    shortName: "Desenvolvimento Web",
    seoTitle: "Criação de sites e lojas virtuais por R$ 1.500 | Prometeus",
    category: "Criação de sites e lojas virtuais",
    description: "Criação de sites profissionais e lojas virtuais por R$ 1.500 + R$ 50/mês. Identidade da marca e SEO para o Google. Veja projetos e condições.",
    updatedAt: "2026-10-16",
    image: "/images/capabilities/build.webp?v=20261014",
    imageAlt: "Equipe reunida em torno de um notebook, planejando um projeto digital.",
    intro: "Sites institucionais, landing pages e lojas virtuais com a identidade da sua marca. Estrutura de SEO para descoberta no Google e em buscas com IA.",
    applications: [
      { title: "Sites institucionais", text: "Apresentar a empresa e seus serviços com páginas próprias, conteúdo claro e caminhos para entrar em contato. A estrutura acompanha a identidade da marca e as dúvidas de quem está conhecendo o negócio." },
      { title: "Landing pages", text: "Criar uma página focada em um serviço ou campanha, com mensagem, exemplos e um próximo passo definido. Formulários e contato por WhatsApp podem fazer parte da entrega, conforme o objetivo." },
      { title: "Lojas virtuais", text: "Apresentar seus produtos e organizar uma experiência de compra pela internet. A configuração da loja considera o catálogo, os meios de pagamento e a forma como sua empresa recebe e atende os pedidos." },
      { title: "Presença digital no Google", text: "Preparar títulos, descrições, links, sitemap e dados estruturados coerentes com o conteúdo. Configuração do Google Search Console e orientação sobre o Perfil da Empresa, quando elegível, podem compor o escopo." },
    ],
    steps: [
      { title: "Definir mensagem e estrutura", text: "Entendemos a empresa, os serviços, o público e a ação que o site precisa facilitar. Organizamos as páginas e os conteúdos necessários antes de desenhar a experiência." },
      { title: "Desenhar e desenvolver", text: "Construímos o visual com a identidade da marca e validamos navegação, conteúdo, formulários e comportamento em celular e desktop. Imagens e carregamento fazem parte da preparação." },
      { title: "Publicar e preparar a descoberta", text: "Conectamos domínio e hospedagem, conferimos HTTPS e a estrutura de SEO. A configuração de ferramentas de busca e medição, com os acessos autorizados, é definida no escopo da entrega." },
    ],
    requirements: ["Objetivo do site, público e serviços que precisam ser apresentados.", "Identidade visual, textos, imagens e um responsável por aprovar o conteúdo.", "Domínio, hospedagem e acesso autorizado às contas necessárias.", "Canais de contato e definições sobre atualização, manutenção e medição."],
    limits: "Publicar um site e preparar seu SEO não garante indexação, posição nas buscas ou volume de contatos. A descoberta depende também do conteúdo, da concorrência e das decisões dos buscadores. Domínio, hospedagem, produção de conteúdo e manutenção precisam ter responsabilidades definidas. O Perfil da Empresa no Google depende da elegibilidade e da verificação do negócio; mídia paga é um escopo separado.",
    example: { title: "Da indicação ao primeiro contato", before: "Uma pessoa recebe uma indicação, procura a empresa e encontra informações dispersas, sem uma página que explique o serviço e facilite o contato.", after: "Um site poderia reunir a apresentação da empresa, páginas de serviços e um caminho direto para conversar. A estrutura técnica seria preparada para as buscas e acompanhada nas ferramentas definidas no projeto." },
    faqs: [
      { question: "Vocês criam sites profissionais e lojas virtuais (e-commerce)?", answer: "Sim. Criamos sites institucionais, landing pages e lojas virtuais com a identidade da empresa e navegação para celular e computador. Você pode conhecer projetos reais no portfólio desta página. Páginas, conteúdo e recursos da loja são definidos antes de começar." },
      { question: "Quanto custa criar um site ou uma loja virtual?", answer: "O valor da criação é R$ 1.500 para o site e para a loja virtual. Você pode parcelar em 10 vezes de R$ 150 sem juros ou pagar R$ 1.425 no Pix, com 5% de desconto. Além da criação, há o pacote mensal de R$ 50." },
      { question: "O que está incluído nos R$ 50 mensais?", answer: "O pacote mensal inclui hospedagem do site, domínio, manutenção da infraestrutura e 3 ajustes mensais para manter o site atualizado. Vale tanto para sites quanto para lojas virtuais e é cobrado separadamente do valor da criação." },
      { question: "SEO, GEO e AIO garantem que minha empresa será recomendada?", answer: "A preparação ajuda buscadores e plataformas de IA a descobrir e compreender o conteúdo. Indexação, posição e citações dependem das decisões dessas plataformas e de outros fatores. Não garantimos uma posição no Google nem uma recomendação específica de uma IA." },
      { question: "O site já fica preparado para aparecer no Google?", answer: "A entrega pode incluir SEO técnico, sitemap, títulos, descrições e configuração do Search Console. Isso ajuda os buscadores a descobrir e compreender as páginas. Indexação e posição são decisões do Google; não prometemos um lugar específico nos resultados." },
      { question: "Vocês também ajudam com o Perfil da Empresa no Google?", answer: "A configuração ou revisão do perfil pode fazer parte do escopo quando o negócio atende aos critérios do Google. A conta deve ficar sob controle da empresa, e a verificação pode exigir participação do responsável. Negócios exclusivamente online não são elegíveis para esse perfil." },
      { question: "Qual é a diferença entre um site e uma landing page?", answer: "Um site pode reunir várias páginas para apresentar a empresa e seus serviços. Uma landing page concentra a mensagem em uma oferta ou campanha. A escolha depende do que a pessoa precisa entender e da ação que você quer facilitar." },
      { question: "Quem cuida do domínio, da hospedagem e das atualizações?", answer: "A Prometeus cuida da hospedagem, do domínio e da manutenção da infraestrutura no pacote mensal de R$ 50. O pacote também contempla 3 ajustes mensais para atualizar o site. A escolha do domínio e os acessos são organizados na preparação do projeto." },
    ],
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function servicePath(service: Pick<ServiceContent, "slug">): string {
  return `/servicos/${service.slug}`;
}
