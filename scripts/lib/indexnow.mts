export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export function buildIndexNowPayload(paths: readonly string[], key: string, siteUrl: string): IndexNowPayload {
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error("Chave IndexNow inválida.");
  const site = new URL(siteUrl);
  if (site.protocol !== "https:" || site.username || site.password || site.pathname !== "/" || site.search || site.hash) {
    throw new Error("O site deve usar uma origem HTTPS canônica.");
  }
  const urls = paths.map((path) => {
    if ((!path.startsWith("/") && !path.startsWith("https://")) || path.startsWith("//") || /\s/.test(path)) {
      throw new Error(`URL inválida: ${path}. Use um caminho iniciado por / ou uma URL HTTPS do site.`);
    }
    const url = new URL(path, site);
    if (url.origin !== site.origin || url.username || url.password || url.search || url.hash || path.includes("?") || path.includes("#")) {
      throw new Error(`URL fora do domínio canônico ou com parâmetros/fragmento: ${path}`);
    }
    return url.href;
  });
  const urlList = [...new Set(urls)];
  if (!urlList.length || urlList.length > 10_000) throw new Error("Informe de 1 a 10.000 URLs alteradas.");
  return { host: site.host, key, keyLocation: `${site.origin}/indexnow.txt`, urlList };
}

export async function submitIndexNow(payload: IndexNowPayload, fetchRequest: typeof fetch = fetch): Promise<200 | 202> {
  const verification = await fetchRequest(payload.keyLocation, { redirect: "error", signal: AbortSignal.timeout(15_000) });
  if (!verification.ok || (await verification.text()).trim() !== payload.key) {
    throw new Error("A chave IndexNow ainda não está publicada corretamente. Publique o site e confira /indexnow.txt antes de enviar URLs.");
  }
  const response = await fetchRequest("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow retornou HTTP ${response.status}. Confira a chave e as URLs; em caso de 429, aguarde antes de tentar novamente.`);
  }
  return response.status;
}
