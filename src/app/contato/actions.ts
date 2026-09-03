"use server";

import { parseContactSubmission } from "@/lib/contact-submission";

/**
 * Server action para o formulário de contato integrado ao Google Forms.
 * Endpoint: https://docs.google.com/forms/d/e/1FAIpQLSej3brjCF19IjUJBhJ50ViHqqsRTkQo_Z6svLt_zZjv011evQ/formResponse
 */

type FormState =
  | { ok: true; captured: boolean }
  | { ok: false; error: string }
  | null;

const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSej3brjCF19IjUJBhJ50ViHqqsRTkQo_Z6svLt_zZjv011evQ/formResponse";

export async function enviarMensagem(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot anti-bot (usando _gotcha_hp para evitar conflito com preenchimento automático do Chrome/Edge)
  const gotcha = formData.get("_gotcha_hp");
  if (gotcha) {
    return { ok: true, captured: false };
  }

  const parsed = parseContactSubmission(formData);
  if (!parsed.ok) return parsed;
  const { nome, email, empresa, mensagem } = parsed.data;

  const params = new URLSearchParams();
  params.append("entry.535238991", nome);
  params.append("entry.2104687615", email);
  if (empresa) params.append("entry.978699660", empresa);
  params.append("entry.687152363", mensagem);

  try {
    const res = await fetch(GOOGLE_FORM_ACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!res.ok) {
      return {
        ok: false,
        error: "Ocorreu um erro ao registrar sua resposta. Tente novamente.",
      };
    }

    return { ok: true, captured: true };
  } catch (error) {
    console.error("Erro ao enviar para o Google Forms:", error);
    return {
      ok: false,
      error: "Falha na conexão ao enviar a mensagem. Tente novamente.",
    };
  }
}
