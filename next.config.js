/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/posts/:slug/:image',
        destination: '/api/posts-image/:slug/:image',
      },
    ]
  },
}

module.exports = nextConfig
