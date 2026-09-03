import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  Gauge,
  LineChart,
  PackageSearch,
  RefreshCcw,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { CinematicValueStage } from "@/components/cinematic-value-stage";
import { CustomCapabilities } from "@/components/home/custom-capabilities";
import { DecisionAssurances } from "@/components/home/decision-assurances";
import { FinalConversion } from "@/components/home/final-conversion";
import { FunctionalDemos } from "@/components/home/functional-demos";
import { TechnologyStrip } from "@/components/home/technology-strip";
import { HOME_COPY } from "@/lib/content";

import styles from "./conversion-home.module.css";

const VALUE_ICONS: readonly LucideIcon[] = [Clock3, RefreshCcw, LineChart];
const FLOW_ICONS: readonly LucideIcon[] = [PackageSearch, Workflow, Gauge];

const VALUE_OUTCOMES = HOME_COPY.value.outcomes.map((outcome, index) => ({
  ...outcome,
  icon: VALUE_ICONS[index],
}));

const FLOW_STEPS = HOME_COPY.value.flow.map((step, index) => ({
  eyebrow: step.step,
  title: step.title,
  detail: step.description,
  icon: FLOW_ICONS[index],
}));

export function ConversionHome() {
  return (
    <main className={styles.page}>
      <section
        id="hero"
        data-home-chapter="hero"
        className={styles.hero}
      >
        <div className={styles.heroMedia} data-home-hero-media aria-hidden="true">
          <Image
            data-home-hero-poster
            src="/images/cinematic/home-hero-touch-desktop.webp"
            alt=""
            width={1672}
            height={941}
            sizes="100vw"
            quality={90}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div
          className={styles.grain}
          data-home-hero-grain
          aria-hidden="true"
        />
        <div
          className={styles.heroGlow}
          data-home-hero-ambient
          aria-hidden="true"
        />

        <div className={styles.shell}>
          <div className={styles.heroContent}>
            <h1>
              Multiplique a capacidade{" "}
              <span>da sua equipe com IA</span>
            </h1>
            <p className={styles.heroBody}>
              Automações e agentes sob medida que eliminam tarefas repetitivas
              e ampliam a capacidade da sua equipe.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/contato" data-track-cta="hero_contact">
                Descobrir onde aplicar IA
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TechnologyStrip />

      <CinematicValueStage className={styles.valueStage}>
        <div className={styles.valueOrbit} data-value-orbit aria-hidden="true" />
        <div className={`${styles.shell} ${styles.valueGrid}`}>
          <div className={styles.valueCopy}>
            <p className={styles.sectionEyebrow}>{HOME_COPY.value.eyebrow}</p>
            <h2>
              {HOME_COPY.value.title[0]}
              <span>{HOME_COPY.value.title[1]}</span>
            </h2>
            <p className={styles.valueLead}>{HOME_COPY.value.lead}</p>

            <div className={styles.outcomeList}>
              {VALUE_OUTCOMES.map((outcome) => {
                const Icon = outcome.icon;
                return (
                  <div className={styles.outcome} key={outcome.title}>
                    <span className={styles.outcomeIcon}>
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{outcome.title}</strong>
                      <small>{outcome.description}</small>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.flowPanel} data-value-flow>
            <div className={styles.flowHeader}>
              <div>
                <span className={styles.liveDot} aria-hidden="true" />
                Operação conectada
              </div>
              <span>Impacto acompanhável</span>
            </div>
            <div className={styles.flowBody}>
              {FLOW_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    className={styles.flowStep}
                    data-value-step
                    key={step.title}
                  >
                    <span className={styles.flowIcon}>
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <small>{step.eyebrow}</small>
                      <strong>{step.title}</strong>
                      <p>{step.detail}</p>
                    </div>
                    <span className={styles.flowCheck}>
                      <Check aria-hidden="true" />
                    </span>
                    {index < FLOW_STEPS.length - 1 ? (
                      <span className={styles.flowConnector} aria-hidden="true" />
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className={styles.flowFooter}>
              <span>
                <Zap aria-hidden="true" />
                {HOME_COPY.value.guardrail}
              </span>
              <span>Integração + IA + acompanhamento</span>
            </div>
          </div>
        </div>
      </CinematicValueStage>

      <CustomCapabilities />
      <FunctionalDemos />
      <DecisionAssurances />
      <FinalConversion />
    </main>
  );
}
