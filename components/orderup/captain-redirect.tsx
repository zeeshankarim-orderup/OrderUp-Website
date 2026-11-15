'use client';

import {useEffect, useRef} from 'react';
import {captainPlatform, captainStores, customerStores} from '@/lib/orderup/captain';

export function CaptainRedirect({customer=false}:{customer?:boolean}) {
 const attempted = useRef(false);
 useEffect(()=>{
  if (attempted.current) return;
  attempted.current = true;
  try {
   const platform = captainPlatform(navigator.userAgent, navigator.platform, navigator.maxTouchPoints);
   if (platform) window.location.replace((customer ? customerStores : captainStores)[platform]);
  } catch {
   // The server-rendered store links remain usable if detection/navigation fails.
  }
 },[customer]);
 return null;
}
