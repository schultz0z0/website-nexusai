import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { SERVICES, servicePath } from "../src/lib/service-content";
import { assertNoHorizontalOverflow } from "./helpers/layout-assertions";

const origin = "https://agenciaprometeus.com.br";

test("publishes discovery files and the IndexNow ownership key", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Allow: /");
  expect(await robots.text()).toContain(`${origin}/sitemap.xml`);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml.match(/<loc>/g)).toHaveLength(9);
  for (const service of SERVICES) expect(xml).toContain(`${origin}${servicePath(service)}`);
  expect(xml).not.toMatch(/<loc>[^<]*\/(solucoes|processo)<\/loc>/);
  const key = await request.get("/indexnow.txt");
  expect(key.status()).toBe(200);
  expect((await key.text()).trim()).toBe(readFileSync("public/indexnow.txt", "utf8").trim());
});

test.describe("content readable without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  for (const service of SERVICES) {
    test(`serves ${service.slug} with canonical, schema and visible text`, async ({ page, request }) => {
      const path = servicePath(service);
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(service.name);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${origin}${path}`);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${origin}${path}`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
      await expect(page.locator("main")).toContainText(service.intro);
      const schemas = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "null");
      expect(schemas[0]["@type"]).toBe("Service");
      expect(schemas[0].url).toBe(`${origin}${path}`);
      expect(schemas[1].itemListElement.at(-1).item).toBe(`${origin}${path}`);
      await page.getByText(service.faqs[0].question, { exact: true }).click();
      await expect(page.getByText(service.faqs[0].answer, { exact: true })).toBeVisible();
      const botResponse = await request.get(path, { headers: { "User-Agent": "OAI-SearchBot" } });
      expect(botResponse.status()).toBe(200);
      expect(await botResponse.text()).toContain(service.intro);
    });
  }

  test("provides crawlable entry links and consistent canonical with UTM", async ({ page }) => {
    await page.goto("/servicos?utm_source=chatgpt.com");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${origin}/servicos`);
    for (const service of SERVICES) {
      await expect(page.locator(`main a[href="${servicePath(service)}"]`)).toHaveCount(1);
      await expect(page.locator(`footer a[href="${servicePath(service)}"]`)).toHaveCount(1);
    }
    await page.goto("/servicos/not-a-service");
    const robots = page.locator('meta[name="robots"]');
    expect(await robots.count()).toBeGreaterThan(0);
    for (const meta of await robots.all()) {
      await expect(meta).toHaveAttribute("content", /noindex/);
    }
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });
});

test("service routes return a real 404 for unknown slugs", async ({ request }) => {
  expect((await request.get("/servicos/not-a-service")).status()).toBe(404);
});

for (const width of [320, 390, 1440]) {
  test(`service content fits viewport ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/servicos", ...SERVICES.map(servicePath)]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await assertNoHorizontalOverflow(page);
      if (path === "/servicos/automacao-de-processos" && width !== 390) {
        await page.screenshot({ path: testInfo.outputPath(`services-${width}.png`), fullPage: true });
      }
    }
  });
}
