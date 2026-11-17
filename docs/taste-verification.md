# OrderUp taste home verification

The Arabic and English home routes now render the taste home composition. This work uses the installed design-taste-frontend skill inside the existing Next.js project. It does not use Sites.

## Changes and decisions

- Centered category hero with working rides, services and ticket-preview entries; actual app screens, local imagery, one partnership word-highlight moment, and shared download/menu/footer components.
- Existing palette, bilingual font families, route structure, Arabic default, download destinations, ticket-demo disclosures and support behavior retained. Display headlines use weight 500 on the home route.
- The shared Navbar accepts an optional home class. The shared Footer accepts optional introductory content and a photo credit; sibling callers keep the existing defaults.
- Desktop sections follow a screen rhythm. Tablet layouts stack product stories and use portrait category photographs; phones use compact hero entries and stacked content with natural growth.
- The skill modules are copied unchanged to public/assets/taste. Next.js bundles motion.css; HomeMotion loads the original modules and releases moment listeners on navigation. Reduced motion and module failure keep server-rendered content readable.

The maintained business/design sources take precedence over the skill's generic static-page assumptions. The existing server deployment is required for live support and store redirects. Fonts and palette follow the bilingual OrderUp contract rather than introducing the dealt Host/JetBrains pairing or SaaS palette. Plan: docs/taste-build-plan.md.

## Verification evidence

- Production Next.js build: passed, generating 78 static pages and retaining dynamic routes.
- TypeScript: passed.
- ESLint across app, OrderUp and marketplace components, and domain libraries: passed.
- Existing support/platform/ticketing suites: 32 passed.
- Existing production HTTP verification: 98 page, image, asset and redirect checks passed.
- Strict premium UI audit: zero findings, saved in work/taste-premium-audit.json.
- git diff --check: passed; Windows line-ending notices only.
- Headless Chrome: English desktop and Arabic phone screenshots inspected; responsive layout checker exercised 1440x900, 1024x768, 820x1180, 768x1024 and 390x844. No horizontal overflow was reported at any of those widths. Further final results are recorded below.

The development server experienced a Turbopack HMR panic while source was changing. Production compilation succeeds; final review uses next start. The root hydration warning suppression is limited to the html element, whose classes the skill's pre-hydration entrance script intentionally updates.

## Assets and content integrity

No new factual assumptions, coined brand, prices, ratings, customer counts, testimonials, store URLs, contact addresses or form endpoints were introduced. All ticketing remains fictional and prominently disclosed. Existing canonical-domain and SMTP contracts remain authoritative; there is no new .example stand-in.

Client material: OrderUp logo, home/cleaning/service-discovery app screenshots, home-service image and driver cover. The precise pickup-map screenshot is excluded per DESIGN.md.

Stand-ins: Unsplash concert image in the hero; theatre, football and desert photographs for category discovery. They do not depict affiliated events. Sources: public/events/SOURCES.txt. A footer credit identifies Unsplash. Approved supplier/event photography is needed before a real ticket-sales launch. No empty client-asset slots were introduced.

Voice: the existing direct consumer voice, short English actions and Saudi Arabic register; the product nouns stay consistent. The skill's centred hero and word-highlight were dealt; the teal-on-paper identity and Plus Jakarta Sans/Noto Sans Arabic pairing are retained project contracts. Photography and actual product screens carry the software category; no shader or scene was added.

## Practical limits

Automated checks and screenshots do not establish screen-reader conformance or replace a human review of menu/download-dialog keyboard behavior. Existing application functions are protected by their tests and route checks; this pass does not claim a fresh end-to-end audit of every checkout/account flow. The standalone designmd CLI was not available on PATH; DESIGN.md was reconciled and the strict project audit passed.




## Final result

GATE: PASS. No open failures. Five scoped framework-specific waivers are listed below. The gate reports 19 nonblocking warnings.

| Layout / stress size | Findings | Horizontal overflow |
|---|---:|---|
| 1440x900 | 0 | No |
| 1024x768 | 0 | No |
| 820x1180 | 0 | No |
| 768x1024 | 0 | No |
| 390x844 | 0 | No |

Final English capture: shots/taste/en-1440-final.png, six desktop screens. Final Arabic capture: shots/taste/ar-390-final.png, eight phone screens with section heights 1 / 1 / 2 / 1 / 1 / 2. Section titles now sit below the fixed header. Both captures were inspected.

