# Redesign handoff: `redesign/apple`

State of the Apple-style redesign of this Next.js 16 portfolio, for anyone (human or agent) picking up the work. Everything below is on branch `redesign/apple`, **uncommitted** (no commits have been made on the branch yet). Read `AGENTS.md` first: Next 16 has breaking changes; check `node_modules/next/dist/docs/` before relying on remembered APIs.

## 1. The brief (what was asked)

- Full visual redesign: keep every piece of content, replace all presentation.
- `data/` and `types/portfolio.ts` are the content layer. Strings in `data/` must not change; type shapes may.
- Apple design language for the web (`apple-design` skill): light mode plus `prefers-color-scheme` dark mode, large tight headlines, depth through translucent layers and soft shadows (no borders), Inter with optical tracking (no SF Pro), and one accent used only for interactive states. Product-page feel, with large project screenshots.
- Real App Router routes `/`, `/work`, `/experience`, `/contact`; delete `PortfolioSPA.tsx` and `WipePanel.tsx`; View Transitions through Next's native support; a shared-element transition on the project title between `/work` and a future project detail page; working back button, deep links, and per-route metadata; keep the OG/favicon assets.
- Motion, run as skills in order: `find-animation-opportunities`, then `animate` (curves per `emil-design-eng`), then one first-load hero moment (the only non-user-triggered animation), then `review-animations` and `animation-performance`. Transform and opacity only, 60fps on a mid-range phone, and every animation gets a reduced-motion **variant**, not just a disabled one.
- Quality floor: a `mobile-native` pass, a `break-ui` pass against `data/`, visible keyboard focus everywhere, and Lighthouse mobile performance and accessibility both above 95.
- User follow-ups:
  - "Don't remove animation, so it can run on higher-end devices." Animations stay; perf work must not strip them.
  - The user supplied four screenshots: FLINKI, Daily Arc, RAG Maneho AI, BrighterMind.
  - Decisions were delegated: "proceed with your recommendation".

## 2. Status

| Phase | Status |
| --- | --- |
| 1. Tokens, type, layout | Done |
| 2. Routing + transitions | Done |
| 3. Animation pass | Done, except `review-animations`, which is user-invocable only (must be run as `/review-animations` by the user) |
| 4. Quality passes | Done; Lighthouse is borderline (see §9) |

Checks at hand-off:
- Build, `tsc --noEmit`, and `eslint .` are clean.
- Production `next build` (Next 16.2.6 as currently resolved) lists `/`, `/work`, `/experience`, `/contact`, and `/_not-found` as static; the contact form posts to a server action. `/dev/break-ui` is also static, because it hits `notFound()` and renders as a 404 in production.

## 3. Content-layer rules and what changed in `data/`

**During the redesign phases, no user-visible string in `data/` changed;** the edits below were presentation only. A later, user-approved content update rewrote the CV content and is recorded separately in §3a.

- `data/experience.tsx`: the `H`/`A` highlight span classes now use tokens (`font-medium text-label`, `font-semibold text-label tabular-nums`). The accent is no longer used on non-interactive text.
- `data/education.tsx`: comment updated (`ExperienceRow` became `ExperienceCard`); `noBorderBottom` removed.
- `data/projects.ts`: `noBorderBottom` removed. An `image` field was added to four projects (new alt text written for each).
- `data/skills.ts`: now names only (see §3c); all logo fields were removed.

New content files:

- `data/site.ts`: copy that used to be hard-coded in components (wording kept; casing normalized), plus `routeMeta` (per-route title and description), `notFoundPage`, `SHARE_IMAGE_ALT` (must mirror `app/*-image.alt.txt`), and the `a11y` strings.
- `data/fixtures/worst-case.tsx`: break-ui fixtures, used only by `/dev/break-ui`.

`types/portfolio.ts`:
- Removed `WipePhase`, `noBorderBottom`, and `iconFilter`.
- Added the `ProjectImage` type and `Project.image?`. `SkillItem` is now just `{ name: string }` (§3c).

