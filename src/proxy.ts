import { NextResponse, type NextRequest } from "next/server";

import { MARKDOWN_CONTENT_TYPE, prefersMarkdown, resolveMarkdown } from "./lib/agent-markdown.ts";

/**
 * Negociação de conteúdo para agentes: a mesma URL responde HTML a navegadores
 * e Markdown a clientes que preferem `text/markdown` (acceptmarkdown.com).
 */
export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") return NextResponse.next();
  // Navegação interna do App Router (RSC) nunca recebe Markdown.
  if (request.headers.has("rsc") || request.headers.has("next-router-prefetch")) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Ignora assets estáticos públicos e arquivos com handlers próprios.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/videos") ||
    pathname === "/llms.txt" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/indexnow.txt" ||
    pathname === "/BingSiteAuth.xml" ||
    pathname === "/icon.png" ||
    pathname === "/apple-icon.png" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (!prefersMarkdown(request.headers.get("accept"))) {
    return NextResponse.next();
  }

  const resolution = resolveMarkdown(pathname);
  if (resolution.kind === "html") {
    return NextResponse.next();
  }

  const headers = new Headers({
    "Content-Type": MARKDOWN_CONTENT_TYPE,
    Vary: "Accept",
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Content-Length": String(new TextEncoder().encode(resolution.body).byteLength),
  });
  if (resolution.status === 404) headers.set("X-Robots-Tag", "noindex");

  return new NextResponse(request.method === "HEAD" ? null : resolution.body, {
    status: resolution.status,
    headers,
  });
}

export const config = {
  // Ignora arquivos internos de build estático e chunks
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
