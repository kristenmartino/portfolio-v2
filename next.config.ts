import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/app/_og/*.ttf"],
    "/work-with-me/opengraph-image": ["./src/app/_og/*.ttf"],
    "/work/*/opengraph-image": ["./src/app/_og/*.ttf"],
  },
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
