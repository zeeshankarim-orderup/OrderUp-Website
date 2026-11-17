import {CaptainPage} from '@/components/orderup/captain';
import {SupportPage} from '@/components/orderup/support';
import {PartnerPage} from '@/components/orderup/partners';
import {Footer} from '@/components/orderup/landing';
import {Navbar} from '@/components/orderup/interactive';
import {notFound,redirect} from 'next/navigation';
import {MarketingPageContent,marketingPages,marketingTitles,type MarketingPage} from '@/components/marketplace/marketing';
import {marketMetadata} from '@/lib/ticketing/metadata';
import {PhotoCredits} from '@/components/orderup/photo-credits';
import type {Locale} from '@/lib/ticketing/catalog';

const pages=['driver','providers','careers','privacy','terms','support','captain','download','credits',...marketingPages];
export function generateStaticParams(){return pages.map(info=>({info}))}
export async function generateMetadata({params}:{params:Promise<{locale:string;info:string}>}){
 const {locale,info}=await params;const ar=locale==='ar';
 if(info==='credits')return marketMetadata(locale as Locale,'credits',ar?'مصادر الصور':'Photography credits',ar?'مصادر صور الوجهات والفعاليات وتراخيصها.':'Sources and licenses for destination and event photographs.',false);
 if(marketingPages.includes(info as MarketingPage))return marketMetadata(locale as Locale,info,marketingTitles[info as MarketingPage][locale as Locale],ar?'اكتشف المشاوير والخدمات وشراكات التذاكر مع OrderUp.':'Explore rides, services and ticketing partnerships with OrderUp.',false);
 if(info==='download')return {title:ar?'حمّل OrderUp':'Download OrderUp',description:ar?'حمّل تطبيق OrderUp لأندرويد وآيفون.':'Download the OrderUp customer app for Android and iPhone.',alternates:{canonical:ar?'/download':'/en/download/',languages:{ar:'/download',en:'/en/download/'}}};
 if(info==='captain')return {title:ar?'انضم إلى OrderUp Captain':'Join OrderUp Captain',description:ar?'انضم إلى OrderUp واستعد لاستقبال طلبات المشاوير.':'Join OrderUp and get ready to receive ride requests.',robots:{index:true,follow:true},alternates:{canonical:ar?'/captain':'/en/captain/',languages:{ar:'/captain',en:'/en/captain/'}},openGraph:{title:'Join OrderUp Captain',description:'Join OrderUp and get ready to receive ride requests.',url:ar?'/captain':'/en/captain/',images:['/images/orderup-logo.png']},twitter:{card:'summary',title:'Join OrderUp Captain',description:'Join OrderUp and get ready to receive ride requests.',images:['/images/orderup-logo.png']}};
 if(info==='support')return {title:ar?'تواصل مع دعم OrderUp':'Contact OrderUp Support',description:ar?'تواصل مع دعم OrderUp للمساعدة في التطبيق والحساب والمدفوعات والمشاوير والطلبات.':'Contact OrderUp Support for app issues, account help, payments, rides and orders.',robots:{index:true,follow:true},alternates:{canonical:ar?'/support':'/en/support/',languages:{ar:'/support',en:'/en/support/'}},openGraph:{title:'OrderUp Support',url:ar?'/support':'/en/support/'}};
 const genericTitles:Record<string,string>={careers:ar?'الوظائف | OrderUp':'Careers | OrderUp',privacy:ar?'سياسة الخصوصية | OrderUp':'Privacy policy | OrderUp',terms:ar?'الشروط والأحكام | OrderUp':'Terms & conditions | OrderUp'};
 const title=info==='driver'?(ar?'قد واكسب معنا | OrderUp Driver':'Drive and earn with us | OrderUp Driver'):info==='providers'?(ar?'طوّر أعمالك معنا | OrderUp':'Grow your service business | OrderUp'):(genericTitles[info]||`OrderUp — ${info}`);
 return {title,robots:{index:['driver','providers'].includes(info),follow:true},alternates:{canonical:`/${locale}/${info}/`,languages:{en:`/en/${info}/`,ar:`/ar/${info}/`}}};
}
export default async function Info({params}:{params:Promise<{locale:string;info:string}>}){
 const {locale,info}=await params;if(!pages.includes(info))notFound();const ar=locale==='ar';const t=(en:string,arabic:string)=>ar?arabic:en;
 if(marketingPages.includes(info as MarketingPage))return <MarketingPageContent locale={locale as Locale} page={info as MarketingPage}/>;
 if(info==='download')redirect(`/${locale}/?app=customer`);
 if(info==='captain')return <CaptainPage ar={ar}/>;
 if(info==='support')return <SupportPage ar={ar}/>;
 if(info==='credits')return <PhotoCredits ar={ar}/>;
 if(info==='driver'||info==='providers')return <><PartnerPage ar={ar} kind={info}/><Footer ar={ar}/></>;
 const content:Record<string,[string,string,string]>={
 contact:[t('Let’s connect.','خلّنا على تواصل.'),t('Looking for help with OrderUp? Use the support options provided in your OrderUp app.','تحتاج مساعدة مع OrderUp؟ استخدم خيارات الدعم المتاحة داخل تطبيقك.'),t('Email OrderUp Support at support@orderup.sa, or use the public support form.','راسل دعم OrderUp على support@orderup.sa أو استخدم نموذج الدعم العام.')],
 careers:[t('Build the everyday with us.','شارك في بناء يوم أسهل.'),t('OrderUp connects rides and local services, with a new ticketing website demonstration.','يجمع OrderUp المشاوير والخدمات المحلية، مع تجربة موقع جديدة للتذاكر.'),t('There are no published vacancies on this website yet. Check back for confirmed opportunities.','لا توجد وظائف منشورة على الموقع حاليًا. تابعنا للاطلاع على الفرص عند إعلانها.')],
 privacy:[t('Privacy policy','سياسة الخصوصية'),t('The official OrderUp privacy policy has not yet been provided for this website.','لم تُوفّر سياسة الخصوصية الرسمية الخاصة بـ OrderUp لهذا الموقع بعد.'),t('Please consult the privacy information provided in the OrderUp app before submitting personal information.','يرجى مراجعة معلومات الخصوصية داخل تطبيق OrderUp قبل تقديم بيانات شخصية.')],
 terms:[t('Terms & conditions','الشروط والأحكام'),t('The official OrderUp terms and conditions have not yet been provided for this website.','لم تُوفّر الشروط والأحكام الرسمية الخاصة بـ OrderUp لهذا الموقع بعد.'),t('Please review the terms shown in the app before booking a ride, service or delivery.','يرجى مراجعة الشروط المعروضة في التطبيق قبل حجز مشوار أو خدمة أو توصيل.')]
 };
 const [title,copy,note]=content[info];
 return <><Navbar ar={ar} page={info}/><main id="main" className="container info-page hero" data-enter><div className="eyebrow">{t('MORE FOR YOUR EVERYDAY','كل ما تحتاجه ليومك')}</div><h1>{title}</h1><p>{copy}</p><div className="info-notice"><p>{note}</p>{info==='contact'&&<a className="inline-link" href={ar?'/support':'/en/support/'}>{t('Contact Support','تواصل مع الدعم')}</a>}</div><a className="inline-link" href={`/${locale}/`}>{t('Back to OrderUp','العودة إلى OrderUp')} →</a></main><Footer ar={ar}/></>
}
