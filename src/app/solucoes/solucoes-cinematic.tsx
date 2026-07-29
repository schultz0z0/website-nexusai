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
          mobile: "(max-width: 767px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const mode = getRouteMotionMode({
            desktop: Boolean(conditions?.desktop),
            reducedMotion: Boolean(conditions?.reduced),
          });

          if (mode === "static") return;

          if (mode === "mobile") {
            const scene = root.querySelector<HTMLElement>(
              "[data-solutions-mobile-scene]",
            );
            const mediaLayer = root.querySelector<HTMLElement>(
              "[data-solutions-mobile-media]",
            );
            const shade = root.querySelector<HTMLElement>(
              "[data-solutions-mobile-shade]",
            );
            const hero = root.querySelector<HTMLElement>(
              "[data-solutions-mobile-hero]",
            );
            const panels = gsap.utils.toArray<HTMLElement>(
              "[data-solutions-mobile-panel]",
              root,
            );
            const progressFill = root.querySelector<HTMLElement>(
              "[data-solutions-mobile-progress]",
            );

            if (
              !scene ||
              !mediaLayer ||
              !shade ||
              !hero ||
              !panels.length ||
              !progressFill
            ) {
              return;
            }

            const windows = createSceneWindows(panels.length + 1);

            gsap.set(panels, {
              autoAlpha: 0,
              y: 48,
              scale: 0.94,
              clipPath: "inset(12% 0% 12% 0% round 24px)",
            });
            gsap.set(progressFill, { scaleX: 0 });

            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: scene,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.72,
                invalidateOnRefresh: true,
              },
            });

            timeline
              .fromTo(
                mediaLayer,
                { scale: 1.01, yPercent: 0 },
                { scale: 1.14, yPercent: -3.5, duration: 1 },
                0,
              )
              .to(
                hero,
                {
                  autoAlpha: 0,
                  y: -44,
                  filter: "blur(10px)",
                  duration: 0.07,
                },
                windows[0].focus,
              )
              .to(
                shade,
                { opacity: 0.88, duration: 0.1 },
                windows[0].focus,
              );

            panels.forEach((panel, index) => {
              const sceneWindow = windows[index + 1];
              const enterAt = Math.max(sceneWindow.start - 0.015, 0);
              const previous = panels[index - 1];

              if (previous) {
                timeline.to(
                  previous,
                  {
                    autoAlpha: 0,
                    y: -34,
                    scale: 0.97,
                    filter: "blur(7px)",
                    duration: 0.055,
                  },
                  enterAt,
                );
              }

              timeline
                .to(
                  panel,
                  {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    clipPath: "inset(0% 0% 0% 0% round 24px)",
                    filter: "blur(0px)",
                    duration: 0.07,
                    ease: "power2.out",
                  },
                  enterAt,
                )
                .to(
                  progressFill,
                  {
                    scaleX: (index + 1) / panels.length,
                    duration: 0.07,
                  },
                  enterAt,
                );
            });

            const fitColumns = gsap.utils.toArray<HTMLElement>(
              "[data-solutions-fit-column]",
              root,
            );
            if (fitColumns.length) {
              gsap.fromTo(
                fitColumns,
                { y: 42, opacity: 0.28 },
                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.08,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: "[data-solutions-fit]",
                    start: "top 78%",
                    end: "top 28%",
                    scrub: 0.55,
                  },
                },
              );
            }

            gsap.fromTo(
              "[data-solutions-cta-content]",
              { y: 42, opacity: 0.26 },
              {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: "[data-solutions-cta]",
                  start: "top 82%",
                  end: "center 62%",
                  scrub: 0.55,
                },
              },
            );

            return;
          }

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
          const mediaLayer = root.querySelector<HTMLElement>(
            "[data-solutions-desktop-media]",
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
              mediaLayer,
              {
                scale: 1.08,
                opacity: 0.12,
                filter: "saturate(0.82)",
                duration: 0.17,
              },
              0.07,
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
        className={`${styles.mobileSceneTrack} ${shell.mobileOnly}`}
        style={
          {
            "--scene-scroll": `${getSceneScrollVh(AREAS.length + 1)}svh`,
          } as SceneStyle
        }
        data-solutions-mobile-scene
        aria-labelledby="solutions-mobile-title"
      >
        <div className={styles.mobileSceneSticky}>
          <div
            className={styles.mobileSceneMedia}
            data-solutions-mobile-media
            aria-hidden="true"
          />
          <div
            className={styles.mobileSceneShade}
            data-solutions-mobile-shade
            aria-hidden="true"
          />

          <header
            className={styles.mobileHero}
            data-solutions-mobile-hero
          >
            <p className={shell.eyebrow}>Soluções sob medida</p>
            <h1 id="solutions-mobile-title">
              Tire o peso da operação.
            </h1>
            <p>
              A IA entra onde sua equipe perde tempo. Do atendimento ao estoque,
              cada solução nasce do contexto real.
            </p>
          </header>

          <div className={styles.mobilePanelStack}>
            {AREAS.map((area, index) => (
              <MobileSolutionPanel
                key={area.title}
                area={area}
                index={index}
                layerLabel={SOLUTION_LAYERS[Math.floor(index / 2)].label}
              />
            ))}
          </div>

          <div className={styles.mobileProgress} aria-hidden="true">
            <span>01</span>
            <div>
              <i data-solutions-mobile-progress />
            </div>
            <span>06</span>
          </div>
        </div>
      </section>

      <section
        className={`${styles.sceneTrack} ${shell.desktopOnly}`}
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
          <div
            className={styles.desktopHeroMedia}
            data-solutions-desktop-media
            aria-hidden="true"
          />
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
              A IA entra onde sua equipe perde tempo: atendimento, vendas,
              estoque, dados, integrações e rotinas internas. Tudo sob medida
              pro contexto real.
            </p>
          </header>

          <div className={styles.sceneIntro} data-solutions-intro>
            <p className={shell.eyebrow}>Áreas onde entregamos</p>
            <h2 className={styles.sceneTitle}>
              Seis frentes. Uma regra: resolver o gargalo real.
            </h2>
            <p>
              Começamos pelo problema, conectamos a operação e só então
              escolhemos o que automatizar.
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
              <p className={shell.eyebrow}>Antes da proposta</p>
              <h2 id="fit-title" className={shell.displayTitle}>
                Veja se faz sentido.
              </h2>
            </div>
            <p className={shell.sectionDescription}>
              Em dois minutos, você identifica se o nosso jeito de trabalhar
              combina com o momento da sua operação.
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
        <div className={shell.ctaContent} data-solutions-cta-content>
          <h2 id="solutions-cta-title">
            Qual gargalo vale resolver primeiro?
          </h2>
          <p>
            Conte o contexto. Em até 24h úteis, a gente responde com o próximo
            passo mais útil, sem compromisso.
          </p>
          <Link href="/contato" className={shell.ctaButton}>
            Solicitar diagnóstico
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function MobileSolutionPanel({
  area,
  index,
  layerLabel,
}: {
  area: Area;
  index: number;
  layerLabel: string;
}) {
  const Icon = area.icon;

  return (
    <article
      className={styles.mobilePanel}
      data-solutions-mobile-panel
      aria-labelledby={`mobile-solution-${index + 1}`}
    >
      <div className={styles.mobilePanelTopline}>
        <span className={styles.mobilePanelIcon} aria-hidden="true">
          <Icon />
        </span>
        <span>{String(index + 1).padStart(2, "0")} / 06</span>
      </div>
      <p className={styles.mobileLayerLabel}>{layerLabel}</p>
      <h2 id={`mobile-solution-${index + 1}`}>{area.title}</h2>
      <p className={styles.mobilePanelDescription}>{area.desc}</p>
      <div className={styles.mobileExample}>
        <span>Na prática</span>
        <p>{area.example}</p>
      </div>
    </article>
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
    <div
      className={`${styles.fitColumn} ${muted ? styles.fitMuted : ""}`}
      data-solutions-fit-column
    >
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
