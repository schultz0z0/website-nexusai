import { ArrowUpRight } from "lucide-react";
import { WEB_PORTFOLIO } from "@/lib/web-portfolio";
import { WebPortfolioPreview } from "./web-portfolio-preview";
import styles from "./web-portfolio.module.css";

export function WebPortfolio() {
  return (
    <section id="portfolio" className={styles.section} aria-labelledby="web-portfolio-title">
      <div className={styles.container}>
        <div className={styles.heading}><h2 id="web-portfolio-title">Projetos de clientes. Veja os sites em movimento.</h2><p>Conheça a navegação por sites que construímos, com a identidade e o conteúdo de cada negócio.</p></div>
        <div className={styles.projects}>
          {WEB_PORTFOLIO.map((project) => (
            <figure key={project.id} className={styles.project}>
              <WebPortfolioPreview project={project} />
              <figcaption><div className={styles.projectHeading}><h3>{project.name}</h3><span>{project.status}</span></div><p>{project.description}</p>{project.publicUrl && <a href={project.publicUrl} target="_blank" rel="noopener noreferrer">Visitar site<ArrowUpRight aria-hidden="true" /></a>}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
