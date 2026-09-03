import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { GoogleGenAI } from "@google/genai";
import nextEnv from "@next/env";

import {
  GEMINI_OMNI_MODEL,
  generateOmniVideoAsset,
  requireGeminiApiKey,
  type OmniAspectRatio,
  type OmniVideoClient,
} from "./lib/gemini-omni-video.mts";

const usage = `Generate a Nexus hero video with Gemini Omni Flash.

Usage:
  npm run video:hero -- --check
  npm run video:hero -- --prompt-file <path> --image <path> [options]

Required:
  --prompt-file <path>       UTF-8 text file containing the motion prompt
  --image <path>             PNG or JPEG reference image

Options:
  --output <path>            MP4 destination (default: public/videos/hero-omni.mp4)
  --aspect-ratio <16:9|9:16> Output aspect ratio (default: 16:9)
  --check                    Verify that GEMINI_API_KEY is configured; no API call
  --help                     Show this help; no API call

The command refuses to overwrite an existing output file.`;

function readOption(argumentsList: string[], name: string) {
  const index = argumentsList.indexOf(name);
  if (index === -1) return undefined;
  const value = argumentsList[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${name} requires a value.`);
  }
  return value;
}

const argumentsList = process.argv.slice(2);

if (argumentsList.includes("--help")) {
  console.log(usage);
  process.exit(0);
}

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const apiKey = requireGeminiApiKey(process.env);

if (argumentsList.includes("--check")) {
  console.log(`Gemini API key configured for ${GEMINI_OMNI_MODEL}.`);
  process.exit(0);
}

const promptFile = readOption(argumentsList, "--prompt-file");
const image = readOption(argumentsList, "--image");
const output =
  readOption(argumentsList, "--output") ?? "public/videos/hero-omni.mp4";
const aspectRatio = (readOption(argumentsList, "--aspect-ratio") ??
  "16:9") as OmniAspectRatio;

if (!promptFile || !image) {
  throw new Error(`--prompt-file and --image are required.\n\n${usage}`);
}
if (aspectRatio !== "16:9" && aspectRatio !== "9:16") {
  throw new Error("--aspect-ratio must be 16:9 or 9:16.");
}

const prompt = (await readFile(resolve(promptFile), "utf8")).trim();
if (!prompt) {
  throw new Error("The prompt file is empty.");
}

const ai = new GoogleGenAI({ apiKey });
const client: OmniVideoClient = {
  interactions: {
    async create(request) {
      const interaction = await ai.interactions.create(request);
      return {
        output_video: interaction.output_video
          ? {
              data: interaction.output_video.data,
              uri: interaction.output_video.uri,
            }
          : undefined,
      };
    },
  },
  files: {
    async download({ file, downloadPath }) {
      await ai.files.download({
        file: { uri: file.uri },
        downloadPath,
      });
    },
  },
};

const outputPath = resolve(output);
console.log(`Generating with ${GEMINI_OMNI_MODEL}...`);
console.log(`Output: ${outputPath}`);

await generateOmniVideoAsset(
  {
    prompt,
    imagePath: resolve(image),
    outputPath,
    aspectRatio,
  },
  client,
);

console.log(`Video saved: ${outputPath}`);
