import QRCode from 'qrcode';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir(new URL('../public/qr/',import.meta.url),{recursive:true});
for(const audience of ['customer','driver']){
 const url=`https://orderup.sa/get-app/${audience}/`;
 const svg=await QRCode.toString(url,{type:'svg',errorCorrectionLevel:'M',margin:4,width:224,color:{dark:'#102e31',light:'#ffffff'}});
 await writeFile(new URL(`../public/qr/${audience}.svg`,import.meta.url),svg);
}
