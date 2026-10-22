import { expect, test } from "@playwright/test";
import sharp from "sharp";
import { SERVICES, servicePath } from "../src/lib/service-content";
import { SITE_URL } from "../src/lib/site-metadata";

const paths = ["/", "/servicos", ...SERVICES.map(servicePath), "/contato", "/privacidade", "/cookies"];
const heroImage = "/images/social/home-hero-20261021.jpg";

test.describe("image discovery in server-rendered HTML", () => {
  test.use({ javaScriptEnabled: false });

  test("describes photos on every public page, including initially inactive home images", async ({ page }) => {
    for (const path of paths) {
      await page.goto(path);
      const undescribed = await page.locator("img").evaluateAll(images => images
        .filter(image => !image.getAttribute("alt")?.trim())
        .map(image => image.getAttribute("src")));
      expect(undescribed, path).toEqual([]);
    }
  });

  test("shares the real home hero with matching Open Graph and Twitter images", async ({ page, request }) => {
    for (const path of paths) {
      await page.goto(path);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", SITE_URL + heroImage);
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", SITE_URL + heroImage);
      await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
      await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", /mão humana.*robótica/i);
    }
    const image = await request.get(heroImage);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/jpeg");
    const metadata = await sharp(await image.body()).metadata();
    expect({ width: metadata.width, height: metadata.height }).toEqual({ width: 1200, height: 630 });
  });
});

test("keeps inactive capability images out of the accessibility tree", async ({ page }) => {
  await page.goto("/");
  const images = page.locator("img[data-capability-image]");
  await expect(images).toHaveCount(4);
  await expect(images.locator('xpath=self::*[@aria-hidden="false"]')).toHaveCount(1);
  await expect(images.locator('xpath=self::*[@aria-hidden="true"]')).toHaveCount(3);
});
