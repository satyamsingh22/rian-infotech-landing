"use client";

import { Blocks, Cpu, Target, Workflow, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/cn";
import { trackSpotlight } from "@/lib/spotlight";

type Benefit = { icon: LucideIcon; title: string; body: string };

const BENEFITS: Benefit[] = [
  { icon: Cpu, title: "AI first", body: "We use AI where it creates measurable value — and skip it where it doesn't." },
  { icon: Blocks, title: "Built for scale", body: "Architecture designed to grow with your product, users and data." },
  { icon: Workflow, title: "End-to-end", body: "Strategy, design, development and deployment under one roof." },
  { icon: Target, title: "Business focused", body: "Every technical decision traces back to an outcome you care about." },
];

/** Slow-turning orbit lines: a quiet nod to connected systems. Pure CSS rotation. */
function Orbits() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className="pointer-events-none absolute -bottom-[330px] -left-[220px] -z-10 size-[600px] animate-spin-slow opacity-90 sm:-bottom-[300px] sm:-left-[180px]"
    >
      {[120, 190, 260].map((r) => (
        <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="rgb(91 76 240 / 0.16)" strokeDasharray={r === 190 ? "2 6" : undefined} />
      ))}
      <circle cx="300" cy="180" r="5" fill="#5b4cf0" />
      <circle cx="490" cy="300" r="4" fill="#2fb5e8" />
      <circle cx="116" cy="410" r="4" fill="#5b4cf0" opacity="0.5" />
      <circle cx="300" cy="560" r="3" fill="#111318" opacity="0.4" />
    </svg>
  );
}

export function WhyRian() {
  return (
    <section aria-labelledby="why-title" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[28px] border border-accent/10 bg-[#f0eff9] px-5 py-14 sm:rounded-[36px] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div aria-hidden className="absolute inset-0 -z-10 bg-dots opacity-60 [mask-image:linear-gradient(to_left,#000,transparent_60%)]" />
          <Orbits />

          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel index="07">Why Rian</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  id="why-title"
                  className="mt-6 text-[clamp(2.4rem,1.3rem+3.6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink"
                >
                  Not just developers.
                  <span className="mt-1 block font-serif font-normal italic tracking-[-0.025em] text-accent">
                    Product thinkers.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 max-w-sm text-[16.5px] leading-relaxed text-muted">
                  We ask why before how. The result is software that earns its place in your business — not
                  just a feature list delivered on time.
                </p>
              </Reveal>
            </div>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2 sm:pb-10 lg:col-span-7" stagger={0.1}>
              {BENEFITS.map(({ icon: Icon, title, body }, i) => (
                <StaggerItem key={title} className={cn(i % 2 === 1 && "sm:translate-y-10")}>
                  <article onPointerMove={trackSpotlight} className="spotlight group relative isolate h-full rounded-[20px] border border-white bg-white/80 p-6 shadow-soft backdrop-blur transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-accent/20 hover:shadow-lift sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl bg-ink text-white transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-accent">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                    </div>
                    <h3 className="mt-10 text-[20px] font-semibold tracking-[-0.03em] text-ink">{title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{body}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
