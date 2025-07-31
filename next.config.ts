import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

export default nextConfig;
