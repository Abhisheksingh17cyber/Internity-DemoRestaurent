import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { db } from "../lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { reservationId, amount, currency = "usd" } = req.body;

    if (!reservationId || !amount) {
      return res.status(400).json({ error: "reservationId and amount are required" });
    }

    const reservation = await db.getReservation(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      metadata: {
        reservationId,
        customerName: `${reservation.firstName} ${reservation.lastName}`,
        customerEmail: reservation.email,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
      },
      receipt_email: reservation.email,
    });

    await db.updatePaymentStatus(reservationId, "pending", paymentIntent.id);

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("PaymentIntent creation failed:", error);
    const message = error instanceof Stripe.errors.StripeError
      ? error.message
      : "Internal server error";
    return res.status(500).json({ error: message });
  }
}
