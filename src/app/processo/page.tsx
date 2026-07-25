import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { BackgroundCanvas } from "@/components/background-canvas";
import { AnimatedItem } from "@/components/animated-section";
import { JsonLd } from "@/components/json-ld";
import { ETAPAS, FAQ_ITEMS, COMPANY } from "@/lib/content";

const TITLE = "Como trabalhamos · Nexus AI";
const DESCRIPTION =
  "Quatro etapas do diagnóstico à entrega contínua. Prazos claros, sem letra miúda. Diagnóstico inicial gratuito, sem compromisso.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${COMPANY.url}/processo` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${COMPANY.url}/processo`,
    siteName: COMPANY.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ProcessoPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-background">
      <JsonLd schema={faqSchema} />
      <BackgroundCanvas variant="processo" />

      {/* Hero */}
      <section className="relative z-10 px-4 sm:px-6 pt-32 md:pt-40 pb-12 text-center max-w-4xl mx-auto">
        <h1 className="tahoe-glass-text block text-5xl md:text-7xl leading-[0.95] mb-6">
          Processo
        </h1>
        <p className="text-lg md:text-xl font-normal text-foreground max-w-2xl mx-auto leading-snug">
          Do diagnóstico à entrega contínua. Quatro etapas, prazos claros, sem letra miúda.
        </p>
      </section>

      {/* 4 etapas */}
      <section className="relative z-10 px-4 sm:px-6 py-12 md:py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-3">
          Quatro etapas, com prazos e entregáveis
        </h2>
        <p className="text-base text-foreground/70 text-center mb-10 max-w-2xl mx-auto">
          Você acompanha cada fase. Sem caixa-preta.
        </p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ETAPAS.map((etapa) => (
            <AnimatedItem
              key={etapa.n}
              as="li"
              className="rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)]"
            >
              <div className="text-3xl font-semibold text-foreground/30 mb-3 leading-none tracking-tighter">
                {etapa.n}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                {etapa.title}
              </h3>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {etapa.prazo}
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed mb-4">
                {etapa.desc}
              </p>
              <ul className="space-y-1.5 border-t border-border/40 pt-3">
                {etapa.entregaveis.map((item) => (
                  <li
                    key={item}
                    className="text-xs text-muted-foreground leading-relaxed flex gap-1.5"
                  >
                    <span aria-hidden className="text-foreground/60">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedItem>
          ))}
        </ol>
      </section>

      {/* FAQ — <details> nativo, sem JS state */}
      <section className="relative z-10 px-4 sm:px-6 py-12 md:py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-3">
          Perguntas comuns
        </h2>
        <p className="text-base text-foreground/70 text-center mb-10">
          Antes de pedir proposta, vale olhar aqui.
        </p>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl bg-card/40 backdrop-blur-md ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)] overflow-hidden"
            >
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
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative z-10 px-4 sm:px-6 py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Pronto pra ver onde dá pra automatizar?
        </h2>
        <p className="text-base text-foreground/70 mb-8 max-w-xl mx-auto">
          Diagnóstico inicial gratuito, sem compromisso. Resposta humana em até 24h úteis.
        </p>
        <Link
          href="/contato"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-8 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Solicitar Proposta
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
