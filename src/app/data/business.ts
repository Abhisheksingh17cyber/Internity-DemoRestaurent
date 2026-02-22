// ─── BUSINESS INFORMATION ─────────────────────────────────────────────────────
// Single source of truth for the restaurant's identity.
//
// TO CHANGE THE PHONE NUMBER: update both "phone" (display) and "phoneHref" (link).
// TO CHANGE HOURS: update the HOURS array below.
// TO ADD A SOCIAL LINK: add an entry to SOCIAL_LINKS with platform, href, and label.

import type { OperatingHours, SocialLink } from "./types";

export const RESTAURANT_NAME = "internity";
export const RESTAURANT_NAME_FORMAL = "Internity Restaurant";

export const CONTACT = {
  phone: "+1 (555) 234-5678",
  phoneHref: "tel:+15552345678",
  email: "hello@internity.com",
  emailHref: "mailto:hello@internity.com",
  address: {
    line1: "12 Rue de l'Excellence",
    city: "Porto",
    country: "Portugal",
  },
} as const;

export const HOURS: OperatingHours[] = [
  { days: "Tuesday – Thursday", time: "10:00 – 22:30" },
  { days: "Friday – Saturday",  time: "10:00 – 23:30" },
  { days: "Sunday",             time: "10:00 – 21:00" },
  { days: "Monday",             time: "Closed" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "instagram", href: "https://instagram.com", label: "Instagram" },
  { platform: "facebook",  href: "https://facebook.com",  label: "Facebook" },
];

export const FOOTER_TAGLINE =
  "Where every meal becomes a timeless memory. Fine dining at the intersection of tradition and innovation.";
