import type { Page } from "@playwright/test";

type Rect = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

type VisibleRect = Rect & {
  selector: string;
};

export type LayoutCheckpoint = {
  checkpoint: string;
  route: string;
  viewport: {
    height: number;
    width: number;
  };
};

type RelevantRect = Rect & {
  height: number;
  selector: string;
  width: number;
};

const DEFAULT_TOLERANCE_PX = 1;

async function visibleRects(page: Page, selector: string): Promise<VisibleRect[]> {
  return page.evaluate((targetSelector) => {
    const hasEffectiveVisibility = (element: Element) => {
      let effectiveOpacity = 1;

      for (let current: Element | null = element; current; current = current.parentElement) {
        const style = window.getComputedStyle(current);

        if (style.display === "none" || style.visibility === "hidden") {
          return false;
        }

        const opacity = Number.parseFloat(style.opacity);
        effectiveOpacity *= Number.isNaN(opacity) ? 1 : opacity;
      }

      return effectiveOpacity >= 0.05;
    };

    return Array.from(document.querySelectorAll(targetSelector))
      .filter(hasEffectiveVisibility)
      .map((element) => {
        const rect = element.getBoundingClientRect();

        return {
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          selector: element.tagName.toLowerCase(),
          top: rect.top,
        };
      });
  }, selector);
}

export async function assertNoHorizontalOverflow(
  page: Page,
  tolerancePx = DEFAULT_TOLERANCE_PX,
): Promise<void> {
  const { scrollWidth, viewportWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));

  if (scrollWidth > viewportWidth + tolerancePx) {
    throw new Error(
      `Expected no horizontal overflow, but scrollWidth was ${scrollWidth}px for a ${viewportWidth}px viewport.`,
    );
  }
}

export async function assertContentWithinViewport(
  page: Page,
  selector: string,
  tolerancePx = DEFAULT_TOLERANCE_PX,
): Promise<void> {
  const [rects, viewportWidth] = await Promise.all([
    visibleRects(page, selector),
    page.evaluate(() => window.innerWidth),
  ]);
  const outsideViewport = rects.filter(
    (rect) =>
      rect.left < -tolerancePx || rect.right > viewportWidth + tolerancePx,
  );

  if (outsideViewport.length > 0) {
    throw new Error(
      `Expected ${selector} to remain within the viewport, but found: ${outsideViewport
        .map((rect) => `${rect.selector} (${rect.left.toFixed(1)}px–${rect.right.toFixed(1)}px)`)
        .join(", ")}.`,
    );
  }
}

export async function assertNoIntersectingRects(
  page: Page,
  firstSelector: string,
  secondSelector: string,
  tolerancePx = DEFAULT_TOLERANCE_PX,
): Promise<void> {
  const [firstRects, secondRects] = await Promise.all([
    visibleRects(page, firstSelector),
    visibleRects(page, secondSelector),
  ]);
  const intersections = firstRects.flatMap((firstRect) =>
    secondRects.filter((secondRect) => {
      const horizontalOverlap =
        Math.min(firstRect.right, secondRect.right) -
        Math.max(firstRect.left, secondRect.left);
      const verticalOverlap =
        Math.min(firstRect.bottom, secondRect.bottom) -
        Math.max(firstRect.top, secondRect.top);

      return horizontalOverlap > tolerancePx && verticalOverlap > tolerancePx;
    }),
  );

  if (intersections.length > 0) {
    throw new Error(
      `Expected ${firstSelector} not to overlap ${secondSelector}, but ${intersections.length} DOMRect intersection(s) were found.`,
    );
  }
}

