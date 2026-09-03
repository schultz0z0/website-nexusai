"use client";

import {
  Blocks,
  ChartNoAxesCombined,
  Network,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { HOME_CAPABILITIES, HOME_COPY } from "@/lib/content";

import styles from "./custom-capabilities.module.css";

const ICONS: Record<(typeof HOME_CAPABILITIES)[number]["id"], LucideIcon> = {
  automate: Workflow,
  connect: Network,
  decide: ChartNoAxesCombined,
  build: Blocks,
};

const CAPABILITY_IMAGES = {
  automate: {
    src: "/images/capabilities/automate.webp",
    alt: "Equipe organizando uma rotina operacional repetitiva.",
  },
  connect: {
    src: "/images/capabilities/connect.webp",
    alt: "Equipe conectando sistemas e etapas de uma operação.",
  },
  decide: {
    src: "/images/capabilities/decide.webp",
    alt: "Profissionais analisando contexto para tomar uma decisão.",
  },
  build: {
    src: "/images/capabilities/build.webp",
    alt: "Equipe criando uma ferramenta digital sob medida.",
  },
} as const;

export function CustomCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const frameRequested = useRef(false);

  const syncActiveStep = useCallback(() => {
    frameRequested.current = false;
    if (window.matchMedia("(max-width: 899px)").matches) return;

    const targetY = window.innerHeight * 0.5;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    stepRefs.current.forEach((step, index) => {
      if (!step) return;
      const rect = step.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - targetY);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((current) =>
      current === closestIndex ? current : closestIndex,
    );
  }, []);

  useEffect(() => {
    const requestSync = () => {
      if (frameRequested.current) return;
      frameRequested.current = true;
      window.requestAnimationFrame(syncActiveStep);
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, [syncActiveStep]);

  function selectStep(index: number, shouldScroll = false) {
    setActiveIndex(index);
    if (shouldScroll && window.matchMedia("(min-width: 900px)").matches) {
      stepRefs.current[index]?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "center",
      });
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex =
      (index + delta + HOME_CAPABILITIES.length) % HOME_CAPABILITIES.length;
    stepRefs.current[nextIndex]?.focus();
    selectStep(nextIndex, true);
  }

  return (
    <section
      id="aplicacoes"
      data-home-chapter="applications"
      aria-labelledby="applications-title"
      className={styles.section}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{HOME_COPY.applications.eyebrow}</p>
          <h2 id="applications-title">{HOME_COPY.applications.title}</h2>
          <p>{HOME_COPY.applications.body}</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.mediaColumn} aria-live="polite">
            <div className={styles.mediaFrame} style={{ position: "relative" }}>
              {HOME_CAPABILITIES.map((item, index) => (
                <Image
                  key={item.id}
                  src={CAPABILITY_IMAGES[item.id].src}
                  alt={index === activeIndex ? CAPABILITY_IMAGES[item.id].alt : ""}
                  fill
                  sizes="(min-width: 900px) 54vw, 100vw"
                  className={styles.mediaImage}
                  data-capability-image={item.id}
                  data-active={index === activeIndex}
                />
              ))}
              <div className={styles.mediaShade} aria-hidden="true" />
              <div className={styles.mediaMeta}>
                <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                <p>{HOME_CAPABILITIES[activeIndex].title}</p>
              </div>
            </div>
          </div>

          <div className={styles.steps} role="tablist" aria-label="Tipos de solução">
            {HOME_CAPABILITIES.map((item, index) => {
              const Icon = ICONS[item.id];
              const selected = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  className={styles.step}
                  data-capability-step={item.id}
                  data-active={selected}
                  onClick={() => selectStep(index, true)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <div className={styles.mobileImage} style={{ position: "relative" }}>
                    <Image
                      src={CAPABILITY_IMAGES[item.id].src}
                      alt={CAPABILITY_IMAGES[item.id].alt}
                      fill
                      sizes="(max-width: 899px) 100vw, 1px"
                    />
                  </div>
                  <span className={styles.stepNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon aria-hidden="true" />
                  <span className={styles.stepCopy}>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
