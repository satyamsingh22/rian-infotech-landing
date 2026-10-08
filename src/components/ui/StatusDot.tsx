import { cn } from "@/lib/cn";

type StatusDotProps = {
  tone?: "signal" | "accent" | "warn" | "idle";
  pulse?: boolean;
  className?: string;
};

const tones = {
  signal: "bg-signal",
  accent: "bg-accent",
  warn: "bg-warn",
  idle: "bg-subtle/60",
};

/** Tiny live indicator. The ring is a CSS animation on transform/opacity only. */
export function StatusDot({ tone = "signal", pulse = false, className }: StatusDotProps) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-1.5 shrink-0", className)}>
      {pulse && (
        <span className={cn("absolute inset-0 rounded-full animate-pulse-ring", tones[tone])} />
      )}
      <span className={cn("relative inline-flex size-1.5 rounded-full", tones[tone])} />
    </span>
  );
}
