import type { MetadataRoute } from 'next';
import {siteUrl} from '@/lib/orderup/site-url';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return [
 ...['ar','en'].map(locale=>({url:new URL(`/${locale}/`,siteUrl).href,alternates:{languages:{en:new URL('/en/',siteUrl).href,ar:new URL('/ar/',siteUrl).href}}})),
 ...['rides','services','about','faq','contact','partnerships','driver','providers'].flatMap(page=>['ar','en'].map(locale=>({url:new URL(`/${locale}/${page}/`,siteUrl).href,alternates:{languages:{en:new URL(`/en/${page}/`,siteUrl).href,ar:new URL(`/ar/${page}/`,siteUrl).href}}}))),
 ...['/captain','/en/captain/'].map(path=>({url:new URL(path,siteUrl).href,alternates:{languages:{ar:new URL('/captain',siteUrl).href,en:new URL('/en/captain/',siteUrl).href}}})),
 ...['/support','/en/support/'].map(path=>({url:new URL(path,siteUrl).href,alternates:{languages:{ar:new URL('/support',siteUrl).href,en:new URL('/en/support/',siteUrl).href}}})),
]}
