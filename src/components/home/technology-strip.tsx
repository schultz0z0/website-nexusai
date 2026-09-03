import styles from "./technology-strip.module.css";

const HIGHLIGHTS = [
  "Inteligência Artificial & Agentes",
  "Automação de Processos",
  "Criação de Sites & Softwares",
  "Integração de Sistemas & APIs",
  "Eliminação de Tarefas Manuais",
  "Mais Tempo & Produtividade",
] as const;

function HighlightGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className={styles.group}
      data-technology-group
      aria-hidden={duplicate ? "true" : undefined}
    >
      {HIGHLIGHTS.map((item) => (
        <li
          className={styles.item}
          data-technology-logo
          key={item}
        >
          <span className={styles.sparkle} aria-hidden="true">
            ✦
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TechnologyStrip() {
  return (
    <section
      className={styles.strip}
      data-technology-strip
      aria-label="Capacidades e Soluções"
    >
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.viewport}>
          <div className={styles.track} data-technology-track>
            <HighlightGroup />
            <HighlightGroup duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
