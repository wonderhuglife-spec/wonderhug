#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../web"

npm ci
npx playwright install --with-deps chromium
