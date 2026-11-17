'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, CarFront, Sparkles, Ticket } from 'lucide-react';
import { AppLink } from '@/components/orderup/download-dialog';
import type { Locale } from '@/lib/ticketing/catalog';

const slideAnchors = ['#show-rides', '#show-services', '#show-events'];

export function HeroCarousel({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const slides = [
    {
      id: 'rides', Icon: CarFront, label: t('Rides', 'المشاوير'),
      image: '/images/driver-cover.webp', width: 1440, height: 960,
      lead: t('Across town.', 'من أول مشوار'), accent: t('On your terms.', 'على طريقتك.'),
      description: t('Set your route, suggest a fare and choose from the driver offers you receive.', 'حدد مسارك، واقترح سعر المشوار، واختر من عروض السائقين.'),
      action: t('Download OrderUp', 'حمّل OrderUp'),
      detail: t('How rides work', 'كيف تطلب مشوار'),
    },
    {
      id: 'services', Icon: Sparkles, label: t('Home services', 'خدمات البيت'),
      image: '/images/home-service.webp', width: 1280, height: 720,
      lead: t('Help at home.', 'مساعدة لبيتك.'), accent: t('Time for you.', 'ووقت أكثر لك.'),
      description: t('Find cleaning, maintenance and personal care from registered providers in the app.', 'تصفح خدمات التنظيف والصيانة والعناية من مقدمي خدمات مسجلين في التطبيق.'),
      action: t('Explore services', 'استكشف الخدمات'),
      detail: t('Book in the app', 'احجز من التطبيق'),
    },
    {
      id: 'tickets', Icon: Ticket, label: t('Events', 'الفعاليات'),
      image: '/events/theatre.jpg', width: 1600, height: 1067,
      lead: t('Make a night', 'خلّ ليلتك'), accent: t('of it.', 'غير.'),
      description: t('Find music, sport and experiences by city in the OrderUp ticketing demo.', 'اكتشف الموسيقى والرياضة والتجارب حسب المدينة في تجربة تذاكر OrderUp التوضيحية.'),
      action: t('Explore demo events', 'استكشف الفعاليات التوضيحية'),
      detail: t('Browse by city', 'تصفح حسب المدينة'),
    },
  ];
  const slide = slides[active];
  const indexText = new Intl.NumberFormat(ar ? 'ar-SA' : 'en', { minimumIntegerDigits: 2 });
  const Next = ar ? ArrowLeft : ArrowRight;
  const Previous = ar ? ArrowRight : ArrowLeft;

  useEffect(() => {
    function readSlide() {
      const index = slideAnchors.indexOf(window.location.hash);
      if (index !== -1) setActive(index);
    }
    const frame = requestAnimationFrame(readSlide);
    window.addEventListener('hashchange', readSlide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', readSlide);
    };
  }, []);

  function selectSlide(index: number) {
    setActive(index);
    window.history.replaceState(window.history.state, '', slideAnchors[index]);
  }

  function change(delta: number) {
    selectSlide((active + delta + slides.length) % slides.length);
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    const directions = { ArrowLeft: ar ? 1 : -1, ArrowRight: ar ? -1 : 1 };
    const delta = directions[event.key as keyof typeof directions];
    if (delta) {
      event.preventDefault();
      change(delta);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      selectSlide(event.key === 'Home' ? 0 : slides.length - 1);
    }
  }

  function startSwipe(event: PointerEvent<HTMLElement>) {
    touchStart.current = null;
    if (event.pointerType === 'touch' && !(event.target as Element).closest('a,button')) {
      touchStart.current = { x: event.clientX, y: event.clientY };
    }
  }

  function finishSwipe(event: PointerEvent<HTMLElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (Math.abs(x) > 48 && Math.abs(x) > Math.abs(y) * 1.5) {
      change((x < 0 ? 1 : -1) * (ar ? -1 : 1));
    }
  }

  const title = <><span>{slide.lead}</span>{' '}<em>{slide.accent}</em></>;
  const arrow = <ArrowUpRight size={19} aria-hidden="true" />;

  return (
    <section
      className={`hero voyage-hero voyage-hero--${slide.id}`}
      id="home"
      aria-label={t('Explore OrderUp', 'استكشف OrderUp')}
      aria-roledescription={t('carousel', 'عرض شرائح')}
      onPointerDown={startSwipe}
      onPointerUp={finishSwipe}
      onPointerCancel={() => { touchStart.current = null; }}
      data-enter
    >
      <div className="voyage-hero-art hero__media" aria-hidden="true" data-enter-media>
        {slides.map((item, index) => (
          <div className={`voyage-frame voyage-frame--${item.id}`} key={item.id} data-active={active === index}>
            <Image
              src={item.image}
              alt=""
              width={item.width}
              height={item.height}
              sizes="100vw"
              preload={index === 0}
              loading={index === 0 ? undefined : 'lazy'}
            />
          </div>
        ))}
      </div>
      <div className="container wrap voyage-hero-inner">
        <div className="voyage-hero-main hero-text">
          <div className="voyage-copy" key={slide.id}>
            <div className="voyage-kicker"><slide.Icon size={18} aria-hidden="true" />{slide.label}<span>{t('Saudi Arabia', 'السعودية')}</span></div>
            <h1 id="voyage-title">{title}</h1>
            <p className="voyage-lead hero__lead">{slide.description}</p>
            <div className="voyage-hero-actions">
              {active === 0
                ? <AppLink className="voyage-button btn" href={`/${locale}/download/`}>{slide.action}{arrow}</AppLink>
                : <Link className="voyage-button btn" href={`/${locale}/${slide.id}/`}>{slide.action}{arrow}</Link>}
              {active === 1
                ? <AppLink className="voyage-inline" href={`/${locale}/download/`}>{slide.detail}{arrow}</AppLink>
                : <Link className="voyage-inline" href={active === 0 ? `/${locale}/rides/` : '#events'}>{slide.detail}{arrow}</Link>}
            </div>
          </div>
        </div>
        <div className="voyage-selector" onKeyDown={handleKeys} role="group" aria-label={t('Carousel controls', 'أدوات التحكم في الشرائح')}>
          <div className="voyage-slide-buttons">
            {slides.map((item, index) => (
              <button key={item.id} type="button" aria-pressed={index === active} onClick={() => selectSlide(index)}>
                <item.Icon size={19} aria-hidden="true" /><span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="voyage-arrows">
            <span className="voyage-count" aria-hidden="true">{indexText.format(active + 1)} <i>/</i> {indexText.format(slides.length)}</span>
            <button type="button" onClick={() => change(-1)} aria-label={t('Previous slide', 'الشريحة السابقة')}><Previous size={20} aria-hidden="true" /></button>
            <button type="button" onClick={() => change(1)} aria-label={t('Next slide', 'الشريحة التالية')}><Next size={20} aria-hidden="true" /></button>
          </div>
        </div>
        <span role="status" aria-live="polite" className="sr-only">{t(`${slide.label}, slide ${active + 1} of ${slides.length}`, `${slide.label}، الشريحة ${indexText.format(active + 1)} من ${indexText.format(slides.length)}`)}</span>
      </div>
    </section>
  );
}