Performance: 0 FAIL, 8 WARN. Transfer was approximately 733 KiB at desktop and 666 KiB at phone; layout shift was 0.000 in both. Explicit source dimensions are set on every image. Warnings retain the existing client-JS footprint, bilingual font payload and priority logos. Host CPU was busy at the start of the sample, so timing results are advisory; no production timing guarantee is made. Exact rows: work/taste-perf.txt.

Final copy lint: 0 FAIL, 0 WARN. No copy-lint warning was retained.

The earlier full five-width consistency audit passed automated focus visibility/hidden-focus, contrast, reduced motion, hidden content, links, forms and hover-movement checks. It also identified issues that were corrected afterward: image sizing, phone section geometry, footer structure and header clearance. Its raw historical result (43 FAIL / 61 WARN) remains in work/taste-consistency.json; it is not the final verdict. The final gate and five-width layout run assess the corrected production build.

### Scoped waivers

- `motion-layer` — `html[data-motion]`: Next.js bundles the original public/assets/taste/motion/motion.css through the component CSS import. The style is loaded in the production CSS bundle; its URL is hashed rather than motion.css.
- `focus-ring` — `.focus\:outline-hidden:focus`: This is a generated Tailwind focus utility, not an active unstyled control. Radix close controls combine it with focus:ring-2 and focus:ring-offset-2; visible site links and buttons have an explicit focus-visible outline.
- `focus-ring` — `.focus-visible\:outline-hidden:focus-visible`: This is a generated Tailwind focus utility, not an active unstyled control. Radix close controls combine it with focus:ring-2 and focus:ring-offset-2; visible site links and buttons have an explicit focus-visible outline.
- `focus-ring` — `:is(.\*\*\:data-\[slot\=navigation-menu-link\]\:focus\:outline-none *)[data-slot="navigati`: This is a generated Tailwind focus utility, not an active unstyled control. Radix close controls combine it with focus:ring-2 and focus:ring-offset-2; visible site links and buttons have an explicit focus-visible outline.
- `container-edges` — `div.taste-site "Skip to contentTicketsPreviewRidesServic"`: The React home component uses one root div to scope the established OrderUp design and preserve shared provider/dialog integration. It adds no padding or offset; the body-only scaffold requirement does not apply to this existing Next.js layout.

### Retained checker observations

