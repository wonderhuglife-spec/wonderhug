# WonderHug.Life — Architecture (Phase 1)

**Status:** Binding for implementation. Product facts that are not in-repo remain placeholders.

Related: [`PROJECT_AUDIT.md`](./PROJECT_AUDIT.md)

---

## 1. Product architecture

WonderHug.Life is two clients sharing one backend:

```text
┌─────────────────┐     ┌──────────────────┐
│  web/ (Vite)    │     │  mobile/ (Flutter)│
│  Public site +  │     │  Daily companion  │
│  content + SEO  │     │  Home / Journey   │
└────────┬────────┘     └─────────┬────────┘
         │  anon key only         │
         ▼                        ▼
         ┌────────────────────────────────┐
         │  Supabase                      │
         │  Auth · Postgres · RLS         │
         │  Storage (media)               │
         └────────────────────────────────┘
```

**Website job:** trust, education, acquisition, SEO topic clusters, expert/community preview.  
**App job:** daily use, journey status, today’s guidance, saved content — **native**, not a WebView of the site.

Layering (both clients):

```text
UI (pages, sections, widgets)
    → hooks / providers (Riverpod on mobile)
        → services (personalization, content, analytics)
            → Supabase (or local fallback when CONFIG_REQUIRED)
```

Visual components must not call Supabase directly and must not embed personalization or analytics side effects except through those layers.

---

## 2. Directory structure

```text
/
  docs/
    PROJECT_AUDIT.md
    ARCHITECTURE.md
  web/
    public/                 robots.txt, sitemap.xml, og image, logo slot
    src/
      app/                  router, providers, App
      components/           design system + shared chrome
      sections/             homepage and marketing sections
      layouts/              SiteLayout, EditorialLayout
      pages/                route-level pages
      hooks/                useJourney, useContent, useMediaQuery
      lib/                  supabase client, cn(), constants
      services/             content, experts, community, personalization, analytics
      types/                domain types
      data/                 typed fallback / seed-shaped content
      styles/               tokens.css, index.css
      utils/                readingTime, dates, a11y
      test/                 setup + helpers
  supabase/
    migrations/             timestamped SQL
    seed/                   development placeholders only
  mobile/
    lib/
      app/                  WonderHugApp, router
      core/                 theme, env, supabase
      design_system/
      features/
        onboarding/
        home/
        journey/
        learn/
        community/
        experts/
        tools/
        profile/
      shared/
    test/
  .env.example              root pointer
```

Website technology: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, Lucide (sparse), `@supabase/supabase-js`, `react-helmet-async`.

Mobile: Flutter, Material 3, Riverpod, GoRouter, `supabase_flutter`.

---

## 3. Routing (website)

| Path | Purpose |
| --- | --- |
| `/` | Homepage |
| `/pregnancy` | Pregnancy hub |
| `/pregnancy/week-by-week` | Week-by-week hub (not 40 thin pages until real copy exists) |
| `/pregnancy/trimester` | Trimester hub |
| `/pregnancy/birth-preparation` | Birth preparation |
| `/pregnancy-planning` | Planning hub |
| `/pregnancy-planning/nutrition` | Nutrition cluster |
| `/pregnancy-planning/lifestyle` | Lifestyle cluster |
| `/pregnancy-planning/couple-readiness` | Couple readiness |
| `/parenting` | Parenting hub |
| `/parenting/newborn` | Newborn |
| `/parenting/baby-development` | Development |
| `/experts` | Directory |
| `/experts/:slug` | Profile |
| `/tools` | Tools index |
| `/community` | Groups (calm, not a feed clone) |
| `/community/:slug` | Group |
| `/blog` | Editorial index |
| `/blog/:slug` | Article |
| `/about` | About + team interaction |
| `/start` | Start Your Journey (onboarding-lite) |
| `/download` | App promotion |
| `/privacy`, `/terms`, `/medical-disclaimer` | Legal shells |

Primary nav: Home, Pregnancy, Pregnancy Planning, Parenting, Experts, Community, Tools, Blogs, About.  
Primary CTA: **Start Your Journey**. Secondary: **Download App**.

Flutter tabs: Home, Journey, Learn, Community, Profile.

---

## 4. Component strategy

### Design tokens

CSS custom properties in `web/src/styles/tokens.css`, mirrored in Tailwind theme and Flutter `ColorScheme`.

| Token | Value |
| --- | --- |
| `--wh-purple` | `#79409B` |
| `--wh-teal` | `#309292` |
| `--wh-navy` | `#2F4275` |
| `--wh-teal-soft` | `#F0FDFA` |
| `--wh-white` | `#FFFFFF` |
| `--wh-text` | `#1F2937` |
| `--wh-text-secondary` | `#64748B` |
| `--wh-text-muted` | `#94A3B8` |
| `--wh-border` | `#E5E7EB` |
| `--wh-bg-soft` | `#F8FAFA` |

Motion: short, opacity/transform only; respect `prefers-reduced-motion`. No glassmorphism, no purple wash, no card grids for every section.

### Primitives (`web/src/components/ui`)

Button, Badge, Container, Typography, Card, SectionHeader, Avatar, Modal, Drawer, Tabs, Input, Loading, EmptyState, ErrorState.

