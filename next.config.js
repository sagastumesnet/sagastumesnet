/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Change output to export for static site generation
  output: 'export',
  // Disable image optimization since Cloudflare Pages doesn't support it
  images: {
    unoptimized: true,
  },
  // Add trailing slash for better compatibility
  trailingSlash: true,
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Ensure Next.js knows it's being deployed to Cloudflare Pages
  env: {
    NEXT_PUBLIC_CLOUDFLARE_PAGES: 'true',
  }
}

module.exports = nextConfig