import assert from "node:assert/strict";
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

test("uses natural document flow on small screens", () => {
  assert.equal(
    getRouteMotionMode({ reducedMotion: false, desktop: false }),
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
