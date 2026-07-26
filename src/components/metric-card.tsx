"use client";

/**
 * Telemetry-style metric card. Used in the home "Onde estamos hoje" section.
 *
 * Design: eyebrow tag → icon + label → big number (count-up) → sparkline →
 * caveat. Card has a conic-gradient border mask + radial glow that follows
 * the cursor via the existing card-sheen pattern from cinematic-hero.
 *
 * ponytail: the sparkline is a small SVG path scaled to the data range; the
 * series is synthetic (declared in `METRICAS[i].spark`). Replace with real
 * telemetry when the metrics pipeline lands.
 */

import { useRef, type MouseEvent } from "react";
import {
  Activity,
  Cpu,
  Timer,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { CountUp } from "@/components/count-up";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Activity,
  Cpu,
  Timer,
  ShieldCheck,
};

export interface MetricCardProps {
  icon: string;
  eyebrow: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  note?: string;
  className?: string;
}

export function MetricCard({
  icon,
  eyebrow,
  value,
  suffix,
  prefix,
  label,
  note,
  className,
}: MetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = ICONS[icon] ?? Activity;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      className={cn(
        "metric-card group relative overflow-hidden rounded-xl p-5 md:p-6",
        "bg-card/40 backdrop-blur-md",
        "ring-1 ring-border/50",
        "transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
    >
      {/* Cursor-following radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-foreground) 8%, transparent), transparent 60%)",
        }}
      />

      {/* Conic gradient border (mask) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-60"
        style={{
          padding: "1px",
          background:
            "conic-gradient(from 140deg, color-mix(in srgb, var(--color-foreground) 25%, transparent), color-mix(in srgb, var(--color-foreground) 8%, transparent), color-mix(in srgb, var(--color-foreground) 35%, transparent), color-mix(in srgb, var(--color-foreground) 8%, transparent))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Live indicator dot (subtle "telemetry feed" cue) */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
          live
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        {/* Eyebrow + icon */}
        <div className="flex items-center gap-2 text-foreground/65">
          <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
            {eyebrow}
          </span>
        </div>

        {/* Number */}
        <div className="flex items-baseline gap-1.5">
          {prefix && (
            <span className="text-xl md:text-2xl font-semibold text-foreground/75">
              {prefix}
            </span>
          )}
          <span className="text-4xl md:text-5xl font-semibold tracking-tighter tabular-nums text-foreground">
            <CountUp to={value} duration={1.6} />
          </span>
          {suffix && (
            <span className="text-lg md:text-xl font-medium text-foreground/65">
              {suffix}
            </span>
          )}
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-foreground/85 leading-snug">
          {label}
        </p>

        {/* Caveat */}
        {note && (
          <p className="text-[11px] text-foreground/55 leading-relaxed border-t border-border/40 pt-2.5">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}