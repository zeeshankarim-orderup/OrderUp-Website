import test from 'node:test';
import assert from 'node:assert/strict';
import {eventRepository,filterEvents,priceSelection,readSelection,checkoutQuery,safeReturn,money,eventDate} from '../lib/ticketing/catalog.ts';
import {emptyDemo,parseDemo,addDemoBooking,profileErrors,readDemoChallenge,normalizeDemoCode} from '../lib/ticketing/demo.ts';
const events=eventRepository.list(),event=events[0];
test('catalog is bilingual, fictional and has unique provider-normalized identities',()=>{
 assert.equal(events.length,9);assert.equal(new Set(events.map(e=>e.slug)).size,9);
 for(const item of events){assert.equal(item.demo,true);assert.equal(item.providerId,'orderup-demo');assert.equal(item.externalId,null);assert.ok(item.title.ar&&item.title.en);assert.ok(item.tickets.every(t=>Number.isInteger(t.price)&&t.price>0));}
});
test('search finds Arabic and English names and cities',()=>{
 assert.ok(filterEvents(events,{q:'أنغام'}).some(e=>e.slug===event.slug));
 assert.ok(filterEvents(events,{q:'  RED SEA  '}).some(e=>e.slug===event.slug));
 assert.ok(filterEvents(events,{q:'جدة'}).every(e=>e.city==='jeddah'));
});
test('filters combine and empty results remain honest',()=>{
 const result=filterEvents(events,{category:'sports',city:'riyadh',month:'2027-02'});assert.equal(result.length,1);assert.equal(result[0].slug,'weekend-cup');
 assert.equal(filterEvents(events,{q:'no-such-event'}).length,0);assert.equal(filterEvents(events,{category:'unknown'}).length,0);
});
test('date and price sorting are deterministic',()=>{
 const byDate=filterEvents(events,{});assert.ok(byDate.every((e,i)=>i===0||byDate[i-1].date<=e.date));
 const byPrice=filterEvents(events,{sort:'price'});assert.ok(byPrice.every((e,i)=>i===0||byPrice[i-1].tickets[0].price<=e.tickets[0].price));
});
test('multiple ticket types calculate in integer minor units',()=>assert.deepEqual(priceSelection(event,{standard:2,premium:1}),{quantity:3,total:46000}));
test('invalid counts, unavailable or forged categories cannot be ordered',()=>{
 for(const selection of [{},{standard:0},{standard:-1},{standard:1.2},{standard:NaN},{standard:Infinity},{standard:7},{standard:6,premium:1},{group:1},{forged:1}])assert.throws(()=>priceSelection(event,selection));
});
test('checkout query round-trips valid selection and rejects tampered quantities',()=>{
 const query=checkoutQuery(event,{standard:2,premium:1});const params=new URLSearchParams(query);assert.equal(params.get('event'),event.slug);assert.deepEqual(readSelection(params,event),{standard:2,premium:1});
 assert.throws(()=>readSelection(new URLSearchParams('standard=bogus'),event));
});
test('return URLs stay in the active locale and origin',()=>{
 assert.equal(safeReturn('/en/checkout/?event=red-sea-sounds&standard=1','en'),'/en/checkout/?event=red-sea-sounds&standard=1');
 for(const url of ['https://evil.example','//evil.example','/ar/account/','/en/\\evil.example','/en/\nhttps://evil.example','/en/..//evil.example','/en/%2e%2e/ar/account/'])assert.equal(safeReturn(url,'en'),'/en/account/');
});
test('Saudi currency and dates format in both locales',()=>{
 assert.match(money(12000,'en'),/120/);assert.ok(money(12000,'ar').length>3);assert.match(eventDate(event.date,'en',true),/2027/);assert.ok(eventDate(event.date,'ar',true).length>10);
});
const profile={name:'Demo Guest',email:'demo@example.com',locale:'en'};
const booking={id:'DEMO-test-123',owner:profile.email,token:'test-token',eventSlug:event.slug,selection:{standard:1},total:12000,quantity:1,createdAt:'2026-11-15T12:00:00Z',status:'demo-confirmed'};
test('booking requires a sample session and matching owner',()=>{
 assert.throws(()=>addDemoBooking(emptyDemo(),booking));assert.throws(()=>addDemoBooking({...emptyDemo(),signedIn:true,profile},{...booking,owner:'other@example.com'}));
});
test('duplicate checkout tokens return the existing booking once',()=>{
 const state={...emptyDemo(),signedIn:true,profile};const first=addDemoBooking(state,booking);const retry=addDemoBooking(first,{...booking,id:'DEMO-other'});assert.equal(retry.bookings.length,1);assert.equal(retry.bookings[0].id,booking.id);
});
test('state reload keeps history and sample session without passwords',()=>{
 const state=addDemoBooking({...emptyDemo(),signedIn:true,profile},booking);assert.deepEqual(parseDemo(JSON.stringify(state)),state);assert.ok(!JSON.stringify(state).includes('password'));
});
test('corrupt or incompatible storage gets rejected',()=>{
 for(const raw of ['bad','null','{}',JSON.stringify({...emptyDemo(),version:2}),JSON.stringify({...emptyDemo(),signedIn:true}),JSON.stringify({...emptyDemo(),bookings:[{...booking,quantity:-1}]}),JSON.stringify({...emptyDemo(),bookings:[{...booking,status:'paid'}]})])assert.throws(()=>parseDemo(raw));
 assert.deepEqual(parseDemo(null),emptyDemo());
});
test('sample profile validation accepts Arabic and rejects malformed input',()=>{
 assert.deepEqual(profileErrors('ضيف تجريبي','demo@example.com',true),{});assert.ok(profileErrors('x','not-an-email',false).email);assert.ok(profileErrors('x','demo@example.com',false).name);
});
test('demo verification accepts Arabic digits and enforces expiry and attempt bounds',()=>{
 assert.equal(normalizeDemoCode('٢٤٦٨١٠'),'246810');assert.equal(normalizeDemoCode('۲۴۶۸۱۰'),'246810');
 const challenge={name:'Sample',email:'demo@example.com',expires:2000,attempts:0};assert.equal(readDemoChallenge(JSON.stringify(challenge),1000).email,'demo@example.com');
 for(const invalid of [{...challenge,expires:1000},{...challenge,attempts:5},{...challenge,attempts:-1},{...challenge,attempts:null},{...challenge,name:null}])assert.throws(()=>readDemoChallenge(JSON.stringify(invalid),1000));
 assert.throws(()=>readDemoChallenge(null,1000));
});
