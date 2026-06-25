#!/usr/bin/env bash
# Package deployable static assets into dist/
# Used by GitHub Actions and AWS deployment workflows.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"

echo "Building static site → dist/"
rm -rf "$DIST"
mkdir -p "$DIST"

cp "$ROOT/index.html" "$DIST/"
cp -r "$ROOT/pages" "$ROOT/css" "$ROOT/js" "$ROOT/images" "$DIST/"

echo "Done. $(find "$DIST" -type f | wc -l) files in dist/"
