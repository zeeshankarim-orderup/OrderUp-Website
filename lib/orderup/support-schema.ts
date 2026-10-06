import {z} from 'zod';

export const categories = ['app', 'account', 'payments', 'rides-orders', 'other'] as const;
export const categoryLabels = {
 app: ['App issues', 'مشكلات التطبيق'], account: ['Account help', 'المساعدة في الحساب'],
 payments: ['Payments & refunds', 'المدفوعات والاسترداد'], 'rides-orders': ['Rides & orders', 'المشاوير والطلبات'], other: ['Other assistance', 'مساعدة أخرى'],
} as const;
const singleLine = (min: number, max: number) => z.string().trim().min(min).max(max).refine(value => !/[\r\n\u0000-\u001f\u007f]/.test(value));
export const supportSchema = z.object({
 name: singleLine(2, 100), email: singleLine(3, 254).pipe(z.string().email()),
 category: z.enum(categories), subject: singleLine(3, 150),
 message: z.string().trim().min(20).max(5000).refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)),
 website: z.string().max(200).default(''), token: z.string().min(1).max(512),
 answer: z.string().trim().regex(/^\d{1,2}$/), locale: z.enum(['ar','en']),
}).strict();
export type SupportInput = z.infer<typeof supportSchema>;
