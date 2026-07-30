import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  CONTACT_RESPONSE_SCENE,
  CONTACT_SIGNAL_SCENE,
  CONTACT_CHAPTERS,
  PROCESS_SCENE,
  PROCESS_CHAPTERS,
  SOLUTIONS_SCENE,
  SOLUTIONS_CHAPTERS,
  createSceneWindows,
  getSceneScrollVh,
  getRouteMotionMode,
} from "../src/lib/route-cinematics.ts";

const solutionsCss = readFileSync(
  new URL(
    "../src/app/solucoes/solucoes-cinematic.module.css",
    import.meta.url,
  ),
  "utf8",
);
const processCss = readFileSync(
  new URL(
    "../src/app/processo/processo-cinematic.module.css",
    import.meta.url,
  ),
  "utf8",
);
const contactCss = readFileSync(
  new URL(
    "../src/app/contato/contato-cinematic.module.css",
    import.meta.url,
  ),
  "utf8",
);
const solutionsSource = readFileSync(
  new URL("../src/app/solucoes/solucoes-cinematic.tsx", import.meta.url),
  "utf8",
);
const processSource = readFileSync(
  new URL("../src/app/processo/processo-cinematic.tsx", import.meta.url),
  "utf8",
);
const contactSource = readFileSync(
  new URL("../src/app/contato/contato-cinematic.tsx", import.meta.url),
  "utf8",
);
const homeHeroSource = readFileSync(
  new URL("../src/components/conversion-home.tsx", import.meta.url),
  "utf8",
);
const routeCinematicSources = [
  solutionsSource,
  processSource,
  contactSource,
];

test("keeps the approved Solutions chapter order", () => {
  assert.deepEqual(
    SOLUTIONS_CHAPTERS.map((chapter) => chapter.id),
    ["hero", "market", "intelligence", "infrastructure", "fit", "cta"],
  );
});

test("keeps the approved Process chapter order", () => {
  assert.deepEqual(
    PROCESS_CHAPTERS.map((chapter) => chapter.id),
    [
      "hero",
      "diagnostic",
      "proposal",
      "implementation",
      "support",
      "faq",
      "cta",
    ],
  );
});

test("keeps the approved Contact chapter order", () => {
  assert.deepEqual(
    CONTACT_CHAPTERS.map((chapter) => chapter.id),
    ["hero", "briefing", "response", "epilogue"],
  );
});

test("disables route scroll choreography when reduced motion is requested", () => {
  assert.equal(
    getRouteMotionMode({ reducedMotion: true, desktop: true }),
    "static",
  );
});

test("uses dedicated scroll choreography on motion-capable small screens", () => {
  assert.equal(
    getRouteMotionMode({ reducedMotion: false, desktop: false }),
    "mobile",
  );
});

test("registers a mobile matchMedia condition on every route cinematic", () => {
  routeCinematicSources.forEach((source) => {
    assert.match(source, /mobile:\s*"\(max-width:\s*767px\)"/);
  });
});

test("keeps overlapping mobile cinematic panels hidden before GSAP hydrates", () => {
  assert.match(
    solutionsCss,
    /\.mobilePanel\s*\{[\s\S]*?visibility:\s*hidden;[^}]*opacity:\s*0;/,
  );
  assert.match(
    processCss,
    /\.mobileProcessPanel\s*\{[\s\S]*?visibility:\s*hidden;[^}]*opacity:\s*0;/,
  );
  assert.match(
    contactCss,
    /\.mobileResponsePanel\s*\{[\s\S]*?visibility:\s*hidden;[^}]*opacity:\s*0;/,
  );
  assert.match(
    contactCss,
    /\.mobileResponsePanel:first-child\s*\{[\s\S]*?visibility:\s*visible;[^}]*opacity:\s*1;/,
  );
});

