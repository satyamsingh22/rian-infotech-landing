"use client";

import { MotionConfig } from "framer-motion";

/**
 * `reducedMotion="user"` makes every Framer Motion animation honour
 * prefers-reduced-motion: transforms are skipped, opacity still fades.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
