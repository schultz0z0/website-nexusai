import Link from "next/link";

const ITEMS = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Processo", href: "/processo" },
  { label: "Contato", href: "/contato" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 mt-12 md:mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Nexus AI — voltar ao início"
            className="inline-flex items-center gap-2 text-foreground/90 hover:text-foreground transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="6" className="fill-foreground" />
              <path
                d="M7 17 V7 L17 17 V7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-background"
              />
            </svg>
            <span className="text-sm font-semibold tracking-tight">
              Nexus<span className="text-foreground/60 font-medium"> AI</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
            {ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="mailto:contato@nexusai.com.br"
              className="hover:text-foreground transition-colors"
            >
              contato@nexusai.com.br
            </a>
          </nav>
        </div>
        <div className="mt-6 pt-6 border-t border-border/40 text-xs text-foreground/50">
          © {year} Nexus AI. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
