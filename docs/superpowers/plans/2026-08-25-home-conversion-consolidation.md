# Nexus Home Conversion Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the current site into a direct, persuasive, honest conversion experience centered on a single home page plus a focused contact page, while preserving the approved hero and the visual composition of the blue second section.

**Architecture:** Keep `ConversionHome` as the server-rendered page orchestrator and the owner of the two approved opening sections. Move every redesigned section after them into a focused component under `src/components/home/`; only the capability selector and demonstration gallery become client components. Centralize all public marketing copy in `src/lib/content.ts`, replace `/solucoes` and `/processo` with permanent redirects to home anchors, and simplify contact into a short server page plus the existing client form/action boundary.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, GSAP + ScrollTrigger, Framer Motion (form feedback only), Node test runner, Playwright, ESLint.

**Spec:** `docs/superpowers/specs/2026-08-25-home-conversion-consolidation-design.md`

## Global Constraints

- Do not change the hero copy, hierarchy, background, layout, motion, or responsive behavior.
- In the blue second section, change text only. Preserve its layout, panel, 3D treatment, pinning, timing, CSS classes, and responsive behavior.
- Do not publish client claims, operational totals, results, timelines, prices, ROI, or guarantees that cannot be demonstrated as true.
- Present Nexus Stock and Nexus Copilot only as functional demonstrations, never as client cases, a fixed catalog, or the full scope of the company.
- Do not use the prohibited bottleneck term in any rendered public copy.
- Do not add an animation library. Reuse GSAP, ScrollTrigger, Framer Motion, CSS transforms, and existing viewport-motion helpers.
- The blue section remains the first pinned sequence; the demonstration gallery is the second and last long pin.
- Mobile must not depend on hover, cursor tracking, tilt, or pinned horizontal scrolling.
- `prefers-reduced-motion: reduce` must render every section as static, readable content.
- Do not commit and do not push. Replace every integration checkpoint with a local diff review.
- Preserve unrelated dirty-worktree files. Before editing each file, inspect its current diff and merge around user changes.

---

## Task 1: Lock the approved surfaces and add copy contracts

**Files:**

- Create: `tests/home-content.test.mts`
- Modify: `tests/home-narrative.test.mts`
- Modify: `src/lib/home-narrative.ts`
- Modify: `src/lib/content.ts`
- Reference only: `src/components/conversion-home.tsx`
- Reference only: `src/components/conversion-home.module.css`

- [ ] Capture local before-state screenshots at desktop `1440x1000` and mobile `390x844`, including the hero and the full blue section. Store them under `test-results/reference/` only; do not add them to source control.

- [ ] Record the exact current hero strings and the class-name sequence used by the hero and blue section in a temporary review note. This is a visual-regression guard, not new production code.

- [ ] Write a failing narrative-order test that expresses the approved six-section story:

```ts
test("keeps the consolidated home chapter order", () => {
  assert.deepEqual(
    HOME_CHAPTERS.map((chapter) => chapter.id),
    ["hero", "value", "applications", "demos", "assurances", "cta"],
  );
});
```

- [ ] Write failing content-integrity tests in `tests/home-content.test.mts`. Import public content and recursively inspect every string:

```ts
import {
  CONTACT_COPY,
  HOME_ASSURANCES,
  HOME_CAPABILITIES,
  HOME_COPY,
  HOME_DEMOS,
  HOME_FAQ,
} from "../src/lib/content.ts";

const publicContent = {
  CONTACT_COPY,
  HOME_ASSURANCES,
  HOME_CAPABILITIES,
  HOME_COPY,
  HOME_DEMOS,
  HOME_FAQ,
};

test("contains no prohibited or unverified public claims", () => {
  const serialized = JSON.stringify(publicContent);
  assert.doesNotMatch(serialized, /gargal/i);
  assert.doesNotMatch(
    serialized,
    /12\+|plataformas operando|em cliente, com uso real|8 setores|100%|primeiros ganhos|ROI esperado/i,
  );
});

test("labels both examples as functional demonstrations", () => {
  assert.equal(HOME_DEMOS.length, 2);
  assert.ok(HOME_DEMOS.every((demo) => demo.label === "Demonstração funcional"));
});
```

