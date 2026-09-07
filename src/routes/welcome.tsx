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
          <div className="relative animate-in fade-in-0 zoom-in-95 duration-700">
            <RadarMark size={112} animated />
            <span
              aria-hidden
              className="absolute inset-0 -z-10 animate-radar-pulse rounded-full"
              style={{ boxShadow: "0 0 60px 8px color-mix(in oklab, var(--gold) 25%, transparent)" }}
            />
          </div>

          <p
            className="mt-8 text-[11px] uppercase tracking-[0.32em] text-gold animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
            style={{ animationDelay: "120ms", animationFillMode: "backwards" }}
          >
            by RADARCharts
          </p>
          <h1
            className="mt-3 font-display text-[42px] font-semibold leading-[1.05] tracking-tight animate-in fade-in-0 slide-in-from-bottom-3 duration-700"
            style={{ animationDelay: "220ms", animationFillMode: "backwards" }}
          >
            RADAR<span className="text-gold">Me</span>
          </h1>
          <p
            className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "320ms", animationFillMode: "backwards" }}
          >
            The operating system for the modern music artist. Signals, growth
            and community — engineered around your career.
          </p>
        </div>

        <div
          className="mt-6 space-y-3 animate-in fade-in-0 slide-in-from-bottom-6 duration-700"
          style={{ animationDelay: "460ms", animationFillMode: "backwards" }}
        >
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
            By continuing you agree to the RADARCharts Terms and acknowledge
            our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}