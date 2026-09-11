import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Compass,
  GraduationCap,
  CalendarHeart,
  Flame,
  Trophy,
  Search,
  MessagesSquare,
  BellDot,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { MotherPage, MotherSection, Avatar } from "@/components/motherland/MotherPage";
import { Card } from "@/components/radar";

export const Route = createFileRoute("/motherland/")({
  head: () => ({
    meta: [
      { title: "MOTHERLand — RADARMe" },
      {
        name: "description",
        content: "MOTHERLand — a premium ecosystem dedicated to empowering female creatives.",
      },
    ],
  }),
  component: MotherlandHome,
});

const MODULES = [
  {
    to: "/motherland/feed",
    label: "Creative Feed",
    desc: "Work from women you follow",
    icon: Sparkles,
  },
  {
    to: "/motherland/mentorship",
    label: "Mentorship",
    desc: "1:1 with industry mothers",
    icon: HeartHandshake,
  },
  {
    to: "/motherland/learning",
    label: "Learning Centre",
    desc: "Craft, business & voice",
    icon: GraduationCap,
  },
  {
    to: "/motherland/events",
    label: "Events",
    desc: "Live rooms, meetups, showcases",
    icon: CalendarHeart,
  },
  {
    to: "/motherland/challenges",
    label: "Challenges",
    desc: "Monthly creative sprints",
    icon: Flame,
  },
  {
    to: "/motherland/recognition",
    label: "Recognition",
    desc: "Awards, features, spotlights",
    icon: Trophy,
  },
  {
    to: "/motherland/discovery",
    label: "Creative Discovery",
    desc: "Find kindred artists",
    icon: Search,
  },
  {
    to: "/motherland/messages",
    label: "Messages",
    desc: "Private, warm conversations",
    icon: MessagesSquare,
  },
  {
    to: "/motherland/notifications",
    label: "Notifications",
    desc: "Signals from the sisterhood",
    icon: BellDot,
  },
] as const;

const HIGHLIGHTS = [
  { name: "Amara Okonkwo", role: "Producer · Lagos", note: "just dropped a new beat pack" },
  { name: "Isla Moreno", role: "Songwriter · Madrid", note: "opened mentorship slots" },
  { name: "Yuki Tanabe", role: "DJ · Tokyo", note: "hosting a live listening room tonight" },
];

function MotherlandHome() {
  return (
    <MotherPage
      eyebrow="MOTHERLand"
      title="Welcome home, creator."
      description="A softer room in RADARMe — built by women, for women shaping culture. Move slowly. You are among your own."
      icon={<Compass size={22} />}
    >
      <Card className="relative overflow-hidden p-5">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full opacity-70 animate-bloom-drift"
          style={{ background: "var(--gradient-rose-wash)" }}
        />
        <div className="relative">
          <span className="text-[10px] uppercase tracking-[0.24em] text-rose">Community pulse</span>
          <p className="mt-2 font-display text-xl leading-snug">
            2,418 women are creating with you this week.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="Live rooms" value="7" />
            <Stat label="New works" value="184" />
            <Stat label="Mentors on" value="23" />
          </div>
        </div>
      </Card>

      <MotherSection title="Explore MOTHERLand">
        <div className="grid grid-cols-2 gap-2">
          {MODULES.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="group relative overflow-hidden rounded-2xl bg-surface p-4 hairline elev-1 transition-transform active:scale-[0.98]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "var(--gradient-rose-wash)" }}
              />
              <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-rose-soft text-rose">
                <m.icon size={16} />
              </span>
              <div className="relative mt-3 font-display text-sm font-semibold">{m.label}</div>
              <div className="relative mt-0.5 text-[11px] text-muted-foreground">{m.desc}</div>
            </Link>
          ))}
        </div>
      </MotherSection>

      <MotherSection
        title="Sisterhood highlights"
        trailing={
          <Link
            to="/motherland/feed"
            className="inline-flex items-center gap-1 text-[11px] text-rose"
          >
            Open feed <ArrowRight size={12} />
          </Link>
        }
      >
        <ul className="divide-y divide-[color:var(--hairline)] overflow-hidden rounded-2xl bg-surface hairline elev-1">
          {HIGHLIGHTS.map((h) => (
            <li key={h.name} className="flex items-center gap-3 px-4 py-3.5">
              <Avatar name={h.name} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{h.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">
                  {h.role} · {h.note}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </MotherSection>

      <p className="text-center text-[11px] text-muted-foreground">
        MOTHERLand honours slow, generous creativity.
      </p>
    </MotherPage>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-2 p-2.5 hairline">
      <div className="font-display text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
    </div>
  );
}
