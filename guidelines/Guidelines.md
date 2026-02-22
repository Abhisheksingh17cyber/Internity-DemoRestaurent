# Internity Development Guidelines

## Design System

- **Primary brand color**: `#1E1918` (near-black)
- **Secondary text**: `#7A6A55` (warm brown)
- **Background palette**: `#F2EDE7` (cream), `#EBE5DA` (golden beige), `#EDD9CA` (soft rose)
- **Heading font**: Cormorant Garamond (serif, weight 300, italic)
- **Logo/accent font**: Caveat (cursive, weight 400)
- **Body font**: Jost (sans-serif, weight 300-400)

## Component Conventions

- Use `motion` from `motion/react` for animations
- Prefer Framer Motion's `whileInView` for scroll-triggered entrances
- Use lucide-react for icons
- Follow editorial/minimal aesthetic
- Use shadcn/ui primitives from `components/ui/` when applicable

## Layout Rules

- Use flexbox and CSS grid for responsive layouts
- Avoid absolute positioning unless layering is required (hero overlays, modals)
- Keep file sizes small; extract helpers/subcomponents into their own files
