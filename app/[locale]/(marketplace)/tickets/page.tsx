import { Suspense } from 'react';
import { Catalog } from '@/components/marketplace/catalog';
import { DemoNotice, Status, Breadcrumb } from '@/components/marketplace/ui';
import { eventRepository, type Locale } from '@/lib/ticketing/catalog';
import { marketMetadata } from '@/lib/ticketing/metadata';
import { CatalogIntro } from '@/components/marketplace/catalog-intro';
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return marketMetadata(locale,'tickets',locale==='ar'?'اكتشف الفعاليات — تجربة توضيحية':'Discover events — ticketing preview',locale==='ar'?'اكتشف نموذج تذاكر OrderUp للترفيه والرياضة والتجارب.':'Explore the OrderUp ticketing demonstration for entertainment, sports and experiences.');}
export default async function Page({params}:{params:Promise<{locale:Locale}>}) {
 const {locale}=await params,ar=locale==='ar';
 return <><Breadcrumb locale={locale} items={[{title:ar?'التذاكر':'Tickets'}]}/><CatalogIntro locale={locale}/><DemoNotice locale={locale}/><Suspense fallback={<Status>{ar?'جارٍ تحميل الفعاليات…':'Loading events…'}</Status>}><Catalog locale={locale} events={eventRepository.list()}/></Suspense></>;
}

