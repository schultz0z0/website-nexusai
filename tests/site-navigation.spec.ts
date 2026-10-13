import { expect, test } from "@playwright/test";

test("keeps the catalog link separate from an accessible services disclosure", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/servicos");
  const nav = page.getByRole("navigation", { name: "Navegação principal", exact: true });
  const expand = nav.getByLabel("Expandir serviços", { exact: true }).first();
  await expect(nav.getByRole("link", { name: "Serviços", exact: true }).first()).toHaveAttribute("href", "/servicos");
  await expand.focus();
  await page.keyboard.press("Enter");
  const panel = nav.getByLabel("Opções de serviços", { exact: true });
  await expect(panel).toBeVisible();
  await expect(panel.getByRole("link")).toHaveCount(7);
  await expect(panel.getByRole("heading", { name: "Produtos" })).toBeVisible();
  await expect(panel.getByRole("heading", { name: "Soluções" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(panel.getByRole("link", { name: "Copiloto", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(panel).not.toBeVisible();
  await expect(expand).toBeFocused();
  await expand.click();
  await page.locator("h1").click();
  await expect(panel).not.toBeVisible();
  await expand.click();
  await panel.getByRole("link", { name: "Rastro", exact: true }).click();
  await expect(page).toHaveURL(/\/servicos\/prometeus-rastro$/);
  await expect(panel).not.toBeVisible();
  await expect(nav.getByRole("link", { name: "Falar pelo WhatsApp" })).toHaveAttribute("href", /^https:\/\/wa.me\/5521973231943\?/);
});

test("keeps the expanded desktop panel usable in a short viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 320 });
  await page.goto("/servicos");
  const nav = page.getByRole("navigation", { name: "Navegação principal", exact: true });
  await nav.getByLabel("Expandir serviços", { exact: true }).first().click();
  const panel = nav.getByLabel("Opções de serviços", { exact: true });
  const box = await panel.boundingBox();
  expect(box!.y + box!.height).toBeLessThanOrEqual(320);
  await panel.getByRole("link", { name: "Ver todas as ofertas" }).focus();
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Como trabalhamos", exact: true })).toBeFocused();
  await expect(panel).not.toBeVisible();
});

for (const width of [320, 390, 768]) {
  test(`opens and navigates the mobile menu at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 568 });
    await page.goto("/servicos");
    const nav = page.getByRole("navigation", { name: "Navegação principal", exact: true });
    const toggle = nav.getByLabel("Menu principal", { exact: true });
    await toggle.click();
    const menu = nav.getByLabel("Navegação no celular", { exact: true });
    await expect(menu).toBeVisible();
    await menu.getByLabel("Expandir serviços", { exact: true }).click();
    await expect(menu.getByRole("link", { name: "Sites e lojas virtuais", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await menu.getByRole("link", { name: "Sites e lojas virtuais", exact: true }).click();
    await expect(page).toHaveURL(/\/servicos\/desenvolvimento-web$/);
    await expect(menu).not.toBeVisible();
    await toggle.click();
    await page.keyboard.press("Escape");
    await expect(menu).not.toBeVisible();
    await expect(toggle).toBeFocused();
  });
}

test("keeps all six offers and legal preferences in the organized footer", async ({ page }) => {
  await page.goto("/servicos");
  await page.getByRole("button", { name: "Rejeitar não necessários" }).click();
  const footer = page.locator("footer");
  await expect(footer.getByRole("navigation", { name: "Produtos no rodapé" }).getByRole("link")).toHaveCount(3);
  await expect(footer.getByRole("navigation", { name: "Soluções no rodapé" }).getByRole("link")).toHaveCount(3);
  await expect(footer.getByRole("link", { name: "Contato", exact: true })).toHaveAttribute("href", "/contato");
  await expect(footer.getByRole("link", { name: "Privacidade", exact: true })).toHaveAttribute("href", "/privacidade");
  await footer.locator("[data-cookie-preferences]").click();
  await expect(page.getByRole("button", { name: "Salvar preferências" })).toBeVisible();
});

test("offers work in the mobile menu without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
  const page = await context.newPage();
  await page.goto("/servicos", { waitUntil: "domcontentloaded" });
  const nav = page.getByRole("navigation", { name: "Navegação principal", exact: true });
  await nav.getByLabel("Menu principal", { exact: true }).click();
  const menu = nav.getByLabel("Navegação no celular", { exact: true });
  await menu.getByLabel("Expandir serviços", { exact: true }).click();
  await menu.getByRole("link", { name: "Copiloto", exact: true }).click({ noWaitAfter: true });
  await expect(page).toHaveURL(/\/servicos\/prometeus-copiloto$/);
  await context.close();
});
