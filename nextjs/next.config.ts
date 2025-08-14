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
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== 'production',
  cacheOnFrontEndNav: true,
  fallbacks: {
    document: '/offline.html',
  },
  // Merge Next.js config separately
  ...nextConfig,
});
