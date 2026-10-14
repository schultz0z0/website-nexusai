import { expect, test } from "@playwright/test";
import { SERVICES, servicePath } from "../src/lib/service-content";
import { assertNoHorizontalOverflow } from "./helpers/layout-assertions";

for (const width of [1280, 320]) {
  test.describe(`workflow at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const service of SERVICES.filter((service) => !["desenvolvimento-web", "prometeus-rastro"].includes(service.slug))) {
      test(`explores the illustrative workflow for ${service.slug} with the keyboard`, async ({ page }) => {
        await page.goto(servicePath(service));
        const example = page.getByRole("region", { name: "Exemplo na prática" });
        await expect(example).toContainText("Exemplo ilustrativo");
        const status = example.getByRole("status");
        const first = await status.textContent();
        const advance = example.getByRole("button", { name: "Avançar etapa" });
        await advance.focus();
        const initialTop = await advance.evaluate(element => element.getBoundingClientRect().top + window.scrollY);
        await page.keyboard.press("Enter");
        await expect(status).not.toHaveText(first ?? "");
        const second = await status.textContent();
        await page.keyboard.press("Space");
        await expect(status).not.toHaveText(second ?? "");
        const restart = example.getByRole("button", { name: "Recomeçar exemplo" });
        // Compare document positions: focus may still be smoothly scrolling the viewport.
        const finalTop = await restart.evaluate(element => element.getBoundingClientRect().top + window.scrollY);
        expect(Math.abs(finalTop - initialTop)).toBeLessThan(2);
        await restart.click();
        await expect(status).toHaveText(first ?? "");
      });
    }
  });
}

test("keeps examples usable and free of decorative motion with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/servicos/atendimento-ia-whatsapp");
  const example = page.getByRole("region", { name: "Exemplo na prática" });
  await example.getByRole("button", { name: "Avançar etapa" }).click();
  await assertNoHorizontalOverflow(page);
  const animations = await page.locator("main").evaluate((main) =>
    main.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running").length,
  );
  expect(animations).toBe(0);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("shows the illustrative scene and contact links without inactive demo controls", async ({ page }) => {
    await page.goto("/servicos/prometeus-copiloto");
    const example = page.getByRole("region", { name: "Exemplo na prática" });
    await expect(example).toContainText("Exemplo ilustrativo");
    await expect(example.getByRole("button")).toHaveCount(0);
    await expect(page.locator('main a[href^="https://wa.me/5521973231943"]').first()).toBeVisible();
  });
});
