/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'i.ytimg.com', 'img.youtube.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
