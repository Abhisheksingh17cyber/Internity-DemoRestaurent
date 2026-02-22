import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { MENUS } from "../data";
import type { MenuType } from "../data";

// ─── MENU MODAL ───────────────────────────────────────────────────────────────
// Slide-up full-screen menu overlay.
// Triggered from DiningSection CTAs.

interface MenuModalProps {
  open: MenuType;
  onClose: () => void;
}

export function MenuModal({ open, onClose }: MenuModalProps) {
  const data = open ? MENUS[open] : null;

  return (
    <AnimatePresence>
      {open && data && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#1E1918]/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Slide-up panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#F2EDE7]
                       rounded-t-3xl max-h-[90vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-10 h-1 rounded-full bg-[#1E1918]/20" />
            </div>

            <div className="px-8 md:px-16 py-6 pb-16">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2
                    className="text-[#1E1918] leading-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                    }}
                  >
                    {data.title}
                  </h2>
                  <p className="text-[#7A6A55] text-xs tracking-[0.2em] uppercase mt-1">
                    {data.subtitle}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-1 text-[#7A6A55] hover:text-[#1E1918] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Menu sections */}
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                {data.sections.map((section) => (
                  <div key={section.heading}>
                    <p className="text-[#7A6A55] text-[10px] tracking-[0.3em] uppercase mb-4 pb-2
                                  border-b border-[#1E1918]/10">
                      {section.heading}
                    </p>
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <div key={item.name} className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[#1E1918] text-sm">{item.name}</p>
                            <p className="text-[#7A6A55] text-xs mt-0.5">{item.note}</p>
                          </div>
                          <span className="text-[#1E1918] text-sm flex-shrink-0">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export type { MenuType };
