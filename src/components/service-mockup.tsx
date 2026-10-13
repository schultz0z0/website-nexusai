"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import type { ServicePresentation } from "@/lib/service-presentation";
import styles from "./service-mockup.module.css";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

const WINDOW_TITLES = {
  copilot: "Prometeus Copiloto",
  trace: "Prometeus Rastro",
  softphone: "Prometeus Soft Phone",
  automation: "Fluxo de solicitações",
  agent: "Assistente de atendimento",
  integration: "Conexão entre sistemas",
  software: "Workspace da equipe",
  web: "Site da sua empresa",
};

export function ServiceMockup({ presentation, interactive = false }: {
  presentation: ServicePresentation;
  interactive?: boolean;
}) {
  const [stage, setStage] = useState(interactive ? 0 : 2);
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const { scene, stages, stageDetails } = presentation;

  return (
    <div className={styles.mockup} data-scene={scene} data-stage={stage}>
      <div className={styles.window}>
        <div className={styles.toolbar}>
          <span className={styles.windowLights} aria-hidden="true"><i /><i /><i /></span>
          <span>{WINDOW_TITLES[scene]}</span>
          <span className={styles.concept}>Conceito</span>
        </div>
        <div className={styles.screen}>
          {scene === "web" && (
            <div className={styles.web}>
              <div className={styles.webNav}><strong>Sua empresa</strong><span>Serviços</span><span>Contato</span></div>
              <div className={styles.webHero}>
                <div><small>Conheça nosso trabalho</small><strong>Seu próximo projeto começa aqui.</strong><p>Serviços e soluções para o que sua empresa precisa.</p><span className={styles.webCta}>Conversar com a equipe</span></div>
                <div className={styles.webVisual} aria-hidden="true"><span /><span /><span /></div>
              </div>
              <div className={styles.webPages}><span>Quem somos</span><span>Nossos serviços</span><span>Como falar conosco</span></div>
              <div className={styles.webSetup}><span className={styles.dot} /><span>{["Páginas e navegação organizadas", "Design adaptado ao celular", "HTTPS · Sitemap · Search Console"][stage]}</span></div>
            </div>
          )}
          {scene === "automation" && (
            <div className={styles.automation}>
              <div className={styles.screenHeading}><span>Pedidos internos</span><span className={styles.tag}>Fluxo definido</span></div>
              <div className={styles.flow}>
                {["Receber", "Conferir", "Encaminhar"].map((label, index) => (
                  <div className={styles.flowStep} data-complete={stage >= index} key={label}>
                    <span className={styles.node}>{stage >= index ? <Check aria-hidden="true" /> : <span />}</span>
                    <strong>{label}</strong><small>{["Formulário", "Regras do processo", "Responsável"][index]}</small>
                  </div>
                ))}
              </div>
              <div className={styles.record}><span className={styles.recordMark}>P</span><div><strong>Pedido de acesso</strong><small>Operação · Solicitação de exemplo</small></div><span className={styles.statusPill}>{["Recebido", "Validado", "Em aprovação"][stage]}</span></div>
              <div className={styles.activity}><span className={styles.dot} /><span>{stages[stage]}</span></div>
            </div>
          )}
          {scene === "agent" && (
            <div className={styles.chat}>
              <div className={styles.screenHeading}><span><span className={styles.dot} />Atendimento com contexto</span><span className={styles.tag}>IA + equipe</span></div>
              <div className={styles.userMessage}>Quero automatizar os pedidos da minha equipe. Por onde começamos?</div>
              <div className={styles.agentMessage}><span className={styles.agentMark}>P</span><div><strong>Assistente</strong><p>{stage === 0 ? "Vou consultar as informações do serviço para entender como podemos ajudar." : "Começamos pelo processo atual. Como os pedidos chegam e quem é responsável por aprová-los?"}</p><small>{stage === 0 ? "Solicitação recebida" : "Fonte: informações aprovadas do serviço"}</small></div></div>
              <div className={styles.handoff} data-complete={stage === 2}><span className={styles.dot} /><span>{stage === 2 ? "Resumo preparado para a equipe" : "Condições comerciais: confirmação humana"}</span></div>
            </div>
          )}
          {scene === "integration" && (
            <div className={styles.integration}>
              <div className={styles.screenHeading}><span>Dados com um caminho definido</span><span className={styles.tag}>CRM / Operação</span></div>
              <div className={styles.systems}><div><small>Origem</small><strong>CRM</strong><span>Oportunidade aprovada</span></div><span className={styles.connection} data-complete={stage === 2} aria-hidden="true"><ArrowRight /></span><div><small>Destino</small><strong>Operação</strong><span>{stage === 2 ? "Registro recebido" : "Aguardando validação"}</span></div></div>
              <div className={styles.mapping}>
                {[["Contato", "Solicitante"], ["Oportunidade", "Pedido"], ["Responsável", "Equipe"]].map(([from, to]) => <div key={from}><span>{from}</span><span aria-hidden="true">↔</span><span>{to}</span><Check aria-label={stage > 0 ? "Campo validado" : "Mapeamento previsto"} /></div>)}
              </div>
              <div className={styles.activity}><span className={styles.dot} /><span>{stages[stage]}</span></div>
            </div>
          )}
          {scene === "software" && (
            <div className={styles.software}>
              <div className={styles.sidebar} aria-hidden="true"><span className={styles.workspaceMark}>P</span><span className={styles.selected}>Solicitações</span><span>Equipe</span><span>Relatórios</span></div>
              <div className={styles.workspace}>
                <div className={styles.screenHeading}><span>Visão da operação</span><span className={styles.tag}>Equipe</span></div>
                <div className={styles.boardHeading}><strong>Pedidos em andamento</strong><small>Responsáveis e próximas ações</small></div>
                <div className={styles.task}><span className={styles.taskLine} /><div><strong>Revisar solicitação</strong><small>{stage === 0 ? "Aguardando responsável" : "Equipe de operação"}</small></div><span className={styles.statusPill}>{["Novo", "Em andamento", "Em revisão"][stage]}</span></div>
                <div className={`${styles.task} ${styles.quietTask}`}><span className={styles.taskLine} /><div><strong>Organizar documentos</strong><small>Equipe administrativa</small></div><span className={styles.statusPill}>Em andamento</span></div>
                <div className={styles.progress}><span style={{ width: `${(stage + 1) * 100 / 3}%` }} /></div>
                <small className={styles.permission}>Acesso de acordo com o perfil de cada pessoa</small>
              </div>
            </div>
          )}
        </div>
        <div className={styles.windowFooter}><span className={styles.dot} />{interactive ? "Explore o fluxo abaixo" : "Construído a partir do seu processo"}<span className={styles.signature}>prometeus</span></div>
      </div>
      {interactive && (
        <div className={styles.demoControls}>
          <div className={styles.demoProgress} aria-hidden="true">{stages.map((label, index) => <span key={label} data-active={index <= stage} />)}</div>
          <p role="status" aria-live="polite" aria-atomic="true"><strong>{stages[stage]}</strong><span>{stageDetails[stage]}</span></p>
          {hydrated && <button type="button" onClick={() => setStage((current) => (current + 1) % stages.length)}>{stage === 2 ? "Recomeçar exemplo" : "Avançar etapa"}<ArrowRight aria-hidden="true" /></button>}
        </div>
      )}
    </div>
  );
}
