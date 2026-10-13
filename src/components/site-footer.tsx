import Image from "next/image";
import Link from "next/link";

import { COMPANY } from "@/lib/content";
import { OFFER_NAVIGATION } from "@/lib/offer-navigation";
import { whatsappContact } from "@/lib/commercial-contact";
import styles from "./site-footer.module.css";

type SocialId = (typeof COMPANY.socials)[number]["id"];

function SocialIcon({ id }: { id: SocialId }) {
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.16c3.2 0 3.58.02 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.25-.15-4.77-1.69-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.22 1.67-4.77 4.92-4.92C8.42 2.18 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.69.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"
        />
      </svg>
    );
  }

  if (id === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.99H7.1v11.46ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
      <path
        fill="currentColor"
        d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.09 4.39 23.08 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z"
      />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
        <div className={styles.brand}>
        <Link
          href="/"
          aria-label="Prometeus — voltar ao início"
          className={styles.logo}
        >
          <Image
            src="/images/logo-secundaria.webp"
            alt="Prometeus"
            width={532}
            height={145}
            className="h-auto w-[180px]"
          />
        </Link>

          <div className={styles.contacts}>
            {COMPANY.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                aria-label={`Enviar email para ${email}`}
                className={styles.email}
              >
                {email}
              </a>
            ))}
            <a href={whatsappContact()} target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp</a>
          </div>

          <nav aria-label="Redes sociais" className={styles.socials}>
            {COMPANY.socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Prometeus no ${social.label}`}
                className={styles.social}
              >
                <span className="size-[18px]">
                  <SocialIcon id={social.id} />
                </span>
              </a>
            ))}
          </nav>
        </div>
        {OFFER_NAVIGATION.map((group) => (
          <nav key={group.label} aria-label={`${group.label} no rodapé`} className={styles.offers}>
            <h2>{group.label}</h2>
            <ul>{group.items.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
          </nav>
        ))}
        </div>
        <div className={styles.bottom}>
          <p>© {year} Prometeus. Todos os direitos reservados.</p>
          <nav aria-label="Informações e privacidade" className={styles.legal}>
            <Link href="/contato">Contato</Link>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/cookies">Cookies</Link>
            <button type="button" data-cookie-preferences>Preferências de cookies</button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
