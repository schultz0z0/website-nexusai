# Nexus AI Conversion Home — Design Specification

## Objective

Refactor the Nexus AI home into a high-conversion commercial landing page while preserving its premium cinematic identity. The home must sell the business impact quickly; `/solucoes`, `/processo`, and `/contato` remain the places for detail.

## Primary user

The primary reader is a founder, operations leader, commercial leader, or executive who feels operational friction but may not yet know which workflow should be automated.

## Conversion promise

The page must communicate four ideas in this order:

1. Nexus AI gives the team more productive capacity.
2. The gain comes from removing repetitive operational work.
3. Nexus has real delivery proof and a low-risk diagnostic process.
4. The next action is to map the highest-value bottleneck.

## Approved narrative

### Act 1 — Commercial hero

- Brand line: `Sua equipe multiplicada por IA`
- Headline: `Menos horas operacionais. Mais resultado por pessoa.`
- Supporting copy: `A Nexus AI encontra gargalos e entrega automações sob medida que reduzem retrabalho, aceleram decisões e liberam sua equipe para crescer.`
- Primary CTA: `Mapear meu gargalo` → `/contato`
- Secondary CTA: `Ver soluções` → `/solucoes`
- Above-the-fold proof: `12+ plataformas em produção · 8 setores · primeiros ganhos em 4–8 semanas`

The current cinematic photography, dark palette, navigation, typography, grain, and depth remain. The offer, support copy, proof, and CTA must be visible without scrolling.

### Act 2 — Cinematic blue value stage

- Heading: `Seu gargalo vira capacidade.`
- Body: `Mapeamos o trabalho repetitivo, automatizamos o fluxo e acompanhamos o resultado. Sua equipe recupera tempo sem trocar toda a operação.`
- Three business outcomes:
  - `Tempo recuperado`
  - `Menos retrabalho`
  - `Mais capacidade para crescer`

The blue stage remains the signature cinematic moment. Its content is present from the first visible frame. Scroll may change scale, perspective, emphasis, and spatial arrangement, but must never be required for content to appear.

Desktop behavior:

- Maximum pinned scroll range: `1600px`.
- The content is visible at the beginning of the pin.
- The stage transitions from framed to immersive and back into the document flow.

Mobile behavior:

- No pinned scroll.
- Normal document flow.
- Subtle entry and parallax may run, but no core text or action starts hidden.

### Act 3 — Proof

Show the existing truthful proof immediately after the blue stage:

- `12+` platforms operating in real client environments.
- `8` sectors served.
- `4–8 weeks` until initial operational gains.
- `100%` ongoing support.

This section is evidence, not decoration. It must be readable in a single viewport on desktop and no more than two compact rows on mobile.

### Act 4 — Business use cases

Keep two product examples, presented as compact outcome-led stories:

1. `Estoque sem achismo`
   - Demand forecasting.
   - Stockout alerts.
   - Capital visibility.
   - Link to `/solucoes`.

2. `Marketing sem fila`
   - Research, copy, creative, and competitive analysis.
   - Briefings ready for approval.
   - Link to `/solucoes`.

The existing Nexus Stock and Nexus Copilot dashboards remain as visual evidence. Long product explanations move to `/solucoes`.

### Act 5 — Risk reduction

Compress the current principles and stack into four commercial reassurances:

- `Diagnóstico antes da proposta`
- `ROI estimado no escopo`
- `Primeira entrega em 2–3 semanas`
- `Código, dados e documentação são seus`

Detailed methodology and technology stack belong on `/processo`.

### Act 6 — Final conversion

- Heading: `Descubra onde sua operação perde tempo e margem.`
- Body: `Em uma conversa inicial, mapeamos o gargalo, estimamos o impacto e mostramos o melhor ponto de partida.`
- CTA: `Mapear meu gargalo` → `/contato`
- Reuse the three most relevant FAQ items, rewritten around cost, timing, technical dependency, and expected return.

## Information architecture changes

Remove or merge:

- The empty blue transition frames.
- The repeated Stock and Copilot capability cards.
- The standalone technology stack section.
- The four long-form principle cards.
- The duplicate hero and final offer language.
- App Store and Google Play visual metaphors on B2B CTAs.

Keep:

- Premium dark visual system.
- Cinematic photography and blue stage.
- Nexus Stock and Nexus Copilot product evidence.
- Operational metrics.
- Final FAQ and footer.

## Responsive targets

Desktop:

- Offer, proof cue, and CTA visible at `1440×900` without scrolling.
- First full proof section visible by `1.5` viewport heights.
- Total page target: `5–7` viewport heights.

Mobile:

- Offer and CTA visible within the first `844px`, with the proof cue immediately below.
- No scroll pin.
- Total page target: `7–9` viewport heights at `390×844`.

## Motion and accessibility

- No commercial content may depend on `opacity: 0`, `visibility: hidden`, or scroll progress to become available.
- `prefers-reduced-motion: reduce` renders a complete static experience.
- Only one `h1`.
- Keyboard focus remains visible.
- Motion must not trap or delay normal scrolling on mobile.
- Headings, controls, and landmarks keep a coherent reading order.

## Technical boundaries

- Next.js `16.2.11`, React `19.2.4`, GSAP `3.15.0`.
- Reuse the existing navigation, footer, content primitives, dashboards, tokens, and local cinematic assets.
- Do not add a new runtime dependency.
- Centralize home copy and structural data outside presentation components.
- Keep `/solucoes`, `/processo`, and `/contato` unchanged.

## Success criteria

- The value proposition and primary CTA are available without scrolling.
- The blue stage has meaningful content in its first visible frame.
- Desktop blue-stage pin is no longer than `1600px`.
- Mobile has no pinned hero or blue-stage sequence.
- The page has six commercial acts or fewer.
- Existing proof is preserved without inventing revenue or ROI claims.
- Home-specific automated tests, lint, and production build pass.
- Desktop and mobile browser screenshots pass visual review with no blank, cropped, or unreadable states.

## Validation sizes

- Desktop: `1440×900`.
- Mobile: `390×844`.
- Reduced motion: static content and normal flow.

