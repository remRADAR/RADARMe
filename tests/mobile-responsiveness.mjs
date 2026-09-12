import { chromium, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:4173";
const viewports = [
  { name: "small-phone", width: 320, height: 568 },
  { name: "large-phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const results = [];

for (const viewport of viewports) {
  const context = await browser.newContext({
    ...devices["Desktop Chrome"],
    viewport: { width: viewport.width, height: viewport.height },
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => message.type() === "error" && consoleErrors.push(message.text()));
  await page.goto(`${baseURL}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);

  const layout = await page.evaluate(() => {
    const body = document.body;
    const nav = document.querySelector('nav[aria-label="Primary"]');
    const navLinks = nav ? [...nav.querySelectorAll("a")] : [];
    const rects = navLinks.map((link) => ({
      label: link.textContent?.trim(),
      width: link.getBoundingClientRect().width,
      height: link.getBoundingClientRect().height,
    }));
    return {
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      bottomNavVisible: !!nav && getComputedStyle(nav).display !== "none",
      navLinkCount: navLinks.length,
      navLinkLabels: navLinks.map((link) => link.textContent?.trim()),
      navLinkRects: rects,
      activeLink:
        navLinks
          .find((link) => link.getAttribute("aria-current") === "page")
          ?.textContent?.trim() || null,
    };
  });

  const expectedMobileNav = ["Home", "RADARMusic", "Motherland", "Market", "Media"];
  const isMobileNavExpected = viewport.width < 1024;
  const navLinksHaveTouchSize = layout.navLinkRects
    .filter((rect) => rect.width > 0)
    .every((rect) => rect.height >= 44);
  const initialNavPass =
    layout.hasHorizontalOverflow === false &&
    layout.bottomNavVisible === isMobileNavExpected &&
    (!isMobileNavExpected ||
      (layout.navLinkCount === 5 &&
        JSON.stringify(layout.navLinkLabels) === JSON.stringify(expectedMobileNav))) &&
    navLinksHaveTouchSize;

  let routePass = true;
  let routeDetails = "not-run";
  if (isMobileNavExpected) {
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "RADARMusic" })
      .click();
    await page.waitForLoadState("networkidle");
    const musicState = await page.evaluate(() => ({
      path: location.pathname,
      active:
        document
          .querySelector('nav[aria-label="Primary"] a[aria-current="page"]')
          ?.textContent?.trim() || null,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    }));
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Home" })
      .click();
    await page.waitForLoadState("networkidle");
    const homeState = await page.evaluate(() => ({
      path: location.pathname,
      active:
        document
          .querySelector('nav[aria-label="Primary"] a[aria-current="page"]')
          ?.textContent?.trim() || null,
    }));
    routePass =
      musicState.path === "/radarmusic" &&
      musicState.active === "RADARMusic" &&
      !musicState.overflow &&
      homeState.path === "/" &&
      homeState.active === "Home";
    routeDetails = { musicState, homeState };
  }

  results.push({
    name: viewport.name,
    size: `${viewport.width}x${viewport.height}`,
    initialNavPass,
    routePass,
    layout,
    routeDetails,
    consoleErrors,
  });
  await context.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
if (
  results.some(
    (result) => !result.initialNavPass || !result.routePass || result.consoleErrors.length > 0,
  )
)
  process.exit(1);
