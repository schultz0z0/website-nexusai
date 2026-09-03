import { expect, test } from "@playwright/test";

test("redirects the legacy solution route to custom applications", async ({
  page,
}) => {
  await page.goto("/solucoes");
  await expect(page).toHaveURL(/\/#aplicacoes$/);
  await expect(page.locator("#aplicacoes")).toBeVisible();
});

test("redirects the legacy process route to working principles", async ({
  page,
}) => {
  await page.goto("/processo");
  await expect(page).toHaveURL(/\/#como-trabalhamos$/);
  await expect(page.locator("#como-trabalhamos")).toBeVisible();
});

test("keeps contact and privacy available", async ({ page }) => {
  await page.goto("/contato");
  await expect(page).toHaveURL(/\/contato$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.goto("/privacidade");
  await expect(page).toHaveURL(/\/privacidade$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
