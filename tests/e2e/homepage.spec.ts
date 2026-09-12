import { expect, test, type Page } from "@playwright/test";

async function removeWelcomeLayer(page: Page) {
  await page.locator(".framer-opening").evaluate((element) => element.remove());
}

test.describe("homepage Framer frame", () => {
  test("shows the welcome layer without a skip control and auto-dismisses it", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator(".framer-opening")).toBeVisible();
    await expect(page.locator(".framer-opening__skip")).toHaveCount(0);
    await expect(page.locator(".framer-opening")).toBeHidden({ timeout: 5_000 });
    await expect(page.locator(".framer-home-frame__hero")).toBeVisible();
  });

  test("renders the hero, wordmark, rails, and optimized ticker assets", async ({ page }) => {
    await page.goto("/");
    await removeWelcomeLayer(page);

    const hero = page.locator(".framer-home-frame__hero");
    await expect(hero).toBeVisible();
    await expect(hero.locator("picture.framer-home-frame__image source").first()).toHaveAttribute(
      "srcset",
      "/media/framer-home/shutter-hero.avif",
    );
    await expect(hero.locator("picture.framer-home-frame__image img")).toHaveJSProperty(
      "naturalWidth",
      4000,
    );
    await expect(page.locator(".framer-home-frame__artists--left")).toContainText("Makama");
    await expect(page.locator(".framer-home-frame__artists--right")).toContainText("Fresh");
    await expect(page.locator(".framer-home-frame__wordmark")).toHaveText("RADARCharts");
    await expect(page.locator(".framer-home-frame__index--left")).toHaveText("01");
    await expect(page.locator(".framer-home-frame__index--right")).toHaveText("05");

    const tickerImages = page.locator(".framer-home-frame__ticker-track img");
    await expect(tickerImages).toHaveCount(16);
    await expect(tickerImages.first()).toHaveAttribute(
      "src",
      "/media/framer-home/ticker-logo-01.webp",
    );
    await expect(tickerImages.first()).toHaveJSProperty("naturalWidth", 2000);
  });

  test("reports loaded hero and ticker assets with their selected formats", async ({ page }) => {
    await page.addInitScript(() => {
      window.__radarmeAssetEvents = [];
      window.addEventListener("radarme:asset", (event) => {
        window.__radarmeAssetEvents.push((event as CustomEvent).detail);
      });
    });
    await page.goto("/");
    await removeWelcomeLayer(page);
    await page.locator(".framer-home-frame__ticker").scrollIntoViewIfNeeded();
    await expect(page.locator(".framer-home-frame__ticker-track img").first()).toBeVisible();

    await expect
      .poll(() => page.evaluate(() => window.__radarmeAssetEvents.length))
      .toBeGreaterThan(1);
    const events = await page.evaluate(() => window.__radarmeAssetEvents);
    expect(events.some((event) => event.kind === "hero" && event.status === "loaded")).toBe(true);
    expect(events.some((event) => event.kind === "ticker" && event.status === "loaded")).toBe(true);
    expect(events.every((event) => event.url && event.selectedFormat)).toBe(true);
  });

  test("keeps the Framer frame inside the viewport on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await removeWelcomeLayer(page);

    const bounds = await page.locator(".framer-home-frame").evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, viewport: window.innerWidth };
    });

    expect(bounds.left).toBeGreaterThanOrEqual(0);
    expect(bounds.right).toBeLessThanOrEqual(bounds.viewport);
    await expect(page.locator(".framer-home-frame__wordmark")).toBeVisible();
    await expect(page.locator('nav[aria-label="Primary"]')).toBeVisible();
  });

  test("scrolls the ticker track continuously", async ({ page }) => {
    await page.goto("/");
    await removeWelcomeLayer(page);

    const track = page.locator(".framer-home-frame__ticker-track");
    await expect(track).toHaveCSS("animation-name", "framer-home-ticker");

    const initialTransform = await track.evaluate((element) => getComputedStyle(element).transform);
    await page.waitForTimeout(250);
    const laterTransform = await track.evaluate((element) => getComputedStyle(element).transform);

    expect(laterTransform).not.toBe(initialTransform);
  });
});
