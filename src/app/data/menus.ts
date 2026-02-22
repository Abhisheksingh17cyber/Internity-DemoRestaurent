// ─── MENU DATA ────────────────────────────────────────────────────────────────
// Update this file to change menu items, prices, and descriptions.
//
// STRUCTURE:
//   Each menu (brunch / lunch / dinner) has:
//     - title:    displayed at the top of the menu modal
//     - subtitle: serving hours shown below the title
//     - sections: grouped categories (e.g. "starters", "mains", "desserts")
//       - heading: category name
//       - items:   list of dishes, each with name, price, and note
//
// TO ADD A DISH:   add a new { name, price, note } object to the items array.
// TO REMOVE ONE:   delete the entire { name, price, note } line.
// TO CHANGE PRICE: update the price string (e.g. "$18" -> "$20").

import type { Menu } from "./types";

export const MENUS: Record<"brunch" | "lunch" | "dinner", Menu> = {
  brunch: {
    title: "Brunch Menu",
    subtitle: "served from 10:00 — 14:00",
    sections: [
      {
        heading: "from the kitchen",
        items: [
          { name: "Soft Eggs & Truffle Toast",  price: "$18", note: "soft-cooked eggs, black truffle, sourdough" },
          { name: "Avocado & Burrata",          price: "$16", note: "heirloom tomato, basil oil, sea salt" },
          { name: "Ricotta Pancakes",           price: "$14", note: "seasonal fruit, honey, crème fraîche" },
          { name: "Smoked Salmon Platter",      price: "$22", note: "capers, lemon, cream cheese, rye" },
        ],
      },
      {
        heading: "to drink",
        items: [
          { name: "Cold Brew",   price: "$6",  note: "house blend, slow-steeped" },
          { name: "Flat White",  price: "$5",  note: "single origin espresso" },
          { name: "Fresh Juice", price: "$7",  note: "orange, apple, or ginger" },
          { name: "Mimosa",      price: "$10", note: "prosecco, fresh orange" },
        ],
      },
    ],
  },
  lunch: {
    title: "Lunch Menu",
    subtitle: "served from 12:00 — 16:00",
    sections: [
      {
        heading: "starters",
        items: [
          { name: "Grilled Octopus",           price: "$22", note: "paprika, pickled cucumber, herb oil" },
          { name: "Burrata & Heirloom Tomato",  price: "$18", note: "basil, olive oil, salt flakes" },
          { name: "Soup du Jour",               price: "$12", note: "changes daily, ask your server" },
        ],
      },
      {
        heading: "mains",
        items: [
          { name: "Handmade Tagliatelle", price: "$32", note: "truffle butter, wild mushrooms, Parmesan" },
          { name: "Sea Bass Fillet",      price: "$44", note: "saffron, fennel, citrus butter" },
          { name: "Roasted Chicken",      price: "$36", note: "lemon thyme, root vegetables, jus" },
        ],
      },
      {
        heading: "wines by the glass",
        items: [
          { name: "White — Alvarinho",  price: "$12", note: "Vinho Verde, Portugal" },
          { name: "Red — Douro Blend",  price: "$14", note: "Porto region, Portugal" },
          { name: "Sparkling — Cava",   price: "$11", note: "Brut, Spain" },
        ],
      },
    ],
  },
  dinner: {
    title: "Dinner Menu",
    subtitle: "served from 18:30 — 22:30",
    sections: [
      {
        heading: "to begin",
        items: [
          { name: "Seared Foie Gras",  price: "$28", note: "brioche, fig compote, balsamic" },
          { name: "Truffle Arancini",   price: "$16", note: "aged Parmesan, lemon" },
          { name: "Amuse-Bouche",       price: "—",   note: "compliments of the chef" },
        ],
      },
      {
        heading: "main course",
        items: [
          { name: "Wagyu Beef Tenderloin", price: "$78", note: "bone marrow, red wine jus, seasonal" },
          { name: "Roasted Lamb Rack",     price: "$64", note: "herb crust, pommes dauphinoise, rosemary" },
          { name: "Pan-Seared Halibut",    price: "$56", note: "lobster bisque, asparagus, caviar" },
        ],
      },
      {
        heading: "desserts",
        items: [
          { name: "Chocolate Fondant", price: "$18", note: "Valrhona 72%, vanilla ice cream" },
          { name: "Crème Brûlée",      price: "$14", note: "classic vanilla, seasonal berries" },
          { name: "Cheese Selection",  price: "$24", note: "five artisan cheeses, accompaniments" },
        ],
      },
    ],
  },
};
