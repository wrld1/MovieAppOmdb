// const apiProxy = require("./apiProxy");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
    minimumCacheTTL: 1500000,
  },
  env: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  },
  serverRuntimeConfig: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  },
  publicRuntimeConfig: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  },
};

module.exports = nextConfig;

// serverMiddleware: [apiProxy],
