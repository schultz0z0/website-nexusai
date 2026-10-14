import { expect, test } from "@playwright/test";
import { assertNoHorizontalOverflow } from "./helpers/layout-assertions";

for (const width of [1440, 320, 390]) {
  test(`presents a broad Rastro offer and real product screens at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/servicos/prometeus-rastro");
    await page.getByRole("button", { name: "Rejeitar não necessários" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Prometeus Rastro");
    const hero = page.locator("main header").first();
    await expect(hero).toContainText("Saiba onde está cada item.");
    await expect(hero.locator("img")).toHaveAttribute("src", /hero-operacao/);
    const contact = new URL(await hero.getByRole("link", { name: "Agendar demonstração" }).getAttribute("href") ?? "");
    expect(contact.pathname).toBe("/5521973231943");
    expect(contact.searchParams.get("text")).toContain("Prometeus Rastro");
    await expect(page.getByRole("heading", { name: "Equipamentos e ferramentas" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Patrimônio da empresa" })).toBeVisible();
    const demo = page.locator("#rastro-em-acao");
    await expect(demo).toContainText("Telas reais do demonstrativo. Dados de exemplo.");
    await demo.getByRole("button", { name: /Movimentação/ }).focus();
    await page.keyboard.press("Enter");
    await expect(demo.locator("figure img")).toHaveAttribute("src", /demo-movement/);
    await demo.getByRole("button", { name: /Histórico/ }).focus();
    await page.keyboard.press("Space");
    await expect(demo.locator("figure img")).toHaveAttribute("src", /demo-history/);
    const enlarge = demo.getByRole("button", { name: "Ampliar tela", exact: true });
    await enlarge.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Rastro: Histórico");
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(enlarge).toBeFocused();
    await assertNoHorizontalOverflow(page);
  });
}

test.describe("Rastro without JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  test("exposes source screens and the sales path without inactive controls", async ({ page }) => {
    await page.goto("/servicos/prometeus-rastro");
    const demo = page.locator("#rastro-em-acao");
    await expect(demo.getByRole("button")).toHaveCount(0);
    await demo.getByText("Ver movimentação e histórico", { exact: true }).click();
    await expect(demo.locator("figure img")).toHaveCount(3);
    await expect(demo.locator('img[src*="demo-history"]')).toBeVisible();
    await expect(page.locator('main a[href^="https://wa.me/5521973231943"]').first()).toBeVisible();
    await assertNoHorizontalOverflow(page);
  });
});

test("disables decorative motion for Rastro when requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/servicos/prometeus-rastro");
  await page.locator("#rastro-em-acao").getByRole("button", { name: /Histórico/ }).click();
  const animations = await page.locator("main").evaluate(main => main.getAnimations({ subtree: true }).filter(animation => animation.playState === "running").length);
  expect(animations).toBe(0);
});
