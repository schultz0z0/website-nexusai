export const CONSENT_STORAGE_KEY = "nexus-cookie-consent";
export const CONSENT_VERSION = "2026-08-31";

export type ConsentState = {
  version: string;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const DEFAULT_CONSENT: ConsentState = {
  version: CONSENT_VERSION,
  analytics: false,
  marketing: false,
  updatedAt: "",
};

export function serializeConsent(state: ConsentState): string {
  return JSON.stringify({
    version: CONSENT_VERSION,
    analytics: Boolean(state.analytics),
    marketing: Boolean(state.marketing),
    updatedAt: state.updatedAt,
  });
}

export function deserializeConsent(value: string | null): ConsentState | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<ConsentState>;
    if (
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean" ||
      typeof parsed.updatedAt !== "string"
    ) {
      return null;
    }

    return {
      version: CONSENT_VERSION,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return null;
  }
}

export function readConsent(storage?: Storage): ConsentState | null {
  if (!storage) return null;
  return deserializeConsent(storage.getItem(CONSENT_STORAGE_KEY));
}

export function writeConsent(
  state: Omit<ConsentState, "version" | "updatedAt">,
  storage?: Storage,
): ConsentState {
  const next: ConsentState = {
    version: CONSENT_VERSION,
    analytics: Boolean(state.analytics),
    marketing: Boolean(state.marketing),
    updatedAt: new Date().toISOString(),
  };
  storage?.setItem(CONSENT_STORAGE_KEY, serializeConsent(next));
  return next;
}
