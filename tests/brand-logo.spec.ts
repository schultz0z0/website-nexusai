import { expect, test } from "@playwright/test";

const homeLinkName = "Prometeus — voltar ao início";

test("uses the Prometeus wordmark in the desktop navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");

  const navigation = page.locator('[data-site-navigation="true"]');
  const navigationInner = navigation.locator('[data-navigation-inner="true"]');
  const brandLink = navigation.getByRole("link", {
    name: homeLinkName,
  });
  const wordmark = brandLink.locator('img[alt="Prometeus"]');

  await expect(wordmark).toBeVisible();
  await expect(wordmark).toHaveAttribute(
    "src",
    /Logo%20Principal\.png|Logo\+Principal\.png|logo\.png/,
  );
  await expect(brandLink.locator("svg, span")).toHaveCount(0);

  const brandBox = await brandLink.boundingBox();
  const wordmarkBox = await wordmark.boundingBox();
  const cropBox = await brandLink.locator("div").boundingBox();

  expect(brandBox).not.toBeNull();
  expect(wordmarkBox).not.toBeNull();
  expect(cropBox).not.toBeNull();
  expect(brandBox!.width).toBeLessThanOrEqual(180);
  expect(wordmarkBox!.height).toBeGreaterThanOrEqual(34);
  expect(wordmarkBox!.x).toBeGreaterThanOrEqual(cropBox!.x - 1);
  expect(wordmarkBox!.x + wordmarkBox!.width).toBeLessThanOrEqual(
    cropBox!.x + cropBox!.width + 1,
  );

  await expect(navigation.getByRole("link")).toHaveCount(2);
  await expect(
    navigation.getByRole("link", { name: "Falar com a equipe" }),
  ).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Soluções" })).toHaveCount(0);
  await expect(navigation.getByRole("link", { name: "Processo" })).toHaveCount(0);
  await expect(navigation.getByRole("button")).toHaveCount(0);

  const geometry = await navigation.evaluate((bar) => {
    const barRect = bar.getBoundingClientRect();
    const inner = bar.querySelector<HTMLElement>(
      '[data-navigation-inner="true"]',
    )!;
    const innerRect = inner.getBoundingClientRect();
    const links = [...inner.querySelectorAll<HTMLElement>("a")].map((link) => {
      const rect = link.getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    });
    const style = getComputedStyle(bar);
    return {
      bar: { left: barRect.left, right: barRect.right, top: barRect.top },
      borderRadius: style.borderRadius,
      inner: { left: innerRect.left, right: innerRect.right },
      links,
      viewportWidth: document.documentElement.clientWidth,
    };
  });

  await expect(navigationInner).toBeVisible();
  expect(geometry.bar).toEqual({
    left: 0,
    right: geometry.viewportWidth,
    top: 0,
  });
  expect(geometry.borderRadius).toBe("0px");
  const innerWidth = geometry.inner.right - geometry.inner.left;
  const leftMargin = geometry.inner.left;
  const rightMargin = geometry.viewportWidth - geometry.inner.right;

  expect(innerWidth).toBeLessThanOrEqual(1240);
  expect(leftMargin).toBeGreaterThanOrEqual(300);
  expect(Math.abs(leftMargin - rightMargin)).toBeLessThanOrEqual(1);
  expect(geometry.links[0].left).toBeGreaterThanOrEqual(
    geometry.inner.left + 40,
  );
  expect(geometry.links[1].right).toBeLessThanOrEqual(
    geometry.inner.right - 40,
  );
});

test("publishes the official brand logo assets", async ({
  request,
}) => {
  const mainLogo = await request.get("/images/logo-principal.png");
  expect(mainLogo.status()).toBe(200);
  expect(mainLogo.headers()["content-type"]).toContain("image/png");

  const secondaryLogo = await request.get("/images/logo-secundaria.png");
  expect(secondaryLogo.status()).toBe(200);
  expect(secondaryLogo.headers()["content-type"]).toContain("image/png");

  const iconLogo = await request.get("/images/icon-logo.png");
  expect(iconLogo.status()).toBe(200);
  expect(iconLogo.headers()["content-type"]).toContain("image/png");
});

test("keeps the official wordmark and compact contact action at opposite ends of a full-width mobile header", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const mobileBar = page.locator('[data-site-navigation="true"]');
  const brandLink = mobileBar.getByRole("link", { name: homeLinkName });
  const contactLink = mobileBar.getByRole("link", { name: "Falar com a equipe" });
  const wordmark = brandLink.locator('img[alt="Prometeus"]');

  await expect(mobileBar).toBeVisible();
  await expect(contactLink).toBeVisible();
  await expect(contactLink).toContainText("Falar");
  await expect(wordmark).toBeVisible();
  await expect(wordmark).toHaveAttribute(
    "src",
    /Logo%20Principal\.png|Logo\+Principal\.png|logo\.png/,
  );
  const mobileWordmarkBox = await wordmark.boundingBox();
  expect(mobileWordmarkBox).not.toBeNull();
  expect(mobileWordmarkBox!.height).toBeGreaterThanOrEqual(34);
  await expect(brandLink.locator("svg, span")).toHaveCount(0);
  await expect(mobileBar.getByRole("button")).toHaveCount(0);
  await expect(mobileBar.getByRole("link")).toHaveCount(2);

  const geometry = await mobileBar.evaluate((bar) => {
    const barRect = bar.getBoundingClientRect();
    const children = [...bar.querySelectorAll<HTMLElement>("a, button")].map(
      (element) => element.getBoundingClientRect(),
    );

    return {
      viewportWidth: document.documentElement.clientWidth,
      bar: {
        bottom: barRect.bottom,
        left: barRect.left,
        right: barRect.right,
        top: barRect.top,
      },
      children: children.map((rect) => ({
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        top: rect.top,
      })),
    };
  });

  expect(geometry.bar.left).toBe(0);
  expect(geometry.bar.right).toBe(geometry.viewportWidth);
  expect(geometry.children).toHaveLength(2);
  for (const child of geometry.children) {
    expect(child.left).toBeGreaterThanOrEqual(geometry.bar.left);
    expect(child.right).toBeLessThanOrEqual(geometry.bar.right);
    expect(child.top).toBeGreaterThanOrEqual(geometry.bar.top);
    expect(child.bottom).toBeLessThanOrEqual(geometry.bar.bottom);
  }
});
