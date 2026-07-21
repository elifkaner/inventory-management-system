import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Öncelikli olarak .env.local'e bakar, bulamazsa yedeği (176) kullanır
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/:path*`,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;