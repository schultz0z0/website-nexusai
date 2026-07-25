import { PixelHero } from "@/components/ui/pixel-perfect-hero";
import { BackgroundCanvas } from "@/components/background-canvas";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <BackgroundCanvas variant="home" />
      <PixelHero
        word1="Sua equipe"
        word2="multiplicada"
        description="Plataformas e agentes da Nexus AI assumem o trabalho repetitivo, do atendimento à análise. Sua equipe fica livre pro que só humano faz: decidir, criar, crescer."
        primaryCta="Solicitar Proposta"
        primaryCtaMobile="Proposta"
        secondaryCta="Ver no GitHub"
        secondaryCtaMobile="GitHub"
        primaryHref="/contato"
        githubUrl="https://github.com"
      />
    </div>
  );
}
