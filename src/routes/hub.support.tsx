import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, MessageCircle, Mail, BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button, Card, Input } from "@/components/radar";
import { ServicePage, SectionHeader } from "@/components/hub";

export const Route = createFileRoute("/hub/support")({
  head: () => ({
    meta: [
      { title: "Support Centre — RADARMe" },
      { name: "description", content: "Guides, live chat and priority support for RADARMe artists." },
    ],
  }),
  component: SupportPage,
});

const FAQS = [
  {
    q: "How long does distribution take?",
    a: "Most DSPs go live within 24–72 hours of delivery. Priority routing on the Album plan targets 24 hours or less.",
  },
  {
    q: "Do I keep 100% of my royalties?",
    a: "Yes. RADARMe never takes a cut of your streaming royalties. You only pay the flat release fee.",
  },
  {
    q: "Can I get a refund on services?",
    a: "Editorial, marketing and consultation services can be refunded before delivery begins. See our refund policy for details.",
  },
  {
    q: "How do playlist pitches get placed?",
    a: "We route your track to matched curators; final placement is at each curator's discretion. Placement rates vary by genre.",
  },
];

const CHANNELS = [
  { icon: MessageCircle, title: "Live chat", hint: "Avg. reply · 3 min", cta: "Start chat" },
  { icon: Mail, title: "Email support", hint: "support@radarme.app", cta: "Send email" },
  { icon: BookOpen, title: "Help articles", hint: "120+ guides", cta: "Browse" },
];

function SupportPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ServicePage
      eyebrow="RADARHub · Support"
      title="We've got you covered."
      description="Chat with a human, browse guides or open a ticket — the RADARMe team responds fast."
      icon={<LifeBuoy size={22} />}
    >
      <Input placeholder="Search help articles…" className="h-11 rounded-full" />

      <section className="grid gap-2 sm:grid-cols-3">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.title} className="p-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-gold">
                <Icon size={16} />
              </span>
              <h3 className="mt-3 text-sm font-semibold">{c.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.hint}</p>
              <Button variant="secondary" size="sm" className="mt-3 w-full">
                {c.cta}
              </Button>
            </Card>
          );
        })}
      </section>

      <section className="space-y-3">
        <SectionHeader title="Frequent questions" />
        <ul className="overflow-hidden rounded-2xl bg-surface hairline elev-1">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={f.q}
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-2"
                >
                  <span className="flex-1 text-sm font-medium">{f.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl bg-surface p-5 hairline elev-1">
        <h3 className="font-display text-lg font-semibold">Still stuck?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Open a priority ticket and a specialist will follow up within 4 hours.
        </p>
        <Button variant="gold" size="sm" className="mt-3">
          Open a ticket
        </Button>
      </section>
    </ServicePage>
  );
}