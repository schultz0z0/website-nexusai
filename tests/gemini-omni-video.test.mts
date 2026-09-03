import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const videoModule = await import("../scripts/lib/gemini-omni-video.mts");

test("builds the documented image-to-video request without embedding the API key", () => {
  assert.equal(typeof videoModule.buildOmniRequest, "function");

  const request = videoModule.buildOmniRequest({
    prompt: "Animate the blue light streams with a slow cinematic push-in.",
    imageBase64: "aGVybw==",
    mimeType: "image/png",
    aspectRatio: "16:9",
  });

  assert.deepEqual(request, {
    model: "gemini-omni-flash-preview",
    input: [
      { type: "image", data: "aGVybw==", mime_type: "image/png" },
      {
        type: "text",
        text: "Animate the blue light streams with a slow cinematic push-in.",
      },
    ],
    generation_config: {
      video_config: { task: "image_to_video" },
    },
    response_format: {
      type: "video",
      aspect_ratio: "16:9",
      delivery: "uri",
    },
  });
  assert.equal(JSON.stringify(request).includes("GEMINI_API_KEY"), false);
});

test("writes an inline Gemini video response to the requested MP4 path", async () => {
  assert.equal(typeof videoModule.generateOmniVideoAsset, "function");

  const workingDirectory = await mkdtemp(join(tmpdir(), "nexus-omni-"));
  const imagePath = join(workingDirectory, "hero.png");
  const outputPath = join(workingDirectory, "hero.mp4");
  await writeFile(imagePath, Buffer.from("image"));

  const client = {
    interactions: {
      async create() {
        return {
          output_video: {
            data: Buffer.from("generated-video").toString("base64"),
          },
        };
      },
    },
    files: {
      async download() {
        throw new Error("URI download should not run for inline output");
      },
    },
  };

  try {
    const result = await videoModule.generateOmniVideoAsset(
      {
        prompt: "Slowly animate the blue streams.",
        imagePath,
        outputPath,
        aspectRatio: "16:9",
      },
      client,
    );

    assert.equal(result, outputPath);
    assert.equal((await readFile(outputPath)).toString(), "generated-video");
  } finally {
    await rm(workingDirectory, { recursive: true, force: true });
  }
});

test("downloads a URI-delivered Gemini video to the requested MP4 path", async () => {
  const workingDirectory = await mkdtemp(join(tmpdir(), "nexus-omni-uri-"));
  const imagePath = join(workingDirectory, "hero.jpg");
  const outputPath = join(workingDirectory, "hero.mp4");
  await writeFile(imagePath, Buffer.from("image"));

  const client = {
    interactions: {
      async create() {
        return {
          output_video: {
            uri: "https://generativelanguage.googleapis.com/video/123",
          },
        };
      },
    },
    files: {
      async download({ downloadPath }: { downloadPath: string }) {
        await writeFile(downloadPath, Buffer.from("downloaded-video"));
      },
    },
  };

  try {
    await videoModule.generateOmniVideoAsset(
      {
        prompt: "Slow cinematic parallax.",
        imagePath,
        outputPath,
        aspectRatio: "16:9",
      },
      client,
    );

    assert.equal((await readFile(outputPath)).toString(), "downloaded-video");
  } finally {
    await rm(workingDirectory, { recursive: true, force: true });
  }
});

test("refuses an existing output before starting a billable API request", async () => {
  const workingDirectory = await mkdtemp(join(tmpdir(), "nexus-omni-safe-"));
  const imagePath = join(workingDirectory, "hero.png");
  const outputPath = join(workingDirectory, "hero.mp4");
  await writeFile(imagePath, Buffer.from("image"));
  await writeFile(outputPath, Buffer.from("existing-video"));
  let apiCalls = 0;

  const client = {
    interactions: {
      async create() {
        apiCalls += 1;
        return { output_video: { data: "bmV3LXZpZGVv" } };
      },
    },
    files: {
      async download() {},
    },
  };

  try {
    await assert.rejects(
      videoModule.generateOmniVideoAsset(
        {
          prompt: "Slow cinematic parallax.",
          imagePath,
          outputPath,
          aspectRatio: "16:9",
        },
        client,
      ),
      /already exists/i,
    );
    assert.equal(apiCalls, 0);
    assert.equal((await readFile(outputPath)).toString(), "existing-video");
  } finally {
    await rm(workingDirectory, { recursive: true, force: true });
  }
});

test("rejects a missing Gemini API key without attempting generation", () => {
  assert.equal(typeof videoModule.requireGeminiApiKey, "function");
  assert.throws(
    () => videoModule.requireGeminiApiKey({}),
    /GEMINI_API_KEY.*\.env\.local/i,
  );
});

test("checks the local configuration without printing the API key", () => {
  const cliPath = fileURLToPath(
    new URL("../scripts/generate-hero-video.mts", import.meta.url),
  );
  const secret = "test-secret-must-not-be-printed";
  const result = spawnSync(
    process.execPath,
    ["--experimental-strip-types", cliPath, "--check"],
    {
      cwd: fileURLToPath(new URL("..", import.meta.url)),
      env: { ...process.env, GEMINI_API_KEY: secret },
      encoding: "utf8",
    },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Gemini API key configured/i);
  assert.doesNotMatch(`${result.stdout}${result.stderr}`, new RegExp(secret));
});

test("shows generation usage without requiring an API key", () => {
  const cliPath = fileURLToPath(
    new URL("../scripts/generate-hero-video.mts", import.meta.url),
  );
  const environment = { ...process.env };
  delete environment.GEMINI_API_KEY;
  delete environment.GOOGLE_API_KEY;

  const result = spawnSync(
    process.execPath,
    ["--experimental-strip-types", cliPath, "--help"],
    {
      cwd: fileURLToPath(new URL("..", import.meta.url)),
      env: environment,
      encoding: "utf8",
    },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /--prompt-file/);
  assert.match(result.stdout, /--image/);
  assert.match(result.stdout, /--output/);
  assert.match(result.stdout, /--check/);
});
