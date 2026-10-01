import { withReturnTo } from './returnTo';

const PRODUCTION_SITE_URL = 'https://cleverln.com';

/** Build the OAuth callback against the configured canonical site origin. */
export function getAuthCallbackUrl(returnTo: string | null): string {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const isProduction = process.env.NODE_ENV === 'production';
  const fallbackSiteUrl = isProduction ? PRODUCTION_SITE_URL : window.location.origin;
  let siteUrl = configuredSiteUrl || fallbackSiteUrl;

  if (isProduction) {
    try {
      const hostname = new URL(siteUrl).hostname.toLowerCase();
      if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
        siteUrl = PRODUCTION_SITE_URL;
      }
    } catch {
      siteUrl = PRODUCTION_SITE_URL;
    }
  }

  return new URL(withReturnTo('/auth/callback', returnTo), siteUrl).toString();
}
