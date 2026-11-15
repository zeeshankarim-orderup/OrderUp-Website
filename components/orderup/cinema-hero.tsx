'use client';
import {useState} from 'react';
import Image from 'next/image';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {AppLink} from './download-dialog';
import {pick} from '@/lib/orderup/locale';
import '@/app/launch.css';

export function Hero({ar}:{ar:boolean}){
 const [active,setActive]=useState(0),locale=ar?'ar':'en';
 const t=(en:string,arabic:string)=>pick(ar,en,arabic);
 const slides=[
  {name:t('Drive with us','قد معنا'),highlight:t('Your next chapter.','خطوتك القادمة.'),title:t('Starts behind\nthe wheel.','تبدأ خلف\nالمقود.'),copy:t('Join OrderUp Captain. Download the app and start your driver registration.','انضم إلى OrderUp Captain. حمّل التطبيق وابدأ التسجيل كسائق.'),image:'/images/driver-cover.webp',alt:t('Driver beside a car in Jeddah','سائق بجوار سيارة في جدة'),cta:t('Become a driver','انضم كسائق'),href:`/${locale}/driver/`,secondary:t('Download Captain','حمّل الكابتن'),secondaryHref:`/${locale}/captain/`},
  {name:t('Your everyday','كل يومك'),highlight:t('Less to do.','مهام أقل.'),title:t('More time\nfor you.','وقت أكثر\nلك.'),copy:t('Rides, home services, flowers and gifts. Bring your everyday together with OrderUp.','مشاوير وخدمات منزلية وورود وهدايا. اجمع تفاصيل يومك في OrderUp.'),image:'/images/home-service.webp',alt:t('Home service professional at work','فني خدمات منزلية أثناء العمل'),cta:t('Download OrderUp','حمّل OrderUp'),href:`/${locale}/download/`,secondary:t('Explore our services','اكتشف خدماتنا'),secondaryHref:'#services'},
  {name:t('Something thoughtful','لفتة جميلة'),highlight:t('Make their day.','أسعد يومهم.'),title:t('A little thought.\nA lovely surprise.','اهتمام بسيط.\nوفرحة كبيرة.'),copy:t('Flowers and gifts for the moments you want to share. Discover them in OrderUp.','ورود وهدايا للحظات التي تحب مشاركتها. اكتشفها في OrderUp.'),image:'/images/gifts.webp',alt:t('Flowers and a gift box','ورود وعلبة هدية'),cta:t('Get the app','حمّل التطبيق'),href:`/${locale}/download/`,secondary:t('Explore flowers & gifts','اكتشف الورود والهدايا'),secondaryHref:'#gifts'},
 ];
 const slide=slides[active];
 return <section className="cinema-hero" id="home" aria-label={t('Welcome to OrderUp','مرحبًا بك في OrderUp')}><Image key={slide.image} src={slide.image} alt={slide.alt} fill priority={active===0} sizes="100vw" className="cinema-photo"/><div className="cinema-shade"/><div className="container cinema-content" id="hero-story" role="tabpanel" aria-labelledby={`hero-tab-${active}`}><p className="cinema-eyebrow">{t('ORDERUP · JEDDAH, SAUDI ARABIA','OrderUp · جدة، المملكة العربية السعودية')}</p><h1><span>{slide.highlight}</span><br/>{slide.title}</h1><p className="cinema-description">{slide.copy}</p><div className="cinema-actions"><AppLink className="cinema-primary" href={slide.href}>{slide.cta}<ArrowUpRight size={21}/></AppLink><AppLink className="cinema-secondary" href={slide.secondaryHref}>{slide.secondary}<ArrowRight size={18}/></AppLink></div></div><div className="container cinema-bottom"><div className="cinema-tabs" role="tablist" aria-label={t('Explore OrderUp stories','استكشف OrderUp')}>{slides.map((item,index)=><button type="button" role="tab" id={`hero-tab-${index}`} aria-controls="hero-story" aria-selected={active===index} tabIndex={active===index?0:-1} key={item.name} onClick={()=>setActive(index)} onKeyDown={event=>{let next=index;if(event.key==='ArrowRight')next=(index+(ar?2:1))%3;else if(event.key==='ArrowLeft')next=(index+(ar?1:2))%3;else if(event.key==='Home')next=0;else if(event.key==='End')next=2;else return;event.preventDefault();setActive(next);document.getElementById(`hero-tab-${next}`)?.focus();}}>{item.name}</button>)}</div><p className="cinema-signature">{t('YOUR CITY.','مدينتك.')}<br/><strong>{t('MORE CONNECTED.','أقرب إليك.')}</strong></p></div></section>;
}
