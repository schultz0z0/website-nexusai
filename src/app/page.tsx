"use client";

import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Layers,
  GitBranch,
  Users,
  Package,
  Sparkles,
  Bot,
  Zap,
  X,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { PixelHero } from "@/components/ui/pixel-perfect-hero";
import { BackgroundCanvas } from "@/components/background-canvas";
import { JsonLd } from "@/components/json-ld";
import { TiltCard } from "@/components/tilt-card";
import { CountUp } from "@/components/count-up";
import { AnimatedItem } from "@/components/animated-section";
import { ProductShowcase } from "@/components/product-showcase";
import { BentoCapabilities } from "@/components/bento-capabilities";
import {
  StockMockDashboard,
  CopilotMockDashboard,
} from "@/components/mock-dashboards";
import {
  MANIFESTO_CHUNKS,
  METRICAS,
  PILARES,
  STACK,
  CAPABILITIES,
  FAQ_HOME,
  COMPANY,
} from "@/lib/content";

const MANIFESTO_ICONS = { Compass, Zap, X, Users };

// ponytail: metadata is exported from ./metadata.ts (server-only) since page.tsx
// is "use client" and Next disallows metadata export from client components.

const PILLAR_ICONS = { Compass, Layers, GitBranch, Users };
const CAPABILITY_ICONS = { Package, Sparkles, Bot, Compass };

export default function Home() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    url: COMPANY.url,
    email: COMPANY.email,
    description: COMPANY.description,
  };
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: COMPANY.url,
    description: COMPANY.description,
  };

  const bentoCards = CAPABILITIES.map((c) => ({
    ...c,
    icon:
      CAPABILITY_ICONS[c.icon as keyof typeof CAPABILITY_ICONS] ?? Bot,
  }));

  return (
    <>
      <JsonLd schema={[orgSchema, siteSchema]} />

      {/* HERO */}
      <HeroSection />

      {/* MANIFESTO */}
      <ManifestoSection />

      {/* MÉTRICAS */}
      <MetricasSection />

      {/* PILARES */}
      <PilaresSection />

      {/* SHOWCASE: Nexus Stock (3D scroll rotation + mock dashboard) */}
      <ProductShowcase
        badge="01 / 02"
        eyebrow="Produto em produção"
        title="Nexus Stock"
        subtitle="Gestão de estoque com IA. Previsão de demanda, alertas de ruptura antes de acontecer, controle de capital e sugestão automática de compra. Sem planilha, sem achismo."
        mock={<StockMockDashboard />}
      />

      {/* SHOWCASE: Nexus Copilot (3D scroll rotation + mock dashboard) */}
      <ProductShowcase
        badge="02 / 02"
        eyebrow="Produto em produção"
        title="Nexus Copilot"
        subtitle="Copiloto de marketing que gera imagem, copy, pesquisa de mercado, análise de concorrência e insights. Briefings prontos pra aprovar. Integrado com Meta Ads, Google Ads e CRM."
        mock={<CopilotMockDashboard />}
      />

      {/* BENTO — capabilities complementares */}
      <BentoCapabilities
        eyebrow="Capacidades"
        title="Outros sistemas que entregamos"
        subtitle="Estoque e marketing são dois produtos-âncora. A plataforma Nexus AI cobre outras frentes com a mesma abordagem sob medida."
        cards={bentoCards}
      />

      {/* STACK */}
      <StackSection />

      {/* CTA FINAL */}
      <CtaFinalSection />

      {/* FAQ */}
      <FaqSection />
    </>
  );
}

/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <div className="relative w-full">
      <BackgroundCanvas variant="home" />
      <PixelHero
        word1="Sua equipe"
        word2="multiplicada"
        description="Plataformas e agentes da Nexus AI assumem o trabalho repetitivo, do atendimento à análise. Sua equipe fica livre pro que só humano faz: decidir, criar, crescer."
        primaryCta="Solicitar Proposta"
        primaryCtaMobile="Proposta"
        secondaryCta="Ver processo"
        secondaryCtaMobile="Processo"
        primaryHref="/contato"
        githubUrl="/processo"
      />
      {/* Trust strip — pequeno, logo abaixo do hero */}
      <div className="relative z-10 px-4 pb-12 md:pb-16 text-center">
        <p className="text-xs md:text-sm text-foreground/55 uppercase tracking-[0.18em]">
          Plataforma e agentes em produção · Resposta humana em até 24h úteis · Sem lock-in
        </p>
      </div>
    </div>
  );
}

