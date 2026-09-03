import type { Metadata } from "next";

import { ConversionHome } from "@/components/conversion-home";
import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_OG_IMAGE, SITE_TITLE } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: COMPANY.url,
    siteName: COMPANY.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: "Prometeus — soluções digitais sob medida" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

export default function Home() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    url: COMPANY.url,
    logo: `${COMPANY.url}/images/logo.png`,
    email: COMPANY.email,
    description: COMPANY.description,
  };
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: COMPANY.url,
    description: COMPANY.description,
  };

  return (
    <>
      <JsonLd schema={[orgSchema, siteSchema]} />
      <ConversionHome />
    </>
  );
}
