import {Mail, Smartphone, UserRound, CreditCard, CarFront, MessageCircle, ArrowUpRight} from 'lucide-react';
import {Navbar} from './interactive';
import {Footer} from './landing';
import {SupportForm} from './support-form';
import '@/app/support.css';

export function SupportPage({ar}:{ar:boolean}) {
 const t=(en:string,arabic:string)=>ar?arabic:en;
 const topics=[
  [Smartphone,'App issues','مشكلات التطبيق','Crashes, errors or features that aren’t working.','أعطال التطبيق أو الأخطاء أو الميزات التي لا تعمل.'],
  [UserRound,'Account help','المساعدة في الحساب','Sign-in, profile access and account questions.','تسجيل الدخول والوصول إلى الحساب والاستفسارات عنه.'],
  [CreditCard,'Payments','المدفوعات','Charges, payment problems and refund questions.','الرسوم ومشكلات الدفع والاستفسارات عن الاسترداد.'],
  [CarFront,'Rides & orders','المشاوير والطلبات','Help with a ride, service, delivery or order.','المساعدة في مشوار أو خدمة أو توصيل أو طلب.'],
  [MessageCircle,'Other assistance','مساعدة أخرى','Feedback, questions and anything else you need.','الملاحظات والأسئلة وأي مساعدة أخرى تحتاجها.'],
 ] as const;
 return <><Navbar ar={ar} page="support"/><main id="main" className="support-page">
  <section className="support-hero"><div className="container"><div className="eyebrow">{t('ORDERUP SUPPORT','دعم OrderUp')}</div><h1>{t('A little help.','مساعدة بسيطة.')}<br/><em>{t('Whenever you need it.','عندما تحتاجها.')}</em></h1><p>{t('Questions about OrderUp? We’re here to help with the app, your account, payments, rides, orders and more. Contact our support team below.','لديك سؤال عن OrderUp؟ نحن هنا لمساعدتك في التطبيق والحساب والمدفوعات والمشاوير والطلبات وغيرها. تواصل مع فريق الدعم أدناه.')}</p><a className="support-email-pill" href="mailto:support@orderup.sa"><Mail size={19}/><span dir="ltr">support@orderup.sa</span><ArrowUpRight size={17}/></a></div></section>
  <section className="container support-layout" aria-label={t('Contact OrderUp support','تواصل مع دعم OrderUp')}><aside><div className="eyebrow">{t('LET’S GET IT SORTED','خلّنا نساعدك')}</div><h2>{t('How can we help?','كيف نقدر نساعدك؟')}</h2><div className="support-topics">{topics.map(([Icon,en,arabic,copy,arCopy])=><div key={en}><span><Icon size={21} strokeWidth={1.6}/></span><div><h3>{t(en,arabic)}</h3><p>{t(copy,arCopy)}</p></div></div>)}</div><div className="support-direct"><Mail size={22}/><h3>{t('Prefer email?','تفضّل البريد الإلكتروني؟')}</h3><p>{t('You can contact OrderUp Support directly, even if you can’t sign in to your account.','يمكنك التواصل مع دعم OrderUp مباشرة، حتى إذا تعذّر تسجيل الدخول إلى حسابك.')}</p><a href="mailto:support@orderup.sa" dir="ltr">support@orderup.sa</a></div></aside><SupportForm ar={ar}/></section>
  <section className="container support-tips"><div><h2>{t('A few details help us help you.','تفاصيل بسيطة تساعدنا نخدمك.')}</h2><p>{t('Include your device model, app version and any ride or order reference that relates to the issue. Describe what happened and when.','اذكر طراز جهازك وإصدار التطبيق ورقم المشوار أو الطلب المرتبط بالمشكلة. وضّح ما حدث ومتى.')}</p></div><p>{t('For immediate danger or a medical emergency, contact local emergency services. This form is for app and service support.','في حال الخطر المباشر أو الطوارئ الطبية، اتصل بخدمات الطوارئ المحلية. هذا النموذج مخصص لدعم التطبيق والخدمات.')}</p></section>
 </main><Footer ar={ar}/></>;
}
