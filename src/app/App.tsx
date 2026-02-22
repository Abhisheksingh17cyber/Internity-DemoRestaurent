import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { DiningSection } from "./components/DiningSection";
import { RightIndicator } from "./components/RightIndicator";
import { ReservationModal } from "./components/Reservation";
import { MenuModal } from "./components/MenuModal";
import { PaymentModal } from "./components/Payment";
import { Footer } from "./components/Footer";

import {
  SECTION_BACKGROUNDS,
  INDICATOR_TEXT_COLORS,
  DEFAULT_BG,
  DEFAULT_INDICATOR_COLOR,
  DINING_SECTIONS,
  RESERVATION_SECTION_COPY,
} from "./data";
import type { MenuType, ReservationFormData } from "./data";

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [reserveOpen, setReserveOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<MenuType>(null);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [reservationData, setReservationData] = useState<ReservationFormData | null>(null);

  const handleReservationCreated = (id: string, data: ReservationFormData) => {
    setReservationId(id);
    setReservationData(data);
    setReserveOpen(false);
    setPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentOpen(false);
    setReservationId(null);
    setReservationData(null);
  };

  const bgColor = SECTION_BACKGROUNDS[activeSection] ?? DEFAULT_BG;

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
        textColor={INDICATOR_TEXT_COLORS[activeSection] ?? DEFAULT_INDICATOR_COLOR}
      />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Dining sections (brunch / lunch / dinner) ── */}
      {DINING_SECTIONS.map((section, idx) => (
        <React.Fragment key={section.id}>
          {idx > 0 && <SectionDivider color={bgColor} />}
          <DiningSection
            {...section}
            onCtaClick={() => setMenuOpen(section.id as MenuType)}
          />
        </React.Fragment>
      ))}

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
        onReservationCreated={handleReservationCreated}
      />
      <MenuModal
        open={menuOpen}
        onClose={() => setMenuOpen(null)}
      />
      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        reservationId={reservationId}
        reservationData={reservationData}
        onSuccess={handlePaymentSuccess}
      />
    </motion.div>
  );
}

// ─── THIN DIVIDER BETWEEN SECTIONS ───────────────────────────────────────────
function SectionDivider({ color: _color }: { color: string }) {
  return (
    <div className="flex justify-center py-4 opacity-30">
      <div className="h-px w-12 bg-black/30" />
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
        className="text-black text-[10px] tracking-[0.35em] uppercase mb-4"
      >
        {RESERVATION_SECTION_COPY.label}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.06 }}
        className="text-black mb-5 leading-tight max-w-lg"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          fontWeight: 300,
          fontStyle: "italic",
        }}
      >
        {RESERVATION_SECTION_COPY.headline}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="text-black text-sm mb-10 max-w-sm leading-relaxed"
      >
        {RESERVATION_SECTION_COPY.body}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.18 }}
        onClick={onReserveClick}
        className="group flex items-center gap-3 text-black text-xs tracking-[0.22em]
                   uppercase border-b border-black/40 pb-1 hover:border-black
                   transition-all duration-300"
      >
        {RESERVATION_SECTION_COPY.cta}
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
            className="w-1 h-1 rounded-full bg-black/40"
          />
        ))}
      </motion.div>
    </section>
  );
}