- [ ] Run the two targeted tests and confirm they fail for the expected old chapter IDs and missing content exports:

```powershell
rtk npm run test:unit -- --test-name-pattern "consolidated|prohibited|functional demonstrations"
```

- [ ] Add typed content contracts to `src/lib/content.ts` without removing old exports yet. Use readonly arrays and stable IDs so components and tests share one source of truth:

```ts
export const HOME_COPY = {
  value: {
    eyebrow: "DO TRABALHO REPETITIVO AO RESULTADO",
    title: ["Trabalho repetitivo vira", "capacidade."],
    lead: "Não encaixamos sua empresa em um produto pronto. Entendemos o problema, conectamos o que já existe e construímos a solução necessária.",
    outcomes: [
      { title: "Tempo recuperado", description: "Horas voltam para atendimento, decisão e crescimento." },
      { title: "Menos retrabalho", description: "Dados circulam entre sistemas sem copiar, colar ou conferir duas vezes." },
      { title: "Mais capacidade para crescer", description: "O volume aumenta sem a equipe crescer na mesma proporção." },
    ],
    flow: [
      { step: "01 · DIAGNÓSTICO", title: "Localizamos onde o tempo se perde", description: "Tarefas, volume, exceções, sistemas e custo manual." },
      { step: "02 · AUTOMAÇÃO", title: "Automatizamos com controle", description: "Integrações, regras e aprovações humanas dentro da rotina atual." },
      { step: "03 · RESULTADO", title: "Medimos o que mudou", description: "Tempo poupado, erros evitados e capacidade entregue." },
    ],
    guardrail: "Sem trocar toda a sua operação",
  },
  applications: {
    eyebrow: "SOB MEDIDA, DE VERDADE",
    title: "Seu problema não precisa caber numa ferramenta pronta.",
    body: "A solução pode ser uma automação, um agente, uma integração, um dashboard ou um produto inteiramente novo. A forma muda. O objetivo é resolver.",
  },
  demos: {
    eyebrow: "DA IDEIA À OPERAÇÃO",
    title: "Dois exemplos. Não um catálogo.",
    body: "Nexus Stock e Nexus Copilot mostram como transformamos contextos diferentes em soluções funcionais. O próximo projeto começa no problema da sua empresa.",
  },
  assurances: {
    eyebrow: "PERSONALIZADO, NÃO IMPROVISADO",
    title: "Antes de construir, deixamos quatro coisas claras.",
  },
  cta: {
    eyebrow: "CONVERSA INICIAL",
    title: "Tem um problema que nenhuma ferramenta pronta resolveu?",
    body: "Conte o contexto. A gente ajuda a descobrir qual solução faz sentido construir. Se não houver uma oportunidade real, você também saberá.",
    label: "Falar com a equipe",
    microcopy: "Sem compromisso · uma pessoa responde · retorno em até 1 dia útil",
  },
} as const;

export const HOME_CAPABILITIES = [
  { id: "automate", title: "Automatizar o repetitivo", description: "Para a equipe voltar ao trabalho que exige decisão." },
  { id: "connect", title: "Conectar o que está separado", description: "Sistemas, dados e pessoas operando no mesmo fluxo." },
  { id: "decide", title: "Transformar dados em decisão", description: "Menos relatório manual. Mais contexto na hora certa." },
  { id: "build", title: "Construir o que ainda não existe", description: "Ferramentas internas e produtos digitais desenhados para a realidade da empresa." },
] as const;
```

- [ ] Add `HOME_DEMOS`, `HOME_ASSURANCES`, `HOME_FAQ`, and `CONTACT_COPY` with the exact approved positioning. Use this concrete content contract:

