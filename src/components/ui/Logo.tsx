import { cn } from "@/lib/cn";

/**
 * Original mark: a rounded tile holding an abstract "r" drawn as a
 * connected path between two nodes — software joined by intelligence.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="9" fill="#111318" />
      <path
        d="M11 23V14.5C11 11.5 13.2 9.5 16.2 9.5H19"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="22" cy="9.5" r="2.6" fill="#7b6dff" />
      <circle cx="11" cy="23" r="1.6" fill="#fff" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "text-[17px] font-semibold tracking-[-0.03em]",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        Rian
        <span className={tone === "dark" ? "text-muted font-medium" : "text-white/60 font-medium"}>
          {" "}
          Infotech
        </span>
      </span>
    </span>
  );
}
