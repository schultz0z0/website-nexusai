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
  { name: "static", width: 1920, height: 600, expected: "static" },
  { name: "compact", width: 2560, height: 720, expected: "compact" },
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
    /^(cinematic|compact|mobile|static)$/,
  );

  return experience;
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
  await assertLayoutCheckpoint(page, {
    checkpoint: checkpoint.name,
    route: route.path,
    viewport,
  });
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

  test("keeps the Solutions hero, explanation, and six cards in an ordered static flow", async ({
    page,
  }) => {
    await page.goto("/solucoes");
    await expect(page.locator("main")).toHaveAttribute(
      "data-motion-mode",
      "static",
    );

    await waitForAnimationFrames(page);

    const layout = await page.evaluate(() => {
      const toLayout = (selector: string) =>
        Array.from(document.querySelectorAll<HTMLElement>(selector)).map(
          (element) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);

            return {
              bottom: rect.bottom,
              height: rect.height,
              left: rect.left,
              opacity: Number.parseFloat(style.opacity),
              position: style.position,
              right: rect.right,
              top: rect.top,
              visibility: style.visibility,
            };
          },
        );

      return {
        cards: toLayout("[data-field-card]"),
        hero: toLayout("[data-solutions-heading]"),
        intro: toLayout("[data-solutions-intro]"),
        layers: toLayout("[data-solutions-layer]"),
      };
    });

    expect(layout.hero).toHaveLength(1);
    expect(layout.intro).toHaveLength(1);
    expect(layout.cards).toHaveLength(6);
    expect(layout.hero[0].position).toBe("relative");
    expect(layout.intro[0].position).toBe("relative");
    expect(layout.intro[0].top).toBeGreaterThanOrEqual(layout.hero[0].bottom - 1);
    expect(layout.layers[0].top).toBeGreaterThanOrEqual(layout.intro[0].bottom - 1);
    expect(layout.layers.every((layer) => layer.position === "relative")).toBe(
      true,
    );
    expect(
      layout.layers.every(
        (layer, index) =>
          index === 0 || layer.top >= layout.layers[index - 1].bottom - 1,
      ),
    ).toBe(true);
    expect(
      layout.cards.every(
        (card) =>
          card.height > 0 &&
          card.opacity >= 0.95 &&
          card.visibility === "visible",
      ),
    ).toBe(true);

    await page.evaluate(() => window.scrollTo({ top: 520, behavior: "instant" }));
    await waitForAnimationFrames(page);

    const scrolledCards = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-field-card]")).map(
        (element) => {
          const rect = element.getBoundingClientRect();
          return {
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            top: rect.top,
          };
        },
      ),
    );

    const intersections = scrolledCards.flatMap((card, index) =>
      scrolledCards.slice(index + 1).filter((other) => {
        const horizontal = Math.min(card.right, other.right) - Math.max(card.left, other.left);
        const vertical = Math.min(card.bottom, other.bottom) - Math.max(card.top, other.top);
        return horizontal > 8 && vertical > 8;
      }),
    );

    expect(intersections).toHaveLength(0);
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

test("ends the compact Solutions intro before the first solution layer enters", async ({
  page,
}) => {
  await page.setViewportSize({ width: 2560, height: 720 });
  await page.goto("/solucoes");
  await expect(page.locator("main")).toHaveAttribute(
    "data-motion-mode",
    "compact",
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

  const checkpoint = await page.evaluate(() => {
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

  expect(checkpoint.layerVisible).toBe(true);
  expect(checkpoint.introOpacity).toBeLessThan(0.05);
  expect(checkpoint.introVisible).toBe(false);
  expect(checkpoint.visibleCollision).toBe(false);
});

test("keeps static Process checkpoints in a vertical unclipped list", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 600 });
  await page.goto("/processo");
  await expect(page.locator("main")).toHaveAttribute(
    "data-motion-mode",
    "static",
  );

  await waitForAnimationFrames(page);
  await page.evaluate(() => window.scrollTo({ top: 360, behavior: "instant" }));

  const panels = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLElement>("[data-process-panel]")).map(
      (element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);

        return {
          bottom: rect.bottom,
          clipPath: style.clipPath,
          height: rect.height,
          left: rect.left,
          opacity: Number.parseFloat(style.opacity),
          position: style.position,
          right: rect.right,
          top: rect.top,
          visibility: style.visibility,
        };
      },
    ),
  );

  expect(panels).toHaveLength(4);
  expect(
    panels.every(
      (panel) =>
        panel.position === "relative" &&
        panel.height > 0 &&
        panel.opacity >= 0.95 &&
        panel.visibility === "visible" &&
        panel.clipPath === "none",
    ),
  ).toBe(true);
  expect(
    panels.every(
      (panel, index) => index === 0 || panel.top >= panels[index - 1].bottom - 1,
    ),
  ).toBe(true);
});

