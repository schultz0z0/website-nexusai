import { expect, test } from "@playwright/test";

test.describe("SEO, discovery and consent", () => {
  test("publishes crawl resources and a real 404", async ({ request }) => {
    const resources = [
      ["/robots.txt", "User-Agent: *"],
      ["/sitemap.xml", "solucoes-nexus.tech"],
      ["/llms.txt", "# Prometeus"],
    ] as const;

    for (const [path, marker] of resources) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      expect(await response.text(), path).toContain(marker);
    }

    const missing = await request.get("/teste-404-nexus-que-nao-existe");
    expect(missing.status()).toBe(404);
  });

  test("renders canonical metadata and keeps UTM out of canonical", async ({ page }) => {
    await page.goto("/?utm_source=test&utm_campaign=qa");
    await expect(page).toHaveTitle(/Prometeus \| Automação e IA sob medida para empresas/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Automações, agentes de IA/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://solucoes-nexus.tech");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-image\.png/);
  });

  test("publishes the Prometeus identity while keeping the current domain", async ({ page }) => {
    for (const path of ["/", "/contato", "/privacidade", "/cookies"]) {
      await page.goto(path);
      await expect(page.locator("body")).not.toContainText("Nexus AI");
      await expect(page.locator("body")).not.toContainText("Nexus Stock");
      await expect(page.locator("body")).not.toContainText("Nexus Copilot");
    }
    await page.goto("/");
    await expect(page.locator('[data-site-navigation="true"] a[aria-label="Prometeus — voltar ao início"]')).toBeVisible();
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Prometeus");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://solucoes-nexus.tech");
  });

  test("emits baseline security headers", async ({ request }) => {
    const response = await request.get("/");
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response.headers()["x-frame-options"]).toBe("DENY");
    expect(response.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(response.headers()["permissions-policy"]).toContain("camera=()");
    expect(response.headers()["x-powered-by"]).toBeUndefined();
  });

  test("keeps structured contact data valid and 404 pages non-canonical", async ({ page }) => {
    await page.goto("/contato");
    const contactJsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(contactJsonLd.join("\n")).toContain('"ContactPoint"');
    expect(contactJsonLd.join("\n")).not.toContain('"contactOption"');

    const missing = await page.goto("/missing-nexus-page");
    expect(missing?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test("supports reject, accept and reopening cookie preferences", async ({ page }) => {
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    await page.goto("/");
    await page.waitForTimeout(250);
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
    await expect(page.locator("[data-consent-manager]")).toHaveAttribute("data-hydrated", "true");
    expect(await page.evaluate(() => window.localStorage.getItem("nexus-cookie-consent"))).toBeNull();
    const banner = page.locator("[data-consent-banner]");
    await expect(banner).toBeVisible();
    await banner.getByRole("button", { name: "Rejeitar não necessários" }).click();
    const savedConsent = await page.evaluate(() => window.localStorage.getItem("nexus-cookie-consent"));
    expect(savedConsent).toContain('"analytics":false');
    await expect(banner).toBeHidden();
    await expect(page.locator("[data-cookie-preferences]")).toBeVisible();

    await page.locator("[data-cookie-preferences]").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("button", { name: /Fechar prefer/ })).toBeFocused();
    await page.getByRole("button", { name: "Salvar preferências" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();

    await page.locator("[data-cookie-preferences]").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("checkbox", { name: "Permitir cookies de analytics" }).check();
    await page.getByRole("button", { name: "Salvar preferências" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("keeps the initial cookie bar compact across desktop and mobile", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900, maxHeight: 92 },
      { width: 320, height: 568, maxHeight: 120 },
      { width: 390, height: 844, maxHeight: 132 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const banner = page.locator("[data-consent-banner]");
      await expect(banner).toBeVisible();
      const box = await banner.boundingBox();
      expect(box?.height).toBeLessThanOrEqual(viewport.maxHeight);
      await expect(banner.getByRole("button", { name: "Aceitar todos" })).toBeVisible();
      await expect(banner.getByRole("button", { name: "Rejeitar não necessários" })).toBeVisible();
      await expect(banner.getByRole("button", { name: "Gerenciar cookies" })).toBeVisible();
    }
  });
});
