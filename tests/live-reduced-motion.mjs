import { chromium, devices } from "@playwright/test";
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const context = await browser.newContext({ ...devices["iPhone 13"], reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
await page.goto("https://remradar-radarme.remradar.workers.dev/radarmusic", {
  waitUntil: "networkidle",
  timeout: 60000,
});
await page.waitForTimeout(500);
const result = await page.evaluate(() => ({
  reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
  botVisible: Boolean(document.querySelector(".radar-bot-wrapper")),
  activeAnimations: [...document.querySelectorAll(".radar-bot-wrapper *")]
    .map((el) => getComputedStyle(el).animationName)
    .filter((name) => name !== "none"),
  overflow: document.documentElement.scrollWidth > innerWidth + 1,
}));
console.log(JSON.stringify({ result, errors }, null, 2));
await context.close();
await browser.close();
if (!result.reducedMotion || result.overflow || errors.length) process.exit(1);
