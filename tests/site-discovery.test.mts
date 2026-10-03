import assert from "node:assert/strict";
import test from "node:test";

import sitemap from "../src/app/sitemap.ts";
import { COMPANY } from "../src/lib/content.ts";
import { SITE_DESCRIPTION, SITE_TITLE } from "../src/lib/site-metadata.ts";

test("publishes only canonical public routes in the sitemap", () => {
  assert.deepEqual(
    sitemap().map((entry) => new URL(entry.url).pathname),
    ["/", "/contato", "/privacidade", "/cookies", "/servicos", "/servicos/automacao-de-processos", "/servicos/agentes-de-ia", "/servicos/integracao-de-sistemas", "/servicos/desenvolvimento-sob-medida"],
  );
});

test("keeps editorial modification dates stable across generations", () => {
  assert.deepEqual(sitemap(), sitemap());
  for (const entry of sitemap()) {
    if (entry.lastModified) {
      assert.equal(typeof entry.lastModified, "string", "Use uma data editorial estável, não a data de geração.");
      assert.ok(new Date(entry.lastModified).getTime() <= Date.now());
    }
  }
});

test("positions Prometeus as a custom digital solutions company", () => {
  assert.equal(SITE_TITLE, "Prometeus | Automação e IA sob medida para empresas");
  assert.match(SITE_DESCRIPTION, /automações, agentes de IA e integrações sob medida/i);
  assert.match(COMPANY.description, /soluções digitais sob medida/i);
  assert.doesNotMatch(COMPANY.description, /plataformas e agentes/i);
});
