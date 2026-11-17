import {DownloadProvider} from '@/components/orderup/download-dialog';
import {DemoProvider} from '@/components/marketplace/demo-provider';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { SiteMotion } from '@/components/orderup/site-motion';
import {siteUrl} from '@/lib/orderup/site-url';
import { Outfit, Noto_Sans_Arabic } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import '../partners.css';
import '../redesign.css';
import '../marketplace.css';
import '@/public/assets/taste/motion/motion.css';
import '../platform.css';
import '../voyage.css';
const jakarta=Outfit({subsets:['latin'],variable:'--font-jakarta'});
const arabic=Noto_Sans_Arabic({subsets:['arabic'],variable:'--font-arabic'});
export const viewport: Viewport = { themeColor: '#f6f8f7' };
export function generateStaticParams(){return [{locale:'en'},{locale:'ar'}]}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;const ar=locale==='ar';
 const title=ar?'OrderUp — مشاوير وخدمات وتجربة التذاكر في السعودية':'OrderUp — Rides, Services & Ticketing Preview in Saudi Arabia';
 const description=ar?'مشاوير وخدمات عبر تطبيق OrderUp، وتجربة توضيحية لاكتشاف الفعاليات والتذاكر في السعودية.':'Discover rides and local services in the OrderUp app, and explore our Saudi event ticketing demonstration.';
 return {metadataBase:siteUrl,title,description,alternates:{canonical:`/${locale}/`,languages:{en:'/en/',ar:'/ar/'}},openGraph:{title,description,locale:ar?'ar_SA':'en_SA',type:'website',images:['/images/driver-cover.webp']},twitter:{card:'summary_large_image',title,description,images:['/images/driver-cover.webp']},icons:{icon:'/favicon.svg'}};
}
export default async function Layout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!['en','ar'].includes(locale))notFound();return <html suppressHydrationWarning data-type="software" data-radius="round" data-buttons="solid" lang={locale} dir={locale==='ar'?'rtl':'ltr'}><body className={`orderup-v3 ${jakarta.variable} ${arabic.variable}`}><Script id="taste-entrance" strategy="beforeInteractive">{`document.documentElement.classList.add("m-enter");setTimeout(()=>document.documentElement.classList.add("m-enter-done"),700)`}</Script><DownloadProvider ar={locale==='ar'}><DemoProvider><SiteMotion />{children}</DemoProvider></DownloadProvider></body></html>}
