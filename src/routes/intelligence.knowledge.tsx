import { createFileRoute } from "@tanstack/react-router";
import { Library } from "lucide-react";
import { IntelPage } from "@/components/intelligence/IntelPage";

export const Route = createFileRoute("/intelligence/knowledge")({
  head: () => ({ meta: [{ title: "Knowledge Centre — RADAR Intelligence" }] }),
  component: Knowledge,
});

const collections = [
  { name: "Release Playbook", count: 12, hint: "From single to campaign" },
  { name: "Playlist Pitching", count: 8, hint: "What actually gets replies" },
  { name: "Touring 101", count: 15, hint: "First 6 cities" },
  { name: "Money & Rights", count: 9, hint: "Splits, sync, royalties" },
  { name: "Brand & Story", count: 7, hint: "Positioning for artists" },
  { name: "Growth Loops", count: 11, hint: "Superfans, not followers" },
];

function Knowledge() {
  return (
    <IntelPage
      eyebrow="Knowledge Centre"
      title="Playbooks by RADAR."
      kicker="Living guides written by the RADARCharts team — updated monthly."
      icon={<Library size={22} />}
    >
      <div className="grid grid-cols-2 gap-3">
        {collections.map((c) => (
          <article key={c.name} className="rounded-2xl bg-surface p-4 hairline glass-reflect">
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold">{c.count} lessons</p>
            <p className="mt-1 font-display text-[15px] font-semibold leading-tight">{c.name}</p>
            <p className="mt-1 text-[12px] text-muted-foreground">{c.hint}</p>
          </article>
        ))}
      </div>
    </IntelPage>
  );
}
