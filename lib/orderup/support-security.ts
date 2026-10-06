import {createHmac, createHash, randomBytes, randomInt, timingSafeEqual} from 'node:crypto';

const TTL = 15 * 60 * 1000;
export function signChallenge(secret: string, now = Date.now()) {
 const a = randomInt(1, 10), b = randomInt(1, 10);
 const payload = `${now}.${randomBytes(16).toString('hex')}.${a}.${b}`;
 const signature = createHmac('sha256', secret).update(`orderup-support:${payload}`).digest('hex');
 return {token: `${payload}.${signature}`, a, b};
}
export function verifyChallenge(token: string, answer: string, secret: string, now = Date.now()) {
 const parts = token.split('.');
 if (parts.length !== 5 || !/^\d{13}$/.test(parts[0]) || !/^[a-f0-9]{32}$/.test(parts[1]) || !/^[1-9]$/.test(parts[2]) || !/^[1-9]$/.test(parts[3]) || !/^[a-f0-9]{64}$/.test(parts[4])) return false;
 const expected = createHmac('sha256', secret).update(`orderup-support:${parts.slice(0,4).join('.')}`).digest();
 if (!timingSafeEqual(expected, Buffer.from(parts[4], 'hex'))) return false;
 const age = now - Number(parts[0]);
 return age >= 2000 && age <= TTL && Number(answer) === Number(parts[2]) + Number(parts[3]);
}
export function fingerprint(value: string) {return createHash('sha256').update(value).digest('hex');}

// Bounded, best-effort limits per warm server instance. Signed challenges,
// same-origin checks, body limits and a honeypot also apply across instances.
// For larger traffic volumes, add a shared limiter or Vercel WAF rate rule.
export function createLimiter(maxEntries = 5000) {
 const buckets = new Map<string, {count: number; expires: number}>();
 return (key: string, limit: number, now = Date.now()) => {
  for (const [id,bucket] of buckets) if (bucket.expires <= now) buckets.delete(id);
  let bucket = buckets.get(key);
  if (!bucket) {
   if (buckets.size >= maxEntries) return false;
   bucket = {count: 0, expires: now + TTL}; buckets.set(key,bucket);
  }
  if (bucket.count >= limit) return false;
  bucket.count++; return true;
 };
}
export const takeLimit = createLimiter();
