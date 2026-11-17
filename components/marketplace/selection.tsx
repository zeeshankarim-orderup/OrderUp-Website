'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus, ArrowRight } from 'lucide-react';
import { checkoutQuery, priceSelection, money, type Event, type Locale, type Selection } from '@/lib/ticketing/catalog';
import { Status } from './ui';
export function TicketSelection({ event, locale }: { event: Event; locale: Locale }) {
  const ar = locale === 'ar', router = useRouter();
  const [selection, setSelection] = useState<Selection>({ standard: 1 }), [error, setError] = useState('');
  const quantity = Object.values(selection).reduce((a, b) => a + b, 0);
  const total = event.tickets.reduce((sum, item) => sum + item.price * (selection[item.id] || 0), 0);
  function change(id: string, delta: number) { setError(''); setSelection(current => ({ ...current, [id]: Math.max(0, Math.min(6, (current[id] || 0) + delta)) })); }
  return <aside className="ticket-selection" id="select-tickets"><p className="market-eyebrow">{ar ? 'اختيار توضيحي' : 'DEMO SELECTION'}</p><h2>{ar ? 'اختر تذاكرك' : 'Choose your tickets'}</h2><p className="selection-help">{ar ? 'حتى ٦ تذاكر في الطلب التجريبي. لا توجد حجوزات حقيقية.' : 'Up to 6 tickets per demo order. No real reservations.'}</p>
    <div className="ticket-options">{event.tickets.map(ticket => <div className={`ticket-option ${ticket.available ? '' : 'unavailable'}`} key={ticket.id}><div><h3>{ticket.name[locale]}</h3><p>{ticket.description[locale]}</p><strong>{money(ticket.price, locale)}</strong></div>{ticket.available ? <div className="ticket-counter"><button type="button" disabled={!selection[ticket.id]} onClick={() => change(ticket.id, -1)} aria-label={`${ar ? 'تقليل' : 'Remove'} ${ticket.name[locale]}`}><Minus size={16}/></button><output aria-live="polite" aria-label={ticket.name[locale]}>{new Intl.NumberFormat(locale).format(selection[ticket.id] || 0)}</output><button type="button" disabled={quantity >= 6} onClick={() => change(ticket.id, 1)} aria-label={`${ar ? 'إضافة' : 'Add'} ${ticket.name[locale]}`}><Plus size={16}/></button></div> : <span className="market-tag">{ar ? 'غير متاح' : 'Unavailable'}</span>}</div>)}</div>
    <div className="selection-total" aria-live="polite"><span>{ar ? 'الإجمالي التوضيحي' : 'Sample total'}</span><strong>{money(total, locale)}</strong></div><p className="selection-help">{ar ? 'أسعار توضيحية شاملة. لا رسوم إضافية في النموذج.' : 'Illustrative all-in prices. No added fees in this demo.'}</p>{error && <Status error>{error}</Status>}<button className="market-button full" disabled={!quantity} onClick={() => { try { priceSelection(event, selection); router.push(`/${locale}/checkout/?${checkoutQuery(event, selection)}`); } catch { setError(ar ? 'اختر من تذكرة إلى ٦ تذاكر متاحة.' : 'Choose between 1 and 6 available tickets.'); } }}>{ar ? 'متابعة الطلب التوضيحي' : 'Continue to demo checkout'}<ArrowRight size={18}/></button>
  </aside>;
}
