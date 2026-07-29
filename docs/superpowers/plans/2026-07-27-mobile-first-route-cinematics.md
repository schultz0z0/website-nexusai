# Mobile-first Route Cinematics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Humanize the Solutions, Process, and Contact heroes, remove copy redundancy, and give every route a dedicated cinematic mobile narrative while preserving the existing desktop scenes.

**Architecture:** Existing desktop scene markup and timelines remain the desktop path. Each route receives mobile-only scene markup and a GSAP timeline selected through a three-state route motion contract (`scroll`, `mobile`, `static`). Local horizontal and portrait WebP assets provide art-directed imagery without external runtime dependencies.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, GSAP 3/ScrollTrigger, Framer Motion 12, Node test runner.

## Global Constraints

- Do not commit or push.
- Preserve the user's current uncommitted removals in the route cinematics.
- Keep desktop scene structure and choreography intact except for image underlays and revised copy.
- Mobile below 768px must use dedicated markup and motion; it is not a collapsed desktop layout.
- `prefers-reduced-motion: reduce` must render readable natural flow.
- Keep route page files as Server Components and interactive cinematics as focused Client Components.
- Keep all user-facing form controls code-native and accessible.

---

### Task 1: Three-state motion contract

**Files:**
- Modify: `tests/route-cinematics.test.mts`
- Modify: `src/lib/route-cinematics.ts`

**Interfaces:**
- Produces: `getRouteMotionMode({ reducedMotion, desktop }): "scroll" | "mobile" | "static"`.
- Produces: mobile scene definitions used to size route tracks.

- [ ] Change the small-screen test to expect `mobile` when motion is allowed and add a reduced-motion mobile assertion expecting `static`.
- [ ] Run `npm test` and confirm the old two-state implementation fails the new mobile expectation.
- [ ] Implement the three-state return contract and mobile scene definitions.
- [ ] Run `npm test` and confirm all route cinematic tests pass.

### Task 2: Human hero assets and shared scene treatment

**Files:**
- Create: `public/images/cinematic/solutions-hero-desktop.webp`
- Create: `public/images/cinematic/solutions-hero-mobile.webp`
- Create: `public/images/cinematic/process-hero-desktop.webp`
- Create: `public/images/cinematic/process-hero-mobile.webp`
- Create: `public/images/cinematic/contact-hero-desktop.webp`
- Create: `public/images/cinematic/contact-hero-mobile.webp`
- Modify: `src/components/route-cinematic-shell.module.css`

**Interfaces:**
- Produces: shared media-layer primitives with stable object-fit, edge fades, and no text-obscuring tint.

- [ ] Validate each generated image for subject, negative space, natural anatomy, and brand fit.
- [ ] Convert the selected images to WebP and keep the total asset payload below 600 KB.
- [ ] Add shared scene-media styles, responsive visibility helpers, and accessible reduced-motion behavior.

### Task 3: Solutions mobile operational journey

**Files:**
- Modify: `src/app/solucoes/solucoes-cinematic.tsx`
- Modify: `src/app/solucoes/solucoes-cinematic.module.css`

**Interfaces:**
- Consumes: `AREAS`, desktop scene constants, and the `mobile` motion mode.
- Produces: a seven-beat mobile track with one hero state and one state per capability.

- [ ] Add mobile-only semantic scene markup while leaving the existing desktop scene intact.
- [ ] Add a mobile GSAP timeline that crossfades capability panels, advances the rail, and creates image parallax.
- [ ] Rewrite hero, scene-intro, fit, and CTA copy so the page leads with operational outcomes instead of the visual metaphor.
- [ ] Add mobile-only CSS for a full-height sticky frame, compact readable cards, progress, and natural-flow reduced motion.
- [ ] Add scroll reveals to fit and CTA without animating elements under reduced motion.

### Task 4: Process mobile confidence sequence

**Files:**
- Modify: `src/app/processo/processo-cinematic.tsx`
- Modify: `src/app/processo/processo-cinematic.module.css`

**Interfaces:**
- Consumes: `ETAPAS` and the `mobile` motion mode.
- Produces: a five-beat mobile track with one hero state and four checkpoint states.

- [ ] Add mobile-only scene markup with portrait image, portal lines, checkpoint panels, and a vertical progress rail.
- [ ] Add a mobile GSAP timeline that moves from the human workshop into each verified checkpoint.
- [ ] Rewrite hero, FAQ introduction, and CTA copy around predictability and risk reduction.
- [ ] Add compact responsive styles that keep all deliverables readable at 390×844 and 360×740.
- [ ] Animate FAQ rows and CTA only when motion is allowed.

### Task 5: Contact mobile conversion sequence

**Files:**
- Modify: `src/app/contato/contato-cinematic.tsx`
- Modify: `src/app/contato/contato-cinematic.module.css`
- Modify: `src/app/contato/contact-form.tsx`

**Interfaces:**
- Consumes: `TIMELINE_CONTATO` and the `mobile` motion mode.
- Produces: a two-state mobile hero, anchored briefing, and three-state mobile response track.

- [ ] Add mobile-only hero and response markup while retaining existing desktop scenes.
- [ ] Add mobile timelines for image parallax, signal arrival, and response-step progression.
- [ ] Replace repeated “human/sem bot/sinal” copy with one clear promise, contextual form guidance, and precise next steps.
- [ ] Add `id="briefing"` and a first-viewport CTA that scrolls to the form.
- [ ] Keep form controls, error state, pending state, success state, and direct email fully functional.

### Task 6: Verification and visual sign-off

**Files:**
- Inspect: all files above
- Test: `tests/route-cinematics.test.mts`

**Interfaces:**
- Produces: verified desktop and mobile routes with no new lint/build/runtime regression.

- [ ] Run `npm test`, `npx tsc --noEmit`, targeted ESLint for changed source, `npm run build`, and `git diff --check`.
- [ ] Verify `/solucoes`, `/processo`, and `/contato` at 1440×900 and 390×844 in the Browser.
- [ ] Check page identity, non-blank content, framework overlay, console health, horizontal overflow, and at least one interaction per route.
- [ ] Capture desktop and mobile screenshots, then inspect the hero assets and rendered captures with `view_image`.
- [ ] Write a fidelity ledger covering copy, hierarchy, palette, image treatment, motion, responsive layout, and accessibility.
- [ ] Fix every material mismatch before handoff.
