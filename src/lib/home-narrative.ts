export const HOME_CHAPTERS = [
  { id: "metrics", motion: "reveal" },
  { id: "principles", motion: "layers" },
  { id: "stock", motion: "product" },
  { id: "copilot", motion: "product" },
  { id: "capabilities", motion: "map" },
  { id: "stack", motion: "breathe" },
  { id: "cta", motion: "horizon" },
  { id: "faq", motion: "static" },
] as const;

export function getHomeMotionMode({
  reducedMotion,
  desktop,
}: {
  reducedMotion: boolean;
  desktop: boolean;
}) {
  return desktop && !reducedMotion ? "scroll" : "static";
}
