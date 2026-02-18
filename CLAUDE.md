# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (also `npm start`)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Serve production build locally

No linter, formatter, or test runner is configured.

## Architecture

KargoSathi is a **multi-role transport broker SaaS prototype** (frontend-only, demo/pitch purposes). Five user roles: **broker**, **shipper**, **transporter**, **driver**, **admin**. All data is static mock data — no backend, no localStorage persistence.

### Tech Stack

React 19 + TypeScript + Vite 7 + Tailwind CSS 4 (via `@tailwindcss/vite` plugin). React Router v7 with `createBrowserRouter`. Recharts for charts. Lucide React for icons.

### Path Alias

`@/*` maps to `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

### Project Structure

```
src/
  types/index.ts          — All TypeScript interfaces (User, Load, Truck, Trip, Invoice, etc.)
  mock/data.ts            — Static mock data arrays + option lists (Indian logistics data)
  context/                — AuthContext (role switcher), ToastContext (notifications)
  components/             — 13 reusable components (see below)
  layouts/DashboardLayout — Sidebar + Topbar + Outlet, role-aware nav config
  pages/
    LoginPage.tsx         — Role selection landing page (no auth required)
    broker/               — 7 pages: Dashboard, CreateLoad, LoadList, AssignTruck, TripTracking, Invoices, Reports
    shipper/              — 4 pages: Dashboard, MyLoads, TrackShipment, Invoices
    transporter/          — 5 pages: FleetList, AddTruck, LoadMarketplace, MyTrips, Earnings
    driver/               — 3 pages: TripList, TripDetail, PodUpload
    admin/                — 4 pages: Dashboard, UserApproval, KycReview, DisputeList
  routes/index.tsx        — All routes organized by role prefix
```

### State Management

Two context providers in `App.tsx`:
- **ToastContext** — `useToast()` hook, auto-dismiss toasts after 3.5s
- **AuthContext** — `useAuth()` hook with `login(role)` / `logout()`. Login maps role to a preset mock user. No real authentication.

### Routing (`routes/index.tsx`)

- `/` — LoginPage (role switcher)
- `/broker/*` — Broker dashboard (7 child routes)
- `/shipper/*` — Shipper panel (4 child routes)
- `/transporter/*` — Transporter panel (5 child routes)
- `/driver/*` — Driver app (3 child routes, includes `/driver/trip/:id`)
- `/admin/*` — Admin panel (4 child routes)

Each role group uses `<DashboardLayout role="...">` which checks auth + renders sidebar/topbar/outlet.

### Reusable Components

Sidebar, Topbar, StatusBadge, DataTable, MetricCard, StepProgress, Timeline, LoadCard, TripCard, Modal, DocumentCard, MapPlaceholder.

### Mock Data (`mock/data.ts`)

Exports: `users`, `loads`, `trucks`, `trips`, `invoices`, `payments`, `disputes`, `notifications`, `chartData`, plus `truckTypeOptions`, `materialOptions`, `cityOptions`. All data uses realistic Indian logistics routes and companies.

### Color Conventions

- Slate-900 → Sidebar | Blue-600 → Broker | Violet-600 → Shipper | Teal-600 → Transporter | Orange-500 → Driver | Indigo-600 → Admin
- Emerald → Success/Paid/Verified | Amber → Pending/Warning | Red → Error/Cancelled | Blue → Info/Processing

### Entry Point

`main.tsx` renders into `#root`. `index.html` references `/src/main.tsx`.
