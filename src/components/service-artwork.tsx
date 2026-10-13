import Image from "next/image";
import { ServiceMockup } from "./service-mockup";
import type { ServiceContent } from "@/lib/service-content";
import { SERVICE_PRESENTATION } from "@/lib/service-presentation";
import styles from "./services.module.css";

export function ServiceArtwork({ service, hero = false }: { service: ServiceContent; hero?: boolean }) {
  return (
    <div className={`${styles.artwork} ${hero ? styles.heroArtwork : ""}`} data-service-artwork aria-hidden="true">
      <div className={styles.artworkPhoto}>
        <Image src={service.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : "auto"} data-service-photo />
      </div>
      <div className={styles.artworkMockup}><ServiceMockup presentation={SERVICE_PRESENTATION[service.slug]} /></div>
    </div>
  );
}
