export function registerRadarMeServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  const register = () => {
    void navigator.serviceWorker
      .register("/radarme-sw.js", { scope: "/", updateViaCache: "none" })
      .catch(() => {
        // Offline caching is an enhancement; a registration failure must not affect the app.
      });
  };

  const idleWindow = window as Window & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  };

  if (idleWindow.requestIdleCallback) {
    idleWindow.requestIdleCallback(register, { timeout: 2500 });
  } else {
    window.setTimeout(register, 1);
  }
}
