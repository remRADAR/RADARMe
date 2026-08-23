# RADARMe Welcome Animation

This integration package carries the shared remRADAR welcome animation into RADARMe, the INDUSTRYKit by remRADAR. It is intentionally asset-first and framework-neutral so a future RADARMe web shell, native app, extension, or plugin can reuse the same opening experience without coupling RADARMe to the remRADAR site repository.

## Included assets

The optimized vertical opening clip is available in `public/media/welcome/`:

- `remradar-opening.webm` — primary VP9 delivery, 942 KB, 1080×1920, 30 fps, 8 seconds.
- `remradar-opening.mp4` — H.264 fallback for Safari, iOS, and native players, 1.62 MB, 1080×1920, 30 fps, 8 seconds.
- `remradar-opening-poster.jpg` — 127 KB poster fallback.

## Integration contract

Use WebM first for browsers that support it and MP4 as the fallback. The viewer should be muted, inline, autoplay-capable, and bounded by an explicit timeout so media failure cannot block RADARMe. The poster must remain available for reduced-motion users, slow connections, decoder failures, and native platforms that do not support WebM.

The complete copyable HTML, CSS, JavaScript, React, React Native, WebView, CDN, and platform guidance is in [`docs/welcome-animation-handoff.md`](../../docs/welcome-animation-handoff.md).

## Future RADARAgent boundary

RADARAgent remains a separate repository and future extension/plugin product. When it is ready, RADARMe can expose a floating agent surface through a versioned API or client integration. This welcome animation does not import or bundle RADARAgent code.
