"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps children with a fade-up stagger when scrolled into view.
 * Lazy: ponytail: scope kept minimal — single variant family, no presets.
 * Add presets when a 3rd consumer wants a different entrance shape.
 */

interface AnimatedSectionProps {
  children: ReactNode;
  /** Delay between each direct child in seconds. Default 0.08. */
  stagger?: number;
  /** Y offset (px) the children start at. Default 16. */
  offset?: number;
  /** Total delay before first child animates (seconds). Default 0. */
  delay?: number;
  className?: string;
  /** Optional element type. Default `div`. */
  as?: "div" | "section" | "ul" | "ol";
}

/**
 * ponytail: hook that returns true once the element is visible OR
 * has been on screen for 200ms (covers server-rendered pages where
 * IntersectionObserver fires too late for headless screenshots / SEO crawls).
 */
function useAlwaysVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // ponytail: immediate fallback so SSR + full-page screenshots work.
    const fallback = setTimeout(() => setVisible(true), 200);
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return () => clearTimeout(fallback);
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.01 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, [ref]);
  return visible;
}

export function AnimatedSection({
  children,
  stagger = 0.08,
  offset = 16,
  delay = 0,
  className,
  as = "div",
}: AnimatedSectionProps) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as] as unknown as React.ElementType;
  const MotionItem = motion.div;
  const ref = useRef<HTMLDivElement>(null);
  const visible = useAlwaysVisible(ref);

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={container}
    >
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <MotionItem key={i} variants={item}>
            {child}
          </MotionItem>
        ))
      ) : (
        <MotionItem variants={item}>{children}</MotionItem>
      )}
    </MotionTag>
  );
}

/**
 * Standalone item — useful when you need stagger but with non-uniform children.
 */
export function AnimatedItem({
  children,
  offset = 16,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  offset?: number;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const item: Variants = {
    hidden: { opacity: 0, y: offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const MotionTag = motion[as] as unknown as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const visible = useAlwaysVisible(ref);

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={item}
    >
      {children}
    </MotionTag>
  );
}

