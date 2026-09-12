# Homepage Offline Hero Caching

RADARMe registers `/radarme-sw.js` after the initial render during an idle period. Registration is an enhancement and is intentionally not on the critical rendering path.

The service worker precaches the original Framer hero frame during installation:

- `/media/framer-home/shutter-hero.jpg`

Requests for those same-origin assets use a cache-first strategy. If an asset is not yet cached, the service worker fetches it from the network, returns it immediately, and stores a clone for the next visit. Other application requests are not intercepted.

The cache is versioned as `radarme-hero-v1`. Updating the version in `public/radarme-sw.js` invalidates older hero caches during activation. The worker calls `skipWaiting()` and `clients.claim()` so an updated cache becomes active without requiring a second browser session.

The JPEG remains the HTML `<picture>` fallback for browsers that do not support AVIF or WebP. The service worker only caches AVIF and WebP because browsers that select JPEG do not request the modern variants; the existing JPEG fallback remains available online and through normal browser caching.

Service workers require a secure context in production, which includes HTTPS. Localhost is treated as secure for development. Users can disable service workers or browser storage, in which case the homepage continues to work normally through its network and image fallbacks.
