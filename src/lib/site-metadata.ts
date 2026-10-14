export const SITE_URL = "https://agenciaprometeus.com.br";
export const SITE_OG_IMAGE = "/og-image.png";

export const SITE_TITLE = "Prometeus | Software sob medida, automação e IA";

export const SITE_DESCRIPTION =
  "Software sob medida, automação e agentes de IA para empresas. CRM, controle de estoque, telefonia e criação de sites e lojas virtuais com a Prometeus.";

// Canonicals and snippets remain public even when a build is validated elsewhere.
export const INDEXABLE_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};
