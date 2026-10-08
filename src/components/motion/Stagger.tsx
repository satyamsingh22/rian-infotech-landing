"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/motion";

type StaggerContainerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "dl";
};

/** Reveals its StaggerItem children one after another when scrolled into view. */
export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: StaggerContainerProps) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "article" | "dd" | "dt";
};

export function StaggerItem({ children, className, variants = fadeUp, as = "div" }: StaggerItemProps) {
  const Component = motion[as];
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
