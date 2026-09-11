import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";

/**
 * IntelPage — immersive layout for RADAR Intelligence sub-surfaces.
 * Full-bleed, dark, gold-warmed atmosphere. Chrome is hidden by AppShell
 * for anything under /intelligence.
 */
export function IntelPage({
  eyebrow,
  title,
  kicker,
  icon,
  actions,
  children,
  hideBack,
}: {
  eyebrow: string;
  title: string;
  kicker?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  hideBack?: boolean;
}) {
  return (
    <div className="relative min-h-dvh animate-page-in">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] overflow-hidden"
      >
        <div
          className="absolute -left-24 -top-24 h-[380px] w-[380px] rounded-full opacity-60 blur-3xl animate-hero-drift-a"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        <div
          className="absolute -right-24 top-16 h-[320px] w-[320px] rounded-full opacity-40 blur-3xl animate-hero-drift-b"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, oklch(0.7 0.05 240 / 0.35), transparent 70%)",
          }}
        />
      </div>

      <header
        className="relative mx-auto flex max-w-screen-md items-center justify-between px-4"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
      >
        <Link
          to={hideBack ? "/" : "/intelligence"}
          aria-label={hideBack ? "Exit RADAR Intelligence" : "Back to Intelligence"}
          className="grid h-11 w-11 place-items-center rounded-full bg-surface-2 text-muted-foreground hover:text-foreground hairline transition-[color,background-color,transform] duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-gold" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            RADAR Intelligence
          </span>
        </div>
        <span aria-hidden className="h-11 w-11" />
      </header>

      <div className="relative mx-auto max-w-screen-md px-4 pt-6 pb-32">
        <div className="flex items-start gap-4 animate-hero-in">
          {icon && (
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface-2 text-gold hairline">
              {icon}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {eyebrow}
            </p>
            <h1 className="mt-1 font-display text-[32px] font-semibold leading-[1.05] tracking-tight sm:text-4xl">
              {title}
            </h1>
            {kicker && (
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {kicker}
              </p>
            )}
          </div>
        </div>

        {actions && <div className="mt-5 flex flex-wrap gap-2">{actions}</div>}

        <div className="mt-8 space-y-6">{children}</div>
      </div>
    </div>
  );
}
