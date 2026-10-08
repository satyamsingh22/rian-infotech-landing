"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * Advances an index 0 → total-1 on a timer, looping. Only ticks while the
 * element is on screen and the user hasn't asked for reduced motion
 * (in which case it rests on `restingStep`).
 */
export function useStepCycle<T extends Element>({
  total,
  interval = 1400,
  restingStep = total - 1,
  paused = false,
}: {
  total: number;
  interval?: number;
  restingStep?: number;
  paused?: boolean;
}) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const reduce = useSafeReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView || reduce || paused) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % total), interval);
    return () => window.clearInterval(id);
  }, [inView, reduce, paused, total, interval]);

  return { ref, step: reduce ? restingStep : step, setStep };
}
