import { chromium, devices } from "@playwright/test";

const base = process.env.RADARME_URL || "https://radarme.vercel.app";
const routes = ["/", "/radarmusic", "/hub/distribution", "/network/playlists", "/network/artists", "/network/magazine", "/intelligence"];
const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const requestContext = await browser.newContext();
const page = await requestContext.newPage();
const results = [];

async function fetchHeaders(path) {
  const response = await requestContext.request.get(`${base}${path}`, { timeout: 60000 });
  return { status: response.status(), contentType: response.headers()["content-type"] || "", cacheControl: response.headers()["cache-control"] || "" };
}

const resourcePaths = [
  "/manifest.webmanifest",
  "/icons/favicon-16.png",
  "/icons/favicon-32.png",
  "/icons/apple-touch-icon.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/media/radar-assets/release-vinyl.jpg",
  "/media/radar-assets/playlist-lagos-live.jpg",
  "/media/radar-assets/artist-spotlight.jpg",
  "/media/radar-assets/magazine-interview.jpg",
];
const resources = {};
for (const path of resourcePaths) resources[path] = await fetchHeaders(path);

const manifestResponse = await requestContext.request.get(`${base}/manifest.webmanifest`);
const manifest = await manifestResponse.json();

for (const route of routes) {
  const consoleErrors = [];
  const pageErrors = [];
  const routePage = await requestContext.newPage();
  routePage.on("console", (message) => message.type() === "error" && consoleErrors.push(message.text()));
  routePage.on("pageerror", (error) => pageErrors.push(error.message));
  const response = await routePage.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 60000 });
  const details = await routePage.evaluate(() => {
    const get = (selector, attr = "content") => document.querySelector(selector)?.getAttribute(attr) || null;
    const links = [...document.querySelectorAll("link")].map((link) => ({ rel: link.rel, href: link.href, type: link.type || null, sizes: link.getAttribute("sizes") }));
    const images = [...document.images].map((img) => ({ src: img.currentSrc || img.src, loaded: img.complete && img.naturalWidth > 0, alt: img.alt }));
    return {
      title: document.title,
      description: get('meta[name="description"]'),
      canonical: get('link[rel="canonical"]', "href"),
      themeColor: get('meta[name="theme-color"]'),
      ogTitle: get('meta[property="og:title"]'),
      ogDescription: get('meta[property="og:description"]'),
      ogType: get('meta[property="og:type"]'),
      ogUrl: get('meta[property="og:url"]'),
      ogImage: get('meta[property="og:image"]'),
      twitterCard: get('meta[name="twitter:card"]'),
      twitterTitle: get('meta[name="twitter:title"]'),
      twitterDescription: get('meta[name="twitter:description"]'),
      twitterImage: get('meta[name="twitter:image"]'),
      links,
      images,
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
    };
  });
  results.push({ route, status: response?.status() || null, ...details, consoleErrors, pageErrors });
  await routePage.close();
}

const mobileContext = await browser.newContext({ ...devices["iPhone 13"] });
const mobilePage = await mobileContext.newPage();
await mobilePage.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
const mobile = await mobilePage.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth + 1 }));
await mobileContext.close();
await requestContext.close();
await browser.close();

const report = { base, auditedAt: new Date().toISOString(), resources, manifest, mobile, routes: results };
console.log(JSON.stringify(report, null, 2));

const failures = [];
for (const [path, value] of Object.entries(resources)) if (value.status !== 200) failures.push(`${path}: HTTP ${value.status}`);
for (const route of results) {
  if (route.status !== 200) failures.push(`${route.route}: HTTP ${route.status}`);
  if (!route.title || !route.description) failures.push(`${route.route}: missing title or description`);
  if (route.consoleErrors.length || route.pageErrors.length) failures.push(`${route.route}: runtime errors`);
}
if (mobile.overflow) failures.push("mobile: horizontal overflow");
if (!results.some((route) => route.ogImage) || !results.some((route) => route.twitterImage)) failures.push("social previews: og:image and/or twitter:image missing");
if (failures.length) { console.error("AUDIT_FINDINGS", JSON.stringify(failures, null, 2)); process.exitCode = 1; }
