"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ButtonLink } from "@/components/ui/Button";
import { CONTACT_HREF, NAV_LINKS } from "@/lib/site";
import { EASE } from "@/lib/motion";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const noopSubscribe = () => () => {};

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  // The panel is portalled to <body>: the navbar's backdrop-filter would
  // otherwise become the containing block for its `position: fixed`.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  // Lock page scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  // Close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && onOpenChange(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [onOpenChange]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => onOpenChange(!open)}
        className="relative grid size-11 place-items-center rounded-xl border border-line bg-white/70 transition-colors hover:bg-white md:hidden"
      >
        <span className="sr-only">Menu</span>
        <motion.span
          aria-hidden
          className="absolute h-[1.5px] w-[18px] rounded-full bg-ink"
          animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
        <motion.span
          aria-hidden
          className="absolute h-[1.5px] w-[18px] rounded-full bg-ink"
          animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </button>

      {mounted &&
        createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.1 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              className="flex min-h-full flex-col px-5 pb-8 pt-6"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
              }}
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                    className="border-b border-line"
                  >
                    <motion.a
                      href={link.href}
                      onClick={() => onOpenChange(false)}
                      whileTap={{ scale: 0.98, x: 4 }}
                      className="group flex items-center justify-between py-5 text-[30px] font-semibold tracking-[-0.035em] text-ink"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs font-normal tracking-normal text-subtle">
                          0{i + 1}
                        </span>
                        {link.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 text-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-auto pt-10"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                <p className="mb-4 text-sm text-muted">
                  Have a product, workflow or AI idea? Let&apos;s talk it through.
                </p>
                <ButtonLink
                  href={CONTACT_HREF}
                  arrow
                  className="w-full"
                  onClick={() => onOpenChange(false)}
                >
                  Let&apos;s Build
                </ButtonLink>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
