/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Static export for Cloudflare Pages
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: ['sagastumes.net'],
  },
  // Better URL compatibility
  trailingSlash: true,
  // Reduce bundle size
  productionBrowserSourceMaps: false,
  // Handle Node.js modules in browser
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },
}

module.exports = nextConfig