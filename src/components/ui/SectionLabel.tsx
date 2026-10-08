import { cn } from "@/lib/cn";

type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Editorial eyebrow: "03 — Services" in mono, with a hairline. */
export function SectionLabel({ index, children, tone = "light", className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]",
        tone === "light" ? "text-muted" : "text-white/55",
        className,
      )}
    >
      <span className={tone === "light" ? "text-accent" : "text-accent-2"}>{index}</span>
      <span aria-hidden className={cn("h-px w-8", tone === "light" ? "bg-line" : "bg-white/15")} />
      <span>{children}</span>
    </p>
  );
}
