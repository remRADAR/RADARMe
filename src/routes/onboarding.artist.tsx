import { useState } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { MapPin, Sparkles, Check } from "lucide-react";
import { Button, Input } from "@/components/radar";
import { AuthLayout, FieldLabel, FormError } from "@/components/auth/AuthLayout";
import { OnboardingProgress } from "@/components/auth/OnboardingProgress";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/onboarding/artist")({
  head: () => ({
    meta: [
      { title: "Artist onboarding — RADARMe" },
      { name: "description", content: "Tell RADARMe about your music so we can tune your radar." },
    ],
  }),
  component: ArtistRoute,
});

const ROLES = ["Artist", "Producer", "DJ", "Songwriter", "Band", "Manager"];
const GENRES = [
  "Afrobeats",
  "Amapiano",
  "Hip-Hop",
  "R&B",
  "Pop",
  "House",
  "Techno",
  "Drill",
  "Dancehall",
  "Alté",
  "Jazz",
  "Indie",
];

function ArtistRoute() {
  const { session, hydrated, saveProfile, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState(session?.profile?.role ?? "Artist");
  const [city, setCity] = useState(session?.profile?.city ?? "");
  const [genres, setGenres] = useState<string[]>(session?.profile?.genres ?? []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (hydrated && !session) return <Navigate to="/welcome" replace />;
  if (hydrated && session && !session.profile) return <Navigate to="/onboarding/profile" replace />;

  function toggleGenre(g: string) {
    setGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : prev.length >= 5 ? prev : [...prev, g],
    );
  }

  async function finish() {
    setError(null);
    if (city.trim().length < 2) return setError("Tell us your home base.");
    if (genres.length === 0) return setError("Pick at least one genre.");
    setBusy(true);
    try {
      await saveProfile({ role, city: city.trim(), genres });
      await completeOnboarding();
      navigate({ to: "/" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      backTo="/onboarding/profile"
      eyebrow="Step 2 of 2"
      title={
        <>
          Tune your <span className="text-gold">radar</span>
        </>
      }
      subtitle="Help us understand your sound. You can change any of this later."
    >
      <div className="mb-6">
        <OnboardingProgress step={2} total={2} />
      </div>

      <div className="space-y-6">
        <div>
          <FieldLabel>I am a…</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => {
              const active = r === role;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={[
                    "h-10 rounded-full px-4 text-sm transition-all duration-200 active:scale-95",
                    active
                      ? "bg-foreground text-background elev-1"
                      : "bg-surface-2 text-muted-foreground hairline hover:text-foreground",
                  ].join(" ")}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <FieldLabel>Home base</FieldLabel>
          <Input
            autoComplete="address-level2"
            placeholder="Lagos, London, Atlanta…"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            leading={<MapPin size={16} />}
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <FieldLabel>Genres</FieldLabel>
            <span className="text-[11px] text-muted-foreground">{genres.length}/5</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => {
              const active = genres.includes(g);
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggleGenre(g)}
                  className={[
                    "inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm transition-all duration-200 active:scale-95",
                    active
                      ? "bg-gold text-gold-foreground"
                      : "bg-surface-2 text-muted-foreground hairline hover:text-foreground",
                  ].join(" ")}
                >
                  {active && <Check size={14} strokeWidth={3} />}
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        <FormError>{error}</FormError>

        <Button variant="gold" size="lg" className="w-full" onClick={finish} disabled={busy}>
          {busy ? (
            "Finalising…"
          ) : (
            <>
              <Sparkles size={16} /> Enter RADARMe
            </>
          )}
        </Button>
      </div>
    </AuthLayout>
  );
}
