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
    await expect(hero.locator("img.framer-home-frame__image")).toHaveAttribute(
      "src",
      "/media/framer-home/shutter-hero.jpg",
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
