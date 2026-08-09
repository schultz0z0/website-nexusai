import {
  getViewportMotionModeForSize,
  type ViewportMotionConditions,
} from "./viewport-motion.ts";

export const HOME_CHAPTERS = [
  { id: "hero", purpose: "promise" },
  { id: "value", purpose: "business-outcomes" },
  { id: "proof", purpose: "credibility" },
  { id: "cases", purpose: "application" },
  { id: "trust", purpose: "risk-reversal" },
  { id: "cta", purpose: "conversion" },
] as const;

export function getHomeMotionMode(
  conditions: ViewportMotionConditions | LegacyMotionConditions,
) {
  const mode = getViewportMotionModeForSize(toViewportMotionConditions(conditions));

  return mode === "mobile" ? "static" : mode;
}

export function getBlueStageScrollDistance(
  conditions: ViewportMotionConditions | LegacyBlueStageConditions,
) {
  const mode = getViewportMotionModeForSize(toViewportMotionConditions(conditions));

  if (mode === "cinematic") return 700;
  return 0;
}

type LegacyMotionConditions = {
  reducedMotion: boolean;
  desktop: boolean;
};

type LegacyBlueStageConditions = {
  desktop: boolean;
};

function toViewportMotionConditions(
  conditions:
    | ViewportMotionConditions
    | LegacyMotionConditions
    | LegacyBlueStageConditions,
): ViewportMotionConditions {
  if ("width" in conditions) return conditions;

  return {
    reducedMotion:
      "reducedMotion" in conditions ? conditions.reducedMotion : false,
    width: conditions.desktop ? 768 : 767,
    height: 820,
  };
}
