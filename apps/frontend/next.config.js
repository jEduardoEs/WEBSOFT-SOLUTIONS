/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@jeduardoes/shared'],
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
