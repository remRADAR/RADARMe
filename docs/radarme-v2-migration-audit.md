# RADARMe V2 Migration Audit

**Audit status:** Discovery complete; implementation not started.

**Repository:** `remRADAR/RADARMe`

**Audit date:** 2026-09-10

## Executive summary

RADARMe is an existing TanStack Start application built on React 19, Vite, TypeScript, Tailwind CSS v4, and TanStack Router. It is a navigable, mobile-first prototype with a coherent RADAR design system, an existing application shell, authentication-shaped flows, domain-oriented service modules, and broad feature coverage across RADARHub, RADARNetwork, MOTHERLand, and RADAR Intelligence.

The application is **not yet a production-backed ecosystem platform**. Authentication, profile state, service data, wallet/order state, community data, editorial data, notifications, and settings are currently simulated through local storage or deterministic in-memory mocks. No verified Postgres/Supabase connection, persistent database schema, storage layer, external distribution integration, payments integration, or backend authorization boundary was found in the repository.

The safest V2 strategy is therefore a controlled migration: preserve the existing shell, tokens, components, routes, and useful domain UI; adapt the information architecture toward the approved five-part ecosystem; then establish backend contracts and the free-event vertical slice before commerce or broad administrative tooling. No wholesale rewrite or blind repository merge is justified by the current evidence.

## Current architecture

| Area                  | Current state                                                             | V2 implication                                                                                       |
| --------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Framework             | TanStack Start with React 19 and Vite                                     | Preserve; use existing route conventions and server-function boundaries                              |
| Routing               | File-based TanStack Router routes generated into `src/routeTree.gen.ts`   | Preserve typed/deep-linkable routing; adapt aliases incrementally                                    |
| App shell             | `AppShell`, floating `BottomNav`                                          | Preserve shell; five ecosystem destinations are now first-class entry routes                         |
| Styling               | Tailwind CSS v4 plus `src/styles.css` semantic RADAR tokens               | Preserve as the implementation source of truth; extend tokens only when required                     |
| Auth                  | `AuthProvider` and localStorage session simulation                        | Preserve UI flows; replace persistence and authorization server-side before claiming production auth |
| Data access           | Typed async service modules with in-memory seed data                      | Preserve public signatures; replace implementations domain by domain behind adapters                 |
| Database              | No database client/schema/migrations found                                | Build only after contracts and ownership rules are defined                                           |
| Storage               | No verified file-storage integration found                                | Required for release assets and artist media; remain explicitly pending                              |
| External integrations | No verified AmpSuite, DSP, payment, or CMS contract found                 | Do not claim live integrations; represent pending/processing states honestly                         |
| Tests                 | No test runner or test suite is configured in package scripts             | Add focused domain tests with the first backend slice; do not hide this baseline gap                 |
| Deployment            | Vite/TanStack/Nitro configuration with Cloudflare-oriented build defaults | Preserve build pipeline; verify deployment target before adding backend assumptions                  |

## Existing routes and feature families

| Current family                           |                   Approx. scope | V2 classification       | Notes                                                                                                                          |
| ---------------------------------------- | ------------------------------: | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Home / RADARHub                          | 1 home route plus 12 hub routes | **KEEP / REFACTOR**     | Current hub is a service catalogue; home should become the artist command centre while useful service modules remain reachable |
| Auth                                     |                        5 routes | **REFACTOR**            | UI flows exist, but session/authentication are local mocks                                                                     |
| Onboarding                               |                        3 routes | **KEEP / REFACTOR**     | Valuable artist identity flow; connect to real identity/profile persistence later                                              |
| RADAR Intelligence                       |                       10 routes | **KEEP / REFACTOR**     | Preserve UI and constrain future Matrix tools to read/recommend/request/confirm/write governance                               |
| MOTHERLand                               |                       11 routes | **KEEP / REFACTOR**     | Preserve community surfaces; move eligibility and participation authorization to backend                                       |
| RADARNetwork                             |                       13 routes | **RELOCATE / REFACTOR** | Existing editorial/media functionality maps naturally under the V2 Media domain                                                |
| Profile, notifications, search, settings |                        4 routes | **KEEP / REFACTOR**     | Shared cross-ecosystem capabilities; replace mock persistence progressively                                                    |
| Admin / REM operations                   |                      None found | **BUILD NEW, LATER**    | Do not build broadly until stable domain contracts exist                                                                       |
| Store / products / tickets               |     No dedicated V2 store found | **BUILD NEW, LATER**    | Begin with events/free registration, not paid commerce                                                                         |

## Preservation boundary

The following assets should be treated as the current product foundation and preserved unless a specific contract proves otherwise:

- `AppShell`, top bar, bottom navigation, floating action button, route transition behavior, and responsive layout conventions.
- Semantic design tokens, RADAR typography, gold/black visual language, glass utilities, accessibility focus states, reduced-motion behavior, and existing reusable UI primitives.
- `HeroDashboard`, `AnnouncementRibbon`, `ServicePage`, `NetworkPage`, `MotherPage`, `IntelPage`, and shared hub components.
- Existing route-level loading, empty, error, and responsive patterns.
- Typed service interfaces and domain types in `src/services/types.ts`.
- Existing service catalogue, wallet/order UI, editorial/media surfaces, MOTHERLand flows, onboarding, and Intelligence UI.
- Existing mock data as clearly labeled demo/placeholder data only; it must not be silently presented as verified production state.

## Data and backend truthfulness assessment

The current implementation contains explicit comments identifying backend swap targets, which is useful architectural preparation. However, current behavior remains simulated:

- `src/lib/auth.tsx` creates sessions with `crypto.randomUUID()` and stores them in browser local storage.
- Service modules import deterministic seed data from `src/services/mocks/seed.ts` and mutate module-local arrays or objects.
- `src/services/http.ts` adds simulated latency and failure behavior; it does not call a backend.
- Wallet, orders, referrals, articles, community, notifications, profile, settings, and auth are not persistent across servers/users.
- Existing dashboard metrics, editorial content, and activity are demo data and must be labeled as such until sourced from verified data.
- No verified AmpSuite or DSP API contract exists in this repository; distribution must remain a RADAR submission/review/processing workflow until an adapter is verified and tested.

## Approved V2 domain map

| V2 domain       | Existing foundation                                                               | Migration direction                                                                                 |
| --------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **RADARMe**     | Home, profile, notifications, settings, onboarding, activity widgets              | Make this the authenticated artist command centre; retain useful hub entry points                   |
| **RADARMusic**  | Network artists/discovery, distribution, playlist pitch, artist-facing release UI | Combine public artist/music discovery with a verified, status-driven distribution workflow          |
| **Media**       | Network articles, magazine, interviews, spotlight, TV, videos, search, bookmarks  | Relocate/re-alias existing RADARNetwork routes incrementally; preserve deep links during transition |
| **RADARStore**  | Community events, wallet/orders infrastructure, service/order patterns            | Start with event discovery/detail/free registration/cancellation; defer paid commerce               |
| **MOTHERLand**  | Existing MOTHERLand routes and community seed models                              | Preserve public/private experience; enforce eligibility and access at backend boundary              |
| **RADARMatrix** | Intelligence routes and `IntelPage`                                               | Keep initial capabilities read-only/recommendation-oriented and permission-bounded                  |
| **RADARRoom**   | No dedicated structured escalation domain found                                   | Introduce after Matrix support boundaries are defined; avoid generic contact-page substitution      |
| **REM Admin**   | No admin control plane found                                                      | Build later against stable domain contracts, not speculative screens                                |

## Required first slice: ecosystem shell

The smallest coherent implementation after discovery is **Slice A: ecosystem shell**. It should:

1. Preserve `AppShell` and existing route behavior.
2. Define a typed navigation model for `RADARMe`, `RADARMusic`, `Media`, `Store`, and `MOTHERLand`.
3. Add entry routes or compatibility aliases without deleting current routes.
4. Keep current RADARHub, RADARNetwork, and MOTHERLand experiences reachable.
5. Add active-state, focus, mobile, and deep-link coverage.
6. Avoid implying that Store commerce or RADARMusic distribution is production-backed.

