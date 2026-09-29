import type { MetadataRoute } from 'next';
import {siteUrl} from '@/lib/orderup/site-url';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['ar','en'].map(locale=>({url:new URL(`/${locale}/`,siteUrl).href,alternates:{languages:{en:new URL('/en/',siteUrl).href,ar:new URL('/ar/',siteUrl).href}}}))}
