import { ConversionHome } from "@/components/conversion-home";
import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";

export default function Home() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    url: COMPANY.url,
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
