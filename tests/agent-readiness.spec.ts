import { expect, test } from "@playwright/test";
import { COMPANY } from "../src/lib/content";
import { SITE_KEYWORDS } from "../src/lib/site-metadata";

test.describe("Agent readiness, content negotiation and structured data", () => {
  test("homepage serves Markdown with Vary: Accept when Accept: text/markdown is sent", async ({ request }) => {
    const response = await request.get("/", {
      headers: { Accept: "text/markdown" },
    });

    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"];
    expect(contentType).toMatch(/text\/markdown/i);
    const vary = response.headers()["vary"];
    expect(vary).toMatch(/Accept/i);

    const body = await response.text();
    expect(body.length).toBeGreaterThan(100);
    expect(body).toContain("# Prometeus");
    expect(body).toContain("Quando usar a Prometeus (when to use)");
    expect(body).toContain("Como um agente deve acionar a Prometeus (how to engage)");
    expect(body).toContain(`${COMPANY.url}/llms.txt`);
    expect(body).toContain(`${COMPANY.url}/sitemap.xml`);
  });

  test("homepage serves HTML with Vary: Accept when Accept: text/html is sent", async ({ request }) => {
    const response = await request.get("/", {
      headers: { Accept: "text/html" },
    });

    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"];
    expect(contentType).toMatch(/text\/html/i);
    const vary = response.headers()["vary"];
    expect(vary).toMatch(/Accept/i);

    const body = await response.text();
    expect(body).toContain("<!DOCTYPE html");
    expect(body).toContain("Multiplique a capacidade");
  });

  test("probe 404 serves Markdown error body with Vary: Accept when Accept: text/markdown is sent", async ({ request }) => {
    const probePath = "/__ora-404-probe-4bs2my3u";
    const response = await request.get(probePath, {
      headers: { Accept: "text/markdown" },
    });

    expect(response.status()).toBe(404);
    const contentType = response.headers()["content-type"];
    expect(contentType).toMatch(/text\/markdown/i);
    const vary = response.headers()["vary"];
    expect(vary).toMatch(/Accept/i);

    const body = await response.text();
    expect(body.length).toBeGreaterThan(20);
    expect(body).toContain("404");
    expect(body).toContain("não existe");
    expect(body).toContain(COMPANY.url);
    expect(body).toContain(`${COMPANY.url}/sitemap.xml`);
    expect(body).toContain(`${COMPANY.url}/llms.txt`);
  });

  test("probe 404 serves HTML error page when Accept: text/html is sent", async ({ request }) => {
    const probePath = "/__ora-404-probe-4bs2my3u";
    const response = await request.get(probePath, {
      headers: { Accept: "text/html" },
    });

    expect(response.status()).toBe(404);
    const contentType = response.headers()["content-type"];
    expect(contentType).toMatch(/text\/html/i);
    const vary = response.headers()["vary"];
    expect(vary).toMatch(/Accept/i);
  });

  test("homepage publishes complete Organization schema with PostalAddress and contactPoint", async ({ page }) => {
    await page.goto("/");

    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const allSchemas = scripts.flatMap((raw) => {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    });

    const org = allSchemas.find((s) => s["@type"] === "Organization");
    expect(org).toBeDefined();
    expect(org.name).toBe("Prometeus");
    expect(org.url).toBe(COMPANY.url);

    // Organization Address (PostalAddress)
    expect(org.address).toBeDefined();
    expect(org.address["@type"]).toBe("PostalAddress");
    expect(org.address.addressCountry).toBe("BR");
    expect(org.address.addressRegion).toBe("RJ");
    expect(org.address.addressLocality).toBe("Rio de Janeiro");

    // Organization ContactPoint
    expect(org.contactPoint).toBeDefined();
    expect(org.contactPoint["@type"]).toBe("ContactPoint");
    expect(org.contactPoint.contactType).toBe("sales");
    expect(org.contactPoint.email).toBe(COMPANY.email);
    expect(org.contactPoint.telephone).toMatch(/^\+5521/);

    // Discoverability: keywords & knowsAbout
    expect(Array.isArray(org.keywords)).toBe(true);
    expect(org.keywords).toContain("software sob medida");
    expect(Array.isArray(org.knowsAbout)).toBe(true);
    expect(org.knowsAbout.some((k: string) => k.toLowerCase().includes("software sob medida"))).toBe(true);

    // Meta keywords tag for discoverability
    const metaKeywords = await page.locator('meta[name="keywords"]').getAttribute("content");
    expect(metaKeywords).toBeTruthy();
    for (const kw of SITE_KEYWORDS.slice(0, 5)) {
      expect(metaKeywords).toContain(kw);
    }
  });

  test("contact page publishes Organization address in publisher", async ({ page }) => {
    await page.goto("/contato");

    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const allSchemas = scripts.flatMap((raw) => {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    });

    const contactPage = allSchemas.find((s) => s["@type"] === "ContactPage");
    expect(contactPage).toBeDefined();
    expect(contactPage.publisher).toBeDefined();
    expect(contactPage.publisher.address).toBeDefined();
    expect(contactPage.publisher.address["@type"]).toBe("PostalAddress");
    expect(contactPage.publisher.address.addressCountry).toBe("BR");
    expect(contactPage.publisher.contactPoint).toBeDefined();
  });
});

