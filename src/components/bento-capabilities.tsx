"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TiltCard } from "./tilt-card";

/**
 * Asymmetric bento grid — 1 large card + 3 small cards, inspired by 21st.dev
 * Bento Grid patterns. Cards are TiltCard (3D on hover) by default.
 */

export interface BentoCard {
  title: string;
  desc: string;
  /** Optional CTA */
  cta?: { label: string; href: string };
  /** lucide-react icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** "primary" gets larger layout + more visual weight */
  variant?: "primary" | "default";
}

export interface BentoCapabilitiesProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: BentoCard[];
}

export function BentoCapabilities({
  eyebrow,
  title,
  subtitle,
  cards,
}: BentoCapabilitiesProps) {
  const primary = cards.find((c) => c.variant === "primary");
  const rest = cards.filter((c) => c.variant !== "primary");

  return (
    <section className="relative z-10 px-4 sm:px-6 py-24 md:py-32 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="block text-xs md:text-sm font-semibold text-foreground/55 uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
          {title}
        </h2>
        <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {primary && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 md:row-span-2"
          >
            <PrimaryBentoCard card={primary} />
          </motion.div>
        )}

        {rest.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
          >
            <StandardBentoCard card={card} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PrimaryBentoCard({ card }: { card: BentoCard }) {
  const Icon = card.icon;
  return (
    <TiltCard
      tiltLimit={6}
      scale={1.015}
      className="h-full min-h-[280px] md:min-h-[420px] rounded-2xl bg-gradient-to-br from-card/70 via-card/40 to-card/30 backdrop-blur-xl p-8 md:p-10 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.4)] flex flex-col"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-foreground/85" />
        </div>
        {card.cta && (
          <Link
            href={card.cta.href}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        )}
      </div>
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
        {card.title}
      </h3>
      <p className="text-sm md:text-base text-foreground/75 leading-relaxed flex-1">
        {card.desc}
      </p>
      {card.cta && (
        <Link
          href={card.cta.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors mt-6"
        >
          {card.cta.label}
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      )}
    </TiltCard>
  );
}

function StandardBentoCard({ card }: { card: BentoCard }) {
  const Icon = card.icon;
  return (
    <TiltCard
      tiltLimit={8}
      scale={1.02}
      className="h-full min-h-[200px] rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.3)]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-foreground/85" />
        </div>
        {card.cta && (
          <Link
            href={card.cta.href}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      <h3 className="text-base font-semibold text-foreground mb-2">{card.title}</h3>
      <p className="text-sm text-foreground/75 leading-relaxed">{card.desc}</p>
    </TiltCard>
  );
}
