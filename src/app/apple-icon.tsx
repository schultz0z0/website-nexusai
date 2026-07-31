import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon — reaproveita o mesmo "N" do nav (mesma geometria do NexusMark).
 * Gerado em build time pelo Next (route handler estático).
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          borderRadius: 36,
          color: "#FAFAFA",
          fontSize: 120,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        N
      </div>
    ),
    { ...size }
  );
}