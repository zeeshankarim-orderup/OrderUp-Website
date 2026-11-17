'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { categories, cities, filterEvents, type Event, type Locale, type Filters } from '@/lib/ticketing/catalog';
import { EventCard, EmptyState } from './ui';
export function Catalog({ events, locale }: { events: Event[]; locale: Locale }) {
  const ar = locale === 'ar', params = useSearchParams(), router = useRouter();
  const [query, setQuery] = useState(params.get('q') || ''), [limit, setLimit] = useState(6);
  const input = useRef<HTMLInputElement>(null);
  const filters: Filters = Object.fromEntries(['q', 'category', 'city', 'month', 'sort'].map(key => [key, params.get(key) || '']));
  const committedQuery = filters.q || '';
  useEffect(() => { const timer = setTimeout(() => setQuery(committedQuery), 0); return () => clearTimeout(timer); }, [committedQuery]);
  const results = filterEvents(events, filters);
  function change(name: string, value: string) { const next = new URLSearchParams(params.toString()); if (value) next.set(name, value); else next.delete(name); setLimit(6); router.replace(`/${locale}/tickets/${next.size ? `?${next}` : ''}`, { scroll: false }); }
  function clear() { setQuery(''); setLimit(6); router.replace(`/${locale}/tickets/`, { scroll: false }); input.current?.focus(); }
  return <>
    <form id="event-finder" className="catalog-search" noValidate onSubmit={event => { event.preventDefault(); change('q', query.trim()); }} role="search"><label htmlFor="event-search" className="sr-only">{ar ? 'ابحث عن فعالية أو مدينة' : 'Search events or cities'}</label><Search size={22}/><input ref={input} id="event-search" name="q" value={query} maxLength={120} onChange={event => setQuery(event.target.value)} placeholder={ar ? 'موسيقى، كرة قدم، يوم مختلف…' : 'Music, football, a different kind of day…'}/>{query && <button type="button" className="search-clear" aria-label={ar ? 'مسح البحث' : 'Clear search'} onClick={() => { setQuery(''); change('q', ''); input.current?.focus(); }}><X size={18}/></button>}<button className="market-button" type="submit">{ar ? 'بحث' : 'Search'}</button></form>
    <div className="category-tabs" aria-label={ar ? 'فئات الفعاليات' : 'Event categories'}>{[['', ar ? 'كل الفعاليات' : 'All events'], ...Object.entries(categories).map(([key, value]) => [key, value[locale]])].map(([key, label]) => <button type="button" aria-pressed={filters.category === key} className={filters.category === key ? 'selected' : ''} key={key} onClick={() => change('category', key)}>{label}</button>)}</div>
    <div className="catalog-filters"><span><SlidersHorizontal size={18}/>{ar ? 'تصفية' : 'Filter by'}</span><label>{ar ? 'المدينة' : 'City'}<select value={filters.city} onChange={e => change('city', e.target.value)}><option value="">{ar ? 'كل المدن' : 'All cities'}</option>{Object.entries(cities).map(([key, value]) => <option key={key} value={key}>{value[locale]}</option>)}</select></label><label>{ar ? 'الشهر' : 'Month'}<select value={filters.month} onChange={e => change('month', e.target.value)}><option value="">{ar ? 'كل المواعيد' : 'All dates'}</option>{['2027-01', '2027-02', '2027-03'].map(month => <option key={month} value={month}>{new Intl.DateTimeFormat(ar ? 'ar-SA-u-ca-gregory' : 'en-GB', { month: 'long', year: 'numeric', timeZone: 'Asia/Riyadh' }).format(new Date(`${month}-01T12:00:00+03:00`))}</option>)}</select></label><label>{ar ? 'الترتيب' : 'Sort'}<select value={filters.sort || 'date'} onChange={e => change('sort', e.target.value)}><option value="date">{ar ? 'الأقرب موعدًا' : 'Soonest first'}</option><option value="price">{ar ? 'الأقل سعرًا' : 'Price: low to high'}</option></select></label><button className="market-text-link" type="button" onClick={clear}>{ar ? 'إعادة ضبط' : 'Reset filters'}</button></div>
    <p className="catalog-count" role="status">{new Intl.NumberFormat(locale).format(results.length)} {ar ? 'فعالية توضيحية' : 'sample events'}{filters.q ? ` · “${filters.q}”` : ''}</p>
    {results.length ? <div className="event-grid">{results.slice(0, limit).map(event => <EventCard key={event.id} event={event} locale={locale} query={params.toString()}/>)}</div> : <EmptyState locale={locale} title={ar ? 'ما لقينا نتائج مطابقة' : 'No matching plans yet'} description={ar ? 'جرّب مدينة أخرى أو امسح الفلاتر لاستكشاف جميع الأمثلة.' : 'Try another city or reset the filters to explore every example.'}/>}
    {limit < results.length && <div className="catalog-more"><button className="market-button outline" onClick={() => setLimit(value => value + 6)}>{ar ? 'عرض المزيد' : 'Load more'}</button></div>}
  </>;
}
