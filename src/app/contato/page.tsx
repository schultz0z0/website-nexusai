import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";

import { ContatoCinematic } from "./contato-cinematic";

const TITLE = "Fale com a Nexus AI · Diagnóstico inicial";
const DESCRIPTION =
  "Conte onde sua operação perde tempo. A equipe responde em até 24h úteis e organiza o próximo passo com você.";

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
    images: [
      {
        url: `${COMPANY.url}/images/cinematic/contact-hero-desktop.webp`,
        width: 1586,
        height: 992,
        alt: "Conversa de diagnóstico com a equipe Nexus AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${COMPANY.url}/images/cinematic/contact-hero-desktop.webp`],
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