Slice A should not simultaneously introduce database migrations, paid commerce, AmpSuite, or a broad admin system.

## Second slice: free events vertical

After the shell is coherent, Slice B should define and implement the first real backend contract for events:

- Event discovery and detail.
- Free registration.
- Server-side capacity validation.
- Duplicate active-registration prevention.
- Confirmation state.
- Cancellation and capacity release.
- Authentication and authorization checks.
- Persistence and user-facing status feedback.

The backend/database must be authoritative for capacity and registration state. Client counters are presentation only. Paid tickets, payments, refunds, inventory, and check-in are explicitly deferred.

## Risks and stop conditions

| Risk                                                       | Current evidence                                         | Mitigation                                                                    |
| ---------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Mock data looks production-like                            | Widespread deterministic seeds and dashboard metrics     | Add explicit data-status conventions and replace domain by domain             |
| Frontend-only auth/authorization                           | Local storage session; no backend auth/RLS               | Establish secure auth and server-side role checks before sensitive workflows  |
| Route migration breaks users                               | Existing routes are broad and deep-linkable              | Add compatibility aliases and migrate incrementally                           |
| External integrations are invented                         | No verified AmpSuite/DSP/payment contracts               | Use adapter interfaces and pending/processing states                          |
| Commerce begins too early                                  | Wallet/orders exist as UI/mocks                          | Prove free events first; defer payments                                       |
| Admin scope expands prematurely                            | No stable admin contracts yet                            | Build operational views only after user-facing contracts stabilize            |
| Test baseline is incomplete                                | No configured test command found                         | Add domain tests with Slice B and record the baseline honestly                |
| Existing uncommitted work may be mixed with migration work | Current working tree has prior shell/theme/preview edits | Separate migration commits from existing UI refinement before major refactors |

## Baseline commands and expected validation

The repository currently exposes `dev`, `build`, `build:dev`, `preview`, `lint`, and `format` scripts. There is no dedicated `test` script. The baseline verification cycle should run:

```bash
npm run build
npx tsc --noEmit
npm run lint
```

The existing repository has a known broad formatting-lint backlog; changed-file lint and build results should be reported separately from the repository-wide baseline. A test runner should be introduced with the first meaningful backend/domain change rather than retrofitted after multiple slices.

## Completed continuation slice

The ecosystem shell migration is now implemented in `AppShell` and `BottomNav`. The primary navigation exposes Home, RADARMusic, Motherland, Market, and Media using real entry routes at `/`, `/radarmusic`, `/motherland`, `/market`, and `/media`. Existing Hub, Network, and MOTHERLand deep links remain intact. The obsolete persistent `TopBar` and floating-action component were unreferenced after the migration and have been removed. Generated build caches remain ignored and are not part of the source tree.

## Discovery conclusion

**Preserve:** current shell, tokens, routes, components, service signatures, useful screens, and mock/demo flows.

**Refactor:** navigation information architecture, Home meaning, auth/data boundaries, mock labeling, RADARNetwork naming, and service implementation boundaries.

**Build new:** typed ecosystem entry navigation, event persistence/registration vertical slice, backend authorization, verified RADARMusic lifecycle, and later REM Admin/RADARRoom capabilities.

**Do not do yet:** wholesale rewrite, repository merge, paid commerce, AmpSuite claims, unrestricted Matrix actions, or speculative admin.

**Next slice:** Slice A, ecosystem shell adaptation, implemented as a small compatibility-preserving change set with route and accessibility verification.

## Audit limitations

This audit is based on the selected RADARMe repository and its current local configuration. No additional RADARSite, RADARMusic, remradar, RADARMatrix, Supabase, Postgres, Cloudflare account, or external provider contract was available in the repository for comparison or verification. Those sources must be inspected separately before selective extraction or integration is proposed.

No implementation slice is claimed complete by this document.
