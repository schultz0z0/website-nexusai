"use server";

/**
 * Server action para o formulário de contato integrado ao Google Forms.
 * Endpoint: https://docs.google.com/forms/d/e/1FAIpQLSej3brjCF19IjUJBhJ50ViHqqsRTkQo_Z6svLt_zZjv011evQ/formResponse
 */

type FormState =
  | { ok: true }
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
    console.log("[Honeypot Activado] Envio bloqueado por ter preenchido campo anti-bot:", gotcha);
    return { ok: true };
  }

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const empresa = String(formData.get("empresa") ?? "").trim();
  const cargo = String(formData.get("cargo") ?? "").trim();
  const cargoOutro = String(formData.get("cargo_outro") ?? "").trim();
  const setor = String(formData.get("setor") ?? "").trim();
  const setorOutro = String(formData.get("setor_outro") ?? "").trim();
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

  const params = new URLSearchParams();
  params.append("entry.535238991", nome);
  params.append("entry.2104687615", email);
  params.append("entry.978699660", empresa);
  if (cargo) params.append("entry.268077391", cargo);
  if (cargoOutro) params.append("entry.694494974", cargoOutro);
  if (setor) params.append("entry.484355677", setor);
  if (setorOutro) params.append("entry.900756656", setorOutro);
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

    return { ok: true };
  } catch (error) {
    console.error("Erro ao enviar para o Google Forms:", error);
    return {
      ok: false,
      error: "Falha na conexão ao enviar a mensagem. Tente novamente.",
    };
  }
}
