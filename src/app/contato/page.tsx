import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";
import { COMMERCIAL_WHATSAPP } from "@/lib/commercial-contact";
import { INDEXABLE_ROBOTS, SITE_OG_IMAGE } from "@/lib/site-metadata";

import { ContactPage } from "./contact-page";

const TITLE = "Contato e demonstração de soluções para empresas | Prometeus";
const DESCRIPTION =
  "Fale com a Prometeus sobre CRM, estoque, telefonia, IA no WhatsApp, software sob medida e criação de sites. Agende uma demonstração ou conte seu projeto.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contato" },
  robots: INDEXABLE_ROBOTS,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${COMPANY.url}/contato`,
    siteName: COMPANY.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: "Contato com a equipe Prometeus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: SITE_OG_IMAGE, alt: "Contato com a equipe Prometeus" }],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${COMPANY.url}/contato#webpage`,
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${COMPANY.url}/#website` },
  name: TITLE,
  description: DESCRIPTION,
  url: `${COMPANY.url}/contato`,
  publisher: {
    "@type": "Organization",
    "@id": `${COMPANY.url}/#organization`,
    name: COMPANY.name,
    url: COMPANY.url,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: COMPANY.email,
      telephone: `+${COMMERCIAL_WHATSAPP}`,
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
