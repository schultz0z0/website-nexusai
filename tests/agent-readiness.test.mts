import assert from "node:assert/strict";
import test from "node:test";

import { prefersMarkdown, resolveMarkdown } from "../src/lib/agent-markdown.ts";
import { GET } from "../src/app/llms.txt/route.ts";
import { SITE_KEYWORDS } from "../src/lib/site-metadata.ts";
import { SERVICES, servicePath } from "../src/lib/service-content.ts";
import { COMPANY } from "../src/lib/content.ts";

test("prefersMarkdown follows RFC 9110 content negotiation rules", () => {
  // Pure markdown request
  assert.equal(prefersMarkdown("text/markdown"), true);
  assert.equal(prefersMarkdown("text/markdown; charset=utf-8"), true);

  // Agent with weighted preference for markdown
  assert.equal(prefersMarkdown("text/markdown, text/html;q=0.8, */*;q=0.1"), true);
  assert.equal(prefersMarkdown("text/html;q=0.5, text/markdown;q=0.9"), true);

  // Client preferring HTML over markdown
  assert.equal(prefersMarkdown("text/html, text/markdown;q=0.2"), false);
  assert.equal(prefersMarkdown("text/html;q=0.9, text/markdown;q=0.5"), false);

  // Typical desktop browser headers
  assert.equal(
    prefersMarkdown(
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    ),
    false,
  );

  // Default curl / generic wildcard
  assert.equal(prefersMarkdown("*/*"), false);
  assert.equal(prefersMarkdown(""), false);
  assert.equal(prefersMarkdown(null), false);
  assert.equal(prefersMarkdown(undefined), false);

  // Explicit rejection (q=0)
  assert.equal(prefersMarkdown("text/markdown;q=0, text/html;q=0.9"), false);

  // Equal preference tie-breaker by order
  assert.equal(prefersMarkdown("text/markdown, text/html"), true);
  assert.equal(prefersMarkdown("text/html, text/markdown"), false);
});

test("agent 404 returns a compliant markdown error response with links", () => {
  const probePath = "/__ora-404-probe-4bs2my3u";
  const result = resolveMarkdown(probePath);

  assert.equal(result.kind, "markdown");
  if (result.kind === "markdown") {
    assert.equal(result.status, 404);
    // At least 20 characters explaining the error
    assert.ok(result.body.length > 100);
    assert.match(result.body, /404/);
    assert.match(result.body, /página não encontrada/i);
    // Links to sitemap, llms.txt, or docs
    assert.ok(result.body.includes(`${COMPANY.url}/llms.txt`));
    assert.ok(result.body.includes(`${COMPANY.url}/sitemap.xml`));
    assert.ok(result.body.includes(`${COMPANY.url}/`));
  }
});

test("homepage negotiation produces rich markdown with agent guidance", () => {
  const result = resolveMarkdown("/");
  assert.equal(result.kind, "markdown");
  if (result.kind === "markdown") {
    assert.equal(result.status, 200);
    assert.match(result.body, /# Prometeus/);
    assert.match(result.body, /Quando usar a Prometeus \(when to use\)/i);
    assert.match(result.body, /Quando não usar a Prometeus \(when not to use\)/i);
    assert.match(result.body, /Como um agente deve acionar a Prometeus \(how to engage\)/i);
    assert.ok(result.body.includes(`${COMPANY.url}/llms.txt`));
    assert.ok(result.body.includes(`${COMPANY.url}/sitemap.xml`));
  }
});

test("service detail pages provide actionable markdown representations", () => {
  for (const service of SERVICES) {
    const result = resolveMarkdown(servicePath(service));
    assert.equal(result.kind, "markdown");
    if (result.kind === "markdown") {
      assert.equal(result.status, 200);
      assert.match(result.body, new RegExp(`# ${service.name}`));
      assert.ok(result.body.includes(service.intro));
      assert.ok(result.body.includes("Requisitos"));
      assert.ok(result.body.includes("Limites"));
    }
  }
});

test("llms.txt contains explicit when-to-use and agent engagement guidance", async () => {
  const response = GET();
  assert.equal(response.status, 200);
  const text = await response.text();

  assert.ok(text.includes("Quando usar a Prometeus (when to use)"));
  assert.ok(text.includes("Quando não usar a Prometeus (when not to use)"));
  assert.ok(text.includes("Como um agente deve acionar a Prometeus (how to engage)"));
  assert.match(text, /desenvolvimento-sob-medida/);
  assert.match(text, /atendimento-ia-whatsapp/);
  assert.match(text, /prometeus-copiloto/);
  assert.match(text, /prometeus-rastro/);
  assert.match(text, /prometeus-soft-phone/);
  assert.match(text, /desenvolvimento-web/);
});

test("brand keywords and product terms are defined for discoverability", () => {
  assert.ok(SITE_KEYWORDS.includes("Prometeus"));
  assert.ok(SITE_KEYWORDS.includes("software sob medida"));
  assert.ok(SITE_KEYWORDS.includes("automação e IA"));
  assert.ok(SITE_KEYWORDS.includes("agentes de IA"));
  assert.ok(SITE_KEYWORDS.includes("Prometeus Copiloto"));
  assert.ok(SITE_KEYWORDS.includes("Prometeus Rastro"));
  assert.ok(SITE_KEYWORDS.includes("Prometeus Soft Phone"));
  assert.ok(SITE_KEYWORDS.includes("atendimento com IA no WhatsApp"));
  assert.ok(SITE_KEYWORDS.includes("criação de sites e lojas virtuais"));
});