export async function assertLayoutCheckpoint(
  page: Page,
  checkpoint: LayoutCheckpoint,
  tolerancePx = DEFAULT_TOLERANCE_PX,
): Promise<void> {
  const inspection = await page.evaluate((tolerance) => {
    const relevantSelector =
      'main, main :is(h1, h2, h3, p, a, button, input, textarea, select, [role="heading"])';
    const overlaySelector =
      "nextjs-portal, nextjs-portal *, [data-nextjs-dialog], [data-nextjs-toast], #nextjs-dev-overlay";
    const effectiveVisibility = (element: Element) => {
      let opacity = 1;

      for (let current: Element | null = element; current; current = current.parentElement) {
        const style = window.getComputedStyle(current);

        if (style.display === "none" || style.visibility === "hidden") return false;

        const currentOpacity = Number.parseFloat(style.opacity);
        opacity *= Number.isNaN(currentOpacity) ? 1 : currentOpacity;
      }

      return opacity >= 0.05;
    };
    const isVisuallyClipped = (element: Element) => {
      const rect = element.getBoundingClientRect();

      if (rect.width > tolerance || rect.height > tolerance) return false;

      for (let current: Element | null = element; current; current = current.parentElement) {
        const style = window.getComputedStyle(current);

        if (style.clip !== "auto" || style.clipPath !== "none") return true;
      }

      return false;
    };
    const describe = (element: Element) => {
      const id = element.getAttribute("id");
      const dataAttribute = Array.from(element.attributes).find((attribute) =>
        attribute.name.startsWith("data-"),
      );

      return `${element.tagName.toLowerCase()}${id ? `#${id}` : ""}${
        dataAttribute ? `[${dataAttribute.name}]` : ""
      }`;
    };
    const toRect = (element: Element): RelevantRect => {
      const rect = element.getBoundingClientRect();

      return {
        bottom: rect.bottom,
        height: rect.height,
        left: rect.left,
        right: rect.right,
        selector: describe(element),
        top: rect.top,
        width: rect.width,
      };
    };
    const visibleRelevant = Array.from(document.querySelectorAll(relevantSelector))
      .filter(effectiveVisibility)
      .filter((element) => !isVisuallyClipped(element))
      .map(toRect);
    const visibleOverlays = Array.from(document.querySelectorAll(overlaySelector))
      .filter(effectiveVisibility)
      .map(toRect)
      .filter((rect) => rect.width > tolerance && rect.height > tolerance);
    const identity = Array.from(
      document.querySelectorAll('a[aria-label*="Prometeus"]'),
    ).filter(effectiveVisibility);
    const main = document.querySelector("main");
    const mainRect = main ? toRect(main) : null;
    const forbiddenIntersections = mainRect
      ? visibleOverlays.filter((overlay) => {
          const horizontalOverlap =
            Math.min(mainRect.right, overlay.right) - Math.max(mainRect.left, overlay.left);
          const verticalOverlap =
            Math.min(mainRect.bottom, overlay.bottom) - Math.max(mainRect.top, overlay.top);

          return horizontalOverlap > tolerance && verticalOverlap > tolerance;
        })
      : [];

    return {
      forbiddenIntersections,
      identityText: identity.map((element) => element.textContent?.trim() ?? ""),
      mainText: main?.textContent?.trim() ?? "",
      outsideViewport: visibleRelevant.filter(
        (rect) => rect.left < -tolerance || rect.right > window.innerWidth + tolerance,
      ),
      scrollWidth: document.documentElement.scrollWidth,
      visibleOverlays,
      zeroSize: visibleRelevant.filter(
        (rect) => rect.width === 0 || rect.height === 0,
      ),
      viewportWidth: window.innerWidth,
    };
  }, tolerancePx);
  const label = `${checkpoint.route} ${checkpoint.viewport.width}x${checkpoint.viewport.height} ${checkpoint.checkpoint}`;
  const failures: string[] = [];

  if (!inspection.mainText) failures.push("main has no text content");
  if (inspection.identityText.every((text) => !text)) {
    failures.push("visible Prometeus identity is missing or empty");
  }
  if (inspection.visibleOverlays.length > 0) {
    failures.push(
      `visible development overlay(s): ${inspection.visibleOverlays
        .map((rect) => `${rect.selector} (${rect.left.toFixed(1)},${rect.top.toFixed(1)},${rect.width.toFixed(1)}x${rect.height.toFixed(1)})`)
        .join(", ")}`,
    );
  }
  if (inspection.forbiddenIntersections.length > 0) {
    failures.push(
      `forbidden overlay/main intersection(s): ${inspection.forbiddenIntersections
        .map((rect) => `${rect.selector} (${rect.left.toFixed(1)},${rect.top.toFixed(1)},${rect.width.toFixed(1)}x${rect.height.toFixed(1)})`)
        .join(", ")}`,
    );
  }
  if (inspection.scrollWidth > inspection.viewportWidth + tolerancePx) {
    failures.push(
      `horizontal overflow: scrollWidth ${inspection.scrollWidth}px exceeds viewport ${inspection.viewportWidth}px`,
    );
  }
  if (inspection.outsideViewport.length > 0) {
    failures.push(
      `relevant content outside viewport: ${inspection.outsideViewport
        .map((rect) => `${rect.selector} (${rect.left.toFixed(1)}..${rect.right.toFixed(1)})`)
        .join(", ")}`,
    );
  }
  if (inspection.zeroSize.length > 0) {
    failures.push(
      `visible zero-size content: ${inspection.zeroSize
        .map((rect) => `${rect.selector} (${rect.width.toFixed(1)}x${rect.height.toFixed(1)})`)
        .join(", ")}`,
    );
  }

  if (failures.length > 0) {
    throw new Error(`[layout checkpoint ${label}] ${failures.join("; ")}`);
  }
}
