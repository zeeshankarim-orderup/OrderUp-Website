export const captainStores = {
 android: 'https://play.google.com/store/apps/details?id=com.orderup.captain',
 ios: 'https://apps.apple.com/sa/app/orderup-captain-drive-earn/id6798597573',
} as const;

export const customerStores = {
 android: 'https://play.google.com/store/apps/details?id=com.orderup.main',
 ios: 'https://apps.apple.com/sa/app/orderup-the-super-app/id6802653554',
} as const;

export function captainPlatform(userAgent: string, platform = '', maxTouchPoints = 0): keyof typeof captainStores | null {
 // Preview crawlers and unsupported mobile platforms must keep the landing page.
 if (/bot|crawler|spider|facebookexternalhit|WhatsApp|TelegramBot|Windows Phone/i.test(userAgent)) return null;
 if (/Android/i.test(userAgent)) return 'android';
 if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
 // iPadOS Safari can identify itself as desktop macOS.
 if ((platform === 'MacIntel' || /Macintosh/i.test(userAgent)) && maxTouchPoints > 1) return 'ios';
 return null;
}
