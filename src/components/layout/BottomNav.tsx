import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Globe2, Users } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

type Item = {
  to: "/" | "/motherland" | "/network";
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
};

const items: Item[] = [
  { to: "/", label: "RADARHub", icon: Compass },
  { to: "/motherland", label: "MOTHERLand", icon: Globe2 },
  { to: "/network", label: "RADARNetwork", icon: Users },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="radar-footer fixed inset-x-0 bottom-0 z-40"
      aria-label="Primary"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid max-w-screen-md min-w-0 grid-cols-3">
        {items.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex min-h-16 min-w-0 items-center justify-center gap-2 border-r border-[var(--hairline)] px-2 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] whitespace-nowrap transition-[color,background-color,transform] duration-200 last:border-r-0",
                "focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-flare",
                active
                  ? "bg-gold text-gold-foreground shadow-[0_-8px_24px_-18px_var(--gold)]"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground active:scale-[0.98]",
              )}
            >
              <Icon size={18} strokeWidth={2.5} aria-hidden />
              <span className="max-w-[7.5rem] truncate text-center">{item.label}</span>
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 bottom-0 h-1 bg-flare transition-transform duration-200",
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
