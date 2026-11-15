import {captainStores, customerStores} from './captain';
export type AppAudience = 'customer' | 'driver';
export const downloadApps = {customer:customerStores, driver:captainStores};
export function downloadAudience(href:string):AppAudience|null {
 if (Object.values(customerStores).some(url=>url===href)) return 'customer';
 if (Object.values(captainStores).some(url=>url===href)) return 'driver';
 if (/^\/(?:ar\/|en\/)?download\/?$/.test(href)) return 'customer';
 if (/^\/(?:ar\/|en\/)?captain\/?$/.test(href)) return 'driver';
 return null;
}
