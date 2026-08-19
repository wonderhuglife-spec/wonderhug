#!/usr/bin/env bash
# Copy Cloud Agent / shell public env into web/.env.local (gitignored) for Next.js.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root/web"
umask 077
publishable="${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:-${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}}"
{
  echo "NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-}"
  echo "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${publishable}"
  echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY:-${publishable}}"
  echo "NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-https://wonderhug.life}"
} > .env.local
