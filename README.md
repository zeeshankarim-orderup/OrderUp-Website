# OrderUp Website

Bilingual Arabic/English OrderUp website built with Next.js and React.

## Development

Use Node.js 22 or newer, then run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000/. The root URL redirects to `/ar/` by default. English remains available at `/en/`. Driver and service-provider pages are available in both languages.

## Checks and production

```sh
npm run typecheck
npm run build
npm start
```

## Deploy on Vercel

Import `zeeshankarim-orderup/OrderUp-Website` from GitHub.

- Framework preset: **Next.js**
- Root directory: **./** (package.json is at the repository root)
- Production branch: **main**
- Build command: **npm run build**
- Output directory: leave the Next.js default; do not override it to `out`
- Install command: **npm ci**

The build uses standard Next.js output. `next.config.ts` redirects `/` to `/ar/` with HTTP 308. Vercel supplies the production hostname for canonical URLs and the sitemap. Optionally set `SITE_URL` to the full custom-domain URL (including `https://`) and redeploy. Enable Vercel's system environment variables if not already enabled.

Official references: [Vercel build settings](https://vercel.com/docs/builds/configure-a-build), [Vercel environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).

## Content configuration

Official app-store links are configured in `lib/orderup/config.ts`. Driver and provider apps each have separate iOS and Android fields under `partnerApps`. Empty links show a Coming soon notice. Confirmed incentive amounts and eligibility must be supplied before replacing the conditional bonus copy.

## Git ownership on Windows

If Git reports dubious ownership in this checkout, trust only this exact project path from your normal Windows terminal:

```powershell
git config --global --add safe.directory 'C:/Users/WinDows/Documents/ChatGPT/Orderup Website/orderup'
```

Dependencies, build output, environment files, local tool state, and Sites hosting configuration are ignored by Git. The older Sites/Cloudflare starter helpers remain in the source but are not used by the Next.js build or Vercel deployment.

## Public support page and SMTP

- `/support` returns the Arabic support page directly with HTTP 200; `/en/support/` is the English version. Neither requires authentication.
- A narrow proxy rewrite serves `/support` without a slash redirect, while preserving localized page trailing-slash redirects.
- `/api/support/` GET issues a signed, expiring arithmetic challenge with an HttpOnly, SameSite cookie. POST accepts same-origin JSON only, validates all input with Zod, limits the body to 24 KB, checks a honeypot, validates the challenge and enforces bounded per-instance attempt/send limits.
- Limits are best-effort per warm Vercel instance, not globally shared. For sustained abuse or higher traffic, add a Vercel Firewall rate-limit rule for `/api/support/` or a shared rate-limit store. Expiring signed challenges and origin/body checks remain active across instances.
- Nodemailer runs only on the Node.js server. It requires authenticated TLS (465) or STARTTLS (587), with certificate verification. Credentials are never passed to client components or included in responses/logs.
- Configure the server-only keys from `.env.example` in Vercel Production. Gmail needs a working app password and permission to send as support@orderup.sa. Vercel sensitive values cannot be pulled back locally; placeholders do not count as valid configuration.
- From, recipient and Reply-To use support@orderup.sa. The validated customer email is included in the body so support staff can address their reply to the customer. No automated customer emails or arbitrary recipients are permitted.
- Success is shown only after SMTP accepts the recipient; this does not guarantee inbox placement. Failure keeps the form content and displays the direct support email. No messages are stored in a website database.
- Changes to SMTP variables require a new production deployment.

Support validation/security tests: `node --experimental-strip-types --test tests/support.test.mjs`.
