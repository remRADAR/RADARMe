import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Clock, Video, User, Star } from "lucide-react";
import { Button, Card } from "@/components/radar";
import { ServicePage, SectionHeader } from "@/components/hub";

export const Route = createFileRoute("/hub/consultation")({
  head: () => ({
    meta: [
      { title: "Consultation Booking — RADARMe" },
      {
        name: "description",
        content:
          "Book 1:1 sessions with A&R, marketing and industry strategists on the RADARMe roster.",
      },
    ],
  }),
  component: ConsultationPage,
});

const EXPERTS = [
  {
    name: "Amara Osei",
    role: "A&R Strategist",
    rate: "$120 / 30m",
    rating: 4.9,
    tags: ["A&R", "Afrobeats", "Sync"],
  },
  {
    name: "David Klein",
    role: "Marketing Director",
    rate: "$180 / 45m",
    rating: 4.8,
    tags: ["Growth", "Paid media", "TikTok"],
  },
  {
    name: "Renée Cardoso",
    role: "Career Coach",
    rate: "$95 / 30m",
    rating: 5.0,
    tags: ["Planning", "Mindset", "Longevity"],
  },
];

const SLOTS = ["Today · 4:30 PM", "Tomorrow · 10:00 AM", "Thu · 2:15 PM", "Fri · 6:00 PM"];

function ConsultationPage() {
  return (
    <ServicePage
      eyebrow="RADARHub · Consultation"
      title="Talk to someone who's done it."
      description="Book confidential 1:1 sessions with vetted strategists, A&Rs and coaches from the RADARMe roster."
      icon={<CalendarCheck size={22} />}
      actions={
        <>
          <Button variant="gold" size="sm">
            Browse all experts
          </Button>
          <Button variant="secondary" size="sm">
            My bookings
          </Button>
        </>
      }
    >
      <section className="space-y-3">
        <SectionHeader title="Featured experts" />
        <div className="space-y-3">
          {EXPERTS.map((e) => (
            <Card key={e.name} className="p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface-2 font-display text-base font-semibold text-gold hairline">
                  {e.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold">{e.name}</h3>
                    <div className="flex shrink-0 items-center gap-1 text-xs text-gold">
                      <Star size={12} fill="currentColor" /> {e.rating}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{e.role}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="text-xs text-muted-foreground">
                  <Clock size={11} className="mr-1 inline" /> {e.rate}
                </div>
                <Button variant="gold" size="sm">
                  <Video size={14} /> Book
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeader title="Next available slots" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SLOTS.map((s) => (
            <button
              key={s}
              type="button"
              className="rounded-xl bg-surface p-3 text-xs font-medium hairline elev-1 transition-colors hover:bg-surface-2"
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-surface p-4 hairline elev-1">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-gold">
            <User size={16} />
          </span>
          <div>
            <h3 className="text-sm font-semibold">Not sure who to book?</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Tell us your goals and we'll match you with the right expert within 24 hours.
            </p>
            <Button variant="secondary" size="sm" className="mt-3">
              Get a match
            </Button>
          </div>
        </div>
      </section>
    </ServicePage>
  );
}
