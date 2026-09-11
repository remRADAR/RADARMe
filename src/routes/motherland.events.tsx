import { createFileRoute } from "@tanstack/react-router";
import { CalendarHeart, MapPin, Video, Users } from "lucide-react";
import { MotherPage, MotherSection } from "@/components/motherland/MotherPage";
import { Button } from "@/components/radar";

export const Route = createFileRoute("/motherland/events")({
  head: () => ({
    meta: [
      { title: "Events — MOTHERLand" },
      { name: "description", content: "Live rooms, meetups and showcases for women in music." },
    ],
  }),
  component: EventsPage,
});

const EVENTS = [
  {
    title: "Listening room: unreleased demos",
    host: "Isla Moreno",
    when: "Tonight · 8pm CET",
    type: "online",
    going: 84,
  },
  {
    title: "Producers' brunch — Brooklyn",
    host: "MOTHERLand NYC",
    when: "Sat 26 · 11am EST",
    type: "irl",
    going: 22,
    city: "Brooklyn, NY",
  },
  {
    title: "Showcase: 6 new voices",
    host: "RADAR Editorial",
    when: "Aug 4 · 7pm BST",
    type: "online",
    going: 312,
  },
  {
    title: "Retreat: Songwriting in Ojai",
    host: "The Softest Season",
    when: "Sep 12–15",
    type: "irl",
    going: 14,
    city: "Ojai, CA",
  },
];

function EventsPage() {
  return (
    <MotherPage
      eyebrow="MOTHERLand · Events"
      title="Show up softly, together."
      description="Live listening rooms, city meetups and intimate retreats. Come as you are — cameras optional."
      icon={<CalendarHeart size={22} />}
      actions={
        <>
          <Button size="sm" variant="secondary">
            Upcoming
          </Button>
          <Button size="sm" variant="ghost">
            Hosted by me
          </Button>
        </>
      }
    >
      <MotherSection title="This week">
        <div className="space-y-3">
          {EVENTS.map((e) => (
            <div key={e.title} className="rounded-2xl bg-surface p-4 hairline elev-1">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-soft text-rose">
                  {e.type === "online" ? <Video size={16} /> : <MapPin size={16} />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold leading-snug">{e.title}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {e.host} · {e.when}
                  </div>
                  {e.city && <div className="mt-0.5 text-[11px] text-foreground/70">{e.city}</div>}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Users size={12} /> {e.going} attending
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    Details
                  </Button>
                  <Button size="sm">RSVP</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MotherSection>
    </MotherPage>
  );
}
