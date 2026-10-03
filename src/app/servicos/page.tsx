import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";
import { SERVICES, servicePath } from "@/lib/service-content";
import { SITE_OG_IMAGE } from "@/lib/site-metadata";
import styles from "@/components/services.module.css";

const title = "Serviços de automação, IA e software sob medida | Prometeus";
const description = "Conheça os serviços da Prometeus: automação de processos, agentes de IA, integração de sistemas e desenvolvimento de software sob medida para empresas.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/servicos" },
  robots: { index: true, follow: true },
  openGraph: { title, description, url: `${COMPANY.url}/servicos`, siteName: COMPANY.name, locale: "pt_BR", type: "website", images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [SITE_OG_IMAGE] },
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: `${COMPANY.url}/servicos`,
    publisher: { "@type": "Organization", "@id": `${COMPANY.url}/#organization`, name: COMPANY.name, url: COMPANY.url },
    hasPart: SERVICES.map((service) => ({ "@type": "WebPage", name: service.name, url: `${COMPANY.url}${servicePath(service)}` })),
  };
  return (
    <main className={styles.page}>
      <JsonLd schema={schema} />
      <div className={styles.container}>
        <nav aria-label="Caminho da página" className={styles.breadcrumbs}><Link href="/">Início</Link><span aria-hidden="true">/</span><span aria-current="page">Serviços</span></nav>
        <header className={styles.indexHeader}>
          <h1>Serviços para conectar processos e ampliar a capacidade da sua equipe</h1>
          <p>A Prometeus desenvolve automações, agentes de IA, integrações e aplicações sob medida. Cada projeto começa pelo contexto da empresa. Conheça as possibilidades, os requisitos e os limites de cada serviço.</p>
        </header>
        <div className={styles.serviceList}>
          {SERVICES.map((service) => (
            <section key={service.slug} className={styles.serviceRow}>
              <h2>{service.shortName}</h2>
              <div><p>{service.description}</p><Link className={styles.textLink} href={servicePath(service)}>Conhecer {service.shortName.toLocaleLowerCase("pt-BR")}</Link></div>
            </section>
          ))}
        </div>
        <section className={styles.closing}>
          <h2>A solução pode combinar mais de um serviço</h2>
          <p>Uma ferramenta interna pode precisar de integrações; uma automação pode usar um agente para uma etapa específica. Conte o problema para avaliarmos a combinação adequada. Atendimento a empresas no Brasil.</p>
          <Link href="/contato" className={styles.button} data-track-cta="services_contact">Falar com a equipe</Link>
        </section>
      </div>
    </main>
  );
}
