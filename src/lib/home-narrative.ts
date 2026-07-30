export const HOME_CHAPTERS = [
  { id: "hero", purpose: "promise" },
  { id: "value", purpose: "business-outcomes" },
  { id: "proof", purpose: "credibility" },
  { id: "cases", purpose: "application" },
  { id: "trust", purpose: "risk-reversal" },
  { id: "cta", purpose: "conversion" },
] as const;

export function getHomeMotionMode({
  reducedMotion,
  desktop,
}: {
  reducedMotion: boolean;
  desktop: boolean;
}) {
  return desktop && !reducedMotion ? "cinematic" : "static";
}

export function getBlueStageScrollDistance({
  desktop,
}: {
  desktop: boolean;
}) {
  return desktop ? 700 : 0;
}
