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
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  MANIFESTO,
  METRICAS,
  PILARES,
  STACK,
  CAPABILITIES,
  FAQ_HOME,
  COMPANY,
} from "@/lib/content";

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

function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Parallax sutil: o bloco inteiro move devagar contra o scroll
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.section
      ref={ref}
      style={{ y }}
      className="relative z-10 px-4 sm:px-6 py-24 md:py-40 max-w-4xl mx-auto text-center"
    >
      <AnimatedItem className="text-xs md:text-sm font-semibold text-foreground/55 uppercase tracking-[0.2em] mb-6 block">
        Por que Nexus AI
      </AnimatedItem>
      <AnimatedItem
        offset={30}
        delay={0.05}
        className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-foreground"
      >
        {MANIFESTO}
      </AnimatedItem>
    </motion.section>
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
