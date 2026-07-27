# Continuous Route Cinematics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform `/solucoes`, `/processo`, and `/contato` from isolated animated sections into route-specific continuous scroll narratives while preserving copy, brand, accessibility, and client-navigation safety.

**Architecture:** Each route gets one or two long CSS-sticky scene tracks. GSAP/ScrollTrigger drives a single scoped timeline per track, changing the state of persistent scene elements instead of revealing disconnected sections. Mobile and reduced-motion render the same content in natural document flow; Framer Motion remains restricted to contact-form microinteractions.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, GSAP 3/ScrollTrigger, Framer Motion 12, Node test runner.

## Global Constraints

- Preserve all existing route copy, content order, KV, typography, Nexus palette, navigation, metadata, and JSON-LD.
- Use CSS sticky for desktop scene continuity; do not use ScrollTrigger pin.
- Scope selectors to each route root and clean up with `gsap.context`, `gsap.matchMedia`, `media.revert()`, and `context.revert()`.
- Animate transforms on elements that do not also own layout-centering transforms.
- Use Framer Motion only inside the contact form and never on an element animated by GSAP.
- Mobile below 768px and `prefers-reduced-motion: reduce` use natural flow with no sticky scene.
- Do not commit or push.

---

### Task 1: Continuous-scene contracts

**Files:**
- Modify: `src/lib/route-cinematics.ts`
- Modify: `tests/route-cinematics.test.mts`

**Interfaces:**
- Produces: `createSceneWindows(stepCount: number)`, `getSceneScrollVh(stepCount: number)`, and route scene blueprints consumed by the three client components.

- [ ] Add failing tests proving scene windows are contiguous, cover progress `0..1`, reject invalid step counts, and keep mobile/reduced-motion static.
- [ ] Run `npm test` and confirm failures come from the missing continuous-scene APIs.
- [ ] Implement the minimal pure helpers and scene blueprints.
- [ ] Run `npm test` and confirm the suite passes.

### Task 2: Solutions — one operational field

**Files:**
- Modify: `src/app/solucoes/solucoes-cinematic.tsx`
- Modify: `src/app/solucoes/solucoes-cinematic.module.css`
- Modify: `src/components/route-cinematic-shell.module.css`

**Interfaces:**
- Consumes: `SOLUTIONS_SCENE` and shared scene scroll helpers.
- Produces: one persistent field stage with four states: context overview, market layer, intelligence layer, infrastructure layer.

- [ ] Replace the hero plus three separate `128svh` sticky chapters with one scene track and one sticky stage.
- [ ] Keep all six capability cards in the DOM and content order, but stack layer pairs and transition between them inside the same stage.
- [ ] Drive title pullback, orbit convergence, layer crossfades, core relabeling, connector growth, and final field collapse from one GSAP timeline.
- [ ] Keep fit threshold and CTA as compact release chapters with no empty transition band.
- [ ] Add mobile/reduced-motion flow that shows overview then all three pairs without absolute stacking.

### Task 3: Process — corridor of confidence

**Files:**
- Modify: `src/app/processo/processo-cinematic.tsx`
- Modify: `src/app/processo/processo-cinematic.module.css`

**Interfaces:**
- Consumes: `PROCESS_SCENE`.
- Produces: one persistent corridor stage with intro plus four checkpoint states.

- [ ] Reproduce and eliminate transform ownership conflicts: corridor floor/gates keep their layout transforms while GSAP animates dedicated inner wrappers or CSS custom properties.
- [ ] Replace four independent `128svh` checkpoint sections with four stacked portal panels inside one scene.
- [ ] Make the rail fill continuously while each checkpoint advances from depth to focus, holds for reading, and exits as the next portal takes over.
- [ ] End with the corridor opening into the FAQ, preserving the accepted checkpoint card content and FAQ behavior.
- [ ] Add a compact natural-flow mobile/reduced-motion version with all four checkpoints readable.

### Task 4: Contact — guided human signal

**Files:**
- Modify: `src/app/contato/contato-cinematic.tsx`
- Modify: `src/app/contato/contato-cinematic.module.css`
- Preserve: `src/app/contato/contact-form.tsx`

**Interfaces:**
- Consumes: `CONTACT_SIGNAL_SCENE` and `CONTACT_RESPONSE_SCENE`.
- Produces: a short signal-transmission scene, static low-friction form, and compact response-progression scene.

- [ ] Turn the hero into a short sticky transmission sequence whose signal reaches the human receiver and releases directly into the form heading.
- [ ] Keep the form in normal flow and fully interactive; use only its existing Framer Motion microstates.
- [ ] Convert the response track into one compact sticky scene where a single signal advances through three expected-return states.
- [ ] Remove excessive `150svh`/`108svh` spacing and preserve the direct-email epilogue.
- [ ] Keep mobile/reduced-motion fully linear.

### Task 5: Verification

**Files:**
- Test: `tests/route-cinematics.test.mts`
- Inspect: all modified route files

- [ ] Run `npm test`, `npx tsc --noEmit`, targeted ESLint, `npm run build`, and `git diff --check`.
- [ ] Verify desktop at 1440×900 and mobile at 390×844 in the Browser.
- [ ] Inspect at least start, midpoint, and end of each continuous scene; confirm no blank viewport bands.
- [ ] Check page identity, semantic headings, no framework overlay, no console errors/warnings, and no horizontal overflow.
- [ ] Exercise FAQ, contact-form fields, and client navigation home → each route → home.
- [ ] Confirm the home hero returns fully visible after every navigation cycle and no stale GSAP styles remain.
