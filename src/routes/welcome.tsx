import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/radar";
import { RadarMark } from "@/components/brand/Logo";
import { useAuth, isOnboarded } from "@/lib/auth";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome — RADARMe" },
      {
        name: "description",
        content: "Welcome to RADARMe — the artist operating system by RADARCharts.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const { session, hydrated } = useAuth();
  if (hydrated && isOnboarded(session)) return <Navigate to="/" replace />;

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-radial-gold)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
      />

      <div
        className="mx-auto flex w-full max-w-md flex-1 flex-col px-6"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 48px)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 28px)",
        }}
      >
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="relative">
            <RadarMark size={112} />
            <span
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                boxShadow: "0 0 60px 8px color-mix(in oklab, var(--gold) 25%, transparent)",
              }}
            />
          </div>

          <p className="mt-8 text-[11px] uppercase tracking-[0.32em] text-gold">by RADARCharts</p>
          <h1 className="mt-3 font-display text-[42px] font-semibold leading-[1.05] tracking-tight">
            RADAR<span className="text-gold">Me</span>
          </h1>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
            The operating system for the modern music artist. Signals, growth and community —
            engineered around your career.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Button asChild variant="gold" size="lg" className="w-full">
            <Link to="/auth/register">
              <Sparkles size={16} /> Create your account
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full">
            <Link to="/auth/login">
              Sign in <ArrowRight size={16} />
            </Link>
          </Button>
          <p className="pt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            By continuing you agree to the RADARCharts Terms and acknowledge our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
