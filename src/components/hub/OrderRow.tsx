import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type OrderStatus =
  | "pending"
  | "in_review"
  | "processing"
  | "delivered"
  | "cancelled";

const STATUS_META: Record<OrderStatus, { label: string; tone: string }> = {
  pending: { label: "Pending", tone: "bg-surface-2 text-muted-foreground" },
  in_review: { label: "In review", tone: "bg-gold/15 text-gold" },
  processing: { label: "Processing", tone: "bg-gold/15 text-gold" },
  delivered: { label: "Delivered", tone: "bg-emerald-500/15 text-emerald-400" },
  cancelled: { label: "Cancelled", tone: "bg-destructive/15 text-destructive" },
};

export function StatusPill({ status }: { status: OrderStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        meta.tone,
      )}
    >
      {meta.label}
    </span>
  );
}

export function OrderRow({
  icon,
  title,
  subtitle,
  amount,
  status,
  date,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  amount: string;
  status: OrderStatus;
  date: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-2"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-2 text-gold">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-semibold">{title}</span>
          <span className="shrink-0 font-display text-sm font-semibold">{amount}</span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <span className="truncate text-xs text-muted-foreground">{subtitle}</span>
          <div className="flex shrink-0 items-center gap-2">
            <StatusPill status={status} />
            <span className="text-[11px] text-muted-foreground">{date}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export function OrderList({ children }: { children: ReactNode }) {
  return (
    <ul className="divide-y divide-[color:var(--hairline)] overflow-hidden rounded-2xl bg-surface hairline elev-1">
      {children}
    </ul>
  );
}