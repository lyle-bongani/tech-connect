import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: [], // Add any image domains you need to use with next/image
    unoptimized: false,
  },
  poweredByHeader: false,
  // Enable static optimization where possible
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
