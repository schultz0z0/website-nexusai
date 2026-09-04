import assert from "node:assert/strict";
import test from "node:test";

import {
  COMPANY,
  CONTACT_COPY,
  HOME_ASSURANCES,
  HOME_CAPABILITIES,
  HOME_COPY,
  HOME_DEMOS,
  HOME_FAQ,
} from "../src/lib/content.ts";

const publicContent = {
  COMPANY,
  CONTACT_COPY,
  HOME_ASSURANCES,
  HOME_CAPABILITIES,
  HOME_COPY,
  HOME_DEMOS,
  HOME_FAQ,
};

test("publishes only the official Prometeus contact and social channels", () => {
  assert.equal(COMPANY.email, "comercial@agenciaprometeus.com.br");
  assert.deepEqual(COMPANY.emails, ["comercial@agenciaprometeus.com.br"]);
  assert.deepEqual(COMPANY.socials, [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/prometeus.official/",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/prometeus-official",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61594187724984",
    },
  ]);

  const serialized = JSON.stringify(COMPANY);
  assert.doesNotMatch(serialized, /raphaelschultz12|esttevao\.henrique/i);
});

test("contains no prohibited or unverified public claims", () => {
  const serialized = JSON.stringify(publicContent);

  assert.doesNotMatch(serialized, /gargal/i);
  assert.doesNotMatch(
    serialized,
    /12\+|plataformas operando|em cliente, com uso real|8 setores|100%|primeiros ganhos|ROI esperado/i,
  );
});

test("labels both examples as functional demonstrations", () => {
  assert.equal(HOME_DEMOS.length, 2);
  assert.ok(
    HOME_DEMOS.every((demo) => demo.label === "Demonstração funcional"),
  );
});

test("keeps contact classification lightweight", () => {
  assert.equal(CONTACT_COPY.fields.length, 5);
  assert.deepEqual(
    CONTACT_COPY.fields.map((field) => field.name),
    ["nome", "email", "telefone", "empresa", "mensagem"],
  );
  assert.equal(
    CONTACT_COPY.fields.find((field) => field.name === "telefone")?.required,
    true,
  );
  assert.equal(
    CONTACT_COPY.fields.find((field) => field.name === "empresa")?.required,
    false,
  );
});

test("answers the six approved decision questions", () => {
  assert.equal(HOME_FAQ.length, 6);
  assert.deepEqual(
    HOME_ASSURANCES.map((item) => item.id),
    ["context", "integration", "control", "ownership"],
  );
  assert.equal(HOME_CAPABILITIES.length, 4);
});
