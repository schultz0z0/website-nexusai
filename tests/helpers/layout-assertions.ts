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
