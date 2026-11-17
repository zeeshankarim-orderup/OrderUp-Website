'use client';
import {useParams} from 'next/navigation';
export default function NotFound(){const ar=useParams().locale==='ar';return <div className="market-empty"><h1>{ar?'لم نجد هذه الفعالية':'We couldn’t find that event'}</h1><p>{ar?'قد يكون الرابط غير صحيح. اكتشف الفعاليات التوضيحية المتاحة.':'The link may be incorrect. Explore the available demonstration events.'}</p><a className="market-button" href={`/${ar?'ar':'en'}/tickets/`}>{ar?'اكتشف الفعاليات':'Explore events'}</a></div>}
