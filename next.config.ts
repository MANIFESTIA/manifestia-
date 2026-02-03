import type { NextConfig } from "next";

// Deployment Fix Trigger: 2026-02-03



const nextConfig: NextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
