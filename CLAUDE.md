# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (also `npm start`)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Serve production build locally
- `npx tsc -b` — Type-check without emitting (no tsconfig emit configured)

No linter, formatter, or test runner is configured.

## Architecture

KargoSathi is a **public-facing transport brokerage & logistics website** (frontend-only, demo/pitch prototype). It markets the brand and exposes self-serve tools: transporter discovery, truck-owner directory, fare calculator, live shipment tracking, enquiry/quote capture, invoice management, and an analytics dashboard. All data is static mock data — no backend.

### Tech Stack

React 19 + TypeScript + Vite 7 + Tailwind CSS 4 (via `@tailwindcss/vite` plugin). React Router v7 with `createBrowserRouter` (routes are `lazy`-loaded). **Redux Toolkit** + react-redux for global state (theme, enquiries, notifications). Recharts for dashboard charts. Lucide React for icons. `react-hook-form` + `zod` power the Enquiry and Contact forms. A legacy `ToastContext` provides toasts.

### Path Alias

`@/*` maps to `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

### Project Layout

```
src/
  types/index.ts        — All domain TS interfaces (Transporter, TruckOwner, Booking, Invoice, TrackingRecord, Enquiry, …)
  data/
    constants.ts        — Cities, states, truck types, service labels, distance matrix, truck specs, getDistance()
    index.ts            — Deterministically generated mock datasets + marketing content + chart data + getById helpers
  redux/                — store.ts (typed hooks), themeSlice, enquirySlice, notificationSlice
  context/ToastContext  — Toast notifications (useToast)
  utils/index.ts        — formatINR, formatINRShort, formatDate, calculateFare, downloadCSV, cx
  hooks/                — useCountUp (scroll-triggered counters)
  components/
    common/             — Button, Card, Badge/StatusBadge, Section/Container/SectionHeading, Field (Input/Select/Textarea/Label),
                          DataTable, StarRating, Skeleton, EmptyState, Breadcrumbs, MapPlaceholder, Icon, StatCounter
    layout/             — Navbar, Footer, PublicLayout (Outlet + Suspense + dark-mode effect), PageHeader
  pages/                — Home, About, Transporters(+Detail), TruckOwners(+Detail), FareCalculator,
                          LiveTracking, Enquiry, Invoices(+InvoiceDetail), Contact, Dashboard, NotFound
  routes/index.tsx      — Single PublicLayout route with all pages as children (lazy)
```

### Key Architectural Patterns

**Routing:** One `PublicLayout` parent route wraps all pages. All pages except `Home` are `React.lazy` + `<Suspense>` (in PublicLayout) — this keeps Recharts isolated to the Dashboard chunk. Detail routes (`/transporters/:id`, `/truck-owners/:id`, `/invoices/:id`) render `<NotFound />` when the id is missing.

**Global state (Redux):** `useAppSelector` / `useAppDispatch` are the typed hooks in `redux/store.ts`. `themeSlice` persists light/dark to `localStorage` (`ks-theme`); `PublicLayout` toggles the `dark` class on `<html>`. `enquirySlice` seeds from `data` and prepends new submissions. `notificationSlice` feeds the navbar bell.

**Dark mode:** Class-based via `@custom-variant dark` in `index.css`. Toggle from the navbar.

**Mock data:** `data/index.ts` generates all records deterministically with a seeded RNG (`rng(seed)`) so output is stable across reloads. Marketing content (services, testimonials, faqs, leadership, milestones, stats) also lives here. Fare math is in `utils/calculateFare` using `constants.getDistance` + `TRUCK_SPECS`.

**Forms:** Enquiry & Contact use `react-hook-form` + `zod` (`zodResolver`). Other inputs use the shared `Field` components.

**Reusable table:** `components/common/DataTable` handles sorting, pagination, row-click, and empty state. CSV export via `utils/downloadCSV`.

**Cross-page flow:** Home hero search → `/fare-calculator?from=&to=&truck=` (auto-calculates). Navbar search → `/tracking?q=`. Both read `useSearchParams`.

### Design System (`index.css`)

Tailwind 4 `@theme` tokens: `brand-*` (#0F4C81 primary), `accent-*` (#FF6B35 secondary), `success-*` (#22C55E). Custom animation utilities (`animate-fade-in/slide-up/float/truck`, `.delay-*`), `.glass` (glassmorphism), `.skeleton`, `.text-gradient`, `.bg-grid`, and print styles for invoices (`.no-print`, `.print-area`).

When adding a page: create it in `pages/`, add a `lazy` import + route in `routes/index.tsx`, and add a nav entry in `components/layout/Navbar.tsx` (`NAV` array) if it's a top-level page.
