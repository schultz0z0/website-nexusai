import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";
import { COMMERCIAL_WHATSAPP } from "@/lib/commercial-contact";
import { INDEXABLE_ROBOTS, SITE_SOCIAL_IMAGE } from "@/lib/site-metadata";

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
    images: [SITE_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [SITE_SOCIAL_IMAGE],
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
