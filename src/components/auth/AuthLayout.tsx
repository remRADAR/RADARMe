import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { RadarMark } from "@/components/brand/Logo";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  backTo?: string;
  showLogo?: boolean;
};

/**
 * Immersive shell used by every welcome / auth / onboarding screen.
 * No top bar, no bottom nav — just a centered column with the mark and
 * a soft radial gold wash for depth.
 */
export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  backTo,
  showLogo = true,
}: Props) {
  return (
    <div className="relative min-h-[100dvh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{ background: "var(--gradient-radial-gold)" }}
      />
      <div
        className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 20px)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)",
        }}
      >
        <div className="flex items-center justify-between">
          {backTo ? (
            <Link
              to={backTo}
              className="inline-flex h-11 w-11 -ml-2 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors active:scale-95"
              aria-label="Back"
            >
              <ChevronLeft size={20} />
            </Link>
          ) : (
            <span className="h-11 w-11" />
          )}
          {showLogo && <RadarMark size={28} />}
          <span className="h-11 w-11" />
        </div>

        <div className="mt-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
          {eyebrow && (
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
          )}
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="mt-8 flex-1 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          {children}
        </div>

        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </label>
  );
}

export function FormError({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-2 text-xs text-destructive animate-in fade-in-0 duration-200">
      {children}
    </p>
  );
}
