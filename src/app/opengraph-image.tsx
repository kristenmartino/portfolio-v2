import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.metadata.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [archivo, plexMono] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/Archivo_Expanded-SemiBold.ttf")),
    readFile(join(process.cwd(), "src/app/_og/IBMPlexMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* 16-col hairline grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 75,
                height: "100%",
                borderLeft: "1px solid rgba(255,255,255,0.05)",
              }}
            />
          ))}
        </div>

        {/* accent bar */}
        <div
          style={{
            height: 6,
            width: "100%",
            background:
              "linear-gradient(90deg, #0f62fe 0%, #08bdba 55%, rgba(8,189,186,0) 85%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
            padding: "64px 72px",
          }}
        >
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 22,
              letterSpacing: 5,
              color: "#a8a8a8",
            }}
          >
            KRISTENMARTINO.AI — STRATEGY · ANALYTICS · APPLIED AI
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Archivo",
              fontSize: 88,
              lineHeight: 1.02,
              letterSpacing: -1.8,
              color: "#ffffff",
            }}
          >
            <div style={{ display: "flex" }}>
              I build&nbsp;
              <span style={{ color: "#a6c8ff" }}>clarity</span>
            </div>
            <div>into complex systems.</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: plexMono, weight: 400, style: "normal" },
      ],
    },
  );
}
