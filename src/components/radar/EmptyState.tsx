import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ icon, title, description, action, className }: Props) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-sm flex-col items-center justify-center gap-4 p-8 text-center",
        className,
      )}
    >
      {icon && (
        <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-surface-2 hairline">
          <span className="text-gold">{icon}</span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: "var(--gradient-radial-gold)" }}
          />
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
}
