// ─── SITE CONTENT & COPY ──────────────────────────────────────────────────────
// Update this file to change section text, headlines, descriptions,
// background colors, reservation time slots, and navigation links.

import type {
  DiningSectionContent,
  IndicatorSection,
  NavLink,
  ReservationConfig,
} from "./types";
import { IMAGES } from "./images";
import { CONTACT } from "./business";

// ── Section Background Colors ────────────────────────────────────────────────
export const SECTION_BACKGROUNDS: Record<string, string> = {
  hero:        "#F2EDE7",
  brunch:      "#F2EDE7",
  lunch:       "#EBE5DA",
  dinner:      "#EDD9CA",
  reservation: "#F2EDE7",
};

export const INDICATOR_TEXT_COLORS: Record<string, string> = {
  brunch: "#000000",
  lunch:  "#000000",
  dinner: "#000000",
};

export const DEFAULT_BG = "#F2EDE7";
export const DEFAULT_INDICATOR_COLOR = "#000000";

// ── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "home",         id: "hero" },
  { label: "brunch",       id: "brunch" },
  { label: "lunch",        id: "lunch" },
  { label: "dinner",       id: "dinner" },
  { label: "reservations", id: "reservation" },
];

// ── Dining Sections ──────────────────────────────────────────────────────────
export const DINING_SECTIONS: DiningSectionContent[] = [
  {
    id: "brunch",
    imagePosition: "left",
    image: IMAGES.brunch,
    imageAlt: "Internity brunch",
    category: "brunch",
    timeLabel: "from 10:00",
    headline: "Start your day with something extraordinary.",
    description:
      "Our morning kitchen celebrates the ritual of a slow, unhurried meal. " +
      "Seasonal produce, handcrafted pastries, and specialty coffee — " +
      "crafted with the same devotion as our evening tasting menu.",
    ctaText: "view our brunch menu",
  },
  {
    id: "lunch",
    imagePosition: "right",
    image: IMAGES.lunch,
    imageAlt: "Internity lunch service",
    category: "lunch",
    timeLabel: "served all day",
    headline: "A table in the afternoon light.",
    description:
      "Our à la carte lunch embraces the unhurried pleasure of midday dining. " +
      "Seasonal plates, carefully sourced wines, and a terrace " +
      "that catches the afternoon sun. Every bottle chosen for character and surprise.",
    ctaText: "view our lunch menu",
  },
  {
    id: "dinner",
    imagePosition: "left",
    image: IMAGES.dinner,
    imageAlt: "Internity evening dinner",
    category: "dinner",
    timeLabel: "from 18:30",
    headline: "As evening settles in, the table finds its rhythm.",
    description:
      "Our dinner menu is bold, refined, and deeply personal. " +
      "Chef Delacroix leads the kitchen through a journey of textures and flavours " +
      "— each dish composed with intention, each pairing chosen with care.",
    ctaText: "view our dinner menu",
  },
];

// ── Right Indicator ──────────────────────────────────────────────────────────
export const INDICATOR_SECTIONS: IndicatorSection[] = [
  { id: "brunch",  label: "morning" },
  { id: "lunch",   label: "afternoon" },
  { id: "dinner",  label: "evening" },
];

// ── Reservation Config ───────────────────────────────────────────────────────
export const RESERVATION_CONFIG: ReservationConfig = {
  requireDeposit: true,
  depositAmountCents: 2500, // $25.00
  depositCurrency: "usd",
  maxGuestsOnline: 6,
  largePartyPhone: CONTACT.phone,
};

export const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM",  "1:30 PM",
  "6:30 PM",  "7:00 PM",  "7:30 PM",  "8:00 PM",  "8:30 PM", "9:00 PM",
];

export const OCCASIONS = [
  "Birthday", "Anniversary", "Business dinner",
  "Proposal", "Date night", "Other",
];

// ── Section Copy ─────────────────────────────────────────────────────────────
export const RESERVATION_SECTION_COPY = {
  label: "reservations",
  headline: "join us for a meal worth remembering",
  body: "Tuesday through Sunday, morning until late. Walk-ins welcome, reservations recommended.",
  cta: "book a table",
};

export const HERO_TAGLINE = "brunch  \u00b7  lunch  \u00b7  dinner";