```ts
export const HOME_DEMOS = [
  {
    id: "stock",
    label: "Demonstração funcional",
    name: "Nexus Stock",
    context: "Uma operação de estoque precisa reunir demanda, disponibilidade e reposição sem depender de conferências espalhadas.",
    solution: "Um painel que organiza os sinais da operação, destaca exceções e apoia o planejamento de compra por item.",
    humanDecision: "Prioridade, quantidade de compra e aprovação continuam com a equipe responsável.",
    cta: { href: "/contato", label: "Falar sobre algo parecido" },
  },
  {
    id: "copilot",
    label: "Demonstração funcional",
    name: "Nexus Copilot",
    context: "Um time de marketing precisa transformar pesquisa, briefing e produção em um fluxo mais conectado e revisável.",
    solution: "Um ambiente que organiza referências, gera pontos de partida e concentra a revisão das peças antes da publicação.",
    humanDecision: "Estratégia, direção criativa, aprovação e publicação continuam humanas.",
    cta: { href: "/contato", label: "Falar sobre algo parecido" },
  },
] as const;

export const HOME_ASSURANCES = [
  { id: "context", title: "Começa pelo contexto.", description: "Entendemos processo, pessoas, dados, volume e impacto antes de definir tecnologia." },
  { id: "integration", title: "Integra com o que já funciona.", description: "A solução entra na operação sem exigir que tudo seja substituído." },
  { id: "control", title: "Mantém decisões sob controle.", description: "Regras, aprovações, registros e limites fazem parte do sistema." },
  { id: "ownership", title: "Continua sendo seu.", description: "Código, dados e documentação ficam com a empresa." },
] as const;

export const HOME_FAQ = [
  { q: "Para que tipo de empresa a Nexus faz sentido?", a: "O porte importa menos que o problema: volume, repetição, impacto operacional e falta de uma ferramenta que resolva o fluxo inteiro." },
  { q: "Vocês integram as ferramentas que já usamos?", a: "O projeto começa entendendo os sistemas, dados e restrições atuais. A proposta define o que pode ser integrado e o que precisa ser adaptado." },
  { q: "A automação toma decisões sozinha?", a: "Não por padrão. Aprovações humanas, limites, registros e caminhos de exceção são definidos conforme o risco de cada decisão." },
  { q: "Quem fica com o código e os dados?", a: "Código, dados, acessos e documentação são tratados de forma explícita no escopo para que a empresa saiba o que recebe e controla." },
  { q: "Quanto custa e quanto tempo leva?", a: "Prazo e investimento dependem do contexto, das integrações e do resultado esperado. Eles são definidos depois da conversa inicial, não por uma faixa genérica." },
  { q: "Como vocês tratam segurança e LGPD?", a: "Requisitos de acesso, armazenamento, privacidade e rastreabilidade entram no desenho de cada projeto conforme os dados envolvidos. Necessidades específicas precisam ser confirmadas antes da proposta." },
] as const;

export const CONTACT_COPY = {
  eyebrow: "CONVERSA INICIAL",
  title: "Conte o problema. A gente começa pelo contexto.",
  body: "Não precisa escrever um projeto. Explique o que consome tempo, quem é impactado e o que você gostaria que funcionasse melhor.",
  humanNote: "Sua mensagem é lida por uma pessoa.",
} as const;
```

- [ ] Change `HOME_CHAPTERS` to the new stable IDs while keeping the existing viewport-motion functions unchanged.

- [ ] Run the targeted tests and then the full unit suite:

```powershell
rtk npm run test:unit
```

- [ ] Review the local diff. Confirm Task 1 only adds contracts and changes chapter IDs; no approved layout or animation code has changed.

---

## Task 2: Reduce navigation to logo plus one conversion action

**Files:**

