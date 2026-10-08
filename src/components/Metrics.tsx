import { Counter } from "@/components/ui/Counter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/cn";

/**
 * Deliberately framed as capabilities and commitments rather than
 * company statistics — nothing here claims a verified track record.
 */
const METRICS = [
  { value: 4, suffix: "", label: "Core disciplines", detail: "AI, automation, software and product" },
  { value: 3, suffix: "", label: "Phase delivery model", detail: "Discover, build and scale" },
  { value: 24, suffix: "/7", label: "Automation potential", detail: "Systems that keep working after hours" },
  { value: 100, suffix: "%", label: "Built around your goals", detail: "No templates, no one-size-fits-all" },
];

export function Metrics() {
  return (
    <section aria-labelledby="metrics-title" className="pb-24 sm:pb-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <SectionLabel index="08">By design</SectionLabel>
            <h2 id="metrics-title" className="mt-4 text-[26px] font-semibold tracking-[-0.035em] text-ink sm:text-[30px]">
              How we&apos;re built to work.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs font-mono text-[11.5px] leading-relaxed text-subtle sm:text-right">
              Capabilities and commitments — not borrowed statistics.
            </p>
          </Reveal>
        </div>

        <StaggerContainer as="dl" className="mt-10 grid grid-cols-2 border-t border-line lg:grid-cols-4" stagger={0.08}>
          {METRICS.map((m, i) => (
            <StaggerItem
              key={m.label}
              className={cn(
                "group relative flex flex-col-reverse border-b border-line py-8 pr-4 sm:py-10 lg:border-b-0",
                i % 2 === 1 && "border-l pl-4 sm:pl-8",
                i % 2 === 0 && i > 0 && "lg:border-l lg:pl-8",
              )}
            >
              <dt className="mt-3">
                <span className="block text-[14.5px] font-semibold tracking-[-0.01em] text-ink">{m.label}</span>
                <span className="mt-1 block text-[13px] leading-snug text-muted">{m.detail}</span>
              </dt>
              <dd className="text-[clamp(2.75rem,2rem+3vw,4.75rem)] font-semibold leading-none tracking-[-0.06em] text-ink tabular-nums transition-colors duration-300 group-hover:text-accent">
                <Counter to={m.value} suffix={m.suffix} />
              </dd>
              <span
                aria-hidden
                className="absolute left-0 top-[-1px] h-px w-0 bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
