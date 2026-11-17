'use client';
import {useParams} from 'next/navigation';
import {Navbar} from '@/components/orderup/navigation';
import {Footer} from '@/components/orderup/footer';
export default function NotFound(){const ar=useParams().locale!=='en';return <><Navbar ar={ar} page="not-found"/><main id="main" className="container market-page"><div className="market-empty"><h1>{ar?'الصفحة غير موجودة':'Page not found'}</h1><p>{ar?'ارجع للرئيسية واكتشف المشاوير والخدمات وتجربة التذاكر.':'Return home to explore rides, services and our ticketing preview.'}</p><a className="market-button" href={`/${ar?'ar':'en'}/`}>{ar?'العودة للرئيسية':'Back to OrderUp'}</a></div></main><Footer ar={ar}/></>}
