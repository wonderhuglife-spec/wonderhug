# Deployment

## Web (Vercel or Netlify)

1. Set the project root to `web/`.
2. Build command: `npm ci && npm run build`
3. Output: `dist`
4. Environment variables (anon/public only):

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_SITE_URL
VITE_RAZORPAY_KEY_ID
VITE_AISENSY_WHATSAPP_URL
VITE_AISENSY_API_KEY
```

Never put Razorpay secret or Supabase service role in Vite env.

Razorpay order creation in production should go through `supabase/functions/create-razorpay-order` (secret key as a Supabase secret). Until that function is deployed, the site uses **demo checkout** when `VITE_RAZORPAY_KEY_ID` is empty.

## Supabase

```
supabase db push
supabase db seed
```

Apply `supabase/migrations` in order. Create an auth user and set `profiles.role = 'admin'` for CMS writes.

## Mobile

```
cd mobile
flutter create .   # once, to generate android/ios folders
flutter run --dart-define=SUPABASE_URL=... --dart-define=SUPABASE_ANON_KEY=... --dart-define=RAZORPAY_KEY_ID=...
```

FCM: add Firebase configs (`google-services.json`, `GoogleService-Info.plist`) when you have a Firebase project. Push topics: `daily_practice`, `program_milestones`, `order_updates`.

TestFlight / Play internal: use listing assets from WonderHug (icons, screenshots, privacy URLs).
