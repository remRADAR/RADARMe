import { chromium } from "playwright";

const baseURL = process.env.RADARME_PREVIEW_URL;

if (!baseURL) {
  throw new Error("RADARME_PREVIEW_URL is required");
}

const routes = [
  "/",
  "/radarmusic",
  "/market",
  "/network",
  "/hub",
  "/motherland",
  "/intelligence",
  "/profile",
];

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const page = await browser.newPage();
  const pageErrors = [];
  const failedRequests = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    failedRequests.push(
      `${request.method()} ${request.url()} — ${request.failure()?.errorText || "unknown error"}`,
    );
  });

  for (const route of routes) {
    const response = await page.goto(new URL(route, baseURL).href, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });

    if (!response || response.status() >= 400) {
      throw new Error(`${route} returned ${response?.status() ?? "no response"}`);
    }

    await page.locator("#main-content").waitFor({ state: "attached", timeout: 15_000 });

    const bodyText = await page.locator("body").innerText();
    if (!bodyText.includes("RADARMe")) {
      throw new Error(`${route} rendered without the RADARMe app shell`);
    }

    if (route === "/") {
      const heroImage = page.locator(".framer-home-frame__image.is-active img");
      await heroImage.waitFor({ state: "visible", timeout: 15_000 });
      const heroState = await heroImage.evaluate((image) => {
        const rect = image.getBoundingClientRect();
        const styles = getComputedStyle(image);
        return {
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          width: rect.width,
          height: rect.height,
          opacity: styles.opacity,
          visibility: styles.visibility,
        };
      });

      if (
        heroState.naturalWidth === 0 ||
        heroState.naturalHeight === 0 ||
        heroState.width === 0 ||
        heroState.height === 0 ||
        heroState.opacity === "0" ||
        heroState.visibility === "hidden"
      ) {
        throw new Error(
          `Homepage hero image is not visibly rendered: ${JSON.stringify(heroState)}`,
        );
      }
    }
  }

  if (pageErrors.length > 0) {
    throw new Error(`Browser runtime errors:\n${pageErrors.join("\n")}`);
  }

  if (failedRequests.length > 0) {
    throw new Error(`Failed browser requests:\n${failedRequests.join("\n")}`);
  }

  console.log(`Preview smoke test passed for ${routes.length} routes at ${baseURL}`);
} finally {
  await browser.close();
}
