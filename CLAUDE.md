# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (also `npm start`)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Serve production build locally
- `npx tsc -b` — Type-check without emitting (no tsconfig emit configured)

No linter, formatter, or test runner is configured.

## Architecture

KargoSathi is a **multi-role transport broker SaaS prototype** (frontend-only, demo/pitch purposes). Five user roles: **broker**, **shipper**, **transporter**, **driver**, **admin**. All data is static mock data — no backend, no localStorage persistence.

### Tech Stack

React 19 + TypeScript + Vite 7 + Tailwind CSS 4 (via `@tailwindcss/vite` plugin). React Router v7 with `createBrowserRouter`. Recharts for charts. Lucide React for icons. `react-hook-form` + `zod` are installed but not yet used (forms currently use plain `useState`).

### Path Alias

`@/*` maps to `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

### Project Layout

```
src/
  types/index.ts     — All TS interfaces (User, Load, Truck, Trip, Invoice, etc.)
  mock/data.ts       — Static mock data + option lists (Indian logistics)
  context/           — AuthContext (role switcher), ToastContext (notifications)
  components/        — Reusable UI (Sidebar, Topbar, DataTable, MetricCard, Modal, etc.)
  layouts/           — DashboardLayout (sidebar + topbar + outlet, role-aware)
  pages/             — Role-prefixed page dirs: broker/, shipper/, transporter/, driver/, admin/
  routes/index.tsx   — All routes organized by role prefix
```

### Key Architectural Patterns

**Auth flow:** No real auth. `AuthContext.login(role)` maps role → preset mock user ID. `DashboardLayout` guards routes by checking `isAuthenticated` and matching the `role` prop against `useAuth().role`, redirecting to `/` on mismatch.

**Navigation config:** `DashboardLayout` contains a `navConfig` record keyed by `UserRole`. Each role's sidebar nav items are defined here — this is the single source of truth for sidebar navigation. When adding a new page, you must add its route in `routes/index.tsx` AND its nav entry in `DashboardLayout`'s `navConfig`.

**Routing:** Flat route definitions in `routes/index.tsx`. Each role group is a layout route with `<DashboardLayout role="...">` as element and child page routes beneath it. One dynamic route exists: `/driver/trip/:id`.

**Toasts:** `useToast().toast(type, message)` — types are `'success' | 'error' | 'warning' | 'info'`. Auto-dismiss after 3.5s.

**Forms:** Pages use plain `useState` + controlled inputs. `react-hook-form` and `zod` are available as dependencies if more complex validation is needed.

### Mock Data (`mock/data.ts`)

Exports arrays: `users`, `loads`, `trucks`, `trips`, `invoices`, `payments`, `disputes`, `notifications`, `chartData`. Also exports select options: `truckTypeOptions`, `materialOptions`, `cityOptions`. All data uses realistic Indian logistics context (cities, truck types, GST, freight rates).

### Custom CSS (`index.css`)

Tailwind 4 imported via `@import "tailwindcss"`. Custom animation utility classes available: `.animate-fade-in`, `.animate-slide-in`, `.animate-slide-up`, `.animate-pulse-dot`.

### Color Conventions

- Slate-900 → Sidebar | Blue-600 → Broker | Violet-600 → Shipper | Teal-600 → Transporter | Orange-500 → Driver | Indigo-600 → Admin
- Emerald → Success/Paid/Verified | Amber → Pending/Warning | Red → Error/Cancelled | Blue → Info/Processing
