import { Navbar } from '@/components/orderup/navigation';
import { Footer } from '@/components/orderup/landing';
export default async function MarketLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
 const {locale}=await params;
 return <><Navbar ar={locale==='ar'} page="tickets"/><main id="main" className="container market-page">{children}</main><Footer ar={locale==='ar'} compact/></>;
}

