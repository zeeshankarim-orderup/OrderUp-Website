import type { NextConfig } from 'next';
const config: NextConfig = {
 trailingSlash: true,
 skipTrailingSlashRedirect: true,
 images: {unoptimized: true},
 async redirects() {
  return [{source: '/', destination: '/ar/', permanent: true}];
 },
};
export default config;
