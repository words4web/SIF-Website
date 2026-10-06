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
│   │   │   ├── cart/                 # Cart overview with quantity controls & scrollable item list
│   │   │   ├── catalogue/            # Category filtering & product search catalogue
│   │   │   ├── checkout/             # Delivery selection & Order summary checkout flow
│   │   │   ├── faq/                  # Interactive FAQ page (search, category tabs, accordions, support CTA)
│   │   │   ├── notifications/        # Client notification inbox with read/unread states
│   │   │   ├── orders/               # Client past order history (Segmented control: In Process / Delivered)
│   │   │   ├── products/[slug]/      # Single product details page (multi-image gallery, specs, related items)
│   │   │   ├── profile/              # Business client profile, delivery addresses & NotificationToggle
│   │   │   └── page.tsx              # Home landing page (Hero, Brands, Quality, Features, Categories, Products, Trust, Testimonials)
│   │   ├── globals.css               # Global Tailwind variables, tokens, mobile safe offsets & animations
│   │   └── layout.tsx                # Root layout configuring QueryClient, Toaster, Redux, & Providers
│   │
│   ├── components/                   # React Components
│   │   ├── common/                   # Shared views (ErrorView, Loader, NotificationListener, ProductImage, ConfirmModal, AddressModal)
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
│   │   │   ├── order-detail-modal.tsx# Modal for full order itemization, tax breakdown & status
│   │   │   ├── order-items-list.tsx  # Itemized list component for orders
│   │   │   ├── order-payment-summary.tsx # Subtotal, VAT, and total breakdown
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
│   │   ├── about.ts                  # About Us stats, story copy, values, and Cremona contact details
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
│   ├── lib/                          # Core Libraries & Redux Store
│   │   ├── axiosInstance.ts          # Axios client with JWT refresh interceptor
│   │   ├── firebase.ts               # Firebase client initialization & messaging instance
│   │   ├── format.ts                 # Currency and number formatters
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
│       ├── brand.types.ts            # BrandItem & DistributedBrand interfaces
│       ├── cart.types.ts             # CartItem, CartResponse schemas
│       ├── category/                 # CategoryItem definitions
│       ├── common.types.ts           # ApiResponse, Pagination types
│       ├── corporate.types.ts        # Heritage stats, certification card interfaces
│       ├── faq.types.ts              # FAQItem, FAQCategory interfaces
│       ├── footer.types.ts           # FooterLink, FooterSocialLink, FooterData interfaces
│       ├── notification.types.ts     # NotificationItem, SyncDevicePayload schemas
│       ├── order.types.ts            # Order, OrderItem, OrderSummary schemas
│       ├── product/                  # Product, ProductDetail, RelatedProductItem schemas
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

### 4. Mutually Exclusive Catalogue Search & Category Filtering

- **Search vs Category Synchronization**:
  - Searching by text immediately clears any active category parameter from the URL to search across all products.
  - Selecting a category resets the search query and isolates products matching that specific category.
- **Active Category Header Banner (`/catalogue`)**:
  - Selecting any category displays a dedicated header banner with the category's cover image, title, tagline quote, and rich description directly above the product results grid.

### 5. Shopping Cart & Wholesale Checkout Flow

- **Cart Management (`useCart`, `useCartQuery`)**:
  - Cart data is cached globally across general views (Catalogue, Header, Home) to prevent redundant network requests.
  - Both `/cart` (`CartPage`) and `/checkout` (`CheckoutPage`) trigger explicit `refetch()` on mount to guarantee fresh, verified prices, availability, and totals before placing an order.
  - Exposes `refetch` for explicit synchronization.
  - Automatic quantity adjustments, optimistic updates, and server-side recalculation of subtotal and VAT.
- **Checkout (`/checkout`)**:
  - Automatically verifies fresh cart contents on navigation / page mount.
  - Allows verified B2B clients to select from saved delivery addresses or create new Italian delivery addresses via `AddressModal`.
- **Order Invoicing & Customer Document Access**:
  - B2B customer order history cards (`/orders`) and detail modal (`OrderDetailModal`) include direct "View Invoice" / "Download Invoice" actions powered by the `/api/v1/documents/pdf` streaming endpoint.

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
