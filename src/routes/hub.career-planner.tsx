import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Target, CheckCircle2, Circle, Sparkles } from "lucide-react";
import { Button, Card } from "@/components/radar";
import { ServicePage, SectionHeader } from "@/components/hub";

export const Route = createFileRoute("/hub/career-planner")({
  head: () => ({
    meta: [
      { title: "Career Planner — RADARMe" },
      {
        name: "description",
        content:
          "Plan your artist career quarter by quarter with milestones, goals and AI-assisted timelines.",
      },
    ],
  }),
  component: CareerPlannerPage,
});

const MILESTONES = [
  { done: true, title: "Sign up for RADARMe", when: "Complete" },
  { done: true, title: "Complete artist profile", when: "Complete" },
  { done: false, title: "Distribute first single", when: "This month" },
  { done: false, title: "Book 3 playlist pitches", when: "Next 30 days" },
  { done: false, title: "Launch a 4-week campaign", when: "Q3" },
  { done: false, title: "First editorial feature", when: "Q4" },
];

const GOALS = [
  { label: "Monthly listeners", target: "10K", progress: 12 },
  { label: "Playlist adds", target: "25", progress: 8 },
  { label: "Release cadence", target: "1 / month", progress: 33 },
];

function CareerPlannerPage() {
  return (
    <ServicePage
      eyebrow="RADARHub · Career Planner"
      title="Your career, on a timeline."
      description="Set quarterly goals, track milestones and let RADAR Intelligence suggest the next best move."
      icon={<CalendarClock size={22} />}
      actions={
        <>
          <Button variant="gold" size="sm">
            <Sparkles size={14} /> Generate my plan
          </Button>
          <Button variant="secondary" size="sm">
            Add milestone
          </Button>
        </>
      }
    >
      <section className="space-y-3">
        <SectionHeader title="Quarterly goals" hint="Q3 2026" />
        <div className="grid gap-3 sm:grid-cols-3">
          {GOALS.map((g) => (
            <Card key={g.label} className="p-4">
              <div className="flex items-center gap-2 text-gold">
                <Target size={14} />
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {g.label}
                </span>
              </div>
              <div className="mt-2 font-display text-xl font-semibold">{g.target}</div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-gold" style={{ width: `${g.progress}%` }} />
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">{g.progress}% to target</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeader title="Milestones" />
        <ul className="overflow-hidden rounded-2xl bg-surface hairline elev-1">
          {MILESTONES.map((m, i) => (
            <li
              key={m.title}
              className="flex items-center gap-3 px-4 py-3.5"
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
              }}
            >
              <span className={m.done ? "text-gold" : "text-muted-foreground"}>
                {m.done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              </span>
              <div className="min-w-0 flex-1">
                <div
                  className={`text-sm font-medium ${m.done ? "text-muted-foreground line-through" : ""}`}
                >
                  {m.title}
                </div>
                <div className="text-[11px] text-muted-foreground">{m.when}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </ServicePage>
  );
}
