import { readFile } from "node:fs/promises";
import { SITE_URL } from "../src/lib/site-metadata.ts";
import { buildIndexNowPayload, submitIndexNow } from "./lib/indexnow.mts";

const args = process.argv.slice(2);
const help = "Uso: npm run search:submit -- [--dry-run] /caminho [/outro-caminho ...]\nEnvie somente URLs criadas, alteradas ou removidas, depois de publicar. --dry-run apenas mostra o pedido, sem acessar a rede.";

try {
  if (args.includes("--help")) {
    console.log(help);
  } else {
    const dryRun = args.includes("--dry-run");
    const paths = args.filter((arg) => arg !== "--dry-run");
    if (!paths.length || paths.some((arg) => arg.startsWith("--"))) throw new Error(help);
    const key = (await readFile(new URL("../public/indexnow.txt", import.meta.url), "utf8")).trim();
    const payload = buildIndexNowPayload(paths, key, SITE_URL);
    if (dryRun) {
      console.log(JSON.stringify(payload, null, 2));
      console.log("Simulação concluída. Nenhuma requisição foi enviada.");
    } else {
      const status = await submitIndexNow(payload);
      console.log(status === 202
        ? `HTTP 202: ${payload.urlList.length} URL(s) recebidas; validação da chave pendente.`
        : `HTTP 200: ${payload.urlList.length} URL(s) recebidas pelo IndexNow.`);
      console.log("O aceite não confirma indexação, ranking ou citações em respostas de IA.");
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : "Falha ao enviar URLs ao IndexNow.");
  process.exitCode = 1;
}
