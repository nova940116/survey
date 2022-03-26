/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if(process.env.NODE_ENV === 'production') {
      return [
        {
          source: 'https://survey.novauniverse.me/survey/:path*',
          destination: 'https://h0p76izfrj.execute-api.ap-northeast-2.amazonaws.com/:path*'
        }
      ]
    } else {
      return []
    }
  },
  env: {
    SECRET: process.env.SECRET
  }
}

module.exports = nextConfig
