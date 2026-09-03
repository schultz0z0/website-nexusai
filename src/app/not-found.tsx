import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Página não encontrada | Prometeus",
  description: "A página que você procurou não existe. Volte ao início para conhecer a Prometeus.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-8">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(31,91,190,0.22),transparent_48%)]" />
      <div className="relative mx-auto max-w-xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">Prometeus / 404</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Essa página saiu do fluxo.</h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">O endereço não existe ou mudou. Vamos levar você de volta para o ponto de partida.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar ao início
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
