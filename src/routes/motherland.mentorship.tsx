import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, Star, Calendar } from "lucide-react";
import { MotherPage, MotherSection, Avatar } from "@/components/motherland/MotherPage";
import { Button, Card } from "@/components/radar";

export const Route = createFileRoute("/motherland/mentorship")({
  head: () => ({
    meta: [
      { title: "Mentorship — MOTHERLand" },
      {
        name: "description",
        content: "1:1 guidance from women who have walked the path in music, business and art.",
      },
    ],
  }),
  component: MentorshipPage,
});

const MENTORS = [
  {
    name: "Nadia Vasquez",
    role: "A&R · Universal Latin",
    focus: "Songwriting, positioning",
    rating: 4.9,
    price: "$120 / hr",
    slots: 3,
  },
  {
    name: "Fatima Diallo",
    role: "Founder · Studio Baya",
    focus: "Independent business, sync",
    rating: 5.0,
    price: "$180 / hr",
    slots: 1,
  },
  {
    name: "Leah Osei",
    role: "Touring vocalist",
    focus: "Live performance, stamina",
    rating: 4.8,
    price: "$95 / hr",
    slots: 5,
  },
  {
    name: "Sun-Mi Park",
    role: "Music supervisor",
    focus: "Film & TV placements",
    rating: 4.9,
    price: "$150 / hr",
    slots: 2,
  },
];

function MentorshipPage() {
  return (
    <MotherPage
      eyebrow="MOTHERLand · Mentorship"
      title="Walk with a woman who's been there."
      description="Book 1:1 sessions with mentors who understand the terrain — from first release to global tour."
      icon={<HeartHandshake size={22} />}
    >
      <Card className="p-5">
        <span className="text-[10px] uppercase tracking-[0.22em] text-rose">Your journey</span>
        <p className="mt-2 font-display text-lg leading-snug">
          2 sessions completed. Next check-in in 12 days.
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full"
            style={{ width: "40%", background: "var(--rose)" }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" size="sm">
            My mentors
          </Button>
          <Button variant="ghost" size="sm">
            Session history
          </Button>
        </div>
      </Card>

      <MotherSection title="Available this week" hint="Curated women mentors across the industry">
        <div className="space-y-3">
          {MENTORS.map((m) => (
            <div key={m.name} className="rounded-2xl bg-surface p-4 hairline elev-1">
              <div className="flex items-start gap-3">
                <Avatar name={m.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="truncate text-sm font-semibold">{m.name}</div>
                    <span className="inline-flex items-center gap-0.5 text-[11px] text-rose">
                      <Star size={11} fill="currentColor" /> {m.rating}
                    </span>
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">{m.role}</div>
                  <div className="mt-1 truncate text-[11px] text-foreground/80">
                    Focus: {m.focus}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-sm font-semibold">{m.price}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {m.slots} slots
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="secondary">
                  View profile
                </Button>
                <Button size="sm">
                  <Calendar size={13} /> Book session
                </Button>
              </div>
            </div>
          ))}
        </div>
      </MotherSection>
    </MotherPage>
  );
}
