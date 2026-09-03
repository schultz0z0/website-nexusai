import assert from "node:assert/strict";
import test from "node:test";

import sitemap from "../src/app/sitemap.ts";
import {
  CONSENT_VERSION,
  DEFAULT_CONSENT,
  deserializeConsent,
  serializeConsent,
} from "../src/lib/consent.ts";
import { COMPANY } from "../src/lib/content.ts";
import {
  buildSafeEventParams,
  buildQueuedCommand,
  getTrackingScriptIdsToRemove,
} from "../src/lib/tracking.ts";

test("uses the official canonical domain and publishes only indexable routes", () => {
  assert.equal(COMPANY.url, "https://solucoes-nexus.tech");
  assert.deepEqual(
    sitemap().map((entry) => new URL(entry.url).pathname),
    ["/", "/contato", "/privacidade", "/cookies"],
  );
  assert.ok(sitemap().every((entry) => !entry.url.includes("?")));
});

test("serializes and restores an explicit consent choice without adding categories", () => {
  const encoded = serializeConsent({
    version: CONSENT_VERSION,
    analytics: true,
    marketing: false,
    updatedAt: "2026-08-31T12:00:00.000Z",
  });

  assert.deepEqual(deserializeConsent(encoded), {
    version: CONSENT_VERSION,
    analytics: true,
    marketing: false,
    updatedAt: "2026-08-31T12:00:00.000Z",
  });
  assert.deepEqual(DEFAULT_CONSENT, {
    version: CONSENT_VERSION,
    analytics: false,
    marketing: false,
    updatedAt: "",
  });
  assert.equal(deserializeConsent("not-json"), null);
  assert.equal(
    deserializeConsent(JSON.stringify({ version: "old", analytics: true })),
    null,
  );
});

test("keeps tracking parameters free of form PII", () => {
  assert.deepEqual(
    buildSafeEventParams("cta_click", {
      cta_id: "hero_contact",
      cta_text: "Falar com a equipe",
      destination: "/contato",
      name: "Rafa",
      email: "rafa@example.com",
      mensagem: "texto privado",
    }),
    {
      cta_id: "hero_contact",
      cta_text: "Falar com a equipe",
      destination: "/contato",
      page_path: "/",
    },
  );
});

test("queues tracking commands as argument arrays", () => {
  assert.deepEqual(buildQueuedCommand(["event", "page_view", { page_path: "/" }]), [
    "event",
    "page_view",
    { page_path: "/" },
  ]);
});

test("removes optional scripts by revoked consent category", () => {
  assert.deepEqual(
    getTrackingScriptIdsToRemove({ analytics: false, marketing: true }),
    ["gtm", "ga4"],
  );
  assert.deepEqual(
    getTrackingScriptIdsToRemove({ analytics: true, marketing: false }),
    ["meta-pixel"],
  );
  assert.deepEqual(
    getTrackingScriptIdsToRemove({ analytics: false, marketing: false }),
    ["gtm", "ga4", "meta-pixel"],
  );
});
