import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/kebijakan-pribadi",
        destination: "/kebijakan-privasi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
