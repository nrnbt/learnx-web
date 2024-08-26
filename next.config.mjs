/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    LEARNX_OPEN_EDX_URL: process.env.LEARNX_OPEN_EDX_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lms.learnx.mn',
        pathname: '**'
      }
    ]
  }
}

export default nextConfig
