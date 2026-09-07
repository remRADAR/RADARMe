import { useState, type FormEvent } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { AtSign, User, ArrowRight } from "lucide-react";
import { Button, Input } from "@/components/radar";
import { AuthLayout, FieldLabel, FormError } from "@/components/auth/AuthLayout";
import { OnboardingProgress } from "@/components/auth/OnboardingProgress";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/onboarding/profile")({
  head: () => ({
    meta: [
      { title: "Create your profile — RADARMe" },
      { name: "description", content: "Set up your RADARMe artist profile." },
    ],
  }),
  component: ProfileRoute,
});

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
}

function ProfileRoute() {
  const { session, hydrated, saveProfile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(session?.profile?.displayName ?? "");
  const [username, setUsername] = useState(session?.profile?.username ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (hydrated && !session) return <Navigate to="/welcome" replace />;
  if (hydrated && session && !session.verified) return <Navigate to="/auth/verify" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (displayName.trim().length < 2) return setError("Your artist name needs at least 2 characters.");
    const uname = username.trim().toLowerCase();
    if (!/^[a-z0-9_.]{3,24}$/.test(uname))
      return setError("Username must be 3–24 chars — letters, numbers, . or _");
    setBusy(true);
    try {
      await saveProfile({ displayName: displayName.trim(), username: uname });
      navigate({ to: "/onboarding/artist" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      backTo="/auth/verify"
      eyebrow="Step 1 of 2"
      title={<>Create your <span className="text-gold">profile</span></>}
      subtitle="How the RADARNetwork will find and recognise you."
    >
      <div className="mb-6">
        <OnboardingProgress step={1} total={2} />
      </div>

      <div className="mb-6 flex flex-col items-center">
        <div
          className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-surface-2 hairline"
          aria-hidden
        >
          <span
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{ background: "var(--gradient-radial-gold)" }}
          />
          <span className="relative font-display text-3xl font-semibold text-foreground">
            {initials(displayName) || <User size={28} className="text-muted-foreground" />}
          </span>
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Avatar preview
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <FieldLabel>Artist name</FieldLabel>
          <Input
            autoComplete="name"
            placeholder="e.g. Nova Rain"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            leading={<User size={16} />}
          />
        </div>
        <div>
          <FieldLabel>Username</FieldLabel>
          <Input
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="novarain"
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ""))}
            leading={<AtSign size={16} />}
          />
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            radarme.app/<span className="text-foreground">{username || "yourname"}</span>
          </p>
        </div>
        <FormError>{error}</FormError>
        <Button type="submit" variant="gold" size="lg" className="mt-2 w-full" disabled={busy}>
          {busy ? "Saving…" : (<>Continue <ArrowRight size={16} /></>)}
        </Button>
      </form>
    </AuthLayout>
  );
}