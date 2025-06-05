/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    experimental: {
        allowedDevOrigins: ['https://muroway.ru'],
    },
}

module.exports = nextConfig
