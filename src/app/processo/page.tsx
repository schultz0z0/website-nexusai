import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { COMPANY, FAQ_ITEMS } from "@/lib/content";

import { ProcessoCinematic } from "./processo-cinematic";

const TITLE = "Processo de implementação de IA · Nexus AI";
const DESCRIPTION =
  "Diagnóstico, proposta, implementação e suporte com prazos e entregas verificáveis. Menos risco antes do código e acompanhamento depois da entrega.";

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
    images: [
      {
        url: `${COMPANY.url}/images/cinematic/process-hero-desktop.webp`,
        width: 1586,
        height: 992,
        alt: "Equipe mapeando um processo antes da implementação",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${COMPANY.url}/images/cinematic/process-hero-desktop.webp`],
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
