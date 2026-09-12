import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import {
  Sparkles,
  UploadCloud,
  Briefcase,
  Compass,
  ChevronRight,
  ArrowUpRight,
  ListMusic,
  Star,
  CalendarHeart,
  Users,
  Newspaper,
} from "lucide-react";
import { FramerHomeFrame } from "@/components/home/FramerHomeFrame";

const AnnouncementRibbon = lazy(() =>
  import("@/components/home/AnnouncementRibbon").then(({ AnnouncementRibbon }) => ({
    default: AnnouncementRibbon,
  })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RADARHub — RADARMe" },
      {
        name: "description",
        content: "Your RADARHub — the command center of your artist career in RADARMe.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="space-y-8">
      <FramerHomeFrame />

      {/* RADAR Live */}
      <Suspense fallback={<div className="min-h-40" aria-hidden="true" />}>
        <AnnouncementRibbon />
      </Suspense>

      {/* Single-line action track — keeps the music stage above the fold */}
      <section className="radar-action-stack" aria-labelledby="quick-actions-title">
        <div className="flex items-baseline justify-between px-1">
          <h2
            id="quick-actions-title"
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            Quick actions
          </h2>
          <span className="text-[11px] text-muted-foreground">Your next move</span>
        </div>
        <div className="radar-action-track">
          <QuickAction
            to="/hub/distribution"
            icon={<UploadCloud size={18} />}
            label="Upload Music"
            hint="New release"
          />
          <QuickAction
            to="/hub"
            icon={<Briefcase size={18} />}
            label="Book Service"
            hint="RADARHub"
          />
          <QuickAction
            to="/intelligence/opportunities"
            icon={<Compass size={18} />}
            label="Find Opportunities"
            hint="Open matches"
          />
          <QuickAction
            to="/intelligence/chat"
            icon={<Sparkles size={18} />}
            label="Ask RADAR"
            hint="AI manager"
            gold
          />
        </div>
      </section>

      <MusicFirstStage />

      {/* Recommended for you */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Recommended for you
          </h2>
          <span className="text-[11px] text-gold">Personalised</span>
        </div>
        <ul className="space-y-2">
          <RecItem
            to="/network/playlists"
            kind="Playlist"
            title="Sunday Bloom · Afro-alté"
            hint="Curated for your sound"
            icon={<ListMusic size={16} />}
          />
          <RecItem
            to="/hub/playlist-pitch"
            kind="Service"
            title="Pitch to editorial playlists"
            hint="Boost your next release"
            icon={<Briefcase size={16} />}
          />
          <RecItem
            to="/network/spotlight"
            kind="Artist"
            title="Yuki Tanabe · Rising"
            hint="Featured this week"
            icon={<Star size={16} />}
          />
          <RecItem
            to="/motherland/events"
            kind="Event"
            title="Open Studio · Lagos"
            kicker="Aug 2"
            hint="MOTHERLand meetup"
            icon={<CalendarHeart size={16} />}
          />
          <RecItem
            to="/motherland"
            kind="Community"
            title="Join the Alté Circle"
            hint="12 new members this week"
            icon={<Users size={16} />}
          />
          <RecItem
            to="/network/magazine"
            kind="Article"
            title="The diaspora sound, rewritten"
            hint="14 min read · Issue 12"
            icon={<Newspaper size={16} />}
          />
        </ul>
      </section>
    </div>
  );
}

function QuickAction({
  to,
  icon,
  label,
  hint,
  gold,
}: {
  to: "/hub/distribution" | "/hub" | "/intelligence/opportunities" | "/intelligence/chat";
  icon: React.ReactNode;
  label: string;
  hint: string;
  gold?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <Link
        to={to}
        className={["radar-action-pill", gold ? "radar-action-pill--active" : ""].join(" ")}
        aria-label={`${label}: ${hint}`}
      >
        {icon}
        <span>{label}</span>
        <span className="sr-only">{hint}</span>
      </Link>
    </motion.div>
  );
}

function MusicFirstStage() {
  const tracks = [
    ["01", "TELMAN", "Moov Different", "+18%"],
    ["02", "Odenose", "Outside the Lines", "+12%"],
    ["03", "KEASUNGS", "New Signal", "+9%"],
  ];
  return (
    <section className="radar-visual-stage" aria-labelledby="visual-stage-title">
      <div className="radar-stage-glow" aria-hidden="true" />
      <header className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Music intelligence</p>
          <h2 id="visual-stage-title" className="mt-1 text-sm font-semibold">
            On The Radar · Lagos Hot 50
          </h2>
        </div>
        <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.12em] text-emerald-300">
          <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
          Live updates
        </span>
      </header>
      <div className="grid gap-3 p-4 sm:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-xl border border-hairline bg-black/30 p-4">
          <div className="flex items-end gap-1" aria-label="Waveform preview">
            <span className="text-xs font-mono text-muted-foreground">NOW PLAYING</span>
            {Array.from({ length: 32 }, (_, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full bg-gold/70"
                initial={{ height: `${12 + ((i * 17) % 28)}px` }}
                animate={{
                  height: [
                    `${10 + ((i * 13) % 20)}px`,
                    `${20 + ((i * 19) % 28)}px`,
                    `${12 + ((i * 17) % 28)}px`,
                  ],
                }}
                transition={{
                  duration: 1.1 + (i % 5) * 0.12,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: i * 0.018,
                }}
              />
            ))}
          </div>
          <p className="mt-5 text-lg font-semibold">Moov Different</p>
          <p className="text-xs text-muted-foreground">TELMAN · featured on RADARCharts</p>
          <Link
            to="/network/playlists"
            className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-foreground px-3 text-xs font-semibold text-background"
          >
            Open listening route <ChevronRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-hairline rounded-xl border border-hairline bg-black/20">
          {tracks.map(([rank, artist, title, change]) => (
            <Link
              key={rank}
              to="/network/spotlight"
              className="flex min-h-16 items-center gap-3 px-3 transition-colors hover:bg-white/[0.04]"
            >
              <span className="w-5 text-[11px] font-mono text-muted-foreground">{rank}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium">{title}</span>
                <span className="block truncate text-[10px] text-muted-foreground">{artist}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-300">{change}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecItem({
  to,
  icon,
  kind,
  title,
  kicker,
  hint,
}: {
  to:
    | "/network/playlists"
    | "/hub/playlist-pitch"
    | "/network/spotlight"
    | "/motherland/events"
    | "/motherland"
    | "/network/magazine";
  icon: React.ReactNode;
  kind: string;
  title: string;
  kicker?: string;
  hint: string;
}) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-center gap-3 rounded-2xl bg-surface p-3 hairline elev-1 glass-reflect transition-colors hover:bg-surface-2"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-gold">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              {kind}
            </span>
            {kicker && (
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                · {kicker}
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-[13px] font-semibold leading-tight">{title}</p>
          <p className="truncate text-[11px] text-muted-foreground">{hint}</p>
        </div>
        <ArrowUpRight
          size={14}
          className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </li>
  );
}
