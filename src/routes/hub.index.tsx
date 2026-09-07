import { createFileRoute, Link } from "@tanstack/react-router";
import {
  UploadCloud,
  ListMusic,
  Megaphone,
  PenLine,
  Wallet as WalletIcon,
  Gift,
  Receipt,
  CalendarCheck,
  CalendarClock,
  LifeBuoy,
  ChevronRight,
  Briefcase,
  TrendingUp,
  Coins,
} from "lucide-react";

export const Route = createFileRoute("/hub/")({
  head: () => ({
    meta: [
      { title: "RADARHub — Services" },
      {
        name: "description",
        content:
          "The business engine of RADARMe. Career, business and growth services grouped in one place.",
      },
    ],
  }),
  component: HubHome,
});

type HubLink = {
  to:
    | "/hub/distribution"
    | "/hub/playlist-pitch"
    | "/hub/marketing"
    | "/hub/editorial"
    | "/hub/career-planner"
    | "/hub/consultation"
    | "/hub/wallet"
    | "/hub/referrals"
    | "/hub/orders"
    | "/hub/support";
  label: string;
  hint: string;
  icon: React.ReactNode;
};

type Category = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  links: HubLink[];
};

const CATEGORIES: Category[] = [
  {
    key: "career",
    title: "Career",
    desc: "Release, pitch, promote",
    icon: <Briefcase size={16} />,
    links: [
      { to: "/hub/distribution",   label: "Distribution",     hint: "Ship your music",       icon: <UploadCloud size={16} /> },
      { to: "/hub/playlist-pitch", label: "Playlist Pitch",   hint: "Editorial + curators",  icon: <ListMusic size={16} /> },
      { to: "/hub/marketing",      label: "Marketing",        hint: "Reach new listeners",   icon: <Megaphone size={16} /> },
      { to: "/hub/editorial",      label: "Editorial",        hint: "Long-form + press",     icon: <PenLine size={16} /> },
    ],
  },
  {
    key: "business",
    title: "Business",
    desc: "Money, orders, bookings",
    icon: <Coins size={16} />,
    links: [
      { to: "/hub/wallet",       label: "Wallet",       hint: "Balance & payouts",    icon: <WalletIcon size={16} /> },
      { to: "/hub/referrals",    label: "RADAR Coins",  hint: "Referral rewards",     icon: <Gift size={16} /> },
      { to: "/hub/orders",       label: "Invoices",     hint: "Orders & receipts",    icon: <Receipt size={16} /> },
      { to: "/hub/consultation", label: "Bookings",     hint: "1:1 sessions",         icon: <CalendarCheck size={16} /> },
    ],
  },
  {
    key: "growth",
    title: "Growth",
    desc: "Plan, analyse, consult",
    icon: <TrendingUp size={16} />,
    links: [
      { to: "/hub/career-planner", label: "Career Planner", hint: "Quarterly roadmap",  icon: <CalendarClock size={16} /> },
      { to: "/hub/marketing",      label: "Campaigns",      hint: "Active promotions",  icon: <Megaphone size={16} /> },
      { to: "/hub/consultation",   label: "Consultation",   hint: "Expert advice",      icon: <CalendarCheck size={16} /> },
      { to: "/hub/support",        label: "Creator Support", hint: "Help centre",       icon: <LifeBuoy size={16} /> },
    ],
  },
];

function HubHome() {
  return (
    <div className="animate-page-in space-y-8 pb-6">
      {/* Header */}
      <header className="relative overflow-hidden pt-2">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-12 h-56 w-56 rounded-full opacity-60"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        <p className="relative text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          RADARHub
        </p>
        <h1 className="relative mt-2 font-display text-[30px] font-semibold leading-[1.05] tracking-tight sm:text-4xl">
          Your business engine.
        </h1>
        <p className="relative mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Every service you need to run your artist career — grouped, focused, one clear action at a time.
        </p>
      </header>

      {CATEGORIES.map((cat) => (
        <section key={cat.key} className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-gold">
                {cat.icon}
              </span>
              <div>
                <h2 className="font-display text-base font-semibold leading-tight">{cat.title}</h2>
                <p className="text-[11px] text-muted-foreground">{cat.desc}</p>
              </div>
            </div>
          </div>

          <div
            className="rounded-3xl p-2 hairline glass-reflect"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--surface) 55%, transparent), color-mix(in oklab, var(--surface) 15%, transparent))",
              backdropFilter: "blur(20px) saturate(140%)",
            }}
          >
            <ul className="divide-y divide-[color:var(--hairline)]">
              {cat.links.map((l) => (
                <li key={`${cat.key}-${l.label}`}>
                  <Link
                    to={l.to}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-surface-2"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                      {l.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold leading-tight">{l.label}</p>
                      <p className="truncate text-[11px] text-muted-foreground">{l.hint}</p>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}