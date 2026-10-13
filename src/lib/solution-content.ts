import type { ServiceContent } from "./service-content.ts";

export const SPECIALIZED_OFFERS: ServiceContent[] = [
  {
    slug: "prometeus-copiloto", kind: "product", name: "Prometeus Copiloto", shortName: "Prometeus Copiloto",
    description: "CRM, campanhas e IA em uma plataforma de marketing personalizada para sua empresa. Solicite uma demonstração do Prometeus Copiloto pelo WhatsApp.",
    updatedAt: "2026-10-13", image: "/images/capabilities/decide.webp",
    intro: "Organize campanhas, reúna informações do CRM e use IA para apoiar estratégias, planejamento e análise de dados e concorrentes.",
    applications: [
      { title: "Campanhas organizadas", text: "Planejamento, etapas e responsáveis em uma visão comum para sua equipe." },
      { title: "CRM conectado ao marketing", text: "Informações comerciais próximas das campanhas e das decisões do dia a dia." },
      { title: "IA como copiloto", text: "Apoio para planejar, analisar dados e pesquisar concorrentes, com revisão da equipe." },
    ],
    steps: [
      { title: "Conheça a plataforma", text: "Mostramos o demonstrativo em uma reunião com sua equipe." },
      { title: "Traga sua operação", text: "Definimos os fluxos, informações e conexões que sua empresa precisa." },
      { title: "Receba sua versão", text: "Personalizamos a base e validamos o uso com quem opera o marketing." },
    ],
    requirements: [], limits: "As funcionalidades, integrações, fontes de dados, prazo e investimento são definidos na proposta. A IA apoia a equipe; análises e estratégias precisam de revisão humana.",
    example: { title: "Da campanha ao próximo passo", before: "Planejamento, contatos e análises espalhados entre ferramentas.", after: "Uma plataforma para acompanhar campanhas, consultar o CRM e planejar com apoio de IA." },
    faqs: [
      { question: "O Copiloto é personalizado para minha empresa?", answer: "Sim. Partimos de uma base demonstrativa pronta e personalizamos a plataforma com os fluxos, informações e integrações definidos para sua operação de marketing." },
      { question: "Como posso ver a demonstração?", answer: "Fale com a equipe pelo WhatsApp para agendar uma reunião. O demonstrativo é apresentado nessa conversa; as telas desta página são prévias ilustrativas." },
      { question: "O que o agente de IA faz?", answer: "A proposta inclui apoio à estratégia, planejamento de campanhas e análise de dados e concorrentes. Fontes, ferramentas e permissões são definidos para cada empresa, com revisão humana das respostas." },
      { question: "Quanto custa?", answer: "O investimento e as condições de implantação são definidos após conhecer sua operação e o nível de personalização. A demonstração ajuda a construir essa proposta." },
    ],
  },
  {
    slug: "prometeus-rastro", kind: "product", name: "Prometeus Rastro", shortName: "Prometeus Rastro",
    description: "Gestão de estoque e rastreabilidade de ativos com apoio de IA, personalizada para sua empresa. Conheça o Prometeus Rastro em uma demonstração com a equipe.",
    updatedAt: "2026-10-13", image: "/images/capabilities/connect.webp",
    intro: "Reúna o estoque, acompanhe a localização e o histórico de cada ativo e consulte as informações com apoio de IA.",
    applications: [
      { title: "Cada ativo identificado", text: "Cadastros e informações para reconhecer os itens do seu estoque." },
      { title: "Movimentações com histórico", text: "Acompanhe localização, responsáveis e registros de entrada, saída e transferência." },
      { title: "IA para consultar", text: "Apoio para encontrar informações e compreender registros do estoque." },
    ],
    steps: [
      { title: "Veja o Rastro", text: "Apresentamos a base demonstrativa em uma reunião." },
      { title: "Mapeie seu estoque", text: "Organizamos os tipos de ativos, locais e regras da sua operação." },
      { title: "Valide sua versão", text: "Personalizamos os cadastros e os fluxos com sua equipe." },
    ],
    requirements: [], limits: "A rastreabilidade depende da identificação dos ativos e do registro das movimentações. Integrações, formas de identificação e fontes de dados são definidas no projeto. Não prometemos rastreamento físico automático ou cobertura absoluta sem validar sua operação.",
    example: { title: "Um ativo, uma história", before: "Informações do estoque dispersas, sem uma visão comum das movimentações.", after: "Cada ativo com identificação, localização e histórico disponíveis para consulta." },
    faqs: [
      { question: "O Rastro acompanha cada ativo individualmente?", answer: "A proposta é identificar cada ativo e reunir seu histórico de movimentações. A cobertura depende do cadastro e dos registros da operação; formas de identificação e captura são definidas na personalização." },
      { question: "Preciso adaptar meu estoque à plataforma?", answer: "Partimos do demonstrativo e personalizamos cadastros, locais, responsáveis e fluxos para sua empresa. A reunião ajuda a entender como seu estoque funciona." },
      { question: "Como a IA ajuda?", answer: "O agente apoia consultas e entendimento das informações do estoque, conforme os dados e permissões disponíveis. Registros de entrada, saída e movimentação seguem as regras da operação." },
      { question: "Como conhecer valores e a demonstração?", answer: "Agende uma conversa pelo WhatsApp. Mostramos a plataforma e definimos uma proposta de implantação e personalização para sua operação." },
    ],
  },
  {
    slug: "prometeus-soft-phone", kind: "product", name: "Prometeus Soft Phone", shortName: "Prometeus Soft Phone",
    description: "Soft phone e CRM para equipes comerciais, em uma plataforma personalizada para sua operação. Solicite uma demonstração do Prometeus Soft Phone.",
    updatedAt: "2026-10-13", image: "/images/capabilities/automate.webp",
    intro: "Aproxime ligações, contatos e acompanhamento comercial. Uma plataforma personalizada para o jeito que sua equipe atende e vende.",
    applications: [
      { title: "Ligações na plataforma", text: "Telefonia próxima das informações que o vendedor precisa consultar." },
      { title: "Contatos no CRM", text: "Dados e contexto comercial organizados para dar continuidade ao atendimento." },
      { title: "Acompanhamento da equipe", text: "Registros e próximas ações para acompanhar o trabalho comercial." },
    ],
    steps: [
      { title: "Veja a experiência", text: "Mostramos o soft phone e o CRM no demonstrativo." },
      { title: "Defina sua operação", text: "Entendemos a equipe, os fluxos de venda e a estrutura de telefonia." },
      { title: "Comece com sua versão", text: "Personalizamos a plataforma e validamos os fluxos comerciais." },
    ],
    requirements: [], limits: "A telefonia depende do provedor, dos números e da infraestrutura definidos no projeto. Custos de chamadas e recursos como gravação ou discadores não estão presumidos na oferta.",
    example: { title: "Do contato à próxima conversa", before: "Ligações e informações comerciais em lugares diferentes.", after: "O contato, a ligação e a próxima ação acompanhados na mesma experiência." },
    faqs: [
      { question: "O Soft Phone já inclui um CRM?", answer: "Sim. A proposta reúne soft phone e CRM para equipes comerciais. Campos, etapas e fluxos são personalizados conforme a operação da empresa." },
      { question: "Como funciona a telefonia?", answer: "A implantação considera o provedor, os números, os acessos e a infraestrutura disponíveis. Esses pontos e os custos de chamadas são definidos na proposta; não presumimos que toda estrutura atual seja compatível." },
      { question: "A plataforma é personalizada para minha equipe?", answer: "Sim. O demonstrativo é a base para definir como contatos, ligações e acompanhamento comercial devem funcionar na sua empresa." },
      { question: "Posso conhecer antes de contratar?", answer: "Solicite uma demonstração pelo WhatsApp. Em reunião, apresentamos a plataforma e conversamos sobre a personalização e o investimento." },
    ],
  },
  {
    slug: "atendimento-ia-whatsapp", kind: "solution", name: "Atendimento com IA no WhatsApp", shortName: "IA no WhatsApp",
    description: "Agente de IA para atendimento no WhatsApp, com informações do seu negócio, triagem e encaminhamento para a equipe. Implantação sob medida pela Prometeus.",
    updatedAt: "2026-10-13", image: "/images/cinematic/contact-hero-desktop.webp",
    intro: "Um agente para responder dúvidas, reunir o contexto da solicitação e encaminhar a conversa para sua equipe quando necessário.",
    applications: [
      { title: "Dúvidas respondidas", text: "Respostas apoiadas nas informações que sua empresa aprova." },
      { title: "Solicitações organizadas", text: "Coleta do contexto necessário para sua equipe continuar o atendimento." },
      { title: "Pessoas no momento certo", text: "Encaminhamento humano para negociações, exceções e decisões que exigem a equipe." },
    ],
    steps: [
      { title: "Entenda o atendimento", text: "Mapeamos dúvidas, canais e momentos de encaminhamento humano." },
      { title: "Prepare o agente", text: "Organizamos informações aprovadas, ferramentas e regras de atuação." },
      { title: "Teste com sua equipe", text: "Validamos respostas e exceções antes de colocar o fluxo em operação." },
    ],
    requirements: [], limits: "A implantação depende dos acessos e da integração disponíveis no WhatsApp. Custos de canal e modelos são definidos na proposta. A IA pode errar e precisa de testes, revisão e encaminhamento humano.",
    example: { title: "Uma conversa com continuidade", before: "A equipe precisa repetir as informações básicas em cada nova conversa.", after: "O agente reúne o contexto e a equipe assume com as informações necessárias." },
    faqs: [
      { question: "O agente usa informações da minha empresa?", answer: "Sim. Preparamos as fontes aprovadas e definimos o que pode ser consultado e respondido. A atualização dessas informações faz parte das responsabilidades combinadas no projeto." },
      { question: "Uma pessoa pode assumir a conversa?", answer: "Sim. O fluxo prevê encaminhamento humano em situações definidas com sua equipe, como negociações, exceções e informações que precisam de confirmação." },
      { question: "Posso usar meu WhatsApp atual?", answer: "Precisamos avaliar a conta, a integração disponível e os acessos necessários. A proposta define a implantação, os custos do canal e as condições para sua operação." },
      { question: "Quanto custa o atendimento com IA?", answer: "O investimento depende do fluxo, das fontes, das conexões e do volume de atendimento. Converse com a equipe pelo WhatsApp para receber uma proposta." },
    ],
  },
  {
    slug: "desenvolvimento-sob-medida", kind: "solution", name: "Software sob medida", shortName: "Software sob medida",
    description: "Ferramentas internas, dashboards e aplicações web construídos para a operação da sua empresa, com integrações e perfis de acesso definidos.",
    updatedAt: "2026-10-13", image: "/images/capabilities/build.webp",
    intro: "Desenvolvemos aplicações para organizar o trabalho, os dados e as decisões que suas ferramentas atuais não atendem.",
    applications: [
      { title: "Ferramentas internas", text: "Solicitações, responsáveis e aprovações em uma experiência feita para sua equipe." },
      { title: "Painéis para decidir", text: "Informações relevantes da operação reunidas para acompanhar o trabalho." },
      { title: "Conexões e automações", text: "Integrações entre sistemas e rotinas automatizadas como parte da solução." },
    ],
    steps: [
      { title: "Conte o problema", text: "Entendemos o trabalho e o que a primeira entrega precisa resolver." },
      { title: "Defina sua ferramenta", text: "Organizamos telas, dados, acessos e critérios de validação." },
      { title: "Construa e valide", text: "Sua equipe acompanha a construção e a preparação para uso." },
    ],
    requirements: [], limits: "Escopo, prazo, investimento, infraestrutura e manutenção são definidos na proposta. Uma ferramenta existente pode ser mais adequada quando já atende à necessidade da empresa.",
    example: { title: "O trabalho em uma visão comum", before: "Pedidos, responsáveis e pendências espalhados em conversas e planilhas.", after: "Uma ferramenta para acompanhar solicitações e decisões com perfis de acesso definidos." },
    faqs: [
      { question: "Quando faz sentido construir software sob medida?", answer: "Quando as ferramentas atuais não atendem a um processo importante da empresa. Começamos pela necessidade e comparamos o que pode ser adaptado, conectado ou construído." },
      { question: "Pode incluir automação e integração com outros sistemas?", answer: "Sim. Automações, agentes de IA e integrações podem fazer parte da aplicação. A viabilidade depende dos acessos e recursos disponíveis nas ferramentas envolvidas." },
      { question: "Quem fica com o código, os dados e os acessos?", answer: "Esses pontos são definidos explicitamente na proposta e na entrega, incluindo dependências de terceiros. A empresa deve saber o que recebe e quais serviços precisam ser mantidos." },
      { question: "Qual é o preço e o prazo?", answer: "Dependem da primeira entrega, das funções e das integrações necessárias. A conversa inicial ajuda a organizar uma proposta com escopo e condições claros." },
    ],
  },
];
