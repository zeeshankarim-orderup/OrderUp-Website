'use client';

import {createContext,useContext,useEffect,useRef,useState,type ReactNode,type AnchorHTMLAttributes} from 'react';
import Image from 'next/image';
import {ArrowUpRight,CarFront,ScanLine,Smartphone,X} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription,DialogClose} from '@/components/ui/dialog';
import {downloadApps,downloadAudience,type AppAudience} from '@/lib/orderup/download';
import {pick} from '@/lib/orderup/locale';
import '@/app/download-dialog.css';

const DownloadContext=createContext<((audience:AppAudience,trigger?:HTMLElement)=>void)|null>(null);

export function AppLink({href='',onClick,children,...props}:AnchorHTMLAttributes<HTMLAnchorElement>){
 const open=useContext(DownloadContext);
 const audience=downloadAudience(href);
 return <a {...props} href={href} aria-haspopup={audience?'dialog':undefined} onClick={event=>{
  onClick?.(event);
  if(event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
  if(audience&&open){event.preventDefault();open(audience,event.currentTarget);}
 }}>{children}</a>;
}

export function DownloadProvider({ar,children}:{ar:boolean;children:ReactNode}){
 const [audience,setAudience]=useState<AppAudience|null>(null);
 const trigger=useRef<HTMLElement|null>(null);
 const t=(en:string,arabic:string)=>pick(ar,en,arabic);
 useEffect(()=>{
  const value=new URLSearchParams(window.location.search).get('app');
  if(value==='customer'||value==='driver'){
   // Legacy URLs and desktop QR scans open the same dialog on the home page.
   const timer=setTimeout(()=>setAudience(value),0);
   return ()=>clearTimeout(timer);
  }
 },[]);
 const driver=audience==='driver';
 const stores=downloadApps[audience||'customer'];
 return <DownloadContext.Provider value={(value,element)=>{trigger.current=element||null;setAudience(value);}}>
  {children}
  <Dialog open={audience!==null} onOpenChange={open=>{if(!open){setAudience(null);const url=new URL(window.location.href);if(url.searchParams.has('app')){url.searchParams.delete('app');window.history.replaceState(null,'',url);}}}}>
   <DialogContent className="app-download-dialog" showCloseButton={false} dir={ar?'rtl':'ltr'} onCloseAutoFocus={event=>{event.preventDefault();if(trigger.current?.isConnected)trigger.current.focus();else document.querySelector<HTMLButtonElement>('.header-menu')?.focus();}}>
    <DialogClose className="app-download-close" aria-label={t('Close download popup','إغلاق نافذة التحميل')}><X size={22}/></DialogClose>
    <div className="app-download-copy">
     <Image className="app-download-logo" src="/images/orderup-logo.png" alt="OrderUp" width={1329} height={405} sizes="150px"/>
     <div className="app-download-role">{driver?<CarFront size={17}/>:<Smartphone size={17}/>} {driver?t('FOR DRIVERS','للسائقين'):t('FOR YOUR EVERYDAY','لكل تفاصيل يومك')}</div>
     <DialogTitle className="app-download-title">{driver?t('Your next move.','خطوتك القادمة.'):t('Your day. One app.','يومك. تطبيق واحد.')}</DialogTitle>
     <DialogDescription className="app-download-description">{driver?t('Download OrderUp Captain and start your driver registration.','حمّل OrderUp Captain وابدأ التسجيل كسائق.'):t('Download OrderUp for rides, home services, flowers and gifts.','حمّل OrderUp للمشاوير والخدمات المنزلية والورود والهدايا.')}</DialogDescription>
     <div className="app-download-stores">{(['ios','android'] as const).map(platform=><a key={platform} href={stores[platform]}><Smartphone size={23}/><span><small>{platform==='ios'?t('Download for iPhone & iPad','حمّل لآيفون وآيباد'):t('Download for Android','حمّل لأندرويد')}</small><strong>{platform==='ios'?'App Store':'Google Play'}</strong></span><ArrowUpRight size={19}/></a>)}</div>
     <p className="app-download-phone-note">{t('Already on your phone? Choose your store above.','تتصفح من جوالك؟ اختر متجرك أعلاه.')}</p>
    </div>
    <div className="app-download-scan"><div className="app-download-qr"><Image src={`/qr/${audience||'customer'}.svg`} width={224} height={224} alt={driver?t('Scan to download OrderUp Captain','امسح الرمز لتحميل OrderUp Captain'):t('Scan to download OrderUp','امسح الرمز لتحميل OrderUp')} unoptimized/></div><div className="app-download-scan-label"><ScanLine size={22}/><strong>{t('Scan. Download. Get going.','امسح. حمّل. وانطلق.')}</strong></div><p>{t('Open your phone camera and scan the code. We’ll take you to the right app store.','افتح كاميرا جوالك وامسح الرمز. سنوجّهك إلى متجر التطبيقات المناسب.')}</p><span dir="ltr">{driver?'OrderUp Captain':'OrderUp'}</span></div>
   </DialogContent>
  </Dialog>
 </DownloadContext.Provider>;
}
