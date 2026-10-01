/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: process.cwd() },
  allowedDevOrigins: ['10.168.49.221'],
};

module.exports = nextConfig;
