import { expect, test } from "@playwright/test";

const routes = ["/", "/servicos", "/servicos/prometeus-copiloto", "/servicos/prometeus-rastro", "/servicos/prometeus-soft-phone", "/servicos/atendimento-ia-whatsapp", "/servicos/desenvolvimento-sob-medida", "/servicos/desenvolvimento-web", "/contato"];

for (const width of [1440, 390]) {
  for (const route of routes) {
    test(`sharp responsive imagery: ${route} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      const photos = page.locator("main img");
      expect(await photos.count()).toBeGreaterThanOrEqual(route === "/contato" ? 0 : 1);
      for (const photo of await photos.all()) {
        if (!(await photo.isVisible())) continue;
        await photo.scrollIntoViewIfNeeded();
        await photo.evaluate((image: HTMLImageElement) => image.decode());
        const data = await photo.evaluate(async (image: HTMLImageElement) => {
          const url = new URL(image.currentSrc);
          const source = url.searchParams.get("url") ?? url.pathname;
          // A srcset image reports density-corrected naturalWidth. Decode the
          // selected resource separately to inspect its actual raster pixels.
          const raster = new Image(); raster.src = image.currentSrc; await raster.decode();
          const bounds = image.getBoundingClientRect();
          const style = getComputedStyle(image);
          return { url: url.pathname, quality: url.searchParams.get("q"), source,
            width: raster.naturalWidth, height: raster.naturalHeight,
            coverWidth: style.objectFit === "cover" ? Math.max(bounds.width, bounds.height * raster.naturalWidth / raster.naturalHeight) : bounds.width,
            srcset: image.getAttribute("srcset") };
        });
        expect(data.width, route).toBeGreaterThan(0);
        if (/demo-.*-original|\/portfolio\//.test(data.source)) {
          expect(data.url).not.toContain("/_next/image");
          expect(data.srcset).toBeNull();
          expect(data.width).toBe(/demo-/.test(data.source) ? 1920 : 1280);
        } else {
          expect(data.url).toContain("/_next/image");
          expect(["85", "90"]).toContain(data.quality);
          expect(data.srcset).toBeTruthy();
          expect(data.source).toContain("?v=20261014");
          // Cover crops must have enough pixels for their height, not just the box width.
          expect(data.width, `${route}: ${data.source}`).toBeGreaterThanOrEqual(Math.min(data.coverWidth * .95, 1480));
        }
      }
      for (const logo of await page.locator('img[alt="Prometeus"]').all()) {
        await logo.scrollIntoViewIfNeeded();
        await logo.evaluate((image: HTMLImageElement) => image.decode());
        expect(await logo.getAttribute("src")).not.toContain("/_next/image");
      }
      if (route === "/contato") {
        const background = await page.locator("[data-contact-hero]").evaluate(async element => {
          const css = getComputedStyle(element).backgroundImage;
          const url = css.match(/url\(["']?(.*?)["']?\)/)?.[1];
          if (!url) throw new Error("Missing contact photograph");
          const image = new Image(); image.src = url; await image.decode();
          return { url, width: image.naturalWidth };
        });
        expect(background.url).toContain(width < 768 ? "contact-hero-mobile" : "contact-hero-desktop");
        expect(background.width).toBeGreaterThanOrEqual(width < 768 ? 900 : 1500);
      }
    });
  }
}
