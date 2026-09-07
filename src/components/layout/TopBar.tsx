import { Bell, Search, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 glass">
      <div
        className="mx-auto flex max-w-screen-md items-center gap-3 px-4"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 10px)", paddingBottom: "10px" }}
      >
        <Link to="/" aria-label="RADARMe home" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Logo />
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <IconLink to="/search" label="Search">
            <Search size={18} />
          </IconLink>
          <IconLink to="/notifications" label="Notifications">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold" />
          </IconLink>
          <IconLink to="/profile" label="Profile">
            <User size={18} />
          </IconLink>
        </div>
      </div>
    </header>
  );
}

function IconLink({
  to,
  children,
  label,
}: {
  to: "/search" | "/notifications" | "/profile";
  children: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={[
        "relative grid h-11 w-11 place-items-center rounded-full",
        "text-muted-foreground hover:text-foreground hover:bg-surface-2",
        "transition-[color,background-color,transform] duration-200 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}