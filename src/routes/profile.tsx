import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings as SettingsIcon, LogOut, Edit3, Shield, Award } from "lucide-react";
import { Card, Button } from "@/components/radar";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — RADARMe" },
      { name: "description", content: "Your artist profile inside RADARMe." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { session, signOut } = useAuth();
  const name = session?.profile?.displayName || "Your artist";
  const handle = session?.profile?.username ? `@${session.profile.username}` : "@artist";
  const role = session?.profile?.role || "Artist";
  const initials =
    name
      .split(" ")
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "R";

  return (
    <div className="space-y-6 pt-2">
      <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Profile</p>

      <Card className="overflow-hidden">
        <div
          aria-hidden
          className="h-24 w-full"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        <div className="-mt-10 px-5 pb-5">
          <div className="flex items-end justify-between">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-surface-2 font-display text-2xl font-semibold text-gold hairline">
              {initials}
            </div>
            <Button variant="secondary" size="sm">
              <Edit3 size={14} /> Edit
            </Button>
          </div>
          <h1 className="mt-4 font-display text-2xl font-semibold leading-tight">{name}</h1>
          <p className="text-sm text-muted-foreground">
            {handle} · {role}
          </p>
        </div>
      </Card>

      <section className="grid grid-cols-3 gap-2">
        {[
          { label: "Reach", value: "—" },
          { label: "Followers", value: "—" },
          { label: "Tracks", value: "—" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-surface p-3 text-center hairline elev-1">
            <div className="font-display text-lg font-semibold">{s.value}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Account
        </h2>
        <ul className="divide-y divide-[color:var(--hairline)] overflow-hidden rounded-2xl bg-surface hairline elev-1">
          <Row icon={<SettingsIcon size={16} />} label="Settings" hint="Preferences & appearance" />
          <Row icon={<Shield size={16} />} label="Privacy & security" hint="Manage data & access" />
          <Row icon={<Award size={16} />} label="Verification" hint="Coming soon" />
        </ul>
      </section>

      <Button variant="ghost" className="w-full" onClick={() => signOut()}>
        <LogOut size={16} /> Sign out
      </Button>
    </div>
  );
}

function Row({ icon, label, hint }: { icon: React.ReactNode; label: string; hint: string }) {
  return (
    <li>
      <Link
        to="/settings"
        className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-2"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-gold">
          {icon}
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium">{label}</span>
          <span className="block text-xs text-muted-foreground">{hint}</span>
        </span>
      </Link>
    </li>
  );
}
