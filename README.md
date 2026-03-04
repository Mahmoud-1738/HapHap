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
- `npm run kiosk:start` - open HapHap in full-screen kiosk mode (Edge)
- `npm run kiosk:install-autostart` - install Windows Startup entry for kiosk mode
- `npm run kiosk:remove-autostart` - remove Windows Startup entry

## Project Notes

- UI copy and labels are centralized in `src/i18n.ts`.
- Cart and order behavior is centralized in `src/lib/orderUtils.ts`.
- Product data lives in `src/data/menu.ts`.

## Kiosk Autostart (Windows)

1. Build the app once:
   - `npm run build`
2. Make sure your web server serves this folder at:
   - `http://localhost/web/HapHap/dist/`
3. Install startup entry (current Windows user):
   - `npm run kiosk:install-autostart`
4. Reboot or sign out/sign in to verify it launches full-screen automatically.

The startup entry is created in the user's Startup folder as:
- `HapHap-Kiosk-Autostart.cmd`
