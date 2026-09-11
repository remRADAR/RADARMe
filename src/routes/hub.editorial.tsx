import { createFileRoute } from "@tanstack/react-router";
import { PenLine, Newspaper, Mic, Camera } from "lucide-react";
import { Button, Card } from "@/components/radar";
import { ServicePage, SectionHeader } from "@/components/hub";

export const Route = createFileRoute("/hub/editorial")({
  head: () => ({
    meta: [
      { title: "Editorial Services — RADARMe" },
      {
        name: "description",
        content:
          "Press releases, interviews, cover stories and blog placements handled by the RADARMe editorial team.",
      },
    ],
  }),
  component: EditorialPage,
});

const OFFERS = [
  {
    icon: Newspaper,
    title: "Press release",
    price: "$79",
    body: "Wire-ready release drafted, edited and distributed to 40+ music outlets.",
  },
  {
    icon: Mic,
    title: "Feature interview",
    price: "$249",
    body: "Long-form Q&A with a RADARMe editor, published on our network.",
  },
  {
    icon: Camera,
    title: "Cover story",
    price: "$899",
    body: "Photoshoot direction, editorial write-up and homepage placement.",
  },
  {
    icon: PenLine,
    title: "Blog placement",
    price: "$59",
    body: "Targeted placement on genre-relevant blogs and Substacks.",
  },
];

function EditorialPage() {
  return (
    <ServicePage
      eyebrow="RADARHub · Editorial"
      title="Own the story around your music."
      description="Editorial writers, publicists and photographers on demand — from single press notes to full cover treatments."
      icon={<PenLine size={22} />}
      actions={
        <>
          <Button variant="gold" size="sm">
            Pitch a story
          </Button>
          <Button variant="secondary" size="sm">
            Editorial calendar
          </Button>
        </>
      }
    >
      <section className="space-y-3">
        <SectionHeader title="Services" />
        <div className="grid gap-3 sm:grid-cols-2">
          {OFFERS.map((o) => {
            const Icon = o.icon;
            return (
              <Card key={o.title} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-gold">
                    <Icon size={16} />
                  </span>
                  <span className="font-display text-lg font-semibold">{o.price}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold">{o.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{o.body}</p>
                <Button variant="secondary" size="sm" className="mt-3 w-full">
                  Request
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-surface p-5 hairline elev-1">
        <h3 className="font-display text-lg font-semibold">Bespoke campaigns</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Need something more? Our editors design custom rollouts around album cycles, tours and
          brand partnerships.
        </p>
        <Button variant="gold" size="sm" className="mt-3">
          Request a brief
        </Button>
      </section>
    </ServicePage>
  );
}
