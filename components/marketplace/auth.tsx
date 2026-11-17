'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Mail, KeyRound } from 'lucide-react';
import { safeReturn, type Locale } from '@/lib/ticketing/catalog';
import { profileErrors, readDemoChallenge, normalizeDemoCode } from '@/lib/ticketing/demo';
import { useDemo } from './demo-provider';
import { Field, focusFirstError } from './form';
import { DemoNotice, Status } from './ui';
type Mode = 'login' | 'register' | 'verify' | 'forgot-password' | 'reset-password';
const CHALLENGE = 'orderup-demo-challenge';
export function AuthFlow({ locale, mode }: { locale: Locale; mode: Mode }) {
  const ar = locale === 'ar', t = (en: string, arabic: string) => ar ? arabic : en;
  const demo = useDemo(), router = useRouter(), params = useSearchParams();
  const next = safeReturn(params.get('next'), locale);
  const [name, setName] = useState(t('Demo guest', 'ضيف توضيحي')), [email, setEmail] = useState('demo@example.com'), [code, setCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({}), [message, setMessage] = useState(''), [busy, setBusy] = useState(false);
  const recovery = mode === 'forgot-password' || mode === 'reset-password';
  function begin(event: React.FormEvent) {
    event.preventDefault(); if (busy) return;
    const found = profileErrors(name, email, ar); setErrors(found); setMessage('');
    if (Object.keys(found).length) { focusFirstError(found); return; }
    setBusy(true);
    try { sessionStorage.setItem(CHALLENGE, JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), expires: Date.now() + 600000, attempts: 0 })); router.push(`/${locale}/verify/?next=${encodeURIComponent(next)}`); } catch { setMessage(t('Browser storage is unavailable. Enable it and try again.', 'تخزين المتصفح غير متاح. فعّله وحاول مجددًا.')); setBusy(false); }
  }
  function verify(event: React.FormEvent) {
    event.preventDefault(); if (busy) return; setErrors({}); setMessage('');
    try {
      const challenge = readDemoChallenge(sessionStorage.getItem(CHALLENGE));
      if (code !== '246810') { challenge.attempts++; sessionStorage.setItem(CHALLENGE, JSON.stringify(challenge)); setErrors({ code: t('Use the displayed demo code: 246810.', 'استخدم الرمز التوضيحي المعروض: 246810.') }); document.getElementById('code')?.focus(); return; }
      setBusy(true);
      demo.update(state => ({ ...state, profile: { name: challenge.name, email: challenge.email, locale }, signedIn: true }));
      sessionStorage.removeItem(CHALLENGE); router.replace(next);
    } catch { setMessage(t('This demo code has expired or browser storage is unavailable. Start again below.', 'انتهت صلاحية الرمز التوضيحي أو تعذّر الوصول للتخزين. ابدأ مجددًا أدناه.')); setBusy(false); }
  }
  return <div className="market-auth"><div className="auth-story"><p className="market-eyebrow">{t('YOUR ORDERUP PREVIEW', 'تجربتك مع OrderUp')}</p><h1>{t('Good plans.', 'خطط جميلة.')}<br/>{t('All in one place.', 'في مكان واحد.')}</h1><p>{t('Try the journey from discovering an event to viewing a sample ticket. Your demonstration stays in this browser tab.', 'جرّب الرحلة من اكتشاف الفعالية إلى عرض تذكرة توضيحية. تُحفظ تجربتك في علامة التبويب الحالية.')}</p><div className="auth-ticket-art" aria-hidden="true"><span>OrderUp</span><strong>{t('A DAY TO REMEMBER', 'يوم يستحق الذكرى')}</strong><span>{t('SAMPLE ONLY · NOT VALID FOR ENTRY', 'نموذج فقط · غير صالح للدخول')}</span></div></div><div className="auth-card"><DemoNotice locale={locale}/><Mail size={28}/><h2>{mode === 'verify' ? t('Try email verification', 'جرّب التحقق بالبريد') : recovery ? t('No password to reset', 'لا توجد كلمة مرور لإعادة ضبطها') : mode === 'register' ? t('Create a demo profile', 'أنشئ ملفًا توضيحيًا') : t('Welcome to the demo', 'أهلًا بك في التجربة')}</h2>{recovery ? <><p>{t('This preview uses passwordless sample sign-in. No real password or account is created. Start sign-in again to get a new on-screen demo code. For your real OrderUp app account, contact support.', 'تستخدم هذه التجربة دخولًا توضيحيًا دون كلمة مرور. لا يتم إنشاء حساب أو كلمة مرور حقيقية. ابدأ الدخول مجددًا لعرض رمز توضيحي جديد. للمساعدة في حساب تطبيق OrderUp الحقيقي، تواصل مع الدعم.')}</p><Link className="market-button full" href={`/${locale}/login/?next=${encodeURIComponent(next)}`}>{t('Start demo sign-in', 'بدء الدخول التوضيحي')}</Link><Link className="market-text-link" href={`/${locale}/support/`}>{t('App account support', 'دعم حساب التطبيق')}</Link></> : mode === 'verify' ? <form noValidate onSubmit={verify}><p>{t('Nothing was emailed. Enter the sample code below to simulate verification. It expires after 10 minutes or 5 incorrect attempts.', 'لم تُرسل رسالة بريد. أدخل الرمز أدناه لمحاكاة التحقق. تنتهي صلاحيته بعد ١٠ دقائق أو ٥ محاولات غير صحيحة.')}</p><div className="demo-code"><KeyRound size={20}/><strong dir="ltr">246810</strong><span>{t('DEMO CODE', 'رمز توضيحي')}</span></div><Field id="code" label={t('Demo verification code', 'رمز التحقق التوضيحي')} value={code} onChange={e => setCode(normalizeDemoCode(e.target.value))} inputMode="numeric" autoComplete="one-time-code" error={errors.code}/>{message && <Status error>{message}</Status>}<button className="market-button full" disabled={busy || !demo.ready || demo.storageError} aria-busy={busy}>{busy ? t('Continuing…', 'جارٍ المتابعة…') : t('Verify demo code', 'تأكيد الرمز التوضيحي')}</button><Link className="market-text-link" href={`/${locale}/login/?next=${encodeURIComponent(next)}`}>{t('Start again / new code', 'ابدأ مجددًا / رمز جديد')}</Link></form> : <form noValidate onSubmit={begin}><p>{t('Use sample details only. This is not secure authentication and does not sign you into the OrderUp mobile app. No emails or passwords are collected by a server.', 'استخدم بيانات توضيحية فقط. هذا ليس تسجيل دخول آمنًا ولا يفتح حسابك في تطبيق OrderUp. لا يتلقى الخادم بريدًا أو كلمة مرور.')}</p><Field id="name" label={t('Sample display name', 'اسم عرض توضيحي')} value={name} onChange={e => setName(e.target.value)} maxLength={80} autoComplete="off" error={errors.name}/><Field id="email" label={t('Sample email', 'بريد توضيحي')} value={email} onChange={e => setEmail(e.target.value)} type="email" dir="ltr" maxLength={120} autoComplete="off" error={errors.email}/>{message && <Status error>{message}</Status>}{demo.storageError && <Status error>{t('Demo storage needs attention.', 'تخزين التجربة يحتاج مراجعة.')} <Link href={`/${locale}/account/`}>{t('Reset demo', 'إعادة ضبط التجربة')}</Link></Status>}<button className="market-button full" disabled={busy || !demo.ready || demo.storageError} aria-busy={busy}>{busy ? t('Continuing…', 'جارٍ المتابعة…') : t('Continue with sample email', 'المتابعة بالبريد التوضيحي')}<ArrowRight size={18}/></button><Link className="market-text-link" href={`/${locale}/${mode === 'register' ? 'login' : 'register'}/?next=${encodeURIComponent(next)}`}>{mode === 'register' ? t('Already exploring? Sign in', 'سبق وجربت؟ سجّل الدخول') : t('New here? Create a demo profile', 'أول زيارة؟ أنشئ ملفًا توضيحيًا')}</Link><Link className="auth-help" href={`/${locale}/forgot-password/`}>{t('Need help signing in?', 'تحتاج مساعدة في الدخول؟')}</Link></form>}</div></div>;
}
