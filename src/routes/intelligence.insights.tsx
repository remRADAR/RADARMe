import { createFileRoute } from "@tanstack/react-router";
import { LineChart, TrendingUp } from "lucide-react";
import { IntelPage } from "@/components/intelligence/IntelPage";

export const Route = createFileRoute("/intelligence/insights")({
  head: () => ({ meta: [{ title: "Insights — RADAR Intelligence" }] }),
  component: Insights,
});

const insights = [
  { k: "Fastest-growing city",  v: "Lagos, NG",   d: "+38% listeners this week" },
  { k: "Best day to release",   v: "Friday",      d: "Based on your last 6 drops" },
  { k: "Top follower age",      v: "18–24",       d: "62% of new followers" },
  { k: "Signal spike",          v: "TikTok",      d: "+4× saves in 48 hours" },
];

function Insights() {
  return (
    <IntelPage
      eyebrow="Insights"
      title="Signals RADAR is picking up."
      kicker="Cross-platform trends from the last 30 days — updated hourly."
      icon={<LineChart size={22} />}
    >
      <div className="grid grid-cols-2 gap-3">
        {insights.map((s) => (
          <article key={s.k} className="rounded-2xl bg-surface p-4 hairline glass-reflect">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{s.k}</p>
            <p className="mt-1 font-display text-lg font-semibold">{s.v}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-gold">
              <TrendingUp size={11} /> {s.d}
            </p>
          </article>
        ))}
      </div>
    </IntelPage>
  );
}