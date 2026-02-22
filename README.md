# Internity Restaurant

A modern restaurant website built with React, TypeScript, Tailwind CSS, and Vite. Features reservation booking with Stripe deposit payments, editorial dining section layouts, and Vercel serverless API routes.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v4, Motion (Framer Motion)
- **Backend**: Vercel Serverless Functions
- **Payments**: Stripe (PaymentIntent API + Elements)
- **UI**: shadcn/ui (Radix-based), Lucide icons

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

## Build & Preview

```bash
npm run build
npm run preview
```

## Deploy to Vercel

```bash
vercel
```

## Project Structure

```
src/
  app/
    data/          # Centralized business data, types, content
    components/    # React components
    components/ui/ # shadcn/ui primitives
  styles/          # CSS (fonts, tailwind, theme)
api/               # Vercel serverless functions
  payment/         # Stripe payment endpoints
  lib/             # Shared server utilities
```

## License

MIT
