#!/usr/bin/env node
// generate-webp.js: create WebP versions of the JPG/PNG images in assets/images/.
//
// For every image it writes:
//   name.webp           the full-size image
//   name-640.webp       smaller versions for responsive srcset (see _includes/picture.html),
//   name-1024.webp      written only when the source is wider than the variant, so images are
//   name-1600.webp      never upscaled
//
// Sized versions are made only for images a page can use: photos listed in _data/photos.yml,
// project screenshots and partner logos. Spare photos get them when they are first added to
// photos.yml, which keeps unused photos from bloating every deployment.
//
// The generated files are not committed (.gitignore); the build creates them.
// Runs on any platform, including Vercel, without the cwebp binary.
//
// Usage: node scripts/generate-webp.js [directory]

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMG_DIR = path.resolve(process.argv[2] || 'assets/images');
const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png']);
const VARIANT_WIDTHS = [640, 1024, 1600];
const QUALITY = 75;
const SIZED_FOLDERS = /[\\/](projects|partners)[\\/]/;

// Stems of the photos listed in _data/photos.yml (top-level keys).
function listedPhotos() {
  const file = path.resolve(__dirname, '..', '_data', 'photos.yml');
  if (!fs.existsSync(file)) return new Set();
  const keys = fs.readFileSync(file, 'utf8').matchAll(/^([a-z0-9-]+):/gm);
  return new Set([...keys].map((match) => match[1]));
}
const LISTED = listedPhotos();

async function findImages(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath || entry.path, entry.name))
    .filter((file) => SUPPORTED_EXTS.has(path.extname(file).toLowerCase()));
}

async function isStale(source, target) {
  try {
    const [sourceStat, targetStat] = await Promise.all([fs.promises.stat(source), fs.promises.stat(target)]);
    return sourceStat.mtimeMs > targetStat.mtimeMs;
  } catch {
    return true;
  }
}

async function convert(source) {
  const stem = source.replace(/\.[^.]+$/, '');
  const { width } = await sharp(source).metadata();
  const targets = [{ file: `${stem}.webp`, resize: null }];
  const sized = LISTED.has(path.basename(stem)) || SIZED_FOLDERS.test(source);
  if (sized) {
    for (const variant of VARIANT_WIDTHS) {
      if (width > variant) targets.push({ file: `${stem}-${variant}.webp`, resize: variant });
    }
  }

  let written = 0;
  for (const { file, resize } of targets) {
    if (!(await isStale(source, file))) continue;
    // rotate() applies EXIF orientation before the metadata is dropped.
    const image = sharp(source).rotate();
    await (resize ? image.resize({ width: resize }) : image).webp({ quality: QUALITY }).toFile(file);
    written++;
  }
  return written;
}

async function main() {
  if (!fs.existsSync(IMG_DIR)) {
    console.error(`Error: directory '${IMG_DIR}' does not exist.`);
    process.exit(1);
  }

  console.log(`Converting images in ${IMG_DIR} to WebP...\n`);
  const images = await findImages(IMG_DIR);
  let failed = 0;

  const counts = await Promise.all(
    images.map(async (image) => {
      try {
        return await convert(image);
      } catch (error) {
        failed++;
        console.error(`  ✗ ${path.relative(process.cwd(), image)} (${error.message})`);
        return 0;
      }
    })
  );
  const written = counts.reduce((sum, count) => sum + count, 0);

  console.log(`Conversion complete. ${written} WebP files written for ${images.length} images.`);
  if (failed) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
