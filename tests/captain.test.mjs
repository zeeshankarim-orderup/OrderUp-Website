import test from 'node:test';
import assert from 'node:assert/strict';
import {captainPlatform, captainStores, customerStores} from '../lib/orderup/captain.ts';

const cases = [
 ['Android Chrome','Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36','Linux armv8l',5,'android'],
 ['iPhone Safari','Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1','iPhone',5,'ios'],
 ['iPad Safari mobile','Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1','iPad',5,'ios'],
 ['iPadOS Safari desktop mode','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15','MacIntel',5,'ios'],
 ['Desktop Chrome','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36','Win32',0,null],
 ['Desktop Safari','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15','MacIntel',0,null],
 ['Touchscreen Windows desktop','Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0','Win32',10,null],
 ['Unsupported Windows Phone','Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1) AppleWebKit/537.36','Win32',5,null],
 ['Unknown device','Unrecognized device','',0,null],
 ['Missing user agent','','',0,null],
 ['Mobile search crawler','Mozilla/5.0 (Linux; Android 6.0.1) Googlebot/2.1','',0,null],
 ['WhatsApp preview','WhatsApp/2.0','',0,null],
];
for(const [name,ua,platform,touch,expected] of cases) test(name,()=>assert.equal(captainPlatform(ua,platform,touch),expected));
test('destinations match the approved URLs exactly',()=>{
 assert.equal(captainStores.android,'https://play.google.com/store/apps/details?id=com.orderup.captain');
 assert.equal(captainStores.ios,'https://apps.apple.com/sa/app/orderup-captain-drive-earn/id6798597573');
 assert.equal(customerStores.android,'https://play.google.com/store/apps/details?id=com.orderup.main');
 assert.equal(customerStores.ios,'https://apps.apple.com/app/orderup-the-super-app/id6802653554');
});
