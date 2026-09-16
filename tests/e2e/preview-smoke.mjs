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
