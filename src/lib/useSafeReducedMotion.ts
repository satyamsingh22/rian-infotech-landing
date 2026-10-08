"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * `useReducedMotion` already knows the user preference on the client's first
 * render, which the server can't — rendering different markup and breaking
 * hydration. This version reports `false` until hydration has finished.
 */
export function useSafeReducedMotion() {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  return hydrated && Boolean(reduce);
}
