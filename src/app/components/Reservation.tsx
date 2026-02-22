import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, CheckCircle, X } from "lucide-react";

// ─── RESERVATION SECTION ─────────────────────────────────────────────────────
// Minimal editorial booking section.
// TODO: Replace handleSubmit with your backend API endpoint.

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM",  "1:30 PM",
  "6:30 PM",  "7:00 PM",  "7:30 PM",  "8:00 PM",  "8:30 PM", "9:00 PM",
];

const INITIAL = {
  firstName: "", lastName: "", email: "", phone: "",
  date: "", time: "", guests: "", occasion: "", notes: "",
};

interface ReservationProps {
  asModal?: boolean;
  onClose?: () => void;
}

export function Reservation({ asModal, onClose }: ReservationProps) {
  const [form, setForm]       = useState(INITIAL);
  const [submitted, setSubm]  = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // TODO: Replace with real API call: await fetch('/api/reservations', { method: 'POST', body: JSON.stringify(form) })
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400)); // simulated delay
    console.log("Reservation:", form);
    setLoading(false);
    setSubm(true);
  };

  const reset = () => { setForm(INITIAL); setSubm(false); };
  const today = new Date().toISOString().split("T")[0];

  // ── Shared input class ──
  const input =
    "w-full bg-transparent border-b border-[#1E1918]/25 focus:border-[#1E1918] text-[#1E1918] " +
    "placeholder-[#7A6A55]/50 py-2.5 text-sm outline-none transition-colors duration-300";

  const content = (
    <div
      id="reservation"
      data-section="reservation"
      className={`${asModal ? "" : "min-h-screen flex flex-col justify-center"}
                  px-8 md:px-16 lg:px-24 py-20`}
    >
      {/* ── Header ── */}
      <div className="max-w-lg">
        {asModal && (
          <button
            onClick={onClose}
            className="mb-8 text-[#7A6A55] hover:text-[#1E1918] transition-colors"
          >
            <X size={20} />
          </button>
        )}

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#7A6A55] text-[10px] tracking-[0.35em] uppercase mb-3"
        >
          reservations
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.06 }}
          className="text-[#1E1918] mb-4 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          book your table
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-[#7A6A55] text-sm leading-relaxed mb-12"
        >
          For parties of seven or more, please call us at{" "}
          <a href="tel:+15552345678" className="text-[#1E1918] border-b border-[#1E1918]/30">
            +1 (555) 234-5678
          </a>
          .
        </motion.p>

        {/* ── Success state ── */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <CheckCircle size={28} className="text-[#7A6A55]" />
            <p className="text-[#1E1918]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontStyle: "italic" }}>
              We look forward to welcoming you, {form.firstName}.
            </p>
            <p className="text-[#7A6A55] text-sm">
              A confirmation has been sent to {form.email}.
            </p>
            <button
              onClick={reset}
              className="self-start text-xs tracking-[0.2em] uppercase border-b border-[#1E1918]/40
                         text-[#1E1918] mt-4 hover:border-[#1E1918] transition-colors"
            >
              new reservation
            </button>
          </motion.div>
        ) : (

          /* ── Form ── */
          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={onSubmit}
            className="space-y-6"
          >
            {/* Name row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[#7A6A55] text-[10px] tracking-[0.25em] uppercase block mb-1">First name *</label>
                <input name="firstName" value={form.firstName} onChange={onChange} required placeholder="John" className={input} />
              </div>
              <div>
                <label className="text-[#7A6A55] text-[10px] tracking-[0.25em] uppercase block mb-1">Last name *</label>
                <input name="lastName" value={form.lastName} onChange={onChange} required placeholder="Doe" className={input} />
              </div>
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[#7A6A55] text-[10px] tracking-[0.25em] uppercase block mb-1">Email *</label>
                <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="john@example.com" className={input} />
              </div>
              <div>
                <label className="text-[#7A6A55] text-[10px] tracking-[0.25em] uppercase block mb-1">Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+1 (555) 000-0000" className={input} />
              </div>
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="text-[#7A6A55] text-[10px] tracking-[0.25em] uppercase block mb-1">Date *</label>
                <input type="date" name="date" value={form.date} onChange={onChange} required min={today}
                  className={`${input} [color-scheme:light]`} />
              </div>
              <div>
                <label className="text-[#7A6A55] text-[10px] tracking-[0.25em] uppercase block mb-1">Time *</label>
                <div className="relative">
                  <select name="time" value={form.time} onChange={onChange} required className={`${input} appearance-none pr-6`}>
                    <option value="" disabled>—</option>
                    {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-0 top-3 text-[#7A6A55] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-[#7A6A55] text-[10px] tracking-[0.25em] uppercase block mb-1">Guests *</label>
                <div className="relative">
                  <select name="guests" value={form.guests} onChange={onChange} required className={`${input} appearance-none pr-6`}>
                    <option value="" disabled>—</option>
                    {["1","2","3","4","5","6"].map((n) => <option key={n}>{n} {n==="1"?"guest":"guests"}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-0 top-3 text-[#7A6A55] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="text-[#7A6A55] text-[10px] tracking-[0.25em] uppercase block mb-1">Occasion</label>
              <div className="relative">
                <select name="occasion" value={form.occasion} onChange={onChange} className={`${input} appearance-none pr-6`}>
                  <option value="">none</option>
                  {["Birthday","Anniversary","Business dinner","Proposal","Date night","Other"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-0 top-3 text-[#7A6A55] pointer-events-none" />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-[#7A6A55] text-[10px] tracking-[0.25em] uppercase block mb-1">Requests & dietary needs</label>
              <textarea
                name="notes" value={form.notes} onChange={onChange} rows={2}
                placeholder="Allergies, seating preferences..."
                className={`${input} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex items-center gap-3 text-[#1E1918] text-xs tracking-[0.2em] uppercase
                         mt-4 border-b border-[#1E1918]/40 pb-0.5 hover:border-[#1E1918] transition-all
                         duration-300 disabled:opacity-50"
            >
              {loading ? "confirming..." : "confirm reservation"}
              {!loading && (
                <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-base">→</span>
              )}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}

// ── Modal wrapper ──
export function ReservationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1E1918]/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 bg-[#F2EDE7] w-full max-w-xl
                       overflow-y-auto shadow-2xl"
          >
            <Reservation asModal onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
