/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      't1.daumcdn.net',
      'firebasestorage.googleapis.com',
      't4.ftcdn.net'
    ]
  }
}

module.exports = nextConfig
