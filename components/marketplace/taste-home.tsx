import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, CarFront, Sparkles, Ticket } from 'lucide-react';
import { Navbar } from '@/components/orderup/navigation';
import { Footer } from '@/components/orderup/footer';
import { AppLink } from '@/components/orderup/download-dialog';
import { AppScreenshot } from '@/components/orderup/app-screenshot';
import { HomeMotion } from './home-motion';
import '@/app/taste-home.css';
import '@/public/assets/taste/motion/motion.css';

export function MarketplaceHome({ ar }: { ar: boolean }) {
  const locale = ar ? 'ar' : 'en';
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const arrow = <ArrowUpRight size={20} className="m-arrow" aria-hidden="true" />;
  const destinations = [
    { route: 'rides', title: t('Find your ride', 'اختر مشوارك'), detail: t('Your destination. Your offer.', 'وجهتك، وعرضك.'), image: '/screenshots/ios/home.jpeg', width: 589, height: 1280, Icon: CarFront, alt: t('OrderUp customer app', 'تطبيق OrderUp للعملاء') },
    { route: 'services', title: t('Book a service', 'احجز خدمتك'), detail: t('A little help at home.', 'مساعدة تحتاجها في البيت.'), image: '/images/home-service.webp', width: 1280, height: 720, Icon: Sparkles, alt: t('Home services with OrderUp', 'خدمات منزلية مع OrderUp') },
    { route: 'tickets', title: t('Find your next outing', 'اختر طلعتك'), detail: t('Try the ticketing preview.', 'جرّب تجربة التذاكر التوضيحية.'), image: '/events/concert.jpg', width: 1600, height: 1067, Icon: Ticket, alt: t('Music equipment under concert lighting', 'معدات موسيقية تحت إضاءة حفل') },
  ];
  return <div className="taste-site">
    {/* Software · centred hero · existing teal identity and bilingual typography · word-highlight moment. */}
    <HomeMotion />
    <Navbar ar={ar} className="nav" />
    <main id="main" className="taste-home">
      <section className="taste-hero hero hero--centred" data-enter aria-labelledby="home-title" id="home">
        <div className="container wrap"><div className="hero-text taste-hero-composition">
          <div className="taste-hero-text">
            <p className="taste-label"><span className="taste-brand-dot" />{t('Your everyday in Saudi Arabia', 'كل يومك في السعودية')}</p>
            <h1 id="home-title">{t('Rides & services.', 'مشاوير وخدمات.')}<br /><span>{t('Made for your day.', 'على قدّ يومك.')}</span></h1>
            <p className="hero__lead taste-lead">{t('Request a ride. Book help at home. Try a new plan for the weekend. Start with OrderUp.', 'اطلب مشوار، واحجز خدمة لبيتك، وجرّب تخطط لطلعة نهاية الأسبوع. ابدأ مع OrderUp.')}</p>
            <div className="taste-actions btn-row"><AppLink className="market-button btn btn--primary" href={`/${locale}/download/`}>{t('Download OrderUp', 'حمّل OrderUp')}{arrow}</AppLink><Link className="market-text-link" href={`/${locale}/tickets/`}>{t('See ticketing preview', 'شاهد تجربة التذاكر')}<ArrowRight size={18} aria-hidden="true" /></Link></div>
          </div>
          <div className="taste-destinations hero__window" data-enter-media>
            {destinations.map(({ route, title, detail, image, width, height, Icon, alt }) => <Link className={`taste-destination card taste-destination-${route} m-zoom`} href={`/${locale}/${route}/`} key={route}>
              <div className="taste-destination-head"><Icon size={22} aria-hidden="true" /><span className="taste-entry-title">{title}</span>{arrow}</div>
              <div className="taste-destination-picture"><Image src={image} alt={alt} width={width} height={height} sizes="(max-width:639px) 170px,(max-width:899px) 1100px,50vw" priority data-source={route === 'tickets' ? 'Unsplash' : 'OrderUp'} data-subject={route} /></div>
              <span className="taste-destination-note">{detail}</span>
            </Link>)}
          </div>
        </div></div>
      </section>
      <section className="taste-section taste-app" aria-labelledby="app-title" id="services">
        <div className="container wrap taste-split">
          <div className="taste-copy"><h2 id="app-title">{t('Home services,', 'خدمات بيتك،')}<br />{t('booked in the app.', 'من التطبيق.')}</h2><p>{t('Find local cleaning, maintenance and wellness services. Choose a category and book in the OrderUp app.', 'تصفح خدمات التنظيف والصيانة والعناية، واختر خدمتك واحجز من تطبيق OrderUp.')}</p><Link className="market-text-link" href={`/${locale}/services/`}>{t('See OrderUp services', 'شاهد خدمات OrderUp')}{arrow}</Link></div>
          <div className="taste-app-visual app-frame" aria-label={t('OrderUp customer app screens', 'شاشات تطبيق OrderUp للعملاء')}><div className="taste-screen-main"><AppScreenshot screen="cleaning" ar={ar} /></div><div className="taste-screen-secondary"><AppScreenshot screen="services" ar={ar} /></div></div>
        </div>
      </section>
      <section className="taste-section taste-events" aria-labelledby="events-title" id="tickets">
        <div className="container wrap"><div className="taste-heading-row"><div><h2 id="events-title">{t('Make room for a day out.', 'خلّ للطلعة وقت.')}</h2></div><Link className="market-text-link" href={`/${locale}/tickets/`}>{t('See ticketing preview', 'شاهد تجربة التذاكر')}{arrow}</Link></div>
          <p className="taste-demo-note"><Ticket size={18} aria-hidden="true" />{t('Ticketing demonstration. Fictional events; no tickets are sold or issued.', 'تجربة توضيحية للتذاكر. الفعاليات افتراضية، ولا يتم بيع أو إصدار تذاكر.')}</p>
          <div className="taste-event-grid">{[
            { category: 'entertainment', title: t('Music events', 'فعاليات موسيقية'), src: '/events/theatre.jpg', width: 1600, height: 1067, alt: t('A live theatre performance', 'عرض مسرحي حي') },
            { category: 'sports', title: t('Sports events', 'فعاليات رياضية'), src: '/events/football.jpg', width: 1600, height: 935, alt: t('Football on a playing field', 'كرة قدم في الملعب') },
            { category: 'attractions', title: t('Trips & experiences', 'رحلات وتجارب'), src: '/events/desert.jpg', width: 1600, height: 1196, alt: t('Sandstone formations in AlUla', 'تكوينات صخرية في العلا') },
          ].map(({ category, title, src, width, height, alt }) => <Link className="taste-event card card--open m-zoom" href={`/${locale}/tickets/?category=${category}`} key={category}><div className="taste-event-title"><h3>{title}</h3>{arrow}</div><div className="taste-event-picture"><Image src={src} alt={alt} width={width} height={height} sizes="(max-width:639px) 750px,(max-width:899px) 1100px,50vw" data-source="Unsplash" data-subject={category} /></div></Link>)}</div>
        </div>
      </section>
      <section className="taste-section taste-rides" aria-labelledby="rides-title" id="rides">
        <div className="container wrap taste-split"><div className="taste-copy"><h2 id="rides-title">{t('A ride starts', 'مشوارك يبدأ')}<br />{t('with your offer.', 'بعرضك.')}</h2><p>{t('Set your destination and suggest a fare. Compare driver offers and choose your ride in the app.', 'حدد وجهتك واقترح السعر، وقارن عروض السائقين القريبين واختر مشوارك من تطبيق OrderUp.')}</p><Link className="market-text-link" href={`/${locale}/rides/`}>{t('See how rides work', 'شاهد طريقة طلب المشوار')}{arrow}</Link><div className="taste-driver-invite"><p>{t('Taking the driver’s seat?', 'تحب تكون خلف المقود؟')}</p><Link className="market-text-link" href={`/${locale}/driver/`}>{t('Join as a driver', 'انضم كسائق')}{arrow}</Link></div></div><div className="taste-rides-visual"><Image src="/images/driver-cover.webp" alt={t('OrderUp driver beside a car', 'سائق OrderUp بجانب سيارة')} width={900} height={1100} sizes="(max-width:639px) 750px,900px" /></div></div>
      </section>
      <section className="taste-section taste-partners" data-moment="word-highlight" aria-labelledby="partners-title" id="partners"><div className="container wrap"><span className="taste-label">{t('Work with OrderUp', 'انطلق مع OrderUp')}</span><h2 className="mo-wh__text" id="partners-title">{t('Behind every ride, every service and every day out, there’s someone making it happen.', 'وراء كل مشوار، وكل خدمة، وكل طلعة، فيه شخص يصنع التجربة.')}</h2><div className="taste-partner-bottom"><p>{t('Drive with OrderUp, bring your service business to the app, or talk to us about ticketing partnerships.', 'انضم كسائق، أو قدّم خدماتك عبر التطبيق، أو تواصل معنا بخصوص شراكات التذاكر.')}</p><nav aria-label={t('Partnership opportunities', 'فرص الشراكة')}><Link href={`/${locale}/driver/`}>{t('Join as a driver', 'انضم كسائق')}{arrow}</Link><Link href={`/${locale}/providers/`}>{t('Join as a service partner', 'انضم كشريك خدمات')}{arrow}</Link><Link href={`/${locale}/partnerships/`}>{t('Contact ticketing partnerships', 'تواصل لشراكات التذاكر')}{arrow}</Link></nav></div></div></section>
    </main>
    <div className="taste-closing"><Footer ar={ar} photoCredits className="closing" intro={<div className="taste-close-row"><h2>{t('Take OrderUp with you.', 'خلّ OrderUp معك.')}</h2><AppLink className="market-button btn btn--primary" href={`/${locale}/download/`}>{t('Download OrderUp', 'حمّل OrderUp')}{arrow}</AppLink></div>} /></div>
  </div>;
}
