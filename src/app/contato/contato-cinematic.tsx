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
            const signalScene = root.querySelector<HTMLElement>(
              "[data-contact-mobile-signal-scene]",
            );
            const signalMedia = root.querySelector<HTMLElement>(
              "[data-contact-mobile-media]",
            );
            const signalShade = root.querySelector<HTMLElement>(
              "[data-contact-mobile-shade]",
            );
            const hero = root.querySelector<HTMLElement>(
              "[data-contact-mobile-hero]",
            );
            const line = root.querySelector<HTMLElement>(
              "[data-contact-mobile-line]",
            );
            const pulse = root.querySelector<HTMLElement>(
              "[data-contact-mobile-pulse]",
            );
            const receipt = root.querySelector<HTMLElement>(
              "[data-contact-mobile-receipt]",
            );

            if (
              signalScene &&
              signalMedia &&
              signalShade &&
              hero &&
              line &&
              pulse &&
              receipt
            ) {
              gsap.set(receipt, { autoAlpha: 0, y: 34 });

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
                  signalMedia,
                  { scale: 1.01, yPercent: 0 },
                  { scale: 1.12, yPercent: -3, duration: 1 },
                  0,
                )
                .fromTo(
                  line,
                  { scaleX: 0.02, opacity: 0.24 },
                  { scaleX: 1, opacity: 1, duration: 0.56 },
                  0.08,
                )
                .fromTo(
                  pulse,
                  { left: "0%", opacity: 0.5 },
                  { left: "100%", opacity: 1, duration: 0.56 },
                  0.08,
                )
                .to(
                  hero,
                  {
                    autoAlpha: 0,
                    y: -42,
                    filter: "blur(10px)",
                    duration: 0.12,
                  },
                  0.46,
                )
                .to(
                  signalShade,
                  { opacity: 0.86, duration: 0.12 },
                  0.46,
                )
                .to(
                  receipt,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.13,
                    ease: "power2.out",
                  },
                  0.5,
                );
            }

            const responseScene = root.querySelector<HTMLElement>(
              "[data-contact-mobile-response-scene]",
            );
            const responsePanels = gsap.utils.toArray<HTMLElement>(
              "[data-contact-mobile-response-panel]",
              root,
            );
            const responseNodes = gsap.utils.toArray<HTMLElement>(
              "[data-contact-mobile-response-node]",
              root,
            );
            const responseFill = root.querySelector<HTMLElement>(
              "[data-contact-mobile-response-fill]",
            );

            if (
              responseScene &&
              responsePanels.length &&
              responseFill
            ) {
              const windows = createSceneWindows(responsePanels.length);

              gsap.set(responsePanels, { autoAlpha: 0, y: 38, scale: 0.95 });
              gsap.set(responsePanels[0], { autoAlpha: 1, y: 0, scale: 1 });
              gsap.set(responseNodes, { opacity: 0.34, scale: 0.86 });
              gsap.set(responseNodes[0], { opacity: 1, scale: 1 });
              gsap.set(responseFill, { scaleX: 1 / responsePanels.length });

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
                if (index === 0) return;

                const enterAt = Math.max(windows[index].start - 0.02, 0);
                const previous = responsePanels[index - 1];

                timeline
                  .to(
                    previous,
                    {
                      autoAlpha: 0,
                      y: -30,
                      scale: 0.97,
                      filter: "blur(7px)",
                      duration: 0.06,
                    },
                    enterAt,
                  )
                  .to(
                    panel,
                    {
                      autoAlpha: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                      duration: 0.07,
                      ease: "power2.out",
                    },
                    enterAt,
                  )
                  .to(
                    responseFill,
                    {
                      scaleX: (index + 1) / responsePanels.length,
                      duration: 0.07,
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

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: "[data-contact-briefing]",
                  start: "top 82%",
                  end: "center 58%",
                  scrub: 0.6,
                },
              })
              .fromTo(
                "[data-contact-briefing-copy]",
                { y: 36, opacity: 0.28 },
                { y: 0, opacity: 1, ease: "power2.out" },
              )
              .fromTo(
                "[data-contact-form-stage]",
                { y: 58, scale: 0.96, opacity: 0.34 },
                { y: 0, scale: 1, opacity: 1, ease: "power2.out" },
                0.08,
              );

            gsap.fromTo(
              "[data-contact-epilogue-content]",
              { y: 32, opacity: 0.3 },
              {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: "[data-contact-epilogue]",
                  start: "top 84%",
                  end: "center 70%",
                  scrub: 0.5,
                },
              },
            );

            return;
          }

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
          const mediaLayer = root.querySelector<HTMLElement>(
            "[data-contact-desktop-media]",
          );

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
                mediaLayer,
                {
                  scale: 1.07,
                  opacity: 0.16,
                  filter: "saturate(0.82)",
                  duration: 0.18,
                },
                0.46,
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
        className={`${styles.mobileSignalScene} ${shell.mobileOnly}`}
        data-contact-mobile-signal-scene
        style={
          {
            "--scene-scroll": `${getSceneScrollVh(
              CONTACT_SIGNAL_SCENE.steps.length,
            )}svh`,
          } as SceneStyle
        }
        aria-labelledby="contact-mobile-title"
      >
        <div className={styles.mobileSignalSticky}>
          <div
            className={styles.mobileSignalMedia}
            data-contact-mobile-media
            aria-hidden="true"
          />
          <div
            className={styles.mobileSignalShade}
            data-contact-mobile-shade
            aria-hidden="true"
          />

          <header className={styles.mobileContactHero} data-contact-mobile-hero>
            <p className={shell.eyebrow}>Conversa começa aqui</p>
            <h1 id="contact-mobile-title">
              Vamos entender onde sua operação perde tempo.
            </h1>
            <p>
              Conte o contexto. Em até 24h úteis, a equipe responde e organiza
              o próximo passo com você.
            </p>
            <Link href="#briefing" className={styles.mobileHeroCta}>
              Começar briefing
              <ArrowRight aria-hidden="true" />
            </Link>
          </header>

          <div className={styles.mobileTransmission} aria-hidden="true">
            <span>VOCÊ</span>
            <div>
              <i data-contact-mobile-line />
              <b data-contact-mobile-pulse />
            </div>
            <span>NEXUS</span>
          </div>

          <div className={styles.mobileReceipt} data-contact-mobile-receipt>
            <span>Contexto recebido</span>
            <strong>
              Você fala.
              <br />
              A gente escuta.
            </strong>
            <p>
              Uma pessoa lê seu briefing, identifica o que falta e conduz a
              conversa seguinte.
            </p>
            <Link href="#briefing" className={styles.mobileHeroCta}>
              Contar meu cenário
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        className={`${styles.signalScene} ${shell.desktopOnly}`}
        data-contact-signal-scene
        style={
          {
            "--scene-scroll": `${getSceneScrollVh(CONTACT_SIGNAL_SCENE.steps.length)}svh`,
          } as SceneStyle
        }
        aria-labelledby="contact-title"
      >
        <div className={styles.signalSticky}>
          <div
            className={styles.desktopHeroMedia}
            data-contact-desktop-media
            aria-hidden="true"
          />
          <div className={styles.signalGrid} aria-hidden="true" />

          <header className={styles.heroCopyBlock} data-contact-hero-copy>
            <p className={shell.eyebrow}>Conversa começa aqui</p>
            <h1 id="contact-title">
              Vamos entender onde sua operação perde tempo.
            </h1>
            <p>
              Conte o contexto da sua operação. Em até 24h úteis, a equipe
              responde e organiza o próximo passo com você.
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
            <span>Contexto recebido</span>
            <strong>Agora a gente escuta.</strong>
            <p>Uma pessoa lê seu briefing e conduz a conversa seguinte.</p>
          </div>
        </div>
      </section>

      <section
        id="briefing"
        className={styles.briefingChapter}
        data-contact-briefing
        aria-labelledby="briefing-title"
      >
        <div className={shell.sectionShell}>
          <div className={styles.briefingLayout}>
            <div className={styles.briefingCopy} data-contact-briefing-copy>
              <p className={shell.eyebrow}>Seu contexto</p>
              <h2 id="briefing-title" className={shell.displayTitle}>
                O&nbsp;suficiente pra&nbsp;chegar preparado.
              </h2>
              <p className={shell.sectionDescription}>
                Não precisa escrever um projeto. Diga onde trava, quem é
                impactado e o que você gostaria de melhorar.
              </p>
              <div className={styles.humanStatus}>
                Lido pela equipe responsável pelo diagnóstico
              </div>
            </div>

            <div className={styles.formStage} data-contact-form-stage>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.responseScene} ${shell.desktopOnly}`}
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
            <p className={shell.eyebrow}>Próximos passos</p>
            <h2 id="response-title">Você sabe o que acontece depois.</h2>
            <p>Três retornos claros, com prazo e objetivo.</p>
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

      <section
        className={`${styles.mobileResponseScene} ${shell.mobileOnly}`}
        data-contact-mobile-response-scene
        style={
          {
            "--scene-scroll": `${getSceneScrollVh(
              CONTACT_RESPONSE_SCENE.steps.length,
            )}svh`,
          } as SceneStyle
        }
        aria-labelledby="contact-mobile-response-title"
      >
        <div className={styles.mobileResponseSticky}>
          <header className={styles.mobileResponseHeader}>
            <p className={shell.eyebrow}>Próximos passos</p>
            <h2 id="contact-mobile-response-title">
              Você sabe o que acontece depois.
            </h2>
          </header>

          <div className={styles.mobileResponseStage}>
            {TIMELINE_CONTATO.map((step) => (
              <article
                key={step.n}
                className={styles.mobileResponsePanel}
                data-contact-mobile-response-panel
              >
                <span>{step.prazo}</span>
                <strong>{step.n}</strong>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>

          <div className={styles.mobileResponseRail} aria-hidden="true">
            <div>
              <i data-contact-mobile-response-fill />
            </div>
            {TIMELINE_CONTATO.map((step) => (
              <span key={step.n} data-contact-mobile-response-node>
                {step.n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.epilogue}
        data-contact-epilogue
        aria-labelledby="email-title"
      >
        <div data-contact-epilogue-content>
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
