const CONTENT = `# Prometeus

> A Prometeus desenvolve automações, agentes de IA, integrações e soluções sob medida para reduzir trabalho repetitivo e ampliar a capacidade operacional de empresas.

## Site

- [Início](https://agenciaprometeus.com.br/): visão geral da proposta da Prometeus.
- [Contato](https://agenciaprometeus.com.br/contato): solicitação de diagnóstico inicial.

## Legal

- [Política de Privacidade](https://agenciaprometeus.com.br/privacidade)
- [Política de Cookies](https://agenciaprometeus.com.br/cookies)
`;

export function GET() {
  return new Response(CONTENT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
