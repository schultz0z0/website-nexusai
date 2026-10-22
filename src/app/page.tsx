import type { Metadata } from "next";

import { ConversionHome } from "@/components/conversion-home";
import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";
import { COMMERCIAL_WHATSAPP } from "@/lib/commercial-contact";
import { SERVICES, servicePath } from "@/lib/service-content";
import { INDEXABLE_ROBOTS, SITE_DESCRIPTION, SITE_SOCIAL_IMAGE, SITE_TITLE } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  robots: INDEXABLE_ROBOTS,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: COMPANY.url,
    siteName: COMPANY.name,
    locale: "pt_BR",
    type: "website",
    images: [SITE_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_SOCIAL_IMAGE],
  },
};

export default function Home() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${COMPANY.url}/#organization`,
    name: COMPANY.name,
    url: COMPANY.url,
    logo: `${COMPANY.url}/images/logo.png`,
    email: COMPANY.email,
    description: COMPANY.description,
    areaServed: { "@type": "Country", name: "Brasil" },
    sameAs: COMPANY.socials.map((social) => social.href),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: COMPANY.email,
      telephone: `+${COMMERCIAL_WHATSAPP}`,
      areaServed: "BR",
      availableLanguage: ["pt-BR"],
    },
  };
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${COMPANY.url}/#website`,
    name: COMPANY.name,
    url: COMPANY.url,
    description: COMPANY.description,
    inLanguage: "pt-BR",
    publisher: { "@id": `${COMPANY.url}/#organization` },
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${COMPANY.url}/#webpage`,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: COMPANY.url,
    inLanguage: "pt-BR",
    dateModified: "2026-10-14",
    isPartOf: { "@id": `${COMPANY.url}/#website` },
    mainEntity: { "@id": `${COMPANY.url}/#organization` },
    about: SERVICES.map(service => ({ "@type": "Service", "@id": `${COMPANY.url}${servicePath(service)}#service`, name: service.name, serviceType: service.category, url: `${COMPANY.url}${servicePath(service)}` })),
  };

  return (
    <>
      <JsonLd schema={[orgSchema, siteSchema, pageSchema]} />
      <ConversionHome />
    </>
  );
}
