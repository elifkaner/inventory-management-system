import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.2.176:5000/api/:path*',
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
