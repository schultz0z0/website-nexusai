"use server";

/**
 * Server action para o formulário de contato.
 * Fase 3 (PRD) substitui o mock-success por envio real via Resend.
 *
 * ponytail: validações duplicam client-side (no componente Form) — defesa
 * em profundidade. Honeypot `website` filtra bots básicos.
 */

type FormState =
  | { ok: true }
  | { ok: false; error: string }
  | null;

export async function enviarMensagem(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (formData.get("website")) return { ok: true };

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const empresa = String(formData.get("empresa") ?? "").trim();
  const mensagem = String(formData.get("mensagem") ?? "").trim();

  if (!nome || !email || !empresa || !mensagem) {
    return { ok: false, error: "Preencha nome, email, empresa e mensagem." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Email inválido." };
  }
  if (mensagem.length < 10 || mensagem.length > 500) {
    return { ok: false, error: "Mensagem deve ter entre 10 e 500 caracteres." };
  }

  // ponytail: Fase 3 wires Resend here. Sucesso mockado nesta fase.
  return { ok: true };
}
