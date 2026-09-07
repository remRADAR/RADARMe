import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarClock,
  Target,
  MessagesSquare,
  Lightbulb,
  Library,
  History,
  LineChart,
  Briefcase,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { IntelPage } from "@/components/intelligence/IntelPage";

export const Route = createFileRoute("/intelligence/")({
  head: () => ({
    meta: [
      { title: "RADAR Intelligence — Command Deck" },
      { name: "description", content: "The command deck for your artist career, powered by RADAR Intelligence." },
    ],
  }),
  component: IntelHome,
});

type Nav = {
  to:
    | "/intelligence/planner"
    | "/intelligence/goals"
    | "/intelligence/chat"
    | "/intelligence/recommendations"
    | "/intelligence/knowledge"
    | "/intelligence/timeline"
    | "/intelligence/insights"
    | "/intelligence/opportunities";
  label: string;
  hint: string;
  icon: React.ReactNode;
};

const modules: Nav[] = [
  { to: "/intelligence/planner",         label: "Career Planner",     hint: "Quarterly roadmap", icon: <CalendarClock size={16} /> },
  { to: "/intelligence/goals",           label: "Goal Tracker",       hint: "This month",        icon: <Target size={16} /> },
  { to: "/intelligence/chat",            label: "AI Conversation",    hint: "Ask anything",      icon: <MessagesSquare size={16} /> },
  { to: "/intelligence/recommendations", label: "Recommendations",    hint: "Curated for you",   icon: <Lightbulb size={16} /> },
  { to: "/intelligence/knowledge",       label: "Knowledge Centre",   hint: "Playbooks",         icon: <Library size={16} /> },
  { to: "/intelligence/timeline",        label: "Career Timeline",    hint: "Your story",        icon: <History size={16} /> },
  { to: "/intelligence/insights",        label: "Insights",           hint: "Signals & trends",  icon: <LineChart size={16} /> },
  { to: "/intelligence/opportunities",   label: "Opportunity Centre", hint: "Open matches",      icon: <Briefcase size={16} /> },
];

function IntelHome() {
  const hour = new Date().getHours();
  const greeting =
    hour < 5 ? "Working late" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const briefs: {
    kind: "action" | "deadline" | "suggestion";
    text: React.ReactNode;
    to:
      | "/intelligence/opportunities"
      | "/intelligence/planner"
      | "/hub/playlist-pitch"
      | "/intelligence/recommendations";
    cta: string;
  }[] = [
    { kind: "action",     to: "/hub/playlist-pitch",           cta: "Complete pitch", text: <>You have <span className="text-gold">one campaign</span> that needs your attention — finish your Spotify pitch.</> },
    { kind: "deadline",   to: "/intelligence/planner",          cta: "Open planner",   text: <>Your next milestone is due in <span className="text-gold">3 days</span> — press release for "Feather".</> },
    { kind: "suggestion", to: "/intelligence/recommendations",  cta: "See match",      text: <>New collaboration match: an Accra-based producer who fits your last two singles.</> },
  ];

  return (
    <IntelPage
      eyebrow="Command Deck"
      title="Your career, in one intelligent surface."
      kicker="A private, focused environment. Every module below is powered by RADAR Intelligence."
      icon={<LayoutDashboard size={22} />}
      hideBack
    >
      {/* Proactive greeting */}
      <div className="rounded-3xl p-5 hairline glass-reflect"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--surface) 60%, transparent), color-mix(in oklab, var(--surface) 20%, transparent))",
          backdropFilter: "blur(24px) saturate(140%)",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Today's brief</p>
        <p className="mt-2 font-display text-2xl font-semibold leading-tight">
          {greeting}, REM.
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
          You're up <span className="text-foreground">+24.6%</span> this month. Here's what I'd focus on next.
        </p>

        <ul className="mt-4 space-y-2">
          {briefs.map((b, i) => {
            const Icon = b.kind === "action" ? AlertCircle : b.kind === "deadline" ? Clock : CheckCircle2;
            return (
              <li key={i}>
                <Link
                  to={b.to}
                  className="group flex items-start gap-3 rounded-2xl bg-surface-2 p-3 hairline transition-colors hover:bg-surface"
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface text-gold">
                    <Icon size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-snug">{b.text}</p>
                    <p className="mt-1 text-[11px] font-semibold text-gold">{b.cta} →</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { k: "Streams", v: "128.4K" },
            { k: "Growth", v: "+24.6%" },
            { k: "Signals", v: "7" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-surface-2 p-3 hairline">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.k}</p>
              <p className="mt-1 font-display text-lg font-semibold tabular-nums">{s.v}</p>
            </div>
          ))}
        </div>
        <Link
          to="/intelligence/chat"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-[13px] font-semibold text-gold-foreground"
        >
          <Sparkles size={14} /> Ask RADAR
        </Link>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-2 gap-2">
        {modules.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            className="group flex items-center gap-2.5 rounded-2xl bg-surface p-3 hairline elev-1 glass-reflect transition-colors hover:bg-surface-2"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-2 text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
              {m.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{m.label}</p>
              <p className="truncate text-[10px] text-muted-foreground">{m.hint}</p>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </Link>
        ))}
      </div>

      <Link
        to="/"
        className="mx-auto mt-2 inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground"
      >
        Exit to RADARMe <ArrowUpRight size={12} />
      </Link>
    </IntelPage>
  );
}