# SEO, LGPD and Tracking Implementation Plan

> **For agentic workers:** Execute this plan inline in the current workspace. The user explicitly requested local-only work; do not commit or push.

**Goal:** Implement the requested technical SEO, consent, privacy and measurement foundations for the Nexus site without changing its visual identity or inventing institutional data.

**Architecture:** Keep the Next.js App Router and native metadata/file conventions. Add a small first-party consent state machine and event layer; load optional analytics/marketing scripts only after the corresponding choice. Keep policies and setup instructions as explicit pages/docs, with IDs and legal identity supplied through environment variables.

**Tech Stack:** Next.js 16.2.11, React 19, TypeScript, Tailwind/CSS Modules, native metadata routes, browser localStorage for consent, optional browser scripts loaded by React effects.

**Spec:** `docs/prompt_codex_seo_lgpd_nexus.md`

## Global Constraints

- Preserve the current design, copy, animations, and routes unless a technical requirement requires a change.
- Never invent CNPJ, legal name, address, DPO, social profiles, tracking IDs, verification tokens, testimonials, cases, results, or cookies.
- Optional analytics/marketing remain disabled until explicit consent.
- Never send form PII or free-text context to analytics, GTM, or Meta Pixel.
- Canonical base is `https://solucoes-nexus.tech`.
- Work locally only; no commit or push.

### Task 1: SEO foundation and route metadata

**Files:** `src/lib/content.ts`, `src/lib/site-metadata.ts`, `src/app/layout.tsx`, each public route metadata export, `.env.example`.

- Use the official domain constant and environment-gated Search Console/Bing verification tags.
- Add shared absolute OG/Twitter image metadata using the existing logo/brand assets.
- Add unique title, description, canonical, robots and social metadata for home, contact, privacy and cookies; keep legacy solution/process redirects non-indexable.

### Task 2: Crawlable resources and 404

**Files:** `src/app/not-found.tsx`, `src/app/cookies/page.tsx`, `src/app/llms.txt/route.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `public/og-image.svg` (or equivalent existing asset).

- Add a branded accessible 404 with `noindex, follow` and a home CTA.
- Add a truthful cookies policy route and include it in the sitemap.
- Serve conservative `llms.txt`, official-domain robots and canonical-only sitemap entries.

### Task 3: Consent manager and optional tracking

**Files:** `src/lib/consent.ts`, `src/lib/tracking.ts`, client consent UI component/styles, `src/app/layout.tsx`, footer.

- Persist version, categories and timestamp first-party.
- Provide accept-all, reject-nonessential, manage, reopen and revoke flows with keyboard/focus support.
- Gate GA4/GTM/Meta scripts by category and keep absent IDs inert.

### Task 4: Form/CTA instrumentation and policy accuracy

**Files:** `src/app/contato/contact-form.tsx`, `src/components/nexus-nav.tsx`, CTA components, `src/app/contato/actions.ts`, `src/app/privacidade/page.tsx`, `src/components/site-footer.tsx`.

- Add non-PII `cta_click`, one-time `form_start`, technical `form_submit`, and success-only `lead_captured` events.
- Remove honeypot logging of submitted values.
- Update privacy wording to reflect actual Google Forms processing and conditional future analytics/marketing; remove any placeholder legal identity.
- Link cookie preferences and policy from the footer.

### Task 5: Verification and documentation

**Files:** `SEO_LGPD_IMPLEMENTATION_REPORT.md`, `SEARCH_ENGINE_SETUP.md`, relevant unit/E2E tests.

- Test metadata/resources, consent states, revocation, no pre-consent tracker loading, form behavior, routes, responsive sizes and build output.
- Run lint, typecheck, unit/E2E tests, production build, Lighthouse where available; document external actions and physical-device QA.