- Modify: `src/components/nexus-nav.tsx`
- Modify: `src/components/nexus-nav.module.css`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/components/site-footer.module.css`
- Modify: `tests/brand-logo.spec.ts`
- Modify: `tests/responsive-desktop.spec.ts`

- [ ] Update Playwright expectations first:

```ts
await expect(page.getByRole("navigation")).toContainText("Falar com a equipe");
await expect(page.getByRole("navigation").getByRole("link")).toHaveCount(2);
await expect(page.getByRole("navigation").getByRole("link", { name: "Soluções" })).toHaveCount(0);
await expect(page.getByRole("navigation").getByRole("link", { name: "Processo" })).toHaveCount(0);
await expect(page.getByRole("button", { name: /menu/i })).toHaveCount(0);
```

- [ ] Add separate desktop and mobile assertions. Desktop must expose the full label; mobile must expose the compact visible label `Falar` while preserving an accessible name of `Falar com a equipe`.

- [ ] Run the targeted browser test and confirm it fails because the old links and hamburger still exist:

```powershell
rtk npx playwright test tests/brand-logo.spec.ts --workers=1
```

- [ ] Simplify `NexusNav` to a single shell with exactly two links:

```tsx
<nav aria-label="Navegação principal" className={styles.shell}>
  <Link href="/" aria-label="Nexus — início" className={styles.brand}>
    <Image src="/images/nexus-logo-white.png" alt="Nexus" width={4945} height={963} priority />
  </Link>
  <Link href="/contato" aria-label="Falar com a equipe" className={styles.cta}>
    <span className={styles.ctaDesktop}>Falar com a equipe</span>
    <span className={styles.ctaMobile}>Falar</span>
    <ArrowUpRight aria-hidden="true" />
  </Link>
</nav>
```

- [ ] Remove menu state, drawer markup, menu button, escape/focus handlers, `Soluções`, and `Processo`. Preserve the approved real logo asset and the existing desktop/mobile bar treatment.

- [ ] Update footer navigation to utility/legal links only: home, contact, privacy, and real email links. Replace any mock logo SVG/text with `/images/nexus-logo-white.png`. Remove placeholder social links.

- [ ] Run targeted browser tests and scoped lint:

```powershell
rtk npx playwright test tests/brand-logo.spec.ts tests/responsive-desktop.spec.ts --workers=1
rtk npx eslint src/components/nexus-nav.tsx src/components/site-footer.tsx
```

- [ ] Review the local diff, paying special attention to the pre-existing logo sizing changes in `nexus-nav.tsx`; keep them intact.

---

## Task 3: Change only blue-section copy, then replace false metrics with custom capabilities

**Files:**

- Create: `src/components/home/custom-capabilities.tsx`
- Create: `src/components/home/custom-capabilities.module.css`
- Modify: `src/components/conversion-home.tsx`
- Modify: `tests/responsive-desktop.spec.ts`
- Modify: `tests/home-content.test.mts`

- [ ] Add browser assertions for the approved blue copy and the new `#aplicacoes` section. Assert all four capabilities are in the DOM at every viewport, including when a different tab is active.

- [ ] Run the targeted tests and confirm they fail because the old metric grid is still rendered.

- [ ] In `ConversionHome`, replace only the blue section's literal strings with `HOME_COPY.value`. Do not change its elements, classes, component props, or order. Confirm the diff for this section is text-only.

- [ ] Build `CustomCapabilities` as a client component with a semantic heading, four real buttons/tabs, and readable panels. Keep all content in the DOM; use `aria-selected`, `aria-controls`, and `hidden` only for duplicated descriptive panels, not for the four capability summaries.

```tsx
type Capability = (typeof HOME_CAPABILITIES)[number];

export function CustomCapabilities() {
  const [activeId, setActiveId] = useState<Capability["id"]>(HOME_CAPABILITIES[0].id);
  const activeIndex = HOME_CAPABILITIES.findIndex((item) => item.id === activeId);

  return (
    <section id="aplicacoes" aria-labelledby="applications-title" className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{HOME_COPY.applications.eyebrow}</p>
        <h2 id="applications-title">{HOME_COPY.applications.title}</h2>
        <p>{HOME_COPY.applications.body}</p>
      </header>
      <div className={styles.workspace} style={{ "--active-index": activeIndex } as CSSProperties}>
        <div className={styles.core} aria-hidden="true">
          {HOME_CAPABILITIES.map((item) => (
            <span key={item.id} className={styles.coreLayer} data-active={item.id === activeId} />
          ))}
        </div>
        <div className={styles.tabs} role="tablist" aria-label="Tipos de solução">
          {HOME_CAPABILITIES.map((item) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={item.id === activeId}
              aria-controls={`capability-${item.id}`}
              onClick={() => setActiveId(item.id)}
            >
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] Create the central visual core entirely with CSS/HTML: connected nodes for integrations, a controlled pulse for automation/agent, chart planes for dashboards, and a compact product window. Morph via opacity/transform keyed by `--active-index`; do not use canvas or a new dependency.

- [ ] Desktop interaction: hover may preview a capability, focus/click selects it, and pointer exit must preserve the last explicit selection. Mobile interaction: touch tabs only, natural vertical flow, no hover dependency. Include visible focus states.

- [ ] Add reduced-motion rules:

```css
@media (prefers-reduced-motion: reduce) {
  .coreLayer,
  .tab,
  .workspace { transition: none !important; animation: none !important; }
}
```

- [ ] Replace the current metric/proof section in `ConversionHome` with `<CustomCapabilities />`; remove `METRICAS`, counter logic, and metric-only icon imports from this page.

- [ ] Run unit tests, targeted Playwright, and scoped lint. Compare the hero/blue screenshots with the Task 1 references at both viewports.

- [ ] Review the local diff. The blue section must show text changes only; all structural/design changes must begin at `#aplicacoes`.

