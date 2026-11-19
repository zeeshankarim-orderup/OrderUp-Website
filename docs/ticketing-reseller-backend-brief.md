# OrderUp ticket reseller backend implementation brief

Prepared 18 November 2026 from the current website source and the business-supplied technical checklist.

## Objective and business context

Add a ticketing reseller module to our existing OrderUp backend. The business states that it holds a government license to sell tickets online. Supplier API access, documentation, sandbox credentials and commercial terms are pending. We need a working, persistent demonstration for supplier evaluation and an integration boundary that can later be connected to the supplier.

Reuse our existing signup, login, OTP verification, users, sessions, permissions, notifications and payment infrastructure where relevant. Inspect their actual implementations before extending them. The website's fixed-code identity simulation must eventually be replaced by these existing authentication endpoints. Do not create a second authentication system or migrate users to Supabase Auth simply because Supabase stores ticketing records.

Use the existing backend stack and Supabase PostgreSQL for OrderUp records. Keep supplier and privileged database credentials on trusted servers. Customer ticketing requests enter our backend. The backend reads local records or calls the supplier adapter as required. Supplier events enter authenticated webhook endpoints.

Deliver implemented demo functionality and an evidence-based readiness report. Implementing an interface or stub does not establish a live integration or compliance capability.

## What the current frontend actually supports

- Arabic and English catalog and event details.
- Search by event/city text, category and city filters, month filter, date/price sorting, result count and Load more in batches of six.
- Nine fictional events, SAR amounts in integer minor units, Gregorian dates rendered in Asia/Riyadh.
- Standard/premium tiers and an unavailable tier, with quantity controls and a current maximum of six tickets per order.
- Checkout review, demo acknowledgement, simulated account verification, order confirmation, ticket history and profile settings.
- A printable sample ticket with a decorative VOID graphic.
- Homepage event search and city discovery links.

The current catalog is hardcoded in lib/ticketing/catalog.ts. Selection and checkout calculate in the browser. Profiles and bookings use sessionStorage through DemoProvider. The existing frontend does not have country filtering, a date-range picker, independent session selection, reservation countdowns, refund request UI, an admin ticket dashboard or a gate-scanner application. The backend should support the specified additions and document the frontend wiring required for them.

## Architecture and data ownership

Implement a normalized SupplierAdapter contract with a functional SeedSupplierAdapter for the demonstration. Seed data enters through a repeatable development/demo seed command. Ordinary administrators do not create supplier events or edit supplier prices, schedules, rules or inventory.

Define adapter capabilities for catalog synchronization, sessions, ticket options, availability, quotes, hold creation/release, booking submission, booking lookup, ticket retrieval, cancellation and refunds. Unsupported capabilities return an explicit structured result. Add a real supplier implementation only when its documentation is available.

The future supplier is authoritative for inventory, holds, supplier prices, booking confirmation and admission credentials. Supabase stores catalog snapshots, storefront settings and OrderUp customer/operational records. Cached inventory includes its freshness timestamp. A local quantity never establishes live supplier availability.

Orders, reservations, quotes, tickets, refunds and external-operation records have immutable integration-mode and supplier associations. A server-controlled mode selects the adapter. Requests cannot switch a live operation into demo mode. Use separate demo/live environments where practical, and enforce isolation in all unique keys, queries and metrics. Demo credentials cannot authorize live admission or payments.

Supplier documents and QR credentials must be delivered as supplied and authorized. An OrderUp-signed demo credential may demonstrate validation, but it must remain explicitly invalid for real venue admission. The supplier/venue decides production credential and gate compatibility.

## Customer API contract

Use the repository's existing conventions for versioning, authentication, pagination, error responses and naming. Proposed ticketing prefix is /api/v1/ticketing. Provide OpenAPI schemas and examples for every implemented endpoint.