- `scroll-reveal` — `h2#partners-title`: starts "color" (0.2 s) the moment it is scrolled into view (an IntersectionObserver) on span.mo-w:nth-of-type(2) (inside a dealt moment's section, [data-moment]: an enter moment is expected on every kind; its still is judged under reduced motion) **Reason retained:** Expected inside the dealt word-highlight moment. The full audit passed reduced-motion and hidden-content checks.
- `copy-buttons` — `header.market-header.nav > div.market-nav-wrap.wrap > div.market-nav-actions > button.market-menu-button`: "Menu" does not start with a verb (book, buy, try, start, get, see...) **Reason retained:** Menu is the established navigation-control label; its accessible name is localized Open menu.
- `centre-axis` — `div.container.wrap > div.hero-text.taste-hero-composition > div.taste-hero-text > p.taste-label`: centred text 8px right of the middle of its page (728px against 720px) **Reason retained:** The label includes a dot and gap. The complete label composition and hero are centered; the text-only measurement excludes the dot.
- `section-gaps` — `section#home / section#services`: 165px between these sections, -40% against the median 274px of gaps at a change of ground **Reason retained:** Retained differences arise from actual image bounds and the screen rhythm. The separate layout/stress checker passes all five sizes; screenshots were reviewed.
- `section-gaps` — `section#services / section#tickets`: 387px between these sections, +41% against the median 274px of gaps at a change of ground **Reason retained:** Retained differences arise from actual image bounds and the screen rhythm. The separate layout/stress checker passes all five sizes; screenshots were reviewed.
- `photo-set` — `div.taste-destinations.hero__window > a.taste-destination.card:nth-of-type(3) > div.taste-destination-picture > img`: 5 photographs in more than one look: lightness from 0.23 to 0.94; saturation from 0.16 to 0.74; warm and cool photographs mixed (b* -26 to +7); the odd one out is  **Reason retained:** Different marketplace subjects deliberately use different photography. Existing client images and illustrative event stock retain their original colors.
- `photo-credit` — `(the page text)`: 1 library source (unsplash): the page credits unsplash; confirm each shows the client's own product, place or people **Reason retained:** The event images are disclosed stand-ins, credited to Unsplash. They do not claim to depict affiliated events; original source URLs are recorded.
- `nav-family` — `div.taste-site > header.market-header.nav`: the nav's links come in 3 sizes (14, 12, 16px) **Reason retained:** Primary routes, utility controls and the action retain the shared navigation hierarchy.
- `orphan` — `section#services > div.container.wrap > div.taste-copy > p`: its last line holds only "app." **Reason retained:** A short final word remains at this particular width. Text wraps naturally, with no clipping or ellipsis; this is residual typographic polish.
- `photo-repeat` — `div.taste-destinations.hero__window > a.taste-destination.card:nth-of-type(2) > div.taste-destination-picture > img`: the photograph  is shown 9 times on the page: a picture the visitor has already seen **Reason retained:** The optimizer serves distinct source images through the same /_next/image endpoint. Main-page source paths are unique; the shared logo intentionally repeats in navigation and footer.
- `grounds` — `section#services`: 4 flat grounds across the page (#edf6f3 section, #fbfcf9 section, #d7eeeb section, #102f31 section): three at most (the base, a surface, an inverse) **Reason retained:** Four established OrderUp tokens distinguish the base, app story, rides story and partnership band. This retains the project brand contract.
- `share-meta` — `head`: the head lacks og:image, theme-color: a shared link shows no picture or title of its own **Reason retained:** Localized titles/descriptions and the existing canonical-domain contract remain. A new social-share image/theme-color was not added; social preview polish remains a limitation.
- `tap-size` — `div.taste-site > header.market-header.nav > div.market-nav-wrap.wrap > a.market-logo`: a 120x36px tap target: under the 44px a phone needs **Reason retained:** The existing logo link is about 36px tall. Other home action targets were enlarged where needed; the logo target is a retained accessibility refinement.
- `scroll-reveal` — `h2#partners-title`: starts "color" (0.2 s) the moment it is scrolled into view (an IntersectionObserver) on span.mo-w:nth-of-type(1) (inside a dealt moment's section, [data-moment]: an enter moment is expected on every kind; its still is judged under reduced motion) **Reason retained:** Expected inside the dealt word-highlight moment. The full audit passed reduced-motion and hidden-content checks.
- `no-visual` — `section#services`: pictures, effects and mocks cover 18% of this section; a feature section needs a visual (about 25% or more) **Reason retained:** The phone composition keeps the actual full app screenshots visible rather than enlarging them beyond the screen. Their measured coverage is below the checker preference.
- `section-gaps` — `section#tickets / section#rides`: uneven space at the edge of a band: 44px outside its edge, 141px inside it (the space on either side of a change of ground reads as one gap only when the two match) **Reason retained:** Retained differences arise from actual image bounds and the screen rhythm. The separate layout/stress checker passes all five sizes; screenshots were reviewed.
- `photo-set` — `div.taste-event-grid > a.taste-event.card:nth-of-type(2) > div.taste-event-picture > img`: 3 photographs in more than one look: saturation from 0.32 to 0.78; the odd one out is  **Reason retained:** Different marketplace subjects deliberately use different photography. Existing client images and illustrative event stock retain their original colors.
- `nav-family` — `div.taste-site > header.market-header.nav`: the nav's links come in 2 sizes (12, 16px) **Reason retained:** Primary routes, utility controls and the action retain the shared navigation hierarchy.
- `orphan` — `div.taste-footer-directory > div.market-footer-top > div.market-footer-brand > p`: its last line holds only "it." **Reason retained:** A short final word remains at this particular width. Text wraps naturally, with no clipping or ellipsis; this is residual typographic polish.
- `photo-repeat` — `div.taste-event-grid > a.taste-event.card:nth-of-type(2) > div.taste-event-picture > img`: the photograph  is shown 4 times on the page: a picture the visitor has already seen **Reason retained:** The optimizer serves distinct source images through the same /_next/image endpoint. Main-page source paths are unique; the shared logo intentionally repeats in navigation and footer.
- `fold-cut` — `div.container.wrap > div.hero-text.taste-hero-composition > div.taste-destinations.hero__window > a.taste-destination.card:nth-of-type(1)`: the hero's button "Find your ride Your destinatio" is cut by the bottom of the first screen (77px of its 91px below the fold) **Reason retained:** At the narrow/short stress viewport the secondary category entries continue below the fold. The primary download action remains visible and the document scrolls normally.

### Evidence files

work/taste-layout.json; work/taste-final-gate.json; work/taste-gate-consistency.json; work/taste-copy.json; work/taste-perf.txt; work/taste-premium-audit.json; work/marketplace-http.json. Generated browser profiles, work and shots are ignored by Git.
