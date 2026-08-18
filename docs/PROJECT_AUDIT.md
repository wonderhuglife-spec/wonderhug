# WonderHug.Life — Project Audit (Phase 0)

**Audit date:** 15 August 2026  
**Repository:** `github.com/wonderhuglife-spec/wonderhug`  
**Branch audited:** `main` (`eaa0e17` — “Initial commit”)

This audit is the source of truth for what exists today. It does **not** invent product facts (team names, clinical claims, user counts, testimonials, or expert credentials).

---

## 1. Executive summary

WonderHug.Life is specified as a **pregnancy + parenting platform**: a trusted daily companion from pregnancy planning through conscious parenting, combining experts, education, tools, community, and Indian cultural context with evidence-aware information.

The GitHub repository is a **greenfield project**. There is no existing React, Vite, Flutter, or Supabase implementation to preserve. The public site at `https://wonderhug.life/` is a **legacy PHP/Hostinger** application that currently fails with a database authentication error. The numbered product-knowledge files listed in the master prompt are **not in this repository**.

**Implication:** Implementation must be built from the master development specification, with missing business facts marked `TODO`, `CONTENT_PLACEHOLDER`, `REQUIRES_VERIFIED_DATA`, or `CONFIG_REQUIRED`.

---

## 2. Current architecture

| Layer | Status |
| --- | --- |
| Git repository | Present. Single file: `README.md` (`# wonderhug`). |
| Website (this repo) | **Missing.** |
| Flutter app (this repo) | **Missing.** |
| Supabase | **Missing.** No schema, migrations, env, or client. |
| Design system | **Missing.** Brand colours specified in the master prompt only. |
| CI | **Missing.** |
| Tests | **Missing.** |
| Docs / knowledge files | **Missing** from this repo. |
| Logo asset (`WonderHugLife.jpg`) | **Not present** in this repo. |
| HTML reference (`wonderhug_life_additions.html`) | **Not present** in this repo. |

### 2.1 Live production (external, not in git)

Observed 15 August 2026:

- URL: `https://wonderhug.life/`
- Stack signals: PHP 8.3, Hostinger (`platform: hostinger`, `panel: hpanel`), `PHPSESSID` cookie
- Response: HTTP 200 with body: database access denied for user `u363137141_whdev`
- No HTML, CSS, JS, or logo URLs could be extracted while the DB is down

This live app is **not** the codebase in GitHub. Treat it as a broken production property to replace, not as a source tree we can refactor.

Indexed marketing copy (search snippets from when the site was up) mentioned Garbh Sanskar, programs such as Beej Sanskar / Womb Care / Super Parenting, and a “50,000+ mothers” claim. **Those figures and program names are not verified in this repository.** Do not treat search snippets as medical or growth facts. User-count and outcome claims must remain `REQUIRES_VERIFIED_DATA`.

---

## 3. Source-of-truth files (requested vs found)

| Requested file | Found |
| --- | --- |
| `01 — Product Strategy & Vision.md` | No |
| `02 — Design System.md` | No |
| `03 — Website Homepage.md` | No |
| `04 — Website UX & Information Architecture.md` | No |
| `05 — Flutter App.md` | No |
| `06 — Supabase Database.md` | No |
| `07 — Blog + Content Platform.md` | No |
| `08 — Expert Platform.md` | No |
| `09 — Community Platform.md` | No |
| `10 — SEO Architecture.md` | No |
| `11 — Growth & Conversion.md` | No |
| `12 — QA Accessibility Performance.md` | No |
| `wonderhug_life_additions.html` | No |
| `WonderHugLife.jpg` | No |

**Acting source of truth:** the Cursor master development prompt in this task, plus brand tokens listed there.

Notion MCP is configured but **not authenticated** in this environment, so workspace knowledge could not be pulled.

---

## 4. Existing technologies

**In this repository:** none beyond Git and a one-line README.

**Intended stack (from specification):**

- Website: React 18+, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React (sparingly), Supabase JS, semantic HTML
- App: Flutter, Dart, Material 3, Riverpod, GoRouter, Supabase Flutter
- Data: Supabase (Postgres, Auth, RLS, Storage)

**Environment toolchain observed in this Cloud Agent VM:** Node v22.14.0, npm 10.9.7, Python 3.12.3, Java present. Flutter/Dart SDKs were **not** preinstalled at audit time.

---

## 5. Reusable code

**None.** There are no components, routes, hooks, services, or assets to reuse.

Anything built must be new, modular, and aligned with WonderHug terminology (Garbh Sanskar, journey stages, “Start Your Journey”, etc.) rather than a generic healthcare template.

---

## 6. Technical debt

| Item | Risk |
| --- | --- |
| Empty git history | No prior patterns, no regression baseline. |
| Production PHP site down | Brand/SEO interruption; this rewrite should not repeat secret-in-env or weak DB coupling on the frontend. |
| Unverified marketing claims in public search snippets | Reusing them would violate medical-safety rules. |
| Missing official logo file | Header/lockup must be a **replaceable** brand mark, not a silent redesign treated as final. |
| No verified team, experts, or testimonials | UI must label placeholders; never invent clinicians or reviews. |
| No Supabase project credentials | Website must run with local/fallback content when `CONFIG_REQUIRED`. |

---

## 7. Missing requirements (product gaps)

Must be supplied by WonderHug before treating UI as production content:

- Official logo / brand assets (`WonderHugLife.jpg` or SVG)
- Verified team names, roles, photos, bios
- Verified expert directory (names, qualifications, hospitals)
- Real testimonials (or a decision to omit them)
- User/community scale claims
- App Store / Play Store URLs
- Legal pages copy (Privacy, Terms, medical disclaimer — counsel-reviewed)
- Supabase project URL + anon key
- Analytics destination (GA4, Mixpanel, etc.)
- Clinical review workflow owners
- Language strategy (EN-IN first vs Hindi/regional)

---

## 8. Implementation risks

1. **Medical safety** — Educational copy can be misread as diagnosis. Every content surface needs author/reviewer/last-reviewed fields and a clear education vs treatment distinction.
2. **Placeholder leakage** — Fake experts or testimonials would destroy trust if shipped publicly.
3. **Personalization without data** — Journey selector must be architected for Supabase without pretending it already knows the user.
4. **Scope** — Website + Flutter + CMS + community + experts is a full platform. Phased delivery is required; a single uncontrolled dump will be unmaintainable.
5. **Flutter without SDK in CI** — App structure can be committed; widget tests need Flutter installed in the environment.
6. **SEO thin pages** — Topic-cluster routes must have substantial, honest copy or remain as hubs, not empty programmatic shells.

---

## 9. Recommended architecture (preview)

Full detail lives in [`ARCHITECTURE.md`](./ARCHITECTURE.md). Summary:

- **Monorepo:** Vite React website at `web/`, Flutter app at `mobile/`, Supabase SQL at `supabase/`, docs at `docs/`.
- **UI → hooks/providers → services → Supabase** (with typed local fallbacks).
- **Personalization** isolated in `services/personalization` + `hooks/useJourney`.
- **Analytics** isolated in `services/analytics` (no tracking calls inside visual components).
- **Content** typed models shared conceptually with SQL; seed data clearly marked.
- **Auth:** Supabase Auth when configured; website remains useful logged-out.
- **Never** ship the service-role key to web or mobile clients.

---

## 10. Recommended implementation plan

| Phase | Deliverable |
| --- | --- |
| 0 | This audit |
| 1 | Architecture document (no app rewrite — there is nothing to rewrite) |
| 2 | Design tokens + reusable web primitives |
| 3 | App shell: router, navbar, footer, layout, a11y |
| 4 | Homepage sections (editorial, journey-aware) |
| 5 | Supabase migrations, RLS, TS types, services |
| 6 | Blog listing + article templates |
| 7 | Expert directory + profile (placeholders) |
| 8 | Community architecture + calm group UX |
| 9 | Flutter app skeleton, onboarding, Home |
| 10 | SEO: metadata, schema, sitemap, robots, clusters |
| 11 | Analytics event map + conversion CTAs |
| 12 | Tests, a11y, lint, performance hygiene |

---

## 11. Files intended to create (post-audit)

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) § Directory structure. High-level:

- `docs/ARCHITECTURE.md`
- `web/` Vite + React + TypeScript application
- `supabase/migrations/` schema + RLS
- `mobile/` Flutter application
- `.env.example` files (no secrets)
- README describing how to run website, app, and database

**Files to change:** `README.md` only (expand from one line).

**Files to delete:** none.

---

## 12. What can be preserved

Only the git remote, the project name, and the brand identity described in the specification. There is no working application code in this repository to preserve.
