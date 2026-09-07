import { createFileRoute } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { IntelPage } from "@/components/intelligence/IntelPage";

export const Route = createFileRoute("/intelligence/goals")({
  head: () => ({ meta: [{ title: "Goal Tracker — RADAR Intelligence" }] }),
  component: Goals,
});

const goals = [
  { g: "Reach 200K monthly listeners", pct: 64 },
  { g: "Land 3 editorial playlists",   pct: 33 },
  { g: "Book 5 collaborations",        pct: 80 },
  { g: "Grow email list to 5,000",     pct: 42 },
];

function Goals() {
  return (
    <IntelPage
      eyebrow="Goal Tracker"
      title="Where you stand, this month."
      kicker="Live progress against the goals you've set with RADAR Intelligence."
      icon={<Target size={22} />}
    >
      <div className="space-y-3">
        {goals.map((g) => (
          <article key={g.g} className="rounded-2xl bg-surface p-4 hairline glass-reflect">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-[15px] font-semibold">{g.g}</p>
              <span className="text-[11px] font-semibold tabular-nums text-gold">{g.pct}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-gold transition-[width] duration-700"
                style={{ width: `${g.pct}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </IntelPage>
  );
}