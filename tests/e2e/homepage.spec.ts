import { expect, test, type Page } from "@playwright/test";

async function removeWelcomeLayer(page: Page) {
  await page.evaluate(() => sessionStorage.setItem("radarme_welcome_seen", "true"));
  await page.reload();
  await expect(page.locator(".framer-home-frame")).toBeVisible();
}

test.describe("homepage Framer frame", () => {
  test("shows the welcome layer without a skip control and auto-dismisses it", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const opening = page.locator(".framer-opening");
    if (await opening.count()) {
      await expect(opening).toBeVisible();
      await expect(page.locator(".framer-opening__skip")).toHaveCount(0);
      await expect(opening).toBeHidden({ timeout: 5_000 });
    }
    await expect(page.locator(".framer-home-frame__hero")).toBeVisible();
  });

  test("renders the HD Drive image hero, brand band, and ticker assets", async ({ page }) => {
    await page.goto("/");
    await removeWelcomeLayer(page);

    const hero = page.locator(".framer-home-frame__hero");
    await expect(hero).toBeVisible();
    await expect(hero.locator("figure.framer-home-frame__image img")).toHaveCount(2);
    await expect(hero.locator("figure.framer-home-frame__image img").first()).toHaveJSProperty(
      "naturalWidth",
      1080,
    );
    await expect(page.locator(".framer-home-frame__artists")).toHaveCount(0);
    await expect(page.locator(".framer-home-frame__index")).toHaveCount(0);
    await expect(page.locator(".framer-home-frame__hero-cue")).toHaveCount(0);
    await expect(page.locator(".framer-home-frame__brand-band")).toContainText(
      "RADARMe / artist-first",
    );

    const tickerImages = page.locator(".framer-home-frame__ticker-track img");
    await expect(tickerImages).toHaveCount(16);
    await expect(tickerImages.first()).toHaveAttribute(
      "src",
      "/media/framer-home/ticker-logo-01.png",
    );
    await expect(tickerImages.first()).toHaveJSProperty("naturalWidth", 2000);
  });

  test("keeps the Framer hero, title, and ticker together in the first frame", async ({ page }) => {
    await page.goto("/");
    await removeWelcomeLayer(page);

    const layout = await page.evaluate(() => {
      const frame = document.querySelector<HTMLElement>(".framer-home-frame");
      const brand = document.querySelector<HTMLElement>(".framer-home-frame__brand-band");
      const ticker = document.querySelector<HTMLElement>(".framer-home-frame__ticker");
      return {
        frameHeight: frame?.getBoundingClientRect().height ?? 0,
        viewportHeight: window.innerHeight,
        titleToTickerGap:
          (ticker?.getBoundingClientRect().top ?? 0) - (brand?.getBoundingClientRect().bottom ?? 0),
        brandBottomPadding: brand ? Number.parseFloat(getComputedStyle(brand).paddingBottom) : 999,
      };
    });

    expect(layout.frameHeight).toBeGreaterThanOrEqual(layout.viewportHeight);
    expect(layout.titleToTickerGap).toBe(0);
    expect(layout.brandBottomPadding).toBeLessThanOrEqual(24);
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

  test("precaches the original Framer hero asset for offline loading", async ({
    page,
    context,
  }) => {
    await page.goto("/");

    const cacheState = await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.ready;
      const cache = await caches.open("radarme-app-v5");
      const assets = await Promise.all(
        ["/media/framer-home/shutter-hero.jpg", "/backgrounds/main-bg.webp"].map(async (url) =>
          Boolean(await cache.match(url)),
        ),
      );
      return {
        activeWorker: registration.active?.scriptURL,
        assets,
      };
    });

    expect(cacheState.activeWorker).toContain("/radarme-sw.js");
    expect(cacheState.assets).toEqual([true, true]);

    await context.setOffline(true);
    const offlineAssets = await page.evaluate(async () => {
      const responses = await Promise.all([fetch("/media/framer-home/shutter-hero.jpg")]);
      return responses.map((response) => ({ ok: response.ok, status: response.status }));
    });
    await context.setOffline(false);

    expect(offlineAssets).toEqual([{ ok: true, status: 200 }]);
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
    await expect(page.locator(".framer-home-frame__brand-band")).toBeVisible();
    await expect(page.locator('nav[aria-label="Primary"]')).toBeVisible();
  });

  test("scrolls the ticker track continuously", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await removeWelcomeLayer(page);

    const track = page.locator(".framer-home-frame__ticker-track");
    const reducedMotion = await page.evaluate(
      () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    if (reducedMotion) {
      await expect(track).toHaveCSS("animation-name", "none");
    } else {
      await expect(track).toHaveCSS("animation-name", "framer-home-ticker");
      await expect
        .poll(() => track.evaluate((element) => getComputedStyle(element).transform))
        .not.toBe("matrix(1, 0, 0, 1, 0, 0)");
    }
  });
});
