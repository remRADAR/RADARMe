import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { MailCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/radar";
import { AuthLayout, FormError } from "@/components/auth/AuthLayout";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/verify")({
  head: () => ({
    meta: [
      { title: "Verify your email — RADARMe" },
      { name: "description", content: "Confirm your email to activate your RADARMe account." },
    ],
  }),
  component: VerifyRoute,
});

const LENGTH = 6;

function VerifyRoute() {
  const { session, hydrated, verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resentAt, setResentAt] = useState<number | null>(null);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  if (hydrated && !session) return <Navigate to="/auth/register" replace />;
  if (hydrated && session?.verified) return <Navigate to="/onboarding/profile" replace />;

  const complete = digits.every((d) => d !== "");

  function setAt(i: number, v: string) {
    const cleaned = v.replace(/\D/g, "").slice(0, 1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = cleaned;
      return next;
    });
    if (cleaned && i < LENGTH - 1) refs.current[i + 1]?.focus();
  }

  function onKey(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  function onPaste(e: ClipboardEvent<HTMLDivElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = Array(LENGTH).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    refs.current[Math.min(text.length, LENGTH - 1)]?.focus();
  }

  async function submit() {
    if (!complete) return;
    setError(null);
    setBusy(true);
    try {
      await verifyEmail();
      navigate({ to: "/onboarding/profile" });
    } catch {
      setError("That code didn't work. Try again.");
    } finally {
      setBusy(false);
    }
  }

  function resend() {
    setResentAt(Date.now());
  }

  return (
    <AuthLayout
      backTo="/auth/register"
      eyebrow="One more step"
      title={
        <>
          Verify your <span className="text-gold">email</span>
        </>
      }
      subtitle={
        <>
          We sent a 6-digit code to <span className="text-foreground">{session?.email}</span>. Enter
          it below to activate your account.
        </>
      }
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gold/10 text-gold hairline animate-in fade-in-0 zoom-in-95 duration-500">
            <MailCheck size={28} />
          </span>
        </div>

        <div className="flex justify-between gap-2" onPaste={onPaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              onFocus={(e) => e.currentTarget.select()}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              className={[
                "h-14 w-11 rounded-2xl bg-surface-2 text-center font-display text-xl font-semibold",
                "hairline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring",
                d
                  ? "text-foreground shadow-[inset_0_0_0_1px_var(--gold)]"
                  : "text-muted-foreground",
              ].join(" ")}
            />
          ))}
        </div>

        <FormError>{error}</FormError>

        <Button
          variant="gold"
          size="lg"
          className="w-full"
          disabled={!complete || busy}
          onClick={submit}
        >
          {busy ? (
            "Verifying…"
          ) : (
            <>
              Verify email <ArrowRight size={16} />
            </>
          )}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Didn't get it?{" "}
          <button type="button" onClick={resend} className="text-gold hover:underline">
            Resend code
          </button>
          {resentAt && (
            <span className="ml-2 text-[11px] text-muted-foreground/70 animate-in fade-in-0">
              Sent ✓
            </span>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
