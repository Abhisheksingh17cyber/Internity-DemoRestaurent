import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CheckCircle, X, Loader2 } from "lucide-react";
import { RESERVATION_CONFIG } from "../data";
import type { ReservationFormData, PaymentIntentResponse } from "../data";

// ─── STRIPE SETUP ─────────────────────────────────────────────────────────────
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? "",
);

// ─── CARD ELEMENT STYLING ─────────────────────────────────────────────────────
const CARD_STYLE = {
  style: {
    base: {
      fontFamily: "'Jost', sans-serif",
      fontSize: "14px",
      color: "#000000",
      "::placeholder": { color: "rgba(0,0,0,0.4)" },
    },
    invalid: { color: "#B44A3D" },
  },
};

// ─── INNER PAYMENT FORM ───────────────────────────────────────────────────────
function PaymentForm({
  reservationId,
  reservationData,
  onSuccess,
  onClose,
}: {
  reservationId: string;
  reservationData: ReservationFormData;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [payError, setPayError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const depositAmount = (RESERVATION_CONFIG.depositAmountCents / 100).toFixed(2);
  const currency = RESERVATION_CONFIG.depositCurrency.toUpperCase();

  // Fetch the PaymentIntent client secret on mount
  useEffect(() => {
    let cancelled = false;

    async function createIntent() {
      try {
        const res = await fetch("/api/payment/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reservationId,
            amount: RESERVATION_CONFIG.depositAmountCents,
            currency: RESERVATION_CONFIG.depositCurrency,
          }),
        });

        const data: PaymentIntentResponse = await res.json();

        if (!cancelled) {
          if (!res.ok || !data.clientSecret) {
            setFetchError(data.error ?? "Could not initialize payment.");
          } else {
            setClientSecret(data.clientSecret);
          }
        }
      } catch {
        if (!cancelled) setFetchError("Unable to reach the payment server.");
      }
    }

    createIntent();
    return () => { cancelled = true; };
  }, [reservationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setPayError(null);

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: `${reservationData.firstName} ${reservationData.lastName}`,
          email: reservationData.email,
        },
      },
    });

    if (error) {
      setPayError(error.message ?? "Payment failed. Please try again.");
      setLoading(false);
    } else if (paymentIntent?.status === "succeeded") {
      setSucceeded(true);
      setLoading(false);
    }
  };

  return (
    <div className="px-8 md:px-16 lg:px-24 py-20">
      {/* Close button */}
      <button
        onClick={onClose}
        className="mb-8 text-black/60 hover:text-black transition-colors"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <p className="text-black text-[10px] tracking-[0.35em] uppercase mb-3">
        reservation deposit
      </p>
      <h2
        className="text-black mb-4 leading-tight"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 300,
          fontStyle: "italic",
        }}
      >
        secure your table
      </h2>

      {/* Reservation summary */}
      <div className="border-t border-black/10 pt-5 mb-8 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-black/60">Guest</span>
          <span className="text-black">
            {reservationData.firstName} {reservationData.lastName}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/60">Date</span>
          <span className="text-black">{reservationData.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/60">Time</span>
          <span className="text-black">{reservationData.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/60">Party size</span>
          <span className="text-black">{reservationData.guests}</span>
        </div>
        <div className="flex justify-between border-t border-black/10 pt-3 mt-3">
          <span className="text-black/60">Deposit</span>
          <span className="text-black font-medium">
            ${depositAmount} {currency}
          </span>
        </div>
      </div>

      {/* Success state */}
      {succeeded ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <CheckCircle size={28} className="text-black" />
          <p
            className="text-black"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem",
              fontStyle: "italic",
            }}
          >
            Payment confirmed, {reservationData.firstName}.
          </p>
          <p className="text-black text-sm">
            Your deposit of ${depositAmount} has been received. A confirmation
            has been sent to {reservationData.email}.
          </p>
          <button
            onClick={onSuccess}
            className="self-start text-xs tracking-[0.2em] uppercase border-b border-black/40
                       text-black mt-4 hover:border-black transition-colors"
          >
            done
          </button>
        </motion.div>
      ) : fetchError ? (
        /* Fetch error state */
        <div className="space-y-4">
          <p className="text-red-600 text-sm">{fetchError}</p>
          <button
            onClick={onClose}
            className="text-xs tracking-[0.2em] uppercase border-b border-black/40
                       text-black hover:border-black transition-colors"
          >
            go back
          </button>
        </div>
      ) : !clientSecret ? (
        /* Loading state */
        <div className="flex items-center gap-3 text-black text-sm">
          <Loader2 size={16} className="animate-spin" />
          Preparing payment...
        </div>
      ) : (
        /* Payment form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {payError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm"
            >
              {payError}
            </motion.p>
          )}

          <div>
            <label className="text-black text-[10px] tracking-[0.25em] uppercase block mb-3">
              Card details
            </label>
            <div className="border-b border-black/25 focus-within:border-black pb-2.5 transition-colors duration-300">
              <CardElement options={CARD_STYLE} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !stripe}
            className="group flex items-center gap-3 text-black text-xs tracking-[0.2em] uppercase
                       mt-4 border-b border-black/40 pb-0.5 hover:border-black transition-all
                       duration-300 disabled:opacity-50"
          >
            {loading ? "processing..." : `pay $${depositAmount} deposit`}
            {!loading && (
              <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-base">
                →
              </span>
            )}
          </button>

          <p className="text-black/40 text-[10px] mt-4 leading-relaxed">
            Your deposit will be applied toward your final bill.
            Cancellations must be made 24 hours in advance for a full refund.
          </p>
        </form>
      )}
    </div>
  );
}

// ─── PAYMENT MODAL ────────────────────────────────────────────────────────────
export function PaymentModal({
  open,
  onClose,
  reservationId,
  reservationData,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  reservationId: string | null;
  reservationData: ReservationFormData | null;
  onSuccess: () => void;
}) {
  return (
    <AnimatePresence>
      {open && reservationId && reservationData && (
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
            <Elements stripe={stripePromise}>
              <PaymentForm
                reservationId={reservationId}
                reservationData={reservationData}
                onSuccess={onSuccess}
                onClose={onClose}
              />
            </Elements>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
