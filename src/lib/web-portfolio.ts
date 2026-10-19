export interface WebPortfolioProject {
  id: "jotape" | "foxstage" | "clementino" | "fast-limp";
  name: string;
  description: string;
  status: "Publicado" | "Em desenvolvimento";
  publicUrl: string | null;
  poster: string;
  video: string;
}

export const WEB_PORTFOLIO: readonly WebPortfolioProject[] = [
  {
    id: "jotape",
    name: "Jotape Publicidade",
    description: "Site para apresentar os serviços e os projetos de uma agência de publicidade.",
    status: "Publicado",
    publicUrl: "https://jotapepublicidade.com.br/",
    poster: "/images/portfolio/jotape-poster.webp",
    video: "/videos/portfolio/jotape-scroll.mp4",
  },
  {
    id: "foxstage",
    name: "Foxstage",
    description: "Site para apresentar uma escola de inglês, suas aulas e experiências.",
    status: "Publicado",
    publicUrl: "https://foxstage.com.br/",
    poster: "/images/portfolio/foxstage-poster.webp",
    video: "/videos/portfolio/foxstage-scroll.mp4",
  },
  {
    id: "clementino",
    name: "Clementino Imóveis",
    description: "Site imobiliário com catálogo de imóveis para compra e locação e contato direto com a equipe.",
    status: "Publicado",
    publicUrl: "https://clementinoimoveis.com.br/",
    poster: "/images/portfolio/clementino-poster.webp",
    video: "/videos/portfolio/clementino-scroll.mp4",
  },
  {
    id: "fast-limp",
    name: "Fast Limp",
    description: "Site para apresentar serviços de limpeza de vidros e facilitar pedidos de orçamento pelo WhatsApp.",
    status: "Em desenvolvimento",
    publicUrl: null,
    poster: "/images/portfolio/fast-limp-poster.webp",
    video: "/videos/portfolio/fast-limp-scroll.mp4",
  },
];
