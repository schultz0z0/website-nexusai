import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { AREAS, COMPANY } from "@/lib/content";

import { SolucoesCinematic } from "./solucoes-cinematic";

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
      itemListElement: AREAS.map((area, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: area.title,
          description: area.desc,
        },
      })),
    },
  };

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <SolucoesCinematic />
    </>
  );
}
