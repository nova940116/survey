/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/survey/:path*',
        destination: 'https://h0p76izfrj.execute-api.ap-northeast-2.amazonaws.com/survey/:path*'
      }
    ]
  },
  env: {
    SECRET: process.env.SECRET
  }
}

module.exports = nextConfig
