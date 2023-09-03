/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["t1.daumcdn.net", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
