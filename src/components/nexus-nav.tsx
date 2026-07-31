"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NexusMark } from "@/components/nexus-mark";

const ITEMS = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Processo", href: "/processo" },
] as const;

export function NexusNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Brand logo + nav desktop — single pill */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 rounded-xl bg-card/40 backdrop-blur-md px-2 py-2 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)]">
        <div className="relative isolate">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-xl opacity-90 nexus-nav-sheen"
          />
          <Link
            href="/"
            aria-label="Nexus AI — voltar ao início"
            className="inline-flex items-center gap-2 rounded-lg pl-2 pr-4 py-1.5 text-foreground/90 hover:text-foreground transition-colors"
          >
            <NexusMark className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-tight">
              Nexus<span className="text-foreground/60 font-medium"> AI</span>
            </span>
          </Link>
        </div>
        <div className="h-5 w-px bg-border/50" aria-hidden="true" />
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 text-sm font-medium text-foreground/85 hover:text-foreground rounded-lg hover:bg-foreground/5 transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/contato"
          className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-lg bg-gradient-to-b from-primary/90 to-primary px-4 text-xs font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Falar com a equipe
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </nav>

      {/* Mobile: standalone logo + hamburger button */}
      <Link
        href="/"
        aria-label="Nexus AI — voltar ao início"
        className="fixed top-4 left-4 z-50 md:hidden inline-flex items-center gap-2 rounded-lg px-2 py-1 text-foreground/90 hover:text-foreground transition-colors"
      >
        <NexusMark className="h-7 w-7" />
        <span className="text-sm font-semibold tracking-tight">
          Nexus<span className="text-foreground/60 font-medium"> AI</span>
        </span>
      </Link>

      {/* Mobile: hamburger top-right */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        className="fixed top-4 right-4 z-50 md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50 shadow-[0_4px_16px_rgba(0,0,0,0.3)] text-foreground"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Scrim */}
        <div
          aria-hidden
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
        {/* Sheet */}
        <div
          className={`absolute top-20 right-4 left-4 origin-top transition-transform duration-300 ${open ? "scale-100" : "scale-95"}`}
        >
          <div className="relative isolate rounded-xl bg-card/70 backdrop-blur-xl ring-1 ring-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-60 nexus-nav-sheen rounded-xl"
            />
            <ul className="flex flex-col p-2">
              {ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 text-base font-medium text-foreground/90 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
                  >
                    {item.label}
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </Link>
                </li>
              ))}
              <li className="mt-1 pt-1 border-t border-border/40">
                <Link
                  href="/contato"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 mx-2 my-2 px-4 py-3 rounded-lg bg-gradient-to-b from-primary/90 to-primary text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-primary/20"
                >
                  Falar com a equipe
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
