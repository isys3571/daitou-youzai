// 大東熔材ファビコン生成スクリプト
// Noto Serif JP Bold を fetch → 「大」をパス化 → SVG 化 → 各サイズ PNG / ICO に展開

import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "src/favicons");
const CACHE_DIR = join(__dirname, ".cache");
const FONT_CACHE = join(CACHE_DIR, "NotoSerifJP-Bold.ttf");
const FONT_URL =
  "https://cdn.jsdelivr.net/npm/@expo-google-fonts/noto-serif-jp@0.2.3/NotoSerifJP_700Bold.ttf";

const BG = "#ffffff"; // 背景: 白
const FG = "#0f2c4a"; // 文字・枠: ネイビー
const SLIT = BG; // スリット色（背景と同色で文字を切り抜く）
const CHAR = "大";

// バッジ構成（viewBox 64基準）
const FRAME_INSET = 6;     // 枠の内側余白（端からの距離）
const FRAME_STROKE = 3;    // 枠線の太さ
const KANJI_PAD = 12;      // 漢字の周囲余白（枠内に余裕を持たせる）
const SLIT_Y = 30.5;       // スリット上端（中心 y=32 になるよう調整）
const SLIT_HEIGHT = 3;     // スリット太さ
const SLIT_INSET = 9;      // スリット左右の余白（枠線より少し内側）

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function getFontBuffer() {
  await ensureDir(CACHE_DIR);
  if (await exists(FONT_CACHE)) {
    return readFile(FONT_CACHE);
  }
  console.log(`fetching font: ${FONT_URL}`);
  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error(`font fetch failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(FONT_CACHE, buf);
  return buf;
}

function buildSvg(pathData, viewBox) {
  // viewBox: [x, y, w, h] — 文字の bounding box を中央に収めて、枠＋スリットを重ねる
  const [x, y, w, h] = viewBox;
  const SIZE = 64;
  const innerSize = SIZE - KANJI_PAD * 2;
  const scale = Math.min(innerSize / w, innerSize / h);
  const tx = SIZE / 2 - (x + w / 2) * scale;
  const ty = SIZE / 2 - (y + h / 2) * scale;

  const frameSize = SIZE - FRAME_INSET * 2;
  const slitWidth = SIZE - SLIT_INSET * 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${BG}"/>
  <rect x="${FRAME_INSET}" y="${FRAME_INSET}" width="${frameSize}" height="${frameSize}" fill="none" stroke="${FG}" stroke-width="${FRAME_STROKE}"/>
  <g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(5)})">
    <path d="${pathData}" fill="${FG}"/>
  </g>
  <rect x="${SLIT_INSET}" y="${SLIT_Y}" width="${slitWidth}" height="${SLIT_HEIGHT}" fill="${SLIT}"/>
</svg>
`;
}

async function main() {
  await ensureDir(OUT_DIR);

  const fontBuf = await getFontBuffer();
  const font = opentype.parse(
    fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength)
  );

  // unitsPerEm 単位で path を取得 → bbox を測って中央寄せ
  const fontSize = 1000; // 任意（scale 調整でキャンセルされる）
  const path = font.getPath(CHAR, 0, 0, fontSize);
  const bb = path.getBoundingBox();
  const viewBox = [bb.x1, bb.y1, bb.x2 - bb.x1, bb.y2 - bb.y1];
  const pathData = path.toPathData(3);

  const svg = buildSvg(pathData, viewBox);
  await writeFile(join(OUT_DIR, "favicon.svg"), svg);
  console.log("wrote: favicon.svg");

  // PNG 各サイズ
  const sizes = [16, 32, 48, 180, 192, 512];
  const pngBuffers = {};
  for (const size of sizes) {
    const buf = await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers[size] = buf;
  }

  await writeFile(join(OUT_DIR, "favicon-16.png"), pngBuffers[16]);
  await writeFile(join(OUT_DIR, "favicon-32.png"), pngBuffers[32]);
  await writeFile(join(OUT_DIR, "apple-touch-icon.png"), pngBuffers[180]);
  await writeFile(join(OUT_DIR, "icon-192.png"), pngBuffers[192]);
  await writeFile(join(OUT_DIR, "icon-512.png"), pngBuffers[512]);
  console.log("wrote: PNGs (16, 32, 180, 192, 512)");

  // ICO（16/32/48 をマルチサイズで）
  const ico = await pngToIco([pngBuffers[16], pngBuffers[32], pngBuffers[48]]);
  await writeFile(join(OUT_DIR, "favicon.ico"), ico);
  console.log("wrote: favicon.ico (16/32/48)");

  // site.webmanifest
  const manifest = {
    name: "大東熔材株式会社",
    short_name: "大東熔材",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: BG,
    background_color: BG,
    display: "browser",
  };
  await writeFile(
    join(OUT_DIR, "site.webmanifest"),
    JSON.stringify(manifest, null, 2)
  );
  console.log("wrote: site.webmanifest");

  console.log("\ndone →", OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
