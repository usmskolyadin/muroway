/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    experimental: {
        allowedDevOrigins: ['https://muroway.ru'],
    },
    images: {
        domains: ['714e50aa-8d8643a0-1bd4-46a8-a088-e77845dd8cbb.s3.twcstorage.ru'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '714e50aa-8d8643a0-1bd4-46a8-a088-e77845dd8cbb.s3.twcstorage.ru',
                pathname: '/**',
            },
        ],  
    },
      
}

module.exports = nextConfig
