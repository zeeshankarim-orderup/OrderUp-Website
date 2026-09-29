import type { Metadata } from 'next';
import {siteUrl} from '@/lib/orderup/site-url';
import { Plus_Jakarta_Sans, Noto_Sans_Arabic } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import '../partners.css';
const jakarta=Plus_Jakarta_Sans({subsets:['latin'],variable:'--font-jakarta'});
const arabic=Noto_Sans_Arabic({subsets:['arabic'],variable:'--font-arabic'});
export function generateStaticParams(){return [{locale:'en'},{locale:'ar'}]}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;const ar=locale==='ar';
 const title=ar?'OrderUp — تطبيقك لكل يوم في السعودية':'OrderUp — Your Everyday App in Saudi Arabia';
 const description=ar?'مشاوير وخدمات منزلية وورود وهدايا، كل ما تحتاجه ليومك في تطبيق واحد.':'Order rides, discover nearby services, send flowers and gifts, and manage more of everyday life with OrderUp.';
 return {metadataBase:siteUrl,title,description,alternates:{canonical:`/${locale}/`,languages:{en:'/en/',ar:'/ar/'}},openGraph:{title,description,locale:ar?'ar_SA':'en_SA',type:'website'},twitter:{card:'summary',title,description},icons:{icon:'/favicon.svg'}};
}
export default async function Layout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!['en','ar'].includes(locale))notFound();return <html lang={locale} dir={locale==='ar'?'rtl':'ltr'}><body className={`${jakarta.variable} ${arabic.variable}`}>{children}</body></html>}
