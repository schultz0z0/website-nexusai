import assert from "node:assert/strict";
import test from "node:test";

import {
  HOME_CHAPTERS,
  getBlueStageScrollDistance,
  getHomeMotionMode,
} from "../src/lib/home-narrative.ts";

test("keeps the approved home chapter order", () => {
  assert.deepEqual(
    HOME_CHAPTERS.map((chapter) => chapter.id),
    [
      "hero",
      "value",
      "proof",
      "cases",
      "trust",
      "cta",
    ],
  );
});

test("disables scroll choreography when reduced motion is requested", () => {
  assert.equal(
    getHomeMotionMode({ reducedMotion: true, desktop: true }),
    "static",
  );
});

test("uses natural document flow on small screens", () => {
  assert.equal(
    getHomeMotionMode({ reducedMotion: false, desktop: false }),
    "static",
  );
});

test("enables local scroll chapters on motion-capable desktop screens", () => {
  assert.equal(
    getHomeMotionMode({ reducedMotion: false, desktop: true }),
    "cinematic",
  );
});

test("bounds the blue stage scroll distance on desktop", () => {
  assert.equal(getBlueStageScrollDistance({ desktop: true }), 700);
});

test("keeps the blue stage in natural flow on mobile", () => {
  assert.equal(getBlueStageScrollDistance({ desktop: false }), 0);
});
