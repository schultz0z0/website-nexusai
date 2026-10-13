"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import type { ServicePresentation } from "@/lib/service-presentation";
import styles from "./product-preview.module.css";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ProductPreview({ name, presentation, interactive = false }: { name: string; presentation: ServicePresentation; interactive?: boolean }) {
  const [stage, setStage] = useState(0);
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const { scene, stages, stageDetails } = presentation;
  const sections = scene === "copilot" ? ["Campanhas", "Planejamento", "CRM"] : scene === "trace" ? ["Estoque", "Movimentações", "Assistente"] : ["Contatos", "Telefonia", "CRM"];
  return (
    <div className={styles.preview} data-product-scene={scene}>
      <div className={styles.window}>
        <div className={styles.top}><strong>{name}</strong><span>Prévia ilustrativa</span></div>
        <div className={styles.navigation} aria-hidden="true">{sections.map((label, index) => <span key={label} data-active={index === stage}>{label}</span>)}</div>
        <div className={styles.screen}>
          {scene === "copilot" && <>
            {stage === 0 && <><h3>Campanhas em andamento</h3><div className={styles.table}>{[["Apresentação da marca", "Planejamento"], ["Campanha de lançamento", "Em criação"], ["Relacionamento com clientes", "Em revisão"]].map(([title,status]) => <div key={title}><span>{title}</span><small>{status}</small></div>)}</div><p className={styles.hint}>Etapas e responsáveis para acompanhar o trabalho.</p></>}
            {stage === 1 && <><h3>Planejar com o Copiloto</h3><div className={styles.question}>Vamos organizar a próxima campanha de lançamento?</div><div className={styles.answer}><strong>Um ponto de partida para sua equipe</strong><p>Definir o público, revisar a oferta e organizar os conteúdos de cada etapa.</p><span>Plano sujeito à revisão da equipe</span></div></>}
            {stage === 2 && <><h3>Contexto comercial</h3><div className={styles.record}><span>Contato de exemplo</span><strong>Empresa Horizonte</strong><p>Interesse na campanha de lançamento</p></div><div className={styles.next}><span>Próxima ação</span><strong>Organizar o primeiro contato</strong></div></>}
          </>}
          {scene === "trace" && <>
            {stage === 0 && <><h3>Ativos do estoque</h3><div className={styles.table}>{[["AT-021 · Notebook", "Operação"], ["AT-022 · Monitor", "Estoque central"], ["AT-023 · Equipamento", "Unidade 02"]].map(([asset,local]) => <div key={asset}><span>{asset}</span><small>{local}</small></div>)}</div><p className={styles.hint}>Identificação e localização em uma visão comum.</p></>}
            {stage === 1 && <><h3>Histórico do AT-021</h3><ol className={styles.history}><li><span>Cadastro</span><strong>Estoque central</strong></li><li><span>Transferência registrada</span><strong>Equipe de operação</strong></li><li><span>Responsável</span><strong>Pessoa designada</strong></li></ol></>}
            {stage === 2 && <><h3>Consultar com o assistente</h3><div className={styles.question}>Onde está o ativo AT-021?</div><div className={styles.answer}><strong>Equipe de operação</strong><p>A última movimentação registrada indica a transferência do estoque central.</p><span>Resposta baseada nos registros de exemplo</span></div></>}
          </>}
          {scene === "softphone" && <>
            {stage === 0 && <><h3>Contatos comerciais</h3><div className={styles.table}>{[["Empresa Horizonte", "Primeiro contato"], ["Empresa Aurora", "Em conversa"], ["Empresa Norte", "Acompanhamento"]].map(([title,status]) => <div key={title}><span>{title}</span><small>{status}</small></div>)}</div><p className={styles.hint}>Dados fictícios para ilustrar a experiência.</p></>}
            {stage === 1 && <><h3>Conversa com contexto</h3><div className={styles.call}><span>Contato de exemplo</span><strong>Empresa Horizonte</strong><p>Informações comerciais ao lado da telefonia.</p><span className={styles.callLabel}>Ligação ilustrativa · nenhuma chamada realizada</span></div></>}
            {stage === 2 && <><h3>Continuidade no CRM</h3><div className={styles.record}><span>Resumo do atendimento</span><strong>Interesse em uma proposta</strong><p>Contexto reunido para a equipe comercial.</p></div><div className={styles.next}><span>Próxima ação</span><strong>Preparar retorno ao contato</strong></div></>}
          </>}
        </div>
        <div className={styles.bottom}>Interface e dados ilustrativos<span>prometeus</span></div>
      </div>
      {interactive && <div className={styles.controls}>
        <p role="status" aria-live="polite" aria-atomic="true"><strong>{stages[stage]}</strong><span>{stageDetails[stage]}</span></p>
        {hydrated && <button type="button" onClick={() => setStage((value) => (value + 1) % 3)}>{stage === 2 ? "Recomeçar exemplo" : "Avançar etapa"}<ArrowRight aria-hidden="true" /></button>}
      </div>}
    </div>
  );
}
