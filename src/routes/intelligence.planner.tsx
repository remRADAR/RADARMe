import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { IntelPage } from "@/components/intelligence/IntelPage";

export const Route = createFileRoute("/intelligence/planner")({
  head: () => ({ meta: [{ title: "Career Planner — RADAR Intelligence" }] }),
  component: Planner,
});

const quarters = [
  { q: "Q3 · 2026", theme: "Release momentum", items: ["Drop single #3", "Pitch to 12 curators", "Book 2 sessions"] },
  { q: "Q4 · 2026", theme: "Audience deepening", items: ["EP announcement", "First US show", "Grow superfans 3×"] },
  { q: "Q1 · 2027", theme: "Tour + sync",       items: ["6-city African tour", "Sync brief roundup", "Documentary short"] },
];

function Planner() {
  return (
    <IntelPage
      eyebrow="Career Planner"
      title="A year, mapped."
      kicker="RADAR Intelligence has drafted a quarterly plan. Edit anything — placeholder."
      icon={<CalendarClock size={22} />}
    >
      <div className="space-y-4">
        {quarters.map((q, i) => (
          <article key={q.q} className="rounded-2xl bg-surface p-5 hairline glass-reflect">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{q.q}</p>
              <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {i === 0 ? "Active" : "Planned"}
              </span>
            </div>
            <h3 className="mt-1 font-display text-lg font-semibold">{q.theme}</h3>
            <ul className="mt-3 space-y-2">
              {q.items.map((it) => (
                <li key={it} className="flex items-center gap-2 text-[13px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </IntelPage>
  );
}