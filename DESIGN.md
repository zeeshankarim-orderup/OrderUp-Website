---
version: alpha
name: OrderUp
description: A bilingual Saudi mobility and everyday-services brand, welcoming riders and recruiting drivers.
colors:
  primary: "#1e9695"
  primary-dark: "#146e6d"
  primary-light: "#d7eeeb"
  primary-soft: "#edf6f3"
  background: "#fbfcf9"
  text: "#102e31"
  muted: "#647575"
  border: "#dfe8e5"
  dark: "#102f31"
  surface: "#ffffff"
typography:
  sans:
    fontFamily: "Plus Jakarta Sans, sans-serif"
  arabic:
    fontFamily: "Noto Sans Arabic, sans-serif"
rounded:
  DEFAULT: "10px"
  lg: "28px"
spacing:
  section-gap: "56px"
components:
  button: {}
  navigation: {}
  store-links: {}
---

# OrderUp design context

## Audience and register
Marketing website for Saudi customers and prospective drivers; public rollout prioritizes driver registration. Arabic is the default, with complete English pages. Phone visitors arrive from shared links; desktop visitors need explicit store choices. User-provided store URLs and existing product copy are the business evidence. No earnings guarantees or invented launch offers.

## Creative direction
Lead with the road: a full-width photographic hero, large white type and a mint-highlighted headline. The user's inDrive screenshots inform the overlay header, manual story selectors and expansive tabbed navigation. Use OrderUp teal, the untouched official logo and existing OrderUp images. The first story prioritizes driver registration; the other stories cover customer services and gifts. Do not introduce unsupported inDrive business categories or claims.

## Runtime ownership and typography
`app/globals.css` is the canonical palette and shared-control source. This file mirrors its tokens. `app/launch.css` consumes those variables for the home hero. `app/[locale]/layout.tsx` supplies Jakarta for English and Noto Sans Arabic for Arabic. Headlines use weight 800; Arabic has no negative tracking and more line height. Existing UI icons use Lucide.

## Layout and components
The home hero uses an edge-to-edge image with a directional dark overlay, reserved headline geometry, a mint primary action and manual story tabs. On phones actions stack and the backdrop darkens to protect text contrast. The header overlays the hero and becomes solid when scrolled. All screen sizes use a visible Menu control. Its top-anchored Radix dialog contains keyboard-accessible category tabs, a large decorative service symbol and large destination links. On phones the category row scrolls and the symbol is omitted to prioritize links. `app/navigation.css` owns this shared navigation; `app/launch.css` owns hero composition and home-section polish. Original logo proportions are preserved.

## Behavior and accessibility
All website download actions use AppLink and the shared DownloadProvider to open a Radix dialog in place. Customer and Captain have distinct QR assets and store links. The dialog offers direct store anchors, Escape/backdrop/close behavior and focus restoration. Mobile navigation closes before opening it. The QR codes encode production /get-app/customer/ and /get-app/driver/ routes; recognized Android/iOS scanners redirect to approved stores, unknown platforms open the same dialog on the home page. Legacy download pages redirect home with the appropriate dialog. AppLink retains its href for no-JavaScript fallback and modified-click navigation. Popup CSS owns its responsive bounds and dialog layer; the shared Radix primitive owns focus trapping and background isolation. Provider links remain unpublished because none were supplied. No new analytics vendor or data collection.

Links use semantic anchors, visible focus, hover and pressed states. The hero has no motion or hover-only content. Support and other routes retain existing behavior. Global scrollbars remain operable, with theme and forced-colors handling in `app/globals.css`. Arabic layout uses logical positioning.

## Verification
Run ESLint, production build/typecheck, platform destination tests, and HTTP route checks. Browser verification must be reported separately from user-agent unit tests; physical devices are not available in this workspace.

## Page and screenshot review
`app/redesign.css` implements the shared editorial section rhythm: 96px desktop sections, 64px mobile, 22–28px media corners, 56px primary controls, two-column stories stacking below 800px. Homepage repetition has been consolidated into services, rides, home help, gifts, onboarding, partnerships, about, FAQ and downloads. Driver and provider pages use distinct joining content with shared photo, benefit, step and FAQ patterns. Support keeps the functional form with a quieter two-column layout. Contact, careers, privacy and terms share navigation, readable content width and a notice panel; legal text remains pending official content.

Supplied iOS screenshots are copied unchanged to `public/screenshots/ios`: home (2.jpeg), service discovery (WhatsApp screenshot), and cleaning list (6.jpeg). They illustrate customer experiences only; no customer screen is presented as Captain. The account/profile, driver-offer and precise pickup/destination screenshots were not included. Screenshots are illustrative; current price and availability remain in the app.

The mega menu uses `DialogContent placement="edge"`. Centered dialog utilities, including negative translations, are excluded at the component level so they cannot shift the panel off-screen. QR dialogs keep the centered variant. Menu and QR dialogs retain Radix focus, Escape and background isolation behavior.
