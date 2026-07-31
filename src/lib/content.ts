/**
 * Single source of truth for site copy. Edit here, propagates everywhere.
 * Used by /solucoes, /processo, /, /contato (timeline refs message copy).
 */

import {
  MessageCircle,
  TrendingUp,
  PackageSearch,
  BarChart3,
  Plug,
  Cog,
  type LucideIcon,
} from "lucide-react";

export type Area = {
  icon: LucideIcon;
  title: string;
  desc: string;
  example: string;
};

export const AREAS: readonly Area[] = [
  {
    icon: MessageCircle,
    title: "Atendimento ao cliente",
    desc: "Agentes que respondem, qualificam e escalam conversas 24/7.",
    example: "Chatbot no WhatsApp que filtra leads antes de passar pro time comercial.",
  },
  {
    icon: TrendingUp,
    title: "Marketing e vendas",
    desc: "Automação de campanhas, nutrição de leads e follow-up personalizado.",
    example: "Sequência de e-mails que reativa leads frios com base no comportamento deles.",
  },
  {
    icon: PackageSearch,
    title: "Controle de estoque com IA",
    desc: "Previsão de demanda, alertas de ruptura e reposição automática.",
    example: "Sistema que antecipa quando um SKU vai acabar e gera pedido de compra pro fornecedor.",
  },
  {
    icon: BarChart3,
    title: "Análise de dados",
    desc: "Relatórios e dashboards gerados a partir dos seus dados internos.",
    example: "Relatório semanal de vendas montado automaticamente com insights das variações.",
  },
  {
    icon: Plug,
    title: "Integração de sistemas",
    desc: "Pontes entre as ferramentas que sua equipe já usa.",
    example: "Sincronizar pedidos do e-commerce com o ERP sem digitação manual.",
  },
  {
    icon: Cog,
    title: "Operações internas",
    desc: "Automação de processos repetitivos do dia a dia.",
    example: "Aprovação de cadastros, follow-up de clientes que pararam de responder.",
  },
] as const;

export type Etapa = {
  n: string;
  title: string;
  prazo: string;
  desc: string;
  entregaveis: readonly string[];
};

export const ETAPAS: readonly Etapa[] = [
  {
    n: "01",
    title: "Diagnóstico",
    prazo: "1 a 2 semanas",
    desc: "Conversa com a equipe, mapeamento de gargalos e definição de escopo. Saímos com um diagnóstico escrito.",
    entregaveis: [
      "Mapa de processos atuais com gargalos identificados",
      "Lista priorizada de oportunidades com impacto estimado",
      "Diagnóstico escrito entregue pra sua equipe",
    ],
  },
  {
    n: "02",
    title: "Proposta",
    prazo: "1 semana",
    desc: "Escopo detalhado, prazo, investimento e ROI esperado. Sem letra miúda.",
    entregaveis: [
      "Proposta técnica com escopo, prazo e investimento por etapa",
      "Critérios de aceite claros pra cada entrega",
      "Estimativa de ROI baseada nos dados do diagnóstico",
    ],
  },
  {
    n: "03",
    title: "Implementação",
    prazo: "4 a 12 semanas",
    desc: "Desenvolvimento, integração com sistemas da empresa e testes com sua equipe. Você acompanha de perto.",
    entregaveis: [
      "Solução rodando em produção integrada à sua stack",
      "Treinamento da equipe que vai operar",
      "Documentação técnica + guia de uso",
    ],
  },
  {
    n: "04",
    title: "Suporte contínuo",
    prazo: "Mensal",
    desc: "Monitoramento, ajustes e evolução conforme o uso real aparece.",
    entregaveis: [
      "Dashboard de saúde da solução",
      "Relatório mensal de uso e oportunidades de melhoria",
      "Ajustes incluídos no contrato",
    ],
  },
] as const;

export type FaqItem = { q: string; a: string };

export const FAQ_PROCESSO: readonly FaqItem[] = [
  {
    q: "O que recebo exatamente ao final do Diagnóstico Inicial?",
    a: "Você recebe um documento escrito de diagnóstico com o mapeamento dos processos atuais, a lista priorizada de gargalos por impacto e a estimativa de ROI.",
  },
  {
    q: "Quanto tempo leva da proposta à entrega em produção?",
    a: "A implementação completa leva entre 4 e 12 semanas. A primeira versão funcional já entra em testes operacionais entre 2 e 3 semanas.",
  },
  {
    q: "O que acontece se a entrega não atingir o objetivo combinado?",
    a: "Cada etapa tem critérios de aceite objetivos definidos previamente na proposta. Ajustes necessários para atingir o critério combinado são feitos sem custo adicional.",
  },
  {
    q: "Como funciona a etapa de Suporte Contínuo pós-entrega?",
    a: "Oferecemos acompanhamento mensal com monitoramento de saúde do sistema, relatórios de uso e pequenos ajustes inclusos no contrato para garantir que a solução evolua com o seu negócio.",
  },
  {
    q: "Existe algum compromisso financeiro antes de aprovar a proposta?",
    a: "Nenhum. A conversa de contexto e o diagnóstico inicial são gratuitos e sem compromisso. Você só investe se aprovar a proposta técnica.",
  },
  {
    q: "Como minha equipe é treinada para usar as novas ferramentas?",
    a: "Realizamos treinamento prático com a equipe responsável e entregamos documentação técnica clara e guias de operação simples.",
  },
] as const;

export const FAQ_SOLUCOES: readonly FaqItem[] = [
  {
    q: "Quais tipos de sistemas vocês conseguem integrar?",
    a: "Integramos com praticamente qualquer sistema moderno (ERP, CRM, WhatsApp, e-commerce, planilhas, Postgres, APIs REST/GraphQL). Conectamos a stack que você já usa.",
  },
  {
    q: "A minha empresa fica presa a algum fornecedor (lock-in)?",
    a: "Não. Trabalhamos com stack aberta (OpenAI, Anthropic, Postgres, Next.js, n8n). Código, dados e documentação são 100% da sua empresa.",
  },
  {
    q: "Vocês atendem qualquer setor de mercado?",
    a: "Atendemos qualquer empresa com processo repetitivo ou dado subutilizado. Já atuamos em indústria, serviços, advocacia, estoque, finanças e tecnologia.",
  },
  {
    q: "Preciso ter equipe técnica interna para manter a solução?",
    a: "Não. A gente opera e sustenta o sistema. Sua equipe acompanha os indicadores no dashboard e foca na tomada de decisão.",
  },
  {
    q: "Quanto custa um projeto de automação com IA?",
    a: "Depende do escopo do diagnóstico. O diagnóstico inicial é gratuito e a proposta traz valores transparentes por etapa, sem surpresas.",
  },
  {
    q: "Em quanto tempo a solução começa a dar resultado?",
    a: "Primeiros ganhos operacionais ocorrem entre 4 e 8 semanas após o início da implementação.",
  },
] as const;

export const FAQ_ITEMS = FAQ_PROCESSO;

export const PRA_QUEM_E = [
  "Empresa com processo repetitivo tomando tempo de equipe qualificada",
  "Dados internos subutilizados que gerariam decisão melhor se analisados",
  "Ferramentas que não conversam entre si e travam a operação",
  "Resultado mensurável em 3-6 meses, não pesquisa acadêmica",
  "Preferência por solução sob medida a SaaS engessado",
];

export const PRA_QUEM_NAO_E = [
  "Quer solução pronta em 24h sem nenhuma conversa",
  "Procura 'IA mágica' sem entender o problema por trás",
  "Precisa de escala massiva (milhões de eventos/segundo, fora do escopo MVP)",
  "Prefere assinar mensal barato sem nenhum compromisso",
];

export const TIMELINE_CONTATO = [
  {
    n: "01",
    prazo: "Em até 24h úteis",
    title: "Retorno inicial",
    desc: "Confirmamos o recebimento e, se faltar contexto, já perguntamos o necessário.",
  },
  {
    n: "02",
    prazo: "Em 3-5 dias",
    title: "Conversa de contexto",
    desc: "Marcamos 30 minutos pra entender o cenário, o impacto e a prioridade. Sem apresentação comercial.",
  },
  {
    n: "03",
    prazo: "Em 1 semana",
    title: "Diagnóstico inicial",
    desc: "Você recebe escopo, prazo e investimento estimado por etapa. Sem compromisso até aqui.",
  },
] as const;

export type Metrica = {
  icon: "Activity" | "Cpu" | "Timer" | "ShieldCheck";
  eyebrow: string;
  value: number;
  suffix?: string;
  prefix?: string;
  /** optional caveat (e.g. "depende do porte"). */
  note?: string;
  label: string;
};

export const METRICAS: readonly Metrica[] = [
  {
    icon: "Activity",
    eyebrow: "Em produção",
    value: 12,
    suffix: "+",
    label: "Plataformas operando",
    note: "Em cliente, com uso real",
  },
  {
    icon: "Cpu",
    eyebrow: "Cobertura",
    value: 8,
    suffix: "",
    label: "Setores atendidos",
    note: "Advocacia · estoque · marketing · finanças · investimento · vendas · +",
  },
  {
    icon: "Timer",
    eyebrow: "Tempo médio",
    value: 8,
    suffix: " sem",
    label: "Da proposta à entrega",
    note: "Varia conforme o porte do projeto",
  },
  {
    icon: "ShieldCheck",
    eyebrow: "Pós-entrega",
    value: 100,
    suffix: "%",
    label: "Suporte contínuo",
    note: "Monitoramento, ajustes e evolução inclusos",
  },
] as const;

export const PILARES = [
  {
    icon: "Compass",
    title: "Diagnóstico antes de proposta",
    desc: "Cada projeto começa com 1 a 2 semanas de mapeamento. Você sai do diagnóstico com clareza sobre o que automatizar e o que deixar de lado. A proposta vem depois disso, com escopo fechado e ROI estimado.",
  },
  {
    icon: "Layers",
    title: "Stack aberta, sem lock-in",
    desc: "Trabalhamos com LLMs (OpenAI, Anthropic), Postgres, n8n, Vercel, Next.js. Você fica com o código, os dados e a documentação. Se quiser trocar de fornecedor amanhã, consegue.",
  },
  {
    icon: "GitBranch",
    title: "Entrega contínua, não big bang",
    desc: "Implementação em ciclos curtos. Você vê a primeira entrega rodando em 2-3 semanas. Ajustes entram no mesmo contrato, sem renegociar escopo a cada release.",
  },
  {
    icon: "Users",
    title: "Sua equipe opera, a gente sustenta",
    desc: "Não dependemos da sua equipe técnica interna. A gente opera o sistema no dia a dia. Sua equipe acompanha resultado, não vira refém de vendor.",
  },
];

export const STACK = [
  "OpenAI",
  "Anthropic",
  "Next.js",
  "Postgres",
  "Vercel",
  "n8n",
  "TypeScript",
  "Python",
];

export type Capability = {
  title: string;
  desc: string;
  cta?: { label: string; href: string };
  icon: string;
  variant?: "primary" | "default";
};

export const CAPABILITIES: readonly Capability[] = [
  {
    title: "Nexus Stock — gestão de estoque com IA",
    desc: "Previsão de demanda por SKU, alertas de ruptura antes de acontecer, controle de capital parado e sugestão automática de compra. Vendedor recebe aviso, gerente acompanha dashboard, decisão é informada.",
    icon: "Package",
    variant: "primary",
  },
  {
    title: "Nexus Copilot — copiloto de marketing",
    desc: "Geração de imagem, copy, pesquisa de mercado, análise de concorrência e insights automáticos. Briefings prontos pra aprovar. Integrado com Meta Ads, Google Ads e CRM.",
    icon: "Sparkles",
    variant: "primary",
  },
  {
    title: "Agentes sob medida",
    desc: "Atendimento, vendas, operações internas — qualquer processo repetitivo vira agente autônomo que entende contexto e age.",
    icon: "Bot",
    cta: { label: "Ver soluções", href: "/solucoes" },
  },
  {
    title: "Diagnóstico antes de proposta",
    desc: "1 a 2 semanas de mapeamento. Você sai com clareza sobre o que automatizar, quanto custa e o que deixar de lado.",
    icon: "Compass",
    cta: { label: "Ver processo", href: "/processo" },
  },
];

export const FAQ_HOME = [
  {
    q: "Vocês atendem qualquer porte de empresa?",
    a: "Sim. Atendemos desde PME até operação nacional. O escopo se ajusta — o método é o mesmo.",
  },
  {
    q: "Quanto custa um projeto típico?",
    a: "Depende do escopo do diagnóstico. O diagnóstico em si é gratuito. Proposta vem com valores claros por etapa, sem surpresa.",
  },
  {
    q: "Em quanto tempo vejo resultado?",
    a: "Primeiros ganhos operacionais entre 4 e 8 semanas após o início da implementação. O diagnóstico já entrega valor por si só.",
  },
];

export const COMPANY = {
  name: "Nexus AI",
  legalName: "Nexus AI",
  url: "https://nexusai.com.br",
  email: "raphaelschultz12@gmail.com",
  description:
    "Plataformas e agentes de IA que assumem o trabalho repetitivo, do atendimento à análise. Sua equipe fica livre pro que só humano faz.",
} as const;
