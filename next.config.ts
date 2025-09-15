import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['grand-production.up.railway.app'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'grand-production.up.railway.app',
        port: '',
        pathname: '/media/**',
      },
      // Agar https ham kerak bo'lsa:
      {
        protocol: 'https',
        hostname: 'grand-production.up.railway.app',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;