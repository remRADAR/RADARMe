import { createFileRoute } from "@tanstack/react-router";
import { UploadCloud, Music2, Radio, Globe2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/radar";
import { ReleaseCard } from "@/components/music/ReleaseCard";
import {
  ServicePage,
  SectionHeader,
  PricingTier,
  TierGrid,
  type PricingTierData,
} from "@/components/hub";

export const Route = createFileRoute("/hub/distribution")({
  head: () => ({
    meta: [
      { title: "Music Distribution — RADARMe" },
      {
        name: "description",
        content:
          "Distribute your music to every major DSP with RADARMe — Spotify, Apple Music, Tidal, Amazon and more.",
      },
    ],
  }),
  component: DistributionPage,
});

const TIERS: PricingTierData[] = [
  {
    name: "Single",
    price: "$9",
    cadence: "release",
    tagline: "One track, unlimited stores.",
    features: [
      "Distribution to 150+ DSPs",
      "Keep 100% royalties",
      "Basic analytics",
      "ISRC included",
    ],
  },
  {
    name: "Album",
    price: "$29",
    cadence: "release",
    tagline: "Up to 15 tracks, priority delivery.",
    features: [
      "Everything in Single",
      "Pre-save campaigns",
      "Editorial pitch tool",
      "Priority DSP delivery",
    ],
    featured: true,
  },
];

const DSPS = [
  "Spotify",
  "Apple Music",
  "Amazon Music",
  "Tidal",
  "YouTube Music",
  "Deezer",
  "Boomplay",
  "Audiomack",
];

function DistributionPage() {
  return (
    <ServicePage
      eyebrow="RADARHub · Distribution"
      title="Ship your music everywhere."
      description="Upload once. Deliver to 150+ streaming platforms with priority routing, ISRC codes and full royalty transparency."
      icon={<UploadCloud size={22} />}
      actions={
        <>
          <Button variant="gold" size="sm">
            <UploadCloud size={14} /> Start release
          </Button>
          <Button variant="secondary" size="sm">
            View my releases
          </Button>
        </>
      }
    >
      <section className="grid grid-cols-3 gap-2">
        <Stat icon={<Music2 size={14} />} label="Releases" value="0" />
        <Stat icon={<Radio size={14} />} label="Streams" value="—" />
        <Stat icon={<Globe2 size={14} />} label="Territories" value="200+" />
      </section>

      <section className="space-y-3">
        <SectionHeader title="Release workspace" hint="Artwork preview · replace anytime" />
        <ReleaseCard title="Untitled release" artist="Your artist profile" />
      </section>

      <section className="space-y-3">
        <SectionHeader title="Plans" hint="Transparent pricing. Keep 100% of your royalties." />
        <TierGrid>
          {TIERS.map((t) => (
            <PricingTier key={t.name} tier={t} />
          ))}
        </TierGrid>
      </section>

      <section className="space-y-3">
        <SectionHeader title="Delivered to" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {DSPS.map((d) => (
            <div key={d} className="flex items-center gap-2 rounded-xl bg-surface p-3 hairline">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-surface-2 text-gold">
                <Music2 size={12} />
              </span>
              <span className="truncate text-xs font-medium">{d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-surface p-4 hairline elev-1">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-gold">
            <ShieldCheck size={16} />
          </span>
          <div>
            <h3 className="text-sm font-semibold">Rights protection included</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Content ID enrollment, takedown support and split-royalty automation ship with every
              plan.
            </p>
          </div>
        </div>
      </section>
    </ServicePage>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface p-3 text-center hairline elev-1">
      <div className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-surface-2 text-gold">
        {icon}
      </div>
      <div className="mt-2 font-display text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}
