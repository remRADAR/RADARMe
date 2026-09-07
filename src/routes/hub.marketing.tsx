import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Instagram, Youtube, Music2, Users } from "lucide-react";
import { Button, Card } from "@/components/radar";
import {
  ServicePage,
  SectionHeader,
  PricingTier,
  TierGrid,
  type PricingTierData,
} from "@/components/hub";

export const Route = createFileRoute("/hub/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing Services — RADARMe" },
      {
        name: "description",
        content:
          "Grow your fanbase with targeted marketing campaigns run by the RADARMe team.",
      },
    ],
  }),
  component: MarketingPage,
});

const PACKAGES: PricingTierData[] = [
  {
    name: "Spark",
    price: "$149",
    tagline: "Awareness push for a new release.",
    features: ["7-day IG + TikTok run", "Creator brief included", "Weekly reporting"],
  },
  {
    name: "Momentum",
    price: "$499",
    tagline: "Full-funnel campaign, 4 weeks.",
    features: [
      "IG, TikTok, YouTube Shorts",
      "5 creators activated",
      "Landing page & pixel setup",
      "Weekly optimisation calls",
    ],
    featured: true,
  },
];

const CHANNELS = [
  { icon: Instagram, name: "Instagram Reels" },
  { icon: Music2, name: "TikTok" },
  { icon: Youtube, name: "YouTube Shorts" },
  { icon: Users, name: "Creator collabs" },
];

function MarketingPage() {
  return (
    <ServicePage
      eyebrow="RADARHub · Marketing"
      title="Reach fans that actually listen."
      description="Full-service campaigns across social, creator networks and paid media — run by strategists who know music."
      icon={<Megaphone size={22} />}
      actions={
        <>
          <Button variant="gold" size="sm">Start a campaign</Button>
          <Button variant="secondary" size="sm">Talk to a strategist</Button>
        </>
      }
    >
      <section className="space-y-3">
        <SectionHeader title="Packages" />
        <TierGrid>
          {PACKAGES.map((p) => (
            <PricingTier key={p.name} tier={p} />
          ))}
        </TierGrid>
      </section>

      <section className="space-y-3">
        <SectionHeader title="Channels" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CHANNELS.map(({ icon: Icon, name }) => (
            <Card key={name} className="p-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-gold">
                <Icon size={14} />
              </span>
              <div className="mt-2 text-xs font-medium">{name}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeader title="Active campaigns" />
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No campaigns yet — brief the team to launch your first push.
          </p>
          <Button variant="gold" size="sm" className="mt-3">
            Brief the team
          </Button>
        </Card>
      </section>
    </ServicePage>
  );
}