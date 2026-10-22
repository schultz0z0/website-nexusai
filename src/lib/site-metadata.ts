export const SITE_URL = "https://agenciaprometeus.com.br";
export const SITE_OG_IMAGE = "/images/social/home-hero-20261021.jpg";
export const SITE_SOCIAL_IMAGE = {
  url: SITE_OG_IMAGE,
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Hero da Prometeus: mão humana e mão robótica se tocando, com a mensagem Multiplique a capacidade da sua equipe com IA.",
};

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