| Endpoint | Behavior |
|---|---|
| GET /config | Public supported features, active demo/live disclosure and presentation defaults. Exclude secrets and internal diagnostics. |
| GET /events | Search, filter and paginate visible events. Support q, category, city, country, month, dateFrom, dateTo, sort and featured where appropriate. Keep current q/city/category/month/sort semantics documented for frontend compatibility. |
| GET /events/filters | Available categories, countries, cities and date/month facets, with Arabic/English labels. Can be included in the catalog response if that fits existing conventions. |
| GET /events/{idOrSlug} | Details, imagery, venue, schedules, admission/refund policies, identity requirements, purchase limits and integration mode. |
| GET /events/{id}/ticket-options | Ticket tiers for an optional sessionId, currency, availability and price metadata. |
| GET /events/{id}/availability | Timestamped availability for a session and selected tiers. |
| POST /quotes | Server-calculated item amounts, discounts, fees, VAT treatment and final total, with quoteId, expiry and policy snapshot/version. |
| POST /reservations | Authenticated, expiring demo hold based on a valid quote, with atomic inventory and purchase-limit checks. |
| GET /reservations/{id} | Owner's hold, items, expiry and status. |
| DELETE /reservations/{id} | Idempotently release an eligible hold. |
| POST /orders | Create one local order from an owned, valid reservation and quote. Record required attendees and acknowledgements. Never trust browser totals or userId. |
| GET /orders/{id} | Owner's order, line items, original accepted price/policy snapshots, fulfillment, payment and refund states. |
| GET /me/orders | Paginated, filterable history for the current authenticated user. |
| GET /me/tickets | Paginated individual ticket wallet for the current user. |
| GET /tickets/{id} | Owner's ticket and eligibility/status details. |
| GET /tickets/{id}/document | Protected demo document now, supplier-issued document later. Use authorization or short-lived URLs. |
| GET /orders/{id}/receipt | Detailed demo receipt with reference, timestamp, itemized amounts and amount actually charged. |
| POST /orders/{id}/cancellation-requests | Request cancellation under the stored policy and supported adapter capability. |
| POST /orders/{id}/refund-requests | Request refund for explicitly selected tickets/items and amounts derived by the server. |
| GET /refunds/{id} | Owner's refund state, amounts, reason, references and timeline. |

Reuse existing GET/PATCH profile, login, OTP and logout endpoints. Discovery stays public. Authenticate before creating a persistent reservation/order and preserve the selection through login. Document this adjustment because the current preview signs in during checkout. The browser's existing Reset demo action must not become permission to delete audit, purchase or real account records.

Use one record per admission entitlement unless a supplier product explicitly uses a group credential. Current order-level sample graphics should not dictate the live ticket data model.

## Administration and KPIs

Reuse the existing admin framework and permissions. Provide the APIs needed for a future ticket dashboard. Do not assume that an admin frontend already exists in the website.

| Endpoint | Behavior |
|---|---|
| GET /admin/events and GET /admin/events/{id} | Inspect supplier/seed catalog copies and synchronization metadata. |
| PATCH /admin/events/{id}/storefront | Change OrderUp visibility, featured state and display priority only. Preserve supplier content. |
| GET /admin/orders and GET /admin/orders/{id} | Search by local/supplier reference, user, event, date and lifecycle state. |
| GET /admin/tickets | Filter ticket fulfillment and admission states. |
| GET /admin/refund-requests | Review requests and their timelines. |
| POST /admin/refund-requests/{id}/approve | Authorize policy-eligible processing with a recorded reason. |
| POST /admin/refund-requests/{id}/reject | Record a rejection and customer-facing reason. |
| GET /admin/kpis | Date-filtered orders, ticket quantities, reservations, expirations, fulfillment failures and refund totals. |
| GET /admin/audit-events | Permission-controlled, paginated operational audit trail. |
| GET /admin/suppliers/{id}/status | Adapter mode, supported capabilities, last synchronization and errors. |
| POST /admin/suppliers/{id}/sync | Start an authorized catalog sync job. |
| POST /admin/orders/{id}/reconcile | Recover an uncertain external booking result. |

KPI definitions must distinguish attempted orders, fulfilled tickets, canceled tickets, simulated gross booking value, actual captured amounts and successful refunds. Exclude demo activity from live financial metrics by default. Do not call booking value OrderUp revenue or commission without an agreed settlement model. Aggregate financial data by currency, and make date/timezone boundaries explicit.

## Demo lifecycle, inventory and monetary correctness

Implement a functional persisted simulation, including quote expiry, hold expiry, sold-out responses, fulfillment, cancellation and full/partial refunds. Make test scenarios deterministic and isolated from customer-accessible routes. Seed demo refund policies, identity rules, caps and quotas as configuration, rather than production facts.

Use integer minor units and explicit ISO currency. Calculate all totals server-side. Distinguish tax-inclusive and tax-exclusive amounts to avoid adding VAT twice. Store the accepted breakdown, pricing rule version and refund policy snapshot. Apply configured maximum tier prices whenever dynamic pricing is supported. Reject or surface supplier prices that violate an agreed cap. The actual cap and tax treatment must come from approved configuration or supplier terms.

