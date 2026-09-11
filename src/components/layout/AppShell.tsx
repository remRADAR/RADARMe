import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { BottomNav } from "./BottomNav";

/**
 * Canvas-first application frame. Authentication and onboarding retain their
 * focused layouts; the primary product experience uses floating glass chrome.
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
      <main
        className={isImmersive ? "w-full" : "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8"}
        style={{
          paddingBottom: isImmersive
            ? "env(safe-area-inset-bottom)"
            : "calc(env(safe-area-inset-bottom) + 112px)",
        }}
      >
        {children}
      </main>
      {!isImmersive && <BottomNav />}
    </div>
  );
}
