import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, CheckCircle, X } from "lucide-react";
import {
  TIME_SLOTS,
  OCCASIONS,
  CONTACT,
  RESERVATION_CONFIG,
} from "../data";
import type { ReservationFormData, ReservationResponse } from "../data";

// ─── RESERVATION SECTION ─────────────────────────────────────────────────────
// Minimal editorial booking section.
// Data sourced from centralized data layer; submits to POST /api/reservations.

const INITIAL: ReservationFormData = {
  firstName: "", lastName: "", email: "", phone: "",
  date: "", time: "", guests: "", occasion: "", notes: "",
};

const GUEST_OPTIONS = Array.from(
  { length: RESERVATION_CONFIG.maxGuestsOnline },
  (_, i) => String(i + 1),
);

interface ReservationProps {
  asModal?: boolean;
  onClose?: () => void;
  onReservationCreated?: (reservationId: string, formData: ReservationFormData) => void;
}

export function Reservation({ asModal, onClose, onReservationCreated }: ReservationProps) {
  const [form, setForm] = useState<ReservationFormData>(INITIAL);
  const [submitted, setSubm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: ReservationResponse = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);

      if (RESERVATION_CONFIG.requireDeposit && onReservationCreated && data.reservationId) {
        onReservationCreated(data.reservationId, form);
      } else {
        setSubm(true);
      }
    } catch {
      setError("Unable to reach the server. Please try again later.");
      setLoading(false);
    }
  };

  const reset = () => { setForm(INITIAL); setSubm(false); setError(null); };
  const today = new Date().toISOString().split("T")[0];

  // ── Shared input class ──
  const input =
    "w-full bg-transparent border-b border-black/25 focus:border-black text-black " +
    "placeholder-black/40 py-2.5 text-sm outline-none transition-colors duration-300";

  const content = (
    <div
      id="reservation"
      data-section="reservation"
      className={`${asModal ? "" : "min-h-screen flex flex-col justify-center"}
                  px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-20`}
    >
      {/* ── Header ── */}
      <div className="max-w-lg">
        {asModal && (
          <button
            onClick={onClose}
            className="mb-8 p-2 -ml-2 text-black/60 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        )}

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-black text-[10px] tracking-[0.35em] uppercase mb-3 font-jost"
        >
          reservations
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.06 }}
          className="text-black mb-4 leading-tight font-cormorant italic"
          style={{
            fontSize: "clamp(2.2rem, 8vw, 4rem)",
          }}
        >
          book your table
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-black text-[13px] sm:text-sm leading-relaxed mb-10 sm:mb-12"
        >
          For parties of seven or more, please call us at{" "}
          <a href={CONTACT.phoneHref} className="text-black border-b border-black/30">
            {CONTACT.phone}
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
            <CheckCircle size={28} className="text-black" />
            <p className="text-black" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontStyle: "italic" }}>
              We look forward to welcoming you, {form.firstName}.
            </p>
            <p className="text-black text-sm">
              A confirmation has been sent to {form.email}.
            </p>
            <button
              onClick={reset}
              className="self-start text-xs tracking-[0.2em] uppercase border-b border-black/40
                         text-black mt-4 hover:border-black transition-colors"
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
            className="space-y-8 sm:space-y-6"
          >
            {/* Error display */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm"
              >
                {error}
              </motion.p>
            )}

            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-black text-[10px] tracking-[0.25em] uppercase block mb-1">First name *</label>
                <input name="firstName" value={form.firstName} onChange={onChange} required placeholder="John" className={input} />
              </div>
              <div>
                <label className="text-black text-[10px] tracking-[0.25em] uppercase block mb-1">Last name *</label>
                <input name="lastName" value={form.lastName} onChange={onChange} required placeholder="Doe" className={input} />
              </div>
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-black text-[10px] tracking-[0.25em] uppercase block mb-1">Email *</label>
                <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="john@example.com" className={input} />
              </div>
              <div>
                <label className="text-black text-[10px] tracking-[0.25em] uppercase block mb-1">Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+1 (555) 000-0000" className={input} />
              </div>
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-black text-[10px] tracking-[0.25em] uppercase block mb-1">Date *</label>
                <input type="date" name="date" value={form.date} onChange={onChange} required min={today}
                  className={`${input} [color-scheme:light]`} />
              </div>
              <div>
                <label className="text-black text-[10px] tracking-[0.25em] uppercase block mb-1">Time *</label>
                <div className="relative">
                  <select name="time" value={form.time} onChange={onChange} required className={`${input} appearance-none pr-6`}>
                    <option value="" disabled>—</option>
                    {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-0 top-3 text-black pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-black text-[10px] tracking-[0.25em] uppercase block mb-1">Guests *</label>
                <div className="relative">
                  <select name="guests" value={form.guests} onChange={onChange} required className={`${input} appearance-none pr-6`}>
                    <option value="" disabled>—</option>
                    {GUEST_OPTIONS.map((n) => <option key={n}>{n} {n === "1" ? "guest" : "guests"}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-0 top-3 text-black pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="text-black text-[10px] tracking-[0.25em] uppercase block mb-1">Occasion</label>
              <div className="relative">
                <select name="occasion" value={form.occasion} onChange={onChange} className={`${input} appearance-none pr-6`}>
                  <option value="">none</option>
                  {OCCASIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-0 top-3 text-black pointer-events-none" />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-black text-[10px] tracking-[0.25em] uppercase block mb-1">Requests & dietary needs</label>
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
              className="group flex items-center gap-3 text-black text-xs tracking-[0.2em] uppercase
                         mt-4 border-b border-black/40 pb-0.5 hover:border-black transition-all
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

  return content;
}

// ── Modal wrapper ──
export function ReservationModal({
  open,
  onClose,
  onReservationCreated,
}: {
  open: boolean;
  onClose: () => void;
  onReservationCreated?: (reservationId: string, formData: ReservationFormData) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
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
            <Reservation asModal onClose={onClose} onReservationCreated={onReservationCreated} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
