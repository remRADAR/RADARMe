import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare, Send } from "lucide-react";
import { MotherPage, MotherSection, Avatar } from "@/components/motherland/MotherPage";
import { Input } from "@/components/radar";

export const Route = createFileRoute("/motherland/messages")({
  head: () => ({
    meta: [
      { title: "Messages — MOTHERLand" },
      {
        name: "description",
        content: "Private, warm conversations with the women you create alongside.",
      },
    ],
  }),
  component: MessagesPage,
});

const THREADS = [
  { name: "Isla Moreno", last: "Sending the vocal stems now ✨", time: "2m", unread: 2 },
  { name: "Nadia Vasquez", last: "Loved the pitch. Let's refine tomorrow.", time: "1h", unread: 0 },
  {
    name: "Producers' brunch",
    last: "Kemi: bringing pastries!",
    time: "3h",
    unread: 5,
    group: true,
  },
  { name: "Fatima Diallo", last: "Session confirmed for Friday.", time: "Yesterday", unread: 0 },
  { name: "Amara Okonkwo", last: "That kick pattern was insane 🔥", time: "2d", unread: 0 },
];

function MessagesPage() {
  return (
    <MotherPage
      eyebrow="MOTHERLand · Messages"
      title="Warm, private, unhurried."
      description="Conversations with the women you make things with. No read receipts unless you want them."
      icon={<MessagesSquare size={22} />}
    >
      <Input placeholder="Search conversations…" leading={<Send size={14} />} />

      <MotherSection title="Recent">
        <ul className="divide-y divide-[color:var(--hairline)] overflow-hidden rounded-2xl bg-surface hairline elev-1">
          {THREADS.map((t) => (
            <li key={t.name} className="flex items-center gap-3 px-4 py-3.5">
              <Avatar name={t.name} tone={t.group ? "bloom" : "rose"} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="truncate text-sm font-semibold">{t.name}</div>
                  {t.group && (
                    <span className="rounded-full bg-surface-2 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      Group
                    </span>
                  )}
                </div>
                <div className="truncate text-[11px] text-muted-foreground">{t.last}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground">{t.time}</div>
                {t.unread > 0 && (
                  <span
                    className="mt-1 inline-grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-semibold"
                    style={{ background: "var(--rose)", color: "var(--gold-foreground)" }}
                  >
                    {t.unread}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </MotherSection>
    </MotherPage>
  );
}
