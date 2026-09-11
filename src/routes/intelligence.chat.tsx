import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare, Sparkles, Send } from "lucide-react";
import { IntelPage } from "@/components/intelligence/IntelPage";
import { Input, Button } from "@/components/radar";
import { useState } from "react";

export const Route = createFileRoute("/intelligence/chat")({
  head: () => ({ meta: [{ title: "AI Conversation — RADAR Intelligence" }] }),
  component: Chat,
});

type Msg = { role: "you" | "ai"; text: string };

const seed: Msg[] = [
  {
    role: "ai",
    text: "Good evening — you're up 24.6% this month. Want to double down on Lagos or scale to a new city?",
  },
  { role: "you", text: "What's the fastest way to land an editorial playlist?" },
  {
    role: "ai",
    text: "Three moves this week: (1) pitch Afro RADAR via RADARHub, (2) tag two curators in your release rollout, (3) ship a stripped acoustic cut as a follow-up.",
  },
];

function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [text, setText] = useState("");
  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [
      ...m,
      { role: "you", text },
      { role: "ai", text: "Placeholder response — RADAR Intelligence would answer here." },
    ]);
    setText("");
  };
  return (
    <IntelPage
      eyebrow="AI Conversation"
      title="Ask anything about your career."
      kicker="Placeholder conversation — model wiring lands with Cloud AI."
      icon={<MessagesSquare size={22} />}
    >
      <div className="space-y-3">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed hairline ${
              m.role === "ai" ? "bg-surface glass-reflect" : "ml-auto bg-gold text-gold-foreground"
            }`}
          >
            {m.role === "ai" && (
              <p className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-gold">
                <Sparkles size={10} /> RADAR
              </p>
            )}
            {m.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="sticky bottom-4 mt-6"
      >
        <Input
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          leading={<Sparkles size={16} className="text-gold" />}
          placeholder="Ask RADAR anything…"
          className="h-14 rounded-full pr-1"
          trailing={
            <Button type="submit" variant="gold" size="sm" className="h-10 w-10 rounded-full p-0">
              <Send size={14} />
            </Button>
          }
        />
      </form>
    </IntelPage>
  );
}
