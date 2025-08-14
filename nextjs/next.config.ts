// // next.config.js
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV !== 'production',
//   cacheOnFrontEndNav: true,
//   fallbacks: {
//     document: '/offline.html'
//   }
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['www.themealdb.com']
//   },
//   eslint: {
//     ignoreDuringBuilds: true
//   },
//   typescript: {
//     ignoreBuildErrors: true
//   }
// };

// module.exports = withPWA(nextConfig);
// next.config.ts
import withPWA from 'next-pwa';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.themealdb.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV !== 'production',
    cacheOnFrontEndNav: true,
    fallbacks: {
      document: '/offline.html',
    },
  },
});
