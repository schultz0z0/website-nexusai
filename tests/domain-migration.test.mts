import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { extname } from "node:path";
import test from "node:test";

const legacyDomainPattern = new RegExp(["solucoes", "nexus", "tech"].join("[-.]"), "i");
const textExtensions = new Set([
  "",
  ".css",
  ".gitignore",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".mts",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);

test("uses only the Agência Prometeus domain in versioned text files", () => {
  const files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
    .split("\0")
    .filter(Boolean)
    .filter((file) => textExtensions.has(extname(file)));

  const offenders = files.filter((file) => {
    const content = readFileSync(file, "utf8");
    return legacyDomainPattern.test(content);
  });

  assert.deepEqual(offenders, []);
});

test("publishes the Compose under the Prometeus project identity", () => {
  const compose = readFileSync("docker-compose.yml", "utf8");

  assert.match(compose, /^name: prometeus-site$/m);
  assert.match(compose, /Host\(`agenciaprometeus\.com\.br`\)/);
  assert.match(compose, /container_name: prometeus-website/);
  assert.doesNotMatch(compose, legacyDomainPattern);
});
