# WonderHug.Life — UI/UX audit and redesign direction

Audit of the Next.js site in `web/` (App Router). The Flutter app is out of scope except where the web promotes it. English-only chrome (no language switcher). Photography is tagged `placeholder-ai-` until official assets exist.

## A. Architecture summary (keep)

| Layer | What exists | Verdict |
| --- | --- | --- |
| Routes | App Router pages in `web/src/app/*` wrapping view components | Keep. Do not flatten or rename paths. |
| Views | Feature pages in `web/src/views/*` | Keep. Restyle in place. |
| Home | Composed sections in `web/src/sections/home/*` | Keep composition; upgrade layout and motion. |
| Data | Local catalogues + optional Supabase CMS (`mediaAssets`, blog merge) | Keep. Do not invent experts, quotes, or store URLs. |
| State | Journey, cart, auth, toasts, LMS enrolment | Keep. Visual work must not break hydration. |
| Motion | Framer Motion `Reveal`, page fade in `SiteChrome`, `prefers-reduced-motion` in tokens | Keep library; restrain and reuse. |
| Tokens | Purple / teal / navy in `tokens.css` + Tailwind | Keep brand hues; complete the semantic scale. |
| Type | Newsreader (serif) + Figtree (sans) | Keep two-family system. |

**Do not rewrite:** checkout, LMS player gating, CMS admin, cart localStorage, SEO/JSON-LD, WhatsApp dock, medical disclaimer.

---

## B. Scores (1 = poor, 10 = excellent)

| Area | Score | Note |
| --- | --- | --- |
| Visual design | 5 | Brand colours are distinctive; many pages still read as stacked cards. |
| UX | 6 | Journey → shop → checkout works; subpages lack a shared entry pattern. |
| Branding | 6 | Logo and purple/teal are present; paper vs cool grey canvas fights itself. |
| Typography | 6 | Serif display is strong; body/caption scale is under-specified. |
| Layout | 5 | Homepage is a long list of similar rounded-3xl blocks. |
| Navigation | 6 | Clear labels; Journey dropdown is a plain text list. |
| Content hierarchy | 5 | Kickers repeat; hubs are text-only after a faint header image. |
| Mobile | 6 | Drawer exists; mega-nav and week grids need more intentional stacking. |
| Accessibility | 7 | Skip link, focus rings, 44px targets, reduced-motion global kill-switch. |
| Motion | 4 | Reveal + hover-scale on every button; little page-specific choreography. |
| Performance | 5 | Uncompressed ~2MB PNG placeholders; Next/Image used but unoptimized files. |
| Conversion | 5 | CTAs exist; shop/start/download pages do not feel like the same product as the hero. |

---

## C. Current problems

### Visual
- Repeated `rounded-3xl` + `border-line` + `shadow-lift` on almost every card.
- Homepage rhythm is “section, same card, section” — no editorial contrast (full-bleed vs quiet vs split).
- Subpages often start with a heading on white; shop/community got photo headers, journal/about/start/weeks did not.
- Cool `#FBFCFA` body vs warm `#FBF7F2` hero overlay looks like two products.

### UX
- Journey mega-menu is a long list without images or grouping (stages vs library).
- Hub related links are underline lists, not destinations.
- Week index is a dense grid of borders.
- Start page is form-like without the photography used on the homepage selector.
- Stories section correctly refuses fake testimonials, then looks empty.

### Hierarchy
- Too many uppercase kickers at the same weight.
- H1 on subpages is often the same size as homepage H2.

### Mobile
- Desktop hover dropdowns do not exist in the drawer (drawer is flatter — good — but Journey stages are incomplete vs desktop).
- Image headers with `opacity-30` wash out on small screens.

### Accessibility
- Some product images use empty `alt` (`ProductPage`).
- Global reduced-motion sets duration to `0.01ms` on all transitions (good) but hover `scale` on buttons still implies motion for users who can see it.

### Performance
- Placeholder PNGs are 1.9–2.6MB. Motion must stay CSS/transform-only; do not add new animation libraries.

### Conversion
- Final CTA (“Begin where you are”) is strong; download and start pages undercut it with empty states and no image.

### Inconsistent components
- Headers: `Page` title in Container vs `relative overflow-hidden` photo band vs full-bleed hero.
- Buttons: four variants, plus one-off white-on-purple classes.
- No shared `PageHero` / `SectionHeader`.

