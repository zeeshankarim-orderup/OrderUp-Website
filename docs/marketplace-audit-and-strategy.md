# OrderUp marketplace audit, research and implementation direction

Reviewed 15 November 2026, before marketplace implementation. Business authority: the user's complete redesign brief supplied in this chat. The existing three mobile applications are outside scope. Ticket inventory, checkout, accounts and issuance are demonstrations, not live commerce.

## Evidence and limitations

Fetched live HTML from https://www.orderup.sa/en/, https://orderup.sa/ar/, and English driver, providers, contact, careers, privacy, terms, captain and public /support routes: all returned 200. Inspected the corresponding local routes, components, CSS, download utilities, support API/security, metadata and dependency configuration. The deployed home already contains the previous screenshot redesign. Findings below distinguish content/source observations from visual evidence. The user-supplied broken-menu screenshot is historical evidence; the local edge-placement fix is present. Browser access is unavailable in this chat, so hover, focus, animation, responsive geometry and signed-in competitor flows have not been visually verified. No screenshots were fabricated. Competitor pages were read through the public web reader; transactions and real accounts were not created.

## Page and section audit

| Area | Finding / why it matters | Decision and improvement |
|---|---|---|
| Brand | Official logo, teal palette, Arabic font and consistent icon family exist. These are recognizable assets; replacing them would weaken continuity. | Retain logo, palette, typography and Lucide. Evolve composition, not identity. |
| Header | Desktop hides the primary categories inside a menu. Visitors cannot immediately distinguish the expanded business. Previous clipping came from centered-dialog transforms. | Redesign with visible Tickets / Rides / Services and a driver link; keep accessible edge-aligned menu for secondary destinations and narrow screens. |
| Home hero | First story is driver recruitment. A ticket supplier sees no ticket capability; customers must infer the broader offering from later slides. | Replace with a marketplace proposition and event photography, explicit demo status, prominent ticket exploration and app action. Retain driver acquisition in navigation and a dedicated section. |
| Service overview | Existing three cards are rides, home services and gifts. The new core categories are not represented. | Replace with ticket-first discovery; retain rides and services as dedicated links and home editorial sections. Gifts no longer competes as a core navigation category. |
| Rides section | Fare suggestions and offers are explained accurately but only as a home anchor. | Retain accurate copy and real screenshot; create /rides with a clear request → compare → choose journey and customer app CTA. |
| Home services | Good real screenshots; limited categories and no dedicated discovery page. | Create /services with cleaning, maintenance, repair, installation, beauty and wellness overview; app owns actual availability and booking. |
| Gifts | Large photographic section occupies space needed for the newly prioritized ticket business. | Remove as a homepage pillar; preserve app functionality and avoid unsupported ticket inventory claims. |
| How it works | Explains only app onboarding. Ticket checkout needs a distinct web journey. | Separate app actions from ticket discovery / selection / demo checkout; avoid a generic process shared across incompatible products. |
| Partner cards | Driver/provider destinations work; no ticket-supplier proposition. | Retain driver/provider pages and add a supplier-facing partnership page describing integration readiness honestly. |
| About | Short homepage blurb describes old categories only. | Add dedicated /about and a concise marketplace description. No invented company statistics or partner logos. |
| FAQ | Four useful questions but no ticket/demo boundaries. | Dedicated /faq with ride, service, demo ticket, account and support answers. |
| Download | Shared QR popup and four official app URLs are reusable. Provider URLs are missing. | Retain shared AppLink; never use customer links for the Partner app. Explain contact path until official Partner URLs are supplied. |
| Footer | Anchor-heavy navigation and no tickets/account links. | Replace with route-based marketplace, account, partnership, support and legal navigation. |
| /driver | Accurate app registration, steps and conditional incentives; established photograph. | Retain the useful detailed page and connect it to new global navigation. Do not promise bonuses or earnings. |
| /providers | Public copy implies onboarding information is not yet available; brief now confirms Partner app exists. | Update to describe listing services, pricing, bookings and earnings in the existing Partner app. Download URLs remain unpublished, which is different from app development status. |
| /support | Public 200, email visible, accessible form, validation, challenge and SMTP boundary exist. | Preserve live support implementation and public route. Extend navigation; do not send test messages or expose environment values. |
| /contact | Minimal support redirect duplicates support introduction and lacks business routing. | Add customer support and supplier/service partnership routes. |
| /careers | Honest no-vacancies notice. | Retain; update company description to current categories. |
| /privacy and /terms | Explicitly say official policy text is missing. This is a credibility and real-launch gap. | Preserve truthful notices and add links to factual demo data behavior. Official legal content is a release prerequisite, not something to invent. |
| /captain | Store redirection with desktop fallback serves campaign sharing, not marketplace navigation. | Preserve compatibility and exact stores; primary website actions remain QR popups. |
| /download | Legacy redirect only. | Preserve redirect compatibility; do not add another redundant download page. |
| Ticket discovery | No catalog, filter state, event routes or category landing exists. | Build localized catalog, URL-backed search, category/city/month/sort filters and no-results recovery. |
| Event → order | No selection, checkout, confirmation or ticket history exists. | Add typed mock catalog, bounded quantities, explicit all-in sample totals, review/checkout, idempotent local demo booking and labeled non-admission ticket views. |
| Accounts | No website customer auth integration; app/chatgpt-auth.ts is an unrelated host helper. | Do not use host headers as customer auth. Provide passwordless sample identity/verification/account journey, visibly demo-only; no real credentials collected. |

## Technical audit and reuse

