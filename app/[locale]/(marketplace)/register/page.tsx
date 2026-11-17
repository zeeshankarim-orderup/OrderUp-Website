import {Suspense} from 'react';
import {AuthFlow} from '@/components/marketplace/auth';
import {marketMetadata} from '@/lib/ticketing/metadata';
import type {Locale} from '@/lib/ticketing/catalog';
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return marketMetadata(locale,'register',locale==='ar'?'الدخول للحساب التوضيحي':'Demo account access',locale==='ar'?'تجربة دخول توضيحية دون كلمة مرور أو إرسال بريد.':'Passwordless demo access. No real authentication or email delivery.');}
export default async function Page({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return <Suspense fallback={<p role="status">{locale==='ar'?'جارٍ التحميل…':'Loading…'}</p>}><AuthFlow key="register" locale={locale} mode="register"/></Suspense>;}

