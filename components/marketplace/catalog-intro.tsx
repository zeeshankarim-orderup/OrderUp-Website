import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Search } from 'lucide-react';
import { eventRepository, eventDate, cities, type Locale } from '@/lib/ticketing/catalog';
import { eventPosterDimensions } from './ui';

export function CatalogIntro({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const feature = eventRepository.list()[0];
  return (
    <section className="voyage-catalog-intro hero" data-enter>
      <Image className="voyage-catalog-art" src={feature.image} alt="" {...eventPosterDimensions(feature.image)} sizes="(max-width:640px) 100vw, 75vw" preload />
      <div className="hero-text voyage-catalog-heading">
        <p className="voyage-label">{t('OrderUp ticketing demo', 'تجربة تذاكر OrderUp')}</p>
        <h1>{t('Find your kind of outing.', 'اكتشف الطلعة اللي تناسبك.')}</h1>
        <p>{t('Browse fictional music, sport and experiences by city, then try a sample booking.', 'تصفح فعاليات موسيقية ورياضية وتجارب افتراضية حسب المدينة، ثم جرّب حجزًا توضيحيًا.')}</p>
        <a className="voyage-button btn" href="#event-finder"><Search size={18} aria-hidden="true" />{t('Find events', 'ابحث عن الفعاليات')}</a>
      </div>
      <Link className="voyage-featured-event" href={`/${locale}/tickets/${feature.slug}/`}>
        <span>{t('Featured demo event', 'فعالية توضيحية مميزة')}</span>
        <h2>{feature.title[locale]}</h2>
        <p><MapPin size={14} aria-hidden="true" />{cities[feature.city][locale]} <span>·</span> {eventDate(feature.date, locale)}</p>
        <ArrowUpRight className="voyage-featured-arrow" size={22} aria-hidden="true" />
      </Link>
    </section>
  );
}
