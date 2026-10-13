"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ServiceMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const animations = new Set<Animation>();

    function stop() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }

    function start() {
      stop();
      if (preference.matches || !root || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const photo = entry.target.querySelector("[data-service-photo]");
          if (photo) {
            const animation = photo.animate([{ transform: "scale(1.045)" }, { transform: "scale(1)" }], { duration: 1400, easing: "cubic-bezier(.2,.7,.3,1)" });
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          }
          observer?.unobserve(entry.target);
        }
      }, { threshold: .18 });
      root.querySelectorAll("[data-service-artwork]").forEach((artwork) => observer?.observe(artwork));
    }

    start();
    preference.addEventListener("change", start);
    return () => { stop(); preference.removeEventListener("change", start); };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
