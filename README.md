# WonderHug.Life

Pregnancy and parenting companion: **planning → fertility support education → pregnancy → birth preparation → postpartum → baby care → conscious parenting**.

This repository is a greenfield rewrite. The numbered product-knowledge files were not in git; architecture is documented in [`docs/`](docs/).

## What’s here

| Path | What |
| --- | --- |
| `web/` | React + TypeScript + Vite website |
| `mobile/` | Flutter app (Home / Journey / Learn / Community / Profile) |
| `supabase/` | Postgres migrations + RLS + seed |
| `docs/` | Audit and architecture |

## Website

```bash
cd web
cp .env.example .env.local   # optional; the UI works with local fallback content
npm install
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
```

Environment (anon key only):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SITE_URL=https://wonderhug.life
```

Never put a Supabase **service role** key in `web/` or `mobile/`.

## Flutter

```bash
cd mobile
flutter create .    # generates android/ios folders once the SDK is installed
flutter test
flutter run --dart-define=SUPABASE_URL= --dart-define=SUPABASE_ANON_KEY=
```

## Medical safety

Copy on this site is **education**, not diagnosis or treatment. Expert names, testimonials, and outcome claims are not invented. Placeholders are labelled `CONTENT_PLACEHOLDER` or `REQUIRES_VERIFIED_DATA`.

## Brand

Primary: WonderHug Purple `#79409B`, Teal `#309292`, Dark Blue `#2F4275`.  
The official logo file was not in the repository; `web/public/logo.svg` is a replaceable lockup.
