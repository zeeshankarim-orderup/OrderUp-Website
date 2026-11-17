import {Suspense} from 'react';
import {Account} from '@/components/marketplace/account';
import {marketMetadata} from '@/lib/ticketing/metadata';
import type {Locale} from '@/lib/ticketing/catalog';
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return marketMetadata(locale,'account',locale==='ar'?'حسابي وتذاكري التوضيحية':'My demo account & tickets',locale==='ar'?'ملفك وسجل حجوزاتك التوضيحية.':'Your sample profile and demonstration booking history.');}
export default async function Page({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return <Suspense fallback={<p role="status">{locale==='ar'?'جارٍ التحميل…':'Loading…'}</p>}><Account locale={locale}/></Suspense>;}

