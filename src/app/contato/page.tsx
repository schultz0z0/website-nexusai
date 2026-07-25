import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { BackgroundCanvas } from "@/components/background-canvas";
import { AnimatedItem } from "@/components/animated-section";
import { JsonLd } from "@/components/json-ld";
import { TIMELINE_CONTATO, COMPANY } from "@/lib/content";
import { ContactForm } from "./contact-form";

const TITLE = "Solicitar Proposta · Nexus AI";
const DESCRIPTION =
  "Diagnóstico inicial gratuito, sem compromisso. Resposta humana em até 24h úteis.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${COMPANY.url}/contato` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${COMPANY.url}/contato`,
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

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: TITLE,
  description: DESCRIPTION,
  url: `${COMPANY.url}/contato`,
  contactOption: {
    "@type": "ContactOption",
    contactType: "sales",
    email: COMPANY.email,
    availableLanguage: ["pt-BR"],
  },
};

export default function ContatoPage() {
  return (
    <div className="relative w-full min-h-[100dvh] bg-background">
      <JsonLd schema={contactSchema} />
      <BackgroundCanvas variant="contato" />

      <section className="relative z-10 px-4 sm:px-6 pt-32 md:pt-40 pb-12 max-w-2xl mx-auto">
        <h1 className="tahoe-glass-text block text-5xl md:text-7xl leading-[0.95] mb-6 text-center">
          Contato
        </h1>
        <p className="text-base md:text-lg text-foreground/80 text-center mb-10 leading-snug">
          Conte rapidamente seu cenário. Respondemos em até 24h úteis, sem auto-reply genérico.
        </p>
        <ContactForm />
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-16 md:py-20 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-3">
          O que acontece depois
        </h2>
        <p className="text-base text-foreground/70 text-center mb-10">
          Sem ghosting. Sem "entraremos em contato".
        </p>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIMELINE_CONTATO.map((step) => (
            <AnimatedItem
              key={step.n}
              as="li"
              className="relative rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl font-semibold text-foreground/30 leading-none tracking-tighter">
                  {step.n}
                </span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {step.prazo}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {step.desc}
              </p>
            </AnimatedItem>
          ))}
        </ol>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-12 md:py-16 text-center">
        <p className="text-sm text-foreground/60 mb-3">
          Prefere email direto?
        </p>
        <Link
          href={`mailto:${COMPANY.email}`}
          className="inline-flex items-center gap-2 text-base font-semibold text-foreground/85 hover:text-foreground transition-colors"
        >
          {COMPANY.email}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
