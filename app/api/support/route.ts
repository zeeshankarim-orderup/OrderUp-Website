import {randomUUID} from 'node:crypto';
import {NextRequest, NextResponse} from 'next/server';
import {supportSchema} from '@/lib/orderup/support-schema';
import {fingerprint, signChallenge, takeLimit, verifyChallenge} from '@/lib/orderup/support-security';
import {getSmtpConfig, sendSupportMail} from '@/lib/orderup/support-mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
const headers = {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'};
const json = (body: object, status = 200) => NextResponse.json(body, {status, headers});
function clientKey(request: NextRequest) {
 const ip = process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for') || 'unknown' : 'local';
 return fingerprint(ip.split(',')[0].trim());
}
function sameOrigin(request: NextRequest) {
 return request.headers.get('origin') === request.nextUrl.origin && request.headers.get('sec-fetch-site') !== 'cross-site';
}
async function limitedBody(request: Request) {
 if (Number(request.headers.get('content-length')) > 24000) throw new Error('BODY_TOO_LARGE');
 const reader = request.body?.getReader(); if (!reader) throw new Error('INVALID_BODY');
 const chunks: Uint8Array[] = []; let length = 0;
 try {
  while (true) {
   const {done,value} = await reader.read(); if (done) break;
   length += value.length;
   if (length > 24000) {await reader.cancel(); throw new Error('BODY_TOO_LARGE');}
   chunks.push(value);
  }
 } finally {reader.releaseLock();}
 return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export async function GET(request: NextRequest) {
 if (request.headers.get('sec-fetch-site') === 'cross-site') return json({code: 'ORIGIN'},403);
 if (!takeLimit(`challenge:${clientKey(request)}`,30)) return json({code:'RATE_LIMIT'},429);
 try {
  const challenge = signChallenge(getSmtpConfig().SMTP_PASSWORD);
  const response = json(challenge);
  response.cookies.set('orderup-support', fingerprint(challenge.token), {httpOnly:true, secure:request.nextUrl.protocol === 'https:', sameSite:'strict', path:'/api/support', maxAge:900});
  return response;
 } catch {return json({code:'UNAVAILABLE'},503);}
}
export async function POST(request: NextRequest) {
 if (!sameOrigin(request)) return json({code:'ORIGIN'},403);
 if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json({code:'CONTENT_TYPE'},415);
 if (!takeLimit(`attempt:${clientKey(request)}`,10)) return json({code:'RATE_LIMIT'},429);
 let body: unknown;
 try {body = await limitedBody(request);} catch (error) {return json({code:'INVALID_BODY'}, error instanceof Error && error.message === 'BODY_TOO_LARGE' ? 413 : 400);}
 const parsed = supportSchema.safeParse(body);
 if (!parsed.success) return json({code:'VALIDATION', fields:parsed.error.flatten().fieldErrors},400);
 const data = parsed.data;
 if (data.website) return json({code:'SPAM'},400);
 let secret: string;
 try {secret = getSmtpConfig().SMTP_PASSWORD;} catch {return json({code:'UNAVAILABLE'},503);}
 if (request.cookies.get('orderup-support')?.value !== fingerprint(data.token) || !verifyChallenge(data.token,data.answer,secret)) return json({code:'CHALLENGE'},400);
 if (!takeLimit(`send:${clientKey(request)}`,5) || !takeLimit(`email:${fingerprint(data.email.toLowerCase())}`,3)) return json({code:'RATE_LIMIT'},429);
 if (!takeLimit(`token:${fingerprint(data.token)}`,1)) return json({code:'CHALLENGE'},400);
 const reference = randomUUID();
 try {await sendSupportMail(data,reference); return json({ok:true,reference});}
 catch (error) {
  // Do not log SMTP responses, credentials, addresses, or message content.
  const code = typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : 'DELIVERY_FAILED';
  console.error('Support delivery failed', {reference,code:['EAUTH','ECONNECTION','ETIMEDOUT','ESOCKET','EENVELOPE'].includes(code)?code:'DELIVERY_FAILED'});
  return json({code:'DELIVERY_FAILED',reference},502);
 }
}
