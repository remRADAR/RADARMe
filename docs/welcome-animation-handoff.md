# remRADAR Welcome Animation Handoff

This package makes the remRADAR opening clip reusable in another web app, landing page, WebView, or hybrid application. Copy the three media files listed below into the destination program’s public/static asset directory, then copy the HTML, CSS, and JavaScript implementation.

## Assets to copy

| File                          | Purpose                                            |    Size | Format                              |
| ----------------------------- | -------------------------------------------------- | ------: | ----------------------------------- |
| `remradar-opening.webm`       | Primary browser delivery                           |  942 KB | VP9, 1080×1920, 30 fps, 8 seconds   |
| `remradar-opening.mp4`        | Safari/iOS and fallback delivery                   | 1.62 MB | H.264, 1080×1920, 30 fps, 8 seconds |
| `remradar-opening-poster.jpg` | Immediate visual fallback and reduced-motion image |  127 KB | JPEG, 1080×1920                     |

The source files are available in this repository at `public/media/welcome/`.

## Copyable HTML

```html
<div
  id="remradar-welcome"
  class="remradar-welcome"
  role="dialog"
  aria-label="RADARCharts welcome animation"
  aria-modal="true"
>
  <video
    class="remradar-welcome__video"
    autoplay
    muted
    playsinline
    preload="auto"
    poster="/media/welcome/remradar-opening-poster.jpg"
    aria-hidden="true"
  >
    <source src="/media/welcome/remradar-opening.webm" type="video/webm" />
    <source src="/media/welcome/remradar-opening.mp4" type="video/mp4" />
  </video>

  <img
    class="remradar-welcome__poster"
    src="/media/welcome/remradar-opening-poster.jpg"
    alt=""
    aria-hidden="true"
  />

  <div class="remradar-welcome__scrim" aria-hidden="true"></div>
</div>

<main id="app-content" class="remradar-app-content">
  <!-- The destination application goes here. -->
</main>
```

## Copyable CSS

```css
:root {
  --remradar-welcome-duration: 1200ms;
  --remradar-welcome-bg: #050505;
}

html.remradar-welcome-active,
body.remradar-welcome-active {
  overflow: hidden;
  background: var(--remradar-welcome-bg);
}

.remradar-welcome {
  position: fixed;
  z-index: 2147483000;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--remradar-welcome-bg);
  opacity: 1;
  visibility: visible;
  transition:
    opacity var(--remradar-welcome-duration) ease,
    visibility 0s linear 0s;
}

.remradar-welcome.is-exiting {
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--remradar-welcome-duration) ease,
    visibility 0s linear var(--remradar-welcome-duration);
}

.remradar-welcome__video,
.remradar-welcome__poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}

.remradar-welcome__poster {
  z-index: 0;
}

.remradar-welcome__video {
  z-index: 1;
}

.remradar-welcome__scrim {
  position: absolute;
  z-index: 2;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.18));
}

.remradar-app-content {
  min-height: 100svh;
}

@media (prefers-reduced-motion: reduce) {
  .remradar-welcome__video {
    display: none;
  }

  .remradar-welcome {
    transition-duration: 450ms;
  }
}
```

## Copyable JavaScript

```html
<script>
  (() => {
    const gate = document.getElementById("remradar-welcome");
    const video = gate?.querySelector("video");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DISPLAY_MS = 8000;
    const EXIT_MS = 1200;
    let dismissed = false;
    let displayTimer;
    let exitTimer;

    if (!gate) return;

    document.documentElement.classList.add("remradar-welcome-active");
    document.body.classList.add("remradar-welcome-active");

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      window.clearTimeout(displayTimer);
      window.clearTimeout(exitTimer);
      gate.classList.add("is-exiting");

      exitTimer = window.setTimeout(() => {
        gate.remove();
        document.documentElement.classList.remove("remradar-welcome-active");
        document.body.classList.remove("remradar-welcome-active");
      }, EXIT_MS);
    };

    if (reducedMotion) {
      window.setTimeout(dismiss, 550);
      return;
    }

    displayTimer = window.setTimeout(dismiss, DISPLAY_MS);
    video?.addEventListener("ended", dismiss, { once: true });
    video?.addEventListener(
      "error",
      () => {
        // Keep the poster visible briefly if the video cannot be decoded.
        window.setTimeout(dismiss, 650);
      },
      { once: true },
    );

    const play = () => {
      if (!video || dismissed) return;
      video.play().catch(() => {
        window.setTimeout(dismiss, 850);
      });
    };

    if (video) {
      video.addEventListener("loadedmetadata", play, { once: true });
      play();
    }
  })();
</script>
```

## Asset path options

If the destination program uses a different public directory, keep the filenames stable and change the three URLs in the HTML:

```html
<source src="/assets/remradar-opening.webm" type="video/webm" />
<source src="/assets/remradar-opening.mp4" type="video/mp4" />
poster="/assets/remradar-opening-poster.jpg"
```

For a hosted asset origin, use absolute HTTPS URLs instead:

```html
<source src="https://cdn.example.com/remradar/remradar-opening.webm" type="video/webm" />
<source src="https://cdn.example.com/remradar/remradar-opening.mp4" type="video/mp4" />
poster="https://cdn.example.com/remradar/remradar-opening-poster.jpg"
```

The CDN must return correct `Content-Type` headers, support byte-range requests, and allow the destination origin through CORS when the assets are hosted on a different domain.

## React and React Native adaptation

For React, place the markup in a client component and replace the script with `useEffect`. The key rules are `autoPlay`, `muted`, `playsInline`, `preload="auto"`, a WebM-first source order, an MP4 fallback, a poster, and a one-time dismiss guard.

For React Native, copy the MP4 and poster into the app bundle and use the platform’s video component with `shouldPlay`, `isMuted`, `isLooping: false`, `resizeMode: 'COVER'`, and a fade-out animation. Native mobile platforms should use the MP4 because WebM support is inconsistent. Keep the poster visible until the video reports that it has loaded, and dismiss after eight seconds even if playback stalls.

For desktop applications or other frameworks, the same MP4/poster pair can be placed in a full-window video view. Do not rely on autoplay with audio; all autoplay implementations should be muted until the destination platform explicitly permits sound.

## Recommended cross-platform behavior

The welcome animation is an eight-second opening layer rather than a permanent looping background. If the clip is required to loop continuously on a specific platform, add `loop` to the video element and remove the `ended` dismissal listener, but retain the explicit timeout and error fallback so an unavailable media decoder cannot block the application indefinitely.

A production implementation should serve the video from a CDN or the application’s static asset host, enable long-lived immutable caching for versioned filenames, and use the poster as the first visual. The poster should remain available for reduced-motion users, slow connections, and browsers that reject autoplay.