Casing decisions:
- Project titles stay uppercase; they read as wordmarks, and the user confirmed keeping the caps convention.
- Nav labels are stored uppercase (`HOME`…) and rendered in sentence case via CSS (`lowercase first-letter:uppercase`).
- The old "01 -" eyebrow prefixes and the blinking cursor were treated as decoration and dropped.

## 3a. Content update (user-approved, applied after the redesign)

The user supplied a CV-based content plan and approved text changes in `data/`. Applied:

- **Experience** (`data/experience.tsx`): new bullets for all three roles. Each bullet opens with a bold lead label (new `L` component, `font-semibold text-label`); technology names use `H`, figures (128, 30%) use `A`. Inner SPARC role renamed to "Software Developer Support" (id `inner-sparc-software-developer-support`); company is "Inner SPARC Realty Corporation" on both entries. Intern has two unlabeled bullets; award badge "Most Outstanding Intern".
- **Education** (`data/education.tsx`): "Bachelor of Science in Information Technology", "Cavite State University, Bacoor", 2021 to 2025, with two "(Cisco Networking Academy)" certification bullets; new entry "AI Enablement & Jr. Software Engineer Bootcamp", Hytel Pte Ltd, Feb 2026, no bullets. Ordered most recent first.
- **Skills** (`data/skills.ts`): seven categories (Programming Languages; Frameworks & Environments; Backend & Data; Cloud & Platforms; AI & Integrations; APIs & Services; Tools), 38 skills, names only (§3c).
- **Projects** (`data/projects.ts`): titles FLINKI, MANEHO AI, COMMISSION MONITORING SYSTEM, LEAD MANAGEMENT SYSTEM, BRIGHTERMIND, DAILYARC; anchors follow the titles (`maneho-ai`, `dailyarc`); screenshots renamed to match (`public/projects/maneho-ai.png`, `dailyarc.png`). New taglines, descriptions, and tags. **BrighterMind and DailyArc tags are still the old ones, pending the user's stack list** (marked `TODO(content)` in the file).
- **Contact** (`data/contact.ts`): GitHub value `chaboiyenz`, LinkedIn value `yenzo-teo-gervacio` (links unchanged). The Email row was removed because email now goes through the contact form (§6a). A Location row was added and then dropped at the user's request; `ContactLink.href` is required again and the pin icon is gone.
- **Site copy** (`data/site.ts`, `lib/metadata.ts`, footer): hero eyebrow "Jr. Software Engineer at Hytel"; new hero summary; SITE_DESCRIPTION names "TypeScript, React, Node, and GCP"; eyebrow "Selected Projects"; new `routeMeta` descriptions for /work and /experience; footer "© {year} Yenzo Gervacio | Jr. Software Engineer".

## 3c. Technical Stack redesign

The home page's stack section was rebuilt as a single flat list (`components/home/TechStack.tsx`). One row per category; on desktop the label (category icon plus name, `text-secondary`, one line) sits in a 232px column with the skills to its right as wrapping pills. On phones the label sits above its pills. Rows are separated by hairlines (new token `--color-hairline`: rgba(0,0,0,0.08) light, rgba(255,255,255,0.1) dark), not cards. Pills: `bg-surface`, `rounded-full`, 13px (`text-footnote`), no border, no hover motion.

- **Removed:** all brand logos (`public/skills/`, 15 SVGs), the logo fallback (`SkillLogoFallbacks.tsx`), the custom Gemini, Hugging Face, and RAG icon components (`components/icons/`), and the `iconSrc`, `invertInDark`, and `customIcon` fields. `SkillItem` is `{ name: string }`.
- **Category icons:** `lucide-react` pinned at 1.61.0 (published 2026-10-21), 18px, `text-secondary`, rendered on the server (no client JS): Programming Languages `Code2`, Frameworks & Environments `Layers`, Backend & Data `Database`, Cloud & Platforms `Cloud`, AI & Integrations `Sparkles`, APIs & Services `Plug`, Tools `Wrench`. The map is keyed by category title in `TechStack.tsx` so `data/skills.ts` stays text-only; an unknown title renders without an icon, keeping its alignment.
- **Height:** section box went from 1556px to 416px at 1440 wide, and from 2666px to 818px at 390 wide. No entrance animation (none existed before).
- **Lighthouse (home, one mobile run, local):** performance 97, accessibility 100, LCP 2.50s, TBT 71ms, 0 image requests (was 15).

