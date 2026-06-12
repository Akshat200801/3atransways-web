// One-off: turn the white background of public/logo.jpg into transparent
// alpha so the logo can sit cleanly on any background. Output goes to
// public/logo.png. Re-run if the source artwork ever changes.
import sharp from "sharp";
import fs from "fs/promises";

const IN = "public/logo.jpg";
const OUT = "public/logo.png";
// Anything brighter than (245,245,245) becomes fully transparent.
// 245 (not 250) gives us a bit of fuzz so subtle JPEG noise around
// the artwork doesn't leave a halo.
const THRESHOLD = 245;

const img = sharp(IN).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
    data[i + 3] = 0; // fully transparent
  }
}
await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(OUT);

const stat = await fs.stat(OUT);
console.log(`wrote ${OUT} (${stat.size} bytes)`);
