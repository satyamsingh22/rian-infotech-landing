"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Problem = { title: string; body: string; answer: string };

const PROBLEMS: Problem[] = [
  {
    title: "Manual operations",
    body: "Too much repetitive work keeps teams focused on execution instead of growth.",
    answer: "Automate the routine",
  },
  {
    title: "Disconnected tools",
    body: "Your data lives across systems that were never designed to work together.",
    answer: "Connect the stack",
  },
  {
    title: "Slow product cycles",
    body: "Turning an idea into a reliable product shouldn't take forever.",
    answer: "Ship in focused increments",
  },
  {
    title: "AI without strategy",
    body: "AI creates value when it's connected to real workflows and business outcomes.",
    answer: "Tie AI to outcomes",
  },
];

function ProblemRow({
  problem,
  index,
  active,
  onActive,
}: {
  problem: Problem;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // "Active" = the row crossing the middle band of the viewport.
  const inFocus = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inFocus) onActive(index);
  }, [inFocus, index, onActive]);

  return (
    <li
      ref={ref}
      className={cn(
        "grid grid-cols-[auto_1fr] gap-5 border-t border-line py-10 transition-opacity duration-700 sm:gap-10 sm:py-14",
        active ? "lg:opacity-100" : "lg:opacity-35",
      )}
    >
      <motion.span
        aria-hidden
        className={cn(
          "block min-w-[2ch] text-[56px] font-semibold leading-[0.85] tracking-[-0.06em] tabular-nums transition-colors duration-700 sm:text-[96px]",
          active ? "text-ink" : "text-ink lg:text-ink/15",
        )}
        initial={{ clipPath: "inset(100% 0% 0% 0%)", y: 20 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 1, ease: EASE }}
      >
        0{index + 1}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
        className="pt-1 sm:pt-2"
      >
        <h3 className="text-[22px] font-semibold tracking-[-0.03em] text-ink sm:text-[28px]">
          <span className="sr-only">0{index + 1}. </span>
          {problem.title}
        </h3>
        <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted sm:text-[17px]">{problem.body}</p>
        <p
          className={cn(
            "mt-5 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors duration-700",
            active ? "text-accent" : "text-accent lg:text-subtle",
          )}
        >
          <ArrowRight aria-hidden className="size-3.5" />
          {problem.answer}
        </p>
      </motion.div>
    </li>
  );
}

export function Problems() {
  const [active, setActive] = useState(0);

  return (
    <section
      aria-labelledby="problems-title"
      className="relative border-y border-line bg-white py-24 sm:py-32"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <Reveal>
              <SectionLabel index="01">The friction</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="problems-title"
                className="mt-6 text-[clamp(2rem,1.2rem+2.6vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink text-balance-safe"
              >
                Great businesses shouldn&apos;t be slowed down by{" "}
                <span className="font-serif font-normal italic text-accent">disconnected</span> systems.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-muted">
                Growth exposes every gap between tools, teams and data. We start where the friction is.
              </p>
            </Reveal>

            {/* Reading progress for the sequence — desktop only, where the panel is sticky */}
            <div className="mt-12 hidden lg:block" aria-hidden>
              <div className="flex gap-1.5">
                {PROBLEMS.map((p, i) => (
                  <span key={p.title} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line">
                    <motion.span
                      className="absolute inset-0 origin-left rounded-full bg-ink"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  </span>
                ))}
              </div>
              <div className="mt-4 flex h-5 items-center gap-3 overflow-hidden font-mono text-[11.5px] uppercase tracking-[0.14em]">
                <span className="text-ink">0{active + 1} / 0{PROBLEMS.length}</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="text-subtle"
                  >
                    {PROBLEMS[active].title}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <ol className="border-b border-line lg:col-span-7">
          {PROBLEMS.map((problem, i) => (
            <ProblemRow
              key={problem.title}
              problem={problem}
              index={i}
              active={active === i}
              onActive={setActive}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
