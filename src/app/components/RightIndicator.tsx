import { motion, AnimatePresence } from "motion/react";
import { INDICATOR_SECTIONS } from "../data";

// ─── RIGHT-SIDE TIME INDICATOR ────────────────────────────────────────────────
// Fixed vertical timeline on the right edge of the viewport.
// Shows the time-of-day progression as the user scrolls through dining sections.
// Inspired by florporto.com's ambient navigation.

interface RightIndicatorProps {
  activeSection: string;
  textColor?: string; // adapts to background
}

export function RightIndicator({ activeSection, textColor = "#000000" }: RightIndicatorProps) {
  const isVisible = INDICATOR_SECTIONS.some((s) => s.id === activeSection);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end"
          style={{ color: textColor }}
        >
          {/* ── Sun icon (morning) ── */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-60">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>

          {/* ── Vertical timeline ── */}
          <div className="flex flex-col items-end">
            {/* Top line */}
            <div className="w-px h-6 bg-current opacity-20" />

            {INDICATOR_SECTIONS.map((section, idx) => {
              const isActive = activeSection === section.id;
              return (
                <div key={section.id} className="flex flex-col items-end">
                  {/* Section tick + optional label */}
                  <div className="flex items-center">
                    {/* Label — slides in when active */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.span
                          key={section.label}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.35 }}
                          className="text-[10px] tracking-[0.25em] uppercase mr-3 whitespace-nowrap"
                          style={{ opacity: 0.9 }}
                        >
                          {section.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Tick mark — longer when active */}
                    <motion.div
                      animate={{ width: isActive ? 24 : 8 }}
                      transition={{ duration: 0.4 }}
                      className="h-px bg-current"
                      style={{ opacity: isActive ? 1 : 0.3 }}
                    />
                  </div>

                  {/* Connector line between sections */}
                  {idx < INDICATOR_SECTIONS.length - 1 && (
                    <div className="w-px h-14 bg-current opacity-20 self-end" />
                  )}
                </div>
              );
            })}

            {/* Bottom line */}
            <div className="w-px h-6 bg-current opacity-20 self-end" />
          </div>

          {/* ── Moon icon (evening) ── */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-3 opacity-60">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
