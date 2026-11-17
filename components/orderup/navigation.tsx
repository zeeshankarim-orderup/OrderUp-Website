'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Menu, UserRound, X, CarFront, Ticket, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { AppLink } from './download-dialog';

export function Navbar({ ar, page = '', className = '' }: { ar: boolean; page?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = ar ? 'ar' : 'en', other = ar ? 'en' : 'ar';
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const languagePath = /^\/(en|ar)(\/|$)/.test(pathname) ? pathname.replace(/^\/(en|ar)/, `/${other}`) : `/${other}/${page ? `${page}/` : ''}`;
  const routes = [{ route: 'rides', en: 'Rides', ar: 'المشاوير', Icon: CarFront }, { route: 'services', en: 'Services', ar: 'الخدمات', Icon: Sparkles }, { route: 'tickets', en: 'Tickets', ar: 'التذاكر', Icon: Ticket }];
  const groups = [
    [t('Your everyday', 'كل يومك'), [['rides', 'Find a ride', 'اطلب مشوار'], ['services', 'Find a service', 'اختر خدمة'], ['tickets', 'Ticketing preview', 'تجربة التذاكر'], ['account', 'My demo tickets', 'تذاكري التوضيحية']]],
    [t('Your next chapter', 'خطوتك الجاية'), [['driver', 'Drive with Captain', 'قد مع الكابتن'], ['providers', 'Service partners', 'شركاء الخدمات'], ['partnerships', 'Ticketing partnerships', 'شراكات التذاكر'], ['careers', 'Careers', 'الوظائف']]],
    [t('Here for you', 'معك في كل خطوة'), [['about', 'About OrderUp', 'عن OrderUp'], ['support', 'Help & support', 'المساعدة والدعم'], ['faq', 'Common questions', 'الأسئلة الشائعة'], ['contact', 'Contact us', 'تواصل معنا']]],
  ] as const;
  const logo = <Image src="/images/orderup-logo.png" alt="OrderUp" width={1329} height={405} sizes="140px" priority />;
  return <><header className={`market-header platform-header nav ${className}`}><a className="skip" href="#main">{t('Skip to content', 'انتقل إلى المحتوى')}</a><div className="container wrap platform-nav-inner">
    <Link className="market-logo" href={`/${locale}/`} aria-label={t('OrderUp home', 'الرئيسية — OrderUp')}>{logo}</Link>
    <nav className="platform-primary-nav nav__links" aria-label={t('Main navigation', 'التنقل الرئيسي')}>{routes.map(({ route, en, ar: arabic, Icon }) => <Link key={route} href={`/${locale}/${route}/`} aria-current={pathname.includes(`/${route}`) ? 'page' : undefined}><Icon size={17} aria-hidden="true" />{t(en, arabic)}{route === 'tickets' && <span>{t('Preview', 'تجريبي')}</span>}</Link>)}</nav>
    <div className="platform-nav-actions"><a className="platform-language" href={languagePath} lang={other} onClick={e => { if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) { e.preventDefault(); window.location.assign(languagePath + window.location.search + window.location.hash); } }}>{ar ? 'EN' : 'العربية'}</a><Link className="platform-account" href={`/${locale}/account/`} aria-label={t('My demo account and tickets', 'حسابي وتذاكري التوضيحية')}><UserRound size={20} /></Link><AppLink className="market-button platform-nav-download" href={`/${locale}/download/`}>{t('Download OrderUp', 'حمّل OrderUp')}<ArrowUpRight size={17} aria-hidden="true" /></AppLink>
      <Dialog open={open} onOpenChange={setOpen}><DialogTrigger className="platform-menu-button" aria-label={t('Open menu', 'افتح القائمة')}><Menu size={23} /><span>{t('Menu', 'القائمة')}</span></DialogTrigger><DialogContent placement="edge" className="platform-menu-panel" showCloseButton={false} dir={ar ? 'rtl' : 'ltr'}><div className="container"><div className="platform-menu-top"><Link className="market-logo" href={`/${locale}/`} onClick={() => setOpen(false)}>{logo}</Link><DialogClose className="platform-menu-button"><X size={23} /><span>{t('Close menu', 'أغلق القائمة')}</span></DialogClose></div><DialogTitle className="sr-only">{t('Explore OrderUp', 'اكتشف OrderUp')}</DialogTitle><DialogDescription className="sr-only">{t('Rides, services, tickets, partnerships and support.', 'المشاوير والخدمات والتذاكر والشراكات والدعم.')}</DialogDescription><div className="platform-menu-columns">{groups.map(([title, links]) => <div key={title}><p>{title}</p><nav aria-label={title}>{links.map(([route, en, arabic]) => <Link href={`/${locale}/${route}/`} key={route} onClick={() => setOpen(false)}>{t(en, arabic)}<ArrowUpRight size={21} aria-hidden="true" /></Link>)}</nav></div>)}</div><div className="platform-menu-bottom"><span>{t('One OrderUp. More ways to spend your day.', 'OrderUp واحد. وخيارات أكثر ليومك.')}</span><AppLink className="market-button" href={`/${locale}/download/`} onClick={() => setOpen(false)}>{t('Download OrderUp', 'حمّل OrderUp')}<ArrowUpRight size={19} /></AppLink></div></div></DialogContent></Dialog>
    </div>
  </div></header></>;
}
