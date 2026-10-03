export interface ServiceContent {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  updatedAt: string;
  image: string;
  intro: string;
  applications: Array<{ title: string; text: string }>;
  steps: Array<{ title: string; text: string }>;
  requirements: string[];
  limits: string;
  example: { title: string; before: string; after: string };
  faqs: Array<{ question: string; answer: string }>;
}

// Atualize a data somente quando houver uma mudança editorial substancial.
export const SERVICES: ServiceContent[] = [
  {
    slug: "automacao-de-processos",
    name: "Automação de processos para empresas",
    shortName: "Automação de processos",
    description: "Automação de rotinas administrativas, comerciais e operacionais sob medida, com integração aos sistemas existentes e aprovações humanas.",
    updatedAt: "2026-10-03",
    image: "/images/capabilities/automate.webp",
    intro: "A Prometeus desenvolve automações para rotinas que repetem as mesmas etapas: receber dados, conferir informações, atualizar sistemas e encaminhar tarefas. O projeto começa no processo da empresa e define quais atividades podem ser executadas por software e quais continuam com a equipe.",
    applications: [
      { title: "Rotinas administrativas", text: "Organizar solicitações, conferir campos obrigatórios e encaminhar documentos para revisão. Exceções seguem para uma pessoa responsável, com o contexto necessário para decidir." },
      { title: "Operação comercial", text: "Distribuir contatos, atualizar etapas no CRM e avisar a equipe sobre pendências. Critérios de prioridade e momentos de intervenção humana são definidos no projeto." },
      { title: "Relatórios e acompanhamento", text: "Reunir dados disponíveis, preparar relatórios recorrentes e sinalizar divergências. A origem dos dados e a frequência de atualização precisam ser confirmadas antes da implementação." },
    ],
    steps: [
      { title: "Mapear a rotina", text: "Identificamos entradas, volume, responsáveis, regras e exceções. Essa leitura ajuda a escolher um processo com impacto operacional e condições reais de automação." },
      { title: "Construir e validar", text: "Implementamos o fluxo com dados de teste, acessos definidos e caminhos de aprovação. A equipe valida o comportamento em cenários previstos e em situações de falha." },
      { title: "Acompanhar a operação", text: "Definimos como observar execuções, corrigir erros e comparar o trabalho antes e depois. Monitoramento, manutenção e suporte são acordados no escopo." },
    ],
    requirements: ["Uma descrição da rotina e das exceções mais comuns.", "Os sistemas envolvidos e as possibilidades de acesso aos dados.", "Um responsável por validar regras e aprovar mudanças no processo.", "Uma referência do volume, do tempo manual e dos erros atuais."],
    limits: "Automatizar um processo não resolve, por si só, dados incompletos ou regras indefinidas. Atividades que exigem julgamento podem continuar humanas. A viabilidade depende dos acessos disponíveis e do comportamento dos sistemas envolvidos.",
    example: { title: "Da solicitação à aprovação", before: "Uma equipe recebe pedidos por formulário, copia informações para uma planilha e procura a pessoa que deve aprovar cada caso.", after: "Um fluxo poderia validar os campos, registrar o pedido e encaminhá-lo ao responsável. A aprovação continuaria humana e as informações faltantes seriam devolvidas para correção." },
    faqs: [
      { question: "Preciso trocar os sistemas que já uso?", answer: "O diagnóstico começa pelos sistemas atuais. Quando houver acesso adequado, a automação pode conectá-los. Limitações de API, permissões ou formato dos dados podem exigir adaptações, definidas antes da proposta." },
      { question: "Como saber se uma rotina vale a pena automatizar?", answer: "Observe frequência, volume, tempo manual, erros e custo de manutenção. Um processo repetitivo com regras claras costuma ser um bom candidato. A conversa inicial avalia esses fatores antes de recomendar uma construção." },
      { question: "Como vocês medem o resultado?", answer: "Podemos comparar tempo gasto, execuções concluídas, exceções e retrabalho, conforme os dados disponíveis. A referência inicial e as métricas são combinadas no projeto; o resultado não é presumido." },
    ],
  },
  {
    slug: "agentes-de-ia",
    name: "Agentes de IA para empresas",
    shortName: "Agentes de IA",
    description: "Agentes de IA sob medida para atendimento e rotinas internas, com contexto do negócio, integrações e encaminhamento para a equipe humana.",
    updatedAt: "2026-10-03",
    image: "/images/capabilities/decide.webp",
    intro: "Um agente de IA combina informações do negócio com ferramentas e regras para apoiar uma tarefa definida. Na Prometeus, o desenho parte do contexto: quem vai usar, quais informações podem ser consultadas, quais ações são permitidas e quando uma pessoa precisa assumir.",
    applications: [
      { title: "Atendimento e triagem", text: "Responder dúvidas com base em informações aprovadas, coletar contexto e encaminhar solicitações para a equipe. Canais como WhatsApp, e-mail e CRM dependem das contas e integrações disponíveis." },
      { title: "Consulta a conhecimento interno", text: "Ajudar uma equipe a localizar procedimentos e documentos autorizados. Permissões, fontes e atualização do conteúdo precisam acompanhar o uso do agente." },
      { title: "Apoio a tarefas operacionais", text: "Preparar resumos, classificar solicitações ou sugerir próximos passos. Ações sobre sistemas e dados ficam sujeitas a limites e aprovações definidos no projeto." },
    ],
    steps: [
      { title: "Definir tarefa e limites", text: "Escolhemos o objetivo do agente, os usuários, os canais e as decisões que permanecem humanas. Também identificamos informações que não devem ser acessadas ou expostas." },
      { title: "Preparar contexto e ferramentas", text: "Organizamos as fontes aprovadas e as integrações necessárias. Regras de acesso e critérios para encaminhar situações à equipe fazem parte da construção." },
      { title: "Avaliar antes de operar", text: "Testamos perguntas representativas, respostas incorretas, informações ausentes e tentativas de executar ações não permitidas. Os critérios de revisão e acompanhamento são combinados com a empresa." },
    ],
    requirements: ["Uma tarefa concreta e um público definido para o agente.", "Informações do negócio revisadas e fontes que podem ser utilizadas.", "Acesso autorizado aos canais e sistemas envolvidos.", "Um responsável pelo encaminhamento humano e pela atualização do conteúdo."],
    limits: "Modelos de IA podem produzir respostas incorretas. Por isso, o agente precisa de fontes, testes, limites e supervisão proporcionais ao uso. Não deve prometer condições comerciais nem tomar decisões sensíveis fora das regras aprovadas. Custos de modelos e canais são considerados no escopo.",
    example: { title: "Uma dúvida que chega ao atendimento", before: "Uma pessoa pergunta sobre um serviço e a equipe precisa reunir informações básicas antes de encaminhar a conversa.", after: "Um agente poderia consultar informações aprovadas, perguntar o contexto da solicitação e preparar um resumo para a equipe. Uma condição não documentada seria encaminhada para confirmação humana." },
    faqs: [
      { question: "Um agente de IA pode atender pelo WhatsApp?", answer: "Pode fazer parte do projeto quando a empresa tiver acesso a uma integração adequada. Configuração da conta, regras do canal, custos e encaminhamento humano precisam ser avaliados. Não presumimos que toda conta ou fluxo permita a mesma integração." },
      { question: "Qual é a diferença entre um chatbot e um agente?", answer: "Chatbots podem seguir fluxos de conversa e responder perguntas. Um agente pode também consultar fontes e executar ações por ferramentas, dentro de permissões definidas. O nome importa menos que a tarefa, os limites e a qualidade da operação." },
      { question: "O agente substitui toda a equipe de atendimento?", answer: "O projeto define as tarefas que fazem sentido apoiar ou automatizar. Negociações, exceções e decisões sensíveis podem continuar com pessoas. O encaminhamento humano precisa ser desenhado desde o início." },
    ],
  },
  {
    slug: "integracao-de-sistemas",
    name: "Integração de sistemas para empresas",
    shortName: "Integração de sistemas",
    description: "Integrações sob medida entre CRM, ERP, planilhas e APIs para conectar dados e processos, com validação, registros e tratamento de falhas.",
    updatedAt: "2026-10-03",
    image: "/images/capabilities/connect.webp",
    intro: "Integrar sistemas é fazer informações circularem entre ferramentas com regras claras. A Prometeus analisa os softwares que a empresa já utiliza e constrói conexões para reduzir transferências manuais, respeitando permissões, formatos e limites de cada sistema.",
    applications: [
      { title: "CRM e operação", text: "Levar informações de uma oportunidade aprovada para o sistema que organiza a entrega. O mapeamento define quais campos são necessários e como tratar registros incompletos ou duplicados." },
      { title: "Planilhas e sistemas de gestão", text: "Conectar dados usados pela equipe a uma fonte definida, quando houver acesso adequado. O fluxo precisa indicar qual sistema é responsável pela informação e como resolver conflitos." },
      { title: "APIs e eventos", text: "Conectar sistemas por APIs, eventos ou trocas de arquivos, conforme os recursos disponíveis. Frequência, limites de requisição e formato das mensagens orientam a implementação." },
    ],
    steps: [
      { title: "Identificar fontes e acessos", text: "Conferimos documentação, permissões e mecanismos de integração. Definimos a origem de cada dado e as condições em que ele deve circular." },
      { title: "Mapear e testar dados", text: "Estabelecemos correspondência entre campos, validações e identificação de registros. Testes incluem ausência de dados, duplicidade e indisponibilidade de um sistema." },
      { title: "Operar com rastreabilidade", text: "Definimos registros, alertas e formas de repetir uma transferência com segurança. A equipe precisa entender como acompanhar o fluxo e resolver exceções." },
    ],
    requirements: ["Os nomes e as versões dos sistemas envolvidos.", "Documentação de APIs ou outros mecanismos disponíveis de troca de dados.", "Permissões concedidas pelos responsáveis pelas ferramentas.", "Regras sobre origem dos dados, frequência e resolução de divergências."],
    limits: "A integração depende dos recursos oferecidos pelos fornecedores. Um software sem API pode exigir outro caminho ou tornar o projeto inviável. Limites de acesso, mudanças de versão e custos de terceiros precisam ser considerados. Sincronização em tempo real só é proposta quando a infraestrutura permite.",
    example: { title: "Uma venda aprovada chega à operação", before: "Depois de concluir uma oportunidade no CRM, a equipe digita os mesmos dados em outra ferramenta para iniciar o atendimento.", after: "Uma integração poderia encaminhar os dados autorizados após a aprovação, validar o registro e avisar quando faltasse informação. O sistema de destino continuaria responsável pela etapa operacional." },
    faqs: [
      { question: "Vocês conseguem integrar qualquer ERP ou CRM?", answer: "A possibilidade depende da documentação, das permissões e dos recursos disponíveis em cada ferramenta. A avaliação técnica acontece antes de confirmar a integração e o escopo." },
      { question: "O que acontece quando um sistema fica fora do ar?", answer: "O desenho pode incluir registros de falha, alertas e tentativas controladas de reprocessamento. A estratégia depende da tarefa e do risco de duplicar uma operação; esses critérios são definidos no projeto." },
      { question: "Como evitar dados duplicados?", answer: "É necessário definir identificadores, regras de atualização e uma origem para cada informação. Quando o sistema permite, o fluxo verifica se uma operação já foi aplicada antes de repeti-la." },
    ],
  },
  {
    slug: "desenvolvimento-sob-medida",
    name: "Desenvolvimento de software sob medida",
    shortName: "Software sob medida",
    description: "Desenvolvimento de ferramentas internas, dashboards e aplicações web para os processos da sua empresa, com escopo, integrações e documentação definidos.",
    updatedAt: "2026-10-03",
    image: "/images/capabilities/build.webp",
    intro: "Software sob medida faz sentido quando o processo da empresa exige algo que as ferramentas atuais não atendem. A Prometeus desenvolve aplicações web e ferramentas internas a partir do trabalho dos usuários, das informações disponíveis e das decisões que precisam tomar.",
    applications: [
      { title: "Ferramentas internas", text: "Organizar solicitações, aprovações e etapas de trabalho em uma interface adequada à equipe. Perfis de acesso e responsabilidades fazem parte do desenho da aplicação." },
      { title: "Dashboards operacionais", text: "Reunir indicadores e destacar situações que exigem atenção. As definições das métricas e a qualidade das fontes precisam ser validadas para que o painel apoie decisões." },
      { title: "Aplicações para um novo fluxo", text: "Construir uma experiência para um processo ou produto digital específico. O projeto define uma primeira entrega útil e o que pode evoluir depois da validação com usuários." },
    ],
    steps: [
      { title: "Entender usuários e decisões", text: "Mapeamos o trabalho atual e o objetivo de cada pessoa. Essa análise orienta o escopo e ajuda a evitar funções que não resolvem uma necessidade concreta." },
      { title: "Desenhar e construir", text: "Organizamos telas, dados, acessos e integrações. A empresa acompanha a validação das funções previstas e dos critérios de aceite." },
      { title: "Preparar entrega e evolução", text: "Documentação, acessos, hospedagem e responsabilidades de manutenção são tratados no escopo. Depois da entrega, novas necessidades podem orientar etapas futuras." },
    ],
    requirements: ["Uma descrição do problema e das pessoas que usarão a ferramenta.", "Exemplos de tarefas, dados e decisões que a aplicação precisa apoiar.", "Critérios para validar a primeira entrega.", "Definições sobre acesso, infraestrutura, manutenção e propriedade."],
    limits: "Construir uma aplicação também exige manter infraestrutura, dependências e integrações ao longo do tempo. Uma ferramenta pronta pode ser mais adequada quando já atende ao processo. Prazo e investimento dependem do escopo, das fontes de dados e dos requisitos de operação.",
    example: { title: "Solicitações acompanhadas em um só lugar", before: "Uma equipe acompanha pedidos em conversas e planilhas, sem uma visão comum de responsáveis e pendências.", after: "Uma ferramenta interna poderia reunir solicitações, responsáveis e aprovações em um fluxo definido. O que cada usuário pode consultar ou alterar seria determinado por seu perfil." },
    faqs: [
      { question: "Quando escolher software sob medida em vez de uma ferramenta pronta?", answer: "Compare o ajuste ao processo, o esforço de adaptação, as integrações e o custo de manter cada opção. Se uma ferramenta existente já atende à necessidade, construir outra pode não fazer sentido." },
      { question: "Quem fica com o código, os dados e os acessos?", answer: "Esses pontos são definidos de forma explícita no escopo e na entrega, incluindo dependências de terceiros. A empresa deve saber o que recebe, o que controla e quais serviços precisam ser mantidos." },
      { question: "Vocês desenvolvem dashboards?", answer: "Dashboards e painéis operacionais podem fazer parte do projeto. Antes da construção, definimos as fontes, as métricas, a frequência de atualização e as decisões que o painel precisa apoiar." },
    ],
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function servicePath(service: Pick<ServiceContent, "slug">): string {
  return `/servicos/${service.slug}`;
}
