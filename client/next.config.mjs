/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from ANY https website
      },
      {
        protocol: "http", // Also allow http (some old news sites)
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;