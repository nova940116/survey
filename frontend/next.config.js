/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if(process.env.NODE_ENV !== 'production') {
      return [
        {
          destination: 'http://localhost:3000/:path*',
          source: '/server/:path*',
        },
      ]
    } else {
      return []
    }
  },
}

module.exports = nextConfig
