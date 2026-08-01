import { expect, test } from "@playwright/test";

import {
  assertContentWithinViewport,
  assertNoHorizontalOverflow,
  assertNoIntersectingRects,
} from "./helpers/layout-assertions";

const desktopRoutes = [
  { path: "/", title: /Nexus AI/i },
  { path: "/solucoes", title: /Soluções de IA/i },
  { path: "/processo", title: /Processo de implementação/i },
  { path: "/contato", title: /Fale com a Nexus AI/i },
] as const;

const motionExperiences = [
  { path: "/", root: '[data-home-chapter="value"]' },
  { path: "/solucoes", root: "main" },
  { path: "/processo", root: "main" },
  { path: "/contato", root: "main" },
] as const;

const viewportProfiles = [
  { name: "static", width: 1920, height: 600, expected: "static" },
  { name: "compact", width: 2560, height: 720, expected: "compact" },
  { name: "cinematic", width: 1920, height: 1080, expected: "cinematic" },
  { name: "mobile", width: 390, height: 844, expected: "mobile" },
] as const;

test.describe("desktop responsiveness smoke tests", () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  for (const route of desktopRoutes) {
    test(`${route.path} renders within the desktop viewport`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page).toHaveTitle(route.title);
      await expect(
        page.getByRole("link", { name: /Nexus AI/i }).first(),
      ).toBeVisible();

      const main = page.locator("main");
      await expect(main).toBeVisible();
      await expect(main).not.toHaveText(/^\s*$/);

      await assertNoHorizontalOverflow(page);
      await assertContentWithinViewport(page, "main");
      await assertNoIntersectingRects(
        page,
        "nextjs-portal, nextjs-portal *, [data-nextjs-dialog], [data-nextjs-toast], #nextjs-dev-overlay",
        "main",
      );
    });
  }
});

test.describe("viewport motion profiles", () => {
  for (const profile of viewportProfiles) {
    for (const experience of motionExperiences) {
      test(`exposes the ${profile.name} motion profile for ${experience.path} at ${profile.width}x${profile.height}`, async ({
        page,
      }) => {
        await page.setViewportSize({
          width: profile.width,
          height: profile.height,
        });
        await page.goto(experience.path);

        await expect(page.locator(experience.root)).toHaveAttribute(
          "data-motion-mode",
          profile.expected,
        );
      });
    }
  }

  test("updates the route profile after a viewport resize", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/solucoes");

    const root = page.locator("main");
    await expect(root).toHaveAttribute("data-motion-mode", "cinematic");

    await page.setViewportSize({ width: 2560, height: 720 });
    await expect(root).toHaveAttribute("data-motion-mode", "compact");

    await page.setViewportSize({ width: 1920, height: 600 });
    await expect(root).toHaveAttribute("data-motion-mode", "static");
  });
});

test.describe("static desktop fallbacks", () => {
  test.use({ viewport: { width: 1920, height: 600 } });

  test("keeps every Solutions layer visibly rendered in static flow", async ({
    page,
  }) => {
    await page.goto("/solucoes");
    await expect(page.locator("main")).toHaveAttribute(
      "data-motion-mode",
      "static",
    );

    const layers = page.locator("[data-solutions-layer]");
    await expect(layers).toHaveCount(3);

    const renderedLayers = await layers.evaluateAll((elements) =>
      elements.map((element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();

        return {
          height: rect.height,
          opacity: Number.parseFloat(style.opacity),
          visibility: style.visibility,
          width: rect.width,
        };
      }),
    );

    expect(renderedLayers).toEqual(
      Array.from({ length: 3 }, () => ({
        height: expect.any(Number),
        opacity: 1,
        visibility: "visible",
        width: expect.any(Number),
      })),
    );
    expect(renderedLayers.every((layer) => layer.width > 0 && layer.height > 0)).toBe(
      true,
    );
  });

  test("keeps the Contact receipt in flow below the static hero", async ({ page }) => {
    await page.goto("/contato");
    await expect(page.locator("main")).toHaveAttribute(
      "data-motion-mode",
      "static",
    );

    const receipt = page.locator("[data-contact-receipt]");
    const layout = await receipt.evaluate((receiptElement, heroSelector) => {
      const heroElement = document.querySelector(heroSelector);
      if (!heroElement) throw new Error("Contact hero was not rendered.");

      const receiptStyle = window.getComputedStyle(receiptElement);
      const receiptRect = receiptElement.getBoundingClientRect();
      const heroRect = heroElement.getBoundingClientRect();

      return {
        position: receiptStyle.position,
        receiptTop: receiptRect.top,
        heroBottom: heroRect.bottom,
      };
    }, "[data-contact-hero-copy]");

    expect(layout.position).not.toBe("absolute");
    expect(layout.receiptTop).toBeGreaterThanOrEqual(layout.heroBottom);
  });
});
