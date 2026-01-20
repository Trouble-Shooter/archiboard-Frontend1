/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable type checking during build (Vercel has limited resources)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Prevent image optimization issues
  },
  // Reduce memory usage
  swcMinify: true,
};

module.exports = nextConfig;
