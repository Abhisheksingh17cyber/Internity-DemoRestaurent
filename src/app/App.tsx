import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { DiningSection } from "./components/DiningSection";
import { RightIndicator } from "./components/RightIndicator";
import { ReservationModal } from "./components/Reservation";
import { MenuModal } from "./components/MenuModal";
import type { MenuType } from "./components/MenuModal";
import { Footer } from "./components/Footer";

// ─── SECTION BACKGROUNDS ──────────────────────────────────────────────────────
// Each section has its own warm background tone (morning → afternoon → evening).
const SECTION_BG: Record<string, string> = {
  hero: "#F2EDE7",
  brunch: "#F2EDE7", // warm cream
  lunch: "#EBE5DA", // golden beige
  dinner: "#EDD9CA", // soft rose
  reservation: "#F2EDE7",
};

// ─── SECTION INDICATOR TEXT COLOUR ──────────────────────────────────────────
const INDICATOR_TEXT: Record<string, string> = {
  brunch: "#8B7055",
  lunch: "#7A6040",
  dinner: "#8B5A45",
};

// ─── DINING SECTION DATA ──────────────────────────────────────────────────────
const IMG_BRUNCH =
  "https://images.unsplash.com/photo-1623593476410-eb984e68bfe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBlZ2dzJTIwYmVuZWRpY3QlMjBhdm9jYWRvJTIwdG9hc3QlMjBtb3JuaW5nJTIwY2FmZXxlbnwxfHx8fDE3NzE3NDk5NzR8MA&ixlib=rb-4.1.0&q=80&w=1080";

const IMG_LUNCH =
  "https://images.unsplash.com/photo-1767969217506-b28edac04107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnRlcm5vb24lMjBsdW5jaCUyMHdpbmUlMjBib3R0bGUlMjBnbGFzcyUyMG91dGRvb3J8ZW58MXx8fHwxNzcxNzQ5OTcwfDA&ixlib=rb-4.1.0&q=80&w=1080";

const IMG_DINNER =
  "https://images.unsplash.com/photo-1767706508378-8835e2a0ec97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVuaW5nJTIwZmluZSUyMGRpbmluZyUyMGNhbmRsZSUyMHRhYmxlJTIwaW50aW1hdGV8ZW58MXx8fHwxNzcxNzQ5OTcwfDA&ixlib=rb-4.1.0&q=80&w=1080";

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [reserveOpen, setReserveOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<MenuType>(null);

  const bgColor = SECTION_BG[activeSection] ?? "#F2EDE7";

  // ── Smooth background transition via IntersectionObserver ──
  useEffect(() => {
    const sectionIds = [
      "hero",
      "brunch",
      "lunch",
      "dinner",
      "reservation",
    ];
    const targets = sectionIds
      .map((id) =>
        document.querySelector(`[data-section="${id}"]`),
      )
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          );
        if (visible.length > 0) {
          const id =
            visible[0].target.getAttribute("data-section") ??
            "hero";
          setActiveSection(id);
        }
      },
      { threshold: [0.3, 0.6] },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    /* ── Page wrapper with animated background colour ── */
    <motion.div
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {/* ── Fixed navigation ── */}
      <Navbar onReserveClick={() => setReserveOpen(true)} />

      {/* ── Fixed right time indicator ── */}
      <RightIndicator
        activeSection={activeSection}
        textColor={INDICATOR_TEXT[activeSection] ?? "#7A6A55"}
      />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Brunch section (morning) — image left ── */}
      <DiningSection
        id="brunch"
        imagePosition="left"
        image={IMG_BRUNCH}
        imageAlt="Internity brunch"
        category="brunch"
        timeLabel="from 10:00"
        headline="Start your day with something extraordinary."
        description={
          "Our morning kitchen celebrates the ritual of a slow, unhurried meal. " +
          "Seasonal produce, handcrafted pastries, and specialty coffee — " +
          "crafted with the same devotion as our evening tasting menu."
        }
        ctaText="view our brunch menu"
        onCtaClick={() => setMenuOpen("brunch")}
      />

      {/* ── Divider ── */}
      <SectionDivider color={bgColor} />

      {/* ── Lunch section (afternoon) — image right ── */}
      <DiningSection
        id="lunch"
        imagePosition="right"
        image={IMG_LUNCH}
        imageAlt="Internity lunch service"
        category="lunch"
        timeLabel="served all day"
        headline="A table in the afternoon light."
        description={
          "Our à la carte lunch embraces the unhurried pleasure of midday dining. " +
          "Seasonal plates, carefully sourced wines, and a terrace " +
          "that catches the afternoon sun. Every bottle chosen for character and surprise."
        }
        ctaText="view our lunch menu"
        onCtaClick={() => setMenuOpen("lunch")}
      />

      <SectionDivider color={bgColor} />

      {/* ── Dinner section (evening) — image left ── */}
      <DiningSection
        id="dinner"
        imagePosition="left"
        image={IMG_DINNER}
        imageAlt="Internity evening dinner"
        category="dinner"
        timeLabel="from 18:30"
        headline="As evening settles in, the table finds its rhythm."
        description={
          "Our dinner menu is bold, refined, and deeply personal. " +
          "Chef Delacroix leads the kitchen through a journey of textures and flavours " +
          "— each dish composed with intention, each pairing chosen with care."
        }
        ctaText="view our dinner menu"
        onCtaClick={() => setMenuOpen("dinner")}
      />

      {/* ── Reservation inline section ── */}
      <ReservationInlineSection
        onReserveClick={() => setReserveOpen(true)}
      />

      {/* ── Footer ── */}
      <Footer />

      {/* ── Modals ── */}
      <ReservationModal
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
      />
      <MenuModal
        open={menuOpen}
        onClose={() => setMenuOpen(null)}
      />
    </motion.div>
  );
}

// ─── THIN DIVIDER BETWEEN SECTIONS ───────────────────────────────────────────
function SectionDivider({ color: _color }: { color: string }) {
  return (
    <div className="flex justify-center py-4 opacity-30">
      <div className="h-px w-12 bg-[#7A6A55]" />
    </div>
  );
}

// ─── INLINE RESERVATION CALL-TO-ACTION ───────────────────────────────────────
function ReservationInlineSection({
  onReserveClick,
}: {
  onReserveClick: () => void;
}) {
  return (
    <section
      id="reservation"
      data-section="reservation"
      className="flex flex-col items-center justify-center py-32 px-8 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[#7A6A55] text-[10px] tracking-[0.35em] uppercase mb-4"
      >
        reservations
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.06 }}
        className="text-[#1E1918] mb-5 leading-tight max-w-lg"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          fontWeight: 300,
          fontStyle: "italic",
        }}
      >
        join us for a meal worth remembering
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="text-[#7A6A55] text-sm mb-10 max-w-sm leading-relaxed"
      >
        Tuesday through Sunday, morning until late. Walk-ins
        welcome, reservations recommended.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.18 }}
        onClick={onReserveClick}
        className="group flex items-center gap-3 text-[#1E1918] text-xs tracking-[0.22em]
                   uppercase border-b border-[#1E1918]/40 pb-1 hover:border-[#1E1918]
                   transition-all duration-300"
      >
        book a table
        <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-base">
          →
        </span>
      </motion.button>

      {/* Decorative dots */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex gap-3 mt-16"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-[#7A6A55]/40"
          />
        ))}
      </motion.div>
    </section>
  );
}