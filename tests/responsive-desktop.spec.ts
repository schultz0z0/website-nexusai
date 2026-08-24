import { expect, test, type Page, type TestInfo } from "@playwright/test";

import {
  assertLayoutCheckpoint,
  assertContentWithinViewport,
  assertNoHorizontalOverflow,
  assertNoIntersectingRects,
} from "./helpers/layout-assertions";

test.describe.configure({ timeout: 90_000 });

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
  { name: "short-wide cinematic", width: 1920, height: 600, expected: "cinematic" },
  { name: "ultrawide cinematic", width: 2560, height: 720, expected: "cinematic" },
  { name: "cinematic", width: 1920, height: 1080, expected: "cinematic" },
  { name: "mobile", width: 390, height: 844, expected: "mobile" },
] as const;

const desktopViewportMatrix = [
  { height: 768, width: 1024 },
  { height: 720, width: 1280 },
  { height: 768, width: 1366 },
  { height: 900, width: 1440 },
  { height: 600, width: 1600 },
  { height: 1050, width: 1680 },
  { height: 600, width: 1920 },
  { height: 1080, width: 1920 },
  { height: 720, width: 2560 },
  { height: 1080, width: 2560 },
  { height: 900, width: 3440 },
  { height: 1080, width: 3840 },
  { height: 2160, width: 3840 },
] as const;

const documentCheckpoints = [
  { name: "top", progress: 0 },
  { name: "25%", progress: 0.25 },
  { name: "50%", progress: 0.5 },
  { name: "75%", progress: 0.75 },
  { name: "100%", progress: 1 },
] as const;

const accessibilitySentinelViewports = [
  { height: 600, width: 1920 },
  { height: 1080, width: 1920 },
  { height: 720, width: 2560 },
] as const;

const rootFontScales = [125, 150, 200] as const;

async function waitForAnimationFrames(page: Page): Promise<void> {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      }),
  );
}

