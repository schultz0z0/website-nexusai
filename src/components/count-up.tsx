"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Animated counter that springs to its target when scrolled into view.
 * ponytail: prefers-reduced-motion handled by Framer's useInView (no scroll trigger).
 */

interface CountUpProps {
  /** Target value to count to */
  to: number;
  /** Duration of the count-up animation in seconds */
  duration?: number;
  /** Suffix appended after the number (e.g., "+", "%") */
  suffix?: string;
  /** Prefix prepended before the number (e.g., "$") */
  prefix?: string;
  /** Number of decimal places */
  decimals?: number;
  className?: string;
}

export function CountUp({
  to,
  duration = 1.6,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted = display.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
