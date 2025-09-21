import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/dcqhf0pnu/**")],
  },
};

export default nextConfig;
