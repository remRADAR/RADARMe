import { useState, type FormEvent } from "react";
import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button, Input } from "@/components/radar";
import { AuthLayout, FieldLabel, FormError } from "@/components/auth/AuthLayout";
import { useAuth, isOnboarded } from "@/lib/auth";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign in — RADARMe" },
      { name: "description", content: "Sign in to RADARMe to access your artist operating system." },
    ],
  }),
  component: LoginRoute,
});

function LoginRoute() {
  const { signIn, session, hydrated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (hydrated && isOnboarded(session)) return <Navigate to="/" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.includes("@")) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setBusy(true);
    try {
      const s = await signIn(email.trim(), password);
      if (!s.verified) navigate({ to: "/auth/verify" });
      else if (!s.profile) navigate({ to: "/onboarding/profile" });
      else if (!s.onboardedAt) navigate({ to: "/onboarding/artist" });
      else navigate({ to: "/" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      backTo="/welcome"
      eyebrow="Welcome back"
      title={<>Sign in to <span className="text-gold">RADARMe</span></>}
      subtitle="Pick up right where you left off."
      footer={
        <>
          New here?{" "}
          <Link to="/auth/register" className="text-gold hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="you@artist.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leading={<Mail size={16} />}
          />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <FieldLabel>Password</FieldLabel>
            <Link
              to="/auth/forgot"
              className="mb-1.5 text-[11px] font-medium text-gold hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <Input
            type={show ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leading={<Lock size={16} />}
            trailing={
              <button
                type="button"
                aria-label={show ? "Hide password" : "Show password"}
                onClick={() => setShow((v) => !v)}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-foreground active:scale-95"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
        </div>
        <FormError>{error}</FormError>
        <Button type="submit" variant="gold" size="lg" className="mt-2 w-full" disabled={busy}>
          {busy ? "Signing in…" : (<>Sign in <ArrowRight size={16} /></>)}
        </Button>
      </form>
    </AuthLayout>
  );
}