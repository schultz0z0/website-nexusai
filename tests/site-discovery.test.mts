import assert from "node:assert/strict";
import test from "node:test";

import sitemap from "../src/app/sitemap.ts";
import { COMPANY } from "../src/lib/content.ts";
import { SITE_DESCRIPTION, SITE_TITLE } from "../src/lib/site-metadata.ts";

test("publishes only canonical public routes in the sitemap", () => {
  assert.deepEqual(
    sitemap().map((entry) => new URL(entry.url).pathname),
    ["/", "/contato", "/privacidade", "/cookies"],
  );
});

test("positions Prometeus as a custom digital solutions company", () => {
  assert.equal(SITE_TITLE, "Prometeus | Automação e IA sob medida para empresas");
  assert.match(SITE_DESCRIPTION, /automações, agentes de IA e integrações sob medida/i);
  assert.match(COMPANY.description, /soluções digitais sob medida/i);
  assert.doesNotMatch(COMPANY.description, /plataformas e agentes/i);
});
