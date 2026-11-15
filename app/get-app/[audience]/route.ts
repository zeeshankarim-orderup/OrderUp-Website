import {NextRequest,NextResponse} from 'next/server';
import {captainPlatform} from '@/lib/orderup/captain';
import {downloadApps} from '@/lib/orderup/download';

export async function GET(request:NextRequest,{params}:{params:Promise<{audience:string}>}){
 const {audience}=await params;
 if(audience!=='customer'&&audience!=='driver')return new NextResponse('Not found',{status:404});
 const platform=captainPlatform(request.headers.get('user-agent')||'');
 const destination=platform?downloadApps[audience][platform]:new URL(`/ar/?app=${audience}`,request.url);
 const response=NextResponse.redirect(destination,307);
 response.headers.set('Cache-Control','no-store');response.headers.set('Vary','User-Agent');
 return response;
}
