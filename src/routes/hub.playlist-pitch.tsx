import { createFileRoute } from "@tanstack/react-router";
import { ListMusic, Target, Send, Sparkles } from "lucide-react";
import { Button, Card } from "@/components/radar";
import { ServicePage, SectionHeader } from "@/components/hub";

export const Route = createFileRoute("/hub/playlist-pitch")({
  head: () => ({
    meta: [
      { title: "Playlist Pitch — RADARMe" },
      {
        name: "description",
        content:
          "Pitch your music to curators across Spotify, Apple Music and independent playlists.",
      },
    ],
  }),
  component: PlaylistPitchPage,
});

const CURATORS = [
  { name: "Fresh Finds", platform: "Spotify Editorial", reach: "3.2M", tag: "Editorial" },
  { name: "New Music Daily", platform: "Apple Music", reach: "2.8M", tag: "Editorial" },
  { name: "Afro Hits Rising", platform: "Independent", reach: "480K", tag: "Genre" },
  { name: "Late Night Vibes", platform: "Independent", reach: "210K", tag: "Mood" },
  { name: "Indie Radar", platform: "Spotify", reach: "1.1M", tag: "Editorial" },
];

function PlaylistPitchPage() {
  return (
    <ServicePage
      eyebrow="RADARHub · Playlist Pitch"
      title="Get on the playlists that matter."
      description="Target curators by genre, mood and reach. Track pitches, opens and placements — all in one pipeline."
      icon={<ListMusic size={22} />}
      actions={
        <>
          <Button variant="gold" size="sm">
            <Send size={14} /> New pitch
          </Button>
          <Button variant="secondary" size="sm">
            Pitch history
          </Button>
        </>
      }
    >
      <section className="grid grid-cols-3 gap-2">
        <Stat label="Pitches sent" value="0" />
        <Stat label="Opens" value="0" />
        <Stat label="Placements" value="0" />
      </section>

      <section className="space-y-3">
        <SectionHeader title="AI pitch assistant" />
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
              <Sparkles size={16} />
            </span>
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Craft a stronger pitch</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                RADAR Intelligence writes tailored pitch notes for each curator based on your
                track's audio DNA.
              </p>
              <Button variant="gold" size="sm" className="mt-3">
                Generate pitch
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <SectionHeader title="Recommended curators" hint="Matched to your latest release" />
        <ul className="divide-y divide-[color:var(--hairline)] overflow-hidden rounded-2xl bg-surface hairline elev-1">
          {CURATORS.map((c) => (
            <li key={c.name} className="flex items-center gap-3 px-4 py-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-2 text-gold">
                <Target size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{c.name}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {c.platform} · {c.reach} followers
                </div>
              </div>
              <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {c.tag}
              </span>
              <Button variant="secondary" size="sm">
                Pitch
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </ServicePage>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface p-3 text-center hairline elev-1">
      <div className="font-display text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}
