import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CarFront, Sparkles, Ticket, MapPin, Search, Wrench, Heart, Plus, Smartphone } from 'lucide-react';
import { Navbar } from '@/components/orderup/navigation';
import { Footer } from '@/components/orderup/footer';
import { AppLink } from '@/components/orderup/download-dialog';
import { AppScreenshot } from '@/components/orderup/app-screenshot';
import { HeroCarousel } from './hero-carousel';
import { RideGuide } from './ride-guide';
import { EventCard, DemoNotice } from './ui';
import { cities, eventRepository, type Locale } from '@/lib/ticketing/catalog';

const destinations = [
  { id: 'jeddah', image: '/assets/img/photo-f32186083.jpg', width: 1280, height: 853 },
  { id: 'riyadh', image: '/assets/img/photo-f61289940.jpg', width: 1280, height: 853 },
  { id: 'alula', image: '/events/desert.jpg', width: 1600, height: 1196 },
] as const;

export function PlatformHome({ ar }: { ar: boolean }) {
  const locale: Locale = ar ? 'ar' : 'en';
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const arrow = <ArrowUpRight size={20} aria-hidden="true" />;
  const root = `/${locale}`;
  const featured = eventRepository.list().filter(event => event.featured).slice(0, 3);
  const paths = [
    { href: '#rides', Icon: CarFront, title: t('Get a ride', 'اطلب مشوار'), copy: t('Suggest a fare and choose your driver.', 'اقترح السعر واختر سائقك.') },
    { href: '#services', Icon: Sparkles, title: t('Find help at home', 'اطلب مساعدة للبيت'), copy: t('Browse cleaning, care and repairs.', 'تصفح التنظيف والعناية والصيانة.') },
    { href: '#events', Icon: Ticket, title: t('Plan a day out', 'خطط لطلعتك'), copy: t('Explore the ticketing demo.', 'استكشف تجربة التذاكر التوضيحية.') },
  ];
  const services = [
    { id: 'cleaning', Icon: Sparkles, title: t('Cleaning', 'التنظيف'), copy: t('Homes, carpets and sofas', 'المنازل والسجاد والأرائك') },
    { id: 'maintenance', Icon: Wrench, title: t('Maintenance', 'الصيانة'), copy: t('Repairs and appliance care', 'الإصلاحات والعناية بالأجهزة') },
    { id: 'beauty', Icon: Heart, title: t('Personal care', 'العناية الشخصية'), copy: t('Beauty and wellness', 'الجمال والعناية') },
  ];
  const partners = [
    { route: 'driver', Icon: CarFront, title: t('Drive with Captain', 'قد مع الكابتن'), copy: t('Get started with driver registration in the Captain app.', 'ابدأ التسجيل كسائق في تطبيق الكابتن.') },
    { route: 'providers', Icon: Wrench, title: t('Offer your services', 'قدّم خدماتك'), copy: t('Learn how to list services and manage bookings as a provider.', 'تعرّف على طريقة عرض الخدمات وإدارة الحجوزات كمقدم خدمة.') },
    { route: 'partnerships', Icon: Ticket, title: t('Bring an event', 'أضف فعاليتك'), copy: t('Talk to us about event discovery and ticketing partnerships.', 'تواصل معنا بشأن اكتشاف الفعاليات وشراكات التذاكر.') },
  ];
  const questions = [
    [t('Where do I request a ride?', 'من وين أطلب مشوار؟'), t('Open the OrderUp customer app to set your route, suggest a fare and compare offers.', 'افتح تطبيق OrderUp للعملاء لتحديد مسارك واقتراح السعر ومقارنة العروض.')],
    [t('How do I check service availability?', 'كيف أعرف الخدمات المتاحة؟'), t('The app shows service categories, providers, prices and availability for your location.', 'يعرض التطبيق فئات الخدمات ومقدميها والأسعار والتوفر حسب موقعك.')],
    [t('Can I buy event tickets here?', 'أقدر أشتري تذاكر من هنا؟'), t('You can try a fictional booking. No payments are taken and demo tickets are not valid for entry.', 'تقدر تجرّب حجزًا توضيحيًا. لا يتم الدفع والتذاكر التوضيحية غير صالحة للدخول.')],
  ];

  return (
    <>
      <Navbar ar={ar} className="voyage-header" />
      <main id="main" className="voyage-home">
        <HeroCarousel locale={locale} />

        <section className="voyage-section voyage-explore" aria-labelledby="voyage-explore-title">
          <div className="container wrap">
            <div className="voyage-section-head">
              <h2 id="voyage-explore-title">{t('Where do you want to start?', 'وش تبي تبدأ فيه؟')}</h2>
            </div>
            <div className="voyage-path-grid">
              {paths.map(({ href, Icon, title, copy }) => (
                <a className="voyage-path card" key={href} href={href}>
                  <Icon size={25} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  {arrow}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="voyage-section voyage-rides" id="rides">
          <div className="container wrap voyage-split">
            <div>
              <p className="voyage-label">{t('OrderUp rides', 'مشاوير OrderUp')}</p>
              <h2>{t('You make the first offer.', 'أنت تبدأ بالعرض.')}</h2>
              <p className="voyage-description">{t('See how requesting a ride works, from choosing your route to comparing the offers you receive.', 'شاهد خطوات طلب المشوار، من تحديد مسارك إلى مقارنة العروض التي تصلك.')}</p>
              <RideGuide locale={locale} />
            </div>
            <div className="voyage-ride-media">
              <Image src="/assets/img/photo-f61289940.jpg" alt={t('Riyadh skyline at sunset', 'أفق الرياض وقت الغروب')} width={1280} height={853} sizes="(max-width:760px) 95vw, 55vw" />
              <AppScreenshot screen="home" ar={ar} />
            </div>
          </div>
        </section>

        <section className="voyage-section voyage-services" id="services" data-moment="iris-opens" data-moment-opts='{"from":"base"}'>
          <div className="container wrap voyage-split">
            <div className="voyage-services-media">
              <Image src="/images/home-service.webp" alt={t('Technician working in a kitchen', 'فني يعمل في مطبخ')} width={1280} height={720} sizes="(max-width:760px) 95vw, 55vw" />
              <AppScreenshot screen="services" ar={ar} />
            </div>
            <div>
              <p className="voyage-label">{t('Home services', 'خدمات البيت')}</p>
              <h2>{t('Take care of the to-do list.', 'خلّص مهام البيت.')}</h2>
              <p className="voyage-description">{t('Find providers in the OrderUp app and check the services and prices available at your location.', 'ابحث عن مقدمي الخدمات في تطبيق OrderUp وشاهد الخدمات والأسعار المتاحة في موقعك.')}</p>
              <div className="voyage-service-list">
                {services.map(({ id, Icon, title, copy }) => (
                  <Link href={`${root}/services/#${id}`} key={id}>
                    <Icon size={22} aria-hidden="true" /><div><h3>{title}</h3><p>{copy}</p></div>{arrow}
                  </Link>
                ))}
              </div>
              <AppLink href={`${root}/download/`} className="voyage-button btn">{t('Browse services in the app', 'تصفح الخدمات في التطبيق')}{arrow}</AppLink>
            </div>
          </div>
        </section>

        <section className="voyage-section voyage-events" id="events">
          <div className="container wrap">
            <div className="voyage-section-head">
              <div><p className="voyage-label">{t('Ticketing demo', 'تجربة التذاكر')}</p><h2>{t('Find your next day out.', 'اكتشف طلعتك الجاية.')}</h2></div>
              <Link className="voyage-inline" href={`${root}/tickets/`}>{t('View all events', 'اعرض كل الفعاليات')}{arrow}</Link>
            </div>
            <DemoNotice locale={locale} />
            <form className="voyage-event-search" action={`${root}/tickets/`} role="search">
              <label><Search size={20} aria-hidden="true" /><span className="sr-only">{t('Search demo events', 'ابحث عن فعاليات توضيحية')}</span><input name="q" type="search" maxLength={100} placeholder={t('Search event names or cities', 'ابحث باسم الفعالية أو المدينة')} /></label>
              <label><MapPin size={20} aria-hidden="true" /><span className="sr-only">{t('City', 'المدينة')}</span><select name="city" defaultValue=""><option value="">{t('All cities', 'كل المدن')}</option>{Object.entries(cities).map(([id, city]) => <option key={id} value={id}>{city[locale]}</option>)}</select></label>
              <button type="submit" className="voyage-button btn">{t('Find events', 'ابحث عن الفعاليات')}{arrow}</button>
            </form>
            <div className="event-grid voyage-event-grid">{featured.map(event => <EventCard key={event.id} event={event} locale={locale} />)}</div>
            <div className="voyage-city-head"><h3>{t('Browse by city', 'تصفح حسب المدينة')}</h3></div>
            <div className="voyage-city-grid">
              {destinations.map(({ id, image, width, height }) => (
                <Link className="voyage-city card m-zoom" key={id} href={`${root}/tickets/?city=${id}`}>
                  <Image src={image} alt="" width={width} height={height} sizes="(max-width:560px) 95vw, 35vw" />
                  <span>{cities[id][locale]}{arrow}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="voyage-section voyage-work" data-moment={ar ? 'word-highlight' : 'letters-assemble'}>
          <div className="container wrap">
            <div className="voyage-section-head">
              <h2 className={ar ? 'mo-wh__text' : 'mo-la__type'}>{t('Work with OrderUp.', 'اشتغل مع OrderUp.')}</h2>
            </div>
            <div className="voyage-partner-grid">
              {partners.map(({ route, Icon, title, copy }) => (
                <Link href={`${root}/${route}/`} className="voyage-path card" key={route}><Icon size={25} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p>{arrow}</Link>
              ))}
            </div>
          </div>
        </section>

        <section className="voyage-section voyage-faq">
          <div className="container wrap voyage-split">
            <div><h2>{t('Before you get started.', 'قبل ما تبدأ.')}</h2><Link className="voyage-inline" href={`${root}/faq/`}>{t('See all questions', 'اعرض كل الأسئلة')}{arrow}</Link></div>
            <div className="voyage-questions">
              {questions.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={21} aria-hidden="true" /></summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="voyage-app" aria-labelledby="voyage-app-title">
          <div className="container wrap">
            <div><Smartphone size={25} aria-hidden="true" /><h2 id="voyage-app-title">{t('Rides and services in your pocket.', 'مشاوير وخدمات في جوالك.')}</h2></div>
            <AppLink className="voyage-button btn" href={`${root}/download/`}>{t('Download OrderUp', 'حمّل OrderUp')}{arrow}</AppLink>
          </div>
        </section>
      </main>
      <Footer ar={ar} photoCredits compact />
    </>
  );
}
