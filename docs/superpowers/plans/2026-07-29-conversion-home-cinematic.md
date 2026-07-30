# Conversion-First Cinematic Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan.

**Goal:** Refactor the Nexus AI home into a shorter, high-conversion sales page that preserves its premium cinematic identity without empty or excessively long scroll states.

**Architecture:** Keep `page.tsx` server-rendered and move the full home composition into a server component. Isolate the only scroll-driven behavior in one small client component for the blue value stage. Keep all commercial copy and motion rules in the existing pure `home-narrative.ts` module so they are testable without a browser.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, GSAP/ScrollTrigger, Lucide icons, Node test runner.

## Global Constraints

- Preserve the existing desktop and mobile hero photography.
- Use one `h1`; all core content is visible without JavaScript and never depends on scroll progress to appear.
- Desktop blue-stage pin distance is capped at 1,600px; mobile and reduced-motion modes use normal document flow.
- Keep the home to six commercial acts: hero, value, proof, cases, trust, CTA.
- Reuse truthful existing proof points only; do not invent customer logos, revenue claims, percentages, or testimonials.
- Do not change `/solucoes`, `/processo`, or `/contato`.
- Do not add dependencies.

---

## Task 1: Lock the new narrative and motion contract

**Files:**
- Modify: `tests/home-narrative.test.mts`
- Modify: `src/lib/home-narrative.ts`

1. Change the test expectations to the six approved commercial acts.
2. Add tests for `"cinematic"` desktop mode, static mobile/reduced-motion mode, and the 1,600px/0px blue-stage scroll distance.
3. Run `npm test` and confirm the updated contract fails against the old implementation.
4. Implement the approved chapter model and `getBlueStageScrollDistance`.
5. Run `npm test` and confirm the contract passes.

## Task 2: Build the conversion-first home composition

**Files:**
- Create: `src/components/conversion-home.tsx`
- Create: `src/components/conversion-home.module.css`
- Modify: `src/app/page.tsx`

1. Build the hero with the approved promise, supporting copy, two working CTAs, and proof cue visible in the first viewport.
2. Build the blue value stage with visible-from-frame-one copy, three business outcomes, and a code-native operational flow.
3. Build the compact proof strip from existing `METRICAS`.
4. Build two outcome-led solution cases using the existing stock and marketing product language.
5. Build a compact risk-reversal band using the existing diagnostic, delivery, and ownership commitments.
6. Build the final CTA and compact FAQ.
7. Replace the old home composition in `page.tsx` while preserving the existing JSON-LD.

## Task 3: Add bounded cinematic motion

**Files:**
- Create: `src/components/cinematic-value-stage.tsx`
- Modify: `src/components/conversion-home.module.css`

1. Add a client-only GSAP match-media boundary for desktop and reduced motion.
2. Pin only the blue stage on motion-capable desktop screens for the configured 1,600px.
3. Animate depth, light, and the active process step without using motion to reveal core content.
4. Keep mobile and reduced-motion output fully static and naturally flowing.

## Task 4: Retire the obsolete long-home implementation

**Files:**
- Delete: `src/components/cinematic-home-continuation.tsx`
- Delete: `src/components/cinematic-home-continuation.module.css`
- Delete: `src/components/ui/cinematic-landing-hero.tsx`
- Modify: `tests/route-cinematics.test.mts`

1. Move the hero art-direction assertions to the new home component.
2. Remove assertions that depend on the deleted 7,000px hero implementation.
3. Confirm no imports reference the retired components.

## Task 5: Verify code and responsive behavior

**Files:**
- Modify as needed from browser findings.

1. Run `npm test`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Start the local app and inspect 1440×900 and 390×844 in the selected browser.
5. Verify CTAs, navigation, FAQ, no horizontal overflow, no blank scroll states, and document length targets.
6. Capture final desktop and mobile screenshots.
7. Compare the final screenshots with the approved concept images using `view_image`; fix visible hierarchy, spacing, crop, or contrast defects and repeat.

## Task 6: Complete the design board and final review

**Files:**
- No repository files unless verification finds issues.

1. Upload the accepted final screenshots to the existing FigJam board.
2. Create a clearly labeled “Final implementation” section with desktop and mobile results.
3. Render and inspect the board to confirm all images are visible and correctly placed.
4. Request a code review, address valid findings, rerun all verification, and commit the final implementation.
