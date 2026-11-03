import { COMPANY } from "./content.ts";
import { COMMERCIAL_WHATSAPP } from "./commercial-contact.ts";
import { LLMS_TXT } from "./llms-content.ts";
import { SERVICES, getService, servicePath, type ServiceContent } from "./service-content.ts";

/**
 * Negociação de conteúdo Markdown (Accept: text/markdown) para agentes.
 * Regras de RFC 9110 §12.5.1: q-values, q=0 recusa o tipo e o intervalo
 * mais específico define o peso de cada tipo.
 */

export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";

interface MediaRange {
  type: string;
  subtype: string;
  q: number;
  index: number;
}

function parseAccept(header: string): MediaRange[] {
  return header
    .split(",")
    .map((part, index) => {
      const [range, ...params] = part.trim().split(";");
      const [type, subtype] = range.trim().toLowerCase().split("/");
      if (!type || !subtype) return null;
      let q = 1;
      for (const param of params) {
        const [key, value] = param.trim().split("=");
        if (key?.trim().toLowerCase() === "q") {
          const parsed = Number(value?.trim());
          q = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 0;
        }
      }
      return { type, subtype, q, index };
    })
    .filter((range): range is MediaRange => range !== null);
}

interface Match {
  q: number;
  specificity: number;
  index: number;
}

function matchMediaType(ranges: MediaRange[], mediaType: string): Match | null {
  const [type, subtype] = mediaType.split("/");
  let best: Match | null = null;
  for (const range of ranges) {
    const specificity =
      range.type === type && range.subtype === subtype ? 2
      : range.type === type && range.subtype === "*" ? 1
      : range.type === "*" && range.subtype === "*" ? 0
      : -1;
    if (specificity < 0) continue;
    if (!best || specificity > best.specificity) best = { q: range.q, specificity, index: range.index };
  }
  return best;
}

/**
 * Retorna true quando o cliente prefere Markdown a HTML.
 * Empates de q ficam com o intervalo mais específico, depois com a ordem do header;
 * sem preferência clara (ex.: o curl padrão, que aceita qualquer tipo), o HTML continua sendo o padrão.
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false;
  const ranges = parseAccept(accept);
  const markdown = matchMediaType(ranges, "text/markdown");
  if (!markdown || markdown.q === 0) return false;
  const html = matchMediaType(ranges, "text/html");
  if (!html || html.q === 0) return true;
  if (markdown.q !== html.q) return markdown.q > html.q;
  if (markdown.specificity !== html.specificity) return markdown.specificity > html.specificity;
  return markdown.specificity === 2 && markdown.index < html.index;
}

function bulletList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

const DISCOVERY_LINKS = `- [Página inicial](${COMPANY.url}/)
- [Resumo para IA (llms.txt)](${COMPANY.url}/llms.txt)
- [Mapa do site (sitemap.xml)](${COMPANY.url}/sitemap.xml)`;

export function homeMarkdown(): string {
  return `${LLMS_TXT.trimEnd()}

## Recursos para agentes

${DISCOVERY_LINKS}
`;
}

export function servicesIndexMarkdown(): string {
  return `# Serviços da Prometeus

> Produtos personalizáveis e soluções sob medida para empresas no Brasil.

${SERVICES.map((service) => `## [${service.name}](${COMPANY.url}${servicePath(service)})

${service.category}. ${service.description}`).join("\n\n")}

## Próximo passo

Agende uma demonstração ou converse sobre o seu caso em [Contato](${COMPANY.url}/contato).

## Recursos para agentes

${DISCOVERY_LINKS}
`;
}

export function serviceMarkdown(service: ServiceContent): string {
  return `# ${service.name}

> ${service.description}

${service.intro}

## Aplicações

${service.applications.map((item) => `### ${item.title}\n\n${item.text}`).join("\n\n")}

## Como funciona

${service.steps.map((step, index) => `${index + 1}. **${step.title}**: ${step.text}`).join("\n")}

## Requisitos

${bulletList(service.requirements)}

## Limites

${service.limits}

## Exemplo: ${service.example.title}

- **Antes**: ${service.example.before}
- **Depois**: ${service.example.after}

## Perguntas frequentes

${service.faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}

## Contato

- [Formulário de contato](${COMPANY.url}/contato)
- WhatsApp comercial: https://wa.me/${COMMERCIAL_WHATSAPP}
- E-mail: ${COMPANY.email}

## Recursos para agentes

- [Todos os serviços](${COMPANY.url}/servicos)
${DISCOVERY_LINKS}
`;
}

export function contactMarkdown(): string {
  return `# Contato e demonstrações | Prometeus

> Agende a demonstração dos produtos ou converse sobre software sob medida, atendimento com IA, sites e lojas virtuais.

## Canais

- **WhatsApp comercial**: https://wa.me/${COMMERCIAL_WHATSAPP}
- **E-mail**: ${COMPANY.email}
- **Formulário**: ${COMPANY.url}/contato (requer navegador)

Atendimento a empresas no Brasil. Escopo, prazo e investimento dos projetos sob medida são definidos depois de entender o contexto.

## Recursos para agentes

- [Todos os serviços](${COMPANY.url}/servicos)
${DISCOVERY_LINKS}
`;
}

export function notFoundMarkdown(pathname: string): string {
  return `# 404: página não encontrada

O endereço \`${pathname.replace(/`/g, "")}\` não existe em ${COMPANY.url} ou mudou de lugar.

Use um dos recursos abaixo para encontrar o conteúdo da Prometeus:

${DISCOVERY_LINKS}
- [Serviços](${COMPANY.url}/servicos)
- [Contato](${COMPANY.url}/contato)
`;
}

/** Rotas públicas que existem, mas só têm representação HTML (ou redirecionam). */
export const HTML_ONLY_ROUTES = new Set(["/privacidade", "/cookies", "/processo", "/solucoes"]);

export type MarkdownResolution =
  | { kind: "markdown"; status: 200 | 404; body: string }
  | { kind: "html" };

/** Decide o que servir a um cliente que prefere Markdown. */
export function resolveMarkdown(rawPathname: string): MarkdownResolution {
  const pathname = rawPathname.length > 1 ? rawPathname.replace(/\/+$/, "") : rawPathname;
  if (pathname === "/" || pathname === "") return { kind: "markdown", status: 200, body: homeMarkdown() };
  if (pathname === "/servicos") return { kind: "markdown", status: 200, body: servicesIndexMarkdown() };
  if (pathname === "/contato") return { kind: "markdown", status: 200, body: contactMarkdown() };
  const serviceMatch = /^\/servicos\/([^/]+)$/.exec(pathname);
  const service = serviceMatch ? getService(serviceMatch[1]) : undefined;
  if (service) return { kind: "markdown", status: 200, body: serviceMarkdown(service) };
  if (HTML_ONLY_ROUTES.has(pathname)) return { kind: "html" };
  return { kind: "markdown", status: 404, body: notFoundMarkdown(pathname) };
}
