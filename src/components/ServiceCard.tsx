import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { trackSpotlight } from "@/lib/spotlight";

type ServiceCardProps = {
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  visual: React.ReactNode;
  tone?: "light" | "dark";
  /** "stack": copy above visual. "split": copy beside visual from md up. */
  layout?: "stack" | "split";
  className?: string;
};

export function ServiceCard({
  index,
  icon: Icon,
  title,
  description,
  href,
  visual,
  tone = "light",
  layout = "stack",
  className,
}: ServiceCardProps) {
  const dark = tone === "dark";

  return (
    <article
      onPointerMove={trackSpotlight}
      style={dark ? ({ "--spot-color": "rgb(123 109 255 / 0.22)" } as React.CSSProperties) : undefined}
      className={cn(
        "spotlight group relative isolate flex h-full overflow-hidden rounded-[24px] border p-6 sm:p-8",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1",
        "focus-within:-translate-y-1",
        dark
          ? "border-night-line bg-night text-white shadow-[0_30px_60px_-30px_rgb(12_13_18/0.6)] hover:border-accent/50"
          : "border-line bg-white shadow-soft hover:border-accent/25 hover:shadow-lift",
        layout === "split" ? "flex-col gap-8 md:flex-row md:items-center md:gap-12" : "flex-col",
        className,
      )}
    >
      {/* Accent hairline that draws across the top on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
      />

      <div className={cn("flex flex-col", layout === "split" && "md:w-[42%] md:shrink-0")}>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "grid size-11 place-items-center rounded-xl border transition-[transform,background-color,color,border-color] duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110",
              dark
                ? "border-white/10 bg-white/5 text-white group-hover:border-accent/40 group-hover:bg-accent group-hover:text-white"
                : "border-line bg-canvas text-ink group-hover:border-accent/20 group-hover:bg-accent-soft group-hover:text-accent",
            )}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <span className={cn("font-mono text-[12px] tracking-[0.12em]", dark ? "text-white/40" : "text-subtle")}>
            {index}
          </span>
        </div>

        <h3
          className={cn(
            "mt-8 text-[22px] font-semibold leading-tight tracking-[-0.03em] sm:text-[26px]",
            dark ? "text-white" : "text-ink",
          )}
        >
          {/* Stretched link: the whole card is clickable, but only the title is announced */}
          <a href={href} className="outline-none after:absolute after:inset-0 after:z-10 after:rounded-[24px] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent">
            {title}
          </a>
        </h3>
        <p className={cn("mt-3 max-w-md text-[15.5px] leading-relaxed", dark ? "text-white/60" : "text-muted")}>
          {description}
        </p>

        <span
          aria-hidden
          className={cn(
            "mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium transition-colors duration-300",
            dark ? "text-white/80 group-hover:text-white" : "text-ink-2 group-hover:text-accent",
          )}
        >
          Learn more
          <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-1" />
        </span>
      </div>

      <div aria-hidden className={cn("relative", layout === "stack" ? "mt-8 flex-1" : "flex-1 md:min-w-0")}>
        {visual}
      </div>
    </article>
  );
}