---

## Task 4: Reframe Stock and Copilot as a final pinned demonstration gallery

**Files:**

- Create: `src/components/home/functional-demos.tsx`
- Create: `src/components/home/functional-demos.module.css`
- Modify: `src/components/conversion-home.tsx`
- Modify: `tests/responsive-desktop.spec.ts`
- Modify: `tests/home-content.test.mts`
- Reuse: `src/components/mock-dashboards.tsx`
- Reference: `referencias-animações/secoes/HorizontalCasesGsap.tsx`
- Reference: `referencias-animações/microinteracoes/ProjectHoverPreview.tsx`

- [ ] Add failing browser tests that assert:

  - `#demonstracoes` contains exactly two `Demonstração funcional` labels.
  - Both demo names, context, built solution, human decision, and CTA are visible/accessible.
  - Neither card links to `/solucoes`.
  - On mobile and reduced motion, both cards are stacked and their transforms remain static after scrolling.

- [ ] Create `FunctionalDemos` as a client component. Reuse `StockDashboardMock` and `CopilotDashboardMock`; do not rebuild their UI.

- [ ] Implement desktop horizontal progression with one GSAP match-media scope:

```ts
useLayoutEffect(() => {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: root,
        pin: true,
        scrub: 0.8,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight, distance())}`,
        invalidateOnRefresh: true,
      },
    });
    return () => tween.scrollTrigger?.kill();
  });
  return () => mm.revert();
}, []);
```

- [ ] Apply perspective only to dashboard frames. Use pointer coordinates to set bounded CSS variables for spotlight and at most `±4deg` rotation on fine-pointer desktop. Reset on pointer leave. Never tilt body copy or CTA controls.

- [ ] Use CSS media queries to make mobile/tablet a normal stacked list with `transform: none`. Under reduced motion, disable pinning by not creating ScrollTrigger and disable scrub, parallax, spotlight tracking, and tilt.

- [ ] Replace the old cases/product block in `ConversionHome` with `<FunctionalDemos />` and remove any product/catalog wording or `/solucoes` CTA.

- [ ] Run the focused unit/Playwright tests, scoped lint, and a low-height desktop pass (`1440x700`) to verify the pin never clips headings or buttons.

- [ ] Inspect active ScrollTriggers in the browser. Confirm the home has exactly two long pinned sequences: blue value stage first, demonstrations second.

- [ ] Review the local diff; verify both examples remain clearly demonstrations and no client/result claim was introduced.

---

## Task 5: Build the editorial assurance section without another long pin

**Files:**

- Create: `src/components/home/decision-assurances.tsx`
- Create: `src/components/home/decision-assurances.module.css`
- Modify: `src/components/conversion-home.tsx`
- Modify: `tests/responsive-desktop.spec.ts`
- Reference: `referencias-animações/secoes/StickyStorySection.tsx`

- [ ] Add failing browser assertions for `#como-trabalhamos`, the approved heading, and four assurance controls covering context, integration with what exists, decisions/control, and ownership.

- [ ] Implement a server component using native `<details>` elements so the content remains accessible without JavaScript:

