import { createFileRoute } from "@tanstack/react-router";
import { Bell, Sparkles, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/radar";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — RADARMe" },
      { name: "description", content: "Everything on your radar, in one place." },
    ],
  }),
  component: NotificationsPage,
});

const ITEMS = [
  {
    icon: Sparkles,
    title: "Welcome to RADARMe",
    body: "Your artist operating system is ready. Explore the RADARHub to begin.",
    time: "Just now",
    unread: true,
  },
  {
    icon: TrendingUp,
    title: "Momentum tracking is live",
    body: "Once you connect a source, career signals will surface here.",
    time: "2h",
    unread: true,
  },
  {
    icon: Users,
    title: "RADARNetwork is warming up",
    body: "Invite peers to appear in your circle.",
    time: "Yesterday",
    unread: false,
  },
];

function NotificationsPage() {
  return (
    <div className="space-y-6 pt-2">
      <section className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          Notifications
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          On your radar.
        </h1>
      </section>

      <div className="space-y-2">
        {ITEMS.map((n) => {
          const Icon = n.icon;
          return (
            <Card key={n.title} className="p-4">
              <div className="flex items-start gap-3">
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-2 text-gold">
                  <Icon size={16} />
                  {n.unread && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold">{n.title}</h3>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
        <Bell size={12} /> Live notifications arrive with modules.
      </div>
    </div>
  );
}
