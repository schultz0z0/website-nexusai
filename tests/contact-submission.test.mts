import assert from "node:assert/strict";
import test from "node:test";

import * as contactSubmission from "../src/lib/contact-submission.ts";

const { parseContactSubmission } = contactSubmission;

function formData(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

test("accepts an optional company and requires phone and context", () => {
  assert.deepEqual(
    parseContactSubmission(
      formData({
        nome: "Rafa",
        email: "rafa@example.com",
        telefone: "11912345678",
        empresa: "",
        mensagem: "Quero conectar o ERP ao fluxo de atendimento.",
      }),
    ),
    {
      ok: true,
      data: {
        nome: "Rafa",
        email: "rafa@example.com",
        telefone: "(11) 91234-5678",
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
        telefone: "(11) 91234-5678",
        mensagem: "Quero conectar o ERP ao fluxo de atendimento.",
      }),
    ),
    { ok: false, error: "Email inválido." },
  );
});

test("rejects context outside the supported length", () => {
  assert.deepEqual(
    parseContactSubmission(
      formData({
        nome: "Rafa",
        email: "rafa@example.com",
        telefone: "(11) 91234-5678",
        mensagem: "curto",
      }),
    ),
    { ok: false, error: "Contexto deve ter entre 10 e 1000 caracteres." },
  );
});

test("rejects a missing phone", () => {
  assert.deepEqual(
    parseContactSubmission(
      formData({
        nome: "Rafa",
        email: "rafa@example.com",
        mensagem: "Quero conectar o ERP ao fluxo de atendimento.",
      }),
    ),
    { ok: false, error: "Preencha nome, email, telefone e contexto." },
  );
});

test("rejects a phone outside the Brazilian fixed-line or mobile length", () => {
  assert.deepEqual(
    parseContactSubmission(
      formData({
        nome: "Rafa",
        email: "rafa@example.com",
        telefone: "1234",
        mensagem: "Quero conectar o ERP ao fluxo de atendimento.",
      }),
    ),
    { ok: false, error: "Telefone inválido. Informe DDD e número." },
  );
});

test("builds the new Prometeus Google Forms request with every contact field", () => {
  const buildRequest = (
    contactSubmission as Record<string, unknown>
  ).buildGoogleFormsRequest;

  assert.equal(typeof buildRequest, "function");
  if (typeof buildRequest !== "function") return;

  const request = (
    buildRequest as (submission: {
      nome: string;
      email: string;
      telefone: string;
      empresa: string;
      mensagem: string;
    }) => { actionUrl: string; body: URLSearchParams }
  )({
    nome: "Rafa",
    email: "rafa@example.com",
    telefone: "(11) 91234-5678",
    empresa: "Prometeus",
    mensagem: "Quero automatizar o atendimento.",
  });

  assert.equal(
    request.actionUrl,
    "https://docs.google.com/forms/d/e/1FAIpQLSeXHhFmCTWaIJuNJVOhtIwGyuCkTeRidD6BoiAlYi3G8dptzA/formResponse",
  );
  assert.deepEqual(Object.fromEntries(request.body), {
    "entry.1959364931": "Rafa",
    "entry.697022162": "rafa@example.com",
    "entry.1807587310": "(11) 91234-5678",
    "entry.1391509784": "Prometeus",
    "entry.889371697": "Quero automatizar o atendimento.",
  });
});
