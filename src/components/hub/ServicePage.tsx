import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/**
 * ServicePage — shared layout wrapper for every RADARHub service module.
 *
 * Renders a consistent hero band (with a soft gold radial wash), a back link
 * to the RADARHub dashboard, and a padded content column beneath. Each
 * module route composes its own body inside `children`.
 */
export function ServicePage({
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
    <div className="-mx-4 pb-6 animate-page-in">
      <div className="relative overflow-hidden px-4 pb-6 pt-2">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-70"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        <div className="relative flex items-center gap-3">
          <Link
            to="/"
            aria-label="Back to RADARHub"
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
            <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {actions && <div className="relative mt-5 flex flex-wrap gap-2">{actions}</div>}
      </div>

      <div className="space-y-8 px-4 pt-2">{children}</div>
    </div>
  );
}

export function SectionHeader({
  title,
  hint,
  trailing,
}: {
  title: string;
  hint?: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <div>
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </h2>
        {hint && <p className="mt-1 text-[11px] text-muted-foreground/80">{hint}</p>}
      </div>
      {trailing}
    </div>
  );
}