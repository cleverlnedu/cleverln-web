/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: process.cwd() },
  allowedDevOrigins: ['10.168.49.221'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qiavthkkhjldpjcpkdze.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
