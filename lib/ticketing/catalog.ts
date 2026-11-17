export type Locale = 'ar' | 'en';
export type Copy = { en: string; ar: string };
export type Category = 'entertainment' | 'sports' | 'attractions';
export type City = 'jeddah' | 'riyadh' | 'alula' | 'dammam';
export type TicketType = { id: string; name: Copy; description: Copy; price: number; available: boolean };
export type Event = {
  id: string; slug: string; providerId: string; externalId: string | null; title: Copy; subtitle: Copy;
  category: Category; city: City; venue: Copy; date: string; duration: Copy; image: string;
  description: Copy; age: Copy; tickets: TicketType[]; featured: boolean; demo: true;
};
export const copy = (en: string, ar: string): Copy => ({ en, ar });
export const categories: Record<Category, Copy> = {
  entertainment: copy('Entertainment', 'ترفيه'), sports: copy('Sports', 'رياضة'), attractions: copy('Experiences', 'تجارب ووجهات'),
};
export const cities: Record<City, Copy> = {
  jeddah: copy('Jeddah', 'جدة'), riyadh: copy('Riyadh', 'الرياض'), alula: copy('AlUla', 'العلا'), dammam: copy('Dammam', 'الدمام'),
};
const ticketTypes = (price: number): TicketType[] => [
  { id: 'standard', name: copy('General admission', 'الدخول العام'), description: copy('One guest · standard access', 'ضيف واحد · دخول عادي'), price: price * 100, available: true },
  { id: 'premium', name: copy('Premium experience', 'التجربة المميزة'), description: copy('One guest · preferred viewing area', 'ضيف واحد · منطقة مشاهدة مميزة'), price: (price + 100) * 100, available: true },
  { id: 'group', name: copy('Group area', 'منطقة المجموعات'), description: copy('Unavailable in this sample', 'غير متاح في هذا النموذج'), price: (price + 150) * 100, available: false },
];
type Seed = [string, Copy, Copy, Category, City, string, string, number, Copy];
const seeds: Seed[] = [
  ['red-sea-sounds', copy('Red Sea Sounds', 'أنغام البحر الأحمر'), copy('An evening made for the music.', 'أمسية على إيقاع الموسيقى.'), 'entertainment', 'jeddah', '2027-01-22T20:00:00+03:00', 'concert', 120, copy('A fictional open-air music evening by the coast, with a curated programme of acoustic and contemporary performances.', 'أمسية موسيقية افتراضية في الهواء الطلق قرب الساحل، ببرنامج يجمع العروض الهادئة والموسيقى المعاصرة.')],
  ['city-football-night', copy('City Football Night', 'ليلة كرة القدم'), copy('Be part of the roar.', 'عِش حماس المدرجات.'), 'sports', 'jeddah', '2027-01-29T19:30:00+03:00', 'football', 65, copy('A sample community football showcase. Explore ticket categories for an imagined evening of sport. No real club or tournament is affiliated.', 'عرض تجريبي لأمسية كرة قدم مجتمعية. اكتشف فئات التذاكر لفعالية افتراضية، دون ارتباط بأي نادٍ أو بطولة حقيقية.')],
  ['alula-afterglow', copy('AlUla Afterglow', 'العلا عند الغروب'), copy('Slow down. Look a little further.', 'تمهّل. واكتشف أفقًا أوسع.'), 'attractions', 'alula', '2027-02-06T16:30:00+03:00', 'desert', 180, copy('An imagined desert experience with a sunset walk and a relaxed evening outdoors. This itinerary illustrates a future experience booking.', 'تجربة صحراوية افتراضية تشمل جولة وقت الغروب وأمسية هادئة في الهواء الطلق. البرنامج نموذج لتوضيح حجز التجارب مستقبلًا.')],
  ['riyadh-stage', copy('A Night on Stage', 'ليلة على المسرح'), copy('Stories worth stepping out for.', 'حكايات تستحق المشوار.'), 'entertainment', 'riyadh', '2027-02-12T20:00:00+03:00', 'theatre', 95, copy('A fictional theatre programme combining storytelling and live performance in an intimate setting.', 'برنامج مسرحي افتراضي يجمع الحكاية والأداء الحي في أجواء قريبة من الجمهور.')],
  ['coast-and-calm', copy('Coast & Calm', 'بحر وهدوء'), copy('A fresh perspective on the weekend.', 'زاوية جديدة لعطلة الأسبوع.'), 'attractions', 'dammam', '2027-01-23T15:00:00+03:00', 'coast', 75, copy('A sample coastal afternoon designed for exploring a waterside setting with family or friends.', 'نموذج لأمسية ساحلية لاستكشاف أجواء البحر مع الأهل أو الأصدقاء.')],
  ['jeddah-art-weekend', copy('Jeddah Art Weekend', 'ويكند الفن في جدة'), copy('Make room for a little inspiration.', 'خلّ للإلهام مساحة.'), 'attractions', 'jeddah', '2027-02-19T17:00:00+03:00', 'art', 45, copy('An illustrative creative weekend featuring imagined exhibitions and guided gallery conversations.', 'نموذج لعطلة إبداعية تتضمن معارض افتراضية وجولات حوارية في أجواء فنية.')],
  ['riyadh-soundscape', copy('Riyadh Soundscape', 'إيقاع الرياض'), copy('Your evening, turned up.', 'أمسيتك بإيقاع مختلف.'), 'entertainment', 'riyadh', '2027-03-05T20:30:00+03:00', 'concert', 150, copy('A fictional contemporary music showcase, used to demonstrate date, venue and ticket selection.', 'عرض موسيقي معاصر افتراضي لتوضيح اختيار الموعد والمكان وفئة التذكرة.')],
  ['weekend-cup', copy('The Weekend Cup', 'كأس نهاية الأسبوع'), copy('A day for the whole team.', 'يوم يجمع الفريق.'), 'sports', 'riyadh', '2027-02-20T18:00:00+03:00', 'football', 50, copy('An imagined friendly sports tournament. All teams, ticket categories and prices are examples only.', 'بطولة رياضية ودية افتراضية. جميع الفرق وفئات التذاكر والأسعار أمثلة توضيحية فقط.')],
  ['family-story-hour', copy('Family Story Hour', 'ساعة حكايات العائلة'), copy('Small moments. Big imaginations.', 'لحظات صغيرة. وخيال كبير.'), 'entertainment', 'jeddah', '2027-03-12T16:00:00+03:00', 'theatre', 40, copy('A family-oriented sample performance with storytelling and imaginative theatre. No actual performance is scheduled.', 'عرض تجريبي للعائلات يجمع الحكايات والمسرح الخيالي. لا يوجد عرض حقيقي مجدول.')],
];
const events: Event[] = seeds.map(([slug, title, subtitle, category, city, date, image, price, description], i) => ({
  id: `demo-${i + 1}`, slug, providerId: 'orderup-demo', externalId: null, title, subtitle, category, city, date,
  venue: copy(`${cities[city].en} · sample venue`, `${cities[city].ar} · موقع توضيحي`),
  duration: copy('Approximately 3 hours', 'نحو ٣ ساعات'), image: `/events/${image}.jpg`, description,
  age: copy('Sample admission: ages 6+ with an adult', 'دخول توضيحي: من عمر ٦ سنوات برفقة بالغ'),
  tickets: ticketTypes(price), featured: i < 3, demo: true,
}));
// Replace this adapter with a server-side supplier repository; UI uses normalized records only.
export interface EventRepository { list(): Event[]; get(slug: string): Event | undefined }
export const eventRepository: EventRepository = { list: () => events, get: slug => events.find(event => event.slug === slug) };
export type Filters = { q?: string; category?: string; city?: string; month?: string; sort?: string };
export function filterEvents(items: Event[], filters: Filters): Event[] {
  const query = (filters.q || '').trim().toLocaleLowerCase().normalize('NFKC');
  const result = items.filter(event => (!filters.category || event.category === filters.category)
    && (!filters.city || event.city === filters.city) && (!filters.month || event.date.startsWith(filters.month))
    && (!query || [event.title.en, event.title.ar, event.description.en, event.description.ar, cities[event.city].en, cities[event.city].ar].join(' ').toLocaleLowerCase().normalize('NFKC').includes(query)));
  return result.sort(filters.sort === 'price' ? (a, b) => startingPrice(a) - startingPrice(b) : (a, b) => a.date.localeCompare(b.date));
}
export const startingPrice = (event: Event) => Math.min(...event.tickets.filter(t => t.available).map(t => t.price));
export const money = (value: number, locale: Locale) => new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 2 }).format(value / 100);
export const eventDate = (value: string, locale: Locale, time = false) => new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', ...(time ? { hour: 'numeric', minute: '2-digit' } as const : {}), timeZone: 'Asia/Riyadh' }).format(new Date(value));
export type Selection = Record<string, number>;
export function priceSelection(event: Event, selection: Selection) {
  let quantity = 0, total = 0;
  for (const [id, count] of Object.entries(selection)) {
    const ticket = event.tickets.find(item => item.id === id);
    if (!ticket || !Number.isInteger(count) || count < 0 || count > 6 || (!ticket.available && count > 0)) throw new Error('Invalid selection');
    quantity += count; total += count * ticket.price;
  }
  if (quantity < 1 || quantity > 6) throw new Error('Choose 1–6 tickets');
  return { quantity, total };
}
export function readSelection(params: URLSearchParams, event: Event): Selection {
  const selection: Selection = {};
  for (const ticket of event.tickets) { const raw = params.get(ticket.id); if (raw !== null) selection[ticket.id] = Number(raw); }
  priceSelection(event, selection);
  return selection;
}
export function checkoutQuery(event: Event, selection: Selection): string {
  priceSelection(event, selection);
  const params = new URLSearchParams({ event: event.slug });
  for (const [id, count] of Object.entries(selection)) if (count) params.set(id, String(count));
  return params.toString();
}
export function safeReturn(value: string | null, locale: Locale): string {
  const fallback = `/${locale}/account/`;
  if (!value || !value.startsWith(`/${locale}/`) || value.includes('\\') || /[\r\n]/.test(value)) return fallback;
  try { const url = new URL(value, 'https://orderup.invalid'); return url.origin === 'https://orderup.invalid' && url.pathname.startsWith(`/${locale}/`) ? url.pathname + url.search : fallback; } catch { return fallback; }
}
