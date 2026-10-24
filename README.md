# NOVA Commerce — Premium Editorial Storefront

> *"Thoughtfully designed essentials for modern living."*

NOVA Commerce is an industry-standard, production-quality luxury storefront built with Next.js App Router, TypeScript (strict mode), Tailwind CSS, Redux Toolkit, TanStack Query, Framer Motion, React Hook Form, Zod, Sonner, and Vitest.

Inspired by high-end design houses (e.g. Bang & Olufsen, Aesop, Arc'teryx, Le Labo), the application delivers an editorial visual identity featuring generous whitespace, refined typography, responsive touch controls, instant debounced catalog search, a deterministic client-side recommendation engine ("Smart Picks"), dark/light theme switching, persistent client state, and complete unit test coverage.

---

## Key Features

- **Editorial Luxury UI**: High-contrast, minimal aesthetic with zero generic templates, subtle micro-animations, and full dark/light theme support.
- **Next.js App Router Architecture**: Clean separation between Server Components (default for performance & SEO) and Client Components (`useClient` strictly scoped for interactive state).
- **Smart Picks Engine**: A client-side recommendation strategy calculating real-time aesthetic affinity scores based on user cart, wishlist, recently viewed items, price range, and tags.
- **Global Cart & Slide-Over Drawer**: Hydration-safe persistent Redux cart featuring live subtotal calculations, promo code validation (e.g. `NOVA10`), tax computation, and free-shipping progress indicators.
- **Product Catalog (/shop)**: Debounced search (300ms), category filtering, price range input, minimum rating filtering, in-stock toggle, sorting (Featured, Price, Rating, Newest), pagination, and mobile filter sheet drawer.
- **Product Detail View (/products/[id])**: Interactive image gallery, finish/color swatch pickers, size selectors, expandable specification accordions, verified customer reviews, related products, and automatic Recently Viewed tracking.
- **Multi-Step Checkout (/checkout)**: Form flow (Contact → Delivery → Payment → Review) validated strictly with React Hook Form + Zod, with inline error feedback and order receipt generation.
- **Order Confirmation (/order-success)**: Animated confirmation badge, generated order ID, itemized receipt, estimated delivery, and clear navigation paths.
- **Customer Account Dashboard (/account)**: Tabbed profile details, order history log, default shipping addresses, and communication preferences.
- **Persistent State**: Safe client-side local storage synchronization for Cart, Wishlist, Recently Viewed items, and Theme preferences, completely immune to SSR hydration mismatches.

---

## Tech Stack & Dependencies

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with CSS variables & dark/light theme support via `next-themes`
- **Global State**: [Redux Toolkit](https://redux-toolkit.js.org/) + `react-redux`
- **Server/Remote State**: [TanStack Query v5](https://tanstack.com/query) (`@tanstack/react-query`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (`@hookform/resolvers`)
- **Toast Notifications**: [Sonner](https://sonner.emilkowal.si/)
- **Testing**: [Vitest](https://vitest.dev/) + `@testing-library/react` + `jsdom`

---

## Architectural Principles & State Separation

```
                       ┌───────────────────────────────────────────────┐
                       │             Next.js App Router                │
                       └───────────────────────┬───────────────────────┘
                                               │
                       ┌───────────────────────┴───────────────────────┐
                       │                                               │
            ┌──────────▼──────────┐                         ┌──────────▼──────────┐
            │   TanStack Query    │                         │    Redux Toolkit    │
            │  (Remote API State) │                         │ (Global Client State)│
            └──────────┬──────────┘                         └──────────┬──────────┘
                       │                                               │
         • Product Catalog & Search                       • Shopping Cart Items
         • Product Details & Specs                        • Saved Wishlist Items
         • Category Metadata                              • Recently Viewed Queue
         • Customer Reviews                               • UI Drawer/Modal Open
         • Smart Picks Engine                             • Active Promo Codes
```

1. **Server vs. Client Components**:
   - Layouts, static editorial panels, SEO metadata generators, and page shells remain **Server Components** by default for maximum streaming performance and initial HTML delivery.
   - Client interactivity (`use client`) is strictly scoped to dynamic leaf nodes such as `CartDrawer`, `ShopFilters`, `ProductCard` hover overlays, `ThemeToggle`, and Redux/Query providers.

2. **TanStack Query vs. Redux Scoping**:
   - **TanStack Query** owns remote asynchronous data (`products`, `categories`, `reviews`, `smart picks`), providing automatic caching (5 min stale time), loading skeletons, background refetching, and error retry states.
   - **Redux Toolkit** owns mutable client state (`cart`, `wishlist`, `recentlyViewed`, `ui`), persisting safely to local storage with hydration guards.

---

## Directory Structure

```
nova-commerce/
├── app/
│   ├── layout.tsx             # Root layout with providers, header, announcement, footer
│   ├── page.tsx               # Hero, Collections, Tabbed Catalog, Spotlight, Smart Picks
│   ├── shop/
│   │   └── page.tsx           # Product catalog with debounced search & filters
│   ├── products/
│   │   └── [id]/page.tsx      # Product details, gallery, accordions & reviews
│   ├── cart/
│   │   └── page.tsx           # Standalone cart page with order breakdown
│   ├── wishlist/
│   │   └── page.tsx           # Saved products grid with move-to-cart action
│   ├── checkout/
│   │   └── page.tsx           # Multi-step checkout form with Zod validation
│   ├── order-success/
│   │   └── page.tsx           # Receipt confirmation screen with success animation
│   └── account/
│       └── page.tsx           # Customer profile, order history, addresses, preferences
├── components/
│   ├── ui/                    # Button, Badge, Input, Skeleton, Accordion
│   ├── layout/                # Header, Footer, AnnouncementBar, MobileNav, Providers
│   ├── product/               # ProductCard, ProductGrid, QuickViewModal, SmartPicksSection
│   ├── cart/                  # CartDrawer
│   ├── filters/               # ShopFilters, SortSelect, MobileFilterSheet
│   └── shared/                # ThemeToggle
├── features/
│   ├── cart/                  # cartSlice.ts, selectors.ts
│   ├── wishlist/              # wishlistSlice.ts, selectors.ts
│   ├── recently-viewed/       # recentlyViewedSlice.ts, selectors.ts
│   └── ui/                    # uiSlice.ts
├── lib/
│   ├── api/                   # products.ts, categories.ts, recommendations.ts
│   ├── store/                 # store.ts, hooks.ts, storage.ts
│   ├── utils.ts               # formatCurrency, cn, debounce
│   └── constants.ts           # Categories, shipping thresholds, promo codes
├── types/                     # product.ts, cart.ts, checkout.ts
├── tests/                     # cart.test.ts, wishlist.test.ts, checkout.test.ts, recommendations.test.ts
├── .env.example
├── vitest.config.ts
└── tailwind.config.ts
```

---

## Data Layer & Smart Picks Recommendation Engine

All API calls are abstracted in `lib/api/`. To ensure 100% visual excellence and eliminate low-res placeholder images, `lib/api/products.ts` provides a curated, high-resolution dataset featuring architectural furniture, acoustic audio, and minimalist apparel.

### Client-Side Recommendation Strategy ("Smart Picks")
`lib/api/recommendations.ts` implements a deterministic recommendation scoring strategy:
- **Category Affinity (+20 pts)**: Products matching categories present in the user's Cart, Wishlist, or Recently Viewed items.
- **Tag Overlap (+8 pts/tag)**: Overlapping aesthetic tags (e.g. `walnut`, `audio`, `brass`, `bestseller`).
- **Price Proximity (+15 pts)**: Products within 30% of the user's average viewed price point.
- **Rating Boost (+10 pts)**: High customer satisfaction rating (≥ 4.8 stars).
- **Cart Exclusion**: Products currently in the shopping bag are excluded from recommendations to maintain fresh discovery.

---

## Installation & Local Development

1. **Clone & Navigate**:
   ```bash
   git clone https://github.com/your-username/nova-commerce.git
   cd nova-commerce
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## Testing & Quality Verification Commands

- **Unit Tests (Vitest)**:
  ```bash
  npm run test
  ```
- **TypeScript Strict Compilation Check**:
  ```bash
  npx tsc --noEmit
  ```
- **ESLint Code Quality Audit**:
  ```bash
  npm run lint
  ```
- **Production Build Check**:
  ```bash
  npm run build
  ```

---

## Future Backend Integration Plan

To transition NOVA Commerce into a full-stack enterprise platform:
1. **Database & ORM**: Replace local mock data in `lib/api/` with Prisma ORM connecting to PostgreSQL (Supabase or Neon).
2. **Authentication**: Integrate NextAuth.js (Auth.js) or Clerk for OAuth (Google, Apple) and JWT session management.
3. **Payment Provider**: Replace checkout simulation with Stripe Elements / PaymentIntents API for real credit card processing, Apple Pay, and Klarna.
4. **Order Management & Webhooks**: Implement Stripe Webhooks (`checkout.session.completed`) to trigger order creation and stock decrement in PostgreSQL.

---

## Senior Engineering Interview Talking Points

- **Architectural Scoping of State**: "I separated server state from client state. TanStack Query handles API caching, refetching, and loading skeletons, while Redux Toolkit manages purely local, ephemeral mutable state like the shopping bag, wishlist, and drawer open flags."
- **Hydration Mismatch Safeguards**: "To prevent SSR hydration mismatches in Next.js when restoring state from `localStorage`, I implemented lazy state initialization guards and custom storage helpers that evaluate safely only after client mount."
- **Performance & Debouncing**: "Search query state is debounced by 300ms using custom utility hooks to prevent firing redundant network requests on every keypress while retaining responsive input feedback."
- **Accessibility & UX**: "All interactive elements utilize semantic HTML elements (`<button>`, `<header>`, `<nav>`, `<aside>`), explicit ARIA attributes (`aria-expanded`, `aria-label`), visible focus rings, and support `prefers-reduced-motion` CSS overrides."
