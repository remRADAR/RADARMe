import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
const errors = [];
page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
await page.goto("http://127.0.0.1:4173/radarmusic", { waitUntil: "networkidle" });
const bot = page.getByRole("button", { name: /RADAR music; hold for intelligence/ });
await bot.waitFor({ state: "visible" });

const initial = await bot.boundingBox();
if (!initial) throw new Error("AI Bot did not have a measurable bounding box");

await bot.click({ force: true });
const afterTap = await bot.getAttribute("aria-label");
if (!afterTap?.includes("Pause")) throw new Error(`Tap did not toggle playback: ${afterTap}`);

await bot.dispatchEvent("pointerdown");
await page.waitForTimeout(1250);
const panel = page.getByRole("dialog", { name: "Your intelligence layer" });
if (!(await panel.isVisible())) throw new Error("Hold did not open the intelligence panel");
await page.getByRole("button", { name: "Close RADAR intelligence panel" }).click();

const beforeDrag = await bot.boundingBox();
if (!beforeDrag) throw new Error("AI Bot disappeared before drag");
await bot.dispatchEvent("pointerdown");
await bot.dispatchEvent("pointermove");
await bot.dispatchEvent("pointerup");
await page.waitForTimeout(350);
const afterDrag = await bot.boundingBox();
if (
  !afterDrag ||
  afterDrag.x < 0 ||
  afterDrag.y < 0 ||
  afterDrag.right > 390 ||
  afterDrag.bottom > 844
)
  throw new Error("AI Bot is outside the viewport bounds");
const stored = await page.evaluate(() => localStorage.getItem("radar_bot_position"));
const saved = stored ? JSON.parse(stored) : null;
if (errors.length) throw new Error(`Console errors: ${errors.join(" | ")}`);
console.log(JSON.stringify({ initial, afterTap, beforeDrag, afterDrag, stored, errors }, null, 2));
await context.close();
await browser.close();
