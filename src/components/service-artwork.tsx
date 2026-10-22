import Image from "next/image";
import { ServiceMockup } from "./service-mockup";
import type { ServiceContent } from "@/lib/service-content";
import { SERVICE_PRESENTATION } from "@/lib/service-presentation";
import styles from "./services.module.css";

export function ServiceArtwork({ service, hero = false }: { service: ServiceContent; hero?: boolean }) {
  return (
    <div className={`${styles.artwork} ${hero ? styles.heroArtwork : ""}`} data-service-artwork>
      <div className={styles.artworkPhoto}>
        <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" quality={85} loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : "auto"} data-service-photo />
      </div>
      <div className={styles.artworkMockup} aria-hidden="true"><ServiceMockup presentation={SERVICE_PRESENTATION[service.slug]} /></div>
    </div>
  );
}
