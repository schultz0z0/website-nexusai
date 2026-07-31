"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useActionState, useId, useState } from "react";

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
  const [setorSelected, setSetorSelected] = useState("");
  const [cargoSelected, setCargoSelected] = useState("");

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
        name="_gotcha_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
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
          value={cargoSelected}
          onChange={(e) => setCargoSelected(e.target.value)}
        />
      </div>

      <AnimatePresence>
        {cargoSelected === "Outro" && (
          <motion.div
            key="cargo-outro"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mb-3"
          >
            <FormField
              id={`${formId}-cargo-outro`}
              label="Qual é o seu cargo?"
              name="cargo_outro"
              placeholder="Ex: Head de Inovação, PMO..."
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.fieldBlock}>
        <FormSelect
          id={`${formId}-setor`}
          label="Setor principal"
          name="setor"
          options={SETORES}
          value={setorSelected}
          onChange={(e) => setSetorSelected(e.target.value)}
        />
        <AnimatePresence>
          {setorSelected === "Outro" && (
            <motion.div
              key="setor-outro"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <FormField
                id={`${formId}-setor-outro`}
                label="Qual é o seu setor?"
                name="setor_outro"
                placeholder="Ex: Logística, Saúde, Advocacia..."
                required
              />
            </motion.div>
          )}
        </AnimatePresence>
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
        <a
          href="mailto:raphaelschultz12@gmail.com,esttevao.henrique@hotmail.com"
          className={styles.directLink}
        >
          Ou escreva direto: raphaelschultz12@gmail.com ou esttevao.henrique@hotmail.com
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
  placeholder,
}: {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email";
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className={styles.field}>
      <FieldLabel id={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

function FormSelect({
  id,
  label,
  name,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  options: readonly string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className={styles.field}>
      <FieldLabel id={id} label={label} />
      <select id={id} name={name} value={value} onChange={onChange}>
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
