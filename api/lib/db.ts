// ─── DATABASE ADAPTER ─────────────────────────────────────────────────────────
// Clean interface for reservation/payment storage.
// Currently uses an in-memory placeholder. Swap the implementation below
// with your real database (MongoDB, PostgreSQL, Supabase, etc.)
//
// Example for MongoDB:
//   import { MongoClient } from "mongodb";
//   const client = new MongoClient(process.env.DATABASE_URL!);
//   const db = client.db("internity");
//   const reservations = db.collection<Reservation>("reservations");

export interface Reservation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes: string;
  paymentStatus: "pending" | "paid" | "failed" | "none";
  paymentIntentId?: string;
  createdAt: string;
}

export interface DbAdapter {
  createReservation(data: Omit<Reservation, "id" | "createdAt" | "paymentStatus">): Promise<Reservation>;
  getReservation(id: string): Promise<Reservation | null>;
  updatePaymentStatus(
    id: string,
    status: Reservation["paymentStatus"],
    paymentIntentId?: string
  ): Promise<Reservation | null>;
}

// ─── IN-MEMORY PLACEHOLDER ────────────────────────────────────────────────────
// WARNING: This does NOT persist between Vercel serverless function invocations.
// Replace with a real database connection for production use.

const store = new Map<string, Reservation>();

function generateId(): string {
  return `res_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const db: DbAdapter = {
  async createReservation(data) {
    const reservation: Reservation = {
      ...data,
      id: generateId(),
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    };
    store.set(reservation.id, reservation);
    return reservation;
  },

  async getReservation(id) {
    return store.get(id) ?? null;
  },

  async updatePaymentStatus(id, status, paymentIntentId) {
    const reservation = store.get(id);
    if (!reservation) return null;
    reservation.paymentStatus = status;
    if (paymentIntentId) reservation.paymentIntentId = paymentIntentId;
    store.set(id, reservation);
    return reservation;
  },
};