```tsx
<section id="como-trabalhamos" aria-labelledby="assurances-title" className={styles.section}>
  <header className={styles.header}>
    <p className={styles.eyebrow}>{HOME_COPY.assurances.eyebrow}</p>
    <h2 id="assurances-title">{HOME_COPY.assurances.title}</h2>
  </header>
  <div className={styles.document}>
    {HOME_ASSURANCES.map((item, index) => (
      <details key={item.id} className={styles.item} open={index === 0}>
        <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</summary>
        <p>{item.description}</p>
      </details>
    ))}
  </div>
</section>
```

- [ ] Design it as a layered decision document: light contrast, paper-like planes, blue rule lines, restrained depth, and a short natural reveal using CSS entry transitions. Do not add ScrollTrigger or pinning.

- [ ] Ensure click, keyboard, and focus interactions are equivalent. Add `summary:focus-visible` treatment and sufficient contrast.

- [ ] Replace the old trust/process section in `ConversionHome` with `<DecisionAssurances />`.

- [ ] Run targeted Playwright and scoped lint, then review at mobile, tablet, desktop, ultrawide, and low-height desktop.

- [ ] Review the local diff and confirm every promise is a process/ownership principle, not fabricated proof.

---

## Task 6: Replace the closing block with objection handling and one CTA

**Files:**

- Create: `src/components/home/final-conversion.tsx`
- Create: `src/components/home/final-conversion.module.css`
- Modify: `src/components/conversion-home.tsx`
- Modify: `tests/responsive-desktop.spec.ts`
- Modify: `tests/home-content.test.mts`

- [ ] Add failing tests for the final headline, a single primary `/contato` CTA, microcopy, and six FAQ topics. Assert there is no pricing, ROI, delivery-time, or result guarantee in rendered text.

- [ ] Implement `FinalConversion` as a server component with a normal `Link` and native `<details>` FAQ. Keep questions direct and answers specific:

  - fit: custom operational problems, not a fixed product catalog;
  - integrations: start from the tools and data the company already uses;
  - human control: approvals, limits, logs, and escalation are designed with the workflow;
  - ownership: scope must explicitly state code, data, access, and documentation ownership;
  - timing/investment: defined only after understanding context, dependencies, and desired outcome;
  - security/privacy: describe only the real practices currently supported; do not claim certifications or guarantees.

- [ ] Add restrained CTA microinteraction: on fine-pointer desktop, a bounded magnetic translation of at most `4px`; on touch, a short pressure scale; under reduced motion, neither behavior runs.

- [ ] Replace the old CTA/FAQ block in `ConversionHome` with `<FinalConversion />` and delete obsolete home FAQ imports.

- [ ] Run unit tests, targeted Playwright, and scoped lint. Review keyboard navigation from the section heading through every FAQ and the CTA.

- [ ] Review the full `ConversionHome` diff and confirm section order matches `HOME_CHAPTERS`.

---

## Task 7: Simplify the contact route and form

**Files:**

- Create: `src/app/contato/contact-page.tsx`
- Create: `src/app/contato/contact-page.module.css`
- Create: `src/lib/contact-submission.ts`
- Create: `tests/contact-submission.test.mts`
- Modify: `src/app/contato/page.tsx`
- Modify: `src/app/contato/contact-form.tsx`
- Modify: `src/app/contato/actions.ts`
- Modify: `tests/responsive-desktop.spec.ts`
- Delete after replacement: `src/app/contato/contato-cinematic.tsx`
- Delete after replacement: `src/app/contato/contato-cinematic.module.css`

- [ ] Write pure validation tests before changing the server action:

```ts
test("accepts optional company and requires context", () => {
  assert.deepEqual(parseContactSubmission(formData({
    nome: "Rafa",
    email: "rafa@example.com",
    empresa: "",
    mensagem: "Quero conectar o ERP ao fluxo de atendimento.",
  })), {
    ok: true,
    data: {
      nome: "Rafa",
      email: "rafa@example.com",
      empresa: "",
      mensagem: "Quero conectar o ERP ao fluxo de atendimento.",
    },
  });
});
```

- [ ] Add Playwright assertions that the form is visible within the first viewport at `390x844` and `1440x900`, with exactly four user-facing fields: required name, required email, optional company, and required context. Assert cargo and sector controls do not exist.

