"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { type PointerEvent as ReactPointerEvent } from "react";

import { HOME_COPY, HOME_FAQ } from "@/lib/content";

import styles from "./final-conversion.module.css";

export function FinalConversion() {
  function moveCta(event: ReactPointerEvent<HTMLAnchorElement>) {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const link = event.currentTarget;
    const rect = link.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    link.style.setProperty("--magnet-x", `${x}px`);
    link.style.setProperty("--magnet-y", `${y}px`);
  }

  function resetCta(event: ReactPointerEvent<HTMLAnchorElement>) {
    event.currentTarget.style.setProperty("--magnet-x", "0px");
    event.currentTarget.style.setProperty("--magnet-y", "0px");
  }

  return (
    <section
      id="cta"
      data-home-chapter="cta"
      aria-labelledby="cta-title"
      className={styles.section}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.shell}>
        <div className={styles.pitch}>
          <p className={styles.eyebrow}>{HOME_COPY.cta.eyebrow}</p>
          <h2 id="cta-title">{HOME_COPY.cta.title}</h2>
          <p>{HOME_COPY.cta.body}</p>
          <Link
            href="/contato"
            data-track-cta="final_contact"
            className={styles.cta}
            onPointerMove={moveCta}
            onPointerLeave={resetCta}
          >
            {HOME_COPY.cta.label}
            <ArrowRight aria-hidden="true" />
          </Link>
          <small>{HOME_COPY.cta.microcopy}</small>
        </div>

        <div className={styles.faq}>
          <p className={styles.faqLabel}>Antes da conversa</p>
          {HOME_FAQ.map((item) => (
            <details key={item.q} name="home-faq">
              <summary>
                {item.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
