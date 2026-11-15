"use client";
import {AppLink} from './download-dialog';
export {Navbar} from './navigation';
import Image from 'next/image';
import {Smartphone} from 'lucide-react';
import {config} from '@/lib/orderup/config';
import {pick} from '@/lib/orderup/locale';
export function Wordmark(){return <span className="wordmark" dir="ltr"><Image src="/images/orderup-logo.png" alt="OrderUp" width={1329} height={405} sizes="160px" priority/></span>}
export function Phone({screen,className='',priority=false}:{screen:keyof typeof config.images;className?:string;priority?:boolean}){return <div className={`phone ${className}`}><div className="camera"/><Image src={config.images[screen]} width={738} height={1600} alt={`OrderUp ${screen} app screen`} priority={priority} sizes="(max-width:600px) 180px,280px"/></div>}
export function StoreButtons({ar,audience}:{ar:boolean;audience?:'driver'|'providers'}){const urls=audience?config.partnerApps[audience]:{ios:config.APP_STORE_URL,android:config.GOOGLE_PLAY_URL};return <div className="store-buttons">{[['App Store',urls.ios,'iOS'],['Google Play',urls.android,'Android']].map(([name,url,platform])=><AppLink className="store" key={name} href={url||'#download-info'} aria-label={`${name} — ${url?pick(ar,'Download','تحميل'):pick(ar,'Coming soon','قريبًا')}`} {...(url?{target:'_blank',rel:'noopener noreferrer'}:{'aria-describedby':'download-info'})}><Smartphone aria-hidden="true"/><span><small>{url?pick(ar,`Download for ${platform}`,`حمّل لـ ${platform}`):pick(ar,`${platform} · Coming soon`,`${platform} · قريبًا`)}</small>{name}</span></AppLink>)}</div>}
