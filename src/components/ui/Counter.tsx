"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type CounterProps = {
  to: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/**
 * Counts up once when visible. Writes straight to the DOM node so the
 * animation never triggers React re-renders. The final value is rendered
 * on the server, so no-JS and reduced-motion users see the real number.
 */
export function Counter({ to, decimals = 0, duration = 1.6, prefix = "", suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useSafeReducedMotion();
  const format = (v: number) =>
    `${prefix}${v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;
    if (!inView) {
      node.textContent = format(0);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
