import {Suspense} from 'react';
import {Checkout} from '@/components/marketplace/checkout';
import {marketMetadata} from '@/lib/ticketing/metadata';
import type {Locale} from '@/lib/ticketing/catalog';
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return marketMetadata(locale,'checkout',locale==='ar'?'مراجعة الطلب التوضيحي':'Demo checkout',locale==='ar'?'راجع اختيارك التوضيحي. لا يوجد دفع.':'Review your demonstration selection. No payment is collected.');}
export default async function Page({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return <Suspense fallback={<p role="status">{locale==='ar'?'جارٍ التحميل…':'Loading…'}</p>}><Checkout locale={locale}/></Suspense>;}

