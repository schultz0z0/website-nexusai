"use client";

import { useActionState, useId } from "react";
import { ArrowRight } from "lucide-react";
import { enviarMensagem } from "./actions";

type FormState =
  | { ok: true }
  | { ok: false; error: string }
  | null;

export function ContactForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    enviarMensagem,
    null,
  );
  const formId = useId();

  if (state?.ok === true) {
    return (
      <div className="rounded-xl bg-card/40 backdrop-blur-md p-8 md:p-10 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)] text-center">
        <div className="text-3xl mb-3 text-emerald-400" aria-hidden>
          ✓
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Mensagem enviada
        </h2>
        <p className="text-sm text-foreground/85 leading-relaxed">
          Recebemos. Vamos responder em até 24h úteis com próximos passos.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-xl bg-card/40 backdrop-blur-md p-6 md:p-8 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)]"
      noValidate
    >
      {/* honeypot — bots preenchem, humanos não veem */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none h-0 w-0"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField id={`${formId}-nome`} label="Nome" name="nome" required />
        <FormField
          id={`${formId}-email`}
          label="Email"
          name="email"
          type="email"
          required
        />
        <FormField
          id={`${formId}-empresa`}
          label="Empresa"
          name="empresa"
          required
        />
        <FormSelect
          id={`${formId}-cargo`}
          label="Cargo"
          name="cargo"
          options={CARGOS}
        />
      </div>
      <div className="mb-4">
        <FormSelect
          id={`${formId}-setor`}
          label="Setor principal"
          name="setor"
          options={SETORES}
        />
      </div>
      <div className="mb-6">
        <FormTextarea
          id={`${formId}-mensagem`}
          label="Conte rapidamente seu cenário"
          name="mensagem"
          required
          minLength={10}
          maxLength={500}
        />
      </div>

      {state && state.ok === false && (
        <p
          className="text-sm text-rose-400 mb-4"
          role="alert"
          aria-live="assertive"
        >
          {state.error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <a
          href="mailto:contato@nexusai.com.br"
          className="text-sm text-foreground/70 hover:text-foreground transition-colors"
        >
          Ou escreva direto: contato@nexusai.com.br
        </a>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-8 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? "Enviando..." : "Enviar mensagem"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

const CARGOS = [
  "Gerente",
  "Coordenador",
  "Superintendente",
  "Diretor",
  "Sócio/Dono",
  "Outro",
] as const;

const SETORES = [
  "Atendimento",
  "Operações",
  "Vendas",
  "Marketing",
  "TI/Tech",
  "Financeiro",
  "RH",
  "Outro",
] as const;

function FormField({
  id,
  label,
  name,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email";
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-foreground/70 uppercase tracking-wider mb-1.5"
      >
        {label}
        {required && (
          <span aria-hidden className="text-rose-400 ml-0.5">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full h-11 px-4 rounded-lg bg-background/40 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
      />
    </div>
  );
}

function FormSelect({
  id,
  label,
  name,
  options,
}: {
  id: string;
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-foreground/70 uppercase tracking-wider mb-1.5"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className="w-full h-11 px-4 rounded-lg bg-background/40 border border-border/60 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
      >
        <option value="" disabled>
          Selecione...
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function FormTextarea({
  id,
  label,
  name,
  required,
  minLength,
  maxLength,
}: {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-foreground/70 uppercase tracking-wider mb-1.5"
      >
        {label}
        {required && (
          <span aria-hidden className="text-rose-400 ml-0.5">
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        rows={5}
        className="w-full px-4 py-3 rounded-lg bg-background/40 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors resize-y"
      />
    </div>
  );
}
