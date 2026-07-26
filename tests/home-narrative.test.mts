import assert from "node:assert/strict";
import test from "node:test";

import {
  HOME_CHAPTERS,
  getHomeMotionMode,
} from "../src/lib/home-narrative.ts";

test("keeps the approved home chapter order", () => {
  assert.deepEqual(
    HOME_CHAPTERS.map((chapter) => chapter.id),
    [
      "metrics",
      "principles",
      "stock",
      "copilot",
      "capabilities",
      "stack",
      "cta",
      "faq",
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
    "scroll",
  );
});
