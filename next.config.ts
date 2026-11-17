import type { NextConfig } from 'next';
const config: NextConfig = {
 trailingSlash: true,
 skipTrailingSlashRedirect: true,
 images: {formats: ['image/avif','image/webp']},
 async redirects() {
  return [{source: '/', destination: '/ar/', permanent: true}];
 },
};
export default config;
