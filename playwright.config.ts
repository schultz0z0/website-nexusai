import { defineConfig } from "@playwright/test";
import { cpSync, existsSync } from "node:fs";
import path from "node:path";
import { SITE_URL } from "./src/lib/site-metadata";

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PLAYWRIGHT_PORT must be a valid TCP port.");
}
const auditPublicSite = process.env.SEARCH_AUDIT_PUBLIC === "1";
const baseURL = auditPublicSite ? SITE_URL : `http://127.0.0.1:${port}`;
const useProductionBuild = process.env.PLAYWRIGHT_USE_PRODUCTION_BUILD === "1";
const isPlaywrightWorker = process.env.TEST_WORKER_INDEX !== undefined;
const standaloneDirectory = path.resolve(".next/standalone");

if (useProductionBuild && !auditPublicSite && !isPlaywrightWorker) {
  if (!existsSync(standaloneDirectory)) {
    throw new Error("PLAYWRIGHT_USE_PRODUCTION_BUILD=1 requires `npm run build` first.");
  }

  for (const [source, destination] of [
    [path.resolve(".next/static"), path.join(standaloneDirectory, ".next/static")],
    [path.resolve("public"), path.join(standaloneDirectory, "public")],
  ]) {
    if (existsSync(source)) {
      cpSync(source, destination, { force: true, recursive: true });
    }
  }
}

const productionServerCommand =
  process.platform === "win32"
    ? `set HOSTNAME=127.0.0.1&& set PORT=${port}&& node .next/standalone/server.js`
    : `HOSTNAME=127.0.0.1 PORT=${port} node .next/standalone/server.js`;

export default defineConfig({
  testDir: "./tests",
  // Public mode is strictly the read-only SEO suite, never forms or checkout tests.
  testMatch: auditPublicSite ? "**/production-seo.spec.ts" : "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  outputDir: ".next/playwright-test-results",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: auditPublicSite ? undefined : {
    // Set PLAYWRIGHT_USE_PRODUCTION_BUILD=1 after `npm run build` to serve its standalone output.
    command: useProductionBuild
      ? productionServerCommand
      : `npm run dev -- --hostname 127.0.0.1 --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI && !useProductionBuild,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
