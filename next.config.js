/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.moralis.io',
        port: '',
        pathname: '/eth/**',
      },
    ],
  },
}

module.exports = nextConfig
