import { createFileRoute } from "@tanstack/react-router";
import { Tv, Play } from "lucide-react";
import { NetworkPage, EditorialSection, Cover } from "@/components/network/NetworkPage";

export const Route = createFileRoute("/network/tv")({
  head: () => ({
    meta: [
      { title: "RADAR TV — RADARNetwork" },
      { name: "description", content: "RADAR TV — live shows, sessions and originals from RADARNetwork." },
    ],
  }),
  component: RadarTVPage,
});

const shows = [
  { title: "ON THE RADAR · Live", ep: "S3 · E12", dur: "1h 24m", live: true },
  { title: "In Studio · Amaarae", ep: "S2 · E04", dur: "38 min" },
  { title: "The Producer Room", ep: "S1 · E19", dur: "52 min" },
  { title: "Tour Diary · Kigali", ep: "S1 · E02", dur: "27 min" },
];

function RadarTVPage() {
  return (
    <NetworkPage
      eyebrow="RADAR TV"
      title="Music, filmed with intention."
      kicker="Live shows, in-studio sessions and original series produced by RADARNetwork."
      icon={<Tv size={22} />}
    >
      <EditorialSection title="Featured" hint="Fresh this week">
        <div className="space-y-4">
          {shows.map((s) => (
            <article key={s.title} className="overflow-hidden rounded-2xl bg-surface hairline glass-reflect">
              <div className="relative">
                <Cover seed={s.title} aspect="16/9" />
                <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                  {s.live ? "● Live" : s.ep}
                </span>
                <span className="pointer-events-none absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-black shadow-lg">
                    <Play size={22} fill="currentColor" />
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-semibold leading-tight">{s.title}</p>
                  <p className="text-[11px] text-muted-foreground">{s.dur}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>
    </NetworkPage>
  );
}