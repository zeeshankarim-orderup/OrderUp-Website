'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {ArrowUpRight, CheckCircle2, LoaderCircle, RotateCw} from 'lucide-react';
import {categories, categoryLabels} from '@/lib/orderup/support-schema';

type Challenge = {token: string; a: number; b: number};
async function loadChallenge(signal?:AbortSignal):Promise<Challenge> {
 const response = await fetch('/api/support/',{cache:'no-store',signal});
 if (!response.ok) throw new Error('unavailable');
 return await response.json() as Challenge;
}
const labels = {
 name:['Name','الاسم'], email:['Email','البريد الإلكتروني'], category:['Category','نوع المساعدة'],
 subject:['Subject','الموضوع'], message:['Message','الرسالة'], answer:['Quick security check','تحقق أمني بسيط'],
} as const;
export function SupportForm({ar}:{ar:boolean}) {
 const t = (en:string,arabic:string) => ar?arabic:en;
 const [challenge,setChallenge] = useState<Challenge|null>(null);
 const [loading,setLoading] = useState(true);
 const [pending,setPending] = useState(false);
 const [error,setError] = useState('');
 const [invalid,setInvalid] = useState<string[]>([]);
 const [reference,setReference] = useState('');
 const busy = useRef(false);
 const status = useRef<HTMLDivElement>(null);
 const unavailable = t('The form is temporarily unavailable. Retry below or email support@orderup.sa.','النموذج غير متاح مؤقتًا. أعد المحاولة أو راسل support@orderup.sa.');
 async function refreshChallenge(signal?:AbortSignal) {
  setLoading(true); setChallenge(null);
  try {
   setChallenge(await loadChallenge(signal));
  } catch (error) {
   if (!(error instanceof DOMException && error.name === 'AbortError')) setError(unavailable);
  } finally {if (!signal?.aborted) setLoading(false);}
 }
 useEffect(()=>{
  const controller = new AbortController();
  void loadChallenge(controller.signal).then(value=>{if(!controller.signal.aborted)setChallenge(value);}).catch(()=>{if(!controller.signal.aborted)setError(unavailable);}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
  return ()=>controller.abort();
 },[unavailable]);
 useEffect(()=>{if (reference || error) status.current?.focus();},[reference,error]);
 async function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (busy.current || !challenge) return;
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  busy.current = true; setPending(true); setError(''); setInvalid([]);
  const data = new FormData(form);
  try {
   const response = await fetch('/api/support/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    name:data.get('name'),email:data.get('email'),category:data.get('category'),subject:data.get('subject'),message:data.get('message'),website:data.get('website'),answer:data.get('answer'),locale:ar?'ar':'en',token:challenge.token,
   })});
   const result = await response.json() as {code?:string; fields?:Record<string,string[]>; reference?:string; ok?:boolean};
   if (!response.ok) {
    if (result.code === 'VALIDATION') {
     setInvalid(Object.keys(result.fields||{}));
     setError(t('Please check the highlighted fields. Use a valid email, a subject of 3–150 characters and a message of 20–5,000 characters.','راجع الحقول المحددة. أدخل بريدًا صحيحًا وموضوعًا من 3 إلى 150 حرفًا ورسالة من 20 إلى 5000 حرف.'));
    } else if (result.code === 'CHALLENGE') setError(t('Please answer the new security question and try again.','أجب عن سؤال التحقق الجديد ثم أعد المحاولة.'));
    else if (response.status === 429) setError(t('Too many attempts. Please wait 15 minutes, or email support@orderup.sa directly.','محاولات كثيرة. انتظر 15 دقيقة أو راسل support@orderup.sa مباشرة.'));
    else setError(t('Your message could not be sent. Your details are still here; try again or email support@orderup.sa.','تعذّر إرسال رسالتك. بياناتك محفوظة في النموذج؛ أعد المحاولة أو راسل support@orderup.sa.'));
    if (response.status !== 429) {void refreshChallenge(); const answer=form.elements.namedItem('answer'); if(answer instanceof HTMLInputElement)answer.value='';}
    return;
   }
   if (!result.ok || !result.reference) throw new Error('INVALID_RESPONSE');
   form.reset(); setReference(result.reference); setChallenge(null);
  } catch {setError(t('We could not confirm delivery. If you retry, mention that this may be a duplicate. You can also email support@orderup.sa.','تعذّر تأكيد التسليم. إذا أعدت المحاولة، اذكر احتمال تكرار الطلب. يمكنك أيضًا مراسلة support@orderup.sa.')); void refreshChallenge();}
  finally {busy.current=false;setPending(false);}
 }
 if (reference) return <div className="support-success" ref={status} role="status" tabIndex={-1}><CheckCircle2 size={44}/><h3>{t('Your message is on its way.','تم إرسال رسالتك.')}</h3><p>{t('Your request has been accepted for delivery to OrderUp Support. Our team can reply using the email address you provided.','تم قبول طلبك للتسليم إلى دعم OrderUp. يمكن لفريقنا الرد عبر البريد الإلكتروني الذي قدمته.')}</p><div><span>{t('Request reference','مرجع الطلب')}</span><code dir="ltr">{reference}</code></div><p>{t('Keep this reference if you need to follow up.','احتفظ بهذا المرجع إذا احتجت إلى متابعة الطلب.')}</p></div>;
 const attrs = (name:keyof typeof labels) => ({id:`support-${name}`,name,'aria-invalid':invalid.includes(name),'aria-describedby':invalid.includes(name)?'support-form-status':undefined});
 return <form className="support-form" onSubmit={submit} aria-busy={pending}>
  <div className="support-form-heading"><h2>{t('Contact Support','تواصل مع الدعم')}</h2><p>{t('Tell us what happened. All fields are required.','أخبرنا بما حدث. جميع الحقول مطلوبة.')}</p></div>
  {error && <div id="support-form-status" className="support-error" ref={status} role="alert" tabIndex={-1}>{error}</div>}
  <fieldset disabled={pending}>
   <legend className="sr-only">{t('Support request details','تفاصيل طلب الدعم')}</legend>
   <div className="support-field-row"><div className="support-field"><label htmlFor="support-name">{labels.name[ar?1:0]}</label><input {...attrs('name')} autoComplete="name" required minLength={2} maxLength={100} placeholder={t('Your full name','اسمك الكامل')}/></div><div className="support-field"><label htmlFor="support-email">{labels.email[ar?1:0]}</label><input {...attrs('email')} type="email" dir="ltr" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></div></div>
   <div className="support-field"><label htmlFor="support-category">{labels.category[ar?1:0]}</label><select {...attrs('category')} defaultValue="" required><option value="" disabled>{t('What can we help with?','كيف يمكننا مساعدتك؟')}</option>{categories.map(category=><option key={category} value={category}>{categoryLabels[category][ar?1:0]}</option>)}</select></div>
   <div className="support-field"><label htmlFor="support-subject">{labels.subject[ar?1:0]}</label><input {...attrs('subject')} required minLength={3} maxLength={150} placeholder={t('A short summary of your request','ملخص قصير لطلبك')}/></div>
   <div className="support-field"><label htmlFor="support-message">{labels.message[ar?1:0]}</label><textarea {...attrs('message')} required minLength={20} maxLength={5000} rows={6} placeholder={t('Describe the issue and include an order or ride reference, if available.','صف المشكلة وأضف رقم الطلب أو المشوار إن توفر.')} aria-describedby="support-message-help"/><small id="support-message-help">{t('20–5,000 characters. Never include passwords, verification codes or full payment-card details.','من 20 إلى 5000 حرف. لا تُضمّن كلمات المرور أو رموز التحقق أو بيانات البطاقة الكاملة.')}</small></div>
   <div className="support-trap" aria-hidden="true"><label htmlFor="support-website">Website</label><input id="support-website" name="website" tabIndex={-1} autoComplete="off" maxLength={200}/></div>
   <div className="support-check"><div><label htmlFor="support-answer">{labels.answer[ar?1:0]}</label>{challenge && <span dir="ltr">{challenge.a} + {challenge.b} = ?</span>}{loading && <small role="status">{t('Loading security check…','جارٍ تحميل التحقق…')}</small>}</div><input {...attrs('answer')} inputMode="numeric" pattern="[0-9]{1,2}" maxLength={2} required disabled={!challenge} autoComplete="off" aria-label={challenge?t(`What is ${challenge.a} plus ${challenge.b}?`, `ما ناتج ${challenge.a} زائد ${challenge.b}؟`):labels.answer[ar?1:0]}/><button className="support-refresh" type="button" disabled={loading} onClick={()=>{setError('');void refreshChallenge();}} aria-label={t('Refresh security question','تحديث سؤال التحقق')}><RotateCw size={18}/></button></div>
   <p className="support-form-note">{t('Your name, email and message are sent to the OrderUp support team to handle your request. No sign-in is required.','يُرسل اسمك وبريدك ورسالتك إلى فريق دعم OrderUp لمعالجة طلبك. لا يلزم تسجيل الدخول.')}</p>
   <button className="button support-submit" type="submit" disabled={pending||!challenge}>{pending?<LoaderCircle className="support-spinner" size={18}/>:<ArrowUpRight size={18}/>} {pending?t('Sending…','جارٍ الإرسال…'):t('Send support request','إرسال طلب الدعم')}</button>
  </fieldset>
  <noscript><p>{t('JavaScript is needed to submit this form. You can email us directly at','يتطلب إرسال النموذج JavaScript. يمكنك مراسلتنا مباشرة على')} <a href="mailto:support@orderup.sa">support@orderup.sa</a>.</p></noscript>
 </form>;
}
