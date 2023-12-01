/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  server: {
    port: process.env.PORT || 3001,
  },
}

module.exports = nextConfig