test("keeps the Solutions desktop title paint box deep enough for the cedilla", () => {
  assert.match(
    solutionsCss,
    /\.heroHeading h1\s*\{[\s\S]*?padding-bottom:\s*0\.16em;[\s\S]*?margin-bottom:\s*-0\.16em;/,
  );
});

test("keeps the long implementation title inside its desktop process column", () => {
  assert.match(processSource, /data-process-stage=\{stage\.n\}/);
  assert.match(
    processCss,
    /\[data-process-stage="03"\]\s+\.panelCopy h2\s*\{[\s\S]*?font-size:\s*clamp\(3\.3rem,\s*5\.2vw,\s*5\.6rem\);/,
  );
});

test("stacks the desktop process FAQ heading and support copy in two title lines", () => {
  assert.match(
    processSource,
    /<span className=\{styles\.faqTitleLine\}>Decida sem<\/span>/,
  );
  assert.match(
    processSource,
    /<span className=\{styles\.faqTitleLine\}>ponto cego\.<\/span>/,
  );
  assert.match(
    processCss,
    /@media \(min-width:\s*768px\)\s*\{[\s\S]*?\.faqHeader\s*\{[\s\S]*?grid-template-columns:\s*1fr;/,
  );
});

test("keeps the desktop contact briefing title inside its paint box", () => {
  assert.match(
    contactCss,
    /@media \(min-width:\s*768px\)\s*\{[\s\S]*?\.briefingCopy h2\s*\{[\s\S]*?font-size:\s*clamp\(3\.2rem,\s*4\.35vw,\s*5rem\);/,
  );
});

test("uses separate art-directed home hero images for desktop and mobile", () => {
  assert.match(homeHeroSource, /data-home-hero-media/);
  assert.match(
    homeHeroSource,
    /<source[\s\S]*?media="\(max-width: 767px\)"[\s\S]*?home-hero-mobile\.webp/,
  );
  assert.match(homeHeroSource, /home-hero-desktop\.webp/);
});

test("keeps the home hero inside the document width", () => {
  assert.doesNotMatch(homeHeroSource, /\bw-screen\b/);
});

test("uses natural document flow on small screens when motion is reduced", () => {
  assert.equal(
    getRouteMotionMode({ reducedMotion: true, desktop: false }),
    "static",
  );
});

test("enables local scroll chapters on motion-capable desktop screens", () => {
  assert.equal(
    getRouteMotionMode({ reducedMotion: false, desktop: true }),
    "scroll",
  );
});

test("builds contiguous scene windows with no dead progress range", () => {
  assert.deepEqual(createSceneWindows(4), [
    { index: 0, start: 0, focus: 0.125, end: 0.25 },
    { index: 1, start: 0.25, focus: 0.375, end: 0.5 },
    { index: 2, start: 0.5, focus: 0.625, end: 0.75 },
    { index: 3, start: 0.75, focus: 0.875, end: 1 },
  ]);
});

test("rejects scene tracks that cannot form a progression", () => {
  assert.throws(() => createSceneWindows(1), /at least 2 steps/i);
  assert.throws(() => createSceneWindows(2.5), /whole number/i);
});

test("keeps cinematic scene tracks dense enough to avoid empty viewports", () => {
  assert.equal(getSceneScrollVh(4), 368);
  assert.equal(getSceneScrollVh(5), 436);
  assert.equal(getSceneScrollVh(3), 300);
});

test("maps each route to a continuous metaphor-specific scene", () => {
  assert.deepEqual(SOLUTIONS_SCENE.steps, [
    "context",
    "market",
    "intelligence",
    "infrastructure",
  ]);
  assert.deepEqual(PROCESS_SCENE.steps, [
    "overview",
    "diagnostic",
    "proposal",
    "implementation",
    "support",
  ]);
  assert.deepEqual(CONTACT_SIGNAL_SCENE.steps, ["outbound", "received"]);
  assert.deepEqual(CONTACT_RESPONSE_SCENE.steps, [
    "confirmation",
    "call",
    "diagnostic",
  ]);
});
