import 'server-only';
import nodemailer from 'nodemailer';
import {z} from 'zod';
import {categoryLabels, type SupportInput} from './support-schema';

const smtpSchema = z.object({
 SMTP_HOST: z.string().trim().min(1).refine(v => !/[\s/]/.test(v)),
 SMTP_PORT: z.coerce.number().int().min(1).max(65535),
 SMTP_USER: z.string().trim().min(1), SMTP_PASSWORD: z.string().min(1),
 SMTP_FROM: z.string().trim().email(), SUPPORT_EMAIL: z.literal('support@orderup.sa'),
 SMTP_SECURE: z.enum(['true','false']),
});
export function getSmtpConfig() {
 const parsed = smtpSchema.safeParse({
  SMTP_HOST: process.env.SMTP_HOST, SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER, SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM: process.env.SMTP_FROM, SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
  SMTP_SECURE: process.env.SMTP_SECURE,
 });
 if (!parsed.success || Object.values(parsed.data).includes('[SENSITIVE]')) throw new Error('SMTP_CONFIG');
 if (parsed.data.SMTP_FROM !== 'support@orderup.sa') throw new Error('SMTP_SENDER');
 if ((parsed.data.SMTP_PORT === 465 && parsed.data.SMTP_SECURE !== 'true') || (parsed.data.SMTP_PORT === 587 && parsed.data.SMTP_SECURE !== 'false')) throw new Error('SMTP_TLS');
 return parsed.data;
}
export async function sendSupportMail(data: SupportInput, reference: string) {
 const env = getSmtpConfig();
 const transport = nodemailer.createTransport({
  host: env.SMTP_HOST, port: env.SMTP_PORT, secure: env.SMTP_SECURE === 'true',
  requireTLS: env.SMTP_SECURE !== 'true', tls: {minVersion: 'TLSv1.2', rejectUnauthorized: true},
  auth: {user: env.SMTP_USER, pass: env.SMTP_PASSWORD},
  connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
  disableFileAccess: true, disableUrlAccess: true,
 });
 try {
  const result = await transport.sendMail({
   from: {name: 'OrderUp Support', address: env.SMTP_FROM}, to: env.SUPPORT_EMAIL,
   replyTo: {name: 'OrderUp Support', address: env.SUPPORT_EMAIL},
   subject: `[OrderUp Support · ${reference}] ${categoryLabels[data.category][0]}: ${data.subject}`,
   text: `OrderUp website support request\nReference: ${reference}\n\nName: ${data.name}\nCustomer email: ${data.email}\nCategory: ${categoryLabels[data.category][0]}\nSubject: ${data.subject}\nLanguage: ${data.locale}\n\n${data.message}\n\nRespond to the customer email listed above. This message was submitted through the public OrderUp support form.`,
  });
  if (!result.accepted.some(address => String(address).toLowerCase() === env.SUPPORT_EMAIL)) throw new Error('SMTP_NOT_ACCEPTED');
 } finally {transport.close();}
}