Next.js App Router 16.3.4, React 19, TypeScript, Tailwind and custom CSS; asynchronous params; locale root layouts; Node SMTP support API; Radix dialogs. No existing Supabase website client or customer-session contract was found. The monolithic info route handles unrelated pages and sets noindex for driver/provider. The sitemap is limited to home, support and Captain. Images globally opt out of Next optimization. Old home/demo/hero CSS overlaps with later styles. The implementation will use dedicated ticket routes and shared marketplace components, preserve support and app-store contracts, optimize new images and correct public marketing metadata. Demo catalog/account/checkout routes stay noindex and do not emit real Event/Offer structured data. New mock data must sit behind a repository boundary, not inside screen components.

## Competitor research: observations versus recommendations

- [Webook homepage](https://webook.com/en) exposes category entry points, dated event cards with locations and starting prices, destination collections and a business CTA. [Jeddah exploration](https://webook.com/en/explore/sa/jed) shows result count, date shortcuts and explicit Load more. Adopt these discovery cues, with SAR fixed for this Saudi demo rather than browser-region currency assumptions.
- [Webook event details](https://webook.com/en/sa/ruh/sports-event/events/zuffa-24-boxing-rs27-tickets) groups venue, schedule, ticket types, admission details and questions around a booking CTA. [Booking entry](https://webook.com/en/sa/ruh/sports-event/events/zuffa-24-boxing-rs27-tickets/book) requires login/sign-up and offers email/Apple/Google. Verified only to the public auth gate; checkout, paid tickets and QR behavior behind it are unverified. Adopt clear event facts and order summary; let visitors inspect OrderUp's demo selection before the sample-account gate.
- [Cobone Jeddah](https://www.cobone.com/en/deals/jeddah?location=jeddah) prioritizes city, search, category and offer comparisons. [Waterpark product](https://www.cobone.com/en/deals/activities-jeddah/1-full-access-cyan-waterpark/217156) exposes inclusions, conditions, variants and quantities; its copy describes vouchers in account/email. The sign-in UI offers email/password or code; register/recovery links were not fetchable. Adopt explicit variant inclusions and price clarity. Avoid the dense promotional navigation and discount/sold-count devices when OrderUp has no real sales evidence. Account voucher appearance and payment completion remain unverified.
- [inDrive Saudi homepage](https://indrive.com/en-sa) separates services, earning, safety and support with prominent app conversion. The supplied screenshots establish its full-bleed photographic hero and spacious menu treatment. [Rider page](https://indrive.com/en-sa/city-rides) explains fare offer and driver comparison as sequential actions; [driver page](https://indrive.com/en-sa/driver) has a separate acquisition journey. Adopt role separation and plain action language. Do not copy its prices, market footprint, safety promises, response guarantees, colors or brand assets.
- [Ticketmaster](https://www.ticketmaster.com/) provides an additional current reference for category-led discovery plus location/date/event search. This supports a task-first search strip instead of a purely promotional hero. No claim of universal design trends or conversion uplift is made from this small sample.

## Established design direction

North star: a Saudi city guide that lets someone plan their day—discover an event, get there, and take care of everyday needs. Ticketing leads without obscuring live app services. Signature: a panoramic event image paired with a detached, perforated ticket-facts panel. This makes the interface specific to ticket discovery instead of another slideshow or SaaS feature grid.

Palette retains deep teal #102f31, OrderUp #1e9695, light mint #d7eeeb, near-white #fbfcf9; adds a restrained amber #f3c969 for clearly labeled demonstration notices. Jakarta 800 is the display voice, Jakarta 400/600 the body/utility voice; Noto Sans Arabic uses looser line height and no negative tracking. Display drama is concentrated in imagery, not decorative widgets.

Desktop: visible main nav, 1240px grid, 3-column event cards, 2-column details/selection, sticky summary only when viewport permits. Mobile: two-row compact header, usable category links, single-column events/details, naturally scrolling forms and summary. Avoid hover-only actions, auto-rotation, fake urgency or sold-out countdowns.

Routes: /{locale}/; /tickets (discovery), /events (alias), /tickets/{slug}; /checkout; /account, /my-tickets (alias), /account/tickets/{id}; /login, /register, /verify, /forgot-password, /reset-password (passwordless recovery explanation); /rides, /services, /about, /faq, /partnerships; retain driver/providers/support/contact/careers/legal/captain/download. Entertainment/sports/attractions use catalog query state and friendly route aliases.

Demo journey: search/filter → event → select categories/quantities → review → sample identity and on-screen verification code → return to preserved checkout → acknowledge demonstration → create local booking → confirmation → ticket detail / history. Demo sample data persists in this browser tab only and can be cleared. No card input, payment capture, real email verification, real ticket issuance or admission credential. QR-style demonstration is visibly void.

## Supabase and future suppliers

Supabase is a reasonable future fit because the mobile products already use it, but sharing identities/schema requires the actual app team's contracts. Do not create tables or modify their project now. Use server-side session validation with the official [SSR integration](https://supabase.com/docs/guides/auth/server-side/creating-a-client) and owner-scoped [row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security). Never ship a service-role credential to the browser.

Keep catalog/provider IDs, external event and category IDs, currency, integer minor-unit prices, sample availability and booking lines typed. Future provider adapters belong on the server: normalize inventory, validate/reprice, reserve, capture payment, issue, reconcile and handle signed webhooks/idempotency. A UI mock is not a reservation/payment contract. Real launch additionally needs supplier contracts, official legal terms, approved fees/refunds/tax semantics, secure auth, payment operations and operational testing. No invented API is included.

## Verification plan

Unit-test bilingual search, combined filters, price arithmetic, quantities, invalid IDs, booking duplication, corrupt storage and sample auth transitions. Lint, TypeScript, production build and HTTP route/assets/redirect checks. Test responsive interaction, keyboard, modal focus, RTL and ticket journey in browser when access is available. Report the browser gap explicitly, rather than equating source checks with visual QA.
