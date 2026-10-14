"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { Maximize2, X } from "lucide-react";
import styles from "./rastro-detail.module.css";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const scenes = [
  { label: "Inventário", title: "Encontre o item. Veja o contexto.", text: "Consulte os itens cadastrados, sua situação, o local e quem está responsável.", image: "/images/rastro/demo-inventory-original.webp", alt: "Inventário do demonstrativo do Rastro com itens, responsáveis e situações" },
  { label: "Movimentação", title: "O item mudou. A informação acompanha.", text: "Defina o novo local, o responsável e o motivo da mudança antes de confirmar o registro.", image: "/images/rastro/demo-movement-original.webp", alt: "Tela real do demonstrativo para revisar e confirmar uma movimentação" },
  { label: "Histórico", title: "Entenda o caminho até aqui.", text: "Veja o antes e o depois de cada movimentação registrada, com data e autoria.", image: "/images/rastro/demo-history-original.webp", alt: "Histórico real do demonstrativo com as mudanças de situação de um item" },
];

export function RastroTour() {
  const [selected, setSelected] = useState(0);
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const dialog = useRef<HTMLDialogElement>(null);
  const scene = scenes[selected];

  return <div className={styles.tour}>
    <div className={styles.tourChoices} aria-label="Telas do demonstrativo">
      {hydrated ? scenes.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{item.label}</span><small>{index === 0 ? "O que você tem" : index === 1 ? "O que mudou" : "O que aconteceu"}</small></button>) : <p>Inventário, movimentações e histórico em uma mesma plataforma.</p>}
    </div>
    <figure className={styles.tourFigure}>
      <div className={styles.tourScreen}>
        <Image key={scene.image} src={scene.image} alt={scene.alt} width={1920} height={1080} unoptimized />
      </div>
      <figcaption><div aria-live="polite" aria-atomic="true"><h3>{scene.title}</h3><p>{scene.text}</p></div>{hydrated && <button type="button" className={styles.enlarge} onClick={() => dialog.current?.showModal()}><Maximize2 size={15} aria-hidden="true" />Ampliar tela</button>}</figcaption>
    </figure>
    <p className={styles.demoNote}>Telas reais do demonstrativo. Dados de exemplo. Os cadastros e fluxos são personalizados para cada operação.</p>
    {!hydrated && <details className={styles.moreScreens}><summary>Ver movimentação e histórico</summary>{scenes.slice(1).map(item => <figure key={item.label}><Image src={item.image} alt={item.alt} width={1920} height={1080} unoptimized /><figcaption>{item.title}</figcaption></figure>)}</details>}
    <dialog ref={dialog} className={styles.screenDialog} aria-labelledby="rastro-screen-title">
      <div className={styles.dialogTop}><h2 id="rastro-screen-title">Rastro: {scene.label}</h2><button type="button" aria-label="Fechar tela ampliada" onClick={() => dialog.current?.close()}><X aria-hidden="true" size={20} /></button></div>
      <div className={styles.dialogImage}><Image src={scene.image} alt={scene.alt} width={1920} height={1080} unoptimized /></div>
      <p>Tela real do demonstrativo. Dados de exemplo.</p>
    </dialog>
  </div>;
}
