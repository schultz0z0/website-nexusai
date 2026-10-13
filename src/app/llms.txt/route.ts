import { SERVICES, servicePath } from "../../lib/service-content.ts";
import { COMPANY } from "../../lib/content.ts";

const CONTENT = `# Prometeus

> A Prometeus oferece plataformas personalizadas para marketing, estoque e vendas, além de atendimento com IA no WhatsApp, software sob medida e criação de sites e lojas virtuais.

## O que fazemos

- **Prometeus Copiloto**: CRM, campanhas e IA para organizar a operação de marketing, com apoio a estratégia, planejamento e análise de dados e concorrentes.
- **Prometeus Rastro**: Gestão de estoque e rastreabilidade de ativos, com registros de movimentação e apoio de IA para consultas.
- **Prometeus Soft Phone**: Soft phone e CRM em uma plataforma para equipes comerciais.
- **Atendimento com IA no WhatsApp**: Agente personalizado com fontes aprovadas, triagem e encaminhamento humano.
- **Software Sob Medida**: Aplicações, ferramentas internas, automações e integrações para os processos da empresa.
- **Sites, Lojas Virtuais & Presença Digital**: Criação de sites e lojas virtuais com identidade da empresa, design responsivo e preparação com SEO, GEO e AIO para descoberta no Google e em plataformas de IA. Sem garantia de indexação, posição ou recomendação.

## Como trabalhamos

1. **Demonstração e conversa**: Copiloto, Rastro e Soft Phone têm uma base demonstrativa pronta, apresentada em reunião de vendas. As prévias públicas são ilustrativas.
2. **Personalização**: Adaptamos a base aos fluxos e informações da empresa; as demais soluções são definidas a partir da necessidade.
3. **Proposta e entrega**: Escopo, prazo, investimento, código, dados, acessos e responsabilidades são definidos explicitamente.

## Serviços detalhados

- [Todos os serviços](${COMPANY.url}/servicos): Aplicações, requisitos e limites dos serviços.
${SERVICES.map((service) => `- [${service.name}](${COMPANY.url}${servicePath(service)}): ${service.description}`).join("\n")}

## Escopo e condições

Atendimento a empresas no Brasil. Nos projetos sob medida, viabilidade, investimento, prazo, acessos e responsabilidades são definidos após entender o contexto. A criação de site e loja virtual custa R$ 1.500, em 10 parcelas de R$ 150 sem juros ou R$ 1.425 no Pix (5% de desconto). Ambos exigem pacote adicional de R$ 50/mês, com hospedagem, domínio, manutenção da infraestrutura e 3 ajustes mensais. O checkout atual é apenas uma simulação e não realiza cobranças. Os exemplos conceituais nas páginas de serviços são ilustrativos. O portfólio de desenvolvimento web apresenta projetos reais: Jotape Publicidade (publicado) e Foxstage (em desenvolvimento). Código, dados e dependências de terceiros são tratados explicitamente no escopo.

## Páginas Principais

- [Início](https://agenciaprometeus.com.br): Apresentação da empresa, proposta de valor, garantias e fluxo de trabalho.
- [Diagnóstico / Contato](https://agenciaprometeus.com.br/contato): Solicitação de diagnóstico e contato com a equipe comercial.

## Informações Corporativas

- **Nome / Marca**: Prometeus
- **Site Oficial**: https://agenciaprometeus.com.br
- **E-mail de Contato**: comercial@agenciaprometeus.com.br
- **WhatsApp comercial**: +55 21 97323-1943. O contato agenda a demonstração dos produtos e a conversa sobre as soluções.
- **Atendimento**: Brasil (Nacional)

## Legal

- [Política de Privacidade](https://agenciaprometeus.com.br/privacidade)
- [Política de Cookies](https://agenciaprometeus.com.br/cookies)
`;

export function GET() {
  return new Response(CONTENT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
