// Vercel supplies the production hostname during builds. Set SITE_URL when
// using a custom domain, or when building outside Vercel.
const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const siteUrl = new URL(process.env.SITE_URL || (hostname ? `https://${hostname}` : 'http://localhost:3000'));
