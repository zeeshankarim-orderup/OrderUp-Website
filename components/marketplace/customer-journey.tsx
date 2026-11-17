import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Wrench, AirVent, Heart, Hammer, MapPin } from 'lucide-react';
import { Navbar } from '@/components/orderup/navigation';
import { Footer } from '@/components/orderup/footer';
import { AppLink } from '@/components/orderup/download-dialog';
import { AppScreenshot } from '@/components/orderup/app-screenshot';
import type { Locale } from '@/lib/ticketing/catalog';
import { RideGuide } from './ride-guide';

export function CustomerJourney({ locale, page }: { locale: Locale; page: 'rides' | 'services' }) {
  const ar = locale === 'ar';
  const rides = page === 'rides';
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const root = `/${locale}`;
  const arrow = <ArrowUpRight size={20} aria-hidden="true" />;
  const categories = [
    { id: 'cleaning', Icon: Sparkles, name: t('Home cleaning', 'تنظيف المنزل'), description: t('Look for cleaning for homes, offices, villas, carpets and sofas.', 'ابحث عن تنظيف المنازل والمكاتب والفلل والسجاد والأرائك.') },
    { id: 'maintenance', Icon: Wrench, name: t('Home maintenance', 'صيانة المنزل'), description: t('Find help for everyday repairs around your home.', 'ابحث عن مساعدة في إصلاحات البيت اليومية.') },
    { id: 'appliance', Icon: AirVent, name: t('Appliance care', 'العناية بالأجهزة'), description: t('Browse appliance and air-conditioning repair.', 'تصفح خدمات إصلاح الأجهزة والتكييف.') },
    { id: 'installation', Icon: Hammer, name: t('Installation', 'التركيب'), description: t('Look for help with installations and hands-on tasks.', 'ابحث عن مساعدة في التركيب والمهام العملية.') },
    { id: 'beauty', Icon: Heart, name: t('Beauty and wellness', 'الجمال والعناية'), description: t('Explore available beauty and personal care services.', 'تصفح خدمات الجمال والعناية الشخصية المتاحة.') },
    { id: 'nearby', Icon: MapPin, name: t('More near you', 'خدمات أقرب لك'), description: t('Check the app for categories and providers at your location.', 'شاهد الفئات ومقدمي الخدمات في موقعك عبر التطبيق.') },
  ];
  const visual = rides
    ? { src: '/images/driver-cover.webp', alt: t('Driver beside a car', 'سائق بجانب سيارة'), width: 1440, height: 960 }
    : { src: '/images/home-service.webp', alt: t('Technician working in a home', 'فني يعمل في منزل'), width: 1280, height: 720 };
  return (
    <>
      <Navbar ar={ar} page={page} />
      <main id="main" className="voyage-journey">
        <section className="hero voyage-journey-hero" data-enter>
          <div className="container wrap hero-text voyage-split">
            <div>
              <p className="voyage-label">{rides ? t('OrderUp rides', 'مشاوير OrderUp') : t('OrderUp home services', 'خدمات البيت من OrderUp')}</p>
              <h1>{rides ? t('The route is yours.', 'المسار لك.') : t('A hand with the work.', 'مساعدة في مهام البيت.')}<em>{rides ? t('So is the offer.', 'والعرض منك.') : t('A little time back.', 'ووقت أكثر لك.')}</em></h1>
              <p className="voyage-description">{rides
                ? t('Choose a pickup and destination, suggest a fare and compare the offers you receive in the OrderUp customer app.', 'اختر نقطة الانطلاق والوجهة، واقترح السعر، وقارن العروض التي تصلك في تطبيق OrderUp للعملاء.')
                : t('Browse cleaning, repair and personal care services, compare available providers and book in the OrderUp customer app.', 'تصفح خدمات التنظيف والصيانة والعناية، وقارن مقدمي الخدمات المتاحين واحجز من تطبيق OrderUp للعملاء.')}</p>
              <div className="voyage-hero-actions">
                <AppLink className="voyage-button btn" href={`${root}/download/`}>{t('Download OrderUp', 'حمّل OrderUp')}{arrow}</AppLink>
                <a className="voyage-inline" href="#journey-options">{rides ? t('See the ride steps', 'شاهد خطوات المشوار') : t('Browse categories', 'تصفح الفئات')}{arrow}</a>
              </div>
            </div>
            <div className="voyage-journey-photo hero__media" data-enter-media>
              <Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} sizes="(max-width:760px) 100vw, 55vw" preload />
              <AppScreenshot screen={rides ? 'home' : 'services'} ar={ar} />
            </div>
          </div>
        </section>

        <section className={`voyage-section ${rides ? 'voyage-rides' : ''}`} id="journey-options" data-moment="iris-opens">
          <div className={`container wrap ${rides ? 'voyage-split' : ''}`}>
            <div className="voyage-journey-intro">
              <h2>{rides ? t('From your route to your ride.', 'من تحديد المسار إلى المشوار.') : t('Choose the help you need.', 'اختر المساعدة اللي تحتاجها.')}</h2>
              <p className="voyage-description">{rides
                ? t('Explore the three steps you’ll follow in the app.', 'استكشف الخطوات الثلاث التي تتبعها في التطبيق.')
                : t('See the app for current categories, providers, availability and prices at your location.', 'شاهد الفئات ومقدمي الخدمات والتوفر والأسعار الحالية حسب موقعك في التطبيق.')}</p>
            </div>
            {rides ? <RideGuide locale={locale} /> : (
              <div className="voyage-category-grid">
                {categories.map(({ id, Icon, name, description }) => (
                  <article className="voyage-category" id={id} key={id}>
                    <Icon size={27} aria-hidden="true" />
                    <h3>{name}</h3><p>{description}</p>
                    <AppLink className="voyage-inline" href={`${root}/download/`}>{t('See in the app', 'شاهد في التطبيق')}{arrow}</AppLink>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="voyage-section voyage-journey-partner">
          <div className="container wrap voyage-split">
            <div>
              <p className="voyage-label">{rides ? t('For drivers', 'للسائقين') : t('For service businesses', 'لمنشآت الخدمات')}</p>
              <h2>{rides ? t('Drive with Captain.', 'قد مع الكابتن.') : t('Offer your services.', 'قدّم خدماتك.')}</h2>
              <p className="voyage-description">{rides
                ? t('Download the dedicated Captain app to start registration and verification.', 'حمّل تطبيق الكابتن المخصص لتبدأ التسجيل والتحقق.')
                : t('Use OrderUp Partner to list services and manage bookings. Contact us for official access.', 'استخدم OrderUp Partner لعرض خدماتك وإدارة الحجوزات. تواصل معنا للوصول الرسمي.')}</p>
              <Link className="voyage-button btn" href={`${root}/${rides ? 'driver' : 'providers'}/`}>{rides ? t('See how to join', 'شاهد طريقة الانضمام') : t('Become a service partner', 'انضم كشريك خدمات')}{arrow}</Link>
            </div>
            <Image src={rides ? '/assets/img/photo-f32186083.jpg' : '/images/gifts.webp'} alt={rides ? t('Jeddah waterfront', 'واجهة جدة البحرية') : t('Wrapped gifts', 'هدايا مغلفة')} width={1280} height={853} sizes="(max-width:760px) 100vw, 50vw" />
          </div>
        </section>
      </main>
      <Footer ar={ar} photoCredits={rides} compact />
    </>
  );
}
