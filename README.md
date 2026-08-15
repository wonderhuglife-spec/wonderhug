# WonderHug.Life

Pregnancy + maternity wellness: **Garbh Sanskar practice beside modern education**, a WhatsApp community of **50,000+ mothers (AiSensy)**, programmes, and INR checkout.

Primary audience: Telugu-speaking families in Telangana and Andhra Pradesh. Secondary: pan-India English.

## Run locally (web)

```bash
cd web
cp .env.example .env.local   # optional
npm install
npm run dev
npm test
npm run typecheck
npm run build
npx playwright install chromium && npm run test:e2e
```

Without Supabase/Razorpay keys the site uses the bilingual catalogue and **demo checkout**.

## Run locally (mobile)

```bash
cd mobile
flutter create .    # once
flutter test
flutter run
```

## Supabase

Migrations in `supabase/migrations`. Seed in `supabase/seed`. Edge functions: Razorpay order + AiSensy opt-in.

## Docs

- `docs/PROJECT_AUDIT.md` — original empty-repo audit
- `docs/ARCHITECTURE.md` — layering
- `docs/DEPLOY.md` — Vercel/Netlify, TestFlight/Play
- `docs/NEED_FROM_YOU.md` — logo, verified experts, legal, credentials, store assets
