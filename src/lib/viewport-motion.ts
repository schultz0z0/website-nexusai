export type ViewportMotionMode = "mobile" | "static" | "cinematic";
export type ViewportTextScale = "default" | "large" | "xlarge";

export type ViewportMotionConditions = {
  reducedMotion: boolean;
  width: number;
  height: number;
};

export function getViewportMotionMode(): ViewportMotionMode {
  if (typeof window === "undefined") return "static";

  return getViewportMotionModeForSize({
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    width: window.innerWidth,
    height: window.innerHeight,
  });
}

export function getViewportMotionModeForSize({
  reducedMotion,
  width,
}: ViewportMotionConditions): ViewportMotionMode {
  if (reducedMotion) return "static";
  if (width < 768) return "mobile";
  return "cinematic";
}

export function getViewportTextScale(rootFontSize: number): ViewportTextScale {
  if (rootFontSize >= 28) return "xlarge";
  if (rootFontSize >= 22) return "large";
  return "default";
}