## 3b. Dash rule

No em dashes anywhere in the project (data, lib, components, docs, README, AGENTS.md, alt-text files, page titles). Where a dash separated two things, use a spaced hyphen or rewrite the sentence. **Browser tab titles use a pipe:** "Projects | Yenzo Gervacio", home "Yenzo Gervacio | Jr. Software Engineer" (`SITE_TITLE`, the title template, and the share titles in `lib/metadata.ts`). Date ranges keep the en dash ("Mar 2026 – Present", joined in `ExperienceCard`). Verify with a repo grep for the em dash character excluding `node_modules`, `.next`, `.git`, and the vendored, git-ignored skill copies in `.agents/` and `.claude/` (third-party files pinned by hash in `skills-lock.json`; they contain em dashes and are deliberately left alone).

## 4. Design system (`app/globals.css`)

Tailwind v4, CSS-first. In `@theme`, `--color-*`, `--text-*`, and `--shadow-*` are reset to `initial`, so only these tokens exist. Dark mode redefines the same custom properties under `@media (prefers-color-scheme: dark)`, so components rarely need `dark:`.

- **Surfaces:**
  - Light: `canvas #f5f5f7`, `surface #fff`, `raised #fbfbfd`.
  - Dark: `canvas #000`, `surface #1c1c1e`, `raised #2c2c2e`.
  - `fill` and `fill-strong` are translucent chip and icon-well fills.
- **Labels:** `label #1d1d1f` / `#f5f5f7`; `secondary #6e6e73` / `#a1a1a6` (AA on the canvas); `tertiary` is decorative only.
- **Accent (Apple system blue), interactive only:**
  - `accent #0071e3` (fills; white text 4.7:1).
  - `accent-hover #0062c4`. Deliberately darker than Apple's lighter hover, so white text stays at or above 4.5:1.
  - `accent-ink #0066cc` / dark `#2997ff`, for links and focus rings.
- **Type:** Inter via `next/font/google` with `axes: ['opsz']` (variable, Latin, `display: swap`, preloaded), exposed as `--font-inter` and `--font-sans`. The scale has 11 steps (`hero`, `display`, `title-1..3`, `intro`, `body`, `callout`, `footnote`, `caption`), each with its own line-height, letter-spacing (tight at display sizes, near zero for body), and weight. Uppercase project titles override the tracking to `-0.012em`.
- **Depth:** `shadow-chip`, `shadow-card`, `shadow-float`. In dark mode, shadows become an inset top highlight plus a deep shadow.
- **Radii:** `rounded-card` 1.75rem, `rounded-tile` 1.375rem, `rounded-media` 1rem.
- **Layout:** `--spacing-gutter` is `clamp(1.25rem, …, 2.5rem)`, `--spacing-nav` is 3rem, `--container-content` is 71.25rem.
- **Material:** the `.material-bar` class is a translucent canvas with `backdrop-filter: saturate(180%) blur(20px)`. It falls back to solid under `prefers-reduced-transparency` and to solid plus a hairline under `prefers-contrast: more`.
- **Focus:** a global `:focus-visible` gives a 2px `accent-ink` outline with a 3px offset.
- **Mobile base:**
  - `-webkit-tap-highlight-color: transparent`, and `touch-action: manipulation` on `a`, `button`, and `[role=button]`.
  - `user-select: none` on controls only (`button`, `nav a`, `.press`), never on content links.
  - Inputs are `font-size: max(16px, 1em)`.
  - `text-size-adjust: 100%`.
  - Pull-to-refresh is deliberately left on: this is a document, not an app shell.

## 5. Architecture and file map

```
app/
  layout.tsx         Inter font; metadata = rootMetadata; viewport (viewportFit cover,
                     interactiveWidget resizes-content, colorScheme, themeColor per scheme);
                     skip link → #main; SiteHeader, <main>, SiteFooter, FirstLoadMarker
  page.tsx           Home: Hero + TechStack in PageTransition; metadata = homeMetadata()
  work/page.tsx      PageHeader + ProjectList; build fails on duplicate project slugs
  experience/page.tsx ExperienceCards (h2) + Education section (h3 cards)
  contact/page.tsx   form card ("Send a message") + "Elsewhere" column of ContactTiles
  contact/actions.ts server action: honeypot, validation, rate limit, send (§6a)
  not-found.tsx      404 in the same design (Next adds noindex itself)
  dev/break-ui/page.tsx  DEV ONLY: real components with ?data=demo|worst|one|empty
  globals.css        tokens, base, motion, view-transition CSS
components/
  site/SiteHeader.tsx   client: translucent sticky bar (view-transition-name: site-header),
                        nav with aria-current, CTA, mobile menu (fixed sibling panel)
  site/SiteFooter.tsx   © year (build time) | name | role
  ui/  Container, PageHeader, actions (PrimaryAction pill, TextAction link + chevron), icons
  home/Hero.tsx         intro-animated hero (server component)
  home/TechStack.tsx    flat category rows with lucide icons and skill pills; categories prop
  work/ProjectList.tsx  layout rule: index 0 → 'feature', then alternating 'end'/'start'
  work/ProjectCard.tsx  feature (title full width; tagline | description; media below)
                        or row (text + media, media side alternates on lg);
                        stretched-link card for external href; card-level focus ring
  work/ProjectMedia.tsx placeholder (16/9 or 16/10) | landscape image at its own ratio |
                        tall image (h/w > 0.8) contained on a 16/10 neutral stage
  experience/ExperienceCard.tsx  headingLevel prop; badge; bullets only when non-empty
  contact/ContactForm.tsx  client: useActionState form (email + message), field errors,
                           focus management, live status/alert regions, honeypot
  contact/ContactTile.tsx  kind inferred from href (email/phone/github/linkedin/link);
                           wbr after "@" for emails; external → arrow + sr-only text
  motion/PageTransition.tsx    <ViewTransition enter="page-enter" exit="page-exit" default="none">
  motion/SharedProjectTitle.tsx <ViewTransition name="project-title-<slug>" share="project-title-morph" default="none">
  motion/FirstLoadMarker.tsx   sets html[data-intro-done] 1100ms after mount
lib/
  metadata.ts     rootMetadata, homeMetadata(), routeMetadata({title,description,path})
  routes.ts       hrefFor(PageId), isActivePath, slugify, displayHost
  contact/        schema.ts (types, limits, validation), rate-limit.ts, send.ts (Resend)
public/projects/  flinki.png 1909×911, maneho-ai.png 1919×913,
                  brightermind.png 1745×771, dailyarc.png 1898×907
```

Deleted: `PortfolioSPA.tsx`, `WipePanel.tsx`, `MobileMenu.tsx`, `Navbar.tsx`, `ProjectRow.tsx`, `ExperienceRow.tsx`, the old `TechStack.tsx`, and `components/pages/*`. `framer-motion` was removed from `package.json` and `package-lock.json` (it was unused). Local `node_modules` is a pnpm install and was not touched.

`.gitignore` now ignores `/.agents/` and `/.claude/` (vendored skill copies); `skills-lock.json` is left for the user to commit.

## 6. Routing, metadata, transitions

- **Metadata:**
  - The root sets only `metadataBase`, the title template (`%s - Yenzo Gervacio`), and the description. There is deliberately **no** root canonical, og:url, or share title, so a route that forgets its own can't impersonate the homepage.
  - Each route calls `homeMetadata()` or `routeMetadata()`, which set the canonical, the full openGraph and twitter objects, and explicit images: `/opengraph-image.png`, `/twitter-image.png`, 1200×630, alt from `SHARE_IMAGE_ALT`. The images must be explicit because a child's openGraph object replaces the parent's, file-based images included.
- **Page transitions:** a wrapper in each `page.tsx` (not the layout, which persists).
  - The old page fades out (140ms, `--ease-out`); the new page rises 8px and fades in (240ms, 60ms delay).
  - The header is anchored (its group animation is none). The root is not animated, and the old root is hidden (`display: none`), so the footer never ghosts.
  - `::view-transition { pointer-events: none }`.
- **Shared title:** `SharedProjectTitle` wraps each `/work` card's `<h2>`, and a future `/work/[slug]` must wrap its title (an `<h1>`) with the same slug.
  - The morph uses the browser's default `::view-transition-group` animation: 300ms, `--ease-in-out`.
  - Tested with a temporary detail route (since deleted): it morphs forward when the title is in the viewport. React skips names for off-screen elements, so an off-screen title just crossfades.
  - **Browser back and forward do not run a view transition at all;** Next applies history navigations instantly. This was kept on purpose, because iOS swipe-back would double-animate. Scroll restoration works.
- **Future detail page checklist:**
  - `generateStaticParams`, so pages prefetch and render in the navigation's commit (no pair forms if the destination suspends).
  - Exactly one `SharedProjectTitle` per page, wrapping a block element.
  - `routeMetadata({ path: '/work/' + slug, … })`.
  - Link the cards to it.

## 6a. Contact form (/contact)

Added after the redesign by a separate session; reviewed and reconciled here.

- **Flow:** `ContactForm` (client) posts to the `sendContactMessage` server action (`app/contact/actions.ts`) via `useActionState`. Fields: email and message only. On error the action echoes the values back so nothing typed is lost.
- **Validation** (`lib/contact/schema.ts`): email matches a strict single-address pattern (it becomes `reply_to` and goes into the subject, so commas, angle brackets, quotes, and control characters are rejected), max 254 chars; message 10 to 5,000 chars after CRLF normalization. The same limits drive the inputs' `minLength`/`maxLength`, so native validation catches most errors before a round trip.
- **Abuse protection:** a honeypot field (`contact_hp`, off-screen, out of the tab order and accessibility tree) reports success to bots and sends nothing. `lib/contact/rate-limit.ts` allows 5 messages per client per 10 minutes, with a global ceiling of 30 per hour and at most 1,000 tracked keys. **It is in memory and per server instance:** on serverless each cold instance starts empty, so move it to a shared store (e.g. Upstash) if abuse appears. The client key comes from `x-real-ip`, falling back to the first `x-forwarded-for` hop.
- **Sending** (`lib/contact/send.ts`, `server-only`): plain-text email through Resend's REST API (`fetch`, 10s timeout, no SDK dependency); `reply_to` is the visitor; the body ends "From: <email>". Errors are logged server-side and shown to the visitor as a generic "couldn't be sent" message.
- **Configuration:** `.env.example` lists `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` (defaults to Resend's `onboarding@resend.dev`). Copy it to `.env.local`, which is git-ignored (`.env*` with a `!.env.example` exception). Without the keys the action returns the send-failed message. For production, set the same variables in the host (Vercel project settings) and verify a sending domain with Resend.
- **Accessibility:** labeled controls, errors linked via `aria-describedby` and `aria-invalid`; after a failed submit focus moves to the first invalid field (or back to the button for form-level errors); always-mounted `role="status"` and `role="alert"` regions announce results. Inputs use `text-body` (17px), above the iOS 16px zoom threshold. New token `--color-danger` (#d70015 light, 5.4:1 on surface; #ff6961 dark).
- **Copy:** `contactPage.formTitle`, `formIntro`, `elsewhereTitle`, and the whole `contactForm` object live in `data/site.ts`; `routeMeta.contact.description` now reads "Send Yenzo Gervacio a message, or reach out by phone, GitHub, or LinkedIn."
- **Verified (production build):** native validation blocks an empty submit; invalid input returns both field errors with focus on the first; values persist; the honeypot shows success; no page errors; 77 focus stops site-wide all show a ring. **Not verified:** a real successful send. It needs live Resend keys and would deliver a real email, so it was deliberately not run.

## 7. Motion inventory (all in `app/globals.css`)

| Motion | Trigger | Spec | Reduced-motion variant |
| --- | --- | --- | --- |
| Hero intro (`.intro`, `--intro-step` 0–3) | First document load only | `intro-rise`: translateY(16px) and opacity, 700ms `--ease-out`, 70ms stagger. The name and summary start at opacity 0.35 (`--intro-from`) so they're readable from first paint; the eyebrow and CTAs start at 0. | `intro-fade` (opacity only), 400ms |
| Intro gating | `html:not([data-intro-done]) .intro` | `FirstLoadMarker` sets the attribute after 1100ms, so client navigation back to `/` doesn't replay it | Same |
| Route transition | Client navigation | See §6 | New page fades without the rise |
| Shared title morph | `/work` → detail | 300ms `--ease-in-out` (default UA morph; it also animates group width and height) | Group 0s; old/new crossfade 120ms |
| Press (`.press`) | `:active` | `scale` 0.97, 160ms `--ease-out` (pills, text links, nav CTA, menu button) | Opacity 0.7 |
| Press (`.press-tile`) | `:active` | `scale` 0.98 (contact tiles) | Opacity 0.7 |
| Press (`.press-card`) | `:has(a:active)` | `scale` 0.985 (project cards) | Opacity 0.85 |
| Mobile menu (`.menu-panel[data-open]`) | Tap | opacity and `translate` -8px; enter 220ms, exit 160ms; display uses allow-discrete with `@starting-style` | Fade only |
| Menu icon (`.menu-bar`) | Tap | Two bars rotate ±45° into an X; 220ms `--ease-in-out` | 120ms |

The tokens are `--ease-out: cubic-bezier(0.23,1,0.32,1)` and `--ease-in-out: cubic-bezier(0.77,0,0.175,1)` (from emil-design-eng), plus per-motion duration variables in `:root`. Hover color changes are instant: animating color would break the transform-and-opacity-only rule. There are no scroll-triggered entrances and no hover lifts, both per the brief.

Mobile menu behavior:
- The panel is a fixed sibling of the header, not a child, because nested `backdrop-filter`s only blur within their parent.
- It closes on route change, link tap, outside pointerdown, or Escape (focus returns to the toggle).
- The closed panel is `display: none`, which removes it from the tab order and the accessibility tree.

## 8. Quality passes: findings and fixes

**find-animation-opportunities.**
- Accepted: the hero intro, press feedback, card press, the menu panel, and the menu icon. Route transitions were kept.
- Rejected:
  - Scroll entrances and hover lifts (the brief rules them out).
  - Hover color transitions (paint properties, not transform/opacity).
  - Image fade-in (never visible; would need client JS).
  - Focus and skip-link motion (keyboard-initiated).

**animation-performance.** No layout properties are animated, there's no `transition: all`, no per-frame React state, and no animated CSS variables. Frame sampling at 4× CPU throttle on a 390px viewport:
- **Card press:** a steady 16.7ms per frame.
- **Menu open:** one 83ms frame at the tap (React commit plus the first blur paint), then smooth.
- **Route change:** one 201ms frame during the navigation render and snapshot capture, then smooth.

Two items need a recording on a real mid-range phone:
- The title morph, the only exception to transform-and-opacity, because the UA animation resizes the group.
- The menu panel's opacity over a 20px backdrop blur.

No `will-change` was added; no shift was observed.

**mobile-native:**
- `viewportFit: 'cover'`, `interactiveWidget: 'resizes-content'`, `colorScheme`, and themeColor per scheme.
- The tap highlight, `touch-action`, `user-select` on controls, and the 16px input floor.
- Hover is already gated, since Tailwind v4's `hover:` uses `@media (hover: hover)`.
- No `vh` units are used.
- Safe-area padding on the header, gutters, footer, and menu panel.

**break-ui.** The `/dev/break-ui` route has demo, worst, one, and empty states, checked at 1440px, 390px, 320px, at 390px with root font-size at 200%, and in dark mode.

| Fixed | Change |
| --- | --- |
| Experience bullet with a URL overflowed the page (+86px at 390, +154px at 320) | `wrap-anywhere`; card uses `grid-cols-[minmax(0,1fr)]` on mobile |
| Long feature title broke mid-word in a narrow column | Feature title now spans the full card width |
| Portrait screenshot made the card about 900px tall | Tall images contained on a 16:10 stage |
| Dead logo URL showed a broken-image glyph | Fixed at the time with a fallback; logos were later removed entirely (§3c) |
| 7 categories left a hole in the bento | Fixed at the time; the bento was later replaced by flat rows (§3c) |
| Unknown contact kind had no icon (misaligned) | Generic `LinkGlyph` |
| Long email at 320px | Value is `text-body` on mobile and `sm:text-title-3` up; label also `wrap-anywhere` |
| Long award formed a three-line pill | `rounded-lg`, `text-balance` badge |
| Empty bullets or tags left extra gaps | Render the list only when it's non-empty |

What held up:
- Long tagline and description.
- Twelve tags.
- Long hosts.
- Diacritics and literal `<>&` in titles.
- Empty and single-item datasets.

Open decision: a 30-character compound in a half-width title column still breaks mid-word (wrapping beats overflowing; the alternative is a smaller title or hyphenation).

**Keyboard focus.** A tab-through test covered 73 stops across all routes, on desktop and mobile with the menu open; every one has a visible 2px ring in the viewport. Project cards ring the whole card when their stretched link is focused.

**Accessibility.**
- Heading outlines are unbroken on every route.
- Skip link, `aria-current`, `aria-expanded`/`aria-controls` on the menu, "opens in a new tab" sr-only text, and alt text on every screenshot.
- Lighthouse accessibility is 100 on all routes.

## 9. Lighthouse (mobile preset), honest numbers

Measured as the median of 5 runs against `next start` on the dev machine, while the user's `next dev` and editor were running. CPU contention makes this noisy (single runs from 82 to 98).

| Route | Final perf median (5 runs) | Earlier baseline median | A11y | LCP | CLS |
| --- | --- | --- | --- | --- | --- |
| `/` | **96** | 91 → 93 → 95 → 96 as fixes landed | 100 | ~2.6s | 0 |
| `/work` | **95** | 96 | 100 | ~2.6s | 0 |
| `/experience` | **95** | 97 | 100 | ~2.4s | 0 |
| `/contact` | **95** | 96 | 100 | ~2.5s | 0 |

The other routes' code didn't change between the baseline and final runs; the drop matches higher machine noise (TBT 145–200ms against 114ms before). **Re-measure with PageSpeed Insights on a Vercel preview before treating ">95" as met or missed.**

What moved home from 91 to 96:
1. **Hero text visible from first paint.** The intro opacity animation runs on the compositor, and Chrome doesn't record LCP for an opacity-0 element until a main-thread paint; here that was the `data-intro-done` restyle at about 1.6s. Starting the name and summary at a genuinely visible opacity of 0.35 made the observed LCP equal FCP, about 0.39s. A near-zero starting opacity was rejected as metric-gaming.
2. **One hydration unit instead of 15:** a single section-level fallback component replaced 15 per-logo client components.
3. **Self-hosted, pinned devicons:** the jsdelivr origin left the load path; TBT went from 173 to about 114–137ms. (Logos were later removed entirely; see §3c for the current numbers.)

Tried and reverted:
- `preload: false` on the font made FCP 1.2s and CLS 0.049.
- `experimental.inlineCss` made no improvement and added noise.
- Disabling the intro was only measured, to quantify it at about 30ms TBT; it stays, per the user.

The remaining shared cost on every route is the Inter variable font (73KB, because of the opsz axis) and about 145KB of framework JS. The cheapest further lever is dropping the `opsz` axis, which saves about 25KB but loses Inter's Display cut at large sizes. That's a design trade-off **not** taken without the user.

## 10. Gotchas discovered

- **The Windows animation setting leaks into headless Chrome.** On this machine "Animation effects" appears to be off, so Puppeteer and Lighthouse default to `prefers-reduced-motion: reduce`. Every Lighthouse run measured the reduced-motion intro. Emulate `no-preference` explicitly when testing motion.
- **Image optimizer stall (local only, once).** The first cold mobile run left one `/_next/image` request for `brightermind.png` at w=828 (WebP) hanging. Later identical requests queued behind it until a server restart; it couldn't be reproduced, and sharp encodes the file in 66ms. Not seen on any later run.
- **`TaskStop` on a background `npx next start` can orphan the node child.** Launch with `exec node node_modules/next/dist/bin/next start -p 3100` so stopping the task kills the server.
- **Git Bash rewrites `/work`-style arguments into Windows paths.** Prefix with `MSYS_NO_PATHCONV=1`, and give Node Windows-style paths (`cygpath -m`).
- **Deleting a route leaves stale `.next/types` references** that break `tsc` until the next `next build`.
- **Unicode escapes in tool input get decoded.** A backslash-u escape (such as the one for U+0300) written through the file tools lands as the literal character. Generate escapes from a script, building the backslash with `String.fromCharCode(92)`, and check the bytes with `od -c`. `lib/routes.ts` (slugify) was affected and is fixed.
- **Git index:** an inventory command ran `git add -N .` followed by `git reset`, so the earlier staged deletions (from `git rm`) are now unstaged. The working tree is identical; nothing was lost or committed.

## 11. Remaining for the user

1. Run `/review-animations` (user-invocable only; it was not run).
2. Check on a real phone: press feel, the menu blur, the title morph, safe areas, and iOS `:active`. Emulation can't confirm these.
3. Measure with PageSpeed Insights on a deployed preview.
4. Supply screenshots for COMMISSION MONITORING SYSTEM and LEAD MANAGEMENT SYSTEM. Add `image: { src, alt, width, height }` to their entries in `data/projects.ts` and drop the files in `public/projects/`.
5. Supply the BrighterMind and DailyArc stack tags (`data/projects.ts`, `TODO(content)`).
6. Contact form: put the Resend variables in `.env.local` and in the host, verify a sending domain, and send one real test message. Consider a shared rate-limit store before launch on serverless.
7. Re-run Lighthouse: the §9 numbers predate the content update and the contact form.
8. Decide whether to keep the `opsz` axis (design quality) or drop it (about 25KB, maybe +1 Lighthouse point).
9. Review, then commit. Suggested split: Phase 1 design system, Phase 2 routing, Phase 3 motion, Phase 4 quality. Note that `docs/REDESIGN_HANDOFF.md` itself is new and uncommitted.

## 12. Verification scripts (outside the repo, in the session scratchpad)

The scratchpad is `D:\Temp\claude\080e1f1ff33a9c47\b50e34d2-491e-444c-9ba2-e056a087ef66\scratchpad\`. It uses `puppeteer-core` and `lighthouse@12` installed there, driving system Chrome against `next start -p 3100`, or `next dev` on :3000 for `/dev/break-ui`.

- `nav-test.cjs`: deep links, metadata, 404, view transitions, back/forward, reduced motion (`--morph` needs a detail route).
- `motion-test.cjs`: intro, no replay, press, menu (open/close/outside/Escape/link), property audit. Its two "FAIL" lines on intro delays are a float-comparison artifact in the test (210.00000000000003ms).
- `focus-test.cjs`: tab-through focus-ring audit.
- `break-shoot.cjs`: break-ui captures plus overflow and broken-image detection.
- `frames.cjs`: throttled frame-interval sampling.
- `lh-median.sh <out> <runs> [routes…]`: Lighthouse medians.
- `shoot.cjs`: full-page screenshots, both schemes, both widths.
