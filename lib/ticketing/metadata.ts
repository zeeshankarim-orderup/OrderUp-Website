import type { Metadata } from 'next';
import type { Locale } from './catalog';
export function marketMetadata(locale: Locale, path: string, title: string, description: string, demo = true): Metadata {
 return { title: title + ' | OrderUp', description, robots: { index: !demo, follow: true }, alternates: { canonical: `/${locale}/${path}/`, languages: { ar: `/ar/${path}/`, en: `/en/${path}/` } }, openGraph: { title: title + ' | OrderUp', description, url: `/${locale}/${path}/`, images: ['/images/orderup-logo.png'] } };
}

