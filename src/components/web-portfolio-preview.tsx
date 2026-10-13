"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Play } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import type { WebPortfolioProject } from "@/lib/web-portfolio";
import styles from "./web-portfolio.module.css";

const Player = dynamic(() => import("./web-portfolio-player"), {
  ssr: false,
  loading: () => <span role="status" className={styles.loading}>Preparando apresentação…</span>,
});
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function WebPortfolioPreview({ project }: { project: WebPortfolioProject }) {
  const [active, setActive] = useState(false);
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  return (
    <div className={styles.preview}>
      {active ? <Player project={project} /> : <div className={styles.poster}><Image src={project.poster} alt={`Primeira tela do site ${project.name}`} fill sizes="(max-width:760px) 100vw, 50vw" />{hydrated && <button type="button" onClick={() => setActive(true)} className={styles.play} aria-label={`Reproduzir apresentação de ${project.name}`}><Play aria-hidden="true" />Ver apresentação</button>}</div>}
    </div>
  );
}
