# WonderHug.Life design tokens

Single source: `web/src/styles/tokens.css`. Tailwind maps the same values in `web/tailwind.config.js`. Do not introduce one-off hex in new components unless extending this file first.

## Colour (semantic)

| Token | CSS | Use |
| --- | --- | --- |
| Primary | `--wh-purple` `#79409B` | Primary buttons, brand emphasis |
| Primary dark | `--wh-purple-dark` `#5C2F78` | Hover, overlays |
| Secondary | `--wh-teal` `#309292` | Secondary actions, WhatsApp-adjacent CTAs |
| Secondary dark | `--wh-teal-dark` `#246E6E` | Teal hover / kicker |
| Accent / navy | `--wh-navy` `#2F4275` | Companion bands, deep type |
| Background | `--wh-bg` `#FBF7F2` | Page paper |
| Surface | `--wh-white` `#FFFFFF` | Cards |
| Surface muted | `--wh-canvas` `#F3EEE8` | Recessed wells |
| Surface elevated | white + `--wh-shadow-lift` | Hover cards |
| Text primary | `--wh-ink` `#1F2937` | Headings, body |
| Text secondary | `--wh-slate` `#5C6570` | Ledes |
| Text muted | `--wh-slate-muted` `#8B939E` | Captions |
| Border | `--wh-line` `#E7E0D8` | Hairlines (warmer than cool grey) |
| Success / info | teal family | Confirmations |
| Warning | use navy + copy, not a new gold unless needed |
| Error | `#B42318` reserved for forms |

## Typography

Families: **Newsreader** (display / H1–H3), **Figtree** (UI, body, buttons).

| Role | Spec |
| --- | --- |
| Display | `clamp(2.5rem, 6vw, 4.6rem)` / 1.06 / -0.03em / medium |
| H1 | Display on heroes; `text-display` utility |
| H2 | 1.875–2.25rem serif medium |
| H3 | 1.5rem serif medium |
| H4 | 1.125rem sans semibold |
| Body large | 1.125rem / 1.7 |
| Body | 1rem / 1.65 |
| Small | 0.875rem |
| Caption / kicker | 0.75rem uppercase, tracking 0.16–0.18em |
| Button | 0.875–1rem medium, no extra weight |

Maximum two families. Avoid adding a third weight beyond medium/semibold.

## Spacing

4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 120.

Section vertical rhythm: `py-16` (64) mobile, `py-20`–`py-24` (80–96) desktop.

## Radii

| Token | Value | Use |
| --- | --- | --- |
| `sm` | 12px | Inputs, small chips |
| `md` | 16px | Cards |
| `lg` | 24px | Feature panels |
| `full` | 9999px | Buttons, avatars |

Prefer `rounded-2xl` / `rounded-3xl` already in Tailwind over a new radius scale.

## Shadows

`--wh-shadow-lift`: `0 18px 50px -28px rgba(47, 66, 117, 0.28)`  
`--wh-shadow-nav`: `0 8px 30px rgba(121, 64, 155, 0.08)`

No stacked drop shadows on every card.

## Motion

| Token | Value |
| --- | --- |
| Duration enter | 500ms |
| Duration route | 280ms |
| Duration hover image | 700ms |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Image hover scale | 1.05 |
| Button hover scale | 1.01 |

`prefers-reduced-motion: reduce` in `tokens.css` collapses animation/transition duration.

## Breakpoints

Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.

Content width: `max-w-page` 72rem, `max-w-editorial` 42rem.

## Component states

| Component | Default | Hover | Focus | Disabled |
| --- | --- | --- | --- | --- |
| Button primary | purple fill | purple-dark, slight lift | 2px teal/purple ring offset 2 | 50% opacity, no pointer |
| Button secondary | white + line | warmer border | navy ring | same |
| Nav link | slate | canvas chip | ring | — |
| Card | white + line | translate -2px + lift | ring on focusable child | — |
| Input | white + line | — | teal ring | — |
