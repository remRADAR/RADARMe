import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BriefcaseBusiness, CalendarHeart, WalletCards } from "lucide-react";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Market — RADARMe" },
      { name: "description", content: "Services and opportunities across the RADARMe ecosystem." },
    ],
  }),
  component: Market,
});

function Market() {
  return (
    <div className="min-h-[calc(100svh-1rem)] space-y-8 py-6 sm:py-10">
      <section className="glass relative flex min-h-[48svh] flex-col justify-end overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14">
        <BriefcaseBusiness
          className="relative mb-auto text-gold"
          size={40}
          strokeWidth={1.5}
          aria-hidden
        />
        <div className="relative max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            RADAR services
          </p>
          <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
            Build the career around the work.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Explore the existing service catalogue, orders, wallet, and free-event surfaces.
            Commerce remains demo state until a verified backend is connected.
          </p>
        </div>
      </section>
      <div className="grid gap-3 sm:grid-cols-3">
        <MarketAction
          to="/hub"
          icon={<BriefcaseBusiness size={18} />}
          title="Service catalogue"
          detail="Growth, business, and career"
        />
        <MarketAction
          to="/hub/orders"
          icon={<WalletCards size={18} />}
          title="Orders & wallet"
          detail="Review mock activity"
        />
        <MarketAction
          to="/motherland/events"
          icon={<CalendarHeart size={18} />}
          title="Free events"
          detail="Discover community rooms"
        />
      </div>
    </div>
  );
}

function MarketAction({
  to,
  icon,
  title,
  detail,
}: {
  to: "/hub" | "/hub/orders" | "/motherland/events";
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <Link
      to={to}
      className="glass group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-white/10"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-gold-foreground">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block truncate text-xs text-muted-foreground">{detail}</span>
      </span>
      <ArrowUpRight
        size={16}
        className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
