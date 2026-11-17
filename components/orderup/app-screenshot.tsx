import Image from 'next/image';
import {pick} from '@/lib/orderup/locale';
export function AppScreenshot({screen,ar=false}:{screen:'home'|'services'|'cleaning';ar?:boolean}){
 const names={home:pick(ar,'OrderUp home screen','شاشة OrderUp الرئيسية'),services:pick(ar,'Home service categories in OrderUp','فئات الخدمات المنزلية في OrderUp'),cleaning:pick(ar,'Cleaning services available in OrderUp','خدمات التنظيف في OrderUp')};
 return <div className="real-app-screen"><Image src={`/screenshots/ios/${screen}.jpeg`} width={589} height={1280} alt={names[screen]} sizes="(max-width:600px) 240px,300px"/></div>;
}
