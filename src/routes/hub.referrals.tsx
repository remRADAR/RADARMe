import { createFileRoute } from "@tanstack/react-router";
import { Gift, Copy, Share2, Users } from "lucide-react";
import { Button, Card } from "@/components/radar";
import { ServicePage, SectionHeader } from "@/components/hub";

export const Route = createFileRoute("/hub/referrals")({
  head: () => ({
    meta: [
      { title: "Referral Centre — RADARMe" },
      { name: "description", content: "Invite artists to RADARMe and earn credits for every sign-up." },
    ],
  }),
  component: ReferralsPage,
});

const TIERS = [
  { name: "Starter", need: "1 referral", reward: "$10 credit" },
  { name: "Amplifier", need: "5 referrals", reward: "$75 credit + gold badge" },
  { name: "Insider", need: "15 referrals", reward: "$300 credit + free campaign" },
];

const REFERRED = [
  { name: "Kojo Mensah", status: "Signed up", when: "Jun 28" },
  { name: "Ines Farah", status: "Onboarded", when: "Jun 24" },
  { name: "Marc Aurel", status: "Invited", when: "Jun 18" },
];

function ReferralsPage() {
  return (
    <ServicePage
      eyebrow="RADARHub · Referrals"
      title="Bring your circle in."
      description="Every artist you refer earns you credit toward distribution, marketing and consultations."
      icon={<Gift size={22} />}
    >
      <Card className="p-5">
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Your referral link
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2 hairline">
          <code className="flex-1 truncate text-xs">radarme.app/join/artist-8f2a</code>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Copy size={14} />
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="gold" size="sm">
            <Share2 size={14} /> Share link
          </Button>
          <Button variant="secondary" size="sm">Invite by email</Button>
        </div>
      </Card>

      <section className="grid grid-cols-3 gap-2">
        <MiniStat label="Invites sent" value="12" />
        <MiniStat label="Sign-ups" value="3" />
        <MiniStat label="Credit earned" value="$30" />
      </section>

      <section className="space-y-3">
        <SectionHeader title="Reward tiers" />
        <div className="grid gap-2 sm:grid-cols-3">
          {TIERS.map((t) => (
            <Card key={t.name} className="p-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.need}
              </div>
              <div className="mt-1 font-display text-lg font-semibold">{t.name}</div>
              <div className="mt-2 text-xs text-gold">{t.reward}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeader title="Your referrals" />
        <ul className="divide-y divide-[color:var(--hairline)] overflow-hidden rounded-2xl bg-surface hairline elev-1">
          {REFERRED.map((r) => (
            <li key={r.name} className="flex items-center gap-3 px-4 py-3.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-gold">
                <Users size={14} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{r.name}</div>
                <div className="text-[11px] text-muted-foreground">{r.when}</div>
              </div>
              <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {r.status}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </ServicePage>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface p-3 text-center hairline elev-1">
      <div className="font-display text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}