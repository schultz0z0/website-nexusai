const CONTENT = `# Prometeus

> A Prometeus desenvolve automações, agentes de IA, integrações e soluções sob medida para reduzir trabalho repetitivo e ampliar a capacidade operacional de empresas.

## Site

- [Início](https://solucoes-nexus.tech/): visão geral da proposta da Prometeus.
- [Contato](https://solucoes-nexus.tech/contato): solicitação de diagnóstico inicial.

## Legal

- [Política de Privacidade](https://solucoes-nexus.tech/privacidade)
- [Política de Cookies](https://solucoes-nexus.tech/cookies)
`;

export function GET() {
  return new Response(CONTENT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