Preserve the current six-ticket rule as the demo seed default, then enforce configurable cumulative limits per user, verified phone and identity where required. Check active holds and relevant purchases atomically. Define whether refunds or cancellations restore quota. Model general admission quantities and exact-seat inventory separately if seated products are later supported.

Use database transactions and uniqueness constraints to prevent overselling demo inventory, exceeding limits and consuming a reservation twice. Require idempotency keys for mutable order/reservation/cancellation/refund operations. Bind keys to the authenticated actor, operation and payload. Reject payload mismatches. Run hold expiry workers with safe retry behavior.

Keep reservation, payment, fulfillment, refund and admission states separate. Example fulfillment states include pending, processing, fulfilled, failed and reconciliation_required. Demo payment settlement must stay simulated, with actual amount charged zero. Cancellation and refund are distinct transitions. Partial refunds should identify affected entitlements and invalidate the appropriate demo credentials according to policy.

No database transaction spans a supplier HTTP call. Persist external-operation intent and correlation references, then process using retryable workers. A timed-out purchase can have succeeded remotely. Reconcile its supplier/client reference before another purchase attempt. Use an outbox/inbox pattern or the backend's equivalent to prevent lost events and duplicate effects.

## Supplier synchronization and payment boundary

Add POST /webhooks/ticket-suppliers/{supplierCode} and normalize authenticated incoming events. Implement a signed demo webhook producer/test harness so reservation, sold/issued, canceled and refunded updates can be exercised end to end. Future webhook verification must follow the supplier's documented mechanism. An unconfigured real supplier endpoint must fail closed.

Process webhooks asynchronously after durable receipt, deduplicate by supplier event ID, handle delayed/out-of-order updates, record processing outcomes, and support authorized retries. Use polling and reconciliation adapters when the supplier lacks webhooks. Document catalog-sync frequency and staleness. Supabase Realtime alone does not synchronize the external supplier.

Payment collection and settlement ownership are unresolved. Keep a payment interface and capability flag. Do not implement real charges or imply completed payment integration without confirming whether OrderUp collects payment, redirects to supplier checkout or purchases against reseller credit. Reuse an existing provider only within the agreed contract. A later checkout-session endpoint and authenticated payment webhooks belong to that phase.

## Technical checklist interpretation and readiness evidence

Treat the business-supplied checklist as acceptance topics. Inspect the current backend and deployment before assigning status. For each item report Implemented and tested in demo, Verified live, Configuration required, Supplier dependent, or Missing/deferred, with file/test/deployment evidence. Do not label a feature live simply because an endpoint exists.

1. Real-time API sync: exercise signed simulated updates now and demonstrate persistent order/ticket changes. Actual supplier realtime behavior remains supplier dependent.
2. HTTPS and authentication: reuse existing user sessions and admin authorization. Keep supplier API keys/OAuth credentials server-side with scoped access and rotation support. Verify TLS 1.3 capability at the deployed ingress and compatibility with external providers. Do not certify transport configuration from application code alone.
3. Audit logs: record request/correlation IDs, actor, operation, supplier/local references, timestamps, state transitions and outcomes. Redact credentials, OTPs, QR tokens, full identity numbers and payment-card data. Use restricted append-only writes. Document tamper-evidence and immutable/WORM export separately, because an ordinary database table is not immutable against privileged administrators.
4. Signed QR: distinguish signing from encryption. If a demo credential is implemented, use a maintained library, scoped keys and verified issuer/audience/expiry/credential IDs, with explicit demo scope and VOID documents. Production QR ownership and compatibility require the supplier/venue contract. Exclude buyer PII from QR contents.
5. Duplicate check-in: include an optional permission-protected demo check-in service only if needed for supplier evaluation, with atomic credential validation and consumption. It must reject duplicate, canceled, refunded, wrong-event and invalid credentials. Production scanning remains capability-gated until gate ownership is agreed.
6. Offline scanning: describe the required device registration, encrypted local cache, signed manifests, revocation updates and idempotent batch synchronization interfaces. An offline scanner app and device testing are separate deliverables. Do not report offline support as implemented from backend stubs. Two disconnected devices cannot guarantee global duplicate prevention without an agreed venue-network/partitioning policy.
7. Transparent prices: expose the entire accepted item/fee/VAT breakdown and final total before confirmation. Frontend wiring is needed because the current checkout has sample totals and zero demo fees.
8. Dynamic caps: demonstrate the configured seed-tier cap with tests if dynamic pricing is enabled. Confirm production cap and fee scope with approved business/supplier policy.
9. Refunds: demonstrate eligibility, approval/rejection, partial amounts, retry and status transitions. Real original-method refund execution and the stated 7–14 business-day target depend on the selected payment/supplier arrangements. Include overdue tracking, without promising bank settlement from a successful API request.
10. OTP/identity: reuse existing OTP enforcement and verified contact claims. Capture National ID/Iqama only for events requiring it, using restricted encrypted storage and appropriate retention. Format validation is distinct from verified identity. Use a separate keyed identity-match fingerprint for limits where needed. Nafath remains future integration.
11. Purchase limits: test cumulative limits per account/verified phone/required identity, including concurrent attempts and retries. Anonymous IP limits are supplementary risk controls.
12. Receipts: produce a detailed demo receipt with local transaction reference, timestamp, currency, breakdown, ticket quantities and protected verification QR/URL. Store trusted buyer IP metadata and available external references with redaction/access control. Mark simulated payments accurately. ZATCA Phase 2 remains future integration. A demonstration receipt does not establish e-invoicing compliance.
13. Anti-bot/fraud: reuse or add rate limiting and server-side CAPTCHA verification at appropriate abuse points. Add velocity and risk signals for accounts, devices and IPs. Card fingerprints must come from an approved payment provider if available. Never collect raw card numbers/CVV. Shared IP/device/card signals need policy and review instead of unconditional account blocking.

