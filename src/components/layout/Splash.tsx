import { useEffect, useState } from "react";
import { RadarMark } from "@/components/brand/Logo";

/**
 * First-paint splash. Fades out after the app is hydrated.
 * Static SSR fallback shows the mark centered on the background.
 */
export function Splash() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setFading(true), 650);
    const t2 = window.setTimeout(() => setGone(true), 1150);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={[
        "fixed inset-0 z-[100] grid place-items-center bg-background",
        "transition-opacity duration-500 ease-out",
        fading ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-radial-gold)" }}
      />
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative">
          <RadarMark size={72} animated />
          <span
            className="absolute inset-0 -z-10 animate-radar-pulse rounded-full"
            style={{ boxShadow: "0 0 0 1px var(--gold)" }}
          />
        </div>
        <div className="text-center">
          <p className="font-display text-xl font-semibold tracking-tight">
            RADAR<span className="text-gold">Me</span>
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            by RADARCharts
          </p>
        </div>
      </div>
    </div>
  );
}