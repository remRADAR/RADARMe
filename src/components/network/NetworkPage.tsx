import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/**
 * NetworkPage — editorial layout wrapper for RADARNetwork sub-surfaces.
 * Content-first, magazine feel: generous type, restrained motion.
 */
export function NetworkPage({
  eyebrow,
  title,
  kicker,
  icon,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  kicker: string;
  icon: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="-mx-4 pb-6 animate-page-in">
      <div className="relative overflow-hidden px-4 pb-6 pt-2">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full opacity-60"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        <div className="relative flex items-center gap-3">
          <Link
            to="/network"
            aria-label="Back to RADARNetwork"
            className="grid h-11 w-11 place-items-center rounded-full bg-surface-2 text-muted-foreground hover:text-foreground hairline transition-[color,background-color,transform] duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft size={18} />
          </Link>
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {eyebrow}
          </span>
        </div>

        <div className="relative mt-6 flex items-start gap-4 animate-hero-in">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface-2 text-gold hairline">
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-[32px] font-semibold leading-[1.05] tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {kicker}
            </p>
          </div>
        </div>

        {actions && <div className="relative mt-5 flex flex-wrap gap-2">{actions}</div>}
      </div>

      <div className="space-y-8 px-4 pt-2">{children}</div>
    </div>
  );
}

export function EditorialSection({
  title,
  hint,
  trailing,
  children,
}: {
  title: string;
  hint?: string;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {title}
          </h2>
          {hint && <p className="mt-1 text-[11px] text-muted-foreground/80">{hint}</p>}
        </div>
        {trailing}
      </div>
      {children}
    </section>
  );
}

/** Editorial cover using a deterministic gradient — no external images required. */
export function Cover({
  seed,
  label,
  aspect = "4/5",
}: {
  seed: string;
  label?: string;
  aspect?: string;
}) {
  // Cheap deterministic hue from seed
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: aspect }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, oklch(0.28 0.08 ${h}) 0%, oklch(0.18 0.04 ${(h + 40) % 360}) 60%, oklch(0.12 0 0) 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(60% 60% at 30% 20%, oklch(0.78 0.13 ${(h + 20) % 360} / 0.4), transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      {label && (
        <span className="absolute bottom-2 left-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}