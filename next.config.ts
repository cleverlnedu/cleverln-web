import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const SUPABASE = "qiavthkkhjldpjcpkdze.supabase.co";

// Next.js renders inline scripts on every page, so scripts need 'unsafe-inline'
// unless every page is rendered per request with a nonce. Keeping the pages
// static, the policy instead limits where code can load from and send data to:
// scripts only from this site, network requests only to Supabase, no framing.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://${SUPABASE} https://*.googleusercontent.com`,
  "font-src 'self' data:",
  `connect-src 'self' https://${SUPABASE} wss://${SUPABASE}${isDev ? " ws: http://localhost:*" : ""}`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  // LAN addresses used to open the dev server from phones (hostnames only, no scheme or port).
  allowedDevOrigins: ["10.168.49.221", "10.67.121.221"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: SUPABASE,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