function collectHydrationFailures(page: Page): string[] {
  const failures: string[] = [];
  const hydrationMessage = /hydration failed|hydrated but|hydration error/i;

  page.on("console", (message) => {
    if (hydrationMessage.test(message.text())) {
      failures.push(`console: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    if (hydrationMessage.test(error.message)) {
      failures.push(`pageerror: ${error.message}`);
    }
  });

  return failures;
}

async function waitForRouteHydration(
  page: Page,
  route: (typeof desktopRoutes)[number],
): Promise<(typeof motionExperiences)[number]> {
  const experience = motionExperiences.find(
    (candidate) => candidate.path === route.path,
  );
  if (!experience) throw new Error(`No motion root is configured for ${route.path}.`);

  await expect(page.locator(experience.root)).toHaveAttribute(
    "data-motion-mode",
    /^(cinematic|mobile|static)$/,
    { timeout: 10_000 },
  );

  return experience;
}

async function assertFixedNavigationClearsVisibleHero(page: Page): Promise<void> {
  const collisions = await page.evaluate(() => {
    const fixedNavigation = [...document.querySelectorAll<HTMLElement>("nav")].find(
      (element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);

        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          style.position === "fixed" &&
          rect.width > 0 &&
          rect.height > 0
        );
      },
    );
    if (!fixedNavigation) return [];

    const navigationRect = fixedNavigation.getBoundingClientRect();

    return [...document.querySelectorAll<HTMLElement>("main h1")]
      .filter((heading) => {
        const rect = heading.getBoundingClientRect();
        const style = window.getComputedStyle(heading);

        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          Number.parseFloat(style.opacity) > 0 &&
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.top < window.innerHeight
        );
      })
      .flatMap((heading) => {
        const headingRect = heading.getBoundingClientRect();
        const overlapX = Math.max(
          0,
          Math.min(navigationRect.right, headingRect.right) -
            Math.max(navigationRect.left, headingRect.left),
        );
        const overlapY = Math.max(
          0,
          Math.min(navigationRect.bottom, headingRect.bottom) -
            Math.max(navigationRect.top, headingRect.top),
        );

        return overlapX > 0.5 && overlapY > 0.5
          ? [
              {
                heading: heading.textContent?.trim(),
                headingTop: headingRect.top,
                navigationBottom: navigationRect.bottom,
                overlapX,
                overlapY,
              },
            ]
          : [];
      });
  });

  expect(collisions, "fixed navigation must not overlap a visible hero title").toEqual(
    [],
  );
}

function isOpenClipPath(clipPath: string): boolean {
  return ["none", "inset(0%)", "inset(0% 0% 0% 0%)"].includes(clipPath);
}

function layoutLabel(
  route: (typeof desktopRoutes)[number],
  viewport: { height: number; width: number },
  checkpoint: string,
  suffix?: string,
): string {
  return [route.path, `${viewport.width}x${viewport.height}`, checkpoint, suffix]
    .filter(Boolean)
    .join(" | ");
}

function recordLayoutContext(testInfo: TestInfo, label: string): void {
  testInfo.annotations.push({ description: label, type: "desktop-layout" });
}

function failureArtifactName(label: string): string {
  const safeLabel = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `failure-${safeLabel || "layout"}.png`;
}

async function scrollToDocumentProgress(page: Page, progress: number): Promise<void> {
  await page.evaluate((targetProgress) => {
    const maximumScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );

    window.scrollTo({ behavior: "instant", top: maximumScroll * targetProgress });
  }, progress);
  await waitForAnimationFrames(page);
}

async function assertDocumentCheckpoint(
  page: Page,
  route: (typeof desktopRoutes)[number],
  viewport: { height: number; width: number },
  checkpoint: (typeof documentCheckpoints)[number],
  testInfo: TestInfo,
  suffix?: string,
): Promise<void> {
  const label = layoutLabel(route, viewport, checkpoint.name, suffix);
  recordLayoutContext(testInfo, label);
  await scrollToDocumentProgress(page, checkpoint.progress);
  await expect(async () => {
    await assertLayoutCheckpoint(page, {
      checkpoint: checkpoint.name,
      route: route.path,
      viewport,
    });
  }).toPass({ timeout: 5_000 });
}

async function assertDocumentFlow(
  page: Page,
  route: (typeof desktopRoutes)[number],
  viewport: { height: number; width: number },
  testInfo: TestInfo,
  checkpoints: readonly (typeof documentCheckpoints)[number][],
  suffix?: string,
): Promise<void> {
  for (const checkpoint of checkpoints) {
    await assertDocumentCheckpoint(page, route, viewport, checkpoint, testInfo, suffix);
  }
}

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) return;

  const label =
    testInfo.annotations.at(-1)?.description ?? testInfo.titlePath.join(" | ");
  const screenshotPath = testInfo.outputPath(failureArtifactName(label));

  await page.screenshot({ path: screenshotPath });
  await testInfo.attach("desktop-layout-failure-context", {
    body: label,
    contentType: "text/plain",
  });
  await testInfo.attach("desktop-layout-failure-screenshot", { path: screenshotPath });
});

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

test.describe("desktop viewport matrix", () => {
  test.describe.configure({ mode: "parallel" });

  for (const viewport of desktopViewportMatrix) {
    for (const route of desktopRoutes) {
      test(`${route.path} validates all document checkpoints at ${viewport.width}x${viewport.height}`, async ({
        page,
      }, testInfo) => {
        await page.setViewportSize(viewport);
        await page.goto(route.path);
        await expect(page).toHaveTitle(route.title);
        await waitForRouteHydration(page, route);
        await assertFixedNavigationClearsVisibleHero(page);

        await assertDocumentFlow(
          page,
          route,
          viewport,
          testInfo,
          documentCheckpoints,
        );
      });
    }
  }
});

test.describe("desktop accessibility sentinels", () => {
  test.describe.configure({ mode: "parallel" });

  for (const viewport of accessibilitySentinelViewports) {
    for (const route of desktopRoutes) {
      test(`${route.path} uses static flow with reduced motion at ${viewport.width}x${viewport.height}`, async ({
        page,
      }, testInfo) => {
        const hydrationFailures = collectHydrationFailures(page);
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.setViewportSize(viewport);
        await page.goto(route.path);

        const experience = await waitForRouteHydration(page, route);

        await expect(page.locator(experience.root)).toHaveAttribute(
          "data-motion-mode",
          "static",
        );
        await assertFixedNavigationClearsVisibleHero(page);
        await assertDocumentFlow(
          page,
          route,
          viewport,
          testInfo,
          [documentCheckpoints[0], documentCheckpoints[2], documentCheckpoints[4]],
          "reduced-motion",
        );
        expect(hydrationFailures, "reduced-motion hydration failures").toEqual([]);
      });
    }
  }

  for (const rootFontScale of rootFontScales) {
    for (const viewport of accessibilitySentinelViewports) {
      for (const route of desktopRoutes) {
        test(`${route.path} reflows at ${rootFontScale}% root font size and ${viewport.width}x${viewport.height}`, async ({
          page,
        }, testInfo) => {
          const hydrationFailures = collectHydrationFailures(page);
          await page.setViewportSize(viewport);
          await page.goto(route.path);
          await waitForRouteHydration(page, route);
          await page.evaluate((scale) => {
            document.documentElement.style.fontSize = `${scale}%`;
          }, rootFontScale);
          await waitForAnimationFrames(page);
          await assertFixedNavigationClearsVisibleHero(page);

          await assertDocumentFlow(
            page,
            route,
            viewport,
            testInfo,
            [documentCheckpoints[0], documentCheckpoints[2], documentCheckpoints[4]],
            `root-font-${rootFontScale}`,
          );
          expect(hydrationFailures, "root-font hydration failures").toEqual([]);
        });
      }
    }
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
    await expect(root).toHaveAttribute("data-motion-mode", "cinematic");

    await page.setViewportSize({ width: 1920, height: 600 });
    await expect(root).toHaveAttribute("data-motion-mode", "cinematic");
  });
});
test("ends the crowded-desktop Solutions intro before the first solution layer enters", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1920, height: 600 },
    { width: 3440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/solucoes");
    await expect(page.locator("main")).toHaveAttribute(
      "data-motion-mode",
      "cinematic",
    );

    await page.evaluate(() => {
      const scene = document.querySelector<HTMLElement>("[data-solutions-scene]");
      if (!scene) throw new Error("Solutions scene was not rendered.");

      window.scrollTo({
        top: scene.offsetTop + (scene.offsetHeight - window.innerHeight) * 0.4,
        behavior: "instant",
      });
    });
    await waitForAnimationFrames(page);

    const inspectCheckpoint = () => page.evaluate(() => {
      const effectiveVisibility = (element: HTMLElement) => {
        let opacity = 1;

        for (let current: HTMLElement | null = element; current; current = current.parentElement) {
          const style = window.getComputedStyle(current);
          if (style.display === "none" || style.visibility === "hidden") return false;
          opacity *= Number.parseFloat(style.opacity) || 0;
        }

        return opacity >= 0.05;
      };
      const intro = document.querySelector<HTMLElement>("[data-solutions-intro]");
      const layer = document.querySelector<HTMLElement>("[data-solutions-layer]");
      if (!intro || !layer) throw new Error("Solutions intro or first layer was not rendered.");

      const introRect = intro.getBoundingClientRect();
      const layerRect = layer.getBoundingClientRect();
      const style = window.getComputedStyle(intro);

      const introVisible = effectiveVisibility(intro);
      const layerVisible = effectiveVisibility(layer);

      return {
        introOpacity: Number.parseFloat(style.opacity),
        introVisible,
        layerVisible,
        visibleCollision:
          introVisible &&
          layerVisible &&
          Math.min(introRect.right, layerRect.right) - Math.max(introRect.left, layerRect.left) > 8 &&
          Math.min(introRect.bottom, layerRect.bottom) - Math.max(introRect.top, layerRect.top) > 8,
      };
    });

    await expect.poll(async () => {
      const checkpoint = await inspectCheckpoint();

      return (
        checkpoint.layerVisible &&
        checkpoint.introOpacity < 0.05 &&
        !checkpoint.introVisible &&
        !checkpoint.visibleCollision
      );
    }, { timeout: 5_000 }).toBe(true);

    const checkpoint = await inspectCheckpoint();

    expect(checkpoint.layerVisible).toBe(true);
    expect(checkpoint.introOpacity).toBeLessThan(0.05);
    expect(checkpoint.introVisible).toBe(false);
    expect(checkpoint.visibleCollision).toBe(false);
  }
});

test("keeps short-desktop Process titles contained while checkpoints 03 and 04 show their complete descriptions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 600 });
  await page.goto("/processo");
  await expect(page.locator("main")).toHaveAttribute(
    "data-motion-mode",
    "cinematic",
  );

  const inspectCheckpoint = async (progress: number, stage: string) => {
    await page.evaluate((sceneProgress) => {
      const scene = document.querySelector<HTMLElement>("[data-process-scene]");
      if (!scene) throw new Error("Process scene was not rendered.");

      window.scrollTo({
        top: scene.offsetTop + (scene.offsetHeight - window.innerHeight) * sceneProgress,
        behavior: "instant",
      });
    }, progress);
    await waitForAnimationFrames(page);

    const panel = page.locator(`[data-process-stage="${stage}"]`);
    await expect.poll(async () =>
      panel.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        const opacity = Number.parseFloat(style.opacity);

        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          opacity >= 0.95 &&
          rect.width > 8 &&
          rect.height > 8 &&
          ["none", "inset(0%)", "inset(0% 0% 0% 0%)"].includes(style.clipPath)
        );
      }),
    ).toBe(true);

    return panel.evaluate((element) => {
      const title = element.querySelector<HTMLElement>("h2");
      const paragraph = element.querySelector<HTMLElement>("p");
      if (!title || !paragraph) throw new Error("Process panel copy was not rendered.");

      const panelRect = element.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      const descriptionRect = paragraph.getBoundingClientRect();
      let effectiveOpacity = 1;
      let effectivelyVisible = true;

      for (let current: HTMLElement | null = element; current; current = current.parentElement) {
        const style = window.getComputedStyle(current);
        const opacity = Number.parseFloat(style.opacity);

        if (style.display === "none" || style.visibility === "hidden") {
          effectivelyVisible = false;
          break;
        }

        effectiveOpacity *= Number.isNaN(opacity) ? 1 : opacity;
      }

      const panelStyle = window.getComputedStyle(element);

      return {
        clipPath: panelStyle.clipPath,
        descriptionBottom: descriptionRect.bottom,
        descriptionText: paragraph.innerText,
        effectiveOpacity,
        effectivelyVisible,
        panelBottom: panelRect.bottom,
        panelHeight: panelRect.height,
        panelWidth: panelRect.width,
        titleBottom: titleRect.bottom,
        titleHeight: titleRect.height,
      };
    });
  };

  const implementation = await inspectCheckpoint(0.68, "03");
  const support = await inspectCheckpoint(0.87, "04");

  for (const checkpoint of [implementation, support]) {
    expect(checkpoint.effectivelyVisible).toBe(true);
    expect(checkpoint.effectiveOpacity).toBeGreaterThanOrEqual(0.95);
    expect(checkpoint.panelWidth).toBeGreaterThan(8);
    expect(checkpoint.panelHeight).toBeGreaterThan(8);
    expect(isOpenClipPath(checkpoint.clipPath)).toBe(true);
    expect(checkpoint.titleHeight).toBeLessThan(checkpoint.panelHeight * 0.28);
    expect(checkpoint.titleBottom).toBeLessThan(checkpoint.descriptionBottom);
    expect(checkpoint.descriptionBottom).toBeLessThanOrEqual(checkpoint.panelBottom - 8);
    expect(checkpoint.descriptionText.length).toBeGreaterThan(40);
  }
});

test("fully clears the short-desktop Contact hero before the briefing begins", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 600 });
  await page.goto("/contato");
  await expect(page.locator("main")).toHaveAttribute(
    "data-motion-mode",
    "cinematic",
  );

  await page.evaluate(() => {
    const briefing = document.querySelector<HTMLElement>("[data-contact-briefing]");
    if (!briefing) throw new Error("Contact briefing was not rendered.");
    window.scrollTo({ top: Math.max(0, briefing.offsetTop - 24), behavior: "instant" });
  });
  await waitForAnimationFrames(page);

  const checkpoint = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>("[data-contact-hero-copy]");
    const briefing = document.querySelector<HTMLElement>("[data-contact-briefing]");
    if (!hero || !briefing) throw new Error("Contact scene was not rendered.");

    const heroRect = hero.getBoundingClientRect();
    const briefingRect = briefing.getBoundingClientRect();
    const style = window.getComputedStyle(hero);
    const opacity = Number.parseFloat(style.opacity);
    const visible =
      style.display !== "none" && style.visibility !== "hidden" && opacity >= 0.05;

    return {
      opacity,
      visible,
      visibleCollision:
        visible &&
        Math.min(heroRect.right, briefingRect.right) - Math.max(heroRect.left, briefingRect.left) > 8 &&
        Math.min(heroRect.bottom, briefingRect.bottom) - Math.max(heroRect.top, briefingRect.top) > 8,
    };
  });

  expect(checkpoint.opacity).toBeLessThan(0.05);
  expect(checkpoint.visible).toBe(false);
  expect(checkpoint.visibleCollision).toBe(false);
});

test("keeps the short-desktop Contact response scene inside the cinematic viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 600 });
  await page.goto("/contato");
  await expect(page.locator("main")).toHaveAttribute(
    "data-motion-mode",
    "cinematic",
  );

  await page.evaluate(() => {
    const scene = document.querySelector<HTMLElement>("[data-response-scene]");
    if (!scene) throw new Error("Contact response scene was not rendered.");
    window.scrollTo({ top: scene.offsetTop + 24, behavior: "instant" });
  });
  await waitForAnimationFrames(page);

  const checkpoint = await page.evaluate(() => {
    const scene = document.querySelector<HTMLElement>("[data-response-scene]");
    const sticky = scene?.firstElementChild as HTMLElement | null;
    const heading = scene?.querySelector<HTMLElement>("h2");
    const stage = scene?.querySelector<HTMLElement>("[data-response-panel]")
      ?.parentElement;
    const panel = scene?.querySelector<HTMLElement>("[data-response-panel]");
    const description = panel?.querySelector<HTMLElement>("p");
    if (!sticky || !heading || !stage || !panel || !description) {
      throw new Error("Contact response content was not rendered.");
    }

    const stickyRect = sticky.getBoundingClientRect();
    const headingRect = heading.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const descriptionRect = description.getBoundingClientRect();

    return {
      descriptionBottom: descriptionRect.bottom,
      headingBottom: headingRect.bottom,
      headingTop: headingRect.top,
      panelBottom: panelRect.bottom,
      panelTop: panelRect.top,
      stageBottom: stageRect.bottom,
      stageTop: stageRect.top,
      stickyBottom: stickyRect.bottom,
      stickyTop: stickyRect.top,
      viewportHeight: window.innerHeight,
    };
  });

  expect(checkpoint.stickyTop).toBeGreaterThanOrEqual(-1);
  expect(checkpoint.stickyBottom).toBeLessThanOrEqual(
    checkpoint.viewportHeight + 1,
  );
  expect(checkpoint.headingTop).toBeGreaterThanOrEqual(checkpoint.stickyTop - 1);
  expect(checkpoint.headingBottom).toBeLessThanOrEqual(checkpoint.stickyBottom + 1);
  expect(checkpoint.stageTop).toBeGreaterThanOrEqual(checkpoint.stickyTop - 1);
  expect(checkpoint.stageBottom).toBeLessThanOrEqual(checkpoint.stickyBottom + 1);
  expect(checkpoint.panelTop).toBeGreaterThanOrEqual(checkpoint.stageTop - 1);
  expect(checkpoint.panelBottom).toBeLessThanOrEqual(checkpoint.stageBottom + 1);
  expect(checkpoint.descriptionBottom).toBeLessThanOrEqual(
    checkpoint.panelBottom - 8,
  );
});

test("presents the approved static Nexus connection hero", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const hero = page.locator("#hero");
  const title = hero.getByRole("heading", { level: 1 });

  await expect(title).toHaveText(
    /Multiplique a capacidade\s+da sua equipe com IA/,
  );
  await expect(title.locator("span")).toHaveText("da sua equipe com IA");
  await expect(
    hero.getByText(
      "Automações e agentes sob medida que eliminam tarefas repetitivas e ampliam a capacidade da sua equipe.",
    ),
  ).toBeVisible();
  await expect(
    hero.getByRole("link", { name: "Descobrir onde aplicar IA" }),
  ).toBeVisible();
  await expect(hero.locator('a[href="/contato"]')).toHaveCount(1);
  await expect(hero.getByText("Integrada à sua operação")).toBeVisible();
  await expect(hero.getByText("Código e dados são seus")).toBeVisible();
  await expect(hero.getByText("Primeira entrega em 2–3 semanas")).toBeVisible();

  const alignment = await hero.evaluate((section) => {
    const heading = section.querySelector("h1");
    if (!heading) throw new Error("Home hero title was not rendered.");

    const heroRect = section.getBoundingClientRect();
    const titleRect = heading.getBoundingClientRect();

    return {
      heroCenter: heroRect.left + heroRect.width / 2,
      titleCenter: titleRect.left + titleRect.width / 2,
    };
  });

  expect(Math.abs(alignment.heroCenter - alignment.titleCenter)).toBeLessThanOrEqual(2);
});

test("uses the exact Solutions cinematic text treatment on the Home hero title", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/solucoes");

  const solutionsTreatment = await page
    .locator("[data-solutions-title]")
    .evaluate((title) => {
      const styles = getComputedStyle(title);
      return {
        backgroundClip: styles.backgroundClip,
        backgroundImage: styles.backgroundImage,
        color: styles.color,
        filter: styles.filter,
        textStrokeColor: styles.getPropertyValue("-webkit-text-stroke-color"),
        textStrokeWidth: styles.getPropertyValue("-webkit-text-stroke-width"),
      };
    });

  await page.goto("/");
  const homeTitle = page.locator("#hero h1");
  const homeTreatment = await homeTitle.evaluate((title) => {
    const styles = getComputedStyle(title);
    return {
      backgroundClip: styles.backgroundClip,
      backgroundImage: styles.backgroundImage,
      color: styles.color,
      filter: styles.filter,
      textStrokeColor: styles.getPropertyValue("-webkit-text-stroke-color"),
      textStrokeWidth: styles.getPropertyValue("-webkit-text-stroke-width"),
    };
  });
  const accentColor = await homeTitle.locator("span").evaluate(
    (accent) => getComputedStyle(accent).color,
  );

  expect(solutionsTreatment.backgroundImage).not.toBe("none");
  expect(solutionsTreatment.backgroundClip).toBe("text");
  expect(homeTreatment).toEqual(solutionsTreatment);
  expect(accentColor).toBe(homeTreatment.color);
});

test("reserves paint area below the Home title descenders", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const paintArea = await page.locator("#hero h1").evaluate((title) => {
    const finalLine = title.querySelector<HTMLElement>("span");
    if (!finalLine) throw new Error("Home hero final title line was not rendered.");

    const titleRect = title.getBoundingClientRect();
    const finalLineRect = finalLine.getBoundingClientRect();
    const fontSize = Number.parseFloat(getComputedStyle(title).fontSize);

    return {
      descenderRoom: titleRect.bottom - finalLineRect.bottom,
      fontSize,
    };
  });

  expect(paintArea.descenderRoom).toBeGreaterThanOrEqual(paintArea.fontSize * 0.09);
});

test("loads the static hero poster through the video-ready media layer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const media = page.locator("[data-home-hero-media]");
  const poster = media.locator("[data-home-hero-poster]");
  await expect(poster).toBeVisible();
  await expect(poster).toHaveAttribute("src", /home-hero-touch-desktop\.png/);
  await expect(poster).toHaveAttribute("sizes", "100vw");
  await expect(poster).toHaveAttribute("width", "1672");
  await expect(poster).toHaveAttribute("height", "941");

  await expect
    .poll(() =>
      poster.evaluate(
        (image) =>
          image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
});

test("centers the Home hero touch between the navigation and headline", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const placement = await page.evaluate(() => {
    const navigation = [...document.querySelectorAll<HTMLElement>("nav")].find(
      (element) =>
        getComputedStyle(element).position === "fixed" &&
        element.getBoundingClientRect().width > 0,
    );
    const headline = document.querySelector<HTMLElement>("#hero h1");
    const poster = document.querySelector<HTMLElement>("[data-home-hero-poster]");

    if (!navigation || !headline || !poster) {
      throw new Error("Home hero placement anchors were not rendered.");
    }

    const navigationRect = navigation.getBoundingClientRect();
    const headlineRect = headline.getBoundingClientRect();
    const posterRect = poster.getBoundingClientRect();

    return {
      availableSpace: headlineRect.top - navigationRect.bottom,
      targetY: (navigationRect.bottom + headlineRect.top) / 2,
      touchY: posterRect.top + posterRect.height / 2,
    };
  });

  expect(placement.availableSpace).toBeGreaterThan(240);
  expect(Math.abs(placement.touchY - placement.targetY)).toBeLessThanOrEqual(36);
});

test("renders the Home hero as a static image without video requests", async ({
  page,
}) => {
  const videoRequests: string[] = [];
  page.on("request", (request) => {
    if (/\/videos\//.test(request.url())) {
      videoRequests.push(request.url());
    }
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const media = page.locator("[data-home-hero-media]");
  const poster = media.locator("[data-home-hero-poster]");
  await expect(media.locator("video")).toHaveCount(0);
  await expect(poster).toBeVisible();

  const initialImageState = await poster.evaluate((image) => {
    const styles = getComputedStyle(image);
    return {
      animationName: styles.animationName,
      transform: styles.transform,
    };
  });
  await page.waitForTimeout(400);
  const settledTransform = await poster.evaluate(
    (image) => getComputedStyle(image).transform,
  );

  expect(initialImageState.animationName).toBe("none");
  expect(settledTransform).toBe(initialImageState.transform);
  expect(videoRequests).toEqual([]);
});

test("adds restrained ambient motion without animating the Home hero image", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const ambient = page.locator("[data-home-hero-ambient]");
  const grain = page.locator("[data-home-hero-grain]");
  const poster = page.locator("[data-home-hero-poster]");
  await expect(ambient).toBeVisible();
  await expect(grain).toBeVisible();

  const motion = await page.evaluate(() => {
    const ambientLayer = document.querySelector<HTMLElement>(
      "[data-home-hero-ambient]",
    );
    const grainLayer = document.querySelector<HTMLElement>(
      "[data-home-hero-grain]",
    );
    const image = document.querySelector<HTMLElement>("[data-home-hero-poster]");
    if (!ambientLayer || !grainLayer || !image) {
      throw new Error("Home hero ambient layers were not rendered.");
    }

    const ambientStyles = getComputedStyle(ambientLayer);
    const grainStyles = getComputedStyle(grainLayer);
    const imageStyles = getComputedStyle(image);
    return {
      ambientAnimation: ambientStyles.animationName,
      ambientDuration: Number.parseFloat(ambientStyles.animationDuration),
      ambientOpacity: Number.parseFloat(ambientStyles.opacity),
      ambientPointerEvents: ambientStyles.pointerEvents,
      grainAnimation: grainStyles.animationName,
      grainDuration: Number.parseFloat(grainStyles.animationDuration),
      imageAnimation: imageStyles.animationName,
    };
  });

  expect(motion.imageAnimation).toBe("none");
  expect(motion.ambientAnimation).not.toBe("none");
  expect(motion.ambientDuration).toBeGreaterThanOrEqual(8);
  expect(motion.ambientOpacity).toBeLessThanOrEqual(0.3);
  expect(motion.ambientPointerEvents).toBe("none");
  expect(motion.grainAnimation).not.toBe("none");
  expect(motion.grainDuration).toBeGreaterThanOrEqual(12);
  await expect(poster).toBeVisible();
});

test("stops Home hero ambient motion when reduced motion is requested", async ({
  page,
}) => {

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const media = page.locator("[data-home-hero-media]");
  await expect(media.locator("video")).toHaveCount(0);
  await expect(media.locator("[data-home-hero-poster]")).toBeVisible();
  const animations = await page.evaluate(() => ({
    ambient: getComputedStyle(
      document.querySelector<HTMLElement>("[data-home-hero-ambient]")!,
    ).animationName,
    grain: getComputedStyle(
      document.querySelector<HTMLElement>("[data-home-hero-grain]")!,
    ).animationName,
  }));
  expect(animations).toEqual({ ambient: "none", grain: "none" });
});

test("keeps the mobile Home hero proof inside the first viewport", async ({ page }) => {
  const mobileViewports = [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 438, height: 852 },
  ];

  for (const viewport of mobileViewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const hero = page.locator("#hero");
    await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(hero.getByRole("link", { name: "Descobrir onde aplicar IA" })).toBeVisible();
    await expect(hero.getByText("Primeira entrega em 2–3 semanas")).toBeVisible();

    const layout = await hero.evaluate((section) => {
      const title = section.querySelector<HTMLElement>("h1");
      const proof = section.querySelector<HTMLElement>('[aria-label="Provas de experiência"]');
      if (!title || !proof) throw new Error("Mobile Home hero content was not rendered.");

      const heroRect = section.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      const proofRect = proof.getBoundingClientRect();

      return {
        heroCenter: heroRect.left + heroRect.width / 2,
        heroHeight: heroRect.height,
        proofBottom: proofRect.bottom,
        titleCenter: titleRect.left + titleRect.width / 2,
        viewportHeight: window.innerHeight,
        viewportOverflow: document.documentElement.scrollWidth - window.innerWidth,
      };
    });

    expect(Math.abs(layout.heroCenter - layout.titleCenter)).toBeLessThanOrEqual(2);
    expect(layout.heroHeight).toBeLessThanOrEqual(layout.viewportHeight + 1);
    expect(layout.proofBottom).toBeLessThanOrEqual(layout.viewportHeight - 56);
    expect(layout.viewportOverflow).toBeLessThanOrEqual(1);
  }
});

test("shows the mobile Home hero image without zoom and centers its touch", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const placement = await page.evaluate(() => {
    const logo = [...document.querySelectorAll<HTMLElement>(
      'a[aria-label="Nexus AI — voltar ao início"]',
    )].find((element) => element.getBoundingClientRect().width > 0);
    const headline = document.querySelector<HTMLElement>("#hero h1");
    const poster = document.querySelector<HTMLElement>("[data-home-hero-poster]");
    if (!logo || !headline || !poster) {
      throw new Error("Mobile Home hero placement anchors were not rendered.");
    }

    const logoRect = logo.getBoundingClientRect();
    const headlineRect = headline.getBoundingClientRect();
    const posterRect = poster.getBoundingClientRect();

    return {
      aspectRatio: posterRect.height / posterRect.width,
      objectFit: getComputedStyle(poster).objectFit,
      targetY: (logoRect.bottom + headlineRect.top) / 2,
      touchY: posterRect.top + posterRect.height / 2,
    };
  });

  expect(placement.aspectRatio).toBeCloseTo(941 / 1672, 2);
  expect(placement.objectFit).toBe("contain");
  expect(Math.abs(placement.touchY - placement.targetY)).toBeLessThanOrEqual(28);
});

test("keeps the short desktop Home hero and value stage readable without hiding its CTA or proof", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 600 });
  await page.goto("/");
  await expect(page.locator('[data-home-chapter="value"]')).toHaveAttribute(
    "data-motion-mode",
    "cinematic",
  );

  const hero = await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>("#hero");
    const title = section?.querySelector<HTMLElement>("h1");
    const actions = section?.querySelector<HTMLElement>('a[href="/contato"]');
    const proof = section?.querySelector<HTMLElement>('[aria-label="Provas de experiência"]');
    if (!section || !title || !actions || !proof) throw new Error("Home hero content was not rendered.");

    const heroRect = section.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const actionsRect = actions.getBoundingClientRect();
    const proofRect = proof.getBoundingClientRect();

    return {
      actionsBottom: actionsRect.bottom,
      actionsTop: actionsRect.top,
      heroBottom: heroRect.bottom,
      proofBottom: proofRect.bottom,
      proofTop: proofRect.top,
      titleBottom: titleRect.bottom,
    };
  });

  expect(hero.actionsTop).toBeGreaterThanOrEqual(hero.titleBottom - 1);
  expect(hero.proofTop).toBeGreaterThanOrEqual(hero.actionsBottom - 1);
  expect(hero.proofBottom).toBeLessThanOrEqual(hero.heroBottom - 12);

  await page.evaluate(() => {
    const stage = document.querySelector<HTMLElement>('[data-home-chapter="value"]');
    if (!stage) throw new Error("Home value stage was not rendered.");
    window.scrollTo({
      top: window.scrollY + stage.getBoundingClientRect().top,
      behavior: "instant",
    });
  });

  const value = await page.evaluate(() => {
    const stage = document.querySelector<HTMLElement>('[data-home-chapter="value"]');
    const title = stage?.querySelector<HTMLElement>("h2");
    const flow = stage?.querySelector<HTMLElement>("[data-value-flow]");
    if (!stage || !title || !flow) throw new Error("Home value content was not rendered.");

    const stageRect = stage.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const flowRect = flow.getBoundingClientRect();

    return {
      flowBottom: flowRect.bottom,
      flowLeft: flowRect.left,
      flowRight: flowRect.right,
      flowTop: flowRect.top,
      stageBottom: stageRect.bottom,
      titleBottom: titleRect.bottom,
      titleLeft: titleRect.left,
      titleRight: titleRect.right,
      titleTop: titleRect.top,
      viewportHeight: window.innerHeight,
    };
  });

  const valueOverlap =
    Math.min(value.flowRight, value.titleRight) - Math.max(value.flowLeft, value.titleLeft) > 8 &&
    Math.min(value.flowBottom, value.titleBottom) - Math.max(value.flowTop, value.titleTop) > 8;
  expect(valueOverlap).toBe(false);
  expect(value.flowTop).toBeGreaterThanOrEqual(-1);
  expect(value.flowBottom).toBeLessThanOrEqual(
    Math.min(value.stageBottom, value.viewportHeight) + 1,
  );
});
