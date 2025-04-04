// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["cdn.builder.io"],
    unoptimized: process.env.NODE_ENV === "development" ? true : false,
  },
  experimental: {
    esmExternals: true,
  },
  transpilePackages: ["recharts"],
};

export default nextConfig;
