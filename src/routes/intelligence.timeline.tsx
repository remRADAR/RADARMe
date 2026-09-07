import { createFileRoute } from "@tanstack/react-router";
import { History, CheckCircle2, Circle } from "lucide-react";
import { IntelPage } from "@/components/intelligence/IntelPage";

export const Route = createFileRoute("/intelligence/timeline")({
  head: () => ({ meta: [{ title: "Career Timeline — RADAR Intelligence" }] }),
  component: Timeline,
});

const events = [
  { date: "2024", label: "First single released",   done: true },
  { date: "2025", label: "1,000 monthly listeners", done: true },
  { date: "2025", label: "First tour · 3 cities",   done: true },
  { date: "2026", label: "100K monthly listeners",  done: true },
  { date: "2026", label: "Editorial playlist add",  done: false },
  { date: "2027", label: "First international tour", done: false },
];

function Timeline() {
  return (
    <IntelPage
      eyebrow="Career Timeline"
      title="The story so far."
      kicker="Every milestone RADAR has tracked on your journey."
      icon={<History size={22} />}
    >
      <ol className="relative space-y-4 border-l border-[color:var(--hairline)] pl-6">
        {events.map((e) => (
          <li key={e.label} className="relative">
            <span className="absolute -left-[30px] top-1 grid h-5 w-5 place-items-center rounded-full bg-surface hairline">
              {e.done ? (
                <CheckCircle2 size={12} className="text-gold" />
              ) : (
                <Circle size={10} className="text-muted-foreground" />
              )}
            </span>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{e.date}</p>
            <p className="font-display text-[15px] font-semibold leading-tight">{e.label}</p>
          </li>
        ))}
      </ol>
    </IntelPage>
  );
}