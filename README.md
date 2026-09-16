# RADARMe — The Artist Operating System

**RADARMe by RADARCharts (REM)** is a mobile-first, installable (PWA) operating system for
music artists. It is **not** a streaming app: it is a career workspace that combines
business services, editorial media, a female-creative ecosystem and an AI career
assistant into one premium product.

---

## 1. Tech Stack

| Layer             | Choice                                                               |
| ----------------- | -------------------------------------------------------------------- |
| Framework         | React 19 + TanStack Start v1 (SSR-capable, file-based routing)       |
| Build             | Vite 7, TypeScript (strict)                                          |
| Styling           | Tailwind CSS v4 (`src/styles.css`, OKLCH design tokens)              |
| UI primitives     | Radix UI + shadcn-style components (`src/components/ui`)             |
| Data/state        | TanStack Query, React context (`auth`, `theme`)                      |
| Icons             | lucide-react                                                         |
| Target            | Progressive Web App (installable on iOS/Android)                     |
| Backend (planned) | Supabase (Postgres, Auth, Storage, server functions)                 |

> Note: the original brief requested Flutter. This project is implemented in React +
> TanStack Start (the supported stack), delivering the same mobile-app experience via PWA.

---

## 2. Folder Structure

```
src/
  routes/                 File-based routes (63 files) — see route map below
  components/
    layout/               AppShell, BottomNav, Splash
    brand/                Logo (official metallic RADARMe mark)
    radar/                Design-system primitives (Button, Card, Input, Skeleton,
                          EmptyState, ErrorState)
    home/                 HeroDashboard, AnnouncementRibbon (RADAR Live)
    hub/                  ServicePage, PricingTier, OrderRow
    network/              NetworkPage shell
    motherland/           MotherPage shell
    intelligence/         IntelPage shell
    ui/                   shadcn primitives
  lib/                    auth.tsx, theme.tsx, utils, local diagnostics
  services/               Modular placeholder backend layer (9 domains + mocks)
  styles.css              Global tokens, typography, animations, glass utilities
  router.tsx, start.ts, server.ts
public/                   manifest.webmanifest, favicon, robots.txt
```

### Design system

- **Palette:** black / white / neutral grey with subtle **gold** accents; MOTHERLand
  overlays a warmer rose "bloom" identity.
- **Type:** Space Grotesk (display) + Inter (body), loaded via `<link>` in `__root.tsx`.
- **Dark mode is default**, light mode supported through the theme provider.
- **Signature surfaces:** ambient glass (`bg-surface`, `hairline`, `elev-1`) plus a
  scroll-driven sheen utility `.glass-reflect` used across all cards.
- **Motion:** page-in transitions, hero fade/scale/drift, count-up statistics,
  cross-fade announcement ribbon — restrained, never decorative-only.

---

## 3. What Has Been Built

### Foundation

- Mobile-first `AppShell` with safe-area padding, centered column on tablet+.
- Bottom navigation (RADARHub / MOTHERLand / RADARNetwork), floating action button
  for RADAR Intelligence, top bar (search, notifications, profile).
- Splash screen, PWA manifest, app icons, official logo placement everywhere
  (splash, welcome, auth, header, settings, loaders).
- Full token-based design system + reusable primitives; no hardcoded colors.

### Authentication & onboarding (mocked)

Welcome, Login, Register (password-strength meter), Forgot password, 6-digit email
verification, Profile creation, Artist onboarding (role + genres) → Dashboard.
Session handled by `src/lib/auth.tsx` against `services/auth.service.ts`.

### Home

Hero Workspace (greeting, artist name, career summary, monthly growth, streaming
highlights, active campaigns, achievements, AI insight preview) over the RADARCharts
skyline background with readability overlay; **RADAR Live** announcement ribbon
(12 categories, auto-rotate + swipe); 4 high-intent Quick Actions; Recommended For You.

### RADARHub — business engine

Categorised index (Career / Business / Growth) plus: Music Distribution, Playlist
Pitch, Marketing, Editorial, Career Planner, Consultation, Wallet, Referrals,
Orders, Support.

### MOTHERLand — female-creative ecosystem

Community home, Creative Feed, Mentorship, Learning Centre, Events, Challenges,
Recognition, Creative Discovery, Messages, Notifications — softer motion, warm palette.

### RADARNetwork — editorial media ecosystem

Index plus Magazine, Articles, Interviews, Spotlight, Artists, Playlists, RADAR TV,
Videos, Discovery, Search, Bookmarks.

### RADAR Intelligence — immersive AI environment

Fullscreen surface (chrome hidden) with proactive time-based greeting and Today's
Brief, plus Chat, Insights, Opportunities, Recommendations, Goals, Planner,
Timeline, Knowledge.

### Utility

Universal Search (9 browse categories before querying), Notifications, Profile,
Settings (theme, notifications, privacy), sitemap.xml, per-route SEO head metadata,
404 + error boundaries with local console diagnostics.

### Backend-ready service layer

`src/services/` exposes typed async modules — auth, profile, wallet, orders,
referrals, articles, community, notifications, settings — backed by deterministic
in-memory mocks. Swapping to real data is a body-swap, not an API redesign.

### Quality pass already done

Accessibility (aria-labels on icon-only buttons, `aria-pressed` filter chips,
44px tap targets, focus-visible rings), `min-h-dvh` viewport handling, hero LCP
priority loading, unified route animations, typecheck clean.

---

## 4. What Remains for Final Deployment

### A. Backend (highest priority)

1. Provision Supabase Postgres, Auth, and Storage.
2. Schema: `profiles`, `user_roles` (separate table, `has_role()` security-definer
   function), `wallets`, `wallet_transactions`, `orders`, `order_items`, `referrals`,
   `articles`, `community_posts`, `community_events`, `notifications`,
   `user_settings`, `releases`, `opportunities`.
3. RLS on every table + explicit `GRANT`s for `authenticated` / `service_role`
   (and `anon` only for public reads).
4. Replace mock bodies in `src/services/*` with Supabase queries; move privileged
   work into `createServerFn` handlers.

### B. Real authentication

Email/password + Google/Apple sign-in, email verification, password reset,
session persistence, `_authenticated` route gate, protected loaders.

### C. Feature completion

- Distribution: real file upload to Storage, release metadata, delivery status.
- Wallet & Orders: payment provider (Stripe/Paddle), checkout, invoices, payouts,
  webhook endpoints under `src/routes/api/public/*` with signature verification.
- RADAR Intelligence: connect chat/insights to the AI gateway with streaming,
  per-user context and usage limits.
- Editorial CMS for Magazine/TV/Spotlight content.
- MOTHERLand messaging (realtime), event RSVP, challenge submissions.
- Notifications: persistence + web push.
- Search: server-side full-text search across entities.

### D. Media, performance, PWA

Convert remaining raster assets to responsive `srcset`, add a service worker for
offline shell + install prompt, image CDN/caching, route-level code splitting audit,
Lighthouse pass (target 90+ on mobile).

### E. Trust, ops and launch

Analytics + error monitoring, rate limiting on public endpoints, secrets in the
secret store (never in code), Terms/Privacy pages, GDPR data export/delete,
seed/demo data migration, E2E tests (Playwright) for auth + checkout, custom domain,
app-store-style install assets, and a security scan before go-live.

---

## 5. Running Locally

```bash
bun install
bun run dev        # http://localhost:8080
bun run build      # production build
bun run lint
```

Environment: server secrets via `process.env` read **inside** server-function
handlers; browser config via `import.meta.env.VITE_*`.

---

## 6. Status

Version 1 prototype: complete, navigable, visually production-grade, fully
mock-data driven. Next milestone is backend enablement — after which the app is
deployable as a real product.
