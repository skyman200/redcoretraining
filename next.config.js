/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable Turbopack to avoid issues with Korean characters in path
    experimental: {
        turbopack: false,
    },
};

export default nextConfig;
