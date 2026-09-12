import { chromium, devices } from "@playwright/test";

const base = process.env.RADARME_URL || "https://radarme.vercel.app";
const routes = [
  { path: "/hub/distribution", asset: "release-vinyl.jpg" },
  { path: "/network/playlists", asset: "playlist-lagos-live.jpg" },
  { path: "/network/artists", asset: "artist-spotlight.jpg" },
  { path: "/network/magazine", asset: "magazine-interview.jpg" },
];
const devicesToTest = ["iPhone 13", "Pixel 5"];
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const results = [];

for (const deviceName of devicesToTest) {
  for (const route of routes) {
    const context = await browser.newContext({ ...devices[deviceName] });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on(
      "console",
      (message) => message.type() === "error" && consoleErrors.push(message.text()),
    );
    page.on("pageerror", (error) => pageErrors.push(error.message));
    const start = Date.now();
    await page.goto(`${base}${route.path}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(400);
    const result = await page.evaluate(
      async ({ asset }) => {
        const image = [...document.images].find(
          (item) => item.currentSrc.includes(asset) || item.src.includes(asset),
        );
        const imageReady = Boolean(image && image.complete && image.naturalWidth > 0);
        const imageBytes = image?.currentSrc || image?.src || null;
        const frameGaps = [];
        let previous = performance.now();
        const end = previous + 1200;
        await new Promise((resolve) => {
          const tick = (now) => {
            frameGaps.push(now - previous);
            previous = now;
            now < end ? requestAnimationFrame(tick) : resolve();
          };
          requestAnimationFrame(tick);
        });
        const sorted = frameGaps.filter(Boolean).sort((a, b) => a - b);
        return {
          viewport: { width: innerWidth, height: innerHeight },
          imageReady,
          imageBytes,
          imageDimensions: image
            ? { width: image.naturalWidth, height: image.naturalHeight }
            : null,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
          documentWidth: document.documentElement.scrollWidth,
          approxFps: Number((frameGaps.length / 1.2).toFixed(1)),
          p95FrameGapMs: Number(
            (sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] || 0).toFixed(2),
          ),
          framesOver33ms: frameGaps.filter((gap) => gap > 33.3).length,
          visibleAssetCount: [...document.images].filter(
            (item) =>
              item.currentSrc.includes("/media/radar-assets/") &&
              item.getBoundingClientRect().width > 0,
          ).length,
        };
      },
      { asset: route.asset },
    );
    results.push({
      device: deviceName,
      route: route.path,
      expectedAsset: route.asset,
      loadMs: Date.now() - start,
      ...result,
      consoleErrors,
      pageErrors,
    });
    await context.close();
  }
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
const failed = results.filter(
  (result) =>
    !result.imageReady ||
    result.horizontalOverflow ||
    result.consoleErrors.length ||
    result.pageErrors.length ||
    result.framesOver33ms > 3,
);
if (failed.length) process.exit(1);
