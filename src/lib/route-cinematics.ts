export const SOLUTIONS_CHAPTERS = [
  { id: "hero", motion: "converge" },
  { id: "market", motion: "field" },
  { id: "intelligence", motion: "field" },
  { id: "infrastructure", motion: "field" },
  { id: "fit", motion: "threshold" },
  { id: "cta", motion: "focus" },
] as const;

export const PROCESS_CHAPTERS = [
  { id: "hero", motion: "corridor" },
  { id: "diagnostic", motion: "checkpoint" },
  { id: "proposal", motion: "checkpoint" },
  { id: "implementation", motion: "checkpoint" },
  { id: "support", motion: "checkpoint" },
  { id: "faq", motion: "static" },
  { id: "cta", motion: "open" },
] as const;

export const CONTACT_CHAPTERS = [
  { id: "hero", motion: "transmit" },
  { id: "briefing", motion: "focus" },
  { id: "response", motion: "signal" },
  { id: "epilogue", motion: "static" },
] as const;

export const SOLUTIONS_SCENE = {
  id: "operational-field",
  steps: ["context", "market", "intelligence", "infrastructure"],
} as const;

export const PROCESS_SCENE = {
  id: "confidence-corridor",
  steps: ["overview", "diagnostic", "proposal", "implementation", "support"],
} as const;

export const CONTACT_SIGNAL_SCENE = {
  id: "human-signal",
  steps: ["outbound", "received"],
} as const;

export const CONTACT_RESPONSE_SCENE = {
  id: "response-track",
  steps: ["confirmation", "call", "diagnostic"],
} as const;

export type SceneWindow = {
  index: number;
  start: number;
  focus: number;
  end: number;
};

export function createSceneWindows(stepCount: number): SceneWindow[] {
  assertValidStepCount(stepCount);
  const span = 1 / stepCount;

  return Array.from({ length: stepCount }, (_, index) => {
    const start = index * span;
    const end = (index + 1) * span;

    return {
      index,
      start,
      focus: start + span / 2,
      end,
    };
  });
}

export function getSceneScrollVh(stepCount: number) {
  assertValidStepCount(stepCount);
  return 96 + stepCount * 68;
}

export function getRouteMotionMode({
  reducedMotion,
  desktop,
}: {
  reducedMotion: boolean;
  desktop: boolean;
}) {
  if (reducedMotion) return "static";
  return desktop ? "scroll" : "mobile";
}

function assertValidStepCount(stepCount: number) {
  if (!Number.isInteger(stepCount)) {
    throw new TypeError("Scene step count must be a whole number.");
  }

  if (stepCount < 2) {
    throw new RangeError("A continuous scene needs at least 2 steps.");
  }
}
