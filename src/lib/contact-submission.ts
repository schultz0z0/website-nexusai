export type ContactSubmission = {
  nome: string;
  email: string;
  empresa: string;
  mensagem: string;
};

export type ContactSubmissionResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; error: string };

export function parseContactSubmission(
  formData: FormData,
): ContactSubmissionResult {
  const data = {
    nome: String(formData.get("nome") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    empresa: String(formData.get("empresa") ?? "").trim(),
    mensagem: String(formData.get("mensagem") ?? "").trim(),
  };

  if (!data.nome || !data.email || !data.mensagem) {
    return { ok: false, error: "Preencha nome, email e contexto." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: "Email inválido." };
  }

  if (data.mensagem.length < 10 || data.mensagem.length > 1000) {
    return {
      ok: false,
      error: "Contexto deve ter entre 10 e 1000 caracteres.",
    };
  }

  return { ok: true, data };
}
