/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/utils", "@repo/hooks"],
  async rewrites() {
    return [
      {
        source: "/static/storage/:path*",
        destination:
          "https://stg-crm-client-edge.finpoints.tech/static/storage/:path*",
      },
    ];
  },
};

export default nextConfig;
