import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
  theme: {
    extend: {
      screens: {
        xxl: "1540px",
      },
    },
  },
};

export default nextConfig;
