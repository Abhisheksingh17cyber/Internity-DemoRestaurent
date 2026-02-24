# Internity Restaurant

A modern restaurant website built with React, TypeScript, Tailwind CSS, and Vite. Features reservation booking with Stripe deposit payments, editorial dining section layouts, and Vercel serverless API routes.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Motion (Framer Motion)
- **Backend API**: Next.js API Routes (Serverless)
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
npm run start
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
