"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import shell from "@/components/route-cinematic-shell.module.css";
import { ETAPAS, FAQ_PROCESSO } from "@/lib/content";
import {
  PROCESS_CHAPTERS,
  PROCESS_SCENE,
  createSceneWindows,
  getRouteMotionMode,
  getSceneScrollVh,
} from "@/lib/route-cinematics";

import styles from "./processo-cinematic.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SceneStyle = CSSProperties & { "--scene-scroll": string };

export function ProcessoCinematic() {
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
              "[data-process-mobile-scene]",
            );
            const mediaLayer = root.querySelector<HTMLElement>(
              "[data-process-mobile-media]",
            );
            const shade = root.querySelector<HTMLElement>(
              "[data-process-mobile-shade]",
            );
            const hero = root.querySelector<HTMLElement>(
              "[data-process-mobile-hero]",
            );
            const panels = gsap.utils.toArray<HTMLElement>(
              "[data-process-mobile-panel]",
              root,
            );
            const progressFill = root.querySelector<HTMLElement>(
              "[data-process-mobile-progress]",
            );
            const progressNodes = gsap.utils.toArray<HTMLElement>(
              "[data-process-mobile-node]",
              root,
            );
            const portals = gsap.utils.toArray<HTMLElement>(
              "[data-process-mobile-portal]",
              root,
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
              y: 54,
              scale: 0.94,
              clipPath: "inset(16% 0% 10% 0% round 24px)",
            });
            gsap.set(progressFill, { scaleY: 0 });
            gsap.set(progressNodes, { opacity: 0.3, scale: 0.84 });
            gsap.set(progressNodes[0], { opacity: 1, scale: 1 });

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
                { scale: 1.13, yPercent: -3, duration: 1 },
                0,
              )
              .to(
                hero,
                {
                  autoAlpha: 0,
                  y: -42,
                  filter: "blur(10px)",
                  duration: 0.07,
                },
                windows[0].focus,
              )
              .to(
                shade,
                { opacity: 0.9, duration: 0.1 },
                windows[0].focus,
              )
              .to(
                portals,
                {
                  scale: 1.12,
                  opacity: 0.5,
                  stagger: 0.012,
                  duration: 0.22,
                },
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
                    y: -36,
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
                    scaleY: (index + 1) / panels.length,
                    duration: 0.07,
                  },
                  enterAt,
                )
                .to(
                  progressNodes[index + 1],
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.05,
                    ease: "power2.out",
                  },
                  enterAt,
                );
            });

            const faqItems = gsap.utils.toArray<HTMLElement>(
              "[data-process-faq-item]",
              root,
            );
            if (faqItems.length) {
              gsap.fromTo(
                faqItems,
                { y: 28, opacity: 0.28 },
                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.045,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: "[data-process-faq]",
                    start: "top 82%",
                    end: "center 68%",
                    scrub: 0.5,
                  },
                },
              );
            }

            gsap.fromTo(
              "[data-process-cta-content]",
              { y: 42, opacity: 0.26 },
              {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: "[data-process-cta]",
                  start: "top 82%",
                  end: "center 62%",
                  scrub: 0.55,
                },
              },
            );

            return;
          }

          const scene = root.querySelector<HTMLElement>("[data-process-scene]");
          const intro = root.querySelector<HTMLElement>("[data-process-intro]");
          const gateStack =
            root.querySelector<HTMLElement>("[data-process-gate-stack]");
          const floor = root.querySelector<HTMLElement>("[data-process-floor]");
          const panels = gsap.utils.toArray<HTMLElement>(
            "[data-process-panel]",
            root,
          );
          const railNodes = gsap.utils.toArray<HTMLElement>(
            "[data-process-rail-node]",
            root,
          );
          const railFill =
            root.querySelector<HTMLElement>("[data-process-rail-fill]");
          const mediaLayer = root.querySelector<HTMLElement>(
            "[data-process-desktop-media]",
          );

          if (!scene || !intro || !gateStack || !floor || !railFill) return;

          const windows = createSceneWindows(PROCESS_SCENE.steps.length);
          gsap.set(panels, {
            autoAlpha: 1,
            y: 28,
            clipPath: "inset(100% 0% 0% 0%)",
          });
          gsap.set(railNodes, { opacity: 0.34, scale: 0.88 });
          gsap.set(railNodes[0], { opacity: 1, scale: 1 });
          gsap.set(railFill, { scaleY: 0 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.75,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .fromTo(
              floor,
              { opacity: 0.22, scaleY: 0.72 },
              { opacity: 0.9, scaleY: 1, duration: 0.13 },
              0,
            )
            .fromTo(
              gateStack,
              { scale: 0.72, z: -220, opacity: 0.58 },
              { scale: 1.22, z: 120, opacity: 1, duration: 0.18 },
              0,
            )
            .to(
              mediaLayer,
              {
                scale: 1.07,
                opacity: 0.12,
                filter: "saturate(0.82)",
                duration: 0.18,
              },
              0.06,
            )
            .to(
              intro,
              {
                autoAlpha: 0,
                y: -42,
                filter: "blur(8px)",
                duration: 0.1,
              },
              windows[0].focus,
            );

          panels.forEach((panel, panelIndex) => {
            const sceneWindow = windows[panelIndex + 1];
            const enterAt = Math.max(sceneWindow.start - 0.035, 0);
            const exitAt = sceneWindow.end - 0.035;

            timeline
              .to(
                panel,
                {
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.07,
                  ease: "power2.out",
                },
                enterAt,
              )
              .to(
                railFill,
                {
                  scaleY: (panelIndex + 1) / panels.length,
                  duration: 0.07,
                },
                enterAt,
              )
              .to(
                railNodes[panelIndex + 1],
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.045,
                  ease: "power2.out",
                },
                enterAt,
              )
              .to(
                gateStack,
                {
                  scale: 1.22 + panelIndex * 0.38,
                  z: 120 + panelIndex * 110,
                  rotateZ: panelIndex % 2 === 0 ? 0.35 : -0.35,
                  duration: Math.max(exitAt - enterAt, 0.08),
                },
                enterAt,
              );
          });
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
      data-route-chapters={PROCESS_CHAPTERS.map((chapter) => chapter.id).join(
        ",",
      )}
    >
      <div className={shell.grid} aria-hidden="true" />

      <section
        className={`${styles.mobileSceneTrack} ${shell.mobileOnly}`}
        data-process-mobile-scene
        style={
          {
            "--scene-scroll": `${getSceneScrollVh(ETAPAS.length + 1)}svh`,
          } as SceneStyle
        }
        aria-labelledby="process-mobile-title"
      >
        <div className={styles.mobileSceneSticky}>
          <div
            className={styles.mobileSceneMedia}
            data-process-mobile-media
            aria-hidden="true"
          />
          <div
            className={styles.mobileSceneShade}
            data-process-mobile-shade
            aria-hidden="true"
          />
          <div className={styles.mobilePortals} aria-hidden="true">
            {ETAPAS.map((stage) => (
              <i key={stage.n} data-process-mobile-portal />
            ))}
          </div>

          <header className={styles.mobileHero} data-process-mobile-hero>
            <p className={shell.eyebrow}>Processo Nexus AI</p>
            <h1 id="process-mobile-title">Clareza antes do código.</h1>
            <p>
              Você vê, aprova e mede cada avanço. Quatro etapas para reduzir
              risco antes da entrega e manter resultado depois dela.
            </p>
          </header>

          <div className={styles.mobilePanelStage}>
            {ETAPAS.map((stage) => (
              <MobileProcessPanel key={stage.n} stage={stage} />
            ))}
          </div>

          <div className={styles.mobileProgressRail} aria-hidden="true">
            <div className={styles.mobileRailLine}>
              <i data-process-mobile-progress />
            </div>
            <span data-process-mobile-node>IN</span>
            {ETAPAS.map((stage) => (
              <span key={stage.n} data-process-mobile-node>
                {stage.n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${styles.sceneTrack} ${shell.desktopOnly}`}
        data-process-scene
        style={
          {
            "--scene-scroll": `${getSceneScrollVh(PROCESS_SCENE.steps.length)}svh`,
          } as SceneStyle
        }
        aria-labelledby="process-title"
      >
        <div className={styles.sceneSticky}>
          <div className={styles.sceneAmbient} aria-hidden="true" />
          <div
            className={styles.desktopHeroMedia}
            data-process-desktop-media
            aria-hidden="true"
          />

          <div className={styles.sceneHeader}>
            <span>Processo sem caixa-preta</span>
            <span>Do diagnóstico ao suporte</span>
          </div>

          <div className={styles.corridor} aria-hidden="true">
            <div className={styles.corridorFloor} data-process-floor />
            <div className={styles.gateStack} data-process-gate-stack>
              {ETAPAS.map((stage, index) => (
                <div
                  key={stage.n}
                  className={styles.gate}
                  style={{ "--gate-index": index } as CSSProperties}
                >
                  <span>{stage.n}</span>
                </div>
              ))}
            </div>
          </div>

          <header className={styles.sceneIntro} data-process-intro>
            <p className={shell.eyebrow}>Quatro checkpoints verificáveis</p>
            <h1 id="process-title">Clareza antes do código.</h1>
            <p>
              Você vê, aprova e mede cada avanço. Quatro etapas para reduzir
              risco antes do código e manter resultado depois da entrega.
            </p>
          </header>

          <div className={styles.panelStage}>
            {ETAPAS.map((stage) => (
              <article
                key={stage.n}
                className={styles.processPanel}
                data-process-panel
                data-process-stage={stage.n}
                aria-labelledby={`process-stage-${stage.n}`}
              >
                <div className={styles.panelCopy}>
                  <span className={styles.panelNumber}>
                    CHECKPOINT {stage.n}
                  </span>
                  <h2 id={`process-stage-${stage.n}`}>{stage.title}</h2>
                  <span className={styles.deadline}>{stage.prazo}</span>
                  <p>{stage.desc}</p>
                </div>

                <ol className={styles.deliverables}>
                  {stage.entregaveis.map((deliverable, deliverableIndex) => (
                    <li key={deliverable}>
                      <span aria-hidden="true">
                        {String(deliverableIndex + 1).padStart(2, "0")}
                      </span>
                      {deliverable}
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>

          <div className={styles.progressRail} aria-hidden="true">
            <div className={styles.railLine}>
              <div className={styles.railFill} data-process-rail-fill />
            </div>
            <span className={styles.railNode} data-process-rail-node>
              IN
            </span>
            {ETAPAS.map((stage) => (
              <span
                key={stage.n}
                className={styles.railNode}
                data-process-rail-node
              >
                {stage.n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.faqChapter}
        data-process-faq
        aria-labelledby="process-faq-title"
      >
        <div className={shell.sectionShell}>
          <header className={styles.faqHeader}>
            <div>
              <p className={shell.eyebrow}>Perguntas comuns</p>
              <h2 id="process-faq-title" className={shell.displayTitle}>
                <span className={styles.faqTitleLine}>Decida sem</span>
                {" "}
                <span className={styles.faqTitleLine}>ponto cego.</span>
              </h2>
            </div>
            <p className={shell.sectionDescription}>
              Custo, prazo, integração e responsabilidade: as dúvidas que
              normalmente travam a decisão, respondidas antes da proposta.
            </p>
          </header>

          <div className={styles.faqList}>
            {FAQ_PROCESSO.map((item) => (
              <details key={item.q} data-process-faq-item>
                <summary>
                  <span>{item.q}</span>
                  <span className={styles.faqIcon} aria-hidden="true">
                    <Plus />
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className={shell.ctaChapter}
        data-process-cta
        aria-labelledby="process-cta-title"
      >
        <div className={shell.ctaContent} data-process-cta-content>
          <h2 id="process-cta-title">
            Comece pelo diagnóstico, não pela ferramenta.
          </h2>
          <p>
            Conte seu cenário. A gente responde em até 24h úteis e organiza o
            próximo passo sem compromisso.
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

function MobileProcessPanel({
  stage,
}: {
  stage: (typeof ETAPAS)[number];
}) {
  return (
    <article
      className={styles.mobileProcessPanel}
      data-process-mobile-panel
      aria-labelledby={`mobile-process-stage-${stage.n}`}
    >
      <div className={styles.mobilePanelTopline}>
        <span>CHECKPOINT {stage.n}</span>
        <span>{stage.prazo}</span>
      </div>
      <h2 id={`mobile-process-stage-${stage.n}`}>{stage.title}</h2>
      <p className={styles.mobilePanelDescription}>{stage.desc}</p>
      <ol className={styles.mobileDeliverables}>
        {stage.entregaveis.map((deliverable, index) => (
          <li key={deliverable}>
            <span aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            {deliverable}
          </li>
        ))}
      </ol>
    </article>
  );
}
