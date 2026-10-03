import Image from "next/image";
import Link from "next/link";
import { SERVICES, servicePath, type ServiceContent } from "@/lib/service-content";
import styles from "./services.module.css";

export function ServiceDetail({ service }: { service: ServiceContent }) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav aria-label="Caminho da página" className={styles.breadcrumbs}>
          <Link href="/">Início</Link><span aria-hidden="true">/</span>
          <Link href="/servicos">Serviços</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{service.shortName}</span>
        </nav>
        <header className={styles.hero}>
          <div>
            <h1>{service.name}</h1>
            <p>{service.intro}</p>
            <Link href="/contato" className={styles.button} data-track-cta={`service_${service.slug}`}>Conversar sobre meu processo</Link>
          </div>
          <Image src={service.image} alt="" width={600} height={750} sizes="(max-width: 760px) 100vw, 40vw" className={styles.heroImage} />
        </header>

        <section className={styles.section} aria-labelledby="applications-heading">
          <h2 id="applications-heading">Onde faz sentido aplicar</h2>
          <div className={`${styles.body} ${styles.entries}`}>
            {service.applications.map((application) => <div key={application.title}><h3>{application.title}</h3><p>{application.text}</p></div>)}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="steps-heading">
          <h2 id="steps-heading">Como o projeto funciona</h2>
          <ol className={`${styles.body} ${styles.steps}`}>
            {service.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="requirements-heading">
          <h2 id="requirements-heading">O que precisamos avaliar</h2>
          <div className={styles.body}>
            <ul className={styles.requirements}>{service.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
            <h3>Limites e condições</h3><p>{service.limits}</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="example-heading">
          <h2 id="example-heading">{service.example.title}</h2>
          <div className={`${styles.body} ${styles.example}`}>
            <small>Exemplo ilustrativo de aplicação</small>
            <h3>Situação inicial</h3><p>{service.example.before}</p>
            <h3>Uma possibilidade de solução</h3><p>{service.example.after}</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq-heading">
          <h2 id="faq-heading">Dúvidas sobre {service.shortName.toLocaleLowerCase("pt-BR")}</h2>
          <div className={styles.body}>
            {service.faqs.map((faq) => <details key={faq.question} className={styles.faq}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="related-heading">
          <h2 id="related-heading">Serviços que podem se conectar</h2>
          <nav aria-label="Outros serviços" className={`${styles.body} ${styles.related}`}>
            {SERVICES.filter((item) => item.slug !== service.slug).map((item) => <Link className={styles.textLink} key={item.slug} href={servicePath(item)}>{item.shortName}</Link>)}
          </nav>
        </section>

        <section className={styles.closing}>
          <h2>Comece pelo problema da sua empresa</h2>
          <p>Conte a rotina, os sistemas envolvidos e o que precisa melhorar. A conversa inicial ajuda a avaliar a viabilidade; prazo, investimento e entregas são definidos depois de entender o contexto. Atendimento a empresas no Brasil.</p>
          <Link href="/contato" className={styles.button} data-track-cta={`service_final_${service.slug}`}>Falar com a equipe</Link>
        </section>
      </div>
    </main>
  );
}
