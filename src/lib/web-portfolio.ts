export interface WebPortfolioProject {
  id: "jotape" | "foxstage";
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
    status: "Em desenvolvimento",
    publicUrl: null,
    poster: "/images/portfolio/foxstage-poster.webp",
    video: "/videos/portfolio/foxstage-scroll.mp4",
  },
];
