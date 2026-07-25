"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Container that rotates in 3D as the user scrolls into view.
 * Pattern: aceternity-style "Container Scroll Animation" — credits via reference only.
 *
 * ponytail: rotates only on scroll, not on mouse. GPU-only (transform/opacity).
 */

interface ProductShowcaseProps {
  /** Small label above the heading */
  eyebrow: string;
  /** Big heading */
  title: string;
  /** Short subtitle below heading */
  subtitle: string;
  /** Mock dashboard rendered inside the rotating container */
  mock: ReactNode;
  /** Tag (e.g. "01 / 02") — visual variety */
  badge?: string;
}

export function ProductShowcase({
  eyebrow,
  title,
  subtitle,
  mock,
  badge,
}: ProductShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Rotate from 12deg (when offscreen below) to 0deg (when centered) back to -8deg (when offscreen above).
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -8]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 px-4 sm:px-6 py-24 md:py-32"
    >
      <motion.div
        style={{ opacity }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          {badge && (
            <span className="inline-block text-xs font-mono text-foreground/45 mb-3 tracking-wider">
              {badge}
            </span>
          )}
          <span className="block text-xs md:text-sm font-semibold text-foreground/55 uppercase tracking-[0.2em] mb-3">
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.05] mb-4">
            {title}
          </h2>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <motion.div
          style={{
            rotateX,
            y: translateY,
            transformPerspective: 1400,
            transformOrigin: "center top",
          }}
          className="rounded-2xl bg-gradient-to-b from-card/70 to-card/30 backdrop-blur-xl ring-1 ring-border/50 shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {mock}
        </motion.div>
      </motion.div>
    </section>
  );
}
