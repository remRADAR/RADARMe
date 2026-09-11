import { createFileRoute } from "@tanstack/react-router";
import { Receipt, UploadCloud, ListMusic, Megaphone, PenLine, CalendarCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/radar";
import {
  ServicePage,
  SectionHeader,
  OrderRow,
  OrderList,
  type OrderStatus,
} from "@/components/hub";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hub/orders")({
  head: () => ({
    meta: [
      { title: "Orders — RADARMe" },
      { name: "description", content: "Every service order you've placed across RADARHub." },
    ],
  }),
  component: OrdersPage,
});

type Order = {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  amount: string;
  status: OrderStatus;
  date: string;
};

const ORDERS: Order[] = [
  {
    icon: UploadCloud,
    title: "Album distribution",
    subtitle: '"Nightlines" · 9 tracks',
    amount: "$29.00",
    status: "processing",
    date: "Today",
  },
  {
    icon: Megaphone,
    title: "Marketing · Momentum",
    subtitle: "4-week campaign",
    amount: "$499.00",
    status: "in_review",
    date: "Yesterday",
  },
  {
    icon: ListMusic,
    title: "Playlist Pitch batch",
    subtitle: "12 curators targeted",
    amount: "$49.00",
    status: "delivered",
    date: "Jun 28",
  },
  {
    icon: PenLine,
    title: "Press release",
    subtitle: "Single announcement",
    amount: "$79.00",
    status: "delivered",
    date: "Jun 20",
  },
  {
    icon: CalendarCheck,
    title: "Consultation · A&R",
    subtitle: "Amara Osei · 30m",
    amount: "$120.00",
    status: "pending",
    date: "Aug 4",
  },
];

const FILTERS = ["All", "Active", "Delivered", "Pending"] as const;

function OrdersPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible = ORDERS.filter((o) => {
    if (filter === "All") return true;
    if (filter === "Active") return o.status === "processing" || o.status === "in_review";
    if (filter === "Delivered") return o.status === "delivered";
    if (filter === "Pending") return o.status === "pending";
    return true;
  });

  return (
    <ServicePage
      eyebrow="RADARHub · Orders"
      title="Everything you've ordered."
      description="Track status, download deliverables and re-order services from a single place."
      icon={<Receipt size={22} />}
      actions={
        <Button variant="secondary" size="sm">
          Download all invoices
        </Button>
      }
    >
      <section className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
              filter === f
                ? "bg-gold text-gold-foreground"
                : "bg-surface-2 text-muted-foreground hairline hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </section>

      <section className="space-y-3">
        <SectionHeader title={`${visible.length} order${visible.length === 1 ? "" : "s"}`} />
        {visible.length === 0 ? (
          <div className="rounded-2xl bg-surface p-8 text-center hairline elev-1">
            <p className="text-sm text-muted-foreground">No orders match this filter.</p>
          </div>
        ) : (
          <OrderList>
            {visible.map((o) => {
              const Icon = o.icon;
              return (
                <li key={o.title + o.date}>
                  <OrderRow
                    icon={<Icon size={16} />}
                    title={o.title}
                    subtitle={o.subtitle}
                    amount={o.amount}
                    status={o.status}
                    date={o.date}
                  />
                </li>
              );
            })}
          </OrderList>
        )}
      </section>
    </ServicePage>
  );
}
