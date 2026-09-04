export const COMPANY = {
  name: "Prometeus",
  legalName: "Prometeus",
  url: "https://agenciaprometeus.com.br",
  emails: [
    "raphaelschultz12@gmail.com",
    "esttevao.henrique@hotmail.com",
  ],
  email: "raphaelschultz12@gmail.com",
  description:
    "Soluções digitais sob medida para problemas reais de operação. Você traz o problema; a Prometeus constrói o que ele exige.",
} as const;

export const HOME_COPY = {
  value: {
    eyebrow: "DO TRABALHO REPETITIVO AO RESULTADO",
    title: ["Trabalho repetitivo vira", "capacidade."],
    lead: "Não encaixamos sua empresa em um produto pronto. Entendemos o problema, conectamos o que já existe e construímos a solução necessária.",
    outcomes: [
      {
        title: "Tempo recuperado",
        description: "Horas voltam para atendimento, decisão e crescimento.",
      },
      {
        title: "Menos retrabalho",
        description:
          "Dados circulam entre sistemas sem copiar, colar ou conferir duas vezes.",
      },
      {
        title: "Mais capacidade para crescer",
        description:
          "O volume aumenta sem a equipe crescer na mesma proporção.",
      },
    ],
    flow: [
      {
        step: "01 · DIAGNÓSTICO",
        title: "Localizamos onde o tempo se perde",
        description: "Tarefas, volume, exceções, sistemas e custo manual.",
      },
      {
        step: "02 · AUTOMAÇÃO",
        title: "Automatizamos com controle",
        description:
          "Integrações, regras e aprovações humanas dentro da rotina atual.",
      },
      {
        step: "03 · RESULTADO",
        title: "Medimos o que mudou",
        description: "Tempo poupado, erros evitados e capacidade entregue.",
      },
    ],
    guardrail: "Sem trocar toda a sua operação",
  },
  applications: {
    eyebrow: "SOB MEDIDA, DE VERDADE",
    title: "Seu problema não precisa caber numa ferramenta pronta.",
    body: "A solução pode ser uma automação, um agente, uma integração, um dashboard ou um produto inteiramente novo. A forma muda. O objetivo é resolver.",
  },
  demos: {
    eyebrow: "DA IDEIA À OPERAÇÃO",
    title: "Dois exemplos. Não um catálogo.",
    body: "Stock e Copilot mostram como a Prometeus transforma contextos diferentes em soluções funcionais. O próximo projeto começa no problema da sua empresa.",
  },
  assurances: {
    eyebrow: "PERSONALIZADO, NÃO IMPROVISADO",
    title: "Antes de construir, deixamos quatro coisas claras.",
  },
  cta: {
    eyebrow: "CONVERSA INICIAL",
    title: "Tem um problema que nenhuma ferramenta pronta resolveu?",
    body: "Conte o contexto. A gente ajuda a descobrir qual solução faz sentido construir. Se não houver uma oportunidade real, você também saberá.",
    label: "Falar com a equipe",
    microcopy: "Sem compromisso · uma pessoa responde · retorno em até 1 dia útil",
  },
} as const;

export const HOME_CAPABILITIES = [
  {
    id: "automate",
    title: "Automatizar o repetitivo",
    description: "Para a equipe voltar ao trabalho que exige decisão.",
  },
  {
    id: "connect",
    title: "Conectar o que está separado",
    description: "Sistemas, dados e pessoas operando no mesmo fluxo.",
  },
  {
    id: "decide",
    title: "Transformar dados em decisão",
    description: "Menos relatório manual. Mais contexto na hora certa.",
  },
  {
    id: "build",
    title: "Construir o que ainda não existe",
    description:
      "Ferramentas internas e produtos digitais desenhados para a realidade da empresa.",
  },
] as const;

export const HOME_DEMOS = [
  {
    id: "stock",
    label: "Demonstração funcional",
    name: "Stock",
    context:
      "Uma operação de estoque precisa reunir demanda, disponibilidade e reposição sem depender de conferências espalhadas.",
    solution:
      "Um painel que organiza os sinais da operação, destaca exceções e apoia o planejamento de compra por item.",
    humanDecision:
      "Prioridade, quantidade de compra e aprovação continuam com a equipe responsável.",
    cta: { href: "/contato", label: "Falar sobre algo parecido" },
  },
  {
    id: "copilot",
    label: "Demonstração funcional",
    name: "Copilot",
    context:
      "Um time de marketing precisa transformar pesquisa, briefing e produção em um fluxo mais conectado e revisável.",
    solution:
      "Um ambiente que organiza referências, gera pontos de partida e concentra a revisão das peças antes da publicação.",
    humanDecision:
      "Estratégia, direção criativa, aprovação e publicação continuam humanas.",
    cta: { href: "/contato", label: "Falar sobre algo parecido" },
  },
] as const;

export const HOME_ASSURANCES = [
  {
    id: "context",
    title: "Começa pelo contexto.",
    description:
      "Entendemos processo, pessoas, dados, volume e impacto antes de definir tecnologia.",
  },
  {
    id: "integration",
    title: "Integra com o que já funciona.",
    description:
      "A solução entra na operação sem exigir que tudo seja substituído.",
  },
  {
    id: "control",
    title: "Mantém decisões sob controle.",
    description:
      "Regras, aprovações, registros e limites fazem parte do sistema.",
  },
  {
    id: "ownership",
    title: "Continua sendo seu.",
    description: "Código, dados e documentação ficam com a empresa.",
  },
] as const;

export const HOME_FAQ = [
  {
    q: "Para que tipo de empresa a Prometeus faz sentido?",
    a: "O porte importa menos que o problema: volume, repetição, impacto operacional e falta de uma ferramenta que resolva o fluxo inteiro.",
  },
  {
    q: "Vocês integram as ferramentas que já usamos?",
    a: "O projeto começa entendendo os sistemas, dados e restrições atuais. A proposta define o que pode ser integrado e o que precisa ser adaptado.",
  },
  {
    q: "A automação toma decisões sozinha?",
    a: "Não por padrão. Aprovações humanas, limites, registros e caminhos de exceção são definidos conforme o risco de cada decisão.",
  },
  {
    q: "Quem fica com o código e os dados?",
    a: "Código, dados, acessos e documentação são tratados de forma explícita no escopo para que a empresa saiba o que recebe e controla.",
  },
  {
    q: "Quanto custa e quanto tempo leva?",
    a: "Prazo e investimento dependem do contexto, das integrações e do resultado esperado. Eles são definidos depois da conversa inicial, não por uma faixa genérica.",
  },
  {
    q: "Como vocês tratam segurança e LGPD?",
    a: "Requisitos de acesso, armazenamento, privacidade e rastreabilidade entram no desenho de cada projeto conforme os dados envolvidos. Necessidades específicas precisam ser confirmadas antes da proposta.",
  },
] as const;

export const CONTACT_COPY = {
  eyebrow: "CONVERSA INICIAL",
  title: "Conte o problema. A gente começa pelo contexto.",
  body: "Não precisa escrever um projeto. Explique o que consome tempo, quem é impactado e o que você gostaria que funcionasse melhor.",
  humanNote: "Sua mensagem é lida por uma pessoa.",
  fields: [
    { name: "nome", label: "Nome", required: true },
    { name: "email", label: "Email", required: true },
    { name: "telefone", label: "Telefone/WhatsApp", required: true },
    { name: "empresa", label: "Empresa (opcional)", required: false },
    {
      name: "mensagem",
      label: "Conte o problema e o contexto",
      required: true,
    },
  ],
} as const;
