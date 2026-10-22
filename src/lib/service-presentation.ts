export type ServiceScene = "automation" | "agent" | "integration" | "software" | "web" | "copilot" | "trace" | "softphone";

export interface ServicePresentation {
  scene: ServiceScene;
  lead: string;
  applicationLead: string;
  demoTitle: string;
  stages: readonly [string, string, string];
  stageDetails: readonly [string, string, string];
  ctaLabel?: string;
  catalogImage?: string;
  catalogImageAlt?: string;
}

export const SERVICE_PRESENTATION: Record<string, ServicePresentation> = {
  "prometeus-copiloto": {
    catalogImage: "/images/offers/prometeus-copiloto.webp?v=20261014",
    catalogImageAlt: "Profissional diante de um painel de campanhas de marketing e CRM.",
    scene: "copilot", lead: "CRM para marketing, gestão de campanhas e IA em uma plataforma personalizada para sua empresa.",
    applicationLead: "Planejamento, informações e equipe no mesmo lugar.", demoTitle: "Seu marketing em uma visão comum.",
    stages: ["Campanhas organizadas", "Planejamento com IA", "Contexto no CRM"],
    stageDetails: ["A equipe acompanha campanhas, etapas e responsáveis.", "O agente apoia a construção de um plano para revisão da equipe.", "Informações comerciais ajudam a orientar o próximo contato."], ctaLabel: "Solicitar demonstração",
  },
  "prometeus-rastro": {
    catalogImage: "/images/offers/prometeus-rastro.webp?v=20261014",
    catalogImageAlt: "Profissional consultando etiquetas de equipamentos organizados no estoque.",
    scene: "trace", lead: "Controle seu estoque e acompanhe cada ativo. Com apoio de IA e uma operação feita para sua empresa.",
    applicationLead: "Identificação, movimentações e informações para consultar.", demoTitle: "Um ativo. Todo o seu histórico.",
    stages: ["Ativo identificado", "Movimentação registrada", "Informação consultada"],
    stageDetails: ["Cada item reúne identificação e informações do cadastro.", "Local e responsável acompanham o registro da movimentação.", "A equipe consulta o histórico com apoio do agente."], ctaLabel: "Solicitar demonstração",
  },
  "prometeus-soft-phone": {
    catalogImage: "/images/offers/prometeus-soft-phone.webp?v=20261014",
    catalogImageAlt: "Profissional com headset diante de uma interface de ligações e contatos.",
    scene: "softphone", lead: "Softphone com CRM: ligações, contatos e acompanhamento de vendas no mesmo lugar. Personalizado para sua equipe.",
    applicationLead: "Contato, conversa e continuidade na mesma experiência.", demoTitle: "Cada conversa com o contexto certo.",
    stages: ["Contato organizado", "Ligação com contexto", "Próxima ação no CRM"],
    stageDetails: ["O vendedor encontra as informações do contato.", "A experiência aproxima a telefonia do contexto comercial.", "O atendimento continua com a próxima ação registrada."], ctaLabel: "Solicitar demonstração",
  },
  "atendimento-ia-whatsapp": {
    catalogImage: "/images/offers/atendimento-ia-whatsapp.webp?v=20261014",
    catalogImageAlt: "Celular exibindo uma conversa de atendimento pelo WhatsApp.",
    scene: "agent", lead: "Atendimento no WhatsApp com agente de IA. Respostas para seus clientes e contexto para sua equipe continuar a conversa.",
    applicationLead: "Da primeira dúvida à conversa com uma pessoa.", demoTitle: "Seu atendimento com continuidade.",
    stages: ["Pergunta recebida", "Contexto consultado", "Conversa encaminhada à equipe"],
    stageDetails: ["O cliente traz uma dúvida sobre o serviço.", "O agente consulta informações aprovadas e reúne o contexto.", "A equipe assume com um resumo quando a conversa precisa de uma pessoa."], ctaLabel: "Quero IA no meu atendimento",
  },
  "desenvolvimento-web": {
    catalogImage: "/images/offers/sites-lojas-prometeus.webp?v=20261014",
    catalogImageAlt: "Site da Prometeus apresentado em um notebook e um celular.",
    scene: "web",
    lead: "Seu site ou sua loja virtual, com a identidade da sua marca. Uma presença digital feita para apresentar seu negócio e facilitar o próximo contato.",
    applicationLead: "Da primeira busca ao primeiro contato. Uma presença digital que ajuda a pessoa a entender o que sua empresa faz.",
    demoTitle: "Uma vitrine digital para o seu negócio.",
    stages: ["Estrutura do site definida", "Conteúdo e visual preparados", "Site publicado e SEO configurado"],
    stageDetails: ["As páginas organizam a apresentação da empresa, os serviços e os canais de contato.", "A identidade da marca acompanha textos, imagens e navegação em celular e desktop.", "O site recebe domínio, HTTPS e a base técnica para descoberta. A indexação é acompanhada no Google."],
  },
  "automacao-de-processos": {
    scene: "automation",
    lead: "Da entrada de um pedido à próxima ação. Conecte as etapas da rotina e deixe sua equipe cuidar das decisões.",
    applicationLead: "O trabalho avança. Sua equipe deixa de transportar informação de uma etapa para outra.",
    demoTitle: "Uma rotina que encontra o próximo passo.",
    stages: ["Solicitação recebida", "Informações conferidas", "Encaminhada para aprovação"],
    stageDetails: ["O pedido entra pelo formulário, com os dados necessários para iniciar o fluxo.", "As regras conferem os campos. Informações ausentes retornam para correção.", "O responsável recebe o pedido com contexto. A decisão de aprovar continua humana."],
  },
  "agentes-de-ia": {
    scene: "agent",
    lead: "Informações do seu negócio, ferramentas conectadas e limites claros. Um agente preparado para apoiar tarefas reais.",
    applicationLead: "Contexto para responder. Critérios para agir. Pessoas presentes quando a conversa precisa delas.",
    demoTitle: "Uma conversa com contexto e continuidade.",
    stages: ["Pergunta recebida", "Contexto consultado", "Conversa encaminhada à equipe"],
    stageDetails: ["Uma pessoa pergunta sobre o serviço. O agente começa pela solicitação recebida.", "O agente usa informações aprovadas e pergunta o que precisa entender antes de seguir.", "O resumo acompanha a conversa. Condições comerciais e exceções são confirmadas pela equipe."],
  },
  "integracao-de-sistemas": {
    scene: "integration",
    lead: "Os sistemas que você já usa, trabalhando juntos. Dados circulando com validação, rastreabilidade e regras definidas.",
    applicationLead: "A informação chega onde precisa estar, com uma origem definida e um caminho que pode ser acompanhado.",
    demoTitle: "Uma venda. Dois sistemas. Um fluxo.",
    stages: ["Oportunidade aprovada no CRM", "Campos mapeados e validados", "Registro enviado à operação"],
    stageDetails: ["Uma mudança de etapa no CRM inicia a transferência dos dados autorizados.", "O fluxo confere os campos e identifica o registro antes de enviar ao destino.", "A operação recebe o registro. Falhas e dados ausentes seguem para tratamento."],
  },
  "desenvolvimento-sob-medida": {
    catalogImage: "/images/offers/software-sob-medida.webp?v=20261014",
    catalogImageAlt: "Profissional desenvolvendo uma aplicação em um computador com dois monitores.",
    scene: "software",
    lead: "Uma aplicação para o que suas ferramentas atuais não atendem. Construída para a operação da sua empresa.",
    ctaLabel: "Quero uma solução sob medida",
    applicationLead: "Uma interface que acompanha seu processo, do primeiro pedido à decisão de quem é responsável.",
    demoTitle: "O trabalho da equipe, em uma visão comum.",
    stages: ["Solicitação registrada", "Responsável definido", "Pronta para revisão"],
    stageDetails: ["O pedido entra em um lugar comum, com as informações que a equipe precisa consultar.", "A solicitação recebe um responsável e uma etapa. Cada pessoa vê o que seu perfil permite.", "A equipe acompanha a pendência e revisa a entrega antes de concluir o trabalho."],
  },
};
