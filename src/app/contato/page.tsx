import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";

import { ContatoCinematic } from "./contato-cinematic";

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
    <>
      <JsonLd schema={contactSchema} />
      <ContatoCinematic />
    </>
  );
}
