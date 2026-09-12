import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import {
  Sparkles,
  UploadCloud,
  Briefcase,
  Compass,
  ArrowUpRight,
  ListMusic,
  Star,
  CalendarHeart,
  Users,
  Newspaper,
} from "lucide-react";
import { FramerHomeFrame } from "@/components/home/FramerHomeFrame";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const AnnouncementRibbon = lazy(() =>
  import("@/components/home/AnnouncementRibbon").then(({ AnnouncementRibbon }) => ({
    default: AnnouncementRibbon,
  })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RADARMe: The iNDUSTRYKit" },
      {
        name: "description",
        content: "RADARMe: The iNDUSTRYKit — your command center for an artist career.",
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
      <ErrorBoundary fallback={<div className="min-h-40" aria-hidden="true" />}>
        <Suspense fallback={<div className="min-h-40" aria-hidden="true" />}>
          <AnnouncementRibbon />
        </Suspense>
      </ErrorBoundary>

      {/* Single-line action track */}
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

      {/* Recommended for you */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Recommended for you
          </h2>
          <span className="text-[11px] text-gold">Personalised</span>
        </div>
        <ul className="radar-scroll-stack">
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
  const itemRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 85%", "start 20%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.78]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -18]);

  return (
    <motion.li ref={itemRef} className="radar-scroll-stack__item" style={{ scale, opacity, y }}>
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
    </motion.li>
  );
}