/**
 * Manifesto: scroll-pinned story (estilo Apple product page).
 * A seção é 4 viewports de altura; dentro dela um painel sticky h-screen
 * cicla 1→2→3→4 conforme o scroll, com flip 3D por palavra em cada frase.
 * Só libera o scroll normal depois da quarta frase.
 *
 * Mobile usa h-[400svh] + sticky h-[100svh] pra não pular com address bar.
 * ponytail: sem libs novas — só useScroll + useTransform. Teto: 4 cenas;
 * se crescer, calcular ranges dinâmico via MANIFESTO_CHUNKS.length.
 */
function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // Bounds em ref mutável (não re-renderiza). useScroll+offset+sticky buga
  // no framer — mede manualmente. range = 0: top da seção no top do viewport;
  // 1: bottom da seção no bottom do viewport. Recalcula no resize.
  const bounds = useRef<{ start: number; end: number }>({ start: 0, end: 1 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      if (!ref.current) return;
      const top = ref.current.offsetTop;
      const h = ref.current.offsetHeight;
      const vh = window.innerHeight;
      bounds.current = { start: top, end: top + h - vh };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const progress = useTransform(scrollY, (y) => {
    const { start, end } = bounds.current;
    if (end <= start) return 0;
    return Math.min(1, Math.max(0, (y - start) / (end - start)));
  });

  return (
    <section
      ref={ref}
      // 5 viewports = 1.25vh por cena. Sem wallpaper, o conteúdo cabe
      // confortavelmente em 1 viewport sticky; range extra só pro scroll
      // pin funcionar.
      className="relative z-10 h-[500svh] md:h-[500vh]"
      aria-label="Manifesto Nexus AI"
    >
      <div className="sticky top-0 h-[100svh] md:h-screen overflow-hidden flex items-center">
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedItem className="absolute -top-10 md:-top-14 left-4 sm:left-6 text-xs md:text-sm font-semibold text-foreground/55 uppercase tracking-[0.2em]">
            Por que Nexus AI
          </AnimatedItem>

          <ProgressDots progress={progress} />

          <div className="relative w-full">
            {MANIFESTO_CHUNKS.map((chunk, i) => {
              const Icon =
                MANIFESTO_ICONS[chunk.icon as keyof typeof MANIFESTO_ICONS];
              const start = i / MANIFESTO_CHUNKS.length;
              const end = (i + 1) / MANIFESTO_CHUNKS.length;
              return (
                <ManifestoScene
                  key={chunk.n}
                  n={chunk.n}
                  title={chunk.title}
                  text={chunk.text}
                  Icon={Icon}
                  start={start}
                  end={end}
                  progress={progress}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 4 dots no topo direito. Dot ativo "enche" conforme o scroll cruza a faixa. */
function ProgressDots({
  progress,
}: {
  progress: import("framer-motion").MotionValue<number>;
}) {
  return (
    <div
      aria-hidden
      className="absolute top-0 right-4 sm:right-6 flex items-center gap-1.5"
    >
      {MANIFESTO_CHUNKS.map((_, i) => {
        const start = i / MANIFESTO_CHUNKS.length;
        const end = (i + 1) / MANIFESTO_CHUNKS.length;
        return (
          <ProgressDot key={i} start={start} end={end} progress={progress} />
        );
      })}
    </div>
  );
}

function ProgressDot({
  start,
  end,
  progress,
}: {
  start: number;
  end: number;
  progress: import("framer-motion").MotionValue<number>;
}) {
  // Barra enche só na PRIMEIRA metade do range; a partir de 50% fica cheia.
  // A "barra na metade" significa "texto já formado 100%" → leitura nos
  // 50% finais. Com clamp: true, fora do range o valor é 0 (antes) ou 1
  // (depois) conforme apropriado.
  const mid = start + (end - start) * 0.5;
  const fill = useTransform(
    progress,
    [start, mid, end],
    [0, 1, 1],
    { clamp: true },
  );
  return (
    <span className="relative inline-block h-1 w-6 rounded-full bg-foreground/15 overflow-hidden">
      <motion.span
        style={{ scaleX: fill }}
        className="absolute inset-0 origin-left bg-foreground/60"
      />
    </span>
  );
}

/**
 * Cena individual. Empilhada absolute; visibility + translate + blur
 * atrelados a [start, end] do scrollYProgress. Dentro do texto, flip 3D
 * por palavra proporcional ao range da cena.
 *
 * ponytail: opacity 0→1→1→0 em [start-0.05, start+0.05, end-0.05, end+0.05]
 * suaviza overlap entre cenas. Overlap de 0.05 = 5% do scroll por cena.
 */
function ManifestoScene({
  n,
  title,
  text,
  Icon,
  start,
  end,
  progress,
}: {
  n: string;
  title: string;
  text: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  start: number;
  end: number;
  progress: import("framer-motion").MotionValue<number>;
}) {
  // Cena 1: visível desde o início.
  // Cena 4: trava no final.
  // Cenas 2-3: fade-in 30% do range da cena, fade-out 15%. Janela leitura
  // (opacity 1) = 30% → 85% do range = 55%.
  // 50% do range = cena 100% + flip 3D concluído + barra ProgressDot cheia.
  const isFirst = start === 0;
  const isLast = end === 1;
  const range = end - start;
  const fadeIn = isFirst ? 0 : range * 0.3;
  const fadeOut = isLast ? 0 : range * 0.15;
  const opacity = useTransform(
    progress,
    isFirst
      ? [0, 0, end - fadeOut, end]
      : isLast
        ? [0, start, start + fadeIn, end, 1]
        : [0, start, start + fadeIn, end - fadeOut, end],
    isFirst
      ? [1, 1, 1, 0]
      : isLast
        ? [0, 0, 1, 1, 1]
        : [0, 0, 1, 1, 0],
    { clamp: true },
  );
  const y = useTransform(
    progress,
    isFirst
      ? [0, 0, end - fadeOut, end]
      : isLast
        ? [0, start, start + fadeIn, end, 1]
        : [0, start, start + fadeIn, end - fadeOut, end],
    isFirst
      ? [0, 0, 0, -60]
      : isLast
        ? [60, 60, 0, 0, 0]
        : [60, 60, 0, 0, -60],
    { clamp: true },
  );

  const words = text.split(/(\s+)/);
  const wordCount = words.filter((x) => !/\s+/.test(x)).length;

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-12 items-center"
    >
      <div className="flex md:flex-col items-start gap-4 md:gap-3">
        <span className="text-5xl md:text-6xl font-semibold text-foreground/30 tabular-nums tracking-tighter leading-none">
          {n}
        </span>
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground/[0.05] ring-1 ring-border/60 text-foreground/65">
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/55">
            {title}
          </span>
        </div>
      </div>

      <p
        className="relative text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.2] text-foreground"
        style={{ perspective: "1200px" }}
      >
        {words.map((w, i) => {
          if (/\s+/.test(w)) return <span key={i}>{w}</span>;
          const wordIdx = words
            .slice(0, i)
            .filter((x) => !/\s+/.test(x)).length;
          // Cena 1: palavras estáticas, sem flip 3D (já devem estar visíveis
          // ao entrar na seção). Cenas 2-4: flip 3D scroll-linked com clamp
          // pra não virem fantasma em progress=0.
          if (start === 0) {
            return (
              <span key={i} className="inline-block">
                {w}
              </span>
            );
          }
          // Flip 3D cobre só a PRIMEIRA METADE do range da cena. Nos 50%
          // finais, palavras já estão 100% formadas (rotateX 0, opacity 1)
          // — coincide com a barra do ProgressDot cheia. Leitura nos 50%
          // finais é ininterrupta.
          const wStart = start + (wordIdx / wordCount) * 0.5 * (end - start);
          const wEnd = start + ((wordIdx + 1) / wordCount) * 0.5 * (end - start);
          return (
            <ScrollWord
              key={i}
              start={wStart}
              end={wEnd}
              progress={progress}
            >
              {w}
            </ScrollWord>
          );
        })}
      </p>
    </motion.div>
  );
}

/**
 * Palavra com flip 3D scroll-linked. rotateX 90°→0° + opacity 0.15→1 + y 14→0
 * mapeado para [start, end] do scrollYProgress dividido por palavra.
 * ponytail: ~30 instâncias por linha × 4 linhas = 120 nodes. Framer lida
 * bem. Teto conhecido: 8 linhas; acima disso, agrupar chunks.
 */
function ScrollWord({
  start,
  end,
  progress,
  initialVisible = false,
  children,
}: {
  start: number;
  end: number;
  progress: import("framer-motion").MotionValue<number>;
  /** cena 1: palavras já visíveis no start, sem flip 3D (range do scroll). */
  initialVisible?: boolean;
  children: string;
}) {
  // initialVisible: cena 1 nasce visível. Se o progress ficar < start (cross
  // fade da cena anterior), mantém rotateX 0 / opacity 1 — não vira fantasma.
  const rotateX = useTransform(
    progress,
    [start, end],
    [90, 0],
    { clamp: true },
  );
  const opacity = useTransform(
    progress,
    [start, end],
    [0.15, 1],
    { clamp: true },
  );
  const y = useTransform(
    progress,
    [start, end],
    [14, 0],
    { clamp: true },
  );
  return (
    <motion.span
      style={{
        rotateX: initialVisible ? 0 : rotateX,
        opacity: initialVisible ? 1 : opacity,
        y: initialVisible ? 0 : y,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 100%",
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

function MetricasSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
      <AnimatedItem className="text-center mb-12">
        <span className="text-xs md:text-sm font-semibold text-foreground/55 uppercase tracking-[0.2em]">
          Onde estamos hoje
        </span>
      </AnimatedItem>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {METRICAS.map((m, i) => (
          <AnimatedItem
            key={m.label}
            offset={24}
            delay={i * 0.08}
            className="rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 text-center"
          >
            <div className="text-3xl md:text-5xl font-semibold text-foreground tracking-tighter tabular-nums">
              <CountUp to={m.value} suffix={m.suffix} duration={1.4} />
            </div>
            <div className="text-xs md:text-sm text-foreground/65 mt-2 leading-snug">
              {m.label}
            </div>
          </AnimatedItem>
        ))}
      </div>
    </section>
  );
}

function PilaresSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
      <AnimatedItem className="text-center mb-12">
        <span className="text-xs md:text-sm font-semibold text-foreground/55 uppercase tracking-[0.2em]">
          Como a gente pensa
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mt-3">
          Quatro princípios que guiam cada projeto
        </h2>
      </AnimatedItem>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PILARES.map((p, i) => {
          const Icon =
            PILLAR_ICONS[p.icon as keyof typeof PILLAR_ICONS];
          return (
            <AnimatedItem
              key={p.title}
              offset={24}
              delay={i * 0.06}
            >
              <TiltCard
                tiltLimit={8}
                scale={1.02}
                className="rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.3)] h-full"
              >
                <Icon
                  className="w-6 h-6 text-foreground/85 mb-4"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {p.desc}
                </p>
              </TiltCard>
            </AnimatedItem>
          );
        })}
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 md:py-24 max-w-5xl mx-auto">
      <AnimatedItem className="text-center mb-10">
        <span className="text-xs md:text-sm font-semibold text-foreground/55 uppercase tracking-[0.2em]">
          Stack aberta
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mt-3">
          As tecnologias que a gente usa
        </h2>
        <p className="text-base text-foreground/70 mt-3 max-w-xl mx-auto">
          Sem lock-in. Você fica com o código, os dados e a documentação.
        </p>
      </AnimatedItem>
      <div className="flex flex-wrap justify-center gap-3">
        {STACK.map((tech, i) => (
          <AnimatedItem
            key={tech}
            offset={20}
            delay={i * 0.04}
            className="px-4 py-2 rounded-full bg-card/40 backdrop-blur-md ring-1 ring-border/50 text-sm font-medium text-foreground/85"
          >
            {tech}
          </AnimatedItem>
        ))}
      </div>
    </section>
  );
}

function CtaFinalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  return (
    <motion.section
      ref={ref}
      style={{ scale }}
      className="relative z-10 px-4 sm:px-6 py-24 md:py-32"
    >
      <div className="max-w-3xl mx-auto text-center rounded-2xl bg-gradient-to-b from-card/60 to-card/30 backdrop-blur-md p-10 md:p-16 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.4)]">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4 leading-tight">
          Pronto pra ver onde dá pra automatizar?
        </h2>
        <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8 max-w-xl mx-auto">
          Diagnóstico inicial gratuito, sem compromisso. Resposta humana em até 24h úteis.
        </p>
        <Link
          href="/contato"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-8 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Solicitar Proposta
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.section>
  );
}

function FaqSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 md:py-24 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
        Perguntas comuns
      </h2>
      <div className="space-y-2">
        {FAQ_HOME.map((item, i) => (
          <AnimatedItem
            key={item.q}
            as="div"
            offset={16}
            delay={i * 0.05}
            className="rounded-xl bg-card/40 backdrop-blur-md ring-1 ring-border/50 overflow-hidden"
          >
            <details className="group">
              <summary className="cursor-pointer list-none px-5 py-4 text-base font-medium text-foreground flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className="text-foreground/60 text-xl leading-none transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm text-foreground/85 leading-relaxed">
                {item.a}
              </div>
            </details>
          </AnimatedItem>
        ))}
      </div>
    </section>
  );
}
