import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// The visitor's city for the Opportunities hero, from the city the hosting platform adds to each request
// (Vercel: x-vercel-ip-city, Cloudflare: cf-ipcity). No browser permission, no third-party lookup.
// Returns { city: null } when the platform doesn't provide one; the page then shows Bangalore.
export function GET(request: NextRequest) {
  const raw = request.headers.get('x-vercel-ip-city') ?? request.headers.get('cf-ipcity') ?? '';
  let city: string | null = null;
  try {
    const decoded = decodeURIComponent(raw).trim();
    if (decoded && decoded.length <= 60 && /^[\p{L}\p{M} .'-]+$/u.test(decoded)) city = decoded;
  } catch {
    city = null;
  }
  return NextResponse.json({ city }, { headers: { 'Cache-Control': 'private, no-store' } });
}
