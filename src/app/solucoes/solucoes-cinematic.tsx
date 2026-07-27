"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import shell from "@/components/route-cinematic-shell.module.css";
import {
  AREAS,
  PRA_QUEM_E,
  PRA_QUEM_NAO_E,
  type Area,
} from "@/lib/content";
import {
  SOLUTIONS_CHAPTERS,
  SOLUTIONS_SCENE,
  createSceneWindows,
  getRouteMotionMode,
  getSceneScrollVh,
} from "@/lib/route-cinematics";

import styles from "./solucoes-cinematic.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ORBIT_CLASSES = [
  styles.orbitOne,
  styles.orbitTwo,
  styles.orbitThree,
  styles.orbitFour,
  styles.orbitFive,
  styles.orbitSix,
];

const SOLUTION_LAYERS = [
  {
    id: "market",
    label: "Relação com o mercado",
    center: "frente",
    areas: AREAS.slice(0, 2),
  },
  {
    id: "intelligence",
    label: "Inteligência operacional",
    center: "decisão",
    areas: AREAS.slice(2, 4),
  },
  {
    id: "infrastructure",
    label: "Infraestrutura conectada",
    center: "base",
    areas: AREAS.slice(4, 6),
  },
] as const;

const SCENE_WINDOWS = createSceneWindows(SOLUTIONS_SCENE.steps.length);

type SceneStyle = CSSProperties & { "--scene-scroll": string };

export function SolucoesCinematic() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          desktop: "(min-width: 768px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const mode = getRouteMotionMode({
            desktop: Boolean(conditions?.desktop),
            reducedMotion: Boolean(conditions?.reduced),
          });

          if (mode === "static") return;

          const scene = root.querySelector<HTMLElement>("[data-solutions-scene]");
          const heading = root.querySelector<HTMLElement>(
            "[data-solutions-heading]",
          );
          const intro = root.querySelector<HTMLElement>(
            "[data-solutions-intro]",
          );
          const overview = root.querySelector<HTMLElement>(
            "[data-solutions-overview]",
          );
          const layers = gsap.utils.toArray<HTMLElement>(
            "[data-solutions-layer]",
            root,
          );
          const progressNodes = gsap.utils.toArray<HTMLElement>(
            "[data-solutions-progress-node]",
            root,
          );

          if (!scene || !heading || !intro || !overview) return;

          gsap.set(layers, { autoAlpha: 0, y: 48, scale: 0.96 });
          gsap.set(intro, { autoAlpha: 0, x: -28 });
          gsap.set(progressNodes, { color: "rgba(205, 216, 242, 0.32)" });
          gsap.set(progressNodes[0], {
            color: "#dfe8ff",
            borderColor: "rgba(104, 151, 255, 0.72)",
            boxShadow: "0 0 24px rgba(55, 120, 255, 0.3)",
          });
          layers.forEach((layer) => {
            gsap.set(layer.querySelectorAll("[data-side='left']"), {
              x: -70,
              opacity: 0.24,
            });
            gsap.set(layer.querySelectorAll("[data-side='right']"), {
              x: 70,
              opacity: 0.24,
            });
            gsap.set(layer.querySelector("[data-field-sweep]"), {
              xPercent: -620,
              opacity: 0,
            });
          });

          const timeline = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.72,
            },
          });

          timeline
            .to(
              "[data-solutions-title]",
              {
                y: -46,
                scale: 0.62,
                opacity: 0.46,
                filter: "blur(2px)",
                duration: 0.16,
              },
              0.08,
            )
            .to(
              "[data-solutions-hero-copy]",
              { y: -32, opacity: 0, duration: 0.1 },
              0.08,
            )
            .to(
              "[data-solution-orbit]",
              {
                x: 0,
                y: 0,
                scale: 0.78,
                opacity: 0.08,
                stagger: 0.008,
                duration: 0.12,
              },
              0.1,
            )
            .to(
              "[data-solution-axis]",
              { scaleX: 0.35, opacity: 0.28, duration: 0.12 },
              0.1,
            )
            .to(
              "[data-solution-core-visual]",
              { scale: 0.72, opacity: 0.45, duration: 0.12 },
              0.1,
            )
            .to(
              overview,
              { autoAlpha: 0, scale: 0.9, filter: "blur(8px)", duration: 0.1 },
              0.17,
            )
            .to(
              intro,
              { autoAlpha: 1, x: 0, duration: 0.1 },
              SCENE_WINDOWS[1].start,
            )
            .to(
              "[data-solutions-progress]",
              { scaleX: 1, duration: 0.72, ease: "none" },
              SCENE_WINDOWS[1].start,
            );

          layers.forEach((layer, index) => {
            const window = SCENE_WINDOWS[index + 1];
            const previous = index > 0 ? layers[index - 1] : null;

            if (previous) {
              timeline.to(
                previous,
                {
                  autoAlpha: 0,
                  y: -42,
                  scale: 0.96,
                  filter: "blur(7px)",
                  duration: 0.075,
                },
                window.start,
              );
            }

            timeline
              .to(
                layer,
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.09,
                },
                window.start + 0.01,
              )
              .to(
                layer.querySelectorAll("[data-field-card]"),
                {
                  x: 0,
                  opacity: 1,
                  stagger: 0.012,
                  duration: 0.08,
                },
                window.start + 0.02,
              )
              .to(
                layer.querySelector("[data-field-line]"),
                { scaleX: 1, opacity: 1, duration: 0.08, ease: "none" },
                window.start + 0.025,
              )
              .to(
                layer.querySelector("[data-field-sweep]"),
                {
                  xPercent: 620,
                  opacity: 0.9,
                  duration: Math.max(window.end - window.start - 0.06, 0.1),
                  ease: "none",
                },
                window.start + 0.025,
              )
              .to(
                progressNodes[index + 1],
                {
                  color: "#dfe8ff",
                  borderColor: "rgba(104, 151, 255, 0.72)",
                  boxShadow: "0 0 24px rgba(55, 120, 255, 0.3)",
                  duration: 0.06,
                },
                window.start,
              );
          });

          timeline.to(
            layers.at(-1) ?? [],
            { scale: 0.98, y: -10, duration: 0.08 },
            0.92,
          );
        },
      );
    }, root);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className={`${shell.root} ${styles.root}`}
      data-route-chapters={SOLUTIONS_CHAPTERS.map((chapter) => chapter.id).join(
        ",",
      )}
    >
      <div className={shell.grid} aria-hidden="true" />

      <section
        className={styles.sceneTrack}
        style={
          {
            "--scene-scroll": `${getSceneScrollVh(
              SOLUTIONS_SCENE.steps.length,
            )}svh`,
          } as SceneStyle
        }
        data-solutions-scene
        aria-labelledby="solutions-title"
      >
        <div className={styles.sceneSticky}>
          <header className={styles.heroHeading} data-solutions-heading>
            <h1
              id="solutions-title"
              className={shell.heroTitle}
              data-solutions-title
            >
              Soluções
            </h1>
            <p
              className={shell.heroCopy}
              data-solutions-hero-copy
            >
              Atendimento, marketing, estoque, dados, integração e operações
              internas. Cada uma, sob medida pro seu contexto.
            </p>
          </header>

          <div className={styles.sceneIntro} data-solutions-intro>
            <p className={shell.eyebrow}>Áreas onde entregamos</p>
            <h2 className={styles.sceneTitle}>
              Um campo. Três camadas operacionais.
            </h2>
            <p>
              As seis capacidades trabalham em pares. O ponto de convergência é
              sempre o contexto real da operação.
            </p>
          </div>

          <div
            className={styles.overviewStage}
            data-solutions-overview
            aria-hidden="true"
          >
            <div className={styles.heroAxis} data-solution-axis />
            <div className={styles.coreAnchor}>
              <div className={styles.heroCore} data-solution-core-visual>
                N
                <span>seu contexto</span>
              </div>
            </div>
            {AREAS.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className={`${styles.orbitLabel} ${ORBIT_CLASSES[index]}`}
                  data-solution-orbit
                >
                  <Icon />
                  {area.title}
                </div>
              );
            })}
          </div>

          <div className={styles.layerStack}>
            {SOLUTION_LAYERS.map((layer, layerIndex) => {
              const [leftArea, rightArea] = layer.areas;
              return (
                <section
                  key={layer.id}
                  className={styles.layerFrame}
                  data-solutions-layer={layer.id}
                  aria-labelledby={`${layer.id}-title`}
                >
                  <h2 id={`${layer.id}-title`} className={shell.srOnly}>
                    {layer.label}
                  </h2>
                  <div
                    className={styles.fieldSweep}
                    data-field-sweep
                    aria-hidden="true"
                  />
                  <SolutionFieldCard
                    area={leftArea}
                    capabilityIndex={layerIndex * 2 + 1}
                    side="left"
                  />
                  <div className={styles.fieldCenter} aria-hidden="true">
                    <span className={styles.layerLabel}>{layer.label}</span>
                    <div className={styles.fieldLine} data-field-line />
                    <div className={styles.fieldNode}>{layer.center}</div>
                  </div>
                  <SolutionFieldCard
                    area={rightArea}
                    capabilityIndex={layerIndex * 2 + 2}
                    side="right"
                  />
                </section>
              );
            })}
          </div>

          <div className={styles.sceneProgress} aria-hidden="true">
            <div className={styles.progressBase} />
            <div className={styles.progressSignal} data-solutions-progress />
            {SOLUTIONS_SCENE.steps.map((step, index) => (
              <span key={step} data-solutions-progress-node>
                {String(index).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.fitChapter}
        data-solutions-fit
        aria-labelledby="fit-title"
      >
        <div className={shell.sectionShell}>
          <header className={styles.fitHeader}>
            <div>
              <p className={shell.eyebrow}>É pra Nexus AI?</p>
              <h2 id="fit-title" className={shell.displayTitle}>
                O ponto de aderência
              </h2>
            </div>
            <p className={shell.sectionDescription}>
              Veja se sua empresa se encaixa antes de preencher o formulário.
            </p>
          </header>

          <div className={styles.fitThreshold}>
            <FitColumn title="Pra quem é" items={PRA_QUEM_E} />
            <FitColumn
              title="Pra quem não é"
              items={PRA_QUEM_NAO_E}
              muted
            />
          </div>
        </div>
      </section>

      <section
        className={shell.ctaChapter}
        data-solutions-cta
        aria-labelledby="solutions-cta-title"
      >
        <div className={shell.ctaHorizon} aria-hidden="true" />
        <div className={shell.ctaContent}>
          <h2 id="solutions-cta-title">Pronto pra começar?</h2>
          <p>
            Diagnóstico inicial gratuito, sem compromisso. Resposta humana em
            até 24h úteis.
          </p>
          <Link href="/contato" className={shell.ctaButton}>
            Solicitar Proposta
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function SolutionFieldCard({
  area,
  capabilityIndex,
  side,
}: {
  area: Area;
  capabilityIndex: number;
  side: "left" | "right";
}) {
  const Icon = area.icon;

  return (
    <article
      className={styles.fieldCard}
      data-field-card
      data-side={side}
    >
      <div className={styles.fieldCardTopline}>
        <span className={styles.fieldIcon} aria-hidden="true">
          <Icon />
        </span>
        <span className={styles.fieldIndex}>
          CAMPO {String(capabilityIndex).padStart(2, "0")}
        </span>
      </div>
      <h3>{area.title}</h3>
      <p className={styles.fieldDescription}>{area.desc}</p>
      <p className={styles.fieldExample}>
        <span>Exemplo em operação</span>
        {area.example}
      </p>
    </article>
  );
}

function FitColumn({
  title,
  items,
  muted = false,
}: {
  title: string;
  items: readonly string[];
  muted?: boolean;
}) {
  return (
    <div className={`${styles.fitColumn} ${muted ? styles.fitMuted : ""}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={item}>
            <span className={styles.fitMark} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
