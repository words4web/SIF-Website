# Shelly Indian Foods Frontend — Project Context

This document provides a comprehensive overview of the **Shelly Indian Foods (SIF) Frontend** codebase, its directory structure, technical stack, navigation architecture, data-driven section structure, core state management, data flows, and routing.

---

## 1. Project Overview

**Shelly Indian Foods Frontend** is the wholesale ordering and brand showcase client portal for the authorized distributor of Tata Consumer Products in Italy (Shelly Indian Foods Di Grover Shelly C. SAS, established in 1998, based in Cremona). It allows registered B2B clients, supermarkets, Indian restaurants, and food service wholesalers across Italy to:

- Explore brand stories and heritage (About Us, Trust & Heritage, Quality Assurance).
- Filter and browse a rich catalog of authentic Tata products (Tata Tea, Tata Salt, Tata Sampann) and pantry staples.
- Manage shopping carts with live price calculations and real-time quantity validation.
- Select verified delivery addresses and submit wholesale order inquiries.
- Search an interactive FAQ center with category filters and direct support contact cards.
- Receive real-time push and in-app notifications (FCM & WebSockets).

---

## 2. Technical Stack

- **Framework**: Next.js 16.3.0 (App Router & Turbopack)
- **Runtime**: React 19 & React DOM 19
- **State Management**: Redux Toolkit & Redux Persist (`localStorage` for Auth & Notification state)
- **Internationalization (i18n)**: `next-intl` (SSR & Client Provider with cookie-persisted `NEXT_LOCALE` routing without URL path prefixes)
- **Data Fetching & Cache**: TanStack React Query (`@tanstack/react-query`)
- **API Client**: Axios (configured with token refresh interceptors & error handlers)
- **Push Notifications & Messaging**: Firebase Web SDK (`firebase/app`, `firebase/messaging`) + Background Service Worker
- **Styling**: Tailwind CSS 4.3.3 + PostCSS, `@base-ui/react`, and `sonner` for toast alerts
- **Brand Palette & Tokens**:
  - Primary Red: `#cb242c` (`--primary`)
  - Amber / Accent Yellow: `#ffd230` (`--accent`, `--accent-foreground: #000000`)
  - Warm Canvas: `#faf8f5` / `#fcfbf9`
  - Deep Dark Surfaces: `#1a1917` / `#161616`
- **Icons**: `lucide-react` + inline custom SVGs for social media brand icons (Facebook, Instagram, LinkedIn)
- **Language**: TypeScript 5.7.3

---

## 3. Directory Structure

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router folders & pages
│   │   ├── (auth)/                   # Guest authentication views (login, signup)
│   │   ├── (dashboard)/              # Main application & portal pages
│   │   │   ├── about/                # About Us page (Grover family heritage, stats pillars, vision/mission, Cremona HQ)
│   │   │   ├── blogs/                # Blog & market insights listing (`/blogs`) and article reader (`/blogs/[slug]`)
│   │   │   ├── cart/                 # Cart overview with quantity controls & scrollable item list
│   │   │   ├── catalogue/            # Category filtering & product search catalogue
│   │   │   ├── checkout/             # Delivery selection & Order summary checkout flow
│   │   │   ├── faq/                  # Interactive FAQ page (search, category tabs, accordions, support CTA)
│   │   │   ├── notifications/        # Client notification inbox with read/unread states
│   │   │   ├── order-success/[id]/   # Dedicated order confirmation & receipt page
│   │   │   ├── orders/               # Client past order history (Segmented control: In Process / Delivered)
│   │   │   ├── products/[slug]/      # Single product details page (multi-image gallery, specs, related items)
│   │   │   ├── profile/              # Business client profile, delivery addresses & NotificationToggle
│   │   │   └── page.tsx              # Home landing page (Hero, Brands, Quality, Features, Categories, Products, Trust, Testimonials)
│   │   ├── globals.css               # Global Tailwind variables, tokens, mobile safe offsets & animations
│   │   └── layout.tsx                # Root layout configuring QueryClient, Toaster, Redux, & Providers
│   │
│   ├── components/                   # React Components
│   │   ├── common/                   # Shared views (ErrorView, Loader, NotificationListener, ProductImage, LanguageSwitcher, ConfirmModal, AddressModal)
│   │   ├── dashboard/                # Portal & landing page feature components
│   │   │   ├── address-section.tsx   # Saved delivery addresses management
│   │   │   ├── blocked-permission-banner.tsx # FCM browser permission alert
│   │   │   ├── cart-item-card.tsx    # Cart item card with quantity adjustment & ProductImage
│   │   │   ├── catalogue-filters.tsx # Search input and category filter pills
│   │   │   ├── categories-section.tsx# Category navigation grid
│   │   │   ├── delivery-selection.tsx# Checkout delivery address dropdown & notes
│   │   │   ├── distributed-brands-section.tsx # Interactive Tata brand showcases & product highlight cards
│   │   │   ├── features-section.tsx  # Feature value props (Nationwide delivery, Tata importer, 25+ years)
│   │   │   ├── hero-banner-video.tsx # Video background banner with animated badges & search CTA
│   │   │   ├── hero-section.tsx      # Landing hero container
│   │   │   ├── notification-toggle.tsx# Profile switch control for FCM notifications
│   │   │   ├── order-card.tsx        # Overview card for past orders
│   │   │   ├── order-items-list.tsx  # Itemized list component for orders
│   │   │   ├── order-payment-summary.tsx # Subtotal and total breakdown
│   │   │   ├── order-success.tsx     # Order submission confirmation screen
│   │   │   ├── order-summary.tsx     # Checkout order summary card
│   │   │   ├── order-tabs.tsx        # Filter tabs for orders (In Process / Delivered)
│   │   │   ├── products-section.tsx  # Featured catalog product grid
│   │   │   ├── quality-assurance-section.tsx # 4-step import & quality control process
│   │   │   ├── testimonials-section.tsx # B2B customer reviews & spotlight switcher
│   │   │   └── trust-story-section.tsx # 25+ years heritage, BRCGS Grade A assurance, scale metrics
│   │   ├── navigation/               # Navigation Sub-system
│   │   │   ├── desktop-header.tsx    # Full desktop header (>= md) with avatar, search, notifications, cart
│   │   │   ├── mobile-header.tsx     # Clean mobile top header (< md) with logo & search/notification icons
│   │   │   └── mobile-bottom-nav.tsx # Bottom navigation bar (< md) with active tabs & yellow cart badge
│   │   ├── skeleton/                 # Skeleton loading components (OrderSkeleton, CartSkeleton, CheckoutSkeleton)
│   │   ├── ui/                       # Low-level primitives (Button, Modal, Input, Dialog, Tooltip)
│   │   ├── blog-card.tsx             # Standard clickable card for blog posts
│   │   ├── footer.tsx                # Main footer (brand, quick links, brands, Cremona hub, BRCGS, attribution)
│   │   ├── portal-header.tsx         # Unified wrapper rendering DesktopHeader, MobileHeader, and MobileBottomNav
│   │   ├── product-card.tsx          # Dual-sided product card with wholesale details
│   │   ├── product-detail.tsx        # Single product view with multi-image gallery & quantity selector
│   │   └── product-visual.tsx        # Category icon visual renderer
│   │
│   ├── constants/                    # Application Constants
│   │   ├── api.ts                    # Backend API endpoint definitions (AUTH, PRODUCTS, CART, ORDERS, NOTIFICATIONS, ADDRESSES)
│   │   ├── routes.ts                 # Route definitions & helper URL generators
│   │   └── storage.ts                # Storage keys (sif_fcm_token, sif_notif_enabled, sif_notif_banner_dismissed)
│   │
│   ├── data/                         # Data layer (strictly separated static copy & mock datasets)
│   │   ├── blogs/                    # Individual blog post data files
│   │   │   └── why-choose-sif.ts     # "Why Choose Shelly Indian Foods as Your Indian Food Distributor in Italy?"
│   │   ├── about.ts                  # About Us stats, story copy, values, and Cremona contact details
│   │   ├── blogs.ts                  # Aggregated blog collection (BLOG_POSTS)
│   │   ├── brands.ts                 # Distributed brands (Tata Tea, Tata Salt, Tata Sampann) and highlight items
│   │   ├── corporate-story.ts        # Corporate scale stats, certifications, and heritage pillars
│   │   ├── faq.ts                    # FAQ categories and Q&A items with answers
│   │   ├── footer.ts                 # Footer data (social links, quick links, brand links, contacts, copyright)
│   │   ├── navigation.ts             # Header utility actions & mobile navigation tab definitions
│   │   ├── supply-chain.ts           # 4-step quality assurance workflow items
│   │   └── testimonials.ts           # B2B client testimonials and feedback
│   │
│   ├── hooks/                        # Custom React Hooks
│   │   ├── useAuth.ts                # Auth state & user accessor hook
│   │   ├── useAuthFlow.ts            # Authentication redirects and routing helpers
│   │   ├── useCart.ts                # Cart state, item calculations, and mutations
│   │   ├── useCatalogueFilters.ts    # Mutually exclusive URL-synced search and category filter state
│   │   ├── useDebounce.ts            # Debounce utility for inputs
│   │   └── useFcmLifecycle.ts        # FCM notification registration & device synchronization
│   │
│   ├── i18n/                         # Internationalization Configuration & Request Handler
│   │   ├── config.ts                 # Supported locales (en, it), default locale, cookie key, and language labels/flags
│   │   └── request.ts                # Server request configuration reading NEXT_LOCALE cookie & static message maps
│   │
│   ├── messages/                     # Translation Dictionaries
│   │   ├── en.json                   # English message catalog (navigation, footer, common)
│   │   └── it.json                   # Italian message catalog (navigation, footer, common)
│   │
│   ├── lib/                          # Core Libraries & Redux Store
│   │   ├── axiosInstance.ts          # Axios client with JWT refresh interceptor
│   │   ├── firebase.ts               # Firebase client initialization & messaging instance
│   │   ├── format.ts                 # Currency and number formatters
│   │   ├── idempotency.ts            # Client idempotency key manager (sessionStorage)
│   │   ├── store/                    # Redux Slices (authSlice, cartSlice, notificationSlice)
│   │   └── store.ts                  # Redux root store configuration & persistence setup
│   │
│   ├── services/                     # React Query & API Service Layer
│   │   ├── address/                  # Address CRUD hooks and services
│   │   ├── auth/                     # Authentication mutations (login, signup, refresh)
│   │   ├── category/                 # Category queries
│   │   ├── notification/             # Notification queries, mark-read mutations, device token sync
│   │   ├── order/                    # Order placement (`useCreateOrder`) & order list queries
│   │   └── product/                  # Product search & single product queries
│   │
│   └── types/                        # Core TypeScript Type Definitions
│       ├── about.types.ts            # About Us data interfaces (AboutData, StatPillar, ValueItem, ContactItem)
│       ├── address.types.ts          # AddressPayload and SavedAddress schemas
│       ├── auth/                     # Auth payload & response types
│       ├── blog.types.ts             # BlogPost, BlogContent, BlogReason, BlogFAQ schemas
│       ├── brand.types.ts            # BrandItem & DistributedBrand interfaces
│       ├── cart.types.ts             # CartItem, CartResponse schemas
│       ├── category/                 # CategoryItem definitions
│       ├── common.types.ts           # ApiResponse, Pagination types
│       ├── corporate.types.ts        # Heritage stats, certification card interfaces
│       ├── faq.types.ts              # FAQItem, FAQCategory interfaces
│       ├── footer.types.ts           # FooterLink, FooterSocialLink, FooterData interfaces
│       ├── notification.types.ts     # NotificationItem, SyncDevicePayload schemas
│       ├── order.types.ts            # Order, OrderItem, OrderSummary schemas
│       ├── product/                  # Product, ProductDetail, ProductVariant ({ weight: number, price: number }), RelatedProductItem schemas
│       ├── supply-chain.types.ts     # SupplyChainStep interfaces
│       ├── testimonials.types.ts     # TestimonialItem interfaces
│       └── user.types.ts             # User schema & profile structures
│
├── public/
│   ├── brands/                       # Brand logos (tata-tea.png, tata-salt.png, tata-sampann.png)
│   ├── Abouts-us.jpg                 # Grover family high-resolution heritage photo
│   ├── logo.png                      # Shelly Indian Foods official logo
│   └── firebase-messaging-sw.js      # Background Push Notification Service Worker
```

---

## 4. Key Workflows & Features

### 1. Dedicated Desktop & Mobile Navigation Architecture

- **Desktop Navigation (`DesktopHeader`)**:
  - Sticky header (`md:block`) with company logo, primary links (**Home**, **Catalogue**, **Orders**), quick search shortcut, unread notifications counter, and cart badge.
- **Mobile Top Header (`MobileHeader`)**:
  - Compact header (`md:hidden`) with brand logo, search icon button, and notification bell with unread badge.
- **Mobile Bottom Navigation (`MobileBottomNav`)**:
  - Sticky WhatsApp/Instagram style bottom navigation bar with 5 primary tabs: **Home**, **Catalogue**, **Cart** (featuring a high-contrast yellow/gold `bg-accent` badge with item count), **Orders**, and **Profile** (displaying user initials avatar).
  - Configured with safe area bottom padding to prevent overlap with floating buttons or footer elements.

### 2. Comprehensive Landing Page Sections

- **Hero Video Banner (`HeroBannerVideo`)**: Interactive video background with exclusive Tata importer badge, key value props, and quick search shortcut.
- **Distributed Brands Section (`DistributedBrandsSection`)**: Interactive tab switcher highlighting Tata Tea, Tata Salt, and Tata Sampann with wholesale package details and direct catalogue links.
- **Interactive Categories Showcase (`CategoriesSection`)**: Rich master/detail catalogue showcase with left-column category selector (thumbnails, titles, tagline hooks) and right-column spotlight card (high-res category banner image, tagline, rich description, and direct "Browse Category" button). Mobile supports horizontal snap pill navigation.
- **Quality Assurance Section (`QualityAssuranceSection`)**: 4-step B2B supply chain journey (Farm-gate Sourcing -> Custom Clearance -> Temperature-Controlled Logistics -> Direct Wholesale Delivery).
- **Trust & Heritage Story (`TrustStorySection`)**: 25+ years of distribution heritage, BRCGS Grade A certification assurance, and corporate scale metrics.
- **Testimonials Section (`TestimonialsSection`)**: Curated feedback from Italian supermarkets, restaurateurs, and wholesale distributors.

### 3. Dedicated Information Pages

- **About Us Page (`/about`)**:
  - Split-screen hero featuring the Grover family photo card (`public/Abouts-us.jpg`), 4 metric pillars (Founded 1998, 500+ SKUs, 100% Authentic, Pan-Italy Logistics), Vision & Mission dual cards, and Cremona HQ contact box.
- **FAQ Page (`/faq`)**:
  - Searchable Q&A accordion categorized into Ordering & Minimums, Logistics & Delivery, Quality & Certifications, and Account & Invoicing, paired with a direct Cremona support contact card.
- **Blogs & Industry Insights (`/blogs` and `/blogs/[slug]`)**:
  - **Listing Page (`/blogs`)**: Clean, mobile-responsive grid of articles with compact header, internationalized via `useTranslations("blogsPage")`.
  - **Clickable Card Component (`BlogCard`)**: Unified clickable Next.js `<Link>` card displaying responsive 16:9 aspect image banner, publication date, title, excerpt, and author.
  - **Article Detail Page (`/blogs/[slug]`)**: Server-rendered dynamic detail view (`generateMetadata` & `generateStaticParams` capable) with horizontal-scrollable mobile breadcrumbs, responsive 16:9 hero image, structured body paragraphs, callout section, 16:9 insight illustration, numbered reasons, dark summary card with Cremona contact buttons, FAQ accordion, and back navigation.
  - **Modular Architecture**: Blog data isolated under `src/data/blogs/*.ts` (e.g. `why-choose-sif.ts`), aggregated via `src/data/blogs.ts`, and typed strictly via `src/types/blog.types.ts`.

### 4. Mutually Exclusive Catalogue Search & Category Filtering

- **Search vs Category Synchronization**:
  - Searching by text immediately clears any active category parameter from the URL to search across all products.
  - Selecting a category resets the search query and isolates products matching that specific category.
- **Active Category Header Banner (`/catalogue`)**:
  - Selecting any category displays a dedicated header banner with the category's cover image, title, tagline quote, and rich description directly above the product results grid.

### 5. Shopping Cart & Wholesale Checkout Flow

- **Optimistic State Management & Debounced Sync (`useCart`, `cartSlice`, `CartControl`)**:
  - **Redux-Powered Instant UI**: All cart interactions (`addItem`, `updateQuantity`, `increment`, `decrement`, `removeItem`, `clearCart`) update Redux store (`cartSlice`) instantly with 0ms UI lag.
  - **Reusable UI Component (`CartControl`)**: Unified component supporting `variant="card"` (inline stepper/add button on product cards), `variant="detail"` (detail page stepper + add button), and `variant="cart-item"` (cart item card stepper + remove button).
  - **Global Debounced API Queue (500ms)**: Rapid `+` and `-` clicks on any item accumulate net quantity changes in a module-scoped queue and fire a single consolidated background mutation (`POST /api/user/cart/add` or `POST /api/user/cart/remove`) once user pauses clicking for 500ms.
  - **In-Flight Query Cancellation (`AbortSignal`)**: Any user click immediately cancels in-flight `GET /api/user/cart` requests via `queryClient.cancelQueries` and Axios `AbortSignal`, preventing stale server responses from overwriting ongoing optimistic clicks.
  - **Unique Item Count**: Header and mobile navigation badges reflect the count of unique items in the cart (`itemCount`).
  - **Background Server Synchronization**: Server query (`useCartQuery`) automatically synchronizes verified prices and products to Redux when no active debounces are in flight.
- **Checkout (`/checkout`)**:
  - Automatically verifies fresh cart contents on navigation / page mount.
  - Allows verified B2B clients to select from saved delivery addresses or create new Italian delivery addresses via `AddressModal`.
  - **PayPal Dual-Finalization Redirection Flow**:
    - When client clicks **Proceed to PayPal**, the mutation submits the order with `status: 'PAYMENT_PENDING'`.
    - Client is redirected directly to PayPal checkout (`approvalUrl`).
    - The shopping cart is preserved on the server so if the customer abandons or cancels payment, items remain safely in the cart.
    - `useCreateOrder` hook preserves cache without premature query invalidation so the redirect to PayPal happens without redundant cart refetches.
    - Upon returning from PayPal:
      - **Cancellation Return (`?status=cancelled`)**:
        - Checks query parameters on mount.
        - Resets the checkout idempotency key via `resetIdempotencyKey()`.
        - Displays appropriate error toast based on `reason` (`expired`, `capture_failed`, or user cancellation).
        - Silently removes query parameters via `window.history.replaceState({}, '', ROUTES.CHECKOUT)` to avoid scroll jumps, page flickers, or back-button cancellation loops.
        - Preserves customer cart and form inputs for seamless retry.
  - **Dedicated Order Success Page (`/order-success/[id]`)**:
    - Protected route accessible after payment completion (`ROUTES.ORDER_SUCCESS(id)`).
    - Automatically executes on mount:
      - `clearIdempotencyKey()` to reset checkout idempotency state.
      - `clearCart()` to empty client Redux cart and sync with cleared backend cart.
    - Queries order status and details via `useOrderDetailQuery(id)`.
    - Renders celebratory receipt screen via `OrderSuccess` component with public order ID, itemized products, delivery details, and navigation actions ("View All Orders", "Back to Home").
  - **Idempotency Key Lifecycle (`idempotency.ts`)**:
    - Manages key in `sessionStorage` under `shelly_foods_checkout_idempotency_key` via `getOrCreateIdempotencyKey()`.
    - Transmits key via `Idempotency-Key` request header in `orderService.create`.
    - Preserves key during in-flight retries or accidental reloads to prevent duplicate order placement.
    - Resets key on cancellation return (`?status=cancelled`) via `resetIdempotencyKey()`.
    - Clears key upon reaching order confirmation (`clearIdempotencyKey()`).
- **Order Invoicing & Customer Document Access**:
  - B2B customer order history cards (`/orders`) and dedicated order detail view (`/orders/[id]`) include direct "View Invoice" / "Download Invoice" actions powered by the `/api/v1/documents/pdf` streaming endpoint.

### 6. FCM Push Notification Lifecycle

- **Permission & Device Sync (`useFcmLifecycle`)**:
  - Automatically requests browser notification permission, initializes Firebase Messaging, registers `firebase-messaging-sw.js`, and synchronizes device tokens with `/api/v1/user/notification/devices/sync`.
  - Cleans up device tokens on logout or when manually disabled in profile settings.
  - Handles foreground messages with interactive `sonner` toasts and automatic cache invalidation for `["orders"]` and `["notifications"]`.

### 7. Authentication & Onboarding Experience

- **Split-Screen Brand Layout (`AuthLayout`)**:
  - **Desktop (`>= lg`)**: Split grid featuring a deep brand-red showcase panel (`from-[#2a0709] via-[#3d0b0e] to-[#1e0506]`), subtle ambient glow, brand pill, Tata partnership value points, and Cremona distributor attribution.
  - **Mobile (`< lg`)**: Fully responsive layout with `min-h-screen`, `overflow-y-auto`, and fluid padding (`p-4 sm:p-8 lg:p-10`) allowing unconstrained scrolling and safe viewport heights.
- **Card-Based Form Enclosures**:
  - `LoginPage` and `SignupPage` render inside a floating glass-style elevated container (`rounded-2xl sm:rounded-3xl border border-border/80 bg-card/95 shadow-xl`) with the brand logo header, high-contrast typography, and primary color focus cues.
- **Color Palette Discipline**:
  - Single primary brand red (`#cb242c`) focus across badges, checkmark pills, focus rings, buttons, and text highlights, eliminating extraneous secondary accent colors for a cleaner, unified presentation.

### 8. Internationalization & Multi-Language Subsystem (`next-intl`)

- **Dual-Locale Architecture (`en` & `it`)**:
  - Full native support for **English (`en`)** and **Italian (`it`)** serving Italian B2B customers, restaurateurs, and English-speaking wholesale partners.
- **Cookie-Based Seamless State Management (`NEXT_LOCALE`)**:
  - Operates without intrusive URL prefix changes (clean URLs like `/catalogue`, `/about`, `/orders`).
  - The active language choice is persisted for 1 year in `NEXT_LOCALE` (`max-age=31536000; SameSite=Lax`).
  - Read server-side via `cookies()` in `src/i18n/request.ts` to hydrate `<html lang="...">` and server-rendered components with zero flashes or hydration mismatches.
- **Language Switcher Component (`LanguageSwitcher`)**:
  - **Header Trigger Button**: Compact display showing the active flag badge (`🇬🇧` or `🇮🇹`) with an animated chevron arrow.
  - **Dropdown Menu**: Clean popover list showing the country flag, native language name (_English_, _Italiano_), and active checkmark indicator.
  - **Full Website Refresh on Selection**: Triggers `window.location.reload()` upon selecting a new locale to immediately update both server-rendered and client-rendered content.
- **Statically Mapped Dictionaries**:
  - `src/i18n/request.ts` maps `en.json` and `it.json` directly to guarantee reliable resolution across Next.js 16 Turbopack HMR and production builds.

---

## 5. Coding Standards & Conventions

1. **Strict Data Separation**:
   - All static copy, navigational links, corporate stats, and mock arrays reside in `src/data/*.ts`.
   - All TypeScript contracts and schemas reside in `src/types/*.types.ts`.
2. **Comment-Free UI Code**:
   - Component files are clean, readable, and maintained without developer commentary.
3. **Design System & Visual Consistency**:
   - Consistent use of primary red (`#cb242c`), crisp neutrals, rounded corners (`rounded-2xl` / `rounded-3xl`), and subtle micro-interactions across hover and active states.
4. **Mobile Responsiveness**:
   - Full support for compact mobile viewports through flexible min-heights, fluid paddings, and bottom navigation safe areas.
5. **External Links**:
   - All external hyperlinks use `target="_blank"` and `rel="noopener noreferrer"`.
