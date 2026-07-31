import type { Viewport } from "next";

/**
 * themeColor alinha a barra do navegador mobile (Chrome/Safari) com o fundo do site.
 * Mantido em arquivo separado conforme convenção do Next 16 (generateViewport).
 */
export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};