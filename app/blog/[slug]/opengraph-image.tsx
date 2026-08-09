import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getAllArticles, getArticleBySlug } from "@/content/articles";
import { AUTHOR, SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

const fontPath = join(
  process.cwd(),
  "app/thmanyah typeface/thmanyahserifdisplay/otf/thmanyahserifdisplay-Black.otf"
);

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.title ?? SITE_NAME;
  const category = article?.category ?? "المدونة";

  const fontData = readFileSync(fontPath);

  return new ImageResponse(
    (
      <div
        lang="ar"
        dir="rtl"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #111113 0%, #18181b 55%, #059669 100%)",
          padding: "72px 80px",
          color: "#fafafa",
          fontFamily: "Thmanyah",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              background: "#059669",
              fontSize: 28,
            }}
          >
            ن
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 20,
            }}
          >
            <span style={{ fontWeight: 900 }}>{AUTHOR.name}</span>
            <span style={{ opacity: 0.7 }}>نمو رقمي وأنظمة ذكية</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 920,
          }}
        >
          <span
            style={{
              alignSelf: "flex-start",
              background: "rgba(255,255,255,0.12)",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            {category}
          </span>
          <h1
            style={{
              fontSize: 58,
              lineHeight: 1.3,
              margin: 0,
              textAlign: "right",
            }}
          >
            {title}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#d4d4d8",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 32,
          }}
        >
          <span>{SITE_NAME}</span>
          <span>{new URL(AUTHOR.x).host}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Thmanyah",
          data: fontData,
          style: "normal",
          weight: 900,
        },
      ],
    }
  );
}
