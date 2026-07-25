#!/usr/bin/env bash
# generate-webp.sh — Convert JPG/PNG images in assets/images/ to WebP
#
# Prerequisites (pick one):
#   macOS:  brew install webp
#   Ubuntu: sudo apt-get install -y webp
#   npm:    npm install -g webp-converter
#
# Usage: bash scripts/generate-webp.sh

set -euo pipefail

IMG_DIR="${1:-assets/images}"

find_cwebp() {
  # Check PATH first
  if command -v cwebp &> /dev/null; then
    echo "cwebp"
    return
  fi
  # Check common npm global install locations
  for p in \
    "$(npm root -g 2>/dev/null)/webp-converter/bin/cwebp" \
    "./node_modules/.bin/cwebp" \
    "/usr/local/bin/cwebp" \
    "/opt/homebrew/bin/cwebp"; do
    if [ -x "$p" ]; then echo "$p"; return; fi
  done
  echo ""
}

CWEBP=$(find_cwebp)
if [ -z "$CWEBP" ]; then
  echo "Error: cwebp was not found."
  echo ""
  echo "Install it via one of:"
  echo "  macOS:       brew install webp"
  echo "  Ubuntu:      sudo apt-get install -y webp"
  echo "  npm:         npm install -g webp-converter"
  echo ""
  echo "Or download from: https://developers.google.com/speed/webp/download"
  exit 1
fi

if [ ! -d "$IMG_DIR" ]; then
  echo "Error: directory '$IMG_DIR' does not exist."
  exit 1
fi

echo "Converting images in $IMG_DIR to WebP using $CWEBP..."
echo ""

count=0
skipped=0

find "$IMG_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0 | while IFS= read -r -d '' img; do
  webp="${img%.*}.webp"
  if [ -f "$webp" ] && [ "$img" -ot "$webp" ]; then
    ((skipped++)) || true
    continue
  fi
  "$CWEBP" -q 75 "$img" -o "$webp" > /dev/null 2>&1 && echo "  ✓ $img" || echo "  ✗ $img (failed)"
  ((count++)) || true
done

echo ""
echo "Conversion complete."
