import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Moon, Sun, Bell, Shield, Globe2, HelpCircle, Info } from "lucide-react";
import { Card, Button } from "@/components/radar";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — RADARMe" },
      { name: "description", content: "Configure your RADARMe experience." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  const { signOut } = useAuth();
  const dark = theme === "dark";

  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-center gap-3">
        <Link
          to="/profile"
          aria-label="Back"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-muted-foreground hover:text-foreground hairline"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Settings</p>
          <h1 className="font-display text-2xl font-semibold leading-tight">Preferences</h1>
        </div>
      </div>

      <Group label="Appearance">
        <li>
          <button
            type="button"
            onClick={toggle}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-2"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-gold">
              {dark ? <Moon size={16} /> : <Sun size={16} />}
            </span>
            <span className="flex-1">
              <span className="block text-sm font-medium">Theme</span>
              <span className="block text-xs text-muted-foreground">
                {dark ? "Dark (default)" : "Light"} — tap to switch
              </span>
            </span>
            <span
              className={[
                "relative h-6 w-11 rounded-full transition-colors",
                dark ? "bg-gold" : "bg-surface-2 hairline",
              ].join(" ")}
              aria-hidden
            >
              <span
                className={[
                  "absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform",
                  dark ? "translate-x-[22px]" : "translate-x-0.5",
                ].join(" ")}
              />
            </span>
          </button>
        </li>
      </Group>

      <Group label="System">
        <Row icon={<Bell size={16} />} label="Notifications" hint="Push, email, in-app" />
        <Row icon={<Shield size={16} />} label="Privacy & security" hint="Data controls" />
        <Row icon={<Globe2 size={16} />} label="Language & region" hint="English (default)" />
      </Group>

      <Group label="Support">
        <Row icon={<HelpCircle size={16} />} label="Help center" hint="Guides & FAQs" />
        <Row icon={<Info size={16} />} label="About RADARMe" hint="v0.1 · Foundation" />
      </Group>

      <Button variant="ghost" className="w-full" onClick={() => signOut()}>
        Sign out
      </Button>

      <p className="pb-4 text-center text-[11px] text-muted-foreground">
        RADARMe by RADARCharts by REM
      </p>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </h2>
      <Card className="overflow-hidden p-0">
        <ul className="divide-y divide-[color:var(--hairline)]">{children}</ul>
      </Card>
    </section>
  );
}

function Row({ icon, label, hint }: { icon: React.ReactNode; label: string; hint: string }) {
  return (
    <li>
      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-2"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-gold">
          {icon}
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium">{label}</span>
          <span className="block text-xs text-muted-foreground">{hint}</span>
        </span>
      </button>
    </li>
  );
}
