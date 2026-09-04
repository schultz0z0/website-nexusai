export type ContactSubmission = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  mensagem: string;
};

export type ContactSubmissionResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; error: string };

const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeXHhFmCTWaIJuNJVOhtIwGyuCkTeRidD6BoiAlYi3G8dptzA/formResponse";

export function buildGoogleFormsRequest(submission: ContactSubmission) {
  const body = new URLSearchParams();
  body.append("entry.1959364931", submission.nome);
  body.append("entry.697022162", submission.email);
  body.append("entry.1807587310", submission.telefone);
  if (submission.empresa) {
    body.append("entry.1391509784", submission.empresa);
  }
  body.append("entry.889371697", submission.mensagem);

  return { actionUrl: GOOGLE_FORM_ACTION_URL, body };
}

function localPhoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
    return digits.slice(2);
  }
  return digits.slice(0, 11);
}

export function formatBrazilianPhone(value: string) {
  const digits = localPhoneDigits(value);
  if (!digits) return "";
  if (digits.length < 3) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const subscriber = digits.slice(2);
  if (subscriber.length <= 4) return `(${areaCode}) ${subscriber}`;

  const prefixLength = digits.length === 11 ? 5 : 4;
  return `(${areaCode}) ${subscriber.slice(0, prefixLength)}-${subscriber.slice(prefixLength)}`;
}

export function parseContactSubmission(
  formData: FormData,
): ContactSubmissionResult {
  const data = {
    nome: String(formData.get("nome") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    telefone: formatBrazilianPhone(String(formData.get("telefone") ?? "")),
    empresa: String(formData.get("empresa") ?? "").trim(),
    mensagem: String(formData.get("mensagem") ?? "").trim(),
  };

  if (!data.nome || !data.email || !data.telefone || !data.mensagem) {
    return { ok: false, error: "Preencha nome, email, telefone e contexto." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: "Email inválido." };
  }

  const phoneDigits = data.telefone.replace(/\D/g, "");
  if (!/^[1-9]{2}\d{8,9}$/.test(phoneDigits)) {
    return { ok: false, error: "Telefone inválido. Informe DDD e número." };
  }

  if (data.mensagem.length < 10 || data.mensagem.length > 1000) {
    return {
      ok: false,
      error: "Contexto deve ter entre 10 e 1000 caracteres.",
    };
  }

  return { ok: true, data };
}
