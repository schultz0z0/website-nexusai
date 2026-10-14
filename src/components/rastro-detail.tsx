import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { whatsappContact } from "@/lib/commercial-contact";
import type { ServiceContent } from "@/lib/service-content";
import { ServiceMotion } from "./service-motion";
import { RastroTour } from "./rastro-tour";
import shared from "./services.module.css";
import styles from "./rastro-detail.module.css";

const questions = [
  { title: "Onde está?", text: "O local do item, sem depender de uma mensagem perdida." },
  { title: "Com quem está?", text: "O responsável identificado para dar continuidade ao trabalho." },
  { title: "O que aconteceu?", text: "Um histórico para entender cada mudança registrada." },
];
const uses = [
  { title: "Equipamentos e ferramentas", text: "Acompanhe os itens que saem do estoque para apoiar o trabalho das equipes." },
  { title: "Patrimônio da empresa", text: "Organize os bens, seus locais e responsáveis ao longo do tempo." },
  { title: "Estoques, equipes e unidades", text: "Preserve o contexto dos itens que circulam entre diferentes partes da operação." },
];

export function RastroDetail({ service }: { service: ServiceContent }) {
  const contact = whatsappContact(service.name, true);
  return <main className={`${shared.page} ${styles.page}`}><ServiceMotion>
    <header className={styles.hero}>
      <div className={styles.heroPhoto} aria-hidden="true" data-service-artwork><Image src={service.image} alt="" fill unoptimized loading="eager" fetchPriority="high" data-service-photo /></div>
      <div className={shared.container}>
        <nav className={shared.breadcrumbs} aria-label="Caminho da página"><Link href="/">Início</Link><span aria-hidden="true">/</span><Link href="/servicos">Serviços</Link><span aria-hidden="true">/</span><span aria-current="page">Rastro</span></nav>
        <div className={styles.heroCopy}>
          <h1>{service.name}</h1>
          <p className={styles.heroTitle}>Saiba onde está cada item. E o que aconteceu com ele.</p>
          <p className={styles.heroLead}>{service.intro}</p>
          <div className={shared.heroActions}><a href={contact} target="_blank" rel="noopener noreferrer" className={shared.button} data-track-cta="rastro_hero_demo">Agendar demonstração<ArrowUpRight aria-hidden="true" /></a><a href="#rastro-em-acao" className={shared.quietLink}>Conhecer o Rastro<ArrowDown aria-hidden="true" /></a></div>
          <small>Demonstração em reunião. Personalização para a sua empresa.</small>
        </div>
      </div>
      <div className={`${shared.container} ${styles.heroSignature}`} aria-hidden="true"><span>Cada ativo.</span><span>Cada movimento.</span><span>Toda a história.</span></div>
    </header>

    <section className={`${shared.container} ${styles.context}`} aria-labelledby="rastro-context-title">
      <div className={styles.splitHeading}><h2 id="rastro-context-title">O item mudou de lugar.<br />A informação acompanhou?</h2><p>Quando a informação fica espalhada, uma consulta simples vira uma sequência de perguntas. O Rastro reúne as respostas no contexto de cada item.</p></div>
      <div className={styles.questions}>{questions.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section id="rastro-em-acao" className={styles.demonstration} aria-labelledby="rastro-demo-title">
      <div className={shared.container}>
        <div className={styles.splitHeading}><h2 id="rastro-demo-title">Cada movimento deixa uma história que você pode consultar.</h2><p>Do inventário ao histórico, conheça o caminho de um item dentro do Rastro.</p></div>
        <RastroTour />
        <a href={contact} target="_blank" rel="noopener noreferrer" className={styles.textLink} data-track-cta="rastro_tour_demo">Quero ver a demonstração completa<ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </section>

    <section className={`${shared.container} ${styles.benefits}`} aria-labelledby="rastro-benefits-title">
      <div className={styles.splitHeading}><h2 id="rastro-benefits-title">Menos procura.<br />Mais clareza para decidir.</h2><p>Informações que ajudam sua equipe a acompanhar a rotina e entender o que precisa acontecer a seguir.</p></div>
      <div className={styles.benefitGrid}>{service.applications.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section className={styles.operations} aria-labelledby="rastro-operations-title">
      <div className={styles.operationPhoto} aria-hidden="true" data-service-artwork><Image src="/images/rastro/operacao-estoque-hq.webp" alt="" fill unoptimized data-service-photo /></div>
      <div className={`${shared.container} ${styles.operationCopy}`}><h2 id="rastro-operations-title">O que você acompanha muda.<br />A necessidade de controle continua.</h2><p>Ferramentas, equipamentos, patrimônio. O Rastro é personalizado para os itens e os movimentos que fazem parte do seu negócio.</p></div>
    </section>
    <section className={`${shared.container} ${styles.useCases}`} aria-label="Aplicações do Rastro em diferentes operações">{uses.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</section>

    <section className={styles.offer} aria-labelledby="rastro-offer-title"><div className={`${shared.container} ${styles.offerInner}`}>
      <div className={styles.offerCopy}><h2 id="rastro-offer-title">Conheça a plataforma.<br />Traga a sua operação.</h2><p>Começamos com uma demonstração do Rastro. Depois, desenhamos com você a personalização que a sua empresa precisa.</p><a href={contact} target="_blank" rel="noopener noreferrer" className={shared.button} data-track-cta="rastro_offer_demo">Agendar demonstração<ArrowUpRight aria-hidden="true" /></a><small>Escopo, prazo e investimento definidos em uma proposta para a sua empresa.</small></div>
      <ol className={styles.steps}>{service.steps.map((item,index) => <li key={item.title}><span aria-hidden="true">{index+1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol>
    </div></section>

    <section className={`${shared.container} ${shared.faqSection}`} aria-labelledby="rastro-faq-title"><div><h2 id="rastro-faq-title">Antes de conhecer o Rastro.</h2><p>O que você pode querer saber sobre o produto e a personalização.</p></div><div className={shared.faqList}>{service.faqs.map(item => <details key={item.question} className={shared.faq}><summary><span>{item.question}</span><span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>

    <section className={styles.closing} aria-labelledby="rastro-closing-title"><div className={shared.container}><h2 id="rastro-closing-title">Cada item tem uma história.<br />Tenha essa história à mão.</h2><p>Veja o Rastro funcionando e converse com a gente sobre o que sua empresa precisa acompanhar.</p><a href={contact} target="_blank" rel="noopener noreferrer" className={shared.button} data-track-cta="rastro_final_demo">Conhecer o Rastro pelo WhatsApp<ArrowUpRight aria-hidden="true" /></a><Link href="/servicos" className={styles.backLink}>Ver todos os produtos e soluções</Link></div></section>
  </ServiceMotion></main>;
}