### Sections vs pages

- `pages/` own routing, SEO, data hooks, error/empty/loading.
- `sections/` are compositional and receive data as props.
- Journey changes flow through `useJourney()` → personalization service → recommended items.

---

## 5. Personalization

Stored fields (profile / local until auth):

- `journeyStage`: `planning` | `ttc` | `pregnant` | `birth_prep` | `new_parent` | `parenting`
- `pregnancyWeek` (optional)
- `babyAgeMonths` (optional)
- `language` (default `en-IN`)
- `interests[]`
- `savedContentIds[]`
- `completedActivityIds[]`

`personalizationService.recommend(input)` returns content, tools, and community group suggestions. UI never switches on journey stage except to render what the service returns.

Website journey selector stages:

1. Planning Pregnancy  
2. Trying to Conceive  
3. Pregnant  
4. Preparing for Birth  
5. New Parent  
6. Parenting  

App onboarding asks only: “What describes your journey?” (birth-prep can map later from pregnant + intent; keep the five-option onboarding as specified).

---

## 6. Supabase strategy

- Migrations in `supabase/migrations`; never “click-ops” as source of truth.
- Public anon key in `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` only.
- Service role: server/CI only — **never** in `web/` or `mobile/`.
- If env is empty, services return typed fallback data and `configStatus: 'CONFIG_REQUIRED'`.
- RLS: anonymous `SELECT` only for `is_published` (or equivalent) rows. Writes require auth + role.
- Roles: `user`, `moderator`, `expert`, `admin` (via `profiles.role`).
- IDs: UUID primary keys; `created_at` / `updated_at` everywhere; indexes on slugs, FKs, published flags.

Core tables: `profiles`, `journey_progress`, `experts`, `expert_content`, `blog_posts`, `courses`, `course_modules`, `daily_activities`, `tools`, `community_groups`, `community_posts`, `community_comments`, `community_reports`, `events`, `testimonials`, `notifications`.

Blog posts match the specified column set (slug, review_status, expert_reviewer_id, SEO fields, etc.).

Seed data is **development-only** and labelled so it cannot be mistaken for real clinicians or reviews.

---

## 7. Content, experts, community

- **Blog:** editorial featured layout; categories as specified; related expert/tools via IDs not hardcoded in the article body component.
- **Experts:** directory filters by speciality; profiles never invent credentials. Placeholders: `REQUIRES_VERIFIED_DATA`.
- **Community:** groups by journey; posts + comments + report; expert answers flagged. Tone: safe, calm, useful — not a noisy social product.
- **Medical:** article chrome shows author, reviewer, qualification, last reviewed, references, and an education-not-diagnosis disclaimer.

---

## 8. SEO and analytics

- Per-route title, description, canonical, Open Graph via Helmet.
- JSON-LD: Organization on all pages; Article on posts; Person on verified experts only (skip for placeholders).
- `public/robots.txt`, `public/sitemap.xml` (static list of real hubs; no fake week URLs).
- Internal links between cluster hubs.
- Analytics events (abstracted): `hero_cta_click`, `journey_selected`, `signup_started`, `signup_completed`, `article_opened`, `article_saved`, `expert_opened`, `tool_used`, `community_opened`, `community_post_created`, `app_download_clicked`.

---

## 9. Flutter architecture

- `GoRouter` for onboarding gate + shell with 5 tabs.
- Riverpod: `journeyProvider`, `homeFeedProvider`, `authProvider`.
- Feature-first folders; `design_system` wraps Material 3 with WonderHug tokens.
- Home: greeting, journey status, today’s guidance, recommended content, ask an expert, community, featured learning, tools.
- Accessibility: semantics, 44dp targets, text scaling, contrast.
- Config: `--dart-define` or flutter_dotenv **not committed**; example in `mobile/.env.example`.

---

## 10. Testing and quality

Website: Vitest + Testing Library.

Minimum coverage:

- Journey selection updates recommendations
- Content service loading / empty / error / success
- Navigation of primary routes
- Auth service no-ops safely when unconfigured

Flutter: unit + widget tests for onboarding choice persistence and tab navigation (when SDK is available).

Lint: ESLint + TypeScript `strict`. Dart `flutter analyze` when SDK exists.

Performance: route-level code splitting (`React.lazy`), lazy images, no autoplay video, font subset via Google Fonts `display=swap`.

---

## 11. Environment

Website `web/.env.example`:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SITE_URL=https://wonderhug.life
```

Never commit `.env` files with secrets.

---

## 12. Phase 1 decision log

| Decision | Choice |
| --- | --- |
| Monorepo vs polyrepo | Monorepo (`web`, `mobile`, `supabase`) |
| Website location | `web/` (keeps Flutter and SQL uncluttered) |
| Router | React Router v6 (Vite SPA) + Helmet for SEO; prerender/SSR can come later without changing page modules |
| State | React context for journey + React Query-style async in services (lightweight custom status objects first) |
| Logo | SVG lockup in `web/src/components/brand/Logo.tsx` + `public/logo.svg`, replaceable when official art arrives |
| Fake social proof | Forbidden. Empty/placeholder states instead |
| Live PHP site | Out of scope to patch Hostinger; this repo is the replacement |
