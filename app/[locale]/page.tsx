import {Landing} from '@/components/orderup/landing';
export const metadata = {other: {'page-type': 'software', 'site-kind': 'software'}};
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;return <Landing ar={locale==='ar'}/>}
