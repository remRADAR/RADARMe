export type HomepageAssetKind = "hero" | "ticker";
export type HomepageAssetStatus = "loaded" | "error";

export type HomepageAssetEvent = {
  assetId: string;
  kind: HomepageAssetKind;
  status: HomepageAssetStatus;
  url: string;
  selectedFormat: string;
  fallback: boolean;
  route: string;
  userAgent: string;
  timestamp: string;
};

type AssetMonitorWindow = Window & {
  __radarmeAssetMonitor?: (event: HomepageAssetEvent) => void;
};

function selectedFormat(url: string) {
  const extension = url.split("?")[0]?.split(".").pop()?.toLowerCase();
  return extension || "unknown";
}

function publish(event: HomepageAssetEvent) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent<HomepageAssetEvent>("radarme:asset", { detail: event }));
  (window as AssetMonitorWindow).__radarmeAssetMonitor?.(event);

  if (event.status === "error") {
    console.warn("[RADARMe] Homepage asset failed to load", event);
  }
}

export function reportHomepageAssetLoad({
  assetId,
  kind,
  image,
  preferredFormat = "avif",
}: {
  assetId: string;
  kind: HomepageAssetKind;
  image: HTMLImageElement;
  preferredFormat?: string;
}) {
  const url = image.currentSrc || image.src;
  publish({
    assetId,
    kind,
    status: "loaded",
    url,
    selectedFormat: selectedFormat(url),
    fallback: selectedFormat(url) !== preferredFormat,
    route: window.location.pathname,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  });
}

export function reportHomepageAssetError({
  assetId,
  kind,
  image,
  preferredFormat = "avif",
}: {
  assetId: string;
  kind: HomepageAssetKind;
  image: HTMLImageElement;
  preferredFormat?: string;
}) {
  const url = image.currentSrc || image.src;
  publish({
    assetId,
    kind,
    status: "error",
    url,
    selectedFormat: selectedFormat(url),
    fallback: selectedFormat(url) !== preferredFormat,
    route: window.location.pathname,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  });
}
