import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { BackgroundCanvas } from "@/components/background-canvas";
import { AnimatedItem } from "@/components/animated-section";
import { JsonLd } from "@/components/json-ld";
import { AREAS, PRA_QUEM_E, PRA_QUEM_NAO_E, COMPANY } from "@/lib/content";

const TITLE = "Soluções de IA para sua empresa · Nexus AI";
const DESCRIPTION =
  "Atendimento, marketing, estoque, dados, integração e operações internas. Plataformas e agentes de IA sob medida pra cada contexto. Diagnóstico inicial gratuito.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${COMPANY.url}/solucoes` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${COMPANY.url}/solucoes`,
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

export default function SolucoesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Soluções de IA sob medida",
    provider: { "@type": "Organization", name: COMPANY.name },
    description: DESCRIPTION,
    areaServed: "BR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Áreas de atuação",
      itemListElement: AREAS.map((area, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: area.title,
          description: area.desc,
        },
      })),
    },
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-background">
      <JsonLd schema={serviceSchema} />
      <BackgroundCanvas variant="solucoes" />

      {/* Hero */}
      <section className="relative z-10 px-4 sm:px-6 pt-32 md:pt-40 pb-12 text-center max-w-4xl mx-auto">
        <h1 className="tahoe-glass-text block text-5xl md:text-7xl leading-[0.95] mb-6">
          Soluções
        </h1>
        <p className="text-lg md:text-xl font-normal text-foreground max-w-2xl mx-auto leading-snug">
          Atendimento, marketing, estoque, dados, integração e operações internas. Cada uma, sob medida pro seu contexto.
        </p>
      </section>

      {/* Áreas — 6 cards */}
      <section className="relative z-10 px-4 sm:px-6 py-12 md:py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
          Áreas onde entregamos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <AnimatedItem
                key={area.title}
                className="rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)]"
              >
                <Icon className="w-6 h-6 text-foreground/85 mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-foreground mb-1.5">
                  {area.title}
                </h3>
                <p className="text-sm text-foreground/85 mb-3 leading-relaxed">
                  {area.desc}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Exemplo: {area.example}
                </p>
              </AnimatedItem>
            );
          })}
        </div>
      </section>

      {/* Pra quem é / Pra quem não é */}
      <section className="relative z-10 px-4 sm:px-6 py-12 md:py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-3">
          É pra Nexus AI?
        </h2>
        <p className="text-base text-foreground/70 text-center mb-10 max-w-2xl mx-auto">
          Veja se sua empresa se encaixa antes de preencher o formulário.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pra quem é */}
          <div className="rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)]">
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              Pra quem é
            </h3>
            <ul className="space-y-2.5">
              {PRA_QUEM_E.map((item) => (
                <li key={item} className="text-sm text-foreground/85 leading-relaxed flex gap-2">
                  <span aria-hidden className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Pra quem não é */}
          <div className="rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)]">
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <span aria-hidden className="inline-block w-2 h-2 rounded-full bg-rose-400" />
              Pra quem não é
            </h3>
            <ul className="space-y-2.5">
              {PRA_QUEM_NAO_E.map((item) => (
                <li key={item} className="text-sm text-foreground/85 leading-relaxed flex gap-2">
                  <span aria-hidden className="text-rose-400 mt-0.5 flex-shrink-0">×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative z-10 px-4 sm:px-6 py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Pronto pra começar?
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
