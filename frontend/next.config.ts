/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '714e50aa-8d8643a0-1bd4-46a8-a088-e77845dd8cbb.s3.twcstorage.ru',
        pathname: '/**',
      },
    ],
    // Remove the deprecated 'domains' property as it's replaced by remotePatterns
    minimumCacheTTL: 60, // Optional: Cache images for 60 seconds
  },
  // Remove experimental.allowedDevOrigins as it's not needed for this issue
}

module.exports = nextConfig