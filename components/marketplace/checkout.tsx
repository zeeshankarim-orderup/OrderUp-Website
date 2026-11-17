'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, Ticket, LockKeyhole } from 'lucide-react';
import { eventRepository, readSelection, priceSelection, checkoutQuery, money, eventDate, type Locale } from '@/lib/ticketing/catalog';
import { addDemoBooking } from '@/lib/ticketing/demo';
import { useDemo } from './demo-provider';
import { DemoNotice, EmptyState, Status } from './ui';

export function Checkout({ locale }: { locale: Locale }) {
  const ar = locale === 'ar', t = (en: string, arabic: string) => ar ? arabic : en;
  const params = useSearchParams(), router = useRouter(), demo = useDemo();
  const [accepted, setAccepted] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const lock = useRef(false), token = useRef<string | null>(null);
  const event = eventRepository.get(params.get('event') || '');
  let selection, summary;
  try { if (event) { selection = readSelection(new URLSearchParams(params.toString()), event); summary = priceSelection(event, selection); } } catch { /* Recoverable invalid URL. */ }
  if (!event || !selection || !summary) return <EmptyState locale={locale} title={t('Let’s choose your tickets first.', 'خلّنا نختار تذاكرك أولًا.')} description={t('Your selection is missing or no longer valid. Open an event and choose up to 6 sample tickets.', 'الاختيار غير موجود أو غير صالح. افتح فعالية واختر حتى ٦ تذاكر توضيحية.')} href={`/${locale}/tickets/`}/>;
  const selected = selection, totals = summary;
  const returnTo = `/${locale}/checkout/?${checkoutQuery(event, selected)}`;
  async function confirm() {
    if (lock.current) return;
    if (!accepted) { setError(t('Confirm that this is a demonstration before continuing.', 'أكّد أن هذا طلب توضيحي قبل المتابعة.')); document.getElementById('demo-consent')?.focus(); return; }
    lock.current = true; setBusy(true); setError('');
    try {
      if (!demo.state.signedIn || !demo.state.profile) throw new Error('Sign in');
      token.current ||= crypto.randomUUID();
      const id = `DEMO-${crypto.randomUUID()}`;
      const next = demo.update(state => addDemoBooking(state, { id, token: token.current!, owner: state.profile!.email, eventSlug: event!.slug, selection: selected, total: totals.total, quantity: totals.quantity, status: 'demo-confirmed', createdAt: new Date().toISOString() }));
      const booking = next.bookings.find(item => item.token === token.current && item.owner === next.profile?.email)!;
      router.replace(`/${locale}/account/tickets/${booking.id}/?confirmed=1`);
    } catch { lock.current = false; setBusy(false); setError(t('The demo order could not be saved. Check browser storage, then retry. Nothing was charged.', 'تعذّر حفظ الطلب التوضيحي. تحقق من تخزين المتصفح ثم أعد المحاولة. لم يُخصم أي مبلغ.')); }
  }
  return <><DemoNotice locale={locale}/><div className="checkout-steps" aria-label={t('Booking progress', 'مراحل الطلب')}><span><Check size={16}/>{t('Select', 'الاختيار')}</span><span aria-current="step">2 · {t('Review', 'المراجعة')}</span><span>3 · {t('Demo ticket', 'التذكرة التوضيحية')}</span></div><div className="checkout-grid"><div><p className="market-eyebrow">{t('YOUR NEXT PLAN', 'خطتك الجاية')}</p><h1>{t('A good plan starts here.', 'خطة جميلة تبدأ هنا.')}</h1><div className="checkout-event"><Image src={event.image} alt="" width={220} height={160}/><div><h2>{event.title[locale]}</h2><p>{eventDate(event.date, locale, true)}</p><p>{event.venue[locale]}</p><Link className="market-text-link" href={`/${locale}/tickets/${event.slug}/#select-tickets`}>{t('Change tickets', 'تعديل التذاكر')}</Link></div></div><section className="checkout-panel"><h2><LockKeyhole size={22}/>{t('Demo attendee', 'صاحب الطلب التوضيحي')}</h2>{!demo.ready ? <Status>{t('Loading your sample session…', 'جارٍ تحميل الجلسة التوضيحية…')}</Status> : demo.storageError ? <Status error>{t('Browser storage is unavailable or damaged. Open your account to reset the demo.', 'تخزين المتصفح غير متاح أو تالف. افتح الحساب لإعادة ضبط التجربة.')} <Link href={`/${locale}/account/`}>{t('Open account', 'فتح الحساب')}</Link></Status> : demo.state.signedIn ? <><strong>{demo.state.profile?.name}</strong><p dir="ltr">{demo.state.profile?.email}</p><small>{t('Sample identity only. No email will be sent.', 'هوية توضيحية فقط. لن تُرسل رسالة بريد.')} <Link href={`/${locale}/account/?tab=profile`}>{t('Edit profile', 'تعديل الملف')}</Link></small></> : <><p>{t('Continue with a sample account to keep your demo tickets in this browser tab.', 'تابع بحساب توضيحي لحفظ تذاكرك التجريبية في علامة التبويب الحالية.')}</p><Link className="market-button outline" href={`/${locale}/login/?next=${encodeURIComponent(returnTo)}`}>{t('Continue with demo account', 'المتابعة بحساب توضيحي')}</Link></>}</section><section className="checkout-panel"><h2><Ticket size={22}/>{t('Payment simulation', 'محاكاة الدفع')}</h2><p>{t('No card, wallet or payment provider is connected. Creating this order only demonstrates the booking experience. It does not reserve a place or issue a valid ticket.', 'لا توجد بطاقة أو محفظة أو بوابة دفع متصلة. إنشاء الطلب يوضح تجربة الحجز فقط، ولا يحجز مكانًا أو يصدر تذكرة صالحة.')}</p><span className="market-tag">{t('Amount charged: SAR 0', 'المبلغ المدفوع: ٠ ر.س')}</span></section></div><aside className="order-summary"><h2>{t('Your order summary', 'ملخص طلبك')}</h2>{event.tickets.filter(item => selected[item.id]).map(item => <div className="summary-line" key={item.id}><span>{item.name[locale]} × {new Intl.NumberFormat(locale).format(selected[item.id])}</span><strong>{money(item.price * selected[item.id], locale)}</strong></div>)}<div className="summary-line"><span>{t('Added demo fees', 'رسوم توضيحية إضافية')}</span><span>{money(0, locale)}</span></div><div className="summary-line total"><span>{t('Sample total', 'الإجمالي التوضيحي')}</span><strong>{money(totals.total, locale)}</strong></div><p className="selection-help">{t('Illustrative all-in total. This is not an invoice or a payable amount.', 'إجمالي توضيحي شامل. ليس فاتورة أو مبلغًا مستحقًا للدفع.')}</p><label className="market-checkbox"><input id="demo-consent" type="checkbox" checked={accepted} onChange={e => { setAccepted(e.target.checked); setError(''); }}/><span>{t('I understand this is a demonstration, with no payment and no valid admission ticket.', 'أفهم أن هذه تجربة توضيحية دون دفع أو تذكرة دخول صالحة.')}</span></label>{error && <Status error>{error}</Status>}<button className="market-button full" disabled={busy || !demo.ready || !demo.state.signedIn || demo.storageError} onClick={confirm} aria-busy={busy}>{busy ? t('Saving demo…', 'جارٍ حفظ النموذج…') : t('Create demo booking', 'إنشاء حجز توضيحي')}</button>{!demo.state.signedIn && <small>{t('Sign in to the demo above to continue.', 'سجّل الدخول للتجربة أعلاه للمتابعة.')}</small>}</aside></div></>;
}
