import { HOME_ASSURANCES, HOME_COPY } from "@/lib/content";

import styles from "./decision-assurances.module.css";

export function DecisionAssurances() {
  return (
    <section
      id="como-trabalhamos"
      data-home-chapter="assurances"
      aria-labelledby="assurances-title"
      className={styles.section}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <p>{HOME_COPY.assurances.eyebrow}</p>
          <h2 id="assurances-title">{HOME_COPY.assurances.title}</h2>
        </header>

        <div className={styles.document}>
          {HOME_ASSURANCES.map((item, index) => (
            <details
              key={item.id}
              name="decision-assurances"
              className={styles.item}
              open={index === 0}
            >
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.title}
                <i aria-hidden="true">+</i>
              </summary>
              <p>{item.description}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
