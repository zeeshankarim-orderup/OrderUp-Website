import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { AppLink } from './download-dialog';

export function Footer({ ar, compact = false, photoCredits = false, intro, className = '' }: { ar: boolean; compact?: boolean; photoCredits?: boolean; intro?: ReactNode; className?: string }) {
  const locale = ar ? 'ar' : 'en', t = (en: string, arabic: string) => ar ? arabic : en;
  const groups = [
    [t('Explore', 'اكتشف'), [['rides', 'Rides', 'المشاوير'], ['services', 'Services', 'الخدمات'], ['tickets', 'Tickets · preview', 'التذاكر · تجريبي'], ['account', 'My demo tickets', 'تذاكري التوضيحية']]],
    [t('Build with us', 'انطلق معنا'), [['driver', 'Drive with Captain', 'قد مع الكابتن'], ['providers', 'Service partners', 'شركاء الخدمات'], ['partnerships', 'Ticketing partners', 'شركاء التذاكر'], ['careers', 'Careers', 'الوظائف']]],
    [t('OrderUp', 'OrderUp'), [['about', 'Our story', 'حكايتنا'], ['support', 'Help & support', 'المساعدة والدعم'], ['faq', 'Common questions', 'الأسئلة الشائعة'], ['contact', 'Contact us', 'تواصل معنا']]],
  ] as const;
  return <footer className={`platform-footer ${compact ? 'is-compact' : 'closing'} ${className}`}><div className="container wrap">
    {!compact && <div className="platform-footer-close">{intro || <><div><span>{t('Your next move starts here', 'خطوتك الجاية تبدأ هنا')}</span><h2>{t('Take the day with you.', 'خذ يومك معك.')}</h2></div><AppLink className="market-button btn btn--primary" href={`/${locale}/download/`}>{t('Download OrderUp', 'حمّل OrderUp')}<ArrowUpRight size={20} aria-hidden="true" /></AppLink></>}</div>}
    <div className="platform-footer-base"><div className="platform-footer-directory"><div className="platform-footer-brand"><Link href={`/${locale}/`}><Image src="/images/orderup-logo.png" alt="OrderUp" width={1329} height={405} sizes="170px" /></Link><p>{t('Rides, local services and plans for your next day out.', 'مشاوير وخدمات قريبة وخطط لطلعتك الجاية.')}</p><span><MapPin size={15} />{t('Jeddah, Saudi Arabia', 'جدة، المملكة العربية السعودية')}</span></div>{groups.map(([title, links]) => <div key={title}><h3>{title}</h3><nav aria-label={title}>{links.map(([route, en, arabic]) => <Link key={route} href={`/${locale}/${route}/`}>{t(en, arabic)}</Link>)}</nav></div>)}</div>
    <div className="platform-footer-legal"><span>© {new Date().getFullYear()} OrderUp</span><p>{t('Ticketing is a demonstration. No real tickets are sold or issued.', 'التذاكر تجربة توضيحية. لا يتم بيع أو إصدار تذاكر حقيقية.')}</p><div><Link href={`/${locale}/privacy/`}>{t('Privacy', 'الخصوصية')}</Link><Link href={`/${locale}/terms/`}>{t('Terms', 'الشروط')}</Link><Link href={`/${locale}/credits/`}>{t('Photo credits', 'مصادر الصور')}</Link></div>{photoCredits && <span className="platform-credit">{t('Photographs via', 'صور عبر')} <Link href={`/${locale}/credits/`}>Unsplash & Wikimedia Commons</Link></span>}</div></div>
  </div></footer>;
}
