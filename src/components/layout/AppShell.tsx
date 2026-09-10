import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { FloatingActionButton } from "./FloatingActionButton";

/**
 * Global app frame. Mobile-first, expands to a centered column on tablet+.
 * Chrome (top bar, bottom nav, FAB) is hidden on the intelligence route
 * because that surface is intended to feel fullscreen.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isImmersive =
    pathname.startsWith("/intelligence") ||
    pathname.startsWith("/welcome") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/onboarding");

  return (
    <div className="relative min-h-dvh bg-transparent text-foreground">
      {!isImmersive && <TopBar />}
      <main
        className={isImmersive ? "w-full" : "mx-auto w-full max-w-screen-md px-4 pt-4"}
        style={{
          paddingBottom: isImmersive
            ? "env(safe-area-inset-bottom)"
            : "calc(env(safe-area-inset-bottom) + 120px)",
        }}
      >
        {children}
      </main>
      {!isImmersive && (
        <>
          <FloatingActionButton />
          <BottomNav />
        </>
      )}
    </div>
  );
}
