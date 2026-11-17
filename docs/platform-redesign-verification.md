# Whole-platform redesign verification

**GATE: PASS** on round three. No open gate failures. The gate covers the English home at 1440 and 390 pixels plus a narrow overflow and tap-target walk. The separate tablet layout findings are recorded below.

17 November 2026. Local implementation.

## Scope and direction

Home, shared header/menu/footer, rides, services, event catalog/detail/selection, checkout, demo identity/account/history/admission states, partner onboarding, support, FAQ/contact/about/partnerships, legal/information pages, app handoff and download dialogs now use the same platform system. Existing canonical state/validation/catalog/support handlers remain in place. See DESIGN.md and UX-CONTRACT.md.

Research references: [inDrive](https://indrive.com/), [Uber Saudi Arabia](https://www.uber.com/sa/en/), [webook](https://webook.com/en), [Careem](https://www.careem.com/en-ae/) and [Ticketmaster](https://www.ticketmaster.com/). Patterns informed the category directory, app handoff, separate driver path, destination discovery and date/price-led catalog. No competitor code, branding, copy, inventory or claims were imported.

Dealt direction: software/consumer marketplace, triptych hero, Outfit, original letters-assemble and iris-opens moments. OrderUp's supplied teal identity overrides the unrelated dealt palette; Noto Sans Arabic preserves Arabic shaping. Arabic's statement uses word-highlight instead of assembling joined letters. No shader was added: photography and actual app screens carry the consumer service proposition. No third decorative font was added to the bilingual family budget.

Voice: short, direct, Saudi everyday language; name the task, explain the app handoff, distinguish the ticketing demonstration. Read-through in both locales retained the established business boundaries. No invented ratings, customer counts, guarantees, supplier affiliations or real ticket availability.

## Automated checks

- Production build passed, including TypeScript and 80 prerendered pages.
- Standalone TypeScript and scoped ESLint passed.
- 32 domain tests passed: normalized bilingual catalog/search/filtering, integer totals, quantity validation, safe return URLs, session/storage recovery, verification limits, booking idempotency, Captain routing and support validation/security.
- 102 production HTTP checks passed: localized pages, assets, optimized images, app redirects, Arabic default and demo sitemap exclusion.
- Strict premium UI audit: zero findings.

## Browser review

Reviewed the home layout in English and Arabic, the event catalog and detail page, rides, services, sign-in, checkout, support and driver onboarding. Captures are in `shots/` and `shots/platform-final-layout/`. Responsive layout checks cover 1440, 1024, 820, 768 and 390 pixels. The English home consistency run also covered 320 pixels and passed the reduced-motion and scripts-off visibility checks. An Arabic reduced-motion capture is in `shots/platform-ar-final.png`.

The intermediate consistency run reported strict section-height and column-alignment findings on the home page. The following pass adjusted the tablet card grid and header, footer spacing, notice alignment, narrow sections and hero columns. The final layout checker returned zero findings at 1440 and 390 pixels, and four at intermediate widths. At 1024 pixels it flagged the hero image for ending before the right edge, which is occupied by the action panel. At 820 pixels it flagged the event and partnership sections as sparse. At 768 pixels it flagged the partnership section as sparse. The first screens were reviewed visually at all five widths. The scroll effects use original modules, with a painted iris edge that preserves a stable box during scroll and plain content when motion is reduced.

The final design gate uses five documented waivers. One preserves the fictional price labels alongside the ticketing notice. One covers the production CSS bundle path for the loaded motion styles. Three cover generated Tailwind outline utilities. Active controls retain explicit focus outlines or rings. The gate logged 18 nonblocking warnings, including the iris before it opens, the animated lettering during scroll, and sensitive composition and copy heuristics. See `work/platform-gate-3.txt` for the exact waiver selectors and `.taste-skill/gate/consistency/report.json` for warning details.

The homepage performance audit finished with zero failures. Median measured layout shift was 0.000 at 1440 and 390 pixels across three runs each. There were no broken network requests. The desktop transferred about 831 KiB total, of which 223 KiB was imagery. The phone transferred about 789 KiB total, of which 182 KiB was imagery. Warnings cover request count, parsed JavaScript, font bytes, the eagerly loaded wordmark and large source images for the portrait crops. This is a local headless measurement.

## Assets and facts

Existing supplied driver/technician imagery and unmodified customer home/services app screenshots remain in their relevant slots. Precise pickup/profile screenshots are excluded. Existing Unsplash event photographs are illustrative stand-ins, not actual event, venue or supplier photography; sources are in public/events/SOURCES.txt. All nine event names, dates, venues and prices are fictional inventory, with persistent disclosures and VOID admission graphics.

Jeddah uses Sammy Six's Jeddah Corniche photograph under CC BY 2.0; Riyadh uses B.alotaby's skyline under CC BY-SA 4.0. Resized copies keep the source/license metadata in public/assets/img/credits.json, and both locales expose /credits/ with author, original and license links. The AlUla landscape is the existing illustrative stock frame. Photography does not imply a supplier or event affiliation. Client-owned event photography and live inventory are still required for real sales.

Saudi Arabia, Jeddah, the existing ride-offer model and support contact come from established project content. No new coined brand or business metric was introduced. Existing sample identity details use demo@example.com and a displayed demo code; they are not secure authentication and send no email. Configure SITE_URL for the approved production canonical domain; the local fallback remains localhost. Official policies and Partner store URLs are still missing and remain honestly identified.

## Limits

No real payment, authentication, supplier integration, ticket issuance or mobile app changes were added. No support email was submitted during verification. The support screen showed its existing unavailable-state fallback in the local production capture; real SMTP/challenge operation needs configured environment values. Screenshots and automated checks do not establish screen-reader conformance or complete browser/device coverage. Manual keyboard, nested-dialog interaction, signed-in profile/history/printing and a full click-through booking journey remain release review items.

The task preview uses port 3020 and is stopped at completion so it does not reserve development port 3000.
