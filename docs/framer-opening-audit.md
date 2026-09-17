# RADARMe Framer Opening Audit

**Audit date:** 2026-09-12

**Scope:** First-frame experience on `/`, Framer-derived opening assets, hydration behavior, dismissal interaction, and responsive-safe overlay behavior.

## Findings

The deployed RADARMe build opened directly on the previous dashboard. The repository already contained the intended Framer-derived opening media under `public/media/welcome/`, together with a complete handoff document, but no route or root component mounted those assets. The older `welcome` route rendered a separate logo-and-CTA screen and was not the first frame of the main application.

The supplied reference image matches the visual intent of the bundled opening sequence: a black, editorial, image-led RADARCharts opening with centered composition and restrained surrounding typography. The bundled poster and video are therefore used as the primary source rather than recreating the reference as a CSS silhouette.

The public Framer reference hostname `https://radarcharts.framer.site` was also checked, but DNS resolution was unavailable in the browser environment. No authentication or access-control bypass was attempted. The authorized `remRADAR/framer-clone` repository was inspected; it is an exporter utility, not a captured Framer component export, and did not contain the missing page components or assets.

## Implemented fixes

`FramerOpening` is now mounted from the root route for `/` as a fixed, full-viewport first-frame dialog. It uses the existing WebM and MP4 opening sequence with the supplied poster fallback, muted inline autoplay, a one-time eight-second timeout, ended/error dismissal, a visible 44px `Skip opening` control, safe-area positioning, and a 1.2-second fade-out. Reduced-motion users receive the poster only and a short non-blocking dismissal window.

The root document locks scrolling while the opening is visible and restores the previous overflow value after dismissal. The overlay is outside the regular app shell, so the existing dashboard, five-tab navigation, and deep links remain unchanged beneath it.

The home hero greeting was made hydration-safe. Its time-dependent greeting is now selected in `useEffect` from a deterministic server-rendered `Welcome back` initial value. This removes the SSR/client mismatch observed during browser acceptance.

## Verification

- `npx eslint src/components/home/HeroDashboard.tsx src/components/opening/FramerOpening.tsx src/routes/__root.tsx`: **PASSED**.
- `npx tsc --noEmit`: **PASSED**.
- `npm run build`: **PASSED**.
- `git diff --check`: **PASSED**.
- Local browser load at `http://localhost:8080/`: opening poster/video layer visible above the app and `Skip opening` exposed.
- Browser console after hydration-safe repair: no hydration mismatch or runtime error; React DevTools informational output only.
- Browser interaction: skip control dismissed the overlay; `document.documentElement.style.overflow` returned to its prior value and primary navigation remained available.

## Known limitations

The Framer source hostname was not DNS-resolvable during this audit, so exact live-site component parity beyond the supplied opening media and handoff cannot be claimed. The opening media is verified locally, and the authoritative deployment target is the Cloudflare Worker at `https://remradar-radarme.remradar.workers.dev/`.

The existing `/welcome` authentication/onboarding entry screen remains separate by design. It is not replaced because it owns the account CTA flow; the Framer opening is the first-frame layer for the main application root.
