import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  description?: string;
  action?: ReactNode;
  onRetry?: () => void;
  className?: string;
};

export function ErrorState({
  title = "Something went off-radar",
  description = "We couldn't complete that request. Please try again in a moment.",
  action,
  onRetry,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-sm flex-col items-center justify-center gap-4 p-8 text-center",
        className,
      )}
    >
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-surface-2 hairline text-destructive">
        <AlertTriangle size={24} />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="pt-1">
        {action ?? (
          onRetry && (
            <Button variant="secondary" size="sm" onClick={onRetry}>
              Try again
            </Button>
          )
        )}
      </div>
    </div>
  );
}