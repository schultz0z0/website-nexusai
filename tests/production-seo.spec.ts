import { expect, test } from "@playwright/test";
import { SERVICES, servicePath } from "../src/lib/service-content";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../src/lib/site-metadata";

// The same read-only suite checks the release build and, after deploy,
// SEARCH_AUDIT_PUBLIC=1 checks the actual canonical host without a local server.
const pages = [
  { path: "/", title: SITE_TITLE, description: SITE_DESCRIPTION },
  { path: "/servicos" },
  ...SERVICES.map(service => ({ path: servicePath(service), title: service.seoTitle, description: service.description })),
  { path: "/contato" }, { path: "/privacidade" }, { path: "/cookies" },
];

test.describe("public search contract, without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("all canonical pages have unique metadata and meaningful server-rendered content", async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const entry of pages) {
      const response = await page.goto(entry.path);
      expect(response?.status(), entry.path).toBe(200);
      expect(response?.headers()["x-robots-tag"] ?? "").not.toMatch(/noindex|nosnippet|none/i);
      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(title).toContain("Prometeus");
      expect(description!.length).toBeGreaterThan(50);
      if (entry.title) expect(title).toBe(entry.title);
      if (entry.description) expect(description).toBe(entry.description);
      expect(titles.has(title), `duplicate title at ${entry.path}`).toBe(false);
      expect(descriptions.has(description!), `duplicate description at ${entry.path}`).toBe(false);
      titles.add(title); descriptions.add(description!);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("main h1")).toBeVisible();
      expect((await page.locator("main").innerText()).length).toBeGreaterThan(300);
      const canonical = SITE_URL + (entry.path === "/" ? "" : entry.path);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots).toMatch(/index, follow/);
      expect(robots).not.toMatch(/noindex|nosnippet|none/);
      const jsonLd = page.locator('script[type="application/ld+json"]');
      expect(await jsonLd.count()).toBeGreaterThan(0);
      for (const script of await jsonLd.all()) {
        const data = JSON.parse(await script.textContent() ?? "null");
        expect(data).toBeTruthy();
        expect(JSON.stringify(data)).not.toMatch(/localhost|127\.0\.0\.1|aggregateRating/);
      }
      for (const service of SERVICES) {
        expect(await page.locator(`a[href="${servicePath(service)}"]`).count(), `orphan offer on ${entry.path}`).toBeGreaterThan(0);
      }
    }
  });

  test("tracking and simulated checkout parameters never become canonical URLs", async ({ page }) => {
    await page.goto("/servicos/desenvolvimento-web?utm_source=chatgpt.com&offer=site&payment=pix");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", SITE_URL + "/servicos/desenvolvimento-web");
    await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute("content", /max-image-preview:large/);
    await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute("content", /max-snippet:-1/);
  });

  test("structured offers describe the visible price and mandatory maintenance", async ({ page }) => {
    await page.goto("/servicos/desenvolvimento-web");
    const schemas = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "null");
    const offers = schemas.find((node: { "@type": string }) => node["@type"] === "Service").offers;
    expect(offers).toHaveLength(2);
    await expect(page.locator("#ofertas")).toContainText("1.500");
    await expect(page.locator("#ofertas")).toContainText("50");
    for (const offer of offers) {
      expect(offer.price).toBe(1500);
      expect(offer.description).toContain("mensal adicional de R$ 50/mês");
      expect(offer.description).toContain("não realiza cobranças");
    }
  });
});

test("sitemap contains exactly the public page inventory and accessible real screenshots", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  expect(new Set(urls)).toEqual(new Set(pages.map(page => SITE_URL + (page.path === "/" ? "" : page.path))));
  expect(urls.every(url => !/[?#]/.test(url))).toBe(true);
  for (const match of xml.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
    const image = await request.get(new URL(match[1]).pathname);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toMatch(/^image\//);
  }
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  expect(await robots.text()).not.toMatch(/^Disallow:\s*\/$/m);
});

test("consolidated addresses redirect permanently and missing pages stay real 404s", async ({ request }) => {
  for (const [source, destination] of [
    ["/solucoes", "/#aplicacoes"], ["/processo", "/#como-trabalhamos"],
    ["/servicos/agentes-de-ia", "/servicos/atendimento-ia-whatsapp"],
    ["/servicos/automacao-de-processos", "/servicos/desenvolvimento-sob-medida"],
    ["/servicos/integracao-de-sistemas", "/servicos/desenvolvimento-sob-medida"],
  ]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect([301, 308]).toContain(response.status());
    expect(response.headers().location).toBe(destination);
  }
  for (const path of ["/servicos/not-a-service", "/pagina-que-nao-existe"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
    const html = await response.text();
    expect(html).toMatch(/name="robots" content="noindex/);
    expect(html).not.toContain('rel="canonical"');
  }
});

test("search crawlers receive the public offer content without a challenge", async ({ request }) => {
  for (const userAgent of ["Googlebot", "bingbot", "OAI-SearchBot", "PerplexityBot"]) {
    const response = await request.get("/servicos/prometeus-rastro", { headers: { "User-Agent": userAgent } });
    expect(response.status(), userAgent).toBe(200);
    expect(await response.text()).toContain("Controle de estoque e rastreabilidade de ativos");
  }
  // This checks header-based delivery, not access from the real providers' IPs.
});
