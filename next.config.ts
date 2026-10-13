const nextConfig = {
  allowedDevOrigins: [
    "http://10.67.121.221:3000",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qiavthkkhjldpjcpkdze.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;


