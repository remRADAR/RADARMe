import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Library, Music2, ShoppingBag, Users } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

type Item = {
  to: "/" | "/radarmusic" | "/motherland" | "/market" | "/media";
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
};

const items: Item[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/radarmusic", label: "RADARMusic", icon: Music2 },
  { to: "/motherland", label: "Motherland", icon: Users },
  { to: "/market", label: "Market", icon: ShoppingBag },
  { to: "/media", label: "Media", icon: Library },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5 lg:hidden"
      aria-label="Primary"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="glass mx-auto grid max-w-3xl grid-cols-5 overflow-hidden rounded-3xl p-1 shadow-[0_18px_60px_-24px_oklch(0_0_0_/_0.9)]">
        {items.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex min-h-14 min-w-0 items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground transition-[background-color,color,transform] duration-200 sm:min-h-16 sm:gap-2 sm:px-3 sm:text-[11px]",
                "focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-flare",
                active
                  ? "bg-white text-black shadow-[0_4px_20px_-10px_white]"
                  : "hover:bg-white/10 hover:text-foreground active:scale-[0.98]",
              )}
            >
              <Icon size={18} strokeWidth={2} aria-hidden />
              <span className="max-w-[6.5rem] truncate text-center">{item.label}</span>
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-5 bottom-1 h-px origin-center bg-current transition-transform duration-200",
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
