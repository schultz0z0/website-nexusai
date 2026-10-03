import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import test from "node:test";
import { buildIndexNowPayload, submitIndexNow } from "../scripts/lib/indexnow.mts";

const site = "https://agenciaprometeus.com.br";
const key = "1234567890abcdef1234567890abcdef";

test("builds a deduplicated same-origin submission with root key location", () => {
  const payload = buildIndexNowPayload(["/servicos", `${site}/servicos`, "/servicos/agentes-de-ia"], key, site);
  assert.deepEqual(payload, { host: "agenciaprometeus.com.br", key, keyLocation: `${site}/indexnow.txt`, urlList: [`${site}/servicos`, `${site}/servicos/agentes-de-ia`] });
});

test("rejects external URLs, credentials, parameters, fragments and missing paths", () => {
  for (const value of ["https://example.com/a", "//example.com/a", "/contato?utm_source=test", "/#aplicacoes", "https://user@agenciaprometeus.com.br/a", "servicos", "http://agenciaprometeus.com.br/a"]) {
    assert.throws(() => buildIndexNowPayload([value], key, site));
  }
  assert.throws(() => buildIndexNowPayload([], key, site), /URL/);
  assert.throws(() => buildIndexNowPayload(["/"], "invalid", site), /chave/i);
  assert.throws(() => buildIndexNowPayload(Array.from({ length: 10001 }, (_, i) => `/page-${i}`), key, site), /10.000/);
});

for (const scenario of [
  { status: 200, validKey: true, accepted: true },
  { status: 202, validKey: true, accepted: true },
  { status: 429, validKey: true, accepted: false },
  { status: 200, validKey: false, accepted: false },
]) {
  test(`checks published key before POST and handles HTTP ${scenario.status}, key=${scenario.validKey}`, async (t) => {
    let received: unknown;
    const server = createServer(async (request, response) => {
      if (request.url === "/indexnow.txt") {
        response.end(scenario.validKey ? key : "old-key");
        return;
      }
      let body = "";
      for await (const chunk of request) body += chunk;
      received = JSON.parse(body);
      response.writeHead(scenario.status);
      response.end();
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    t.after(() => { server.closeAllConnections(); server.close(); });
    const local = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    const forward: typeof fetch = (input, init) => fetch(`${local}${new URL(String(input)).pathname}`, init);
    const payload = buildIndexNowPayload(["/servicos"], key, site);
    if (scenario.accepted) {
      assert.equal(await submitIndexNow(payload, forward), scenario.status);
      assert.deepEqual(received, payload);
    } else {
      await assert.rejects(submitIndexNow(payload, forward), scenario.validKey ? /429/ : /chave/i);
      assert.equal(Boolean(received), scenario.validKey);
    }
  });
}

test("surfaces network failures without reporting submission success", async () => {
  const failingFetch: typeof fetch = async () => { throw new Error("network unavailable"); };
  await assert.rejects(submitIndexNow(buildIndexNowPayload(["/"], key, site), failingFetch), /network unavailable/);
});
