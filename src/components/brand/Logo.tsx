import { cn } from "@/lib/utils";
import radarmeLogo from "@/assets/radarme-official.webp.asset.json";

type Props = {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  animated?: boolean;
};

/**
 * RADARMe brand mark. Pure SVG so it inherits `currentColor` for the
 * wordmark and uses the gold token for the accent. Swap for the official
 * supplied logo asset later without touching call sites.
 */
export function Logo({ className, size = 28, showWordmark = true, animated = false }: Props) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <RadarMark size={size} animated={animated} />
      {showWordmark && (
        <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-foreground">
          RADAR<span className="text-gold">Me</span>
        </span>
      )}
    </div>
  );
}

export function RadarMark({ size = 28, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <span
      aria-hidden
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <img
        src={radarmeLogo.url}
        alt="RADARMe"
        width={size}
        height={size}
        draggable={false}
        className="h-full w-full object-contain select-none"
        style={{ imageRendering: "auto" }}
      />
      {animated && (
        <span
          className="pointer-events-none absolute inset-0 origin-center animate-radar-sweep"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--gold) 30deg, transparent 60deg, transparent 360deg)",
            maskImage: "radial-gradient(circle, black 0 45%, transparent 60%)",
            WebkitMaskImage: "radial-gradient(circle, black 0 45%, transparent 60%)",
            opacity: 0.35,
            borderRadius: "9999px",
          }}
        />
      )}
    </span>
  );
}