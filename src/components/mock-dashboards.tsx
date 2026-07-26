"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Package, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Mock dashboard renders — pure CSS/SVG, no real data.
 * Simulates the platform screens without showing fake numbers that could mislead.
 */

export function StockMockDashboard() {
  return (
    <div className="bg-card/40 p-4 sm:p-6 md:p-8">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
            <Package className="w-4 h-4 text-foreground/85" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Nexus Stock</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Visão geral · Tempo real</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-medium">● Online</span>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <MockStat label="SKUs ativos" value="1.248" delta="+12" trend="up" />
        <MockStat label="Capital parado" value="R$ 84k" delta="-6%" trend="up" />
        <MockStat label="Rupturas (30d)" value="3" delta="-71%" trend="up" />
      </div>

      {/* Chart mock + alert stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 rounded-lg bg-background/40 p-4 ring-1 ring-border/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Previsão de demanda · 14 dias
            </span>
            <span className="text-[10px] text-foreground/60">SKU-4721</span>
          </div>
          <MockSparkline />
          <div className="flex items-center gap-2 mt-3 text-[11px] text-foreground/70">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            <span>Demanda prevista</span>
            <span className="inline-block w-2 h-2 rounded-full bg-foreground/30 ml-3" />
            <span>Histórico</span>
          </div>
        </div>

        <div className="space-y-2">
          <MockAlert
            severity="warn"
            title="Estoque baixo"
            sub="SKU-8830 · 8 un"
          />
          <MockAlert
            severity="ok"
            title="Reposição ok"
            sub="3 pedidos enviados"
          />
          <MockAlert
            severity="warn"
            title="Demanda ↑ 42%"
            sub="SKU-2104"
          />
        </div>
      </div>
    </div>
  );
}

function MockStat({
  label,
  value,
  delta,
  trend,
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}) {
  const Icon = trend === "up" ? ArrowDownRight : ArrowUpRight;
  const color = trend === "up" ? "text-emerald-400" : "text-rose-400";
  return (
    <div className="rounded-lg bg-background/40 p-3 ring-1 ring-border/30">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
        {label}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-base font-semibold text-foreground tabular-nums">{value}</span>
        <span className={cn("text-[10px] font-medium flex items-center gap-0.5", color)}>
          <Icon className="w-2.5 h-2.5" />
          {delta}
        </span>
      </div>
    </div>
  );
}

function MockSparkline() {
  // Pure SVG sparkline, animated stroke via Framer
  const ref = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true });
  const path =
    "M 0 35 L 30 32 L 60 38 L 90 28 L 120 22 L 150 26 L 180 18 L 210 14 L 240 16 L 270 8 L 300 12 L 330 6 L 360 10";

  return (
    <svg
      viewBox="0 0 360 50"
      className="w-full h-12"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${path} L 360 50 L 0 50 Z`}
        className="text-primary/40"
        fill="url(#sparkGrad)"
      />
      <motion.path
        ref={ref}
        d={path}
        className="text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function MockAlert({
  severity,
  title,
  sub,
}: {
  severity: "warn" | "ok";
  title: string;
  sub: string;
}) {
  const Icon = severity === "warn" ? AlertTriangle : TrendingUp;
  const color =
    severity === "warn"
      ? "text-amber-400 bg-amber-400/10"
      : "text-emerald-400 bg-emerald-400/10";
  return (
    <div className="rounded-lg bg-background/40 p-2.5 ring-1 ring-border/30 flex items-start gap-2">
      <div className={cn("w-6 h-6 rounded flex items-center justify-center flex-shrink-0", color)}>
        <Icon className="w-3 h-3" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium text-foreground leading-tight">{title}</div>
        <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

export function CopilotMockDashboard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const displayProgress = reducedMotion ? 100 : progress;

  useEffect(() => {
    if (reducedMotion) return;
    if (!inView) return;

    // Simulate a streaming generation — visual only
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 5));
    }, 120);
    return () => clearInterval(id);
  }, [inView, reducedMotion]);

  return (
    <div ref={rootRef} className="bg-card/40 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-foreground/85" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Nexus Copilot</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Campanha · Black Friday</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-foreground/60 uppercase tracking-wider">
            {displayProgress < 100 ? "Gerando…" : "Pronto"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Prompt + image preview */}
        <div className="md:col-span-2 space-y-3">
          {/* Image preview area */}
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden ring-1 ring-border/30 bg-gradient-to-br from-foreground/10 via-foreground/5 to-background">
            <CopilotImageMock progress={displayProgress} />
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-foreground/10 overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${displayProgress}%`, transition: "width 0.12s linear" }}
                />
              </div>
              <span className="text-[10px] text-foreground/85 tabular-nums w-8 text-right">
                {displayProgress}%
              </span>
            </div>
          </div>

          {/* Prompt input */}
          <div className="rounded-lg bg-background/40 p-3 ring-1 ring-border/30">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
              Prompt
            </div>
            <div className="text-xs text-foreground/85 leading-relaxed">
              Banner Black Friday para público 25-34, São Paulo. Foco em desconto agressivo, fundo escuro com elemento dourado, headline curta e CTA visível.
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <Tag>Público: SP, 25-34</Tag>
              <Tag>Estilo: Editorial</Tag>
              <Tag>Formato: 1080×1080</Tag>
            </div>
          </div>
        </div>

        {/* Agent activity stream */}
        <div className="space-y-2">
          <AgentStep
            label="Pesquisa de mercado"
            detail="+12 referências coletadas"
            state="done"
          />
          <AgentStep
            label="Análise de concorrentes"
            detail="3 concorrentes mapeados"
            state="done"
          />
          <AgentStep
            label="Insights gerados"
            detail="Padrão: público responde a contraste"
            state="active"
          />
          <AgentStep
            label="Briefing criativo"
            detail="Aguardando aprovação"
            state="pending"
          />
          <AgentStep
            label="Push para Meta Ads"
            detail="Agendado para 18h"
            state="pending"
          />
        </div>
      </div>
    </div>
  );
}

function CopilotImageMock({ progress }: { progress: number }) {
  // Synthetic image generation effect — gradient + grid that animates
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,200,100,0.25),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(180,80,255,0.18),transparent_60%)]" />
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dotGrid"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.15)" />
          </pattern>
          <linearGradient id="overlayMask" x1="0" y1="0" x2="1" y2="0">
            <stop offset={`${progress}%`} stopColor="white" />
            <stop offset={`${progress}%`} stopColor="black" />
          </linearGradient>
          <mask id="revealMask">
            <rect width="100%" height="100%" fill="url(#overlayMask)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dotGrid)"
          mask="url(#revealMask)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
            BLACK FRIDAY
          </div>
          <div className="text-xs md:text-sm text-foreground/70 mt-1">Até 70% off · só hoje</div>
        </div>
      </div>
    </div>
  );
}

function AgentStep({
  label,
  detail,
  state,
}: {
  label: string;
  detail: string;
  state: "done" | "active" | "pending";
}) {
  const stateColor =
    state === "done"
      ? "bg-emerald-400/20 text-emerald-400"
      : state === "active"
        ? "bg-primary/20 text-primary"
        : "bg-foreground/10 text-foreground/40";
  const dotColor =
    state === "done"
      ? "bg-emerald-400"
      : state === "active"
        ? "bg-primary animate-pulse"
        : "bg-foreground/30";
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-background/40 p-2.5 ring-1 ring-border/30">
      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", stateColor)}>
        <div className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium text-foreground leading-tight">{label}</div>
        <div className="text-[10px] text-muted-foreground mt-0.5">{detail}</div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-foreground/10 text-foreground/75">
      {children}
    </span>
  );
}