test("keeps compact Process titles contained while checkpoints 03 and 04 show their complete descriptions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 2560, height: 720 });
  await page.goto("/processo");
  await expect(page.locator("main")).toHaveAttribute(
    "data-motion-mode",
    "compact",
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

test("keeps the static Contact briefing and form in ordinary document flow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 600 });
  await page.goto("/contato");
  await expect(page.locator("main")).toHaveAttribute(
    "data-motion-mode",
    "static",
  );

  await page.evaluate(() => {
    const briefing = document.querySelector<HTMLElement>("[data-contact-briefing]");
    if (!briefing) throw new Error("Contact briefing was not rendered.");
    window.scrollTo({ top: briefing.offsetTop + 180, behavior: "instant" });
  });
  await waitForAnimationFrames(page);

  const layout = await page.evaluate(() => {
    const copy = document.querySelector<HTMLElement>("[data-contact-briefing-copy]");
    const form = document.querySelector<HTMLElement>("[data-contact-form-stage]");
    if (!copy || !form) throw new Error("Contact briefing content was not rendered.");

    const copyRect = copy.getBoundingClientRect();
    const formRect = form.getBoundingClientRect();

    return {
      copyPosition: window.getComputedStyle(copy).position,
      formPosition: window.getComputedStyle(form).position,
      intersects:
        Math.min(copyRect.right, formRect.right) - Math.max(copyRect.left, formRect.left) > 8 &&
        Math.min(copyRect.bottom, formRect.bottom) - Math.max(copyRect.top, formRect.top) > 8,
      visible: [copyRect.height, formRect.height].every((height) => height > 0),
    };
  });

  expect(layout.copyPosition).not.toBe("sticky");
  expect(layout.formPosition).toBe("relative");
  expect(layout.visible).toBe(true);
  expect(layout.intersects).toBe(false);
});

test("fully clears the compact Contact hero before the briefing begins", async ({
  page,
}) => {
  await page.setViewportSize({ width: 2560, height: 720 });
  await page.goto("/contato");
  await expect(page.locator("main")).toHaveAttribute(
    "data-motion-mode",
    "compact",
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

test("keeps the short desktop Home hero and value stage readable without hiding its CTA or proof", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 600 });
  await page.goto("/");
  await expect(page.locator('[data-home-chapter="value"]')).toHaveAttribute(
    "data-motion-mode",
    "static",
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
      viewportHeight: window.innerHeight,
    };
  });

  expect(hero.heroBottom).toBeLessThanOrEqual(hero.viewportHeight + 1);
  expect(hero.actionsTop).toBeGreaterThanOrEqual(hero.titleBottom - 1);
  expect(hero.proofTop).toBeGreaterThanOrEqual(hero.actionsBottom - 1);
  expect(hero.proofBottom).toBeLessThanOrEqual(hero.heroBottom + 1);

  await page.evaluate(() => {
    const stage = document.querySelector<HTMLElement>('[data-home-chapter="value"]');
    if (!stage) throw new Error("Home value stage was not rendered.");
    window.scrollTo({ top: stage.offsetTop, behavior: "instant" });
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
    };
  });

  const valueOverlap =
    Math.min(value.flowRight, value.titleRight) - Math.max(value.flowLeft, value.titleLeft) > 8 &&
    Math.min(value.flowBottom, value.titleBottom) - Math.max(value.flowTop, value.titleTop) > 8;
  expect(valueOverlap).toBe(false);
  expect(value.flowBottom).toBeLessThanOrEqual(value.stageBottom + 1);
});
