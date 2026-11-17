---
version: alpha
name: OrderUp
description: A bilingual Saudi marketplace for rides, local services and a clearly disclosed ticketing demonstration.
colors:
  primary: "#1e9695"
  primary-dark: "#146e6d"
  primary-light: "#cfe8e3"
  primary-soft: "#eaf4f1"
  background: "#f6f8f7"
  text: "#103235"
  muted: "#53686a"
  border: "#dce6e3"
  dark: "#0b2d30"
  surface: "#ffffff"
  demo-surface: "#fff4d9"
  demo-border: "#e3c87e"
  demo-ink: "#674d12"
  danger: "#a12832"
typography:
  sans:
    fontFamily: "Outfit, sans-serif"
  arabic:
    fontFamily: "Noto Sans Arabic, sans-serif"
rounded:
  DEFAULT: "10px"
  lg: "24px"
  market: "20px"
spacing:
  section-gap: "96px"
components:
  button:
    height: "52px"
    backgroundColor: "{colors.dark}"
    textColor: "{colors.surface}"
  navigation:
    height: "80px"
    textColor: "{colors.text}"
  store-links:
    textColor: "{colors.primary-dark}"
---

# OrderUp design context

## Overview

The current user request is a full website redesign informed by inDrive, Uber, webook and other ride/ticket platforms, with modern motion and scroll animation. All route groups now share an OrderUp platform design: editorial photography, Outfit type, teal paper surfaces, a clear category directory and restrained product forms. The home signature is a full-bleed photographic carousel that changes the headline and next action for rides, services and events. The version in app/voyage.css uses night teal, mint, and warm paper with content-led sections and product imagery.

Audience: Saudi customers and prospective drivers, service providers and ticketing suppliers. Arabic is the default and English is fully supported. This is a hybrid: marketing pages may be expressive; ticket discovery/checkout/account forms prioritize task clarity. Brand references inform composition and interaction, not branding, copy, inventory or business claims. Research and route scope: docs/platform-redesign-plan.md. Preserved behavior: UX-CONTRACT.md.

## Colors

Model B: app/globals.css owns the palette and scrollbar tokens. Frontmatter mirrors the canonical CSS variables by name. app/platform.css consumes them and owns the shared UI geometry, type roles, hover/focus behavior and responsive compositions. Teal and the official logo remain; surfaces and ink are refined for the new system. Semantic amber identifies fictional ticketing, and danger retains its semantic meaning.

Neutral paper, white, pale teal and dark teal alternate by subject. Photography supplies most additional color. Never borrow competitor accent colors, logos, images or trust marks. No invented ratings, counts, discounts or availability.

## Typography

Outfit 400 for display/body and 500 for controls and emphasis; Noto Sans Arabic for Arabic. The existing --font-jakarta CSS variable is deliberately retained as an adapter to the new Outfit next/font instance, avoiding a second font owner. Both are configured in app/[locale]/layout.tsx. The skill dealt Outfit; its Latin-only mono companion is omitted to keep the bilingual family budget small.

English headlines use a short measure and approximately -0.04em tracking; Arabic has zero negative tracking and about 1.4–1.5 headline line-height. Arabic never uses per-letter splitting, which would break joined glyphs. Text and localized event labels wrap without ellipsis. Dates/prices remain Intl-formatted, SAR and Asia/Riyadh, Gregorian calendar.

## Layout

Container: 1280px maximum; 48px side margins on ordinary desktop widths and 24px on phones. Shared header: fixed opaque white, 80px desktop and 112px on phones with core routes on a second row. Global body reserves its height. Full marketing heroes intentionally return to the top viewport and include their own header clearance; product pages start below it.

The home hero fills the opening screen and places the controls over an image-backed stage. Native content height drives subsequent sections so the ride guide, service links, event finder and FAQ do not create empty scroll bands. The phone stacks text and imagery where needed. Rides and services explain the ordering steps and direct people to the customer app. Product flows use document scrolling; order/selection panels are sticky on wide screens and normal flow below 800px.

## Elevation & Depth

Resting surfaces are flat with a subtle border. Hovered event/linked cards lift 2px with a small soft shadow; photographs zoom 1.03 inside their frame. Order/forms may use a faint shadow to distinguish a work surface. The menu and dialogs have the strongest elevation and bounded scrolling.

## Shapes

10px controls, 16px photo frames, 20px event/form cards, 24px major dialogs/containers. Real app screens retain a dark device-like border without altering screenshot content. Controls normally have 44px minimum targets; primary actions are 52px. Status, progress, price and booking identity never rely on color alone.

