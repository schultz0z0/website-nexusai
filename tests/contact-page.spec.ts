import { expect, test } from "@playwright/test";

for (const viewport of [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
]) {
  test(`restores the cinematic hero before the short form at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/contato");

    await expect(
      page.getByRole("heading", {
        name: "Vamos entender onde sua operação perde tempo.",
      }),
    ).toBeVisible();
    await expect(page.locator("[data-contact-hero]"))
      .toHaveCSS("background-image", /contact-hero-(mobile|desktop)\.webp/);

    const heroCta = page.getByRole("link", { name: "Começar briefing" });
    await expect(heroCta).toHaveAttribute("href", "#briefing");

    const briefing = page.locator("#briefing");
    await briefing.scrollIntoViewIfNeeded();
    await expect(
      briefing.getByRole("heading", {
        name: "Conte o problema. A gente começa pelo contexto.",
      }),
    ).toBeVisible();

    const form = briefing.locator("form");
    await expect(form).toBeVisible();
    await expect(form.getByLabel("Nome", { exact: true })).toBeVisible();
    await expect(form.getByLabel("Email", { exact: true })).toBeVisible();
    await expect(form.getByLabel("Empresa (opcional)", { exact: true })).toBeVisible();
    await expect(form.getByLabel("Conte o problema e o contexto", { exact: true })).toBeVisible();
    await expect(form.locator("select")).toHaveCount(0);
    await expect(form.getByLabel(/cargo/i)).toHaveCount(0);
    await expect(form.getByLabel(/setor/i)).toHaveCount(0);

    await expect(page.locator("form")).toHaveCount(1);
  });
}
