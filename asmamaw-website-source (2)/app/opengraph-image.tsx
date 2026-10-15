import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import profile from "@/content/profile.json";

export const alt = `${profile.name}, civil engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public", profile.photo));
  const src = `data:image/png;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#061328", color: "#fff", padding: 72, alignItems: "center", gap: 64 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 66, lineHeight: 1.05, fontWeight: 700 }}>{profile.name}</div>
          <div style={{ marginTop: 22, fontSize: 30, color: "#d6b880" }}>{profile.title}</div>
          <div style={{ marginTop: 28, fontSize: 24, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>
            {profile.headline.replaceAll(" | ", "  /  ")}
          </div>
          <div style={{ marginTop: 40, width: 120, height: 4, background: "#b08d57" }} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={330} height={331} style={{ border: "2px solid #b08d57" }} alt="" />
      </div>
    ),
    size,
  );
}