- [ ] Run targeted unit and browser tests and confirm expected failures.

- [ ] Extract `parseContactSubmission(formData)` into `src/lib/contact-submission.ts`. Return a discriminated union; validate email and context length; do not require company.

- [ ] Update `enviarMensagem` to call the parser and submit only the four supported fields plus honeypot. Remove cargo/sector parsing and Google Form entries. Keep the existing error handling and do not expose the form endpoint in rendered output.

- [ ] Simplify `ContactForm`: remove cargo/sector state, selects, conditional fields, and `AnimatePresence`; retain Framer Motion only for submission feedback/success. Change labels to `Nome`, `Email`, `Empresa (opcional)`, and `Conte o problema e o contexto`.

- [ ] Implement `ContactPage` with no pinned or cinematic prelude:

```tsx
<main className={styles.main}>
  <NexusNav />
  <section className={styles.contact} aria-labelledby="contact-title">
    <header>
      <p>{CONTACT_COPY.eyebrow}</p>
      <h1 id="contact-title">Conte o problema. A gente começa pelo contexto.</h1>
      <p>{CONTACT_COPY.body}</p>
    </header>
    <ContactForm />
  </section>
</main>
```

- [ ] Rewrite contact metadata and JSON-LD around a conversation/context page. Remove the old cinematic image from Open Graph unless an honest, current generic share image exists.

- [ ] After `page.tsx` and the form no longer import them, delete the old cinematic component and stylesheet. Use `rtk rg` to verify no reference remains.

- [ ] Run unit tests, targeted Playwright, and scoped lint. Manually submit invalid data; if a safe test endpoint is not available, mock network submission and verify pending/error/success UI without writing to the real form.

- [ ] Review the local diff and confirm any response-time microcopy is retained only if the team has approved it as operationally true.

---

## Task 8: Consolidate routes and remove dead cinematic-page code

**Files:**

- Modify: `src/app/solucoes/page.tsx`
- Modify: `src/app/processo/page.tsx`
- Delete: `src/app/solucoes/solucoes-cinematic.tsx`
- Delete: `src/app/solucoes/solucoes-cinematic.module.css`
- Delete: `src/app/processo/processo-cinematic.tsx`
- Delete: `src/app/processo/processo-cinematic.module.css`
- Delete: `src/lib/route-cinematics.ts`
- Replace/Delete: `tests/route-cinematics.test.mts`
- Modify: `src/lib/content.ts`
- Create: `tests/route-consolidation.spec.ts`

- [ ] Add failing route tests:

```ts
test("legacy solution route redirects to applications", async ({ page }) => {
  await page.goto("/solucoes");
  await expect(page).toHaveURL(/\/#aplicacoes$/);
  await expect(page.locator("#aplicacoes")).toBeVisible();
});

test("legacy process route redirects to working principles", async ({ page }) => {
  await page.goto("/processo");
  await expect(page).toHaveURL(/\/#como-trabalhamos$/);
  await expect(page.locator("#como-trabalhamos")).toBeVisible();
});
```

- [ ] Run the tests and confirm both routes still render their old pages.

- [ ] Following the installed Next.js 16 redirect documentation, replace each route page with a server redirect:

```tsx
import { permanentRedirect } from "next/navigation";

export default function SolucoesRedirectPage() {
  permanentRedirect("/#aplicacoes");
}
```

Use the equivalent target `/#como-trabalhamos` for `/processo`.

- [ ] Delete the two unused cinematic components/styles, the obsolete route-cinematics helper, and its old behavior test. Keep redirect behavior covered by `route-consolidation.spec.ts`.

- [ ] Remove obsolete `AREAS`, `ETAPAS`, route FAQs, timelines, metrics, pillars, old capabilities, and old home FAQ exports from `src/lib/content.ts` only after `rtk rg` confirms no remaining import. Retain `COMPANY` and the new home/contact exports.

- [ ] Run unit tests, route Playwright tests, and scoped lint. Use `rtk rg` to confirm no live source imports old cinematic files or obsolete exports.

- [ ] Review deletions carefully. Confirm only pages made obsolete by the approved route consolidation were removed.

---

## Task 9: Align metadata, structured data, and sitemap with the new promise

