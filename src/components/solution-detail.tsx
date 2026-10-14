import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SERVICES, servicePath, type ServiceContent } from "@/lib/service-content";
import { SERVICE_PRESENTATION } from "@/lib/service-presentation";
import { whatsappContact } from "@/lib/commercial-contact";
import { ServiceMockup } from "./service-mockup";
import { ProductPreview } from "./product-preview";
import { ServiceMotion } from "./service-motion";
import shared from "./services.module.css";
import styles from "./solution-detail.module.css";

export function SolutionDetail({ service }: { service: ServiceContent }) {
  const presentation = SERVICE_PRESENTATION[service.slug];
  const product = service.kind === "product";
  const contact = whatsappContact(service.name, product);
  const label = presentation.ctaLabel ?? "Conversar sobre meu projeto";
  return <main className={shared.page}><ServiceMotion>
    <header className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true" data-service-artwork><Image src={service.image} alt="" fill sizes="(max-width: 760px) 765px, max(100vw, 1155px)" quality={90} loading="eager" fetchPriority="high" data-service-photo /></div>
      <div className={shared.container}>
        <nav aria-label="Caminho da página" className={shared.breadcrumbs}><Link href="/">Início</Link><span aria-hidden="true">/</span><Link href="/servicos">Serviços</Link><span aria-hidden="true">/</span><span aria-current="page">{service.shortName}</span></nav>
        <div className={styles.heroCopy}><h1>{service.name}</h1><p>{presentation.lead}</p>
          <div className={shared.heroActions}><a href={contact} target="_blank" rel="noopener noreferrer" className={shared.button} data-track-cta={`offer_${service.slug}_whatsapp`}>{label}<ArrowUpRight aria-hidden="true" /></a><a href="#exemplo" className={shared.quietLink}>Explorar a prévia<ArrowDown aria-hidden="true" /></a></div>
          {product && <small>Demonstração em reunião. Plataforma personalizada para sua empresa.</small>}
        </div>
      </div>
    </header>
    <section id="exemplo" className={`${shared.container} ${styles.demonstration}`} aria-label="Exemplo na prática">
      <div className={styles.demoCopy}><h2>{presentation.demoTitle}</h2><p>{service.intro}</p><p className={styles.note}>Exemplo ilustrativo{product ? ". Conheça o demonstrativo completo em uma reunião com nossa equipe." : ". A solução é construída para o fluxo da sua empresa."}</p></div>
      <div>{product ? <ProductPreview name={service.name} presentation={presentation} interactive /> : <ServiceMockup presentation={presentation} interactive />}</div>
    </section>
    <section className={styles.features} aria-labelledby="features-heading"><div className={shared.container}>
      <div className={styles.sectionHead}><h2 id="features-heading">{product ? "O que sua equipe pode reunir" : "O que construímos para você"}</h2><p>{presentation.applicationLead}</p></div>
      <div className={styles.featureList}>{service.applications.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </div></section>
    <section className={`${shared.container} ${styles.implementation}`} aria-labelledby="implementation-heading">
      <h2 id="implementation-heading">{product ? "A base é nossa. A operação é sua." : "Do problema à solução."}</h2>
      <p>{product ? "Começamos pelo demonstrativo e personalizamos a plataforma com os fluxos que sua empresa precisa." : "Sua equipe participa da definição e da validação de cada entrega."}</p>
      <ol>{service.steps.map((step,index)=><li key={step.title}><span aria-hidden="true">{index+1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
    </section>
    <section className={`${shared.container} ${shared.faqSection}`} aria-labelledby="faq-heading"><div><h2 id="faq-heading">Antes da conversa.</h2><p>Respostas para conhecer {service.shortName}.</p></div><div className={shared.faqList}>{service.faqs.map(faq=><details key={faq.question} className={shared.faq}><summary><span>{faq.question}</span><span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}<details className={shared.faq}><summary><span>O que é definido na proposta?</span><span aria-hidden="true">+</span></summary><p>{service.limits}</p></details></div></section>
    <section className={styles.closing} aria-labelledby="offer-closing-heading"><div className={shared.container}><h2 id="offer-closing-heading">{product ? `Conheça o ${service.name.replace("Prometeus ", "")}. Imagine na sua empresa.` : "Vamos conversar sobre sua operação."}</h2><p>{product ? "Mostramos a plataforma em reunião e conversamos sobre a personalização para sua equipe." : "Conte o que precisa melhorar. Organizamos uma proposta para sua empresa."}</p><a href={contact} target="_blank" rel="noopener noreferrer" className={shared.button} data-track-cta={`offer_final_${service.slug}`}>{product ? "Agendar pelo WhatsApp" : "Falar pelo WhatsApp"}<ArrowUpRight aria-hidden="true" /></a><small>Escopo, prazo e investimento definidos na proposta.</small></div></section>
    <nav className={`${shared.container} ${styles.otherOffers}`} aria-label="Outras ofertas">{SERVICES.filter(item=>item.slug!==service.slug).map(item=><Link key={item.slug} href={servicePath(item)}>{item.shortName}<ArrowUpRight aria-hidden="true" /></Link>)}</nav>
  </ServiceMotion></main>;
}
