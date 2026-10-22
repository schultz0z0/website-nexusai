import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ServiceClosing } from "@/components/service-closing";
import { ServiceMotion } from "@/components/service-motion";
import { COMPANY } from "@/lib/content";
import { whatsappContact } from "@/lib/commercial-contact";
import { SERVICES, servicePath } from "@/lib/service-content";
import { SERVICE_PRESENTATION } from "@/lib/service-presentation";
import { INDEXABLE_ROBOTS, SITE_SOCIAL_IMAGE } from "@/lib/site-metadata";
import shared from "@/components/services.module.css";
import styles from "@/components/offer-catalog.module.css";

const title = "Produtos, software sob medida e soluções de IA | Prometeus";
const description = "CRM para marketing, controle de estoque, softphone, IA no WhatsApp, software sob medida e criação de sites e lojas virtuais. Conheça as soluções Prometeus.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/servicos" }, robots: INDEXABLE_ROBOTS,
  openGraph: { title, description, url: COMPANY.url + "/servicos", siteName: COMPANY.name, locale: "pt_BR", type: "website", images: [SITE_SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", title, description, images: [SITE_SOCIAL_IMAGE] },
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: COMPANY.url + "/servicos",
    "@id": `${COMPANY.url}/servicos#webpage`, inLanguage: "pt-BR", dateModified: "2026-10-14",
    isPartOf: { "@id": `${COMPANY.url}/#website` },
    breadcrumb: { "@id": `${COMPANY.url}/servicos#breadcrumbs` },
    publisher: { "@type": "Organization", "@id": COMPANY.url + "/#organization", name: COMPANY.name, url: COMPANY.url },
    hasPart: SERVICES.map(service => ({ "@type": "WebPage", name: service.name, url: COMPANY.url + servicePath(service) })),
    mainEntity: {
      "@type": "ItemList", itemListElement: SERVICES.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: COMPANY.url + servicePath(service) })),
    },
  };
  const breadcrumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": `${COMPANY.url}/servicos#breadcrumbs`, itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: COMPANY.url },
    { "@type": "ListItem", position: 2, name: "Serviços", item: `${COMPANY.url}/servicos` },
  ] };
  const products = SERVICES.filter(service => service.kind === "product");
  const solutions = SERVICES.filter(service => service.kind !== "product");
  return <main className={shared.page}><JsonLd schema={[schema, breadcrumbs]} /><ServiceMotion>
    <header className={shared.catalogHero}>
      <div className={shared.catalogBackdrop} data-service-artwork><Image src="/images/cinematic/solutions-hero-desktop.webp?v=20261014" alt="Equipe analisando informações em um computador e planejando uma solução para a operação." fill sizes="(max-width: 760px) 832px, max(100vw, 1232px)" quality={90} loading="eager" fetchPriority="high" data-service-photo /></div>
      <div className={shared.container}>
        <nav aria-label="Caminho da página" className={shared.breadcrumbs}><Link href="/">Início</Link><span aria-hidden="true">/</span><span aria-current="page">Serviços</span></nav>
        <div className={shared.catalogCopy}><h1>Produtos e soluções para a sua empresa.</h1><p>Marketing, estoque, vendas e presença digital. Encontre o que sua empresa precisa.</p>
          <div className={shared.heroActions}><a href={whatsappContact()} target="_blank" rel="noopener noreferrer" className={shared.button} data-track-cta="catalog_whatsapp">Falar pelo WhatsApp<ArrowUpRight aria-hidden="true" /></a><a href="#produtos" className={shared.quietLink}>Conhecer as ofertas<ArrowDown aria-hidden="true" /></a></div>
        </div>
      </div>
    </header>
    <section id="produtos" className={styles.products} aria-labelledby="products-heading"><div className={shared.container}>
      <div className={styles.sectionHeading}><h2 id="products-heading">Conheça nossos produtos.</h2><p>Uma base pronta para demonstrar. Uma versão personalizada para sua operação.</p></div>
      <div className={styles.productGrid}>{products.map(service => <Link key={service.slug} href={servicePath(service)} className={styles.product}>
        <div className={styles.productPhoto} data-service-artwork><Image src={SERVICE_PRESENTATION[service.slug].catalogImage ?? service.image} alt={SERVICE_PRESENTATION[service.slug].catalogImageAlt ?? service.imageAlt} fill sizes="(max-width:760px) calc(100vw - 40px), (min-width:1240px) 450px, 39vw" quality={85} data-service-photo /></div>
        <h3>{service.name}</h3><p>{SERVICE_PRESENTATION[service.slug].lead}</p><span className={styles.visit}>Conhecer o produto<ArrowUpRight aria-hidden="true" /></span>
      </Link>)}</div>
    </div></section>
    <section id="solucoes" className={styles.solutions} aria-labelledby="solutions-heading"><div className={shared.container}>
      <div className={styles.sectionHeading}><h2 id="solutions-heading">Soluções para o seu próximo passo.</h2><p>Atendimento, aplicações e uma presença digital com a identidade da sua empresa.</p></div>
      <div className={styles.solutionList}>{solutions.map(service => <Link key={service.slug} href={servicePath(service)} className={styles.solution}>
        <div className={styles.solutionPhoto}><Image src={SERVICE_PRESENTATION[service.slug].catalogImage ?? service.image} alt={SERVICE_PRESENTATION[service.slug].catalogImageAlt ?? service.imageAlt} fill sizes="(max-width:760px) max(calc(100vw - 40px), 285px), 230px" quality={85} /></div>
        <div><h3>{service.name}</h3><p>{SERVICE_PRESENTATION[service.slug].lead}</p></div><span className={styles.solutionArrow}><ArrowUpRight aria-hidden="true" /></span>
      </Link>)}</div>
    </div></section>
    <ServiceClosing trackingId="catalog_final_whatsapp" catalog />
  </ServiceMotion></main>;
}
