import { createFileRoute } from "@tanstack/react-router";
import { Flame, Timer, Users } from "lucide-react";
import { MotherPage, MotherSection } from "@/components/motherland/MotherPage";
import { Button, Card } from "@/components/radar";

export const Route = createFileRoute("/motherland/challenges")({
  head: () => ({
    meta: [
      { title: "Challenges — MOTHERLand" },
      {
        name: "description",
        content: "Monthly creative sprints designed to move you gently forward.",
      },
    ],
  }),
  component: ChallengesPage,
});

const CHALLENGES = [
  {
    title: "One verse a day",
    desc: "Write 30 verses in 30 mornings.",
    days: "14 days left",
    participants: 428,
    tag: "Songwriting",
  },
  {
    title: "Room tone",
    desc: "Record the ambience of a place you love. Layer it into a track.",
    days: "5 days left",
    participants: 96,
    tag: "Production",
  },
  {
    title: "First time on camera",
    desc: "Post one performance video. Any quality.",
    days: "21 days left",
    participants: 212,
    tag: "Confidence",
  },
];

function ChallengesPage() {
  return (
    <MotherPage
      eyebrow="MOTHERLand · Challenges"
      title="Small sprints. Real momentum."
      description="Gentle, month-long prompts designed by women who understand how creative energy actually works."
      icon={<Flame size={22} />}
    >
      <Card className="p-5">
        <span className="text-[10px] uppercase tracking-[0.22em] text-rose">
          Your current sprint
        </span>
        <p className="mt-2 font-display text-lg leading-snug">One verse a day — day 16 of 30.</p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full"
            style={{ width: "53%", background: "var(--rose)" }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm">Log today</Button>
          <Button size="sm" variant="secondary">
            See streak
          </Button>
        </div>
      </Card>

      <MotherSection title="Open now">
        <div className="space-y-3">
          {CHALLENGES.map((c) => (
            <div key={c.title} className="rounded-2xl bg-surface p-4 hairline elev-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-rose">{c.tag}</span>
                <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Timer size={11} /> {c.days}
                </span>
              </div>
              <div className="mt-2 text-sm font-semibold">{c.title}</div>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{c.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Users size={12} /> {c.participants} joined
                </span>
                <Button size="sm">Join sprint</Button>
              </div>
            </div>
          ))}
        </div>
      </MotherSection>
    </MotherPage>
  );
}
