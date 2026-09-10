const CONTENT = `# Prometeus

> A Prometeus desenvolve automações, agentes de IA, integrações e soluções digitais sob medida para eliminar tarefas repetitivas, conectar processos e ampliar a capacidade operacional de empresas.

## O que fazemos

- **Automação de Processos & Rotinas**: Automação ponta a ponta de fluxos de trabalho repetitivos, reduzindo retrabalho e tempo manual.
- **Agentes de IA & Atendimento**: Agentes inteligentes com contexto de negócio, memória operacional e integração direta com canais de comunicação (WhatsApp, e-mail, CRM).
- **Integração de Sistemas**: Conexão entre ERPs, CRMs, planilhas, bancos de dados e APIs proprietárias sem necessidade de trocar os softwares atuais da empresa.
- **Ferramentas Internas Sob Medida**: Aplicações web dedicadas para resolução de gargalos operacionais específicos.

## Como trabalhamos

1. **Diagnóstico**: Localizamos onde o tempo e a eficiência da operação se perdem.
2. **Automação com Controle**: Construímos soluções com regras claras, limites e supervisão humana.
3. **Propriedade da Empresa**: Código, dados e documentação permanecem com o cliente.

## Páginas Principais

- [Início](https://agenciaprometeus.com.br): Apresentação da empresa, proposta de valor, garantias e fluxo de trabalho.
- [Diagnóstico / Contato](https://agenciaprometeus.com.br/contato): Solicitação de diagnóstico e contato com a equipe comercial.

## Informações Corporativas

- **Razão Social / Nome**: Prometeus
- **Site Oficial**: https://agenciaprometeus.com.br
- **E-mail de Contato**: comercial@agenciaprometeus.com.br
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
