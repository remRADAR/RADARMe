import { createFileRoute } from "@tanstack/react-router";
import { Wallet as WalletIcon, ArrowDownRight, ArrowUpRight, CreditCard, Plus } from "lucide-react";
import { Button, Card } from "@/components/radar";
import { ServicePage, SectionHeader } from "@/components/hub";

export const Route = createFileRoute("/hub/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet — RADARMe" },
      { name: "description", content: "Balance, earnings and payouts across every RADARMe service." },
    ],
  }),
  component: WalletPage,
});

const TXNS = [
  { kind: "in", title: "Royalties · June", note: "Streaming payout", amount: "+$248.20", date: "Jul 2" },
  { kind: "out", title: "Playlist Pitch", note: "Momentum plan", amount: "-$49.00", date: "Jun 28" },
  { kind: "in", title: "Referral bonus", note: "3 sign-ups", date: "Jun 22", amount: "+$30.00" },
  { kind: "out", title: "Distribution", note: "Album release", amount: "-$29.00", date: "Jun 14" },
];

function WalletPage() {
  return (
    <ServicePage
      eyebrow="RADARHub · Wallet"
      title="Your RADARMe balance."
      description="Track royalties, service credits and payouts. Top up once, pay for everything across RADARHub."
      icon={<WalletIcon size={22} />}
    >
      <Card className="p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Available balance
          </span>
          <span className="text-[11px] text-muted-foreground">USD</span>
        </div>
        <div className="mt-2 font-display text-4xl font-semibold">$200.20</div>
        <div className="mt-1 text-xs text-muted-foreground">
          Next payout: <span className="text-foreground">Aug 1</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="gold" size="sm">
            <Plus size={14} /> Top up
          </Button>
          <Button variant="secondary" size="sm">
            <ArrowDownRight size={14} /> Withdraw
          </Button>
          <Button variant="ghost" size="sm">
            <CreditCard size={14} /> Payment methods
          </Button>
        </div>
      </Card>

      <section className="grid grid-cols-2 gap-2">
        <MiniStat label="Lifetime earnings" value="$1,842.60" />
        <MiniStat label="Spent this year" value="$412.00" />
      </section>

      <section className="space-y-3">
        <SectionHeader title="Recent activity" />
        <ul className="divide-y divide-[color:var(--hairline)] overflow-hidden rounded-2xl bg-surface hairline elev-1">
          {TXNS.map((t, i) => (
            <li key={i} className="flex items-center gap-3 px-4 py-3.5">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                  t.kind === "in" ? "bg-emerald-500/15 text-emerald-400" : "bg-surface-2 text-muted-foreground"
                }`}
              >
                {t.kind === "in" ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{t.title}</div>
                <div className="truncate text-xs text-muted-foreground">{t.note}</div>
              </div>
              <div className="text-right">
                <div
                  className={`font-display text-sm font-semibold ${
                    t.kind === "in" ? "text-emerald-400" : "text-foreground"
                  }`}
                >
                  {t.amount}
                </div>
                <div className="text-[11px] text-muted-foreground">{t.date}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-center text-[11px] text-muted-foreground">
        Payment processing will activate once billing is enabled.
      </p>
    </ServicePage>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface p-3 hairline elev-1">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-lg font-semibold">{value}</div>
    </div>
  );
}