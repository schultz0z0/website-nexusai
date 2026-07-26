"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Compass,
  GitBranch,
  Layers,
  Package,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MetricCard } from "@/components/metric-card";
import {
  CopilotMockDashboard,
  StockMockDashboard,
} from "@/components/mock-dashboards";
import {
  CAPABILITIES,
  FAQ_HOME,
  METRICAS,
  PILARES,
  STACK,
} from "@/lib/content";
import {
  HOME_CHAPTERS,
  getHomeMotionMode,
} from "@/lib/home-narrative";

import styles from "./cinematic-home-continuation.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLAR_ICONS: Record<string, LucideIcon> = {
  Compass,
  Layers,
  GitBranch,
  Users,
};

const CAPABILITY_ICONS: Record<string, LucideIcon> = {
  Package,
  Sparkles,
  Bot,
  Compass,
};

const MAP_PLACEMENTS = [
  styles.mapCardTopLeft,
  styles.mapCardTopRight,
  styles.mapCardBottomLeft,
  styles.mapCardBottomRight,
];

type IndexedStyle = CSSProperties & { "--layer-index": number };

export function CinematicHomeContinuation() {
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
          const mode = getHomeMotionMode({
            desktop: Boolean(conditions?.desktop),
            reducedMotion: Boolean(conditions?.reduced),
          });

          if (mode === "static") return;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: "[data-home-chapter='metrics']",
                start: "top 88%",
                end: "top 24%",
                scrub: 0.6,
              },
            })
            .fromTo(
              "[data-bridge-line]",
              { scaleX: 0.18, opacity: 0.35 },
              { scaleX: 1, opacity: 1, ease: "none" },
            )
            .fromTo(
              "[data-metric-card]",
              { y: 44, scale: 0.94, opacity: 0.35 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                stagger: 0.12,
                ease: "power2.out",
              },
              0.08,
            )
            .fromTo(
              "[data-metric-node]",
              { scale: 0.65, opacity: 0 },
              { scale: 1, opacity: 1, ease: "back.out(1.5)" },
              0.24,
            );

          gsap.fromTo(
            "[data-principle-layer]",
            { y: 52, opacity: 0.45 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "[data-home-chapter='principles']",
                start: "top 82%",
                end: "top 28%",
                scrub: 0.6,
              },
            },
          );

          gsap.utils
            .toArray<HTMLElement>("[data-product-chapter]")
            .forEach((section) => {
              const frame = section.querySelector("[data-product-frame]");
              const copy = section.querySelector("[data-product-copy]");
              const reverse = section.dataset.direction === "reverse";

              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: section,
                    start: "top 82%",
                    end: "center 48%",
                    scrub: 0.7,
                  },
                })
                .fromTo(
                  copy,
                  { x: reverse ? 54 : -54, opacity: 0.3 },
                  { x: 0, opacity: 1, ease: "power2.out" },
                )
                .fromTo(
                  frame,
                  {
                    y: 72,
                    rotateX: 7,
                    rotateY: reverse ? -8 : 8,
                    scale: 0.9,
                    opacity: 0.28,
                  },
                  {
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    opacity: 1,
                    ease: "power2.out",
                  },
                  0,
                );
            });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: "[data-home-chapter='capabilities']",
                start: "top 78%",
                end: "center 58%",
                scrub: 0.65,
              },
            })
            .fromTo(
              "[data-map-path]",
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, stagger: 0.08, ease: "none" },
            )
            .fromTo(
              "[data-map-node]",
              { y: 28, scale: 0.94, opacity: 0.2 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                stagger: 0.08,
                ease: "power2.out",
              },
              0.12,
            );

          gsap.fromTo(
            "[data-stack-item]",
            { y: 18, opacity: 0.35 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "[data-home-chapter='stack']",
                start: "top 82%",
                end: "center 72%",
                scrub: 0.5,
              },
            },
          );

          gsap
            .timeline({
              scrollTrigger: {
                trigger: "[data-home-chapter='cta']",
                start: "top 84%",
                end: "center 54%",
                scrub: 0.6,
              },
            })
            .fromTo(
              "[data-cta-horizon]",
              { scaleX: 0.08, opacity: 0.3 },
              { scaleX: 1, opacity: 1, ease: "none" },
            )
            .fromTo(
              "[data-cta-content]",
              { y: 48, opacity: 0.25 },
              { y: 0, opacity: 1, ease: "power2.out" },
              0.16,
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
      className={styles.root}
      data-home-chapters={HOME_CHAPTERS.map((chapter) => chapter.id).join(",")}
    >
      <MetricsChapter />
      <PrinciplesChapter />
      <ProductChapter
        id="stock"
        index="01 / 02"
        title="Nexus Stock"
        description="Gestão de estoque com IA. Previsão de demanda, alertas de ruptura antes de acontecer, controle de capital e sugestão automática de compra. Sem planilha, sem achismo."
        mock={<StockMockDashboard />}
      />
      <ProductChapter
        id="copilot"
        index="02 / 02"
        title="Nexus Copilot"
        description="Copiloto de marketing que gera imagem, copy, pesquisa de mercado, análise de concorrência e insights. Briefings prontos pra aprovar. Integrado com Meta Ads, Google Ads e CRM."
        mock={<CopilotMockDashboard />}
        reverse
      />
      <CapabilitiesChapter />
      <StackChapter />
      <CtaChapter />
      <FaqChapter />
    </main>
  );
}

function MetricsChapter() {
  return (
    <section
      className={`${styles.chapter} ${styles.metricsChapter}`}
      data-home-chapter="metrics"
      aria-labelledby="metrics-title"
    >
      <div className={styles.bridge} aria-hidden="true">
        <div className={styles.bridgeGlow} />
        <div className={styles.bridgeLine} data-bridge-line />
      </div>
      <div className={styles.sectionShell}>
        <header className={styles.chapterHeader}>
          <p className={styles.eyebrow}>Onde estamos hoje</p>
          <h2 id="metrics-title" className={styles.srOnly}>
            Prova operacional da Nexus AI
          </h2>
        </header>
        <div className={styles.metricsFrame}>
          <div className={styles.metricsGrid}>
            {METRICAS.map((metric) => (
              <div key={metric.label} data-metric-card>
                <MetricCard
                  icon={metric.icon}
                  eyebrow={metric.eyebrow}
                  value={metric.value}
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                  label={metric.label}
                  note={metric.note}
                  className={styles.metricCard}
                />
              </div>
            ))}
          </div>
          <div className={styles.metricNode} data-metric-node aria-hidden="true">
            N
          </div>
        </div>
      </div>
    </section>
  );
}

function PrinciplesChapter() {
  return (
    <section
      className={`${styles.chapter} ${styles.principlesChapter}`}
      data-home-chapter="principles"
      aria-labelledby="principles-title"
    >
      <div className={styles.sectionShell}>
        <header className={styles.principlesHeader}>
          <p className={styles.eyebrow}>Como a gente pensa</p>
          <h2 id="principles-title" className={styles.displayTitle}>
            Quatro princípios que guiam cada projeto
          </h2>
        </header>
        <div className={styles.principleLayers}>
          {PILARES.map((pillar, index) => {
            const Icon = PILLAR_ICONS[pillar.icon] ?? Compass;
            return (
              <article
                key={pillar.title}
                className={styles.principleLayer}
                style={{ "--layer-index": index } as IndexedStyle}
                data-principle-layer
              >
                <div className={styles.principleIndex}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className={styles.principleIcon} aria-hidden="true">
                  <Icon />
                </div>
                <div className={styles.principleCopy}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductChapter({
  id,
  index,
  title,
  description,
  mock,
  reverse = false,
}: {
  id: "stock" | "copilot";
  index: string;
  title: string;
  description: string;
  mock: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section
      className={`${styles.chapter} ${styles.productChapter} ${
        reverse ? styles.productReverse : ""
      }`}
      data-home-chapter={id}
      data-product-chapter
      data-direction={reverse ? "reverse" : "forward"}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.productSignal} aria-hidden="true" />
      <div className={styles.productSticky}>
        <div className={styles.productCopy} data-product-copy>
          <p className={styles.productIndex}>{index}</p>
          <p className={styles.eyebrow}>Produto em produção</p>
          <h2 id={`${id}-title`} className={styles.productTitle}>
            {title}
          </h2>
          <p className={styles.productDescription}>{description}</p>
        </div>
        <div className={styles.productStage}>
          <div className={styles.productFrame} data-product-frame>
            <div className={styles.productRim} aria-hidden="true" />
            <div className={styles.productMock}>{mock}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilitiesChapter() {
  return (
    <section
      className={`${styles.chapter} ${styles.capabilitiesChapter}`}
      data-home-chapter="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className={styles.sectionShell}>
        <header className={styles.capabilitiesHeader}>
          <p className={styles.eyebrow}>Capacidades</p>
          <h2 id="capabilities-title" className={styles.displayTitle}>
            Outros sistemas que entregamos
          </h2>
          <p className={styles.sectionDescription}>
            Estoque e marketing são dois produtos-âncora. A plataforma Nexus
            AI cobre outras frentes com a mesma abordagem sob medida.
          </p>
        </header>
        <div className={styles.systemMap}>
          <svg
            className={styles.mapLines}
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path data-map-path pathLength="1" d="M500 260 C420 260 420 120 260 120" />
            <path data-map-path pathLength="1" d="M500 260 C580 260 580 120 740 120" />
            <path data-map-path pathLength="1" d="M500 260 C420 260 420 400 260 400" />
            <path data-map-path pathLength="1" d="M500 260 C580 260 580 400 740 400" />
          </svg>
          <div className={styles.mapCenter} aria-hidden="true">
            N
          </div>
          {CAPABILITIES.map((capability, index) => {
            const Icon = CAPABILITY_ICONS[capability.icon] ?? Bot;
            const content = (
              <>
                <div className={styles.mapCardTopline}>
                  <span className={styles.mapIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  {index < 2 ? (
                    <span className={styles.liveState}>
                      <span />
                      Ativo
                    </span>
                  ) : null}
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.desc}</p>
                {capability.cta ? (
                  <span className={styles.mapLinkLabel}>
                    {capability.cta.label}
                    <ArrowRight aria-hidden="true" />
                  </span>
                ) : null}
              </>
            );
            const className = `${styles.mapCard} ${MAP_PLACEMENTS[index]}`;

            return capability.cta ? (
              <Link
                key={capability.title}
                href={capability.cta.href}
                className={className}
                data-map-node
              >
                {content}
              </Link>
            ) : (
              <article
                key={capability.title}
                className={className}
                data-map-node
              >
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StackChapter() {
  return (
    <section
      className={`${styles.chapter} ${styles.stackChapter}`}
      data-home-chapter="stack"
      aria-labelledby="stack-title"
    >
      <div className={styles.stackShell}>
        <header className={styles.stackHeader}>
          <p className={styles.eyebrow}>Stack aberta</p>
          <h2 id="stack-title" className={styles.stackTitle}>
            As tecnologias que a gente usa
          </h2>
          <p className={styles.sectionDescription}>
            Sem lock-in. Você fica com o código, os dados e a documentação.
          </p>
        </header>
        <div className={styles.stackPipeline}>
          {STACK.map((technology) => (
            <span key={technology} data-stack-item>
              {technology}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaChapter() {
  return (
    <section
      className={`${styles.chapter} ${styles.ctaChapter}`}
      data-home-chapter="cta"
      aria-labelledby="cta-title"
    >
      <div className={styles.ctaHorizon} data-cta-horizon aria-hidden="true" />
      <div className={styles.ctaGrid} aria-hidden="true" />
      <div className={styles.ctaContent} data-cta-content>
        <h2 id="cta-title">Pronto pra ver onde dá pra automatizar?</h2>
        <p>
          Diagnóstico inicial gratuito, sem compromisso. Resposta humana em até
          24h úteis.
        </p>
        <Link href="/contato" className={styles.ctaButton}>
          Solicitar Proposta
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function FaqChapter() {
  return (
    <section
      className={`${styles.chapter} ${styles.faqChapter}`}
      data-home-chapter="faq"
      aria-labelledby="faq-title"
    >
      <div className={styles.faqShell}>
        <h2 id="faq-title">Perguntas comuns</h2>
        <div className={styles.faqList}>
          {FAQ_HOME.map((item) => (
            <details key={item.q}>
              <summary>
                <span>{item.q}</span>
                <span className={styles.faqPlus} aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <div className={styles.epilogueLine} aria-hidden="true" />
    </section>
  );
}
