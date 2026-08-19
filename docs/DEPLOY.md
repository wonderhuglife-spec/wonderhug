# Deployment

## Web (Vercel)

1. Set the project root to `web/`.
2. Framework preset: **Next.js**.
3. Build command: `npm ci && npm run build`
4. Output: Next.js (`.next`) — not a static `dist` folder.
5. Environment variables (anon/public only):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_RAZORPAY_KEY_ID
NEXT_PUBLIC_AISENSY_WHATSAPP_URL
NEXT_PUBLIC_AISENSY_API_KEY
```

Never put Razorpay secret or Supabase service role in `NEXT_PUBLIC_*`.

Razorpay order creation in production goes through `supabase/functions/create-razorpay-order`. Until that function is deployed and `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set, checkout records a **demo order**.

ISR: blog, expert, product, hub and week pages use `generateStaticParams`. Re-deploy or on-demand revalidate after CMS publishes.

## Supabase

```
supabase db push
supabase db seed
```

Apply `supabase/migrations` in order, including `20260819120000_cms_admin_auth.sql` and `20260819140000_cms_admin_pgcrypto_path.sql` (CMS login, extra admins, media uploads). Paste the SQL body into the dashboard — not the file path.

The site already uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (the `sb_publishable_…` key). Paste that SQL in **Supabase → SQL Editor → Run**. After it succeeds, CMS login `adminmani` / `maniadmin` is stored in the project, and **Admin users** can add more operators.

Until that SQL runs, the same starter login still opens the panel in the browser, but new admins and uploaded files cannot be saved to Supabase (row-level security blocks anonymous writes).

## Mobile

```
cd mobile
flutter create . --project-name wonderhug --org life.wonderhug
flutter run --dart-define=SUPABASE_URL=... --dart-define=SUPABASE_ANON_KEY=... --dart-define=RAZORPAY_KEY_ID=...
```

FCM: add Firebase configs (`google-services.json`, `GoogleService-Info.plist`) when you have a Firebase project. Topics: `daily_practice`, `program_milestones`, `order_updates`. Preferences are stored offline now.

TestFlight / Play internal: listing assets come from WonderHug (icons, screenshots, privacy URLs).
