import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button, Input } from "@/components/radar";
import { AuthLayout, FieldLabel, FormError } from "@/components/auth/AuthLayout";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({
    meta: [
      { title: "Reset password — RADARMe" },
      { name: "description", content: "Reset your RADARMe password." },
    ],
  }),
  component: ForgotRoute,
});

function ForgotRoute() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.includes("@")) return setError("Enter a valid email address.");
    setBusy(true);
    try {
      await requestPasswordReset(email.trim());
      setSent(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      backTo="/auth/login"
      eyebrow="Reset access"
      title={sent ? <>Check your <span className="text-gold">inbox</span></> : "Forgot your password?"}
      subtitle={
        sent
          ? `We've sent a reset link to ${email}. It may take a minute to arrive.`
          : "We'll email a secure link to reset your RADARMe password."
      }
      footer={
        <>
          Remembered it?{" "}
          <Link to="/auth/login" className="text-gold hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-surface p-8 text-center hairline elev-1 animate-in fade-in-0 zoom-in-95 duration-500">
          <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
            <CheckCircle2 size={28} />
          </span>
          <p className="text-sm text-muted-foreground">
            Follow the link in the email to choose a new password.
          </p>
          <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
            Try another email
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              placeholder="you@artist.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leading={<Mail size={16} />}
            />
          </div>
          <FormError>{error}</FormError>
          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={busy}>
            {busy ? "Sending…" : (<>Send reset link <ArrowRight size={16} /></>)}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}