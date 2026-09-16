# Homepage Asset Monitoring

The homepage now emits non-blocking asset telemetry for the Framer hero and ticker images. The monitor records successful loads, selected formats, fallback usage, final decode failures, route, browser user agent, and timestamp.

## Event stream

Every monitored asset emits a `radarme:asset` browser event with a `HomepageAssetEvent` detail object:

```ts
window.addEventListener("radarme:asset", (event) => {
  const assetEvent = (event as CustomEvent).detail;
  console.log(assetEvent);
});
```

The event includes `assetId`, `kind` (`hero` or `ticker`), `status` (`loaded` or `error`), the browser-selected URL and format, whether a fallback was used, the current route, user agent, and an ISO timestamp.

## Production integration

A host application or telemetry bootstrap can provide an optional sink before React mounts:

```ts
window.__radarmeAssetMonitor = (event) => {
  navigator.sendBeacon(
    "/telemetry/homepage-asset",
    new Blob([JSON.stringify(event)], { type: "application/json" }),
  );
};
```

The callback is optional and never blocks rendering. Final asset failures are logged as handled warnings. Successful fallback selection is not treated as an error; it is recorded with `fallback: true` so browser-specific format support can be measured without false alarms.

## What is monitored

The hero monitors the original JPEG image. Ticker images use the original transparent PNG artwork for both copies used by the continuous marquee. A broken image is reported only when the selected image emits `error`, avoiding duplicate alerts for normal asset loading.
