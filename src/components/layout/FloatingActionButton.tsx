import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

/**
 * RADAR Intelligence FAB. Sits above the bottom nav, respects safe area.
 */
export function FloatingActionButton() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 88px)" }}
    >
      <Link
        to="/intelligence"
        aria-label="RADAR Intelligence"
        className={[
          "pointer-events-auto group relative inline-flex h-14 items-center gap-2 rounded-full",
          "bg-gold px-5 text-sm font-semibold text-gold-foreground",
          "shadow-[0_10px_30px_-8px_oklch(0.78_0.13_85/0.55)]",
          "transition-transform duration-200 ease-out",
          "hover:brightness-110 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ].join(" ")}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-60 animate-radar-pulse"
          style={{ boxShadow: "0 0 0 1px var(--gold)" }}
        />
        <Sparkles size={18} className="relative" />
        <span className="relative">RADAR Intelligence</span>
      </Link>
    </div>
  );
}