"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useId, useRef } from "react";

import { CONTACT_COPY } from "@/lib/content";
import { formatBrazilianPhone } from "@/lib/contact-submission";
import { trackEvent } from "@/lib/tracking";

import { enviarMensagem } from "./actions";
import styles from "./contact-page.module.css";

type FormState =
  | { ok: true; captured: boolean }
  | { ok: false; error: string }
  | null;

export function ContactForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    enviarMensagem,
    null,
  );
  const formId = useId();
  const formStarted = useRef(false);

  useEffect(() => {
    if (state?.ok && state.captured) trackEvent("lead_captured");
  }, [state]);

  if (state?.ok === true) {
    return (
      <motion.div
        className={styles.successState}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        aria-live="polite"
      >
        <Check aria-hidden="true" />
        <div>
          <h2>Contexto recebido</h2>
          <p>Sua mensagem chegou e será lida pela equipe.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      action={formAction}
      className={styles.form}
      noValidate
      onFocus={(event) => {
        const isFormControl = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement;
        if (!formStarted.current && isFormControl) {
          formStarted.current = true;
          trackEvent("form_start");
        }
      }}
      onSubmit={() => trackEvent("form_submit")}
    >
      <input
        type="text"
        name="_gotcha_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
      />

      <div className={styles.formTopline} aria-hidden="true">
        <span>Contexto inicial</span>
        <span>Lido por uma pessoa</span>
      </div>

      <div className={styles.fieldGrid}>
        <FormField
          id={`${formId}-nome`}
          label={CONTACT_COPY.fields[0].label}
          name="nome"
          required
        />
        <FormField
          id={`${formId}-email`}
          label={CONTACT_COPY.fields[1].label}
          name="email"
          type="email"
          required
        />
      </div>

      <div className={styles.fieldGrid}>
        <FormField
          id={`${formId}-telefone`}
          label={CONTACT_COPY.fields[2].label}
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(00) 00000-0000"
          maxLength={15}
          required
          onInput={(event) => {
            event.currentTarget.value = formatBrazilianPhone(event.currentTarget.value);
          }}
        />
        <FormField
          id={`${formId}-empresa`}
          label={CONTACT_COPY.fields[3].label}
          name="empresa"
          autoComplete="organization"
        />
      </div>

      <FormTextarea
        id={`${formId}-mensagem`}
        label={CONTACT_COPY.fields[4].label}
        name="mensagem"
        required
      />

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

      <button type="submit" disabled={pending} className={styles.submitButton}>
        {pending ? "Enviando..." : "Enviar contexto"}
        <ArrowRight aria-hidden="true" />
      </button>
      <p className="text-xs leading-relaxed text-foreground/55">
        Ao enviar, usaremos os dados somente para responder à sua solicitação. Veja a{" "}
        <Link href="/privacidade" className="underline underline-offset-2 transition-colors hover:text-foreground">
          Política de Privacidade
        </Link>.
      </p>
    </form>
  );
}

function FormField({
  id,
  label,
  name,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  maxLength,
  required,
  onInput,
}: {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  inputMode?: "tel";
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  onInput?: React.FormEventHandler<HTMLInputElement>;
}) {
  return (
    <div className={styles.field}>
      <FieldLabel id={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        aria-label={label}
        onInput={onInput}
      />
    </div>
  );
}

function FormTextarea({
  id,
  label,
  name,
  required,
}: {
  id: string;
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div className={styles.field}>
      <FieldLabel id={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        required={required}
        minLength={10}
        maxLength={1000}
        rows={5}
        aria-label={label}
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
      {required ? <span aria-hidden="true">*</span> : null}
    </label>
  );
}
