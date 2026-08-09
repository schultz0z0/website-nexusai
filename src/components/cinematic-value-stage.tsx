"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  getBlueStageScrollDistance,
} from "@/lib/home-narrative";
import { getViewportMotionMode } from "@/lib/viewport-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicValueStage({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const stageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          mobile: "(max-width: 767px)",
          desktop: "(min-width: 768px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        () => {
          const mode = getViewportMotionMode();
          stage.dataset.motionMode = mode;
          const clearMotionMode = () => delete stage.dataset.motionMode;

          if (mode !== "cinematic") {
            return clearMotionMode;
          }

          const steps = gsap.utils.toArray<HTMLElement>(
            "[data-value-step]",
            stage,
          );

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: `+=${getBlueStageScrollDistance({
                reducedMotion: window.matchMedia(
                  "(prefers-reduced-motion: reduce)",
                ).matches,
                width: window.innerWidth,
                height: window.innerHeight,
              })}`,
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              "[data-value-orbit]",
              {
                rotation: 16,
                scale: 1.08,
                ease: "none",
                duration: 1,
              },
              0,
            )
            .to(
              "[data-value-flow]",
              {
                y: -12,
                rotationX: 0,
                rotationY: -1.5,
                scale: 1.015,
                ease: "power1.inOut",
                duration: 1,
              },
              0,
            );

          steps.forEach((step, index) => {
            timeline.to(
              step,
              {
                borderColor: "rgba(196, 221, 255, 0.72)",
                backgroundColor: "rgba(211, 230, 255, 0.12)",
                boxShadow:
                  "0 16px 48px rgba(1, 12, 40, 0.2), inset 0 1px 0 rgba(255,255,255,0.14)",
                y: -4,
                duration: 0.22,
              },
              index * 0.33,
            );

            if (index < steps.length - 1) {
              timeline.to(
                step,
                {
                  borderColor: "rgba(196, 221, 255, 0.22)",
                  backgroundColor: "rgba(211, 230, 255, 0.055)",
                  boxShadow: "none",
                  y: 0,
                  duration: 0.18,
                },
                index * 0.33 + 0.24,
              );
            }
          });

          return clearMotionMode;
        },
      );
    }, stage);

    return () => {
      media.revert();
      context.revert();
      delete stage.dataset.motionMode;
    };
  }, []);

  return (
    <section
      ref={stageRef}
      id="value"
      data-home-chapter="value"
      className={className}
    >
      {children}
    </section>
  );
}
