/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/utils', '@repo/hooks'],
};

export default nextConfig;
