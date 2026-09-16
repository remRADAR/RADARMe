import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
      className="app-footer-wrapper fixed inset-x-0 bottom-0 z-40 px-3 pb-4 sm:px-6 sm:pb-6 lg:hidden"
      aria-label="Primary"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="app-footer glass-card radar-apple-dock mx-auto grid w-fit max-w-full grid-cols-5 gap-1 overflow-hidden rounded-full p-1.5 shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.7)]">
        {items.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex min-h-12 min-w-0 items-center justify-center rounded-full px-2 py-2 text-muted-foreground transition-[color,transform] duration-200 sm:min-h-14 sm:px-4",
                "focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-flare",
                active ? "text-white" : "hover:text-foreground active:scale-[0.98]",
              )}
            >
              {active && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-white/[0.14] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.18)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  aria-hidden
                />
              )}
              <Icon className="relative z-[1]" size={18} strokeWidth={2} aria-hidden />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

