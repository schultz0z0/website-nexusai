import { expect, test } from "@playwright/test";

import {
  assertContentWithinViewport,
  assertNoHorizontalOverflow,
} from "./helpers/layout-assertions";

test.describe.configure({ timeout: 90_000 });

const viewports = [
  { name: "small mobile", width: 320, height: 568 },
  { name: "standard android", width: 360, height: 800 },
  { name: "compact iphone", width: 375, height: 812 },
  { name: "mobile", width: 390, height: 844 },
  { name: "large mobile", width: 412, height: 915 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "compact laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "short desktop", width: 1440, height: 700 },
  { name: "low desktop", width: 1600, height: 600 },
  { name: "low full hd", width: 1920, height: 600 },
  { name: "ultrawide", width: 1920, height: 1080 },
  { name: "low ultrawide", width: 2560, height: 720 },
  { name: "wide ultrawide", width: 3440, height: 1440 },
] as const;

const publicRoutes = [
  { path: "/", title: /Prometeus \| Automação e IA sob medida para empresas/i },
  { path: "/contato", title: /Diagnóstico de automação com IA \| Prometeus/i },
  { path: "/privacidade", title: /Política de Privacidade/i },
  { path: "/cookies", title: /Política de Cookies/i },
] as const;

test("publishes the official email and social profiles in the footer", async ({
  page,
}) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();

    await expect(
      footer.getByRole("link", {
        name: "Enviar email para comercial@agenciaprometeus.com.br",
      }),
    ).toHaveAttribute("href", "mailto:comercial@agenciaprometeus.com.br");
    await expect(footer).not.toContainText(
      /raphaelschultz12@gmail\.com|esttevao\.henrique@hotmail\.com/i,
    );

    for (const social of [
      {
        name: "Prometeus no Instagram",
        href: "https://www.instagram.com/prometeus.official/",
      },
      {
        name: "Prometeus no LinkedIn",
        href: "https://www.linkedin.com/company/prometeus-official",
      },
      {
        name: "Prometeus no Facebook",
        href: "https://www.facebook.com/profile.php?id=61594187724984",
      },
    ]) {
      const link = footer.getByRole("link", { name: social.name });
      await expect(link).toHaveAttribute("href", social.href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("rel", /noreferrer/);
      await expect(link.locator("svg")).toHaveCount(1);
      await expect(link).toBeInViewport();

      const box = await link.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(40);
      expect(box!.height).toBeGreaterThanOrEqual(40);
    }

    await assertNoHorizontalOverflow(page);
  }
});

