import { readConsent } from "./consent.ts";

export type TrackingEventName =
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "lead_captured";

type EventParams = Record<string, unknown>;

const SAFE_PARAM_KEYS: Record<TrackingEventName, readonly string[]> = {
  cta_click: ["cta_id", "cta_text", "destination"],
  form_start: [],
  form_submit: [],
  lead_captured: [],
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function buildQueuedCommand(args: unknown[]): unknown[] {
  return [...args];
}

export function getTrackingScriptIdsToRemove(consent: {
  analytics: boolean;
  marketing: boolean;
}): string[] {
  const ids: string[] = [];
  if (!consent.analytics) ids.push("gtm", "ga4");
  if (!consent.marketing) ids.push("meta-pixel");
  return ids;
}

export function buildSafeEventParams(
  name: TrackingEventName,
  params: EventParams = {},
  path = "/",
): Record<string, string> {
  const safe: Record<string, string> = { page_path: path };
  for (const key of SAFE_PARAM_KEYS[name]) {
    const value = params[key];
    if (typeof value === "string" && value.length <= 160) safe[key] = value;
  }
  return safe;
}

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const search = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ]) {
    const value = search.get(key);
    if (value && value.length <= 160) result[key] = value;
  }
  return result;
}

export function trackEvent(name: TrackingEventName, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const consent = readConsent(window.localStorage);
  if (!consent?.analytics && !consent?.marketing) return;

  const safeParams = {
    ...buildSafeEventParams(name, params, window.location.pathname),
    ...getUtmParams(),
  };

  if (consent.analytics) window.gtag?.("event", name, safeParams);
  if (window.dataLayer) window.dataLayer.push({ event: name, ...safeParams });

  if (name === "lead_captured" && consent.marketing) {
    window.fbq?.("track", "Lead");
  }
}

export function removeOptionalTrackingScripts() {
  if (typeof document === "undefined") return;
  document
    .querySelectorAll("script[data-nexus-tracking]")
    .forEach((script) => script.remove());
}

function removeTrackingScriptsById(ids: readonly string[]) {
  for (const id of ids) {
    document
      .querySelectorAll(`script[data-nexus-tracking="${id}"]`)
      .forEach((script) => script.remove());
  }
}

function appendScript(src: string, id: string) {
  if (document.querySelector(`script[data-nexus-tracking="${id}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.dataset.nexusTracking = id;
  document.head.appendChild(script);
}

export function syncOptionalTracking(consent: {
  analytics: boolean;
  marketing: boolean;
}) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!consent.analytics) {
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
    });
  }
  if (!consent.marketing) window.fbq?.("consent", "revoke");

  removeTrackingScriptsById(getTrackingScriptIdsToRemove(consent));

  if (!consent.analytics && !consent.marketing) {
    return;
  }

  if (consent.analytics && (gtmId || ga4Id)) {
    window.dataLayer = window.dataLayer ?? [];
    if (gtmId) {
      window.dataLayer.push({
        "gtm.start": Date.now(),
        event: "gtm.js",
      });
      appendScript(
        `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`,
        "gtm",
      );
    } else if (ga4Id) {
      window.gtag = window.gtag ?? ((...args: unknown[]) => {
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push(buildQueuedCommand(args));
      });
      if (!document.querySelector('script[data-nexus-tracking="ga4"]')) {
        window.gtag("js", new Date());
        window.gtag("config", ga4Id, { send_page_view: true });
      }
      appendScript(
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`,
        "ga4",
      );
    }
  }

  if (consent.marketing && metaId) {
    window.fbq = window.fbq ?? ((...args: unknown[]) => {
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push(buildQueuedCommand(args));
    });
    if (!document.querySelector('script[data-nexus-tracking="meta-pixel"]')) {
      window.fbq("init", metaId);
      window.fbq("track", "PageView");
    }
    appendScript("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel");
  }
}
