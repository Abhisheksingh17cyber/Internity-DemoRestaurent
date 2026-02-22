import { motion } from "motion/react";
import { Instagram, Facebook } from "lucide-react";

// ─── FOOTER ──────────────────────────────────────────────────────────────────
// Minimal editorial footer. Update contact details as needed.

const HOURS = [
  { days: "Tuesday – Thursday",  time: "10:00 – 22:30" },
  { days: "Friday – Saturday",   time: "10:00 – 23:30" },
  { days: "Sunday",              time: "10:00 – 21:00" },
  { days: "Monday",              time: "Closed"         },
];

export function Footer() {
  return (
    <footer className="bg-[#1E1918] text-[#C5BEB5]">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-white mb-4 leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              internity
            </p>
            <p className="text-[#7A6A55] text-xs leading-relaxed mb-6 max-w-xs">
              Where every meal becomes a timeless memory.
              Fine dining at the intersection of tradition and innovation.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Facebook,  href: "https://facebook.com",  label: "Facebook"  },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 border border-white/10 hover:border-white/40 flex items-center
                             justify-center text-[#7A6A55] hover:text-white transition-all duration-300"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-5">Hours</p>
            <div className="space-y-3">
              {HOURS.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 text-xs">
                  <span className="text-[#7A6A55]">{h.days}</span>
                  <span className={h.time === "Closed" ? "text-[#5A4A3A]" : "text-[#C5BEB5]"}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-5">Contact</p>
            <div className="space-y-3 text-xs">
              <p className="text-[#7A6A55] leading-relaxed">
                12 Rue de l'Excellence<br />
                Porto, Portugal
              </p>
              <a href="tel:+15552345678"
                 className="block text-[#C5BEB5] hover:text-white transition-colors">
                +1 (555) 234-5678
              </a>
              <a href="mailto:hello@internity.com"
                 className="block text-[#C5BEB5] hover:text-white transition-colors">
                hello@internity.com
              </a>
            </div>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/8 flex flex-col sm:flex-row
                        items-start sm:items-center justify-between gap-3">
          <p className="text-[#3A3028] text-xs tracking-widest">
            © {new Date().getFullYear()} Internity Restaurant
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-[#3A3028] hover:text-[#7A6A55] text-xs tracking-widest uppercase transition-colors">
              Privacy
            </a>
            <a href="#" className="text-[#3A3028] hover:text-[#7A6A55] text-xs tracking-widest uppercase transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
