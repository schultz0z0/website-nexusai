import Image from "next/image";
import { ArrowDown } from "lucide-react";
import styles from "./web-discovery.module.css";

export function WebDiscovery({ intro }: { intro: string }) {
  return (
    <section id="presenca-digital" className={styles.section} aria-labelledby="web-discovery-title">
      <div className={styles.scene} data-service-artwork>
        <Image src="/images/cinematic/home-hero-touch-desktop.webp?v=20261014" alt="Mão humana e mão robótica com as pontas dos dedos se tocando." fill sizes="(max-width: 760px) max(220vw, 750px), max(100vw, 1070px)" quality={90} data-service-photo />
      </div>
      <div className={styles.copy}>
        <h2 id="web-discovery-title">Quem procura o que você faz precisa encontrar você.</h2>
        <p>{intro}</p>
        <a href="#ofertas" className={styles.cta} data-track-cta="web_discovery_offers">Quero minha empresa online<ArrowDown aria-hidden="true" /></a>
      </div>
      <p className={styles.signature}>SEO, GEO e AIO desde a criação.</p>
    </section>
  );
}
