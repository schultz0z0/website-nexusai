import { expect, test } from "@playwright/test";

test("keeps the approved opening and introduces custom applications", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const hero = page.locator("#hero");
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText(
    /Multiplique a capacidade\s+da sua equipe com IA/,
  );

  const value = page.locator('[data-home-chapter="value"]');
  await expect(value.getByRole("heading", { level: 2 })).toContainText(
    "Trabalho repetitivo vira",
  );
  await expect(value).toContainText(
    "Não encaixamos sua empresa em um produto pronto.",
  );

  const applications = page.locator("#aplicacoes");
  await expect(applications).toBeVisible();
  await expect(
    applications.getByRole("heading", {
      name: "Seu problema não precisa caber numa ferramenta pronta.",
    }),
  ).toBeVisible();
  await expect(applications.getByRole("tab")).toHaveCount(4);
  await expect(applications).toContainText("Construir o que ainda não existe");
  await expect(applications.locator("[data-capability-image]"))
    .toHaveCount(4);
});

test("advances each application image with its scroll step", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const applications = page.locator("#aplicacoes");
  const steps = applications.locator("[data-capability-step]");
  await expect(steps).toHaveCount(4);

  await steps.nth(2).scrollIntoViewIfNeeded();

  await expect
    .poll(() =>
      applications
        .locator('[data-capability-step][data-active="true"]')
        .getAttribute("data-capability-step"),
    )
    .toBe("decide");
  await expect(
    applications.locator('[data-capability-image="decide"]'),
  ).toHaveAttribute("data-active", "true");
});

test("presents two demonstrations instead of a product catalog", async ({
  page,
}) => {
  await page.goto("/");

  const demos = page.locator("#demonstracoes");
  await expect(demos).toBeVisible();
  await expect(demos.getByText("Demonstração funcional", { exact: true })).toHaveCount(2);
  await expect(demos.getByRole("heading", { name: "Stock" })).toBeVisible();
  await expect(demos.getByRole("heading", { name: "Copilot" })).toBeVisible();
  await expect(demos.getByRole("link", { name: "Falar sobre algo parecido" })).toHaveCount(2);
  await expect(demos.locator('a[href="/solucoes"]')).toHaveCount(0);
});

test("keeps the demo introduction and active card inside the pinned viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const demos = page.locator("#demonstracoes");
  await expect(demos).toHaveAttribute("data-motion-mode", "cinematic");

  await demos.evaluate((section) => {
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY + window.innerHeight * 0.55,
      behavior: "instant",
    });
  });

  await expect
    .poll(async () => {
      return demos.evaluate((section) => {
        const heading = section.querySelector<HTMLElement>("#demos-title");
        const cards = Array.from(
          section.querySelectorAll<HTMLElement>("[data-demo-card]"),
        );
        const activeCard = cards.find((card) => {
          const rect = card.getBoundingClientRect();
          return rect.left < window.innerWidth && rect.right > 0;
        });

        if (!heading || !activeCard) return null;

        const headingRect = heading.getBoundingClientRect();
        const cardRect = activeCard.getBoundingClientRect();
        return {
          headingVisible: headingRect.top >= 72,
          cardAfterHeading: cardRect.top >= headingRect.bottom + 12,
          cardVisible: cardRect.bottom <= window.innerHeight - 12,
        };
      });
    })
    .toEqual({
      headingVisible: true,
      cardAfterHeading: true,
      cardVisible: true,
    });

  const geometry = await demos.evaluate((section) => {
    const heading = section.querySelector<HTMLElement>("#demos-title")!;
    const activeCard = Array.from(
      section.querySelectorAll<HTMLElement>("[data-demo-card]"),
    ).find((card) => {
      const rect = card.getBoundingClientRect();
      return rect.left < window.innerWidth && rect.right > 0;
    })!;
    const headingRect = heading.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();

    return {
      headingTop: headingRect.top,
      headingBottom: headingRect.bottom,
      cardTop: cardRect.top,
      cardBottom: cardRect.bottom,
      viewportHeight: window.innerHeight,
    };
  });

  expect(geometry.headingTop).toBeGreaterThanOrEqual(72);
  expect(geometry.cardTop).toBeGreaterThanOrEqual(geometry.headingBottom + 12);
  expect(geometry.cardBottom).toBeLessThanOrEqual(geometry.viewportHeight - 12);

  await demos.evaluate((section) => {
    const viewport = section.querySelector<HTMLElement>("[data-demo-track]")!
      .parentElement!;
    const track = section.querySelector<HTMLElement>("[data-demo-track]")!;
    const viewportStyle = getComputedStyle(viewport);
    const contentWidth =
      viewport.clientWidth -
      Number.parseFloat(viewportStyle.paddingLeft) -
      Number.parseFloat(viewportStyle.paddingRight);
    const travel = Math.max(window.innerHeight, track.scrollWidth - contentWidth);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: sectionTop + travel, behavior: "instant" });
  });

  await page.waitForTimeout(900);

  const endGeometry = await demos.evaluate((section) => {
    const lastCard = section.querySelector<HTMLElement>(
      "[data-demo-card]:last-child",
    )!;
    const rect = lastCard.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      viewportWidth: window.innerWidth,
    };
  });

  expect(endGeometry.left).toBeGreaterThanOrEqual(12);
  expect(endGeometry.right).toBeLessThanOrEqual(endGeometry.viewportWidth - 12);
});

test("keeps all demo card content visible on short desktops", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 700 });
  await page.goto("/");

  const demos = page.locator("#demonstracoes");
  await expect(demos).toHaveAttribute("data-motion-mode", "cinematic");

  await demos.evaluate((section) => {
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY,
      behavior: "instant",
    });
  });
  await page.waitForTimeout(700);

  const geometry = await demos.locator("[data-demo-card]").first().evaluate((card) => {
    const cardRect = card.getBoundingClientRect();
    const titleRect = card.querySelector("h3")!.getBoundingClientRect();
    const linkRect = card.querySelector("a")!.getBoundingClientRect();
    return {
      cardTop: cardRect.top,
      cardBottom: cardRect.bottom,
      titleTop: titleRect.top,
      linkBottom: linkRect.bottom,
      viewportHeight: window.innerHeight,
    };
  });

  expect(geometry.titleTop).toBeGreaterThanOrEqual(geometry.cardTop + 12);
  expect(geometry.linkBottom).toBeLessThanOrEqual(geometry.cardBottom - 12);
  expect(geometry.cardBottom).toBeLessThanOrEqual(geometry.viewportHeight - 12);
});

test("keeps demo names on one line in ultrawide layouts", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");

  const copilotTitle = page
    .locator("#demonstracoes [data-demo-card]")
    .last()
    .locator("h3");

  const lineCount = await copilotTitle.evaluate((title) => {
    const range = document.createRange();
    range.selectNodeContents(title);
    return range.getClientRects().length;
  });

  expect(lineCount).toBe(1);
});

test("handles objections before the final contact action", async ({ page }) => {
  await page.goto("/");

  const assurances = page.locator("#como-trabalhamos");
  await expect(assurances).toBeVisible();
  await expect(assurances.locator("details")).toHaveCount(4);
  await expect(assurances).toContainText("Mantém decisões sob controle.");

  const closing = page.locator('[data-home-chapter="cta"]');
  await expect(
    closing.getByRole("heading", {
      name: "Tem um problema que nenhuma ferramenta pronta resolveu?",
    }),
  ).toBeVisible();
  await expect(closing.getByRole("link", { name: "Falar com a equipe" })).toHaveCount(1);
  await expect(closing.locator("details")).toHaveCount(6);
});

test("keeps only one assurance and one FAQ answer open", async ({ page }) => {
  await page.goto("/");

  const assurances = page.locator("#como-trabalhamos details");
  await expect(assurances.first()).toHaveAttribute("open", "");
  await assurances.nth(1).locator("summary").click();
  await expect(assurances.nth(1)).toHaveAttribute("open", "");
  await expect(assurances.first()).not.toHaveAttribute("open", "");
  await expect(page.locator("#como-trabalhamos details[open]")).toHaveCount(1);

  const faq = page.locator('[data-home-chapter="cta"] details');
  await faq.first().locator("summary").click();
  await faq.nth(1).locator("summary").click();
  await expect(faq.nth(1)).toHaveAttribute("open", "");
  await expect(faq.first()).not.toHaveAttribute("open", "");
  await expect(
    page.locator('[data-home-chapter="cta"] details[open]'),
  ).toHaveCount(1);
});

test("renders redesigned sections statically with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.locator("#aplicacoes")).toBeVisible();
  await expect(page.locator("#demonstracoes")).toHaveAttribute(
    "data-motion-mode",
    "static",
  );

  const transforms = await page
    .locator("#demonstracoes [data-demo-card]")
    .evaluateAll((cards) => cards.map((card) => getComputedStyle(card).transform));
  expect(transforms.every((transform) => transform === "none")).toBe(true);
});
