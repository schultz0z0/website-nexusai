import assert from "node:assert/strict";
import test from "node:test";
import { SERVICES, getService, servicePath } from "../src/lib/service-content.ts";
import { buildServiceSchemas } from "../src/lib/service-schema.ts";
import { COMPANY } from "../src/lib/content.ts";
import { GET } from "../src/app/llms.txt/route.ts";

test("publishes distinct services and never resolves an unknown service", () => {
  assert.equal(new Set(SERVICES.map((service) => service.slug)).size, 4);
  assert.equal(getService("missing"), undefined);
  assert.equal(getService("toString"), undefined);
  assert.equal(getService("agentes-de-ia")?.name, "Agentes de IA para empresas");
});

test("keeps service schema aligned with visible editorial content", () => {
  for (const service of SERVICES) {
    const [schema, breadcrumbs] = buildServiceSchemas(service);
    assert.equal(schema.name, service.name);
    assert.equal(schema.description, service.description);
    assert.equal(schema.url, `${COMPANY.url}${servicePath(service)}`);
    assert.deepEqual(schema.provider, { "@id": `${COMPANY.url}/#organization`, "@type": "Organization", name: COMPANY.name, url: COMPANY.url });
    const items = breadcrumbs.itemListElement as Array<{ item: string }>;
    assert.equal(items.at(-1)?.item, schema.url);
    assert.doesNotMatch(JSON.stringify(service), /100%|ROI garantido|clientes atendidos|certificado|gargal/i);
  }
});

test("lists every service in llms.txt with the canonical URL", async () => {
  const response = GET();
  assert.match(response.headers.get("Content-Type") ?? "", /text\/plain/);
  const content = await response.text();
  for (const service of SERVICES) {
    assert.ok(content.includes(`${COMPANY.url}${servicePath(service)}`));
    assert.ok(content.includes(service.name));
  }
});
