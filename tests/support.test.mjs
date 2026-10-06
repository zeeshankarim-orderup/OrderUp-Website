import test from 'node:test';
import assert from 'node:assert/strict';
import {supportSchema} from '../lib/orderup/support-schema.ts';
import {signChallenge,verifyChallenge,createLimiter} from '../lib/orderup/support-security.ts';

const secret='test-only-secret';
const now=1800000000000;
const valid={name:'Test User',email:'test@example.com',category:'app',subject:'Application issue',message:'The application stops when I try to open my order.',website:'',token:'test',answer:'2',locale:'en'};
test('accepts Arabic content and trims surrounding whitespace',()=>{
 const parsed=supportSchema.parse({...valid,name:'  مستخدم تجريبي  ',subject:'مشكلة في التطبيق',message:'توجد مشكلة في فتح التطبيق عند عرض تفاصيل الطلب.'});
 assert.equal(parsed.name,'مستخدم تجريبي');
});
test('rejects invalid, missing, oversized and injection fields',()=>{
 for(const mutation of [{name:''},{email:'not-email'},{email:'test@example.com\r\nBcc:spam@example.com'},{name:'User\nBcc:spam'},{subject:'Issue\r\nBcc:spam'},{category:'invented'},{message:'short'},{message:'a'.repeat(5001)},{subject:'a'.repeat(151)},{locale:'xx'},{name:5},{to:'victim@example.com'}]) assert.equal(supportSchema.safeParse({...valid,...mutation}).success,false,JSON.stringify(mutation).slice(0,80));
});
test('challenge rejects tampering, wrong answer, premature and expired requests',()=>{
 const c=signChallenge(secret,now), answer=String(c.a+c.b);
 assert.equal(verifyChallenge(c.token,answer,secret,now+3000),true);
 for(const [token,response,key,time] of [[c.token,'0',secret,now+3000],[c.token,answer,'wrong-secret',now+3000],[c.token,answer,secret,now],[c.token,answer,secret,now+900001],[c.token+'x',answer,secret,now+3000],['malformed',answer,secret,now+3000]]) assert.equal(verifyChallenge(token,response,key,time),false);
});
test('limits bursts, isolates keys, expires buckets and bounds memory',()=>{
 const take=createLimiter(2);
 assert.equal(take('one',2,now),true); assert.equal(take('one',2,now),true); assert.equal(take('one',2,now),false);
 assert.equal(take('two',1,now),true); assert.equal(take('three',1,now),false);
 assert.equal(take('one',2,now+900001),true);
});
