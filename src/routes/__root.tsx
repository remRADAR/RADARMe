import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { ThemeProvider } from "../lib/theme";
import { AuthProvider } from "../lib/auth";
import { registerRadarMeServiceWorker } from "../lib/register-service-worker";
import { AppShell } from "../components/layout/AppShell";
import { FramerOpening } from "../components/opening/FramerOpening";
import { ErrorBoundary } from "../components/ErrorBoundary";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("[RADARMe] Root route error", error);
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn&apos;t load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Preserve arbitrary query parameters used by previews, E2E checks, and integrations.
  validateSearch: (search) => search,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
      },
      { title: "RADARMe: The iNDUSTRYKit" },
      {
        name: "description",
        content:
          "RADARMe: The iNDUSTRYKit — the premium operating system for music artists by RADARCharts.",
      },
      { name: "author", content: "RADARCharts by REM" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "RADARMe: The iNDUSTRYKit" },
      { property: "og:title", content: "RADARMe: The iNDUSTRYKit" },
      {
        property: "og:description",
        content: "The premium operating system for music artists by RADARCharts.",
      },
      { property: "og:url", content: "https://radarme.vercel.app/" },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://radarme.vercel.app/media/radar-assets/magazine-interview.jpg",
      },
      { property: "og:image:alt", content: "RADARMe artist interview in a recording studio" },
      { property: "og:image:width", content: "1600" },
      { property: "og:image:height", content: "900" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "RADARMe: The iNDUSTRYKit" },
      {
        name: "twitter:description",
        content: "The premium operating system for music artists by RADARCharts.",
      },
      {
        name: "twitter:image",
        content: "https://radarme.vercel.app/media/radar-assets/magazine-interview.jpg",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap",
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "canonical", href: "https://radarme.vercel.app/" },
      { rel: "icon", href: "/icons/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/icons/favicon-16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [openingComplete, setOpeningComplete] = useState(pathname !== "/");
  const completeOpening = useCallback(() => setOpeningComplete(true), []);

  useEffect(() => {
    registerRadarMeServiceWorker();
  }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Home") return;
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      )
        return;
      event.preventDefault();
      void router.navigate({ to: "/" });
    };
    const preventPinchZoom = (event: TouchEvent) => {
      if (event.touches.length > 1) event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("touchmove", preventPinchZoom, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchmove", preventPinchZoom);
    };
  }, [router]);

  const showOpening = pathname === "/" && !openingComplete;
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <AppShell>
              <div key={pathname} className="route-transition">
                <Outlet />
              </div>
            </AppShell>
            {showOpening && <FramerOpening onComplete={completeOpening} />}
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
