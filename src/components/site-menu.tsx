"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./site-menu.module.css";

type OfferGroup = { label: string; items: { label: string; href: string }[] };

export function SiteMenu({ groups, contactHref }: { groups: OfferGroup[]; contactHref: string }) {
  const root = useRef<HTMLDivElement>(null);

  function closeMenus() {
    root.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((menu) => { menu.open = false; });
  }

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) closeMenus();
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const openMenus = root.current?.querySelectorAll<HTMLDetailsElement>("details[open]");
      if (!openMenus?.length) return;
      const outerMenu = openMenus[0];
      closeMenus();
      outerMenu.querySelector<HTMLElement>("summary")?.focus();
    }
    const desktop = window.matchMedia("(min-width: 1024px)");
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", closeMenus);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", closeMenus);
    };
  }, []);

  function onBlur(event: React.FocusEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.open = false;
  }

  function offerings() {
    return groups.map((group) => (
      <section key={group.label} className={styles.group}>
        <h2>{group.label}</h2>
        <ul>
          {group.items.map((item) => <li key={item.href}><Link href={item.href} onClick={closeMenus}>{item.label}</Link></li>)}
        </ul>
      </section>
    ));
  }

  return (
    <div ref={root} className={styles.root}>
      <div className={styles.desktop}>
        <Link className={styles.topLink} href="/">Início</Link>
        <div className={styles.serviceEntry}>
          <Link className={styles.topLink} href="/servicos" onClick={closeMenus}>Serviços</Link>
          <details className={styles.services} onBlur={onBlur}>
            <summary aria-label="Expandir serviços" className={styles.expand}><ChevronDown size={16} aria-hidden="true" /></summary>
            <div aria-label="Opções de serviços" role="region" className={styles.offerPanel}>
              <div className={styles.offerColumns}>{offerings()}</div>
              <Link href="/servicos" className={styles.allOffers} onClick={closeMenus}>Ver todas as ofertas</Link>
            </div>
          </details>
        </div>
        <Link className={styles.topLink} href="/#como-trabalhamos">Como trabalhamos</Link>
      </div>

      <a href={contactHref} target="_blank" rel="noopener noreferrer" data-track-cta="nav_whatsapp" aria-label="Falar pelo WhatsApp" className={styles.contact}>
        <span className={styles.contactDesktop}>Falar pelo WhatsApp</span><span className={styles.contactMobile}>Falar</span>
      </a>

      <details className={styles.mobile} onBlur={onBlur}>
        <summary aria-label="Menu principal" className={styles.menuToggle}><Menu className={styles.menuIcon} size={20} aria-hidden="true" /><X className={styles.closeIcon} size={20} aria-hidden="true" /></summary>
        <div role="region" aria-label="Navegação no celular" className={styles.mobilePanel}>
          <Link href="/" className={styles.mobileLink} onClick={closeMenus}>Início</Link>
          <div className={styles.mobileServices}>
            <Link href="/servicos" className={styles.mobileLink} onClick={closeMenus}>Serviços</Link>
            <details className={styles.mobileOffers}>
              <summary aria-label="Expandir serviços" className={styles.expand}><ChevronDown size={18} aria-hidden="true" /></summary>
              <div className={styles.mobileOfferColumns}>{offerings()}</div>
            </details>
          </div>
          <Link href="/#como-trabalhamos" className={styles.mobileLink} onClick={closeMenus}>Como trabalhamos</Link>
        </div>
      </details>
    </div>
  );
}
