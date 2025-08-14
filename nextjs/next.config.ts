import withPWA from 'next-pwa';
import { NextConfig } from 'next';

// Next.js config
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // important for App Router
  },
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

// PWA config
const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== 'production',
  cacheOnFrontEndNav: true,
  fallbacks: {
    document: '/offline.html',
  },
};

// Correct export
export default withPWA(pwaConfig)(nextConfig);
