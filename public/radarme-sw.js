const CACHE_NAME = "radarme-app-v6";
const STATIC_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/backgrounds/main-bg.webp",
  "/media/welcome/remradar-opening-poster.jpg",
  "/media/welcome/remradar-opening-lite.webm",
  "/media/framer-home/shutter-hero.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !STATIC_ASSETS.includes(url.pathname)) return;

  const isDocument = url.pathname === "/" || url.pathname === "/manifest.webmanifest";
  if (isDocument) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put(url.pathname, copy));
          return response;
        })
        .catch(() => caches.match(url.pathname)),
    );
    return;
  }

  event.respondWith(
    caches
      .match(url.pathname)
      .then((cached) => cached || fetch(event.request))
      .catch(() => caches.match(url.pathname)),
  );
});
