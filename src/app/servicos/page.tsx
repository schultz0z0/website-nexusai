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
import { SITE_OG_IMAGE } from "@/lib/site-metadata";
import shared from "@/components/services.module.css";
import styles from "@/components/offer-catalog.module.css";

const title = "Produtos e soluções para empresas | Prometeus";
const description = "Conheça Prometeus Copiloto, Rastro e Soft Phone, atendimento com IA no WhatsApp, software sob medida e criação de sites e lojas virtuais.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/servicos" }, robots: { index: true, follow: true },
  openGraph: { title, description, url: COMPANY.url + "/servicos", siteName: COMPANY.name, locale: "pt_BR", type: "website", images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [SITE_OG_IMAGE] },
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: COMPANY.url + "/servicos",
    publisher: { "@type": "Organization", "@id": COMPANY.url + "/#organization", name: COMPANY.name, url: COMPANY.url },
    hasPart: SERVICES.map(service => ({ "@type": "WebPage", name: service.name, url: COMPANY.url + servicePath(service) })),
  };
  const products = SERVICES.filter(service => service.kind === "product");
  const solutions = SERVICES.filter(service => service.kind !== "product");
  return <main className={shared.page}><JsonLd schema={schema} /><ServiceMotion>
    <header className={shared.catalogHero}>
      <div className={shared.catalogBackdrop} aria-hidden="true" data-service-artwork><Image src="/images/cinematic/solutions-hero-desktop.webp?v=20261014" alt="" fill sizes="(max-width: 760px) 832px, max(100vw, 1232px)" quality={90} loading="eager" fetchPriority="high" data-service-photo /></div>
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
        <div className={styles.productPhoto} aria-hidden="true" data-service-artwork><Image src={SERVICE_PRESENTATION[service.slug].catalogImage ?? service.image} alt="" fill sizes="(max-width:760px) calc(100vw - 40px), (min-width:1240px) 450px, 39vw" quality={85} data-service-photo /></div>
        <h3>{service.name}</h3><p>{SERVICE_PRESENTATION[service.slug].lead}</p><span className={styles.visit}>Conhecer o produto<ArrowUpRight aria-hidden="true" /></span>
      </Link>)}</div>
    </div></section>
    <section id="solucoes" className={styles.solutions} aria-labelledby="solutions-heading"><div className={shared.container}>
      <div className={styles.sectionHeading}><h2 id="solutions-heading">Soluções para o seu próximo passo.</h2><p>Atendimento, aplicações e uma presença digital com a identidade da sua empresa.</p></div>
      <div className={styles.solutionList}>{solutions.map(service => <Link key={service.slug} href={servicePath(service)} className={styles.solution}>
        <div className={styles.solutionPhoto} aria-hidden="true"><Image src={SERVICE_PRESENTATION[service.slug].catalogImage ?? service.image} alt="" fill sizes="(max-width:760px) max(calc(100vw - 40px), 285px), 230px" quality={85} /></div>
        <div><h3>{service.name}</h3><p>{SERVICE_PRESENTATION[service.slug].lead}</p></div><span className={styles.solutionArrow}><ArrowUpRight aria-hidden="true" /></span>
      </Link>)}</div>
    </div></section>
    <ServiceClosing trackingId="catalog_final_whatsapp" catalog />
  </ServiceMotion></main>;
}
