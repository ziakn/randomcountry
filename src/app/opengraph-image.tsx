import { ImageResponse } from "next/og";
import { siteName } from "@/lib/seo";

export const alt = `${siteName} — countries, flags, maps and quizzes`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          background: "linear-gradient(135deg, #0d4f43 0%, #126b5a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            border: "4px solid #e7c76b",
            color: "#e7c76b",
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          RC
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700 }}>Random Country Generator</div>
        <div style={{ display: "flex", fontSize: 30, color: "#cfe3dc" }}>
          Countries, flags, maps and geography quizzes
        </div>
      </div>
    ),
    size
  );
}
