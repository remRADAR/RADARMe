import { createFileRoute } from "@tanstack/react-router";
import { BellDot, Heart, Sparkles, HeartHandshake, Trophy, CalendarHeart } from "lucide-react";
import { MotherPage, MotherSection } from "@/components/motherland/MotherPage";

export const Route = createFileRoute("/motherland/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — MOTHERLand" },
      {
        name: "description",
        content: "Signals from the sisterhood — soft, meaningful, never noisy.",
      },
    ],
  }),
  component: MotherNotifications,
});

const ITEMS = [
  {
    icon: HeartHandshake,
    title: "Nadia accepted your mentorship request",
    time: "12m",
    unread: true,
  },
  { icon: Sparkles, title: "Isla shared a new demo in the feed", time: "1h", unread: true },
  { icon: CalendarHeart, title: "Listening room starts in 30 minutes", time: "2h", unread: true },
  {
    icon: Trophy,
    title: "You were nominated for Producer's Circle",
    time: "Yesterday",
    unread: false,
  },
  { icon: Heart, title: "14 women saved your last release", time: "2d", unread: false },
];

function MotherNotifications() {
  return (
    <MotherPage
      eyebrow="MOTHERLand · Notifications"
      title="Soft signals, never noise."
      description="Only the moments that matter — mentors, community, recognition."
      icon={<BellDot size={22} />}
    >
      <MotherSection title="Today">
        <ul className="divide-y divide-[color:var(--hairline)] overflow-hidden rounded-2xl bg-surface hairline elev-1">
          {ITEMS.map((n, i) => (
            <li key={i} className="flex items-start gap-3 px-4 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rose-soft text-rose">
                <n.icon size={14} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm leading-snug">{n.title}</div>
                <div className="text-[11px] text-muted-foreground">{n.time}</div>
              </div>
              {n.unread && (
                <span
                  aria-label="Unread"
                  className="mt-1 h-2 w-2 shrink-0 rounded-full"
                  style={{ background: "var(--rose)" }}
                />
              )}
            </li>
          ))}
        </ul>
      </MotherSection>
    </MotherPage>
  );
}
