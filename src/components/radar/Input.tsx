import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leading?: ReactNode;
  trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leading, trailing, type = "text", ...props }, ref) => {
    return (
      <div
        className={cn(
          "group flex h-11 w-full items-center gap-2 rounded-full bg-surface-2 px-4 hairline",
          "transition-colors focus-within:border-transparent focus-within:ring-2 focus-within:ring-ring",
          className,
        )}
      >
        {leading && <span className="flex shrink-0 text-muted-foreground">{leading}</span>}
        <input
          ref={ref}
          type={type}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm text-foreground",
            "placeholder:text-muted-foreground focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...props}
        />
        {trailing && <span className="flex shrink-0 text-muted-foreground">{trailing}</span>}
      </div>
    );
  },
);
Input.displayName = "Input";
