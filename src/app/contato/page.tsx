import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";
import { SITE_OG_IMAGE } from "@/lib/site-metadata";

import { ContactPage } from "./contact-page";

const TITLE = "Diagnóstico de automação com IA | Prometeus";
const DESCRIPTION =
  "Conte onde sua operação perde tempo. A Prometeus analisa o contexto e organiza o próximo passo para um diagnóstico de automação com IA.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contato" },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${COMPANY.url}/contato`,
    siteName: COMPANY.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: "Prometeus — diagnóstico de automação com IA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: SITE_OG_IMAGE, alt: "Prometeus — diagnóstico de automação com IA" }],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: TITLE,
  description: DESCRIPTION,
  url: `${COMPANY.url}/contato`,
  publisher: {
    "@type": "Organization",
    name: COMPANY.name,
    url: COMPANY.url,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: COMPANY.email,
      availableLanguage: ["pt-BR"],
    },
  },
};

export default function ContatoPage() {
  return (
    <>
      <JsonLd schema={contactSchema} />
      <ContactPage />
    </>
  );
}
