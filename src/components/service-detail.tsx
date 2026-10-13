import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SERVICES, servicePath, type ServiceContent } from "@/lib/service-content";
import { SERVICE_PRESENTATION } from "@/lib/service-presentation";
import { ServiceClosing } from "./service-closing";
import { ServiceMotion } from "./service-motion";
import { WebOffers } from "./web-offers";
import { WebDiscovery } from "./web-discovery";
import { WebPortfolio } from "./web-portfolio";
import { SolutionDetail } from "./solution-detail";
import styles from "./services.module.css";

export function ServiceDetail({ service }: { service: ServiceContent }) {
  const presentation = SERVICE_PRESENTATION[service.slug];
  if (presentation.scene !== "web") return <SolutionDetail service={service} />;
  return (
    <main className={styles.page}>
      <ServiceMotion>
        <header className={styles.webHero}>
          <div className={styles.webHeroBackdrop} aria-hidden="true" data-service-artwork><Image src={service.image} alt="" fill sizes="100vw" loading="eager" fetchPriority="high" data-service-photo /></div>
          <div className={styles.container}>
            <nav aria-label="Caminho da página" className={styles.breadcrumbs}>
              <Link href="/">Início</Link><span aria-hidden="true">/</span>
              <Link href="/servicos">Serviços</Link><span aria-hidden="true">/</span>
              <span aria-current="page">{service.shortName}</span>
            </nav>
            <div className={styles.webHeroContent}>
              <div className={styles.heroCopy}>
                <h1>{service.name}</h1>
                <p>{presentation.lead}</p>
                <div className={styles.heroActions}>
                  <a href="#ofertas" className={styles.button} data-track-cta="web_view_offers">Ver preços e condições<ArrowDown aria-hidden="true" /></a>
                  <a href="#portfolio" className={styles.quietLink}>Ver projetos<ArrowDown aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <WebPortfolio /><WebDiscovery intro={service.intro} /><WebOffers />
        <section className={styles.processSection} aria-labelledby="steps-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeader}><h2 id="steps-heading">Como o projeto funciona</h2><p>Da identidade da sua empresa à publicação. Você acompanha cada etapa da criação.</p></div>
            <ol className={styles.steps}>{service.steps.map((step, index) => <li key={step.title}><span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
          </div>
        </section>
        <section className={`${styles.container} ${styles.faqSection}`} aria-labelledby="faq-heading">
          <div><h2 id="faq-heading">Dúvidas sobre sites e lojas virtuais</h2><p>Algumas respostas antes de começarmos a conversa.</p></div>
          <div className={styles.faqList}>{service.faqs.map((faq) => <details key={faq.question} className={styles.faq}><summary><span>{faq.question}</span><span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
        </section>
        <section className={`${styles.container} ${styles.relatedSection}`} aria-labelledby="related-heading">
          <h2 id="related-heading">Conheça outras ofertas</h2>
          <nav aria-label="Outros serviços" className={styles.related}>{SERVICES.filter((item) => item.slug !== service.slug).map((item) => <Link key={item.slug} href={servicePath(item)}><span>{item.shortName}</span><ArrowUpRight aria-hidden="true" /></Link>)}</nav>
        </section>
        <ServiceClosing trackingId={`service_final_${service.slug}`} web />
      </ServiceMotion>
    </main>
  );
}
