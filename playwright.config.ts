import { defineConfig } from "@playwright/test";
import { cpSync, existsSync } from "node:fs";
import path from "node:path";

const baseURL = "http://127.0.0.1:3000";
const useProductionBuild = process.env.PLAYWRIGHT_USE_PRODUCTION_BUILD === "1";
const standaloneDirectory = path.resolve(".next/standalone");

if (useProductionBuild) {
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
    ? "set HOSTNAME=127.0.0.1&& set PORT=3000&& node .next/standalone/server.js"
    : "HOSTNAME=127.0.0.1 PORT=3000 node .next/standalone/server.js";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  outputDir: ".next/playwright-test-results",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: {
    // Set PLAYWRIGHT_USE_PRODUCTION_BUILD=1 after `npm run build` to serve its standalone output.
    command: useProductionBuild
      ? productionServerCommand
      : "npm run dev -- --hostname 127.0.0.1",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
