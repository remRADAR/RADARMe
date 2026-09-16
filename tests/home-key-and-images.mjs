import { chromium } from "@playwright/test";

const baseURL = process.env.RADARME_TEST_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
const errors = [];
page.on("console", (message) => message.type() === "error" && errors.push(message.text()));

await page.goto(`${baseURL}/radarmusic`, { waitUntil: "networkidle" });
await page.keyboard.press("Home");
await page.waitForURL(/\/$/);

const imageRoutes = [
  "/",
  "/network/magazine",
  "/network/playlists",
  "/network/artists",
  "/hub/distribution",
];
const imageResults = [];
for (const route of imageRoutes) {
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  const result = await page.locator("img").evaluateAll((images) =>
    images.map((image) => ({
      src: image.getAttribute("src"),
      complete: image.complete,
      width: image.naturalWidth,
      height: image.naturalHeight,
    })),
  );
  imageResults.push({ route, images: result });
}

const brokenImages = imageResults.flatMap(({ route, images }) =>
  images
    .filter((image) => image.width === 0 || image.height === 0)
    .map((image) => ({ route, image })),
);
console.log(JSON.stringify({ homePath: page.url(), imageResults, brokenImages, errors }, null, 2));
await context.close();
await browser.close();
if (brokenImages.length || errors.length) process.exit(1);
