import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  BrainCircuit,
  ChevronRight,
  Home,
  Library,
  Menu,
  Music2,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

type PrimaryNavItem = {
  to: "/" | "/radarmusic" | "/market" | "/network" | "/motherland" | "/intelligence" | "/hub";
  label: string;
  description: string;
  icon: typeof Home;
};

const primaryNav: PrimaryNavItem[] = [
  { to: "/", label: "Dashboard", description: "Your artist command centre", icon: Home },
  {
    to: "/radarmusic",
    label: "RADARMusic",
    description: "Releases and distribution",
    icon: Music2,
  },
  {
    to: "/market",
    label: "RADARStore",
    description: "Products, tickets and events",
    icon: ShoppingBag,
  },
  {
    to: "/network",
    label: "Magazine",
    description: "Stories, interviews and culture",
    icon: Library,
  },
  { to: "/hub", label: "Advert Board", description: "Promote your next move", icon: BarChart3 },
  { to: "/motherland", label: "MOTHERLand", description: "Community and connection", icon: Users },
  {
    to: "/intelligence",
    label: "RADARMatrix",
    description: "Your intelligence layer",
    icon: BrainCircuit,
  },
];

function currentSection(pathname: string) {
  if (pathname === "/") return "Dashboard";
  const item = primaryNav.find((candidate) => pathname.startsWith(candidate.to));
  return item?.label ?? "RADARMe";
}

/**
 * Product frame for the RADARMe ecosystem. Authentication and onboarding keep
 * their focused layouts; the core product gets an adaptive desktop rail and
 * the existing mobile bottom navigation.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isImmersive =
    pathname.startsWith("/intelligence") ||
    pathname.startsWith("/welcome") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/onboarding");
  const section = currentSection(pathname);

  return (
    <div className="min-h-dvh bg-transparent text-foreground">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background focus:not-sr-only"
      >
        Skip to content
      </a>

      {!isImmersive && (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-hairline bg-background/80 px-4 py-5 backdrop-blur-xl lg:flex">
          <div className="flex items-center justify-between px-2">
            <Link
              to="/"
              aria-label="RADARMe home"
              className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <Logo size={30} />
            </Link>
            <button
              type="button"
              aria-label="Open navigation"
              className="rounded-lg p-2 text-muted-foreground hover:bg-surface-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-gold"
            >
              <Menu size={18} aria-hidden />
            </button>
          </div>

          <div className="mt-10 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Ecosystem
          </div>
          <nav aria-label="Ecosystem" className="mt-3 flex flex-1 flex-col gap-1">
            {primaryNav.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-gold",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                  )}
                >
                  <Icon size={17} strokeWidth={1.8} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{item.label}</span>
                    <span
                      className={cn(
                        "mt-0.5 block truncate text-[11px]",
                        active ? "text-background/60" : "text-muted-foreground",
                      )}
                    >
                      {item.description}
                    </span>
                  </span>
                  {active && <ChevronRight size={14} aria-hidden />}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-hairline pt-3">
            <Link
              to="/profile"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-gold"
            >
              <span className="grid size-8 place-items-center rounded-full bg-surface-2 text-xs font-semibold text-foreground">
                AM
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-foreground">Artist profile</span>
                <span className="block truncate text-[11px]">Manage your signal</span>
              </span>
              <Settings size={15} aria-hidden />
            </Link>
          </div>
        </aside>
      )}

      <div className={cn(!isImmersive && "lg:pl-64")}>
        {!isImmersive && (
          <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-hairline bg-background/70 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
            <div className="flex min-w-0 items-center gap-3">
              <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
                RADARMe
              </span>
              <ChevronRight
                size={14}
                className="hidden text-muted-foreground sm:inline"
                aria-hidden
              />
              <h1 className="truncate text-sm font-semibold">{section}</h1>
            </div>
            <div className="flex items-center gap-1">
              <Link
                to="/search"
                aria-label="Search RADARMe"
                className="rounded-lg p-2.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-gold"
              >
                <Search size={18} aria-hidden />
              </Link>
              <Link
                to="/notifications"
                aria-label="Notifications"
                className="rounded-lg p-2.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-gold"
              >
                <Bell size={18} aria-hidden />
              </Link>
              <Link
                to="/intelligence/chat"
                aria-label="Ask RADAR"
                className="ml-1 hidden items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-background hover:opacity-90 focus-visible:outline-2 focus-visible:outline-gold sm:flex"
              >
                <Sparkles size={14} aria-hidden />
                Ask RADAR
              </Link>
            </div>
          </header>
        )}

        <main
          id="main-content"
          className={cn(
            isImmersive ? "w-full" : "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8",
          )}
          style={{
            paddingBottom: isImmersive
              ? "env(safe-area-inset-bottom)"
              : "calc(env(safe-area-inset-bottom) + 112px)",
          }}
        >
          {children}
        </main>
        {!isImmersive && <BottomNav />}
      </div>
    </div>
  );
}
