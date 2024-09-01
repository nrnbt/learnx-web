/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    LEARNX_OPEN_EDX_URL: process.env.LEARNX_OPEN_EDX_URL,
    LEARNX_OPEN_EDX_CLIENT_ID: process.env.LEARNX_OPEN_EDX_CLIENT_ID,
    LEARNX_OPEN_EDX_CLIENT_SECRET: process.env.LEARNX_OPEN_EDX_CLIENT_SECRET
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
