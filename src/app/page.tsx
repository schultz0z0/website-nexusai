import { CinematicHomeContinuation } from "@/components/cinematic-home-continuation";
import { JsonLd } from "@/components/json-ld";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
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
      <HeroSection />
      <CinematicHomeContinuation />
    </>
  );
}

function HeroSection() {
  return (
    <CinematicHero
      brandName="Nexus AI"
      tagline1="Sua equipe"
      tagline2="multiplicada por IA"
      cardHeading="A gente encontra o gargalo da sua operação e entrega a automação."
      cardDescription={
        <>
          Plataformas e agentes de IA sob medida, sem slides de 80 páginas,
          sem SaaS engessado, sem lock-in. Sua equipe entende, opera e fica
          livre pro que só humano faz.
        </>
      }
      metricValue={12}
      metricLabel="Implantações ativas"
      ctaHeading="Pronto pra liberar sua equipe?"
      ctaDescription="Diagnóstico inicial é gratuito. Você sai com clareza sobre o que automatizar, em que ordem e quanto custa."
    />
  );
}
