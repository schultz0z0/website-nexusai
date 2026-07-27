"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import shell from "@/components/route-cinematic-shell.module.css";
import { COMPANY, TIMELINE_CONTATO } from "@/lib/content";
import {
  CONTACT_CHAPTERS,
  CONTACT_RESPONSE_SCENE,
  CONTACT_SIGNAL_SCENE,
  createSceneWindows,
  getRouteMotionMode,
  getSceneScrollVh,
} from "@/lib/route-cinematics";

import { ContactForm } from "./contact-form";
import styles from "./contato-cinematic.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SceneStyle = CSSProperties & { "--scene-scroll": string };

export function ContatoCinematic() {
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

          const signalScene =
            root.querySelector<HTMLElement>("[data-contact-signal-scene]");
          const heroCopy =
            root.querySelector<HTMLElement>("[data-contact-hero-copy]");
          const line = root.querySelector<HTMLElement>("[data-contact-line]");
          const pulse = root.querySelector<HTMLElement>("[data-contact-pulse]");
          const receiver =
            root.querySelector<HTMLElement>("[data-contact-receiver]");
          const receipt =
            root.querySelector<HTMLElement>("[data-contact-receipt]");

          if (
            signalScene &&
            heroCopy &&
            line &&
            pulse &&
            receiver &&
            receipt
          ) {
            gsap.set(receipt, { autoAlpha: 0, y: 28 });

            gsap
              .timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: signalScene,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.72,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                line,
                { scaleX: 0.04, opacity: 0.24 },
                { scaleX: 1, opacity: 1, duration: 0.56 },
                0,
              )
              .fromTo(
                pulse,
                { left: "15%", opacity: 0.58 },
                { left: "84%", opacity: 1, duration: 0.56 },
                0,
              )
              .fromTo(
                receiver,
                { scale: 0.78, opacity: 0.34 },
                { scale: 1, opacity: 1, duration: 0.18, ease: "power2.out" },
                0.44,
              )
              .to(
                heroCopy,
                {
                  autoAlpha: 0.16,
                  y: -36,
                  filter: "blur(8px)",
                  duration: 0.18,
                },
                0.5,
              )
              .to(
                receipt,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.18,
                  ease: "power2.out",
                },
                0.58,
              );
          }

          const responseScene =
            root.querySelector<HTMLElement>("[data-response-scene]");
          const responsePanels = gsap.utils.toArray<HTMLElement>(
            "[data-response-panel]",
            root,
          );
          const responseNodes = gsap.utils.toArray<HTMLElement>(
            "[data-response-node]",
            root,
          );
          const responseFill =
            root.querySelector<HTMLElement>("[data-response-fill]");

          if (responseScene && responsePanels.length && responseFill) {
            const windows = createSceneWindows(
              CONTACT_RESPONSE_SCENE.steps.length,
            );

            gsap.set(responsePanels, { autoAlpha: 0, y: 34 });
            gsap.set(responsePanels[0], { autoAlpha: 1, y: 0 });
            gsap.set(responseNodes, { opacity: 0.36, scale: 0.88 });
            gsap.set(responseNodes[0], { opacity: 1, scale: 1 });
            gsap.set(responseFill, { scaleX: 0 });

            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: responseScene,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.72,
                invalidateOnRefresh: true,
              },
            });

            responsePanels.forEach((panel, index) => {
              const sceneWindow = windows[index];
              const enterAt = Math.max(sceneWindow.start - 0.02, 0);
              const previous = responsePanels[index - 1];

              if (previous) {
                timeline.to(
                  previous,
                  {
                    autoAlpha: 0,
                    y: -28,
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
                    duration: 0.065,
                    ease: "power2.out",
                  },
                  enterAt,
                )
                .to(
                  responseFill,
                  {
                    scaleX: (index + 1) / responsePanels.length,
                    duration: 0.09,
                  },
                  enterAt,
                )
                .to(
                  responseNodes[index],
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.05,
                    ease: "power2.out",
                  },
                  enterAt,
                );
            });
          }
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
      data-route-chapters={CONTACT_CHAPTERS.map((chapter) => chapter.id).join(
        ",",
      )}
    >
      <div className={shell.grid} aria-hidden="true" />

      <section
        className={styles.signalScene}
        data-contact-signal-scene
        style={
          {
            "--scene-scroll": `${getSceneScrollVh(CONTACT_SIGNAL_SCENE.steps.length)}svh`,
          } as SceneStyle
        }
        aria-labelledby="contact-title"
      >
        <div className={styles.signalSticky}>
          <div className={styles.signalGrid} aria-hidden="true" />

          <header className={styles.heroCopyBlock} data-contact-hero-copy>
            <p className={shell.eyebrow}>Sinal humano</p>
            <h1 id="contact-title">Contato</h1>
            <p>
              Conte rapidamente seu cenário. Respondemos em até 24h úteis, sem
              auto-reply genérico.
            </p>
          </header>

          <div className={styles.transmission} aria-hidden="true">
            <div className={styles.senderNode}>você</div>
            <div className={styles.transmissionLine} data-contact-line />
            <div className={styles.pulse} data-contact-pulse />
            <div className={styles.receiverNode} data-contact-receiver>
              Nexus
            </div>
          </div>

          <div className={styles.receipt} data-contact-receipt>
            <span>Conexão estabelecida</span>
            <strong>Uma pessoa assume daqui.</strong>
            <p>Sem bot. Sem fila invisível. Sem pitch automático.</p>
          </div>
        </div>
      </section>

      <section className={styles.briefingChapter} aria-labelledby="briefing-title">
        <div className={shell.sectionShell}>
          <div className={styles.briefingLayout}>
            <div className={styles.briefingCopy}>
              <p className={shell.eyebrow}>Conte seu cenário</p>
              <h2 id="briefing-title" className={shell.displayTitle}>
                Um briefing. Sem fricção.
              </h2>
              <p className={shell.sectionDescription}>
                O suficiente pra entender o contexto e preparar uma conversa
                útil — sem transformar o primeiro contato em um projeto.
              </p>
              <div className={styles.humanStatus}>
                Lido por uma pessoa, não por um funil automático
              </div>
            </div>

            <div className={styles.formStage}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.responseScene}
        data-response-scene
        style={
          {
            "--scene-scroll": `${getSceneScrollVh(
              CONTACT_RESPONSE_SCENE.steps.length,
            )}svh`,
          } as SceneStyle
        }
        aria-labelledby="response-title"
      >
        <div className={styles.responseSticky}>
          <header className={styles.responseHeader}>
            <p className={shell.eyebrow}>O que acontece depois</p>
            <h2 id="response-title">Seu sinal continua visível.</h2>
            <p>Sem ghosting. Sem &ldquo;entraremos em contato&rdquo;.</p>
          </header>

          <div className={styles.responseStage}>
            {TIMELINE_CONTATO.map((step) => (
              <article
                key={step.n}
                className={styles.responsePanel}
                data-response-panel
              >
                <span>{step.prazo}</span>
                <strong>{step.n}</strong>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>

          <div className={styles.responseRail} aria-hidden="true">
            <div className={styles.responseLine}>
              <div className={styles.responseFill} data-response-fill />
            </div>
            {TIMELINE_CONTATO.map((step) => (
              <span key={step.n} data-response-node>
                {step.n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.epilogue} aria-labelledby="email-title">
        <div>
          <p id="email-title">Prefere email direto?</p>
          <Link href={`mailto:${COMPANY.email}`} className={styles.emailLink}>
            {COMPANY.email}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
