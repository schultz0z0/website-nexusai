import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Clock3,
  Gauge,
  LineChart,
  LockKeyholeOpen,
  PackageSearch,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Workflow,
  Zap,
} from "lucide-react";

import { CinematicValueStage } from "@/components/cinematic-value-stage";
import {
  CopilotMockDashboard,
  StockMockDashboard,
} from "@/components/mock-dashboards";
import { FAQ_HOME, METRICAS } from "@/lib/content";

import styles from "./conversion-home.module.css";

const VALUE_OUTCOMES = [
  {
    icon: Clock3,
    title: "Tempo recuperado",
    description: "Menos horas presas em tarefas operacionais.",
  },
  {
    icon: RefreshCcw,
    title: "Menos retrabalho",
    description: "Fluxos conectados, dados consistentes e menos erro manual.",
  },
  {
    icon: LineChart,
    title: "Mais capacidade para crescer",
    description: "A mesma equipe entrega mais sem inflar a operação.",
  },
] as const;

const FLOW_STEPS = [
  {
    eyebrow: "01 · Diagnóstico",
    title: "Encontramos o gargalo",
    detail: "Processos, filas, dados e custo do trabalho manual.",
    icon: PackageSearch,
  },
  {
    eyebrow: "02 · Automação",
    title: "Construímos o fluxo",
    detail: "IA, integrações e regras sob medida para a sua rotina.",
    icon: Workflow,
  },
  {
    eyebrow: "03 · Resultado",
    title: "Acompanhamos o ganho",
    detail: "Tempo, qualidade e capacidade monitorados em produção.",
    icon: Gauge,
  },
] as const;

const TRUST_POINTS = [
  {
    icon: PackageSearch,
    title: "Diagnóstico antes da proposta",
    description: "Primeiro entendemos o processo. Depois fechamos escopo.",
  },
  {
    icon: LineChart,
    title: "ROI estimado",
    description: "Você sabe o ganho esperado e o que vale priorizar.",
  },
  {
    icon: TimerReset,
    title: "Primeira entrega em 2–3 semanas",
    description: "Valor aparece em ciclos curtos, sem projeto interminável.",
  },
  {
    icon: LockKeyholeOpen,
    title: "Código, dados e documentação seus",
    description: "Stack aberta e operação sem dependência artificial.",
  },
] as const;

export function ConversionHome() {
  return (
    <main className={styles.page}>
      <section
        id="hero"
        data-home-chapter="hero"
        className={styles.hero}
      >
        <div className={styles.heroMedia} data-home-hero-media aria-hidden="true">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/images/cinematic/home-hero-mobile.webp"
            />
            <img
              src="/images/cinematic/home-hero-desktop.webp"
              alt=""
              width={1920}
              height={1081}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.shell}>
          <div className={styles.heroContent}>
            <p className={styles.kicker}>
              <Sparkles aria-hidden="true" />
              Automação inteligente para empresas
            </p>
            <h1>
              Multiplique a capacidade
              <span>da sua equipe com IA</span>
            </h1>
            <p className={styles.heroBody}>
              A Nexus AI encontra gargalos e entrega automações sob medida que
              reduzem retrabalho, aceleram decisões e liberam seu negócio para
              crescer.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/contato">
                Mapear meu gargalo
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link className={styles.secondaryButton} href="/solucoes">
                Ver soluções
                <ChevronRight aria-hidden="true" />
              </Link>
            </div>

            <div className={styles.heroProof} aria-label="Provas de experiência">
              <span>12+ plataformas em produção</span>
              <span>8 setores</span>
              <span>Primeiros ganhos em 4–8 semanas</span>
            </div>
          </div>
        </div>

        <a className={styles.scrollCue} href="#value">
          <span>Como o ganho acontece</span>
          <span className={styles.scrollLine} aria-hidden="true" />
        </a>
      </section>

      <CinematicValueStage className={styles.valueStage}>
        <div className={styles.valueOrbit} data-value-orbit aria-hidden="true" />
        <div className={`${styles.shell} ${styles.valueGrid}`}>
          <div className={styles.valueCopy}>
            <p className={styles.sectionEyebrow}>Da fricção ao resultado</p>
            <h2>
              Seu gargalo vira
              <span>capacidade.</span>
            </h2>
            <p className={styles.valueLead}>
              Mapeamos o trabalho repetitivo, automatizamos o fluxo e
              acompanhamos o resultado. Sua equipe recupera tempo sem trocar
              toda a operação.
            </p>

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
                Sem trocar toda a sua operação
              </span>
              <span>Integração + IA + acompanhamento</span>
            </div>
          </div>
        </div>
      </CinematicValueStage>

      <section
        id="proof"
        data-home-chapter="proof"
        className={styles.proofSection}
      >
        <div className={styles.shell}>
          <div className={styles.proofHeading}>
            <p className={styles.sectionEyebrow}>Experiência em produção</p>
            <h2>IA aplicada onde o trabalho acontece.</h2>
          </div>
          <div className={styles.proofGrid}>
            {METRICAS.map((metric) => (
              <article className={styles.proofCard} key={metric.label}>
                <p>{metric.eyebrow}</p>
                <strong>
                  {metric.prefix}
                  {metric.value}
                  {metric.suffix}
                </strong>
                <h3>{metric.label}</h3>
                <span>{metric.note}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cases"
        data-home-chapter="cases"
        className={styles.casesSection}
      >
        <div className={styles.shell}>
          <div className={styles.casesIntro}>
            <div>
              <p className={styles.sectionEyebrow}>Dois exemplos. Um princípio.</p>
              <h2>Resultado antes da tecnologia.</h2>
            </div>
            <p>
              A solução muda conforme o gargalo. O objetivo é o mesmo: tirar
              trabalho repetitivo do caminho e devolver capacidade para a
              equipe.
            </p>
          </div>

          <article className={styles.caseCard}>
            <div className={styles.caseCopy}>
              <span className={styles.caseIcon}>
                <PackageSearch aria-hidden="true" />
              </span>
              <p className={styles.caseLabel}>Nexus Stock</p>
              <h3>Estoque sem achismo.</h3>
              <p>
                Previsão de demanda, alertas de ruptura e sugestão de compra
                transformam planilhas dispersas em decisões mais rápidas.
              </p>
              <ul>
                <li><Check aria-hidden="true" /> Menos capital parado</li>
                <li><Check aria-hidden="true" /> Menos ruptura surpresa</li>
                <li><Check aria-hidden="true" /> Decisão com contexto</li>
              </ul>
              <Link href="/solucoes">
                Ver como aplicamos
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.productFrame}>
              <StockMockDashboard />
            </div>
          </article>

          <article className={`${styles.caseCard} ${styles.caseCardReverse}`}>
            <div className={styles.caseCopy}>
              <span className={styles.caseIcon}>
                <Bot aria-hidden="true" />
              </span>
              <p className={styles.caseLabel}>Nexus Copilot</p>
              <h3>Marketing sem fila.</h3>
              <p>
                Pesquisa, copy, imagem e análise de concorrência avançam no
                mesmo fluxo. O time aprova, ajusta e publica mais rápido.
              </p>
              <ul>
                <li><Check aria-hidden="true" /> Briefings mais completos</li>
                <li><Check aria-hidden="true" /> Menos espera entre áreas</li>
                <li><Check aria-hidden="true" /> Mais campanhas em movimento</li>
              </ul>
              <Link href="/solucoes">
                Conhecer soluções
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.productFrame}>
              <CopilotMockDashboard />
            </div>
          </article>
        </div>
      </section>

      <section
        id="trust"
        data-home-chapter="trust"
        className={styles.trustSection}
      >
        <div className={styles.shell}>
          <div className={styles.trustHeader}>
            <p className={styles.sectionEyebrow}>Menos risco para começar</p>
            <h2>Clareza antes de compromisso.</h2>
            <p>
              Você entende o que automatizar, em que ordem e com qual impacto
              antes de entrar em uma implementação maior.
            </p>
          </div>
          <div className={styles.trustGrid}>
            {TRUST_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <article className={styles.trustCard} key={point.title}>
                  <Icon aria-hidden="true" />
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </article>
              );
            })}
          </div>
          <div className={styles.trustLink}>
            <ShieldCheck aria-hidden="true" />
            <span>Você mantém o controle da decisão e da operação.</span>
            <Link href="/processo">
              Ver nosso processo
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="cta"
        data-home-chapter="cta"
        className={styles.ctaSection}
      >
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.ctaCard}>
            <p className={styles.sectionEyebrow}>Diagnóstico inicial gratuito</p>
            <h2>Descubra onde sua operação perde tempo e margem.</h2>
            <p>
              Em uma conversa, mapeamos o ponto de maior alavancagem e mostramos
              qual próximo passo faz sentido — inclusive se não for construir
              nada agora.
            </p>
            <div className={styles.ctaActions}>
              <Link className={styles.primaryButton} href="/contato">
                Mapear meu gargalo
                <ArrowRight aria-hidden="true" />
              </Link>
              <span>Sem compromisso · retorno em até 1 dia útil</span>
            </div>
          </div>

          <div className={styles.faq}>
            <div className={styles.faqHeading}>
              <p className={styles.sectionEyebrow}>Perguntas frequentes</p>
              <h2>Decida sem ponto cego.</h2>
            </div>
            <div className={styles.faqList}>
              {FAQ_HOME.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
