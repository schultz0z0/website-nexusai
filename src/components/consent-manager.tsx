"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import {
  DEFAULT_CONSENT,
  CONSENT_STORAGE_KEY,
  deserializeConsent,
  readConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent";
import { syncOptionalTracking, trackEvent } from "@/lib/tracking";

type Panel = "banner" | "manage" | null;

const subscribeToConsent = (onStoreChange: () => void) => {
  window.addEventListener("nexus:consent-updated", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("nexus:consent-updated", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
};

export function ConsentManager() {
  const [panel, setPanel] = useState<Panel>(null);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const manageButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const consentSnapshot = useSyncExternalStore(
    subscribeToConsent,
    () => window.localStorage.getItem(CONSENT_STORAGE_KEY),
    () => null,
  );
  const consent: ConsentState | null = deserializeConsent(consentSnapshot);

  useEffect(() => {
    // The consent controls must not be clickable until React has attached handlers.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
    const stored = readConsent(window.localStorage);
    if (stored) syncOptionalTracking(stored);

    const openPreferences = () => {
      const current = readConsent(window.localStorage) ?? DEFAULT_CONSENT;
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
      setPanel("manage");
    };
    document.addEventListener("nexus:open-cookie-preferences", openPreferences);
    const openPreferencesFromFooter = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest("[data-cookie-preferences]")) return;
      lastTriggerRef.current = target.closest<HTMLElement>("[data-cookie-preferences]");
      openPreferences();
    };
    const trackCtaClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const cta = target.closest<HTMLElement>("[data-track-cta]");
      if (!cta) return;
      trackEvent("cta_click", {
        cta_id: cta.dataset.trackCta,
        cta_text: cta.textContent?.trim().slice(0, 120),
        destination: cta.getAttribute("href") ?? undefined,
      });
    };
    document.addEventListener("click", trackCtaClick);
    document.addEventListener("click", openPreferencesFromFooter);
    return () => {
      document.removeEventListener("nexus:open-cookie-preferences", openPreferences);
      document.removeEventListener("click", trackCtaClick);
      document.removeEventListener("click", openPreferencesFromFooter);
    };
  }, []);

  useEffect(() => {
    if (!panel) return;
    if (panel === "manage") {
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeManage();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [panel]);

  function closeManage() {
    setPanel(null);
    requestAnimationFrame(() => lastTriggerRef.current?.focus());
  }

  function save(next: { analytics: boolean; marketing: boolean }) {
    const saved = writeConsent(next, window.localStorage);
    setPanel(null);
    syncOptionalTracking(saved);
    window.dispatchEvent(new Event("nexus:consent-updated"));
  }

  function openManage() {
    const current = consent ?? DEFAULT_CONSENT;
    setAnalytics(current.analytics);
    setMarketing(current.marketing);
    lastTriggerRef.current = manageButtonRef.current;
    setPanel("manage");
  }

  return (
    <div data-consent-manager data-hydrated={hydrated ? "true" : "false"} className="contents">
      {hydrated && !consent && panel === null ? (
        <section
          data-consent-banner
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-2 bottom-2 z-[60] mx-auto max-w-5xl rounded-xl border border-white/15 bg-[#0b101a]/95 p-2.5 text-white shadow-2xl backdrop-blur-xl sm:inset-x-4 sm:p-3"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-5">
            <div className="min-w-0 max-w-2xl">
              <h2 id="cookie-consent-title" className="text-[0.8rem] font-semibold leading-tight sm:text-[0.95rem]">
                Cookies opcionais: desligados por padrão.
              </h2>
              <p className="mt-0.5 text-[0.7rem] leading-tight text-white/65 sm:mt-1 sm:text-[0.8rem] sm:leading-snug">
                Análise e marketing só com sua escolha.{" "}
                <Link className="underline underline-offset-2" href="/cookies">Ver detalhes</Link>.
              </p>
            </div>
            <div className="grid w-full grid-cols-3 gap-1.5 md:w-auto md:flex md:shrink-0 md:justify-end">
              <button type="button" aria-label="Rejeitar não necessários" onClick={() => save({ analytics: false, marketing: false })} className="min-h-9 rounded-lg border border-white/20 px-2 py-1.5 text-[0.68rem] font-semibold text-white/80 transition hover:border-white/40 hover:text-white sm:px-3 sm:text-xs">
                Rejeitar
              </button>
              <button ref={manageButtonRef} type="button" aria-label="Gerenciar cookies" onClick={openManage} className="min-h-9 rounded-lg border border-white/20 px-2 py-1.5 text-[0.68rem] font-semibold text-white/80 transition hover:border-white/40 hover:text-white sm:px-3 sm:text-xs">
                Gerenciar
              </button>
              <button type="button" aria-label="Aceitar todos" onClick={() => save({ analytics: true, marketing: true })} className="min-h-9 rounded-lg bg-white px-2 py-1.5 text-[0.68rem] font-semibold text-slate-900 transition hover:bg-blue-100 sm:px-3 sm:text-xs">
                Aceitar
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {panel === "manage" ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm sm:items-center sm:p-6" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title" className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0b101a] p-5 text-white shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">Preferências</p>
                <h2 id="cookie-settings-title" className="mt-1 text-xl font-semibold">Escolha como o site pode medir uso</h2>
              </div>
              <button ref={closeButtonRef} type="button" aria-label="Fechar preferências de cookies" onClick={closeManage} className="rounded-md px-2 py-1 text-xl leading-none text-white/60 hover:text-white">×</button>
            </div>

            <div className="mt-5 space-y-3">
              <label className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <span><strong className="block text-sm">Necessários</strong><small className="mt-1 block text-xs leading-relaxed text-white/60">Mantêm o site e sua escolha de privacidade funcionando. Sempre ativos.</small></span>
                <input type="checkbox" checked disabled aria-label="Cookies necessários sempre ativos" className="mt-1 h-4 w-4 accent-blue-500" />
              </label>
              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <span><strong className="block text-sm">Analytics</strong><small className="mt-1 block text-xs leading-relaxed text-white/60">Mede navegação e uso agregado para melhorar o site. Desligado por padrão.</small></span>
                <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} aria-label="Permitir cookies de analytics" className="mt-1 h-4 w-4 accent-blue-500" />
              </label>
              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <span><strong className="block text-sm">Marketing/Publicidade</strong><small className="mt-1 block text-xs leading-relaxed text-white/60">Permite mensuração de campanhas, quando uma ferramenta estiver configurada. Desligado por padrão.</small></span>
                <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} aria-label="Permitir cookies de marketing" className="mt-1 h-4 w-4 accent-blue-500" />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={() => save({ analytics: false, marketing: false })} className="rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 hover:border-white/40 hover:text-white">Rejeitar não necessários</button>
              <button type="button" onClick={() => save({ analytics, marketing })} className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-blue-100">Salvar preferências</button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
