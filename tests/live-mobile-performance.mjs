import { chromium, devices } from "@playwright/test";

const url = process.env.RADARME_URL || "https://remradar-radarme.remradar.workers.dev/radarmusic";
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const cases = [
  { name: "iPhone 13", device: devices["iPhone 13"] },
  { name: "Pixel 5", device: devices["Pixel 5"] },
];
const results = [];

for (const testCase of cases) {
  const context = await browser.newContext({ ...testCase.device });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => message.type() === "error" && consoleErrors.push(message.text()));
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const started = Date.now();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);
  const metrics = await page.evaluate(async () => {
    const frames = [];
    let previous = performance.now();
    const end = previous + 2500;
    await new Promise((resolve) => {
      const tick = (now) => {
        frames.push(now - previous);
        previous = now;
        if (now < end) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
    const frameGaps = frames.filter((gap) => gap > 0);
    const sorted = [...frameGaps].sort((a, b) => a - b);
    const p95 = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] || 0;
    return {
      viewport: { width: innerWidth, height: innerHeight },
      documentWidth: document.documentElement.scrollWidth,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      bottomNavVisible:
        Boolean(document.querySelector('nav[aria-label="Primary"]')) &&
        getComputedStyle(document.querySelector('nav[aria-label="Primary"]')).display !== "none",
      bottomNavItems: [...document.querySelectorAll('nav[aria-label="Primary"] a')]
        .map((a) => a.textContent?.trim())
        .filter(Boolean),
      botVisible: (() => {
        const bot = document.querySelector(".radar-bot-wrapper");
        if (!bot) return false;
        const rect = bot.getBoundingClientRect();
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom <= innerHeight + 1 &&
          rect.right <= innerWidth + 1
        );
      })(),
      botAnimations: [...document.querySelectorAll(".radar-bot-wrapper *")]
        .filter((el) => getComputedStyle(el).animationName !== "none")
        .map((el) => getComputedStyle(el).animationName),
      frameCount: frameGaps.length,
      approxFps: Number((frameGaps.length / 2.5).toFixed(1)),
      p95FrameGapMs: Number(p95.toFixed(2)),
      framesOver50ms: frameGaps.filter((gap) => gap > 50).length,
      framesOver33ms: frameGaps.filter((gap) => gap > 33.3).length,
    };
  });
  results.push({
    name: testCase.name,
    loadMs: Date.now() - started,
    metrics,
    consoleErrors,
    pageErrors,
  });
  await context.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
if (
  results.some(
    ({ metrics, consoleErrors, pageErrors }) =>
      metrics.horizontalOverflow ||
      !metrics.botVisible ||
      consoleErrors.length ||
      pageErrors.length,
  )
)
  process.exit(1);
