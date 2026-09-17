import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/**
 * MotherPage — shared layout wrapper for every MOTHERLand sub-surface.
 * Softer motion, warmer highlights, welcoming atmosphere. Mirrors
 * ServicePage in structure so navigation feels continuous.
 */
export function MotherPage({
  eyebrow,
  title,
  description,
  icon,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="motherland-scope -mx-4 pb-6 animate-page-in">
      <div className="relative overflow-hidden px-4 pb-7 pt-2 sm:px-6">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-72 animate-bloom-drift"
          style={{ background: "var(--gradient-rose-wash)" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-20 top-8 h-52 w-52 rounded-full opacity-70"
          style={{ background: "var(--gradient-rose-soft)" }}
        />
        <div className="relative flex items-center gap-3">
          <Link
            to="/motherland"
            aria-label="Back to MOTHERLand"
            className="grid h-11 w-11 place-items-center rounded-full bg-surface-2 text-muted-foreground hover:text-foreground hairline transition-[color,background-color,transform] duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft size={18} />
          </Link>
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {eyebrow}
          </span>
        </div>

        <div className="relative mt-6 flex items-start gap-4 animate-bloom-in">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-soft text-rose hairline">
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-[clamp(2rem,7vw,2.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              {title}
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {actions && <div className="relative mt-5 flex flex-wrap gap-2">{actions}</div>}
      </div>

      <div className="motherland-scope space-y-8 px-4 pt-2 sm:px-6">{children}</div>
    </div>
  );
}

export function MotherSection({
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

export function Avatar({
  name,
  tone = "rose",
}: {
  name: string;
  tone?: "rose" | "bloom" | "neutral";
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const bg =
    tone === "rose"
      ? "bg-rose-soft text-rose"
      : tone === "bloom"
        ? "bg-surface-3 text-foreground"
        : "bg-surface-2 text-muted-foreground";
  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-xs font-semibold hairline ${bg}`}
      aria-hidden
    >
      {initials}
    </span>
  );
}
