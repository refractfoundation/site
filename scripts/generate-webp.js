#!/usr/bin/env node
// generate-webp.js — Convert JPG/PNG images in assets/images/ to WebP
//
// Runs on any platform (including Windows and Vercel) without requiring
// the cwebp system binary or apt-get.
//
// Usage: node scripts/generate-webp.js [directory]

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMG_DIR = path.resolve(process.argv[2] || 'assets/images');
const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png']);

function isSupportedImage(file) {
  return SUPPORTED_EXTS.has(path.extname(file).toLowerCase());
}

async function findImages(dir) {
  const results = [];
  // Walks the entire assets/images tree, converting every .jpg/.jpeg/.png.
  const entries = await fs.promises.readdir(dir, { withFileTypes: true, recursive: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const parentPath = entry.parentPath || entry.path;
    if (!parentPath) {
      throw new Error(`Unexpected readdir entry without path: ${entry.name}`);
    }
    const fullPath = path.join(parentPath, entry.name);
    if (isSupportedImage(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function needsConversion(imgPath, webpPath) {
  try {
    const [imgStat, webpStat] = await Promise.all([
      fs.promises.stat(imgPath),
      fs.promises.stat(webpPath)
    ]);
    return imgStat.mtimeMs > webpStat.mtimeMs;
  } catch {
    return true;
  }
}

async function main() {
  if (!fs.existsSync(IMG_DIR)) {
    console.error(`Error: directory '${IMG_DIR}' does not exist.`);
    process.exit(1);
  }

  console.log(`Converting images in ${IMG_DIR} to WebP...\n`);

  const images = await findImages(IMG_DIR);
  let converted = 0;
  let skipped = 0;

  await Promise.all(
    images.map(async (img) => {
      const webp = img.replace(/\.[^.]+$/, '.webp');
      if (!(await needsConversion(img, webp))) {
        skipped++;
        return;
      }
      try {
        await sharp(img).webp({ quality: 75 }).toFile(webp);
        console.log(`  ✓ ${path.relative(process.cwd(), img)}`);
        converted++;
      } catch (err) {
        console.error(`  ✗ ${path.relative(process.cwd(), img)} (${err.message})`);
      }
    })
  );

  console.log(`\nConversion complete. ${converted} converted, ${skipped} skipped.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
