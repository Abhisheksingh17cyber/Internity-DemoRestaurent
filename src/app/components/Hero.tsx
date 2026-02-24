import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { IMAGES, RESTAURANT_NAME, RESTAURANT_NAME_FORMAL, HERO_TAGLINE } from "../data";

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
// Blurred full-screen background + centered floating rounded card with restaurant
// name overlaid. Inspired by florporto.com's hero treatment.

// Live clock shown in top center bar (like florporto "LOCAL TIME AT FLÔR")
function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      return now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Hero() {
  const time = useClock();

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative h-screen w-full overflow-hidden flex flex-col"
    >
      {/* ── Blurred full-screen background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={IMAGES.hero.background}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-[1.15]"
          style={{ filter: "blur(48px) saturate(0.75) brightness(1.1)" }}
        />
        {/* Warm tint overlay */}
        <div className="absolute inset-0 bg-[#F2EDE7]/50" />
      </div>

      {/* ── Top center local time bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 text-center pt-6"
      >
        <p className="text-black text-[10px] tracking-[0.3em] uppercase">
          local time at {RESTAURANT_NAME}: {time}
        </p>
      </motion.div>

      {/* ── Centered floating card ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          style={{
            width: "min(88vw, 820px)",
            height: "min(55vh, 520px)",
            aspectRatio: "auto"
          }}
        >
          {/* Card image */}
          <img
            src={IMAGES.hero.card}
            alt={RESTAURANT_NAME_FORMAL}
            className="w-full h-full object-cover"
          />
          {/* Subtle dark overlay on card */}
          <div className="absolute inset-0 bg-[#1E1918]/25" />

          {/* Restaurant name overlaid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h1
              className="text-white select-none text-center px-4"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(3.5rem, 15vw, 7rem)",
                fontWeight: 400,
                letterSpacing: "0.02em",
                textShadow: "0 2px 24px rgba(0,0,0,0.25)",
                lineHeight: 1.1
              }}
            >
              {RESTAURANT_NAME}
            </h1>
          </motion.div>
        </motion.div>

        {/* ── Tagline below card ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-8 text-black text-[11px] sm:text-sm tracking-[0.25em] select-none text-center px-4 leading-relaxed"
        >
          {HERO_TAGLINE}
        </motion.p>
      </div>

      {/* ── Scroll nudge ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-black/40 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
