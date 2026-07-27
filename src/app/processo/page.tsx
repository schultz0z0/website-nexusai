import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { COMPANY, FAQ_ITEMS } from "@/lib/content";

import { ProcessoCinematic } from "./processo-cinematic";

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
    <>
      <JsonLd schema={faqSchema} />
      <ProcessoCinematic />
    </>
  );
}
