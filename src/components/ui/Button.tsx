import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse" | "ghost-inverse";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_8px_20px_-8px_rgb(17_19_24/0.5)] hover:bg-accent hover:shadow-[0_1px_0_rgb(255_255_255/0.2)_inset,0_14px_30px_-10px_rgb(91_76_240/0.6)]",
  secondary:
    "bg-white text-ink border border-line shadow-soft hover:border-ink/20 hover:bg-white",
  inverse:
    "bg-white text-ink hover:bg-accent-soft shadow-[0_10px_30px_-12px_rgb(255_255_255/0.4)]",
  "ghost-inverse":
    "border border-white/15 text-white hover:border-white/35 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-4.5 text-sm",
  lg: "h-12 px-5.5 text-[15px]",
};

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
};

/**
 * Anchor styled as a button. Motion is pure CSS: a 1px lift, a tiny scale
 * and the arrow nudging right — cheap, and automatically reduced-motion safe.
 */
export function ButtonLink({
  variant = "primary",
  size = "lg",
  arrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium tracking-[-0.01em]",
        "transition-[background-color,border-color,box-shadow,transform,color] duration-300 ease-[var(--ease-out-expo)]",
        "hover:-translate-y-px hover:scale-[1.015] active:translate-y-0 active:scale-[0.985]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1.5"
        />
      )}
    </a>
  );
}
