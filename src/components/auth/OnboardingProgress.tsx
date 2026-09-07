type Props = { step: number; total: number };

export function OnboardingProgress({ step, total }: Props) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const active = i < step;
        const current = i === step - 1;
        return (
          <span
            key={i}
            className="h-1 flex-1 overflow-hidden rounded-full bg-surface-2"
            aria-hidden
          >
            <span
              className="block h-full origin-left rounded-full transition-transform duration-500 ease-out"
              style={{
                background: active ? "var(--gold)" : "transparent",
                transform: active ? "scaleX(1)" : "scaleX(0)",
                boxShadow: current ? "0 0 12px var(--gold)" : undefined,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}