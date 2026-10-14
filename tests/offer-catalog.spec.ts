import { expect, test } from "@playwright/test";
import { SERVICES, servicePath } from "../src/lib/service-content";

test("catalog presents exactly the six approved offers without technical categories", async ({ page }) => {
  await page.goto("/servicos");
  const products = page.getByRole("region", { name: "Conheça nossos produtos." });
  const solutions = page.getByRole("region", { name: "Soluções para o seu próximo passo." });
  await expect(products.getByRole("link")).toHaveCount(3);
  await expect(solutions.getByRole("link")).toHaveCount(3);
  for (const service of SERVICES) await expect(page.locator(`main a[href="${servicePath(service)}"]`)).toHaveCount(1);
  await expect(page.locator('main a[href="/servicos/automacao-de-processos"], main a[href="/servicos/agentes-de-ia"], main a[href="/servicos/integracao-de-sistemas"]')).toHaveCount(0);
});

test("old service URLs permanently forward to relevant offers", async ({ request }) => {
  for (const [source,destination] of [["automacao-de-processos","desenvolvimento-sob-medida"],["integracao-de-sistemas","desenvolvimento-sob-medida"],["agentes-de-ia","atendimento-ia-whatsapp"]]) {
    const response = await request.get(`/servicos/${source}`, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(`/servicos/${destination}`);
  }
});

test("product CTAs request private demonstrations at the official WhatsApp number", async ({ page }) => {
  for (const service of SERVICES.filter(item=>item.kind==="product")) {
    await page.goto(servicePath(service));
    const cta = page.getByRole("link", { name: service.slug === "prometeus-rastro" ? "Agendar demonstração" : "Solicitar demonstração", exact: true }).first();
    const url = new URL(await cta.getAttribute("href") ?? "");
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/5521973231943");
    expect(url.searchParams.get("text")).toContain(service.name);
    expect(url.searchParams.get("text")).toContain("personalização");
    await expect(page.locator("main")).toContainText("Demonstração em reunião");
    if (service.slug === "prometeus-rastro") {
      await expect(page.locator("#rastro-em-acao")).toContainText("Telas reais do demonstrativo");
    } else {
      await expect(page.getByRole("region",{name:"Exemplo na prática"})).toContainText("Prévia ilustrativa");
    }
  }
});
