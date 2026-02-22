import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { firstName, lastName, email, phone, date, time, guests, occasion, notes } = req.body;

    const missing: string[] = [];
    if (!firstName?.trim()) missing.push("firstName");
    if (!lastName?.trim())  missing.push("lastName");
    if (!email?.trim())     missing.push("email");
    if (!date?.trim())      missing.push("date");
    if (!time?.trim())      missing.push("time");
    if (!guests?.trim())    missing.push("guests");

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Invalid email format" });
    }

    const reservation = await db.createReservation({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone?.trim() ?? "",
      date: date.trim(),
      time: time.trim(),
      guests: guests.trim(),
      occasion: occasion?.trim() ?? "",
      notes: notes?.trim() ?? "",
    });

    return res.status(201).json({
      success: true,
      reservationId: reservation.id,
    });
  } catch (error) {
    console.error("Reservation creation failed:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
