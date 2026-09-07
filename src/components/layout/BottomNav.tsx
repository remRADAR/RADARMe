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
      className="fixed inset-x-0 bottom-0 z-40"
      aria-label="Primary"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-screen-md px-3 pb-3 pt-1">
        <div className="glass elev-2 relative flex h-16 items-center justify-around rounded-full px-2">
          {items.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group relative flex h-12 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-full",
                  "transition-colors duration-200",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-1 rounded-full transition-opacity duration-200",
                    active ? "bg-surface-2 opacity-100" : "opacity-0",
                  )}
                  aria-hidden
                />
                <Icon size={20} className="relative" aria-hidden />
                <span className="relative truncate text-[11px] font-medium tracking-wide">
                  {item.label}
                </span>
                {active && (
                  <span
                    aria-hidden
                    className="absolute -top-1 h-0.5 w-6 rounded-full bg-gold"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}