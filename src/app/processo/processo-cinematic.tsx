"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import shell from "@/components/route-cinematic-shell.module.css";
import { ETAPAS, FAQ_ITEMS } from "@/lib/content";
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
          reduced: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const mode = getRouteMotionMode({
            desktop: Boolean(conditions?.desktop),
            reducedMotion: Boolean(conditions?.reduced),
          });

          if (mode === "static") return;

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
        className={styles.sceneTrack}
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

          <div className={styles.sceneHeader}>
            <span>Corredor de confiança</span>
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
            <h1 id="process-title">Processo</h1>
            <p>
              Do diagnóstico à entrega contínua. Quatro etapas, prazos claros,
              sem letra miúda.
            </p>
          </header>

          <div className={styles.panelStage}>
            {ETAPAS.map((stage) => (
              <article
                key={stage.n}
                className={styles.processPanel}
                data-process-panel
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

      <section className={styles.faqChapter} aria-labelledby="process-faq-title">
        <div className={shell.sectionShell}>
          <header className={styles.faqHeader}>
            <div>
              <p className={shell.eyebrow}>Perguntas comuns</p>
              <h2 id="process-faq-title" className={shell.displayTitle}>
                Riscos resolvidos antes da decisão.
              </h2>
            </div>
            <p className={shell.sectionDescription}>
              Antes de pedir proposta, vale olhar aqui.
            </p>
          </header>

          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item) => (
              <details key={item.q}>
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

      <section className={shell.ctaChapter} aria-labelledby="process-cta-title">
        <div className={shell.ctaHorizon} aria-hidden="true" />
        <div className={shell.ctaContent}>
          <h2 id="process-cta-title">
            Pronto pra ver onde dá pra automatizar?
          </h2>
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
