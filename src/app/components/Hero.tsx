import { motion } from "motion/react";
import { useEffect, useState } from "react";

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
// Blurred full-screen background + centered floating rounded card with restaurant
// name overlaid. Inspired by florporto.com's hero treatment.

const HERO_BG =
  "https://images.unsplash.com/photo-1666196389175-630e3b80ad91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY29mZmVlJTIwbGF0dGUlMjB3YXJtJTIwYm9rZWglMjBzb2Z0fGVufDF8fHx8MTc3MTc0OTk3NXww&ixlib=rb-4.1.0&q=80&w=1080";

const HERO_CARD =
  "https://images.unsplash.com/photo-1768051297578-1ea70392c307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yJTIwYW1iaWFuY2V8ZW58MXx8fHwxNzcxNzQ5MTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080";

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
          src={HERO_BG}
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
        <p className="text-[#7A6A55] text-[10px] tracking-[0.3em] uppercase">
          local time at internity: {time}
        </p>
      </motion.div>

      {/* ── Centered floating card ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          style={{ width: "min(58vw, 820px)", height: "min(62vh, 520px)" }}
        >
          {/* Card image */}
          <img
            src={HERO_CARD}
            alt="Internity Restaurant"
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
              className="text-white select-none"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                fontWeight: 400,
                letterSpacing: "0.02em",
                textShadow: "0 2px 24px rgba(0,0,0,0.25)",
              }}
            >
              internity
            </h1>
          </motion.div>
        </motion.div>

        {/* ── Tagline below card ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-8 text-[#7A6A55] text-sm tracking-[0.25em] select-none"
        >
          brunch &nbsp;·&nbsp; lunch &nbsp;·&nbsp; dinner
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
          <div className="w-px h-12 bg-[#7A6A55]/40 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
