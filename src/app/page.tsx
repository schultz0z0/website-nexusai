"use client";

import { PixelHero } from "@/components/ui/pixel-perfect-hero";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-background">
      <PixelHero
        word1="Soluções"
        word2="Nexus AI"
        description="Plataformas e agentes de IA que automatizam processos, integram dados e entregam produtos digitais prontos pra escalar."
        primaryCta="Solicitar Proposta"
        primaryCtaMobile="Proposta"
        secondaryCta="Ver no GitHub"
        secondaryCtaMobile="GitHub"
        onPrimaryClick={() => console.log("Primary click action triggered.")}
        onSecondaryClick={() => console.log("Secondary click action triggered.")}
        githubUrl="https://github.com"
      />
    </div>
  );
}
