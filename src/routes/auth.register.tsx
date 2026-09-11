import { useState, type FormEvent } from "react";
import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { Button, Input } from "@/components/radar";
import { AuthLayout, FieldLabel, FormError } from "@/components/auth/AuthLayout";
import { useAuth, isOnboarded } from "@/lib/auth";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title: "Create your account — RADARMe" },
      { name: "description", content: "Start your RADARMe account and unlock your artist OS." },
    ],
  }),
  component: RegisterRoute,
});

function scorePassword(p: string): { score: number; label: string } {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  const label = ["Too short", "Weak", "Okay", "Strong", "Excellent"][s];
  return { score: s, label };
}

function RegisterRoute() {
  const { signUp, session, hydrated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (hydrated && isOnboarded(session)) return <Navigate to="/" replace />;

  const strength = scorePassword(password);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.includes("@")) return setError("Enter a valid email address.");
    if (password.length < 8) return setError("Use at least 8 characters for your password.");
    if (!agree) return setError("Please accept the terms to continue.");
    setBusy(true);
    try {
      await signUp(email.trim(), password);
      navigate({ to: "/auth/verify" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      backTo="/welcome"
      eyebrow="Join RADARMe"
      title={
        <>
          Create your <span className="text-gold">artist</span> account
        </>
      }
      subtitle="Your career, on radar."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/auth/login" className="text-gold hover:underline">
            Sign in
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
          <FieldLabel>Password</FieldLabel>
          <Input
            type={show ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
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
          <div className="mt-2 flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-1 flex-1 rounded-full bg-surface-2 transition-colors duration-300"
                  style={{
                    background:
                      i < strength.score
                        ? strength.score >= 3
                          ? "var(--gold)"
                          : "color-mix(in oklab, var(--gold) 55%, var(--surface-2))"
                        : undefined,
                  }}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">
              {password ? strength.label : ""}
            </span>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-surface-2/60 p-3 hairline">
          <span
            className={[
              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md transition-colors",
              agree ? "bg-gold text-gold-foreground" : "bg-surface hairline",
            ].join(" ")}
          >
            {agree && <Check size={14} strokeWidth={3} />}
          </span>
          <input
            type="checkbox"
            className="sr-only"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span className="text-[12px] leading-relaxed text-muted-foreground">
            I agree to the <span className="text-foreground">Terms</span> and{" "}
            <span className="text-foreground">Privacy Policy</span>.
          </span>
        </label>

        <FormError>{error}</FormError>
        <Button type="submit" variant="gold" size="lg" className="mt-2 w-full" disabled={busy}>
          {busy ? (
            "Creating account…"
          ) : (
            <>
              Continue <ArrowRight size={16} />
            </>
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
