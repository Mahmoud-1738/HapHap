# HapHap Kiosk

Touch-first self-order kiosk built with React, TypeScript, and Vite.

## Features

- Multi-language entry screen (`nl`, `en`, `de`, `fr`, `es`)
- Category-driven product browser
- Cart editing with quantity controls
- Checkout flow with generated order number
- Locale-aware euro currency formatting

## Scripts

- `npm run dev` - start local dev server
- `npm run lint` - run ESLint
- `npm run test` - run unit tests for core order logic
- `npm run build` - typecheck and build production bundle
- `npm run preview` - preview production bundle locally

## Project Notes

- UI copy and labels are centralized in `src/i18n.ts`.
- Cart and order behavior is centralized in `src/lib/orderUtils.ts`.
- Product data lives in `src/data/menu.ts`.
