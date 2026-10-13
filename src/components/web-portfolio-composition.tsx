import { AbsoluteFill, Html5Video, useVideoConfig } from "remotion";
import type { WebPortfolioProject } from "@/lib/web-portfolio";

export function WebPortfolioComposition({ project }: { project: WebPortfolioProject }) {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#07111f" }}>
      <Html5Video name={`Navegação do site ${project.name}`} src={project.video} muted trimBefore={0 * fps} style={{ width: "100%", height: "100%", objectFit: "contain" }} pauseWhenBuffering />
    </AbsoluteFill>
  );
}
