"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Compass, Hammer, TrendingUp, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Step = { icon: LucideIcon; title: string; body: string; outputs: string[] };

const STEPS: Step[] = [
  {
    icon: Compass,
    title: "Discover",
    body: "We understand your business, users and technical requirements.",
    outputs: ["Workshops", "System audit", "Roadmap"],
  },
  {
    icon: Hammer,
    title: "Build",
    body: "We design, develop and integrate the right technology stack.",
    outputs: ["Design", "Engineering", "Integrations"],
  },
  {
    icon: TrendingUp,
    title: "Scale",
    body: "We optimise, automate and evolve the product as your business grows.",
    outputs: ["Analytics", "Automation", "Iteration"],
  },
];

export function HowItWorks() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(-1);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // Each step activates as the drawn line reaches it.
    const next = STEPS.reduce((acc, _, i) => (p >= (i / (STEPS.length - 1)) * 0.92 + 0.02 ? i : acc), -1);
    if (next !== reached) setReached(next);
  });

  return (
    <section id="process" aria-labelledby="process-title" className="relative border-t border-line bg-white py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="06">Process</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="process-title"
                className="mt-6 text-[clamp(2.1rem,1.2rem+3vw,3.75rem)] font-semibold leading-[1] tracking-[-0.045em] text-ink"
              >
                A clear path from idea to <span className="font-serif font-normal italic text-accent">impact.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-5">
            <p className="max-w-md text-[16.5px] leading-relaxed text-muted lg:ml-auto">
              Three phases, short feedback loops and working software early — so you always know where
              things stand.
            </p>
          </Reveal>
        </div>

        <ol ref={trackRef} className="relative mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-[var(--gap)] md:[--gap:2rem] lg:[--gap:3rem]">
          {/* Track: vertical on mobile, horizontal from md */}
          <span aria-hidden className="absolute bottom-6 left-[21px] top-6 w-px bg-line md:bottom-auto md:left-[22px] md:right-[calc((100%-2*var(--gap))/3-22px)] md:top-[21px] md:h-px md:w-auto">
            <motion.span
              className="absolute inset-0 hidden origin-left bg-gradient-to-r from-accent to-accent-2 md:block"
              style={{ scaleX: progress }}
            />
            <motion.span
              className="absolute inset-0 origin-top bg-gradient-to-b from-accent to-accent-2 md:hidden"
              style={{ scaleY: progress }}
            />
          </span>

          {STEPS.map(({ icon: Icon, title, body, outputs }, i) => {
            const on = i <= reached;
            return (
              <motion.li
                key={title}
                className="relative pl-16 md:pl-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              >
                <span
                  className={cn(
                    "absolute left-0 top-0 grid size-11 place-items-center rounded-full border font-mono text-[12px] transition-[background-color,border-color,color,box-shadow] duration-500 md:relative",
                    on
                      ? "border-accent bg-accent text-white shadow-[0_0_0_6px_rgb(91_76_240/0.12)]"
                      : "border-line bg-white text-subtle",
                  )}
                >
                  0{i + 1}
                </span>

                <div className="md:mt-8">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[24px] font-semibold tracking-[-0.035em] text-ink sm:text-[28px]">{title}</h3>
                    <Icon
                      aria-hidden
                      className={cn("size-5 transition-colors duration-500", on ? "text-accent" : "text-line")}
                    />
                  </div>
                  <p className="mt-3 max-w-xs text-[15.5px] leading-relaxed text-muted">{body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {outputs.map((o) => (
                      <li
                        key={o}
                        className={cn(
                          "rounded-full border px-3 py-1 text-[12px] font-medium transition-colors duration-500",
                          on ? "border-accent/20 bg-accent-soft text-accent-strong" : "border-line bg-canvas text-muted",
                        )}
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
