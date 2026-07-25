import { BackgroundCanvas } from "@/components/background-canvas";

export const metadata = { title: "Soluções · Nexus AI" };

export default function SolucoesPage() {
  return (
    <div className="relative w-full min-h-[80vh] bg-background flex flex-col justify-center items-center px-4 py-24 md:py-0">
      <BackgroundCanvas variant="solucoes" />
      <div className="relative z-10 text-center max-w-2xl">
        <span className="tahoe-glass-text block text-5xl md:text-7xl leading-[0.95] mb-6">
          Soluções
        </span>
        <p className="text-lg md:text-xl font-normal text-foreground max-w-xl mx-auto leading-snug">
          Conteúdo em construção. Voltamos em breve com as áreas onde a Nexus AI entrega resultado.
        </p>
      </div>
    </div>
  );
}
