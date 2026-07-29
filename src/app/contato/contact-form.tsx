"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useActionState, useId } from "react";

import { enviarMensagem } from "./actions";
import styles from "./contato-cinematic.module.css";

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
      <motion.div
        className={styles.successState}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        aria-live="polite"
      >
        <div>
          <span className={styles.successSignal} aria-hidden="true">
            <Check />
          </span>
          <h2>Mensagem recebida</h2>
          <p>
            A equipe vai responder em até 24h úteis com o próximo passo mais
            útil para o seu cenário.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className={styles.contactForm} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none h-0 w-0"
      />

      <div className={styles.formTopline} aria-hidden="true">
        <span>Contexto inicial</span>
        <span>Lido pela equipe</span>
      </div>

      <div className={styles.fieldGrid}>
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

      <div className={styles.fieldBlock}>
        <FormSelect
          id={`${formId}-setor`}
          label="Setor principal"
          name="setor"
          options={SETORES}
        />
      </div>

      <div className={styles.fieldBlock}>
        <FormTextarea
          id={`${formId}-mensagem`}
          label="Onde sua operação perde tempo hoje?"
          name="mensagem"
          required
          minLength={10}
          maxLength={500}
        />
      </div>

      {state && state.ok === false ? (
        <motion.p
          className={styles.formError}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          aria-live="assertive"
        >
          {state.error}
        </motion.p>
      ) : null}

      <div className={styles.formActions}>
        <a href="mailto:contato@nexusai.com.br" className={styles.directLink}>
          Ou escreva direto: contato@nexusai.com.br
        </a>
        <motion.button
          type="submit"
          disabled={pending}
          className={styles.submitButton}
          whileHover={pending ? undefined : { y: -2 }}
          whileTap={pending ? undefined : { scale: 0.985 }}
          transition={{ duration: 0.16 }}
        >
          {pending ? "Enviando..." : "Enviar contexto"}
          <ArrowRight aria-hidden="true" />
        </motion.button>
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
    <div className={styles.field}>
      <FieldLabel id={id} label={label} required={required} />
      <input id={id} name={name} type={type} required={required} />
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
    <div className={styles.field}>
      <FieldLabel id={id} label={label} />
      <select id={id} name={name} defaultValue="">
        <option value="" disabled>
          Selecione...
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
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
    <div className={styles.field}>
      <FieldLabel id={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        rows={5}
      />
    </div>
  );
}

function FieldLabel({
  id,
  label,
  required,
}: {
  id: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={id}>
      {label}
      {required ? (
        <span aria-hidden="true" className={styles.required}>
          *
        </span>
      ) : null}
    </label>
  );
}
