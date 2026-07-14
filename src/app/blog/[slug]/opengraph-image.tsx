import { ImageResponse } from "next/og";
import { getPublishedPost } from "@/lib/posts";
import { siteName } from "@/lib/seo";

export const alt = "Country guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPublishedPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0d4f43 0%, #126b5a 100%)",
          color: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 28, color: "#e7c76b" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "3px solid #e7c76b",
              fontWeight: 700,
            }}
          >
            RC
          </div>
          <span>{post?.cluster ? post.cluster.replace(/-/g, " ") : "Country guides"}</span>
        </div>

        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
          {post?.title ?? siteName}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#cfe3dc" }}>
          <span>{siteName}</span>
          {post?.publishAt && <span>{post.publishAt}</span>}
        </div>
      </div>
    ),
    size
  );
}
