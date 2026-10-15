import Image from 'next/image';
import {ArrowUpRight, CarFront, Download} from 'lucide-react';
import {captainStores} from '@/lib/orderup/captain';
import {CaptainRedirect} from './captain-redirect';
import '@/app/captain.css';

export function CaptainPage({ar}:{ar:boolean}) {
 const t=(en:string,arabic:string)=>ar?arabic:en;
 return <main className="captain-page">
  <header className="captain-header"><a href={ar?'/ar/':'/en/'} aria-label="OrderUp"><Image src="/images/orderup-logo.png" alt="OrderUp" width={1320} height={410} className="captain-logo" priority/></a><a href={ar?'/en/captain/':'/captain'} lang={ar?'en':'ar'}>{ar?'English':'العربية'}</a></header>
  <section className="captain-card" aria-labelledby="captain-heading">
   <div className="captain-icon"><CarFront size={32} aria-hidden="true"/></div>
   <p className="captain-kicker" dir="ltr">ORDERUP CAPTAIN</p>
   <h1 id="captain-heading">{t('Join OrderUp Captain','انضم إلى OrderUp Captain')}</h1>
   <p className="captain-description">{t('Join OrderUp and get ready to receive ride requests.','انضم إلى OrderUp واستعد لاستقبال طلبات المشاوير.')}</p>
   <div className="captain-stores">
    <a href={captainStores.android}><Download size={24} aria-hidden="true"/><span><small>{t('Download for Android','حمّل التطبيق لأندرويد')}</small><strong>Google Play</strong></span><ArrowUpRight size={22} aria-hidden="true"/></a>
    <a href={captainStores.ios}><Download size={24} aria-hidden="true"/><span><small>{t('Download for iPhone & iPad','حمّل التطبيق لآيفون وآيباد')}</small><strong>App Store</strong></span><ArrowUpRight size={22} aria-hidden="true"/></a>
   </div>
   <p className="captain-note">{t('On a supported mobile device, your app store opens automatically. If it doesn’t open, choose a store above.','على الأجهزة المحمولة المدعومة، يفتح متجر التطبيقات تلقائيًا. إذا لم يفتح، اختر المتجر أعلاه.')}</p>
   <a className="captain-support" href={ar?'/support':'/en/support/'}>{t('Need help? Contact Support','تحتاج مساعدة؟ تواصل مع الدعم')}</a>
  </section>
  <footer className="captain-footer"><a href={ar?'/ar/':'/en/'}>{t('Explore OrderUp','اكتشف OrderUp')} <span aria-hidden="true">↗</span></a></footer>
  <CaptainRedirect/>
 </main>;
}
