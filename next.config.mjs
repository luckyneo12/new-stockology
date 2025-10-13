/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        "framer-motion",
        "motion",
        "motion-dom",
        "motion-utils",
        "style-value-types",
    ],
    images: {
        domains: ["via.placeholder.com"], // ✅ Allow external images from this domain
    },
    eslint: {
        ignoreDuringBuilds: true, // ✅ Ignore ESLint warnings during build
    },
};

export default nextConfig;
