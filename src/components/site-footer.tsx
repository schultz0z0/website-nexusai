import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Contato", href: "/contato" },
  { label: "Privacidade", href: "/privacidade" },
  { label: "Cookies", href: "/cookies" },
] as const;

const EMAILS = [
  "raphaelschultz12@gmail.com",
  "esttevao.henrique@hotmail.com",
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border/40 md:mt-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[auto_1fr] md:items-start md:py-14">
        <Link
          href="/"
          aria-label="Prometeus — voltar ao início"
          className="inline-flex w-fit items-center rounded-lg opacity-85 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Image
            src="/images/logo.png"
            alt="Prometeus"
            width={1823}
            height={467}
            sizes="144px"
            className="h-auto w-[220px]"
          />
        </Link>

        <div className="grid gap-8 md:justify-self-end md:text-right">
          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70 md:justify-end">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1 text-sm text-foreground/60">
            {EMAILS.map((email) => (
              <a key={email} href={`mailto:${email}`} className="transition-colors hover:text-foreground">
                {email}
              </a>
            ))}
          </div>
          <button
            type="button"
            data-cookie-preferences
            className="w-fit text-left text-xs text-foreground/50 underline-offset-4 transition-colors hover:text-foreground hover:underline md:justify-self-end"
          >
            Preferências de cookies
          </button>
        </div>

        <div className="border-t border-border/40 pt-6 text-xs text-foreground/50 md:col-span-2">
          © {year} Prometeus. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
