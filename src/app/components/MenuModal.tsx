import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

// ─── MENU MODAL ───────────────────────────────────────────────────────────────
// Slide-up full-screen menu overlay.
// Triggered from DiningSection CTAs.

type MenuType = "brunch" | "lunch" | "dinner" | null;

// ── Menu data per service ──
const MENU_DATA = {
  brunch: {
    title: "Brunch Menu",
    subtitle: "served from 10:00 — 14:00",
    sections: [
      {
        heading: "from the kitchen",
        items: [
          { name: "Soft Eggs & Truffle Toast",           price: "$18", note: "soft-cooked eggs, black truffle, sourdough" },
          { name: "Avocado & Burrata",                   price: "$16", note: "heirloom tomato, basil oil, sea salt" },
          { name: "Ricotta Pancakes",                    price: "$14", note: "seasonal fruit, honey, crème fraîche" },
          { name: "Smoked Salmon Platter",               price: "$22", note: "capers, lemon, cream cheese, rye" },
        ],
      },
      {
        heading: "to drink",
        items: [
          { name: "Cold Brew",    price: "$6",  note: "house blend, slow-steeped" },
          { name: "Flat White",   price: "$5",  note: "single origin espresso" },
          { name: "Fresh Juice",  price: "$7",  note: "orange, apple, or ginger" },
          { name: "Mimosa",       price: "$10", note: "prosecco, fresh orange" },
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
          { name: "Grilled Octopus",          price: "$22", note: "paprika, pickled cucumber, herb oil" },
          { name: "Burrata & Heirloom Tomato", price: "$18", note: "basil, olive oil, salt flakes" },
          { name: "Soup du Jour",              price: "$12", note: "changes daily, ask your server" },
        ],
      },
      {
        heading: "mains",
        items: [
          { name: "Handmade Tagliatelle",  price: "$32", note: "truffle butter, wild mushrooms, Parmesan" },
          { name: "Sea Bass Fillet",       price: "$44", note: "saffron, fennel, citrus butter" },
          { name: "Roasted Chicken",       price: "$36", note: "lemon thyme, root vegetables, jus" },
        ],
      },
      {
        heading: "wines by the glass",
        items: [
          { name: "White — Alvarinho",   price: "$12", note: "Vinho Verde, Portugal" },
          { name: "Red — Douro Blend",   price: "$14", note: "Porto region, Portugal" },
          { name: "Sparkling — Cava",    price: "$11", note: "Brut, Spain" },
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
          { name: "Seared Foie Gras",    price: "$28", note: "brioche, fig compote, balsamic" },
          { name: "Truffle Arancini",    price: "$16", note: "aged Parmesan, lemon" },
          { name: "Amuse-Bouche",        price: "—",   note: "compliments of the chef" },
        ],
      },
      {
        heading: "main course",
        items: [
          { name: "Wagyu Beef Tenderloin",  price: "$78", note: "bone marrow, red wine jus, seasonal" },
          { name: "Roasted Lamb Rack",      price: "$64", note: "herb crust, pommes dauphinoise, rosemary" },
          { name: "Pan-Seared Halibut",     price: "$56", note: "lobster bisque, asparagus, caviar" },
        ],
      },
      {
        heading: "desserts",
        items: [
          { name: "Chocolate Fondant",  price: "$18", note: "Valrhona 72%, vanilla ice cream" },
          { name: "Crème Brûlée",       price: "$14", note: "classic vanilla, seasonal berries" },
          { name: "Cheese Selection",   price: "$24", note: "five artisan cheeses, accompaniments" },
        ],
      },
    ],
  },
};

interface MenuModalProps {
  open: MenuType;
  onClose: () => void;
}

export function MenuModal({ open, onClose }: MenuModalProps) {
  const data = open ? MENU_DATA[open] : null;

  return (
    <AnimatePresence>
      {open && data && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#1E1918]/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Slide-up panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#F2EDE7]
                       rounded-t-3xl max-h-[90vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-10 h-1 rounded-full bg-[#1E1918]/20" />
            </div>

            <div className="px-8 md:px-16 py-6 pb-16">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2
                    className="text-[#1E1918] leading-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                    }}
                  >
                    {data.title}
                  </h2>
                  <p className="text-[#7A6A55] text-xs tracking-[0.2em] uppercase mt-1">
                    {data.subtitle}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-1 text-[#7A6A55] hover:text-[#1E1918] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Menu sections */}
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                {data.sections.map((section) => (
                  <div key={section.heading}>
                    <p className="text-[#7A6A55] text-[10px] tracking-[0.3em] uppercase mb-4 pb-2
                                  border-b border-[#1E1918]/10">
                      {section.heading}
                    </p>
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <div key={item.name} className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[#1E1918] text-sm">{item.name}</p>
                            <p className="text-[#7A6A55] text-xs mt-0.5">{item.note}</p>
                          </div>
                          <span className="text-[#1E1918] text-sm flex-shrink-0">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export type { MenuType };
