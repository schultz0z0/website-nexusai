import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    qualities: [75, 90],
  },
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      { source: "/servicos/automacao-de-processos", destination: "/servicos/desenvolvimento-sob-medida", permanent: true },
      { source: "/servicos/integracao-de-sistemas", destination: "/servicos/desenvolvimento-sob-medida", permanent: true },
      { source: "/servicos/agentes-de-ia", destination: "/servicos/atendimento-ia-whatsapp", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
