// ─── DOMAIN TYPES ─────────────────────────────────────────────────────────────

/** A single menu item (dish, drink, etc.) */
export interface MenuItem {
  name: string;
  price: string;
  note: string;
}

/** A section within a menu (e.g. "starters", "mains") */
export interface MenuSection {
  heading: string;
  items: MenuItem[];
}

/** A complete menu for one dining period */
export interface Menu {
  title: string;
  subtitle: string;
  sections: MenuSection[];
}

/** Which menu is currently open */
export type MenuType = "brunch" | "lunch" | "dinner" | null;

/** A day-of-week operating hours entry */
export interface OperatingHours {
  days: string;
  time: string;
}

/** A social media link */
export interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

/** A navigation link in the overlay menu */
export interface NavLink {
  label: string;
  id: string;
}

/** Content for one dining section (brunch, lunch, dinner) */
export interface DiningSectionContent {
  id: string;
  imagePosition: "left" | "right";
  image: string;
  imageAlt: string;
  category: string;
  timeLabel: string;
  headline: string;
  description: string;
  ctaText: string;
}

/** Right indicator section config */
export interface IndicatorSection {
  id: string;
  label: string;
}

/** Reservation form field values */
export interface ReservationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes: string;
}

/** API response from POST /api/reservations */
export interface ReservationResponse {
  success: boolean;
  reservationId?: string;
  error?: string;
}

/** API response from POST /api/payment/create-intent */
export interface PaymentIntentResponse {
  clientSecret?: string;
  error?: string;
}

/** Reservation config for deposit requirements */
export interface ReservationConfig {
  requireDeposit: boolean;
  depositAmountCents: number;
  depositCurrency: string;
  maxGuestsOnline: number;
  largePartyPhone: string;
}