### Missing patterns
- Emotional journey chapters (Expecting → Parenting).
- Image hover crop (Ken Burns–lite).
- Shared page transition already exists; section parallax should stay subtle.
- Editorial related-content cards on hubs, journal, weeks.

---

## D. Proposed design direction

**Name:** Warm editorial companion.

Not a clinic template, not a SaaS dashboard. Paper-warm canvas, plum and teal as accents, photography as the primary story, type as the second.

**Feel:** “This platform understands pregnancy and parenting emotionally, practically, and intelligently.”

**Art direction**
- Full-bleed or split photography at the top of every public page.
- Asymmetric grids (7/5, 8/4) instead of identical three-up cards on every screen.
- Quiet interiors: cream paper, hairline borders, serif headlines.
- Motion: opacity + translate + image scale only; `prefers-reduced-motion` respected.

**Honesty constraints (unchanged)**
- No invented doctor portraits, testimonials, or store URLs.
- Faculty seats stay labelled placeholders.
- Medical copy stays educational.

---

## E. Homepage section strategy

1. **Hero** — Benefit-led H1, two CTAs, photography with readable overlay, TG · AP proof.
2. **Chapters** — Expecting / Preparing / Growing / Learning / Connecting / Parenting (visual storytelling, not icon tiles).
3. **Journey selector** — Keep behaviour; photo cards + quieter chrome.
4. **Companion** — Personalised stage (existing `PersonalizedExperience`).
5. **Programmes + ecosystem** — Covers already imaged; add section header system.
6. **Tools** — Image rows (existing).
7. **Experts** — Faculty seats, editorial, not a directory dump.
8. **Community** — Split photo + WhatsApp (existing).
9. **Evidence** — Add still photography; keep the two-knowledge split.
10. **Journal** — Featured editorial (existing).
11. **App** — “Take WonderHug with you” (existing copy, stronger crop).
12. **Final CTA** — Keep honest body; cinematic still.
13. **Medical note** — Keep.

---

## F. Component architecture

Reuse; do not fork per page.

| Component | Role |
| --- | --- |
| `PageHero` | Subpage cinematic header (image, kicker, H1, lede, optional actions). |
| `SectionHeader` | Kicker + H2 + lede + optional link. |
| `HoverMedia` | Overflow crop + hover scale. |
| `Reveal` | In-view entrance (existing). |
| `Button` / `ButtonLink` | primary, secondary, ghost, teal (existing). |
| `Container` | page / editorial widths (existing). |
| Navbar, Footer, Toast, Tabs, Input | Restyle, do not replace APIs. |

---

## G. Motion strategy

| Moment | Motion |
| --- | --- |
| Route change | Existing 280ms opacity/translate; keep. |
| Section enter | Reveal 500ms, once, `amount: 0.18`. |
| Images | Hover scale 1.05 over 700ms; disabled if reduced motion. |
| Hero | Existing light parallax; no extra libraries. |
| Nav drawer | Existing AnimatePresence. |
| CTAs | Shadow/colour, not bounce. |

Priority: **UX > performance > accessibility > effects**.

---

## H. Responsive strategy

- 360–430: single column; PageHero min-height ~36vh; 16px body; 44px targets.
- 768: two-column chapters and shop.
- 1024+: 12-column editorial, Journey dropdown with images.
- Never rely on hover-only for primary actions (drawer already covers mobile).

---

## I. Implementation plan (this pass)

1. Tokens + Tailwind semantic scale + warm canvas.
2. `PageHero`, `SectionHeader`, `HoverMedia`, shared journey art.
3. Navbar dropdown + homepage chapters + section headers.
4. Apply `PageHero` to public subpages (shop, programmes, journal, tools, experts, community, hubs, practices, weeks, about, start, download, cart).
5. Motion + reduced-motion QA.
6. Typecheck, unit tests, Playwright.

Out of this pass: compressing 2MB PNGs (needs a later image pipeline), Flutter, CMS schema.

---

## J. KEEP / IMPROVE / REPLACE / MISSING

**KEEP** — Routes, data, cart, LMS, CMS, i18n lock to English, WhatsApp, disclaimers, fonts, brand hues, Framer Motion.

**IMPROVE** — Homepage rhythm, nav dropdown, subpage headers, related links, week index, start/about/download, evidence/stories layouts.

**REPLACE** — Ad-hoc page headers with `PageHero`; cool grey canvas with warm paper token.

**MISSING** — Journey chapters strip; documented tokens; hover media; consistent subpage cinema.
