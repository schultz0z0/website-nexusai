"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Maximize } from "lucide-react";
import type { WebPortfolioProject } from "@/lib/web-portfolio";
import { WebPortfolioComposition } from "./web-portfolio-composition";
import styles from "./web-portfolio.module.css";

export default function WebPortfolioPlayer({ project }: { project: WebPortfolioProject }) {
  const player = useRef<PlayerRef>(null);
  const container = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const [supportsFullscreen] = useState(() => typeof document !== "undefined" && document.fullscreenEnabled);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === container.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  async function toggleFullscreen() {
    setFullscreenError(false);
    try {
      if (document.fullscreenElement === container.current) await document.exitFullscreen();
      else await container.current?.requestFullscreen();
    } catch {
      setFullscreenError(true);
    }
  }

  useEffect(() => {
    const current = player.current;
    if (!current) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    current.addEventListener("play", onPlay);
    current.addEventListener("pause", onPause);
    current.addEventListener("ended", onPause);
    return () => { current.removeEventListener("play", onPlay); current.removeEventListener("pause", onPause); current.removeEventListener("ended", onPause); current.pause(); };
  }, []);

  return (
    <div ref={container} className={styles.player} aria-label={`Apresentação do site ${project.name}`}>
      <Player ref={player} component={WebPortfolioComposition} inputProps={{ project }} compositionWidth={1280} compositionHeight={800} durationInFrames={900} fps={30} autoPlay controls={false} clickToPlay={false} style={{ width: "100%", height: "100%" }} errorFallback={() => <div className={styles.error}>A apresentação não carregou. Recarregue a página para tentar novamente ou confira os detalhes do projeto abaixo.</div>} />
      <div className={styles.controls}>
        <button type="button" onClick={() => player.current?.toggle()} aria-label={`${playing ? "Pausar" : "Reproduzir"} apresentação de ${project.name}`}>{playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{playing ? "Pausar" : "Reproduzir"}</button>
        <button type="button" onClick={() => { player.current?.seekTo(0); player.current?.play(); }} aria-label={`Recomeçar apresentação de ${project.name}`}><RotateCcw aria-hidden="true" />Recomeçar</button>
        {supportsFullscreen && <button type="button" onClick={toggleFullscreen} aria-label={`${fullscreen ? "Sair da tela cheia" : `Abrir apresentação de ${project.name} em tela cheia`}`}><Maximize aria-hidden="true" />{fullscreen ? "Sair da tela cheia" : "Tela cheia"}</button>}
      </div>
      {fullscreenError && <p role="status" className={styles.fullscreenError}>O navegador não abriu a tela cheia. Você pode continuar assistindo aqui.</p>}
    </div>
  );
}
