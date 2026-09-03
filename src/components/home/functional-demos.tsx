"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  useLayoutEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  CopilotMockDashboard,
  StockMockDashboard,
} from "@/components/mock-dashboards";
import { HOME_COPY, HOME_DEMOS } from "@/lib/content";
import { getViewportMotionMode } from "@/lib/viewport-motion";

import styles from "./functional-demos.module.css";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function FunctionalDemos() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!root || !stage || !viewport || !track) return;

    const initialMode = getViewportMotionMode();
    root.dataset.motionMode = initialMode;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          desktop: "(min-width: 1024px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        () => {
          const mode = getViewportMotionMode();
          root.dataset.motionMode = mode;

          if (mode !== "cinematic" || window.innerWidth < 1024) return;

          const distance = () => {
            const viewportStyle = getComputedStyle(viewport);
            const contentWidth =
              viewport.clientWidth -
              Number.parseFloat(viewportStyle.paddingLeft) -
              Number.parseFloat(viewportStyle.paddingRight);

            return Math.max(0, track.scrollWidth - contentWidth);
          };
          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              pin: stage,
              scrub: 0.8,
              start: "top top",
              end: () => `+=${Math.max(window.innerHeight, distance())}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          return () => tween.scrollTrigger?.kill();
        },
      );
    }, root);

    return () => {
      media.revert();
      context.revert();
      delete root.dataset.motionMode;
    };
  }, []);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--pointer-x", `${x * 100}%`);
    card.style.setProperty("--pointer-y", `${y * 100}%`);
    card.style.setProperty("--rotate-x", `${(0.5 - y) * 6}deg`);
    card.style.setProperty("--rotate-y", `${(x - 0.5) * 8}deg`);
  }

  function resetPointer(event: ReactPointerEvent<HTMLElement>) {
    const card = event.currentTarget;
    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  }

  return (
    <section
      ref={rootRef}
      id="demonstracoes"
      data-home-chapter="demos"
      data-motion-mode="cinematic"
      aria-labelledby="demos-title"
      className={styles.section}
    >
      <div ref={stageRef} data-demo-stage className={styles.stage}>
        <div className={styles.heading}>
        <p className={styles.eyebrow}>{HOME_COPY.demos.eyebrow}</p>
        <h2 id="demos-title">{HOME_COPY.demos.title}</h2>
        <p>{HOME_COPY.demos.body}</p>
      </div>

        <div ref={viewportRef} className={styles.viewport}>
          <div ref={trackRef} data-demo-track className={styles.track}>
          {HOME_DEMOS.map((demo) => (
            <article
              key={demo.id}
              data-demo-card
              className={styles.card}
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
            >
              <div className={styles.copy}>
                <p className={styles.label}>{demo.label}</p>
                <h3>{demo.name}</h3>
                <dl>
                  <div>
                    <dt>Contexto</dt>
                    <dd>{demo.context}</dd>
                  </div>
                  <div>
                    <dt>Solução construída</dt>
                    <dd>{demo.solution}</dd>
                  </div>
                  <div>
                    <dt>Decisão humana</dt>
                    <dd>{demo.humanDecision}</dd>
                  </div>
                </dl>
                <Link href={demo.cta.href} data-track-cta={`demo_${demo.id}`}>
                  {demo.cta.label}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>

              <div className={styles.visual} aria-label={`Interface demonstrativa ${demo.name}`}>
                {demo.id === "stock" ? (
                  <StockMockDashboard />
                ) : (
                  <CopilotMockDashboard />
                )}
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
