## Bime Bazar – Coding Challenge (Vue 3 + Vite + TypeScript)

A mobile‑first Vue 3 application to query vehicle insurance price by plate number. It uses a clean UI layer with reusable components, strong type safety, IndexedDB for local history, and composables for core logic.

### Project Commands

- Install (use Node 20.x or 22.x and pnpm):

```bash
pnpm install
```

- Start development server (Vite):

```bash
pnpm dev
```

- Type check and build for production:

```bash
pnpm build
```

- Preview production build:

```bash
pnpm preview
```

- Run unit tests (Vitest):

```bash
pnpm test:unit
```

- Lint and format:

```bash
pnpm lint      # runs eslint + oxlint
pnpm format    # runs prettier over src/
```

### Environment Variables

Create a `.env` file at the project root and define:

```bash
# Base URL of the API used by composables/useApi.ts
VITE_APP_API_BASE_URL=http://localhost:3000/
```

- VITE_APP_API_BASE_URL: Controls where API requests are sent. In development, point this to your local mock server (e.g., Mockoon). In production, set it to the backend endpoint. The composable `useApi` builds URLs against this base and gracefully falls back to relative URLs if not provided.

### Project Structure

```text
.
├─ public/                     # Static assets served at root
├─ src/
│  ├─ assets/                  # Global styles, fonts, images
│  ├─ components/
│  │  ├─ PlateNumber.vue
│  │  └─ ui/                   # UI building blocks
│  │     ├─ button/            # UButton (tailwind-variants driven)
│  │     ├─ notification/      # UNotification
│  │     ├─ notifications/     # UNotifications (store-driven list)
│  │     ├─ modal/             # UModal + composable
│  │     ├─ dialog/            # UConfirmationDialog + composable
│  │     ├─ bottom-sheet/      # UBottomSheet + composable
│  │     ├─ mask-input/        # UMaskInput + composable
│  │     └─ tabs/              # UTabs + composable
│  ├─ composables/             # Business logic & utilities (Vue composables)
│  │  ├─ inquery/              # Plate inquiry domain (service, transform, types, useInquery)
│  │  ├─ useApi.ts             # Minimal fetch wrapper with base URL & JSON helpers
│  │  ├─ useNotify.ts          # Notification helper over Pinia store
│  │  └─ useCalculateInsuranceAmount.ts  # Insurance price calculation
│  ├─ constants/               # Static constants (e.g., plate words, tabs)
│  ├─ providers/               # Browser providers (IndexedDB helper)
│  ├─ router/                  # Vue Router
│  ├─ stores/                  # Pinia (notifications store)
│  ├─ pages/                   # Route pages (Home, History)
│  ├─ types/                   # Centralized TypeScript types (api, plate, notification, ...)
│  ├─ utils/                   # General utilities (formatting, pricing, time)
│  ├─ validation/              # Zod schemas & helpers
│  └─ __tests__/               # Vitest unit tests
│
├─ index.html                  # App entry
├─ vite.config.ts              # Vite config (aliases, Vue plugin)
├─ tsconfig*.json              # TypeScript configs
└─ package.json                # Scripts & deps
```

Key components:

- Pages: `src/pages/HomePage.vue` (inquiry form & result), `src/pages/HistoryPage.vue` (local history list)
- Domain: `src/composables/inquery` encapsulates API integration, transformation and persistence
- UI: `src/components/ui` exposes building blocks under the `U*` naming (e.g., `UButton`, `UModal`)

### UI Layer (ui/)

The UI layer provides reusable, typed, and consistent components:

- Buttons: `components/ui/button`
  - Variants: `solid | outline | ghost`
  - Colors: `info | error | green | gray`
  - Sizes: `sm | md | lg`
  - API: `<UButton :variant :color :size :block :loading />`
- Notifications:
  - `UNotification` (single) themed via variants
  - `UNotifications` (list) bound to a Pinia store
- Overlays: `UModal`, `UConfirmationDialog`, `UBottomSheet` driven by small composables for core logic
- Inputs: `UMaskInput` uses `defineModel` and a composable for digit sanitization
- Navigation: `UTabs` with a composable for active state class management

Tailwind Variants:

- Variant classes are built with `tailwind-variants` (tv) to keep styling consistent and declarative.
- Theme files: `button/button.theme.ts`, `notification/notification.theme.ts` define tv configuration.
- If not already installed, add:

```bash
pnpm add tailwind-variants tailwind-merge
```

Then import and use the components via the barrel:

```ts
import { UButton, UModal, UNotification, UNotifications, UTabs } from '@/components/ui'
```

### Design Principles (Mobile‑First)

- Layouts and components are designed mobile‑first and progressively enhanced for larger screens.
- Consistent spacing, readable typography, and accessible focus states.
- Smooth transitions on overlays and interactive elements (e.g., modal, bottom sheet).

### Form Validations

- Zod is used for robust input validation.
- Example: `src/validation/plate.ts` validates plate segments and normalizes digits.
- Errors are shown via the notification system (`useNotify`) for a user‑friendly experience.

### Local Data Storage (IndexedDB)

- `src/providers/indexedDb.ts` wraps IndexedDB in a small promise‑based API.
- Store: `inqueries`, keyed by `plateEn`.
- Operations: `insert`, `get`, `getAll`, `remove`.
- History page (`HistoryPage.vue`) reads all records, parses plate values, and renders the list.

### Utilities

- `src/utils/format.ts`: Digit normalization (Persian/Arabic to ASCII), currency formatting, plate parsing, persian date formatting fallback.
- `src/utils/time.ts`: `timeAgo` helper for friendly timestamps.
- `src/utils/pricing.ts`: Base insurance price calculation (pure function).
- `src/composables/useCalculateInsuranceAmount.ts`: Exposes `calculateInsurancePrice` for app usage.
- Unit tests: `src/__tests__/calculateInsuranceAmount.test.ts` covers core pricing scenarios with fixed timers.

### Mock Data Setup (Mockoon)

Use Mockoon to simulate backend responses locally.

1. Install the Mockoon desktop app (`https://mockoon.com/`).
2. Create/import an environment (File → Import). If you have a shared JSON file, place it e.g. at `mock/mockoon_environments.json` and import it.
3. Define an endpoint to serve plate inquiries, for example:
   - Method: GET
   - Route: `/inquiry/plate=:plate`
   - Response Body (JSON):

```json
{
  "plate": "12الف345-67",
  "brand": "Peugeot",
  "model": "206",
  "make_date": "2018-05-01T00:00:00Z",
  "owner": { "name_full": "علی رضایی", "national_id": "0012345678" }
}
```

4. Start the Mockoon server (e.g., `http://localhost:3000/`) and set:

```bash
VITE_APP_API_BASE_URL=http://localhost:3000/
```

5. Run the app with `pnpm dev` and perform an inquiry from the homepage.

### Notes

- Node engines: `"node": "^20.19.0 || >=22.12.0"`
- Tech stack: Vue 3, Vite 7, TypeScript 5, Pinia, Vue Router 4, Tailwind CSS, Zod, Vitest.
- Aliases: `@` → `./src` (see `vite.config.ts`).

---

If anything is unclear or you need more examples (e.g., adding a new UI variant or validator), feel free to open an issue or reach out.
