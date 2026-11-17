export const DEMO_STORAGE_KEY = 'orderup-ticket-demo-v1';
export type DemoProfile = { name: string; email: string; locale: 'ar' | 'en' };
export type DemoBooking = { id: string; owner: string; token: string; eventSlug: string; selection: Record<string, number>; total: number; quantity: number; createdAt: string; status: 'demo-confirmed' };
export type DemoState = { version: 1; profile: DemoProfile | null; signedIn: boolean; bookings: DemoBooking[] };
export const emptyDemo = (): DemoState => ({ version: 1, profile: null, signedIn: false, bookings: [] });
export function parseDemo(raw: string | null): DemoState {
  if (!raw) return emptyDemo();
  const data = JSON.parse(raw) as DemoState;
  if (data.version !== 1 || typeof data.signedIn !== 'boolean' || !Array.isArray(data.bookings) || data.bookings.length > 100) throw new Error('Invalid demo storage');
  if (data.profile && (typeof data.profile.name !== 'string' || data.profile.name.length > 80 || typeof data.profile.email !== 'string' || data.profile.email.length > 120 || !['en', 'ar'].includes(data.profile.locale))) throw new Error('Invalid profile');
  if (data.signedIn && !data.profile) throw new Error('Invalid session');
  for (const booking of data.bookings) {
    if (!/^DEMO-[a-zA-Z0-9-]+$/.test(booking.id) || typeof booking.owner !== 'string' || typeof booking.token !== 'string' || typeof booking.eventSlug !== 'string' || booking.status !== 'demo-confirmed' || !booking.selection || typeof booking.selection !== 'object' || Array.isArray(booking.selection) || Object.values(booking.selection).some(n => !Number.isInteger(n) || n < 0 || n > 6) || !Number.isSafeInteger(booking.total) || booking.total < 0 || !Number.isInteger(booking.quantity) || booking.quantity < 1 || booking.quantity > 6 || !Number.isFinite(Date.parse(booking.createdAt))) throw new Error('Invalid booking');
  }
  return data;
}
export function addDemoBooking(state: DemoState, booking: DemoBooking): DemoState {
  if (!state.signedIn || !state.profile || booking.owner !== state.profile.email) throw new Error('Demo sign-in required');
  if (state.bookings.some(item => item.token === booking.token && item.owner === booking.owner)) return state;
  if (state.bookings.length >= 100) throw new Error('Demo history is full');
  return { ...state, bookings: [booking, ...state.bookings] };
}
export function profileErrors(name: string, email: string, ar: boolean): Record<string, string> {
  const errors: Record<string, string> = {};
  if (name.trim().length < 2 || name.trim().length > 80) errors.name = ar ? 'أدخل اسمًا توضيحيًا من حرفين إلى ٨٠ حرفًا.' : 'Enter a sample name of 2–80 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) errors.email = ar ? 'أدخل بريدًا بصيغة صحيحة، مثل demo@example.com.' : 'Use an email format such as demo@example.com.';
  return errors;
}
export type DemoChallenge = { name: string; email: string; expires: number; attempts: number };
export function readDemoChallenge(raw: string | null, now = Date.now()): DemoChallenge {
  if (!raw) throw new Error('Missing demo challenge');
  const challenge = JSON.parse(raw) as DemoChallenge;
  if (!challenge || typeof challenge.name !== 'string' || typeof challenge.email !== 'string' || !Number.isFinite(challenge.expires) || challenge.expires <= now || !Number.isInteger(challenge.attempts) || challenge.attempts < 0 || challenge.attempts >= 5 || Object.keys(profileErrors(challenge.name, challenge.email, false)).length) throw new Error('Invalid or expired demo challenge');
  return challenge;
}
export function normalizeDemoCode(value: string): string {
  return value.replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x660)).replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x6f0)).replace(/[^0-9]/g, '').slice(0, 6);
}
