import {captainStores, customerStores} from './captain';
export const config = {
 APP_STORE_URL: customerStores.ios, GOOGLE_PLAY_URL: customerStores.android, DRIVER_APP_URL: '/captain', PROVIDER_APP_URL: '', CONTACT_EMAIL: '',
 partnerApps: {
  driver: captainStores,
  providers: {ios: '', android: ''},
 },
 social: {Instagram:'',TikTok:'',X:'',Facebook:'',LinkedIn:''},
 images: {home:'/screenshots/ios/home.jpeg',rides:'/screenshots/rides.jpeg',services:'/screenshots/ios/services.jpeg',activities:'/screenshots/activities.jpeg',homeService:'/images/home-service.webp',gifts:'/images/gifts.webp'}
} as const;
