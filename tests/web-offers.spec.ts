import { expect, test } from "@playwright/test";
import { assertNoHorizontalOverflow } from "./helpers/layout-assertions";

for (const width of [320, 1440]) {
  test(`shows the site and store offers with clear payment amounts at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/servicos/desenvolvimento-web");
    const offers = page.getByRole("region", { name: "Seu site ou sua loja. Com preço definido." });
    for (const name of ["Criação de site", "Criação de loja virtual"]) {
      const offer = offers.getByRole("article").filter({ has: page.getByRole("heading", { name, exact: true }) });
      await expect(offer).toContainText("R$ 1.500");
      await expect(offer).toContainText("10× de R$ 150");
      await expect(offer).toContainText("sem juros");
      await expect(offer).toContainText("R$ 1.425 no Pix");
    }
    await assertNoHorizontalOverflow(page);
  });
}

test("simulates Pix and card without charging and preserves the mandatory monthly fee", async ({ page }) => {
  await page.goto("/servicos/desenvolvimento-web");
  const trigger = page.getByRole("button", { name: "Quero meu site", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Simulação de contratação" });
  await expect(dialog).toContainText("Nenhum pagamento ou pedido será realizado");
  await expect(dialog).toContainText("10× de R$ 150,00 sem juros");
  await dialog.getByRole("radio", { name: /Pix/ }).check();
  await expect(dialog.locator("dl")).toContainText("R$ 1.425,00");
  await expect(dialog.locator("dl")).toContainText("R$ 50,00/mês");
  await dialog.getByRole("button", { name: "Concluir simulação" }).click();
  await expect(dialog.getByRole("status")).toHaveText("Simulação concluída. Nenhuma cobrança foi feita.");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("shows real projects with honest publication status and a controllable Remotion presentation", async ({ page, request }) => {
  await page.goto("/servicos/desenvolvimento-web");
  const portfolio = page.getByRole("region", { name: "Projetos de clientes. Veja os sites em movimento." });
  await expect(portfolio).toContainText("Jotape Publicidade");
  await expect(portfolio).toContainText("Foxstage");
  await expect(portfolio).toContainText("Em desenvolvimento");
  await expect(portfolio.locator('a[href*="127.0.0.1"]')).toHaveCount(0);
  expect((await request.get("/videos/portfolio/jotape-scroll.mp4")).status()).toBe(200);
  expect((await request.get("/videos/portfolio/foxstage-scroll.mp4")).status()).toBe(200);
  await portfolio.getByRole("button", { name: "Reproduzir apresentação de Foxstage", exact: true }).click();
  const pause = portfolio.getByRole("button", { name: "Pausar apresentação de Foxstage", exact: true });
  await expect(pause).toBeVisible();
  await expect.poll(() => portfolio.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(0);
  await pause.click();
  await expect(portfolio.getByRole("button", { name: "Reproduzir apresentação de Foxstage", exact: true })).toBeVisible();
  await portfolio.getByRole("button", { name: "Abrir apresentação de Foxstage em tela cheia" }).click();
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
  await expect(portfolio.getByRole("button", { name: "Recomeçar apresentação de Foxstage" })).toBeVisible();
  await portfolio.getByRole("button", { name: "Reproduzir apresentação de Foxstage", exact: true }).click();
  await expect(pause).toBeVisible();
  await portfolio.getByRole("button", { name: "Sair da tela cheia", exact: true }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement === null)).toBe(true);
});

test("adds Clementino and Fast Limp below the existing projects in two desktop columns", async ({ page, request }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/servicos/desenvolvimento-web");
  const portfolio = page.getByRole("region", { name: "Projetos de clientes. Veja os sites em movimento." });
  const projects = portfolio.locator("figure");
  await expect(projects).toHaveCount(4);
  await expect(projects.nth(2)).toContainText("Clementino Imóveis");
  await expect(projects.nth(2)).toContainText("Publicado");
  await expect(projects.nth(2).getByRole("link", { name: "Visitar site" })).toHaveAttribute("href", "https://clementinoimoveis.com.br/");
  await expect(projects.nth(3)).toContainText("Fast Limp");
  await expect(projects.nth(3)).toContainText("Em desenvolvimento");
  await expect(projects.nth(3).getByRole("link")).toHaveCount(0);
  const boxes = await projects.evaluateAll(elements => elements.map(element => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y, bottom: rect.bottom };
  }));
  expect(boxes[0].y).toBe(boxes[1].y);
  expect(boxes[2].y).toBe(boxes[3].y);
  expect(boxes[2].y).toBeGreaterThan(boxes[0].bottom);
  expect(boxes[2].x).toBe(boxes[0].x);
  expect(boxes[3].x).toBe(boxes[1].x);
  for (const id of ["clementino", "fast-limp"]) {
    expect((await request.get(`/images/portfolio/${id}-poster.webp`)).status()).toBe(200);
    expect((await request.get(`/videos/portfolio/${id}-scroll.mp4`)).status()).toBe(200);
  }
  for (const name of ["Clementino Imóveis", "Fast Limp"]) {
    const project = projects.filter({ has: page.getByRole("heading", { name, exact: true }) });
    await project.getByRole("button", { name: `Reproduzir apresentação de ${name}`, exact: true }).click();
    await expect.poll(() => project.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(0);
    await project.getByRole("button", { name: `Pausar apresentação de ${name}`, exact: true }).click();
    await expect(project.getByRole("button", { name: `Reproduzir apresentação de ${name}`, exact: true })).toBeVisible();
  }
});

test("keeps the discovery CTA background visible throughout hover", async ({ page }) => {
  await page.goto("/servicos/desenvolvimento-web");
  const cta = page.getByRole("link", { name: "Quero minha empresa online", exact: true });
  await cta.hover();
  const samples = await cta.evaluate(async element => {
    const backgrounds: { image: string; color: string }[] = [];
    for (let frame = 0; frame < 18; frame++) {
      const style = getComputedStyle(element);
      backgrounds.push({ image: style.backgroundImage, color: style.backgroundColor });
      await new Promise(requestAnimationFrame);
    }
    return backgrounds;
  });
  for (const sample of samples) {
    const opaqueColor = sample.color.startsWith("rgb(") || /,\s*1\)$/.test(sample.color);
    expect(sample.image !== "none" || opaqueColor, JSON.stringify(sample)).toBe(true);
  }
  await expect(cta).toBeVisible();
});
