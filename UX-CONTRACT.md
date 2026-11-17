# OrderUp marketplace UX contract

Business authority: user brief, summarized with evidence in [audit and strategy](docs/marketplace-audit-and-strategy.md). Saudi customers and prospective business partners; Arabic default, English alternative, Gregorian dates in Asia/Riyadh, SAR. Target WCAG 2.2 AA. Marketing and ticket-demo product routes share DESIGN.md.

## Canonical UI Map

| Capability | Owner | Contract | Verification |
|---|---|---|---|
| Navigation | components/orderup/navigation.tsx | visible core routes; Radix edge menu; preserve path/query on locale switch | route checks; browser pending |
| Home carousel | components/marketplace/hero-carousel.tsx | labeled scene choices, previous and next buttons, RTL-aware arrows and swipe, shareable hashes, live scene announcement, reduced motion | scene captures and source review |
| Ride guide | components/marketplace/ride-guide.tsx | explain the ride steps and hand off to the customer app | route checks and source review |
| Select/Listbox | native select inside marketplace filters | platform popup is intentionally OS-owned; localized labels/options | unit filtering; browser pending |
| Date | month preset select + Intl.DateTimeFormat | no authored calendar; timezone Asia/Riyadh; Gregorian | formatting/unit |
| Form | marketplace/form.tsx Field + validation helpers | noValidate, associated errors, focus first invalid, preserve input | validation tests |
| Scrollbar | app/globals.css | inherited visible theme, forced-colors fallback | static review |
| Status | marketplace/ui.tsx Status / DemoNotice | inline persistent live-region feedback; never toast-only errors | source + route checks |
| Dialog | components/ui/dialog.tsx | Radix focus, Escape, close; centered download and edge menu | browser pending |
| Catalog | lib/ticketing/catalog.ts | query/city/category/month/sort in URL; resettable; 6 then Load more | unit |
| Demo account/booking | lib/ticketing/demo.ts + marketplace/demo-provider.tsx | sessionStorage adapter; no real auth, payment or email; idempotent checkout | unit |

## Product boundaries and lifecycle

- All catalog/detail/checkout/account screens visibly say demonstration. Fictional events, prices, venues, inventory and booking references; no entry entitlement. Images are illustrative stock. No real sports clubs/artists/organizers are impersonated.
- Auth is passwordless simulation: sample display name/email, visible fixed demo code, expiry, sign out and profile settings. No real password is requested or stored, no verification email sent. Recovery routes explain passwordless demo access. Do not call this secure authentication.
- Session data is tab-local, survives reload, separate from app infrastructure. Storage failures are visible and do not falsely confirm persistence. Corrupt/version-incompatible data gets a recoverable reset. Profile data must use sample information. Clearing requires a Radix confirmation and only removes demo data.
- Prices are integer halalas, totals derive from the catalog. Sample totals are all-in illustrative values with zero added fee; no real tax invoice or supplier availability claim. Quantity is 0–6 per type, maximum 6 per booking; unavailable type disabled. Continue needs at least one ticket. Invalid/expired selection gets a correction path.
- Checkout requires sample session and explicit acknowledgement. Busy disables duplicates; an idempotency token maps repeated submit to the same booking. Persist before success, retain selection if save fails. Confirmation links to order detail and history. Demo ticket graphic must display VOID / not valid for entry in both languages.
- No Supabase or provider mutations. Privacy/legal text must come from the business; retain missing-policy notices. Support email and server SMTP flow remain live and separate.

## Flow ledger

Search applies URL state, resets visible count, announces count; Clear restores all filters and focus. Event back link preserves catalog query. Quantity selection has native radio/number/button semantics and text limit feedback. Checkout sign-in retains event/quantity query via a same-locale safe return path (no external redirects). Profile Save stays on profile with inline status. Logout returns to login; history is inaccessible in the UI until sample sign-in. Ticket not found shows recovery links, not a blank screen. Demo reset clears only the namespace and returns to a fresh sample session state.

## Resilience and responsive rules

Full-platform redesign: app/platform.css is the canonical shared geometry/type layer. Marketing motion is mounted by components/orderup/site-motion.tsx; product filters/forms/account state retain the existing owners above. The header is 80px desktop / 112px phone. The footer has marketing and compact product variants. Native filter/profile selects remain intentionally OS-owned.

Dialog layers are business-named variants on the existing DialogContent owner: navigation 100, default 500, download 600, confirmation 700; each overlay is ten levels below its own content. This keeps a profile unsaved-change/reset confirmation above an open menu, and QR downloads above navigation. Focus, Escape and restoration remain Radix/AppLink responsibilities. Layering changes neither authorization nor data transitions.

No remote search races (small local catalog); initial storage hydration displays a stable loading status. No unbounded spinner. URL params/storage are validated. There are no actual payment/network mutations in ticket demo; storage errors retain inputs and explain retry. Existing support network/error states remain canonical for live contact. Desktop sticky order card becomes normal flow on mobile. Buttons minimum 44px; focus visible; links and images have meaningful localized names; no clipped important details. Locale switch preserves route/query/hash. Document titles and noindex on demo/private pages. Route errors and not-found pages provide a path back. Browser visual and keyboard validation still required before claiming accessibility conformance.