for (const viewport of viewports) {
  test(`keeps the full home inside ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");

    await expect(page).toHaveTitle(publicRoutes[0].title);
    await assertNoHorizontalOverflow(page);

    for (const selector of [
      "#hero",
      "[data-technology-strip]",
      '[data-home-chapter="value"]',
      "#aplicacoes",
      "#demonstracoes",
      "#como-trabalhamos",
      '[data-home-chapter="cta"]',
    ]) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await assertContentWithinViewport(page, selector);
      await assertNoHorizontalOverflow(page);
    }

    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.locator("footer")).toBeVisible();
  });
}

for (const route of publicRoutes) {
  test(`${route.path} remains accessible and free of removed claims`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route.path);

    await expect(page).toHaveTitle(route.title);
    await expect(page.locator("main")).toBeVisible();
    await assertNoHorizontalOverflow(page);

    const publicText = await page.locator("body").innerText();
    expect(publicText).not.toMatch(/gargal/i);
    expect(publicText).not.toMatch(
      /12\+ plataformas|em cliente, com uso real|8 setores atendidos|100% suporte contínuo/i,
    );
  });
}

test("preserves the approved hero structure and copy", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const hero = page.locator("#hero");
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText(
    /Multiplique a capacidade\s+da sua equipe com IA/,
  );
  await expect(hero.getByRole("heading", { level: 1 }).locator("span")).toHaveText(
    "da sua equipe com IA",
  );
  await expect(
    hero.getByText(
      "Automações e agentes sob medida que eliminam tarefas repetitivas e ampliam a capacidade da sua equipe.",
    ),
  ).toBeVisible();
  await expect(
    hero.getByRole("link", { name: "Descobrir onde aplicar IA" }),
  ).toBeVisible();
  await expect(hero.locator("[data-home-hero-poster]")).toHaveAttribute(
    "src",
    /home-hero-touch-desktop\.webp/,
  );
  await expect(hero.locator("video")).toHaveCount(0);
});

test("reveals the integration strip in the first viewport without clipping the hero CTA", async ({
  page,
}) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
    { width: 1600, height: 600 },
    { width: 2560, height: 720 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const layout = await page.evaluate(() => {
      const hero = document.querySelector<HTMLElement>("#hero");
      const strip = document.querySelector<HTMLElement>(
        "[data-technology-strip]",
      );
      const cta = hero?.querySelector<HTMLElement>("a");
      const firstLogo = strip?.querySelector<HTMLElement>(
        "[data-technology-logo]",
      );
      if (!hero || !strip || !cta || !firstLogo) {
        throw new Error("Hero, CTA or integration content is missing.");
      }

      const heroRect = hero.getBoundingClientRect();
      const stripRect = strip.getBoundingClientRect();
      const ctaRect = cta.getBoundingClientRect();
      const firstLogoRect = firstLogo.getBoundingClientRect();

      return {
        ctaBottom: ctaRect.bottom,
        firstLogoTop: firstLogoRect.top,
        heroBottom: heroRect.bottom,
        stripTop: stripRect.top,
      };
    });

    expect(layout.stripTop).toBeLessThan(viewport.height);
    expect(layout.firstLogoTop).toBeLessThan(viewport.height);
    expect(layout.stripTop).toBeCloseTo(layout.heroBottom, 0);
    expect(layout.ctaBottom).toBeLessThanOrEqual(layout.heroBottom - 16);
  }

  await expect(page.locator("#hero")).not.toContainText(
    /Integrada à sua operação|Código e dados são seus|Primeira entrega/i,
  );
});

test("keeps the desktop hero artwork sharp and dissolves its outer frame", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");

  const presentation = await page.locator("#hero").evaluate((hero) => {
    const media = hero.querySelector<HTMLElement>("[data-home-hero-media]");
    const poster = hero.querySelector<HTMLImageElement>("[data-home-hero-poster]");
    if (!media || !poster) throw new Error("Home hero artwork was not rendered.");

    const mediaRect = media.getBoundingClientRect();
    const posterRect = poster.getBoundingClientRect();
    const posterStyles = getComputedStyle(poster);

    return {
      centeredDelta:
        Math.abs(
          posterRect.left + posterRect.width / 2 -
            (mediaRect.left + mediaRect.width / 2),
        ),
      mediaBackground: getComputedStyle(media).backgroundImage,
      edgeOverlay: getComputedStyle(media, "::after").backgroundImage,
      ambientBackdrop: getComputedStyle(media, "::before").backgroundImage,
      maskImage:
        posterStyles.maskImage ||
        posterStyles.getPropertyValue("-webkit-mask-image"),
      maskComposite:
        posterStyles.maskComposite ||
        posterStyles.getPropertyValue("-webkit-mask-composite"),
      objectFit: posterStyles.objectFit,
      posterWidth: posterRect.width,
      source: poster.currentSrc,
      transform: posterStyles.transform,
    };
  });

  expect(presentation.objectFit).toBe("contain");
  expect(presentation.transform).not.toBe("none");
  expect(presentation.posterWidth).toBeLessThanOrEqual(1601);
  expect(presentation.centeredDelta).toBeLessThanOrEqual(1);
  expect(presentation.mediaBackground).not.toBe("none");
  expect(presentation.ambientBackdrop).toContain(
    "home-hero-touch-desktop.webp",
  );
  expect(presentation.edgeOverlay).not.toBe("none");
  expect(
    presentation.edgeOverlay.match(/linear-gradient/g) ?? [],
  ).toHaveLength(2);
  expect(presentation.edgeOverlay).toContain("24%");
  expect(presentation.edgeOverlay).toContain("76%");
  expect(presentation.maskImage).not.toBe("none");
  expect(presentation.maskImage).toMatch(/(?:to right|90deg)/);
  expect(
    presentation.maskImage.match(/linear-gradient/g) ?? [],
  ).toHaveLength(2);
  expect(presentation.maskImage).toContain("20%");
  expect(presentation.maskImage).toContain("80%");
  expect(presentation.maskComposite).toContain("intersect");
  expect(presentation.source).toContain("q=90");
});

test("moves only the desktop artwork above the preserved hero copy", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const layout = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>("#hero");
    const heading = hero?.querySelector<HTMLElement>("h1");
    const media = hero?.querySelector<HTMLElement>("[data-home-hero-media]");
    const poster = hero?.querySelector<HTMLElement>(
      "[data-home-hero-poster]",
    );
    if (!hero || !heading || !media || !poster) {
      throw new Error("Hero artwork or copy is missing.");
    }

    const heroRect = hero.getBoundingClientRect();
    const headingRect = heading.getBoundingClientRect();
    const posterRect = poster.getBoundingClientRect();
    const ambientTransform = new DOMMatrix(
      getComputedStyle(media, "::before").transform,
    );

    return {
      ambientOffsetY: ambientTransform.m42,
      artworkCenter: posterRect.top + posterRect.height / 2,
      headingTop: headingRect.top,
      heroBottom: heroRect.bottom,
    };
  });

  expect(layout.heroBottom).toBeCloseTo(801, 0);
  expect(layout.headingTop).toBeGreaterThanOrEqual(435);
  expect(layout.headingTop).toBeLessThanOrEqual(455);
  expect(layout.headingTop - layout.artworkCenter).toBeGreaterThanOrEqual(104);
  expect(layout.ambientOffsetY).toBeLessThanOrEqual(-20);
});

test("dissolves the mobile hero artwork above and below its focal point", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const maskImage = await page
    .locator("[data-home-hero-poster]")
    .evaluate((poster) => {
      const styles = getComputedStyle(poster);
      return (
        styles.maskImage || styles.getPropertyValue("-webkit-mask-image")
      );
    });

  expect(maskImage).not.toBe("none");
  expect(maskImage).not.toContain("to right");
});

test("keeps the desktop poster box aligned to the artwork on low monitors", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 600 });
  await page.goto("/");

  const posterRatio = await page
    .locator("[data-home-hero-poster]")
    .evaluate((poster) => {
      const rect = poster.getBoundingClientRect();
      return rect.width / rect.height;
    });

  expect(posterRatio).toBeCloseTo(1672 / 941, 1);
});

test("shows only moving partner logos in a complete first-fold strip", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const strip = page.locator("[data-technology-strip]");
  await expect(strip.locator("#technology-strip-title")).toHaveCount(0);
  await expect(
    strip.locator('[data-technology-group]:not([aria-hidden="true"]) [data-technology-logo]'),
  ).toHaveCount(6);
  await expect(strip).toContainText("Inteligência Artificial & Agentes");
  await expect(strip).toContainText("Automação de Processos");
  await expect(strip).toContainText("Criação de Sites & Softwares");

  const presentation = await strip.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const track = element.querySelector<HTMLElement>("[data-technology-track]");
    if (!track) throw new Error("Technology track is missing.");

    return {
      animationName: getComputedStyle(track).animationName,
      bottom: rect.bottom,
    };
  });

  expect(presentation.animationName).not.toBe("none");
  expect(presentation.bottom).toBeLessThanOrEqual(900);

  const order = await page.evaluate(() => {
    const hero = document.querySelector("#hero");
    const strip = document.querySelector("[data-technology-strip]");
    const value = document.querySelector('[data-home-chapter="value"]');
    return {
      afterHero: hero?.nextElementSibling === strip,
      beforeValue: Boolean(
        strip &&
          value &&
          strip.compareDocumentPosition(value) & Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    };
  });

  expect(order).toEqual({ afterHero: true, beforeValue: true });
});

test("moves the integration ecosystem gently on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const track = page.locator("[data-technology-track]");
  await expect(track).toBeVisible();
  const motion = await track.evaluate((track) => {
    const styles = getComputedStyle(track);
    return {
      animationName: styles.animationName,
      maskImage:
        styles.maskImage || styles.getPropertyValue("-webkit-mask-image"),
    };
  });

  expect(motion.animationName).not.toBe("none");
  expect(motion.maskImage).not.toBe("none");
});

test("stops the integration ecosystem when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const track = page.locator("[data-technology-track]");
  await expect(track).toBeVisible();
  const animationName = await track.evaluate(
    (track) => getComputedStyle(track).animationName,
  );

  expect(animationName).toBe("none");
});

test("keeps the approved blue composition while serving the revised copy", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const value = page.locator('[data-home-chapter="value"]');
  await value.scrollIntoViewIfNeeded();
  await expect(value.locator("[data-value-flow]")).toBeVisible();
  await expect(value.locator("[data-value-step]")).toHaveCount(3);
  await expect(value).toContainText("Trabalho repetitivo vira");
  await expect(value).toContainText("Sem trocar toda a sua operação");
  await expect(value).toContainText("Automatizamos com controle");
});

test("uses static readable fallbacks when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.locator('[data-home-chapter="value"]')).toHaveAttribute(
    "data-motion-mode",
    "static",
  );
  await expect(page.locator("#demonstracoes")).toHaveAttribute(
    "data-motion-mode",
    "static",
  );

  const cardTransforms = await page
    .locator("#demonstracoes [data-demo-card]")
    .evaluateAll((cards) => cards.map((card) => getComputedStyle(card).transform));
  expect(cardTransforms.every((value) => value === "none")).toBe(true);

  const heroAnimations = await page.evaluate(() => ({
    ambient: getComputedStyle(
      document.querySelector<HTMLElement>("[data-home-hero-ambient]")!,
    ).animationName,
    grain: getComputedStyle(
      document.querySelector<HTMLElement>("[data-home-hero-grain]")!,
    ).animationName,
    technologyTrack: getComputedStyle(
      document.querySelector<HTMLElement>("[data-technology-track]")!,
    ).animationName,
  }));
  expect(heroAnimations).toEqual({
    ambient: "none",
    grain: "none",
    technologyTrack: "none",
  });
});

test("keeps the compact navigation clear of the mobile hero", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const navigation = page.locator('[data-site-navigation="true"]');
  const heading = page.locator("#hero h1");
  const [navigationBox, headingBox] = await Promise.all([
    navigation.boundingBox(),
    heading.boundingBox(),
  ]);

  expect(navigationBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(navigationBox!.y + navigationBox!.height).toBeLessThanOrEqual(
    headingBox!.y,
  );
});
