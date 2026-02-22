import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

// ─── DINING SECTION ───────────────────────────────────────────────────────────
// Full-viewport section with large editorial image + text.
// Alternates: image LEFT (odd), image RIGHT (even).
// Parallax scroll on the image for depth.

export interface DiningSectionData {
  id: string;             // section id for scroll targeting
  imagePosition: "left" | "right";
  image: string;
  imageAlt: string;
  timeLabel: string;      // e.g. "from 10:00" | "served all day"
  category: string;       // e.g. "brunch"
  headline: string;       // short description tagline
  description: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export function DiningSection({
  id,
  imagePosition,
  image,
  imageAlt,
  timeLabel,
  category,
  headline,
  description,
  ctaText,
  onCtaClick,
}: DiningSectionData) {
  const sectionRef = useRef<HTMLElement>(null);

  // ── Parallax: image moves slightly slower than scroll ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const isImageLeft = imagePosition === "left";

  return (
    <section
      id={id}
      data-section={id}
      ref={sectionRef}
      className="relative min-h-screen flex flex-col md:flex-row overflow-hidden"
    >
      {/* ─── Image block (fills one side) ─── */}
      <div
        className={`relative w-full md:w-[52%] overflow-hidden
                    ${isImageLeft ? "md:order-1" : "md:order-2"}
                    h-[55vw] md:h-auto`}
      >
        <motion.img
          src={image}
          alt={imageAlt}
          style={{ y: imageY }}
          className="absolute inset-0 w-full h-[115%] object-cover -top-[7.5%]"
        />
      </div>

      {/* ─── Text block ─── */}
      <div
        className={`relative w-full md:w-[48%] flex items-center
                    ${isImageLeft ? "md:order-2" : "md:order-1"}
                    px-10 md:px-16 lg:px-20 py-16 md:py-0`}
      >
        <div className="max-w-sm">
          {/* Category heading — very large, thin italic serif */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-black leading-none mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 7vw, 6rem)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            {category}
          </motion.h2>

          {/* Time label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-black text-sm mb-5 tracking-wide"
          >
            {timeLabel}
          </motion.p>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.13, ease: [0.22, 1, 0.36, 1] }}
            className="text-black text-base mb-4 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            {headline}
          </motion.p>

          {/* Description body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-black text-sm leading-relaxed mb-8"
          >
            {description}
          </motion.p>

          {/* CTA link */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={onCtaClick}
            className="group flex items-center gap-2 text-black text-xs tracking-[0.2em]
                       uppercase border-b border-black/40 pb-0.5 hover:border-black
                       transition-all duration-300"
          >
            <span>{ctaText}</span>
            <ArrowRight
              size={12}
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
