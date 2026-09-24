#!/usr/bin/env node
/**
 * Downscale and re-encode oversized source images in place so deployments stay small.
 *
 * Usage: node scripts/optimise-images.js [directory]   (default: assets/images)
 *
 * Images wider than MAX_WIDTH are resized down; JPEG/PNG are re-encoded. Files that
 * are already small enough are left untouched, so the script is safe to re-run.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAX_WIDTH = 2400;
const SKIP_UNDER_BYTES = 500 * 1024;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

async function optimise(file) {
  const before = fs.statSync(file).size;
  const { width } = await sharp(file).metadata();
  if (before < SKIP_UNDER_BYTES && width <= MAX_WIDTH) return null;

  const pipeline = sharp(file)
    .rotate() // bake in EXIF orientation before metadata is stripped
    .resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const isPng = path.extname(file).toLowerCase() === '.png';
  const buffer = await (isPng
    ? pipeline.png({ compressionLevel: 9 })
    : pipeline.jpeg({ quality: 82, mozjpeg: true })
  ).toBuffer();

  if (buffer.length >= before) return null;
  fs.writeFileSync(file, buffer);
  return { file, before, after: buffer.length };
}

(async () => {
  const root = process.argv[2] || 'assets/images';
  let saved = 0;
  for (const file of walk(root)) {
    const r = await optimise(file);
    if (!r) continue;
    saved += r.before - r.after;
    console.log(`  ✓ ${r.file}  ${(r.before / 1e6).toFixed(1)}MB → ${(r.after / 1e6).toFixed(2)}MB`);
  }
  console.log(`\nSaved ${(saved / 1e6).toFixed(1)}MB`);
})();
