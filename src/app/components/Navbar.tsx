import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RESTAURANT_NAME, NAV_LINKS, CONTACT } from "../data";

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
// Minimal fixed navbar — logo left, actions right. Inspired by florporto.com.

interface NavbarProps {
  onReserveClick: () => void;
}

export function Navbar({ onReserveClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Main bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12
                    transition-all duration-500 ${scrolled ? "py-4" : "py-7"}`}
      >
        {/* Logo — handwritten italic feel */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => scrollTo("hero")}
          className="font-['Cormorant_Garamond'] italic text-[1.4rem] tracking-wide text-[#1E1918]
                     select-none leading-none"
        >
          {RESTAURANT_NAME}
        </motion.button>

        {/* Right actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-6 md:gap-8"
        >
          {/* Reserve link — visible on desktop */}
          <button
            onClick={onReserveClick}
            className="hidden md:block text-[#1E1918] text-xs tracking-[0.18em] uppercase
                       hover:text-[#7A6A55] transition-colors duration-300"
          >
            book a table
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="flex flex-col gap-[5px] group"
          >
            <span className={`block h-px w-6 bg-[#1E1918] transition-all duration-300
                              ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-px bg-[#1E1918] transition-all duration-300
                              ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
            <span className={`block h-px w-6 bg-[#1E1918] transition-all duration-300
                              ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </motion.div>
      </header>

      {/* ── Full-screen overlay menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#F2EDE7]/97 backdrop-blur-sm flex flex-col
                       items-start justify-center px-12 md:px-20"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  onClick={() => scrollTo(item.id)}
                  className="font-['Cormorant_Garamond'] italic text-5xl md:text-7xl text-[#1E1918]
                             font-[200] text-left hover:text-[#7A6A55] transition-colors duration-300
                             leading-tight"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* Bottom contact in overlay */}
            <div className="absolute bottom-10 left-12 md:left-20">
              <p className="text-[#7A6A55] text-xs tracking-[0.2em] uppercase">
                {CONTACT.phone} &nbsp;·&nbsp; {CONTACT.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
