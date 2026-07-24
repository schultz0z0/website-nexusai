"use client";

import { PixelHero } from "@/components/ui/pixel-perfect-hero";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-background">
      <PixelHero
        word1="Sua equipe"
        word2="multiplicada"
        description="Plataformas e agentes da Nexus AI assumem o trabalho repetitivo, do atendimento à análise. Sua equipe fica livre pro que só humano faz: decidir, criar, crescer."
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
