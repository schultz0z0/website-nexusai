import assert from "node:assert/strict";
import test from "node:test";

import { parseContactSubmission } from "../src/lib/contact-submission.ts";

function formData(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

test("accepts an optional company and requires context", () => {
  assert.deepEqual(
    parseContactSubmission(
      formData({
        nome: "Rafa",
        email: "rafa@example.com",
        empresa: "",
        mensagem: "Quero conectar o ERP ao fluxo de atendimento.",
      }),
    ),
    {
      ok: true,
      data: {
        nome: "Rafa",
        email: "rafa@example.com",
        empresa: "",
        mensagem: "Quero conectar o ERP ao fluxo de atendimento.",
      },
    },
  );
});

test("rejects an invalid email", () => {
  assert.deepEqual(
    parseContactSubmission(
      formData({
        nome: "Rafa",
        email: "rafa",
        mensagem: "Quero conectar o ERP ao fluxo de atendimento.",
      }),
    ),
    { ok: false, error: "Email inválido." },
  );
});

test("rejects context outside the supported length", () => {
  assert.deepEqual(
    parseContactSubmission(
      formData({ nome: "Rafa", email: "rafa@example.com", mensagem: "curto" }),
    ),
    { ok: false, error: "Contexto deve ter entre 10 e 1000 caracteres." },
  );
});
