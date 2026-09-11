import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function NexusNav() {
  return (
    <nav
      data-site-navigation="true"
      data-mobile-navigation="true"
      aria-label="Navegação principal"
      className="fixed inset-x-0 top-0 z-50 isolate h-16 border-b border-white/10 bg-[#070a10]/78 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl md:h-[72px]"
    >
      <span
        aria-hidden="true"
        className="nexus-nav-sheen absolute inset-0 -z-10 opacity-25"
      />

      <div
        data-navigation-inner="true"
        className="mx-auto flex h-full w-full items-center justify-between px-4 sm:px-6 md:max-w-[1240px] lg:px-10 xl:px-12"
      >
        <Link
          href="/"
          aria-label="Prometeus — voltar ao início"
          className="inline-flex h-10 items-center opacity-90 transition-opacity hover:opacity-100 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex h-10 items-center">
            <Image
              src="/images/Logo Principal.png"
              alt="Prometeus"
              width={322}
              height={88}
              priority
              className="h-8 w-auto md:h-9"
            />
          </div>
        </Link>

        <Link
          href="/contato"
          data-track-cta="nav_contact"
          aria-label="Falar com a equipe"
          className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-gradient-to-b from-primary/90 to-primary px-4 text-xs font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_3px_10px_rgba(0,0,0,0.2)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] md:px-5 md:text-sm"
        >
          <span className="md:hidden">Falar</span>
          <span className="hidden md:inline">Falar com a equipe</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
