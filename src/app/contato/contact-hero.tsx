import { ArrowRight } from "lucide-react";
import Link from "next/link";

import styles from "./contact-hero.module.css";

export function ContactHero() {
  return (
    <section
      className={styles.hero}
      data-contact-hero
      aria-labelledby="contact-hero-title"
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.shell}>
        <header className={styles.copy}>
          <p>CONVERSA COMEÇA AQUI</p>
          <h1 id="contact-hero-title">
            Vamos entender onde sua operação perde tempo.
          </h1>
          <span>
            Conte o contexto. A equipe lê, identifica o que falta e organiza o
            próximo passo com você.
          </span>
          <Link href="#briefing" className={styles.cta}>
            Começar briefing
            <ArrowRight aria-hidden="true" />
          </Link>
        </header>

        <div className={styles.receipt}>
          <span>Contexto recebido</span>
          <strong>Agora a gente escuta.</strong>
          <p>Uma pessoa lê seu briefing e conduz a conversa seguinte.</p>
        </div>

        <div className={styles.transmission} aria-hidden="true">
          <span>VOCÊ</span>
          <div>
            <i />
            <b />
          </div>
          <span>PROMETEUS</span>
        </div>
      </div>
    </section>
  );
}
