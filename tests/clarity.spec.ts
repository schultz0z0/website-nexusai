import { expect, test } from "@playwright/test";
import { SERVICES, servicePath } from "../src/lib/service-content";

test("restores analytics consent and loads Clarity on every public page including new offers", async ({ page }) => {
  // Eleven complete document loads share this case; allow for parallel CI workers.
  test.setTimeout(90_000);
  const requests: string[] = [];
  await page.route("https://www.clarity.ms/tag/**", async route => {
    requests.push(route.request().url());
    // No production recordings or external requests during this verification.
    await route.fulfill({ contentType: "application/javascript", body: "window.clarity = window.clarity || function() {};" });
  });
  await page.goto("/");
  await expect(page.locator('[data-consent-manager]')).toHaveAttribute("data-hydrated", "true");
  await expect(page.locator('script[data-nexus-tracking="clarity"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Gerenciar cookies" }).click();
  await page.getByRole("checkbox", { name: "Permitir cookies de analytics" }).check();
  await page.getByRole("button", { name: "Salvar preferências" }).click();
  await expect(page.locator('script[data-nexus-tracking="clarity"]')).toHaveCount(1);
  await expect.poll(() => requests.length).toBe(1);
  let expectedRequests = 1;
  for (const path of ["/servicos", ...SERVICES.map(servicePath), "/contato", "/privacidade", "/cookies"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('script[data-nexus-tracking="clarity"]')).toHaveCount(1);
    await expect.poll(() => requests.length).toBe(++expectedRequests);
    expect(requests.at(-1)).toBe("https://www.clarity.ms/tag/yjrsmq8w37");
  }
});

test("loads Clarity only with analytics consent, once across navigation, and stops on revocation", async ({ page }) => {
  let tagRequests = 0;
  await page.route("https://www.clarity.ms/tag/**", async (route) => {
    tagRequests++;
    expect(route.request().url()).toBe("https://www.clarity.ms/tag/yjrsmq8w37");
    // Process the bootstrap queue as the remote library would, without sending QA recordings.
    await route.fulfill({
      contentType: "application/javascript",
      body: `(() => {
        const queue = window.clarity.q || [];
        window.clarityCalls = [];
        window.clarity = (...args) => window.clarityCalls.push(args);
        queue.forEach(args => window.clarity(...args));
      })();`,
    });
  });

  await page.goto("/");
  const script = page.locator('head script[data-nexus-tracking="clarity"]');
  await expect(page.locator("[data-consent-banner]")).toBeVisible();
  await expect(script).toHaveCount(0);
  expect(tagRequests).toBe(0);

  await page.getByRole("button", { name: "Rejeitar não necessários" }).click();
  await page.reload();
  await expect(page.locator("[data-consent-manager]")).toHaveAttribute("data-hydrated", "true");
  await expect(script).toHaveCount(0);
  expect(tagRequests).toBe(0);

  await page.locator("[data-cookie-preferences]").click();
  await page.getByRole("checkbox", { name: "Permitir cookies de marketing" }).check();
  await page.getByRole("button", { name: "Salvar preferências" }).click();
  await expect(script).toHaveCount(0);
  expect(tagRequests).toBe(0);

  await page.locator("[data-cookie-preferences]").click();
  await page.getByRole("checkbox", { name: "Permitir cookies de marketing" }).uncheck();
  await page.getByRole("checkbox", { name: "Permitir cookies de analytics" }).check();
  await page.getByRole("button", { name: "Salvar preferências" }).click();
  await expect(script).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => (window as unknown as { clarityCalls: unknown[][] }).clarityCalls)).toContainEqual([
    "consentv2", { analytics_Storage: "granted", ad_Storage: "denied" },
  ]);
  expect(tagRequests).toBe(1);

  await page.locator('footer a[href="/contato"]').click();
  await expect(page).toHaveURL(/\/contato$/);
  await expect(script).toHaveCount(1);
  expect(tagRequests).toBe(1);
  await expect(page.locator("form[data-clarity-mask='true']")).toBeVisible();

  await page.locator("[data-cookie-preferences]").click();
  await page.getByRole("button", { name: "Salvar preferências" }).click();
  await expect(script).toHaveCount(1);
  expect(tagRequests).toBe(1);

  // Stored consent starts Clarity again on a full page load.
  await page.reload();
  await expect(script).toHaveCount(1);
  await expect.poll(() => tagRequests).toBe(2);

  await page.locator("[data-cookie-preferences]").click();
  await Promise.all([
    page.waitForEvent("load"),
    page.getByRole("button", { name: "Rejeitar não necessários", exact: true }).click(),
  ]);
  await expect(page.locator("[data-consent-manager]")).toHaveAttribute("data-hydrated", "true");
  await expect(script).toHaveCount(0);
  expect(await page.evaluate(() => typeof window.clarity)).toBe("undefined");
  expect(tagRequests).toBe(2);

  await page.locator("[data-cookie-preferences]").click();
  await page.getByRole("checkbox", { name: "Permitir cookies de analytics" }).check();
  await page.getByRole("checkbox", { name: "Permitir cookies de marketing" }).check();
  await page.getByRole("button", { name: "Salvar preferências" }).click();
  await expect(script).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => (window as unknown as { clarityCalls: unknown[][] }).clarityCalls)).toContainEqual([
    "consentv2", { analytics_Storage: "granted", ad_Storage: "granted" },
  ]);
  expect(tagRequests).toBe(3);
});
