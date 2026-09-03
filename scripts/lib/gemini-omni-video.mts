import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname } from "node:path";

export const GEMINI_OMNI_MODEL = "gemini-omni-flash-preview";

export type OmniAspectRatio = "16:9" | "9:16";

export type BuildOmniRequestOptions = {
  prompt: string;
  imageBase64: string;
  mimeType: "image/jpeg" | "image/png";
  aspectRatio: OmniAspectRatio;
};

export type OmniVideoRequest = {
  model: typeof GEMINI_OMNI_MODEL;
  input: Array<
    | {
        type: "image";
        data: string;
        mime_type: "image/jpeg" | "image/png";
      }
    | { type: "text"; text: string }
  >;
  generation_config: {
    video_config: { task: "image_to_video" };
  };
  response_format: {
    type: "video";
    aspect_ratio: OmniAspectRatio;
    delivery: "uri";
  };
};

export function buildOmniRequest(
  options: BuildOmniRequestOptions,
): OmniVideoRequest {
  return {
    model: GEMINI_OMNI_MODEL,
    input: [
      {
        type: "image",
        data: options.imageBase64,
        mime_type: options.mimeType,
      },
      { type: "text", text: options.prompt },
    ],
    generation_config: {
      video_config: { task: "image_to_video" },
    },
    response_format: {
      type: "video",
      aspect_ratio: options.aspectRatio,
      delivery: "uri",
    },
  };
}

type OmniVideoOutput = {
  data?: string;
  uri?: string;
};

export type OmniVideoClient = {
  interactions: {
    create(request: ReturnType<typeof buildOmniRequest>): Promise<{
      output_video?: OmniVideoOutput;
    }>;
  };
  files: {
    download(options: {
      file: OmniVideoOutput;
      downloadPath: string;
    }): Promise<unknown>;
  };
};

export type GenerateOmniVideoOptions = {
  prompt: string;
  imagePath: string;
  outputPath: string;
  aspectRatio: OmniAspectRatio;
};

export function requireGeminiApiKey(
  environment: Record<string, string | undefined>,
) {
  const apiKey = environment.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Add it to the project root .env.local file.",
    );
  }
  return apiKey;
}

function getImageMimeType(imagePath: string): "image/jpeg" | "image/png" {
  const extension = extname(imagePath).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  throw new Error("Input image must be a PNG or JPEG file.");
}

export async function generateOmniVideoAsset(
  options: GenerateOmniVideoOptions,
  client: OmniVideoClient,
) {
  try {
    await access(options.outputPath);
    throw new Error(`Output already exists: ${options.outputPath}`);
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !("code" in error) ||
      error.code !== "ENOENT"
    ) {
      throw error;
    }
  }

  const image = await readFile(options.imagePath);
  const request = buildOmniRequest({
    prompt: options.prompt,
    imageBase64: image.toString("base64"),
    mimeType: getImageMimeType(options.imagePath),
    aspectRatio: options.aspectRatio,
  });
  const interaction = await client.interactions.create(request);
  const video = interaction.output_video;

  await mkdir(dirname(options.outputPath), { recursive: true });

  if (video?.data) {
    await writeFile(options.outputPath, Buffer.from(video.data, "base64"), {
      flag: "wx",
    });
  } else if (video?.uri) {
    await client.files.download({
      file: video,
      downloadPath: options.outputPath,
    });
  } else {
    throw new Error("Gemini returned no downloadable video.");
  }

  return options.outputPath;
}
