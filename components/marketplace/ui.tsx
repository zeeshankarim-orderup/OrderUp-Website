import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CalendarDays, MapPin, Ticket, Info } from 'lucide-react';
import { categories, cities, eventDate, money, startingPrice, type Event, type Locale } from '@/lib/ticketing/catalog';

export function eventPosterDimensions(src: string) {
  const heights: Record<string, number> = { '/events/concert.jpg': 1067, '/events/theatre.jpg': 1067, '/events/football.jpg': 935, '/events/desert.jpg': 1196, '/events/coast.jpg': 1064, '/events/art.jpg': 2089 };
  return { width: 1600, height: heights[src] || 1067 };
}

export function DemoNotice({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return <div className={`market-demo ${compact ? 'compact' : ''}`}><Info size={17} aria-hidden="true"/><p><strong>{locale === 'ar' ? 'تجربة توضيحية للتذاكر' : 'Ticketing preview'}</strong>{!compact && <span>{locale === 'ar' ? ' فعاليات وأسعار افتراضية. لا يتم الدفع أو إصدار تذاكر دخول حقيقية.' : ' Fictional events and sample prices. No payments or valid admission tickets.'}</span>}</p></div>;
}
export function Status({ children, error = false }: { children: React.ReactNode; error?: boolean }) {
  return <p className={`market-status ${error ? 'is-error' : ''}`} role={error ? 'alert' : 'status'}>{children}</p>;
}
export function SectionHeading({ eyebrow, title, href, link }: { eyebrow?: string; title: string; href?: string; link?: string }) {
  return <div className="market-section-heading"><div>{eyebrow && <p className="market-eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{href && <Link className="market-text-link" href={href}>{link}<ArrowUpRight size={20}/></Link>}</div>;
}
export function EventCard({ event, locale, query = '' }: { event: Event; locale: Locale; query?: string }) {
  const ar = locale === 'ar';
  return <Link className="event-card card" href={`/${locale}/tickets/${event.slug}/${query ? `?from=${encodeURIComponent(query)}` : ''}`}>
    <div className="event-card-image">
      <Image src={event.image} alt="" {...eventPosterDimensions(event.image)} sizes="(max-width:639px) 650px,(max-width:1023px) 750px,650px" />
      <span className="event-card-category">{categories[event.category][locale]}</span>
      <span className="event-demo-label">{ar ? 'تجريبي' : 'Preview'}</span>
      <span className="event-card-date-stamp"><CalendarDays size={15} aria-hidden="true" /><time dateTime={event.date}>{eventDate(event.date, locale)}</time></span>
    </div>
    <div className="event-card-body">
      <h3>{event.title[locale]}</h3>
      <p className="event-card-city"><MapPin size={14} aria-hidden="true" />{cities[event.city][locale]}</p>
      <div className="event-card-bottom"><span>{ar ? 'سعر توضيحي من' : 'Sample from'} <strong>{money(startingPrice(event), locale)}</strong></span><ArrowUpRight size={20} aria-hidden="true" /></div>
    </div>
  </Link>;
}
export function EmptyState({ locale, title, description, href, action }: { locale: Locale; title: string; description: string; href?: string; action?: string }) {
  return <div className="market-empty"><Ticket size={36}/><h2>{title}</h2><p>{description}</p>{href && <Link className="market-button" href={href}>{action || (locale === 'ar' ? 'اكتشف الفعاليات' : 'Explore events')}</Link>}</div>;
}
export function Breadcrumb({ locale, items }: { locale: Locale; items: { title: string; href?: string }[] }) {
  return <nav className="market-breadcrumb" aria-label={locale === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}><Link href={`/${locale}/`}>{locale === 'ar' ? 'الرئيسية' : 'Home'}</Link>{items.map((item, i) => <span key={i}><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.title}</Link> : <span aria-current="page">{item.title}</span>}</span>)}</nav>;
}
