# WonderHug.Life

Pregnancy + maternity wellness: **Garbh Sanskar practice beside modern education**, a WhatsApp community of **50,000+ mothers (AiSensy)**, programmes, and INR checkout.

Primary audience: Telugu-speaking families in Telangana and Andhra Pradesh. Secondary: pan-India English.

The website is a **Next.js App Router** app (`web/`). Content-heavy routes are statically generated. Interactive surfaces (journey, cart, tools, auth, CMS) are Client Components.

## Run locally (web)

The site is **Next.js**. It is no longer Vite. After `npm run dev`, open **http://localhost:5173** from a *new* `web/` process — if an old Vite window is still running, stop it first (Ctrl+C in that terminal), then start again from this repo/branch.

```bash
cd web
cp .env.example .env.local   # optional
npm install
npm run dev                  # Next.js on http://localhost:5173
```

You should see the WonderHug hugging-arms logo in the header and a bilingual hero. `/admin` must load a CMS page, not “This page is not on the journey.” If you still see the old 404 header (no Shop / no language switcher), you are on a stale Vite process — kill anything bound to 5173 and rerun `npm run dev` in `web/`.

Without Supabase/Razorpay keys the site uses the bilingual catalogue and **demo checkout**.

## Run locally (mobile)

```bash
cd mobile
flutter create . --project-name wonderhug --org life.wonderhug
flutter pub get
flutter test
flutter run --dart-define=SUPABASE_URL= --dart-define=SUPABASE_ANON_KEY= --dart-define=RAZORPAY_KEY_ID=
```

## Supabase

Migrations in `supabase/migrations`. Seed in `supabase/seed`. Edge functions: Razorpay order, webhook, AiSensy opt-in.

```bash
supabase db push
supabase db seed
```

## Docs

- `docs/ROUTES.md` — every real web route (direct navigation must 200)
- `docs/screenshots/` — verification screenshots
- `docs/ARCHITECTURE.md` — layering
- `docs/DEPLOY.md` — Vercel + TestFlight/Play
- `docs/NEED_FROM_YOU.md` — logo, verified experts, legal, credentials, store assets
