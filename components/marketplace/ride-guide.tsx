'use client';

import { useState } from 'react';
import { Route, HandCoins, UserRound, ArrowDown, ArrowUpRight } from 'lucide-react';
import { AppLink } from '@/components/orderup/download-dialog';
import type { Locale } from '@/lib/ticketing/catalog';

export function RideGuide({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const [active, setActive] = useState(0);
  const steps = [
    {
      Icon: Route,
      title: t('Set your route', 'حدد مسارك'),
      description: t('Choose where to get picked up and where you want to go. The app shows the vehicle categories available for your request.', 'اختر نقطة الانطلاق والوجهة. يعرض لك التطبيق فئات السيارات المتاحة لطلبك.'),
      fields: [t('Pickup point', 'نقطة الانطلاق'), t('Destination', 'الوجهة')],
    },
    {
      Icon: HandCoins,
      title: t('Suggest a fare', 'اقترح السعر'),
      description: t('Enter the fare you want to offer. Nearby drivers can respond through the app, where you’ll see their offers.', 'أدخل السعر الذي ترغب في عرضه. يمكن للسائقين القريبين الرد، وستظهر عروضهم في التطبيق.'),
      fields: [t('Your suggested fare', 'السعر الذي تقترحه'), t('Driver offers', 'عروض السائقين')],
    },
    {
      Icon: UserRound,
      title: t('Choose your ride', 'اختر مشوارك'),
      description: t('Review the offers you receive and the driver and vehicle details. Choose the one that works for you and confirm in the app.', 'راجع العروض التي تصلك وتفاصيل السائق والسيارة. اختر العرض المناسب وأكّد في التطبيق.'),
      fields: [t('Compare offers', 'قارن العروض'), t('Confirm in the app', 'أكّد من التطبيق')],
    },
  ];
  const step = steps[active];

  return (
    <div className="voyage-ride-guide">
      <div className="voyage-guide-steps" role="group" aria-label={t('Ride request steps', 'خطوات طلب المشوار')}>
        {steps.map(({ Icon, title }, index) => (
          <button key={title} type="button" aria-pressed={index === active} aria-controls="voyage-guide-detail" onClick={() => setActive(index)}>
            <Icon size={23} aria-hidden="true" />{title}<ArrowUpRight size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="voyage-guide-detail" id="voyage-guide-detail">
        <div className="voyage-guide-path" key={step.title} aria-hidden="true">
          <span><step.Icon size={19} />{step.fields[0]}</span>
          <ArrowDown size={16} />
          <span><span className="voyage-guide-dot" />{step.fields[1]}</span>
        </div>
        <div aria-live="polite" aria-atomic="true">
          <h3>{step.title}</h3><p>{step.description}</p>
        </div>
        <AppLink className="voyage-inline" href={`/${locale}/download/`}>{t('Request in the app', 'اطلب من التطبيق')}<ArrowUpRight size={18} aria-hidden="true" /></AppLink>
      </div>
    </div>
  );
}
