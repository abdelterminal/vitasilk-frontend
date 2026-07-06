import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'app', 'favicon.ico');

// VS monogram — dark bg, cream letterform, serif font
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="10" fill="#0f1014"/>
  <text x="32" y="49"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="42"
    font-weight="700"
    text-anchor="middle"
    fill="#EDE8DF"
    letter-spacing="-1">VS</text>
</svg>`;

const SIZES = [16, 32, 48];

async function svgToPng(svgBuffer, size) {
  return sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toBuffer();
}

function buildIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = headerSize + numImages * dirEntrySize;

  let offset = dirSize;
  const offsets = [];
  for (const buf of pngBuffers) {
    offsets.push(offset);
    offset += buf.length;
  }

  const totalSize = offset;
  const ico = Buffer.alloc(totalSize);

  // ICONDIR header
  ico.writeUInt16LE(0, 0);       // reserved
  ico.writeUInt16LE(1, 2);       // type: 1 = icon
  ico.writeUInt16LE(numImages, 4);

  // ICONDIRENTRY for each image
  pngBuffers.forEach((buf, i) => {
    const size = SIZES[i];
    const base = headerSize + i * dirEntrySize;
    ico.writeUInt8(size === 256 ? 0 : size, base);      // width (0 = 256)
    ico.writeUInt8(size === 256 ? 0 : size, base + 1);  // height
    ico.writeUInt8(0, base + 2);    // color count
    ico.writeUInt8(0, base + 3);    // reserved
    ico.writeUInt16LE(1, base + 4); // color planes
    ico.writeUInt16LE(32, base + 6);// bits per pixel
    ico.writeUInt32LE(buf.length, base + 8);  // size of image data
    ico.writeUInt32LE(offsets[i], base + 12); // offset of image data
  });

  // Image data
  let pos = dirSize;
  for (const buf of pngBuffers) {
    buf.copy(ico, pos);
    pos += buf.length;
  }

  return ico;
}

async function main() {
  const svgBuffer = Buffer.from(SVG);
  const pngs = await Promise.all(SIZES.map(s => svgToPng(svgBuffer, s)));
  const ico = buildIco(pngs);
  fs.writeFileSync(OUT, ico);
  console.log(`favicon.ico written → ${OUT} (${SIZES.join('+')}px, ${ico.length} bytes)`);
}

main().catch(err => { console.error(err); process.exit(1); });
