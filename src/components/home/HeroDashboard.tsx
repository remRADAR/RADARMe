import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  TrendingUp,
  Megaphone,
  Trophy,
  Play,
  UploadCloud,
  ListMusic,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import skyline from "@/assets/radarcharts-skyline.webp.asset.json";

/**
 * HeroDashboard — ambient glass surface that occupies the top ~38% of the
 * viewport on mobile. Not a card: it blends into the background via a soft
 * radial glow, blurred hairline and cloud-like rounded shape. Content is
 * layered on top with fade + upward motion; stats count up on mount.
 */

function useCountUp(target: number, duration = 1200, decimals = 0) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return decimals === 0 ? Math.round(value) : Number(value.toFixed(decimals));
}

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function HeroDashboard() {
  const { session } = useAuth();
  const first = session?.profile?.displayName?.split(" ")[0] || "artist";
  const fullName = session?.profile?.displayName || "Your Artist Name";
  const role = session?.profile?.role || "Independent Artist";

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 5) return "Still up";
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const streams = useCountUp(128420, 1400);
  const growth = useCountUp(24.6, 1400, 1);
  const campaigns = useCountUp(3, 900);
  const achievements = useCountUp(7, 900);

  return (
    <section
      aria-label="Career overview"
      className="relative -mx-4 -mt-4 min-h-[42svh] overflow-hidden"
    >
      {/* Brand skyline background — RADARCharts stadium at golden hour */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src={skyline.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center animate-hero-drift-a"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Shade overlay — deepens the image so text/buttons stay readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--background) 55%, transparent) 0%, color-mix(in oklab, var(--background) 40%, transparent) 40%, color-mix(in oklab, var(--background) 78%, transparent) 78%, var(--background) 100%)",
          }}
        />
        {/* Gold warmth to tie image to brand */}
        <div
          className="absolute inset-0 opacity-60 mix-blend-soft-light"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        {/* Feather to page */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--background))",
          }}
        />
      </div>

      {/* Cloud-shaped glass surface — no visible card edges */}
      <div className="relative mx-4 pt-6">
        <div
          className="relative animate-hero-in rounded-[36px] px-5 pb-6 pt-6"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--surface) 55%, transparent), color-mix(in oklab, var(--surface) 20%, transparent))",
            backdropFilter: "blur(28px) saturate(150%)",
            boxShadow: "0 1px 0 0 oklch(1 0 0 / 0.06) inset, 0 30px 60px -30px oklch(0 0 0 / 0.55)",
            border: "1px solid oklch(1 0 0 / 0.05)",
          }}
        >
          {/* inner top glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 left-1/2 h-24 w-64 -translate-x-1/2 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, oklch(0.78 0.13 85 / 0.35), transparent 70%)",
            }}
          />

          {/* Greeting + identity */}
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {greeting}
            </p>
            <h1 className="mt-1.5 font-display text-[28px] font-semibold leading-tight tracking-tight sm:text-3xl">
              {greeting}, <span className="text-gold">{first}</span>
            </h1>
            <p className="mt-1 text-sm text-foreground/80">
              <span className="font-medium">{fullName}</span>
              <span className="text-muted-foreground"> · {role}</span>
            </p>
            <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed text-muted-foreground">
              Your career is trending upward this month. Momentum is building across three active
              campaigns.
            </p>
          </div>

          {/* Live stats — count up */}
          <div className="relative mt-5 grid grid-cols-2 gap-2.5">
            <HeroStat
              icon={<Play size={13} />}
              label="Monthly streams"
              value={formatCompact(streams)}
              trend={`+${growth.toFixed(1)}%`}
            />
            <HeroStat
              icon={<TrendingUp size={13} />}
              label="Growth"
              value={`${growth.toFixed(1)}%`}
              trend="30d"
            />
            <HeroStat
              icon={<Megaphone size={13} />}
              label="Active campaigns"
              value={String(campaigns)}
              trend="running"
            />
            <HeroStat
              icon={<Trophy size={13} />}
              label="Achievements"
              value={String(achievements)}
              trend="this quarter"
            />
          </div>

          {/* AI insight preview */}
          <Link
            to="/intelligence"
            className="group relative mt-4 flex items-start gap-3 rounded-2xl bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] p-3 hairline transition-colors hover:bg-surface-2"
          >
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/90 text-gold-foreground shadow-[0_0_0_6px_oklch(0.78_0.13_85/0.12)]"
            >
              <Sparkles size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                  RADAR Intelligence
                </span>
              </div>
              <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-foreground/90">
                Your listeners in Lagos grew <span className="text-gold">+38%</span> this week — a
                great moment to pitch a local playlist.
              </p>
            </div>
            <ArrowUpRight
              size={16}
              className="mt-1 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          {/* Quick actions */}
          <div className="relative mt-4 flex flex-wrap gap-2">
            <QuickPill to="/hub/distribution" icon={<UploadCloud size={13} />}>
              Release music
            </QuickPill>
            <QuickPill to="/hub/playlist-pitch" icon={<ListMusic size={13} />}>
              Pitch playlist
            </QuickPill>
            <QuickPill to="/intelligence" icon={<Sparkles size={13} />} gold>
              Ask AI
            </QuickPill>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-3"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--surface-2) 70%, transparent), color-mix(in oklab, var(--surface) 40%, transparent))",
        border: "1px solid oklch(1 0 0 / 0.04)",
      }}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-surface-2 text-gold">
          {icon}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="font-display text-xl font-semibold tabular-nums">{value}</span>
        <span className="text-[10px] text-gold">{trend}</span>
      </div>
    </div>
  );
}

function QuickPill({
  to,
  icon,
  gold,
  children,
}: {
  to: "/hub/distribution" | "/hub/playlist-pitch" | "/intelligence";
  icon: React.ReactNode;
  gold?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-transform active:scale-95",
        gold
          ? "bg-gold text-gold-foreground ring-gold"
          : "bg-surface-2 text-foreground hairline hover:bg-[var(--surface-3)]",
      ].join(" ")}
    >
      {icon}
      {children}
    </Link>
  );
}
