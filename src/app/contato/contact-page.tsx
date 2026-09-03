import { Mail } from "lucide-react";

import { COMPANY, CONTACT_COPY } from "@/lib/content";

import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";
import styles from "./contact-page.module.css";

const NEXT_STEPS = [
  "A equipe lê o contexto enviado.",
  "Se fizer sentido, marcamos uma conversa curta.",
  "Escopo, prazo e investimento só vêm depois do entendimento inicial.",
] as const;

export function ContactPage() {
  return (
    <main className={styles.main}>
      <ContactHero />

      <section
        id="briefing"
        className={styles.contact}
        aria-labelledby="contact-title"
      >
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{CONTACT_COPY.eyebrow}</p>
          <h2 id="contact-title">{CONTACT_COPY.title}</h2>
          <p className={styles.lead}>{CONTACT_COPY.body}</p>
          <p className={styles.humanNote}>{CONTACT_COPY.humanNote}</p>
        </header>

        <ContactForm />
      </section>

      <aside className={styles.after} aria-label="O que acontece depois">
        <div>
          <p className={styles.eyebrow}>DEPOIS DO ENVIO</p>
          <ol>
            {NEXT_STEPS.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <a href={`mailto:${COMPANY.email}`}>
          <Mail aria-hidden="true" />
          Prefere email? {COMPANY.email}
        </a>
      </aside>
    </main>
  );
}
