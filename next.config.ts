import type { NextConfig } from "next";

// Deployment Fix Trigger: 2026-02-03



const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true, // Use SWC for minification
  workboxOptions: {
    disableDevLogs: true,
  },
});

const isMobile = process.env.CAPACITOR_BUILD === 'true';

const nextConfig: NextConfig = {
  output: isMobile ? 'export' : undefined,
  images: {
    unoptimized: isMobile,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withPWA(nextConfig);
