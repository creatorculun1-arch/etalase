import type { NextConfig } from "next";
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Add this wrapper if the code is running in a dev environment.
if (process.env.NODE_ENV === 'development') {
  setupDevPlatform();
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};

export default nextConfig;