## Components

- components/orderup/navigation.tsx owns the global header and Radix edge menu, including localized accessible names, current route and locale path/query/hash retention.
- components/orderup/footer.tsx owns a marketing close/directory and a compact booking/account variant. /{locale}/credits/ owns photograph attribution and license links.
- components/marketplace/platform-home.tsx is the active home; landing.tsx exports it. Previous home files remain compatibility source and are not rendered.
- components/marketplace/hero-carousel.tsx owns the three hero experiences, short shareable hashes, touch swipes and keyboard controls. The initial rides scene is server-rendered. components/marketplace/ride-guide.tsx owns the explanatory ride-step controls.
- components/marketplace/customer-journey.tsx owns Rides and Services. marketing.tsx owns About, FAQ, Partnerships and Contact. app/voyage.css extends app/platform.css for the new treatments and shared surfaces.
- components/marketplace/catalog-intro.tsx owns the catalog feature composition; Catalog keeps URL filters, native selects, clear/search, sort and bounded Load more.
- components/marketplace/ui.tsx owns EventCard, SectionHeading, DemoNotice, Status, EmptyState and Breadcrumb; poster dimensions are presentation metadata.
- Existing field validation, demo state, ticket selection, profile guard, checkout idempotency and server support endpoints retain their owners in UX-CONTRACT.md.
- DownloadProvider/AppLink remain the only customer/Captain download-dialog owner; approved store URLs and QR redirects remain unchanged. Focus restoration recognizes the new menu class. Partner app URLs remain unpublished.

## Iconography

Lucide icons are interface glyphs, not fabricated product logos. The official OrderUp logo and real app screenshots remain unchanged. Store names are literal; no imitation of Apple/Google/inDrive/Uber/webook marks.

## Motion

components/orderup/site-motion.tsx mounts the installed skill's original modules after route transitions and releases moment listeners on unmount. Every marketing hero enters once on load; linked controls answer hover/press/focus. Scroll animation is confined to designated moments: iris-opens for the dark app/services transition and selected marketing story sections; letters-assemble for the short English partnership statement. Arabic uses word-highlight for that statement, preserving joined glyphs.

The carousel changes scenes when visitors choose a category, use arrow or Home/End keys in the carousel controls, or swipe horizontally. It stays on the selected scene without autoplay. Reduced motion changes scenes instantly and shows the still version of the scroll moments. Phone users get the lighter motion variants. Product forms/catalog/account prioritize stable layout and feedback over scroll effects. A module failure leaves the original server-rendered content readable.

## Do's and Don'ts

Ticket inventory, prices, venues, quantities, account verification and bookings remain fictional demonstrations. Keep persistent notices, noindex demo routes, zero real payment and VOID admission graphics. No fake suppliers, secure-auth claims, real card fields or app-account linkage. Preserve live support SMTP behavior and missing official legal-policy notices.

Supplied customer screenshots are unmodified: home, services and cleaning in public/screenshots/ios. Precise pickup/profile screens remain excluded. Event photos are illustrative stock with sources in public/events/SOURCES.txt. Geographic Jeddah/Riyadh photographs are licensed Wikimedia stand-ins, attributed at /credits/; they do not imply venue/event affiliations. Original source/author/license metadata remains with public/assets/img/credits.json.

## Verification

Use task preview port 3020 and close the task-owned server on completion so npm run dev retains port 3000. Run lint, TypeScript/build, domain tests, production routes/assets/redirects, strict UI audit, headless route captures in both locales, layout checks, reduced-motion and the taste gate. Record actual results and gaps in docs/platform-redesign-verification.md. Screenshots and automated focus checks do not establish screen-reader conformance.

## Reconcile drift

| Previous contract | New evidence | Resolution |
|---|---|---|
| Home-only centred hero; other routes on older styles | User explicitly requests the whole website | Photo-led carousel, customer journey sections and shared platform styles across route groups. |
| Plus Jakarta Sans / Noto Sans Arabic | New redesign and dealt Outfit pairing | Outfit replaces the Latin font through the retained CSS adapter; Arabic remains Noto. |
| Multiple header/footer styles and small utility text | Reference platforms emphasize consistent service navigation | One shared 80/112px header, menu, close/directory and compact product footer. |
| Word-highlight only on home | User asks for stronger scroll animation | Two designated original skill moments; Arabic uses a joining-safe text variant; product forms stay stable. |
| Generic coast/theatre imagery labeled as destinations | Region-specific discovery | Actual licensed Jeddah/Riyadh photos and a localized attribution page. |
