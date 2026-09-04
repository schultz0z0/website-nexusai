"use server";

import {
  buildGoogleFormsRequest,
  parseContactSubmission,
} from "@/lib/contact-submission";

/**
 * Server action para o formulário de contato integrado ao Google Forms.
 * O endpoint e os IDs dos campos ficam centralizados e cobertos por teste
 * em `buildGoogleFormsRequest`.
 */

type FormState =
  | { ok: true; captured: boolean }
  | { ok: false; error: string }
  | null;

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
  const request = buildGoogleFormsRequest(parsed.data);

  try {
    const res = await fetch(request.actionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: request.body.toString(),
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