## Supabase records and access

Design migrations aligned with the existing schema for suppliers, catalog events/sessions/tiers, local storefront settings, quotes, reservations/items, orders/items, per-admission tickets, required attendee details, refund requests/refunds, receipt references, status history, webhook inbox, outbound operations, outbox jobs, sync cursors and audit events. Reuse existing payment/user tables rather than duplicating them.

Map ticket orders to existing backend user IDs. Enforce customer ownership and supplier/admin scopes. Use RLS and grants for tables exposed to Supabase clients or the Data API. Privileged server access may bypass RLS, so backend authorization is still required. Restrict document storage and issuance keys. Return only the minimum customer-visible data.

Audit migrations and seed commands so they cannot silently reset live data. Include indexes for user history, supplier identifiers, synchronization, expiration and admin filters. Define retention for request logs and sensitive attendee fields. Avoid storing unredacted supplier payloads containing credentials or PII.

## Required delivery and acceptance

1. Inspect the existing backend, identify reusable services and describe actual gaps.
2. Implement catalog, normalized seed adapter, persistent quotes/reservations/orders/tickets, history, documents, demo refunds and admin read/curation/KPI APIs.
3. Add concurrency, authorization, idempotency, expiry and webhook workers using existing infrastructure.
4. Provide safe migrations, repeatable demo seed data and an OpenAPI contract with request/response/error examples and authentication scopes.
5. Return consistent machine-readable error codes, field errors, request IDs, ISO timestamps, currency/minor-unit amounts, expiry values and pagination metadata. Include integrationMode and capability disclosure where relevant. Never return provider secrets or internal traces to clients.
6. Test price tampering, foreign-user access, simultaneous reservations, quantity limits, idempotency conflicts, expired holds, delayed/duplicate webhooks, uncertain supplier outcomes, failed fulfillment, cancellation and partial refunds. Test configured identity rules and demo/live isolation. Test demo scanning only if implemented.
7. Deliver a frontend endpoint mapping, including auth return flow, country/date/session additions, reservation countdown, receipt/refund UI and admin screens still required. Do not claim those screens are implemented by the backend changes.
8. Deliver the checklist readiness matrix with evidence and supplier-dependent gaps. Leave Nafath, ZATCA Phase 2, live payment settlement, supplier gate compatibility and offline scanner operation clearly identified according to actual implementation.
9. Document remaining supplier questions: authentication/scopes, catalog IDs and pagination, sessions/seats, authoritative pricing/tax/fees, hold TTL, idempotency, booking lookup after timeouts, webhook signing/retries/order, ticket delivery/QR, cancellation/refunds, customer data requirements, API limits and reseller settlement.

Implement the persistent demo first. Future live integrations must stay disabled until credentials, mappings, contract rules and sandbox verification are complete.

## Technical references

- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- JWT security guidance: https://www.rfc-editor.org/rfc/rfc8725
- OWASP application logging guidance: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html

The checklist above is a proposed implementation and verification scope. Actual regulatory and supplier acceptance must be assessed against the approved documents and deployed system.
