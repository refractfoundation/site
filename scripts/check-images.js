#!/usr/bin/env node
// check-images.js: keeps assets/images tidy.
//
// Fails (exit 1) when:
//   1. a filename breaks the rule: lowercase letters, digits, hyphens, dots only
//   2. a page, layout, data file or stylesheet references an image that is missing
//   3. a photos.yml entry has no alt text, a missing file, or the wrong size
//   4. two images are visually the same picture, even under different names
//
// Spare photos that nothing references are fine: they are kept for future pages.
//
// Usage: node scripts/check-images.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const YAML = require('yaml');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'assets', 'images');
// Duplicate detection covers photographs. Game screenshots and logos are PNGs and are excluded:
// two screenshots can share a background and look alike without being copies.
const PHOTO = new Set(['.jpg', '.jpeg']);
const NAME_RULE = /^[a-z0-9][a-z0-9.-]*$/;
const REFERENCE = /\/assets\/images\/[^\s"'<>()\\]+/g;
const TEXT_EXTENSIONS = new Set(['.md', '.html', '.yml', '.yaml', '.css', '.scss', '.js', '.json']);
const SKIP_DIRS = new Set(['node_modules', '_site', '.git', '.jekyll-cache', 'vendor', 'bootstrap-dist', 'docs']);

// Two images whose 256-bit difference hashes differ by this many bits or fewer are duplicates.
// Re-exports of one photo score 0-9; genuinely different photos score in the dozens.
const DUPLICATE_DISTANCE = 10;

// Known problems that are tracked elsewhere. Remove an entry when it is fixed.
const KNOWN_MISSING = new Set([
  // Open Sauce logo: referenced by campfire_partners.yml but never had a source file.
  '/assets/images/partners/opensauce.webp',
]);

const errors = [];
const fail = (message) => errors.push(message);

function* walk(dir, skip = SKIP_DIRS) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skip.has(entry.name)) yield* walk(path.join(dir, entry.name), skip);
    } else if (!entry.name.startsWith('.')) {
      // Dotfiles such as .DS_Store are editor and OS litter, not site assets.
      yield path.join(dir, entry.name);
    }
  }
}

const relative = (file) => path.relative(ROOT, file).split(path.sep).join('/');

function checkFilenames(files) {
  for (const file of files) {
    const name = path.basename(file);
    if (!NAME_RULE.test(name)) fail(`Filename must be lowercase with no spaces: ${relative(file)}`);
  }
}

// A reference is satisfied by the file itself or, for .webp, by its jpg/png source
// (WebP files are generated at build time and are not committed).
function referenceExists(url) {
  const file = path.join(ROOT, url.replace(/^\//, ''));
  if (fs.existsSync(file)) return true;
  if (url.endsWith('.webp')) {
    const stem = file.slice(0, -'.webp'.length);
    return ['.jpg', '.jpeg', '.png'].some((ext) => fs.existsSync(stem + ext));
  }
  return false;
}

function checkReferences() {
  for (const file of walk(ROOT)) {
    if (file.startsWith(IMG_DIR) || !TEXT_EXTENSIONS.has(path.extname(file))) continue;
    if (path.basename(file) === 'package-lock.json') continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const [url] of text.matchAll(REFERENCE)) {
      // Prose that mentions the folder, e.g. "assets/images/...", is not a reference.
      if (!/\.[a-z0-9]+$/i.test(url) || url.includes('...')) continue;
      if (KNOWN_MISSING.has(url) || referenceExists(url)) continue;
      fail(`${relative(file)} references a missing image: ${url}`);
    }
  }
}

async function checkPhotoData() {
  const file = path.join(ROOT, '_data', 'photos.yml');
  if (!fs.existsSync(file)) return;
  const photos = YAML.parse(fs.readFileSync(file, 'utf8')) || {};
  for (const [id, photo] of Object.entries(photos)) {
    if (!photo.alt || !String(photo.alt).trim()) fail(`photos.yml: ${id} has no alt text`);
    const imagePath = path.join(ROOT, String(photo.file || '').replace(/^\//, ''));
    if (!photo.file || !fs.existsSync(imagePath)) {
      fail(`photos.yml: ${id} points at a missing file (${photo.file})`);
      continue;
    }
    if (path.basename(imagePath, path.extname(imagePath)) !== id) {
      fail(`photos.yml: key "${id}" should match its filename ${path.basename(imagePath)}`);
    }
    const { width, height } = await sharp(imagePath).metadata();
    if (photo.w !== width || photo.h !== height) {
      fail(`photos.yml: ${id} is ${width}x${height} but lists ${photo.w}x${photo.h}`);
    }
  }
}

// Difference hash: shrink to 17x16 greyscale and record whether each pixel is brighter than
// its right-hand neighbour. Survives resizing and re-encoding, so it finds copies that a
// byte comparison misses.
async function differenceHash(file) {
  const data = await sharp(file)
    .rotate()
    // Mid-grey, so white and black logos on transparent backgrounds stay distinguishable.
    .flatten({ background: '#808080' })
    .greyscale()
    .resize(17, 16, { fit: 'fill' })
    .raw()
    .toBuffer();
  const bits = [];
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) bits.push(data[y * 17 + x] > data[y * 17 + x + 1] ? 1 : 0);
  }
  return bits;
}

const hamming = (a, b) => a.reduce((sum, bit, i) => sum + (bit !== b[i] ? 1 : 0), 0);

async function checkDuplicates(files) {
  const rasters = files.filter((file) => PHOTO.has(path.extname(file).toLowerCase()));
  const hashes = await Promise.all(rasters.map(async (file) => [file, await differenceHash(file)]));
  for (let i = 0; i < hashes.length; i++) {
    for (let j = i + 1; j < hashes.length; j++) {
      if (hamming(hashes[i][1], hashes[j][1]) <= DUPLICATE_DISTANCE) {
        fail(`Duplicate images: ${relative(hashes[i][0])} and ${relative(hashes[j][0])}`);
      }
    }
  }
  return rasters.length;
}

async function main() {
  const files = [...walk(IMG_DIR)].filter((file) => path.extname(file) !== '.webp');
  checkFilenames(files);
  checkReferences();
  await checkPhotoData();
  const compared = await checkDuplicates(files);

  if (errors.length) {
    console.error(`\n${errors.length} problem(s) found:\n`);
    for (const message of errors) console.error(`  ✗ ${message}`);
    process.exit(1);
  }
  console.log(`✓ ${files.length} images checked (${compared} compared for duplicates). No problems found.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
