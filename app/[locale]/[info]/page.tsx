import {SupportPage} from '@/components/orderup/support';
import {PartnerPage} from '@/components/orderup/partners';
import {Footer} from '@/components/orderup/landing';
import {Wordmark} from '@/components/orderup/interactive';
import {notFound} from 'next/navigation';

const pages=['driver','providers','contact','careers','privacy','terms','support'];
export function generateStaticParams(){return pages.map(info=>({info}))}
export async function generateMetadata({params}:{params:Promise<{locale:string;info:string}>}){
 const {locale,info}=await params;const ar=locale==='ar';
 if(info==='support')return {title:ar?'تواصل مع دعم OrderUp':'Contact OrderUp Support',description:ar?'تواصل مع دعم OrderUp للمساعدة في التطبيق والحساب والمدفوعات والمشاوير والطلبات.':'Contact OrderUp Support for app issues, account help, payments, rides and orders.',robots:{index:true,follow:true},alternates:{canonical:ar?'/support':'/en/support/',languages:{ar:'/support',en:'/en/support/'}},openGraph:{title:'OrderUp Support',url:ar?'/support':'/en/support/'}};
 const title=info==='driver'?(ar?'قد واكسب معنا | OrderUp Driver':'Drive and earn with us | OrderUp Driver'):info==='providers'?(ar?'طوّر أعمالك معنا | OrderUp':'Grow your service business | OrderUp'):`OrderUp — ${info}`;
 return {title,robots:{index:false,follow:true},alternates:{canonical:`/${locale}/${info}/`,languages:{en:`/en/${info}/`,ar:`/ar/${info}/`}}};
}
export default async function Info({params}:{params:Promise<{locale:string;info:string}>}){
 const {locale,info}=await params;if(!pages.includes(info))notFound();const ar=locale==='ar';const t=(en:string,arabic:string)=>ar?arabic:en;
 if(info==='support')return <SupportPage ar={ar}/>;
 if(info==='driver'||info==='providers')return <><PartnerPage ar={ar} kind={info}/><Footer ar={ar}/></>;
 const content:Record<string,[string,string,string]>={
 contact:[t('Let’s connect.','خلّنا على تواصل.'),t('Looking for help with OrderUp? Use the support options provided in your OrderUp app.','تحتاج مساعدة مع OrderUp؟ استخدم خيارات الدعم المتاحة داخل تطبيقك.'),t('Email OrderUp Support at support@orderup.sa, or use the public support form.','راسل دعم OrderUp على support@orderup.sa أو استخدم نموذج الدعم العام.')],
 careers:[t('Build the everyday with us.','شارك في بناء يوم أسهل.'),t('OrderUp brings mobility, services, flowers and gifts into one connected experience.','OrderUp يجمع التنقل والخدمات والورود والهدايا في تجربة متصلة.'),t('There are no published vacancies on this website yet. Check back for confirmed opportunities.','لا توجد وظائف منشورة على الموقع حاليًا. تابعنا للاطلاع على الفرص عند إعلانها.')],
 privacy:[t('Privacy policy','سياسة الخصوصية'),t('The official OrderUp privacy policy has not yet been provided for this website.','لم تُوفّر سياسة الخصوصية الرسمية الخاصة بـ OrderUp لهذا الموقع بعد.'),t('Please consult the privacy information provided in the OrderUp app before submitting personal information.','يرجى مراجعة معلومات الخصوصية داخل تطبيق OrderUp قبل تقديم بيانات شخصية.')],
 terms:[t('Terms & conditions','الشروط والأحكام'),t('The official OrderUp terms and conditions have not yet been provided for this website.','لم تُوفّر الشروط والأحكام الرسمية الخاصة بـ OrderUp لهذا الموقع بعد.'),t('Please review the terms shown in the app before booking a ride, service or delivery.','يرجى مراجعة الشروط المعروضة في التطبيق قبل حجز مشوار أو خدمة أو توصيل.')]
 };
 const [title,copy,note]=content[info];
 return <><main className="container info-page"><a href={`/${locale}/`} aria-label="OrderUp"><Wordmark/></a><div className="eyebrow">{t('MORE FOR YOUR EVERYDAY','كل ما تحتاجه ليومك')}</div><h1>{title}</h1><p>{copy}</p><div className="info-notice"><p>{note}</p>{info==='contact'&&<a className="inline-link" href={ar?'/support':'/en/support/'}>{t('Contact Support','تواصل مع الدعم')}</a>}</div><a className="inline-link" href={`/${locale}/`}>{t('Back to OrderUp','العودة إلى OrderUp')} →</a></main><Footer ar={ar}/></>
}
