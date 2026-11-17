import {Suspense} from 'react';
import {TicketDetail} from '@/components/marketplace/account';
import {marketMetadata} from '@/lib/ticketing/metadata';
import type {Locale} from '@/lib/ticketing/catalog';
export async function generateMetadata({params}:{params:Promise<{locale:Locale;id:string}>}){const {locale,id}=await params;return marketMetadata(locale,'account/tickets/'+id,locale==='ar'?'تذكرة توضيحية — غير صالحة للدخول':'Demo ticket — not valid for entry',locale==='ar'?'نموذج تذكرة غير صالح للدخول.':'A demonstration ticket, not valid for admission.');}
export default async function Page({params}:{params:Promise<{locale:Locale;id:string}>}){const {locale,id}=await params;return <Suspense fallback={<p role="status">{locale==='ar'?'جارٍ التحميل…':'Loading…'}</p>}><TicketDetail locale={locale} id={id}/></Suspense>;}

