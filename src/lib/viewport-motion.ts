export type ViewportMotionMode = "mobile" | "static" | "compact" | "cinematic";

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
  height,
}: ViewportMotionConditions): ViewportMotionMode {
  if (reducedMotion) return "static";
  if (width < 768) return "mobile";
  if (height < 640) return "static";
  if (height < 820) return "compact";
  return "cinematic";
}
