import type { Transition, Variants } from "framer-motion";

/** One easing curve for the whole site — a soft, decisive expo-out. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const baseTransition: Transition = { duration: 0.8, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

/** Shared viewport config so every reveal triggers at the same point. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