**Files:**

- Modify: `src/app/metadata.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/lib/content.ts`
- Modify: `tests/home-content.test.mts`
- Modify: `tests/route-consolidation.spec.ts`

- [ ] Add failing assertions that the sitemap includes only `/`, `/contato`, and `/privacidade`, and that home metadata uses the custom-solutions positioning rather than a fixed platform/agent catalog.

- [ ] Change the canonical site title/description and `COMPANY.description` to:

```ts
const TITLE = "Nexus · Soluções digitais sob medida";
const DESCRIPTION =
  "Você traz o problema. A Nexus constrói o que ele exige — automações, agentes, integrações, dashboards e produtos digitais sob medida.";
```

- [ ] Keep the Organization and WebSite JSON-LD factual: identity, URL, email, and approved description only. Do not add ratings, clients, awards, offers, or result claims.

- [ ] Remove `/solucoes` and `/processo` from `sitemap.ts`; keep redirects live for old links and search-engine migration.

- [ ] Run unit tests and inspect `/sitemap.xml`, page title, meta description, canonical, Open Graph tags, and JSON-LD in the local browser.

- [ ] Review the local diff for consistency between visible copy, metadata, structured data, and contact copy.

---

## Task 10: Whole-site responsive, motion, accessibility, and honesty verification

**Files:**

- Modify: `tests/responsive-desktop.spec.ts`
- Modify: `tests/brand-logo.spec.ts`
- Modify: `tests/route-consolidation.spec.ts`
- Modify: `tests/helpers/layout-assertions.ts` only if a reusable assertion is needed
- Potential fixes: only files touched in Tasks 1–9

- [ ] Add a rendered-copy scan across `/`, `/contato`, and `/privacidade` for the prohibited term and the exact removed claims. Do not scan server logs or source comments as public copy.

- [ ] Run responsive checks at minimum:

  - mobile: `390x844`;
  - tablet: `768x1024`;
  - desktop: `1440x900`;
  - low-height desktop: `1440x700`;
  - ultrawide: `1920x1080`.

- [ ] At each viewport, assert no horizontal document overflow, no clipped heading/CTA, readable focus order, and reachable footer. On mobile, assert natural vertical flow in demonstrations and the form above the fold.

- [ ] Run a reduced-motion browser project or context. Assert hero/blue content is readable, custom-capability transitions are static, demonstration cards have no pin/tilt/transform drift, and CTA motion is disabled.

- [ ] Inspect animation lifecycle: resize desktop → mobile → desktop, navigate home → contact → home, and ensure no duplicate ScrollTriggers, stale inline transforms, or console errors. Confirm looping decoration pauses outside the viewport where applicable.

- [ ] Run all unit tests:

```powershell
rtk npm run test:unit
```

- [ ] Run all relevant Playwright tests serially to avoid local-server contention:

```powershell
rtk npx playwright test tests/brand-logo.spec.ts tests/responsive-desktop.spec.ts tests/route-consolidation.spec.ts --workers=1
```

- [ ] Run scoped lint for every changed production/test file. Then run the repository lint once and separate pre-existing errors under `referencias-animações/` from regressions in touched files.

```powershell
rtk npx eslint src/app src/components src/lib tests
rtk npm run lint
```

- [ ] Run the production build:

```powershell
rtk npm run build
```

If it still fails only because the untracked `referencias-animações/21st/` examples import unavailable packages, record the exact pre-existing blocker and do not modify or delete those user-owned references. Any error in touched application files must be fixed before completion.

- [ ] Compare final hero/blue screenshots to the Task 1 references. Hero must be unchanged; blue must differ only in text. Capture new full-page desktop/mobile screenshots for the user to review locally.

- [ ] Perform final content self-review:

  - every spec section is implemented;
  - all public copy comes from the intended content source;
  - no placeholders, `TODO`, synthetic metrics, or unsupported proof remain;
  - component props and content types agree;
  - every old route link resolves via redirect;
  - contact fields and validation agree end to end;
  - no new dependency was added.

- [ ] Run `rtk git diff --check` and inspect `rtk git status --short`. Report changed files and verification evidence. Do not commit and do not push.
