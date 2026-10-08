"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Brain, MousePointer2, Workflow, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type Token = string | { icon: LucideIcon; label: string };

// The statement, word by word. Objects render as inline icon pills.
const TOKENS: Token[] = [
  ..."We design and build software that thinks".split(" "),
  { icon: Brain, label: "AI" },
  ..."systems that run themselves".split(" "),
  { icon: Workflow, label: "Automation" },
  ..."and products people genuinely want to use".split(" "),
  { icon: MousePointer2, label: "Product" },
  ..."— so your team can focus on the work only humans can do.".split(" "),
];

function Piece({
  token,
  progress,
  range,
  reduce,
}: {
  token: Token;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.14, 1]);

  if (typeof token === "string") {
    return (
      <motion.span style={{ opacity }} className="mr-[0.24em] inline-block">
        {token}
      </motion.span>
    );
  }

  const Icon = token.icon;
  return (
    <motion.span
      aria-hidden
      style={{ opacity }}
      className="mr-[0.24em] inline-flex translate-y-[-0.08em] items-center gap-[0.2em] rounded-full border border-line bg-white py-[0.1em] pl-[0.12em] pr-[0.4em] align-middle text-[0.42em] font-medium tracking-[-0.01em] text-ink-2 shadow-soft"
    >
      <span className="grid size-[1.7em] place-items-center rounded-full bg-gradient-to-br from-accent to-[#8a7dff] text-white">
        <Icon className="size-[0.95em]" />
      </span>
      {token.label}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  return (
    <section aria-label="Our approach" className="relative py-20 sm:py-32">
      <div className="container-page">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="size-1.5 rounded-full bg-accent" />
          Our approach
        </p>
        <p
          ref={ref}
          className="mt-8 max-w-[1100px] text-[clamp(1.85rem,0.9rem+3.4vw,4.1rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-ink"
        >
          {TOKENS.map((token, i) => {
            const start = i / TOKENS.length;
            return (
              <Piece
                key={i}
                token={token}
                progress={scrollYProgress}
                range={[start, start + 1 / TOKENS.length]}
                reduce={reduce}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}
