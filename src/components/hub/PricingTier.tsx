import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/radar";
import { cn } from "@/lib/utils";

export type PricingTierData = {
  name: string;
  price: string;
  cadence?: string;
  tagline: string;
  features: string[];
  cta?: string;
  featured?: boolean;
};

export function PricingTier({ tier, onSelect }: { tier: PricingTierData; onSelect?: () => void }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl p-5 hairline elev-1",
        tier.featured ? "bg-surface-2" : "bg-surface",
      )}
    >
      {tier.featured && (
        <span className="absolute -top-2 right-4 rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-foreground">
          Popular
        </span>
      )}
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-lg font-semibold">{tier.name}</h3>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{tier.tagline}</p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-3xl font-semibold">{tier.price}</span>
        {tier.cadence && <span className="text-xs text-muted-foreground">/ {tier.cadence}</span>}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
              <Check size={11} />
            </span>
            <span className="text-foreground/90">{f}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={tier.featured ? "gold" : "secondary"}
        size="sm"
        className="mt-5 w-full"
        onClick={onSelect}
      >
        {tier.cta || "Get started"}
      </Button>
    </div>
  );
}

export function TierGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}
