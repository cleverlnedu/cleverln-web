// Pages a sign-in may return to. Anything else falls back to the default.
const ALLOWED_PREFIXES = ['/dashboard', '/courses', '/profile-complete', '/reset-password', '/opportunities', '/hire'];

export function safeReturnTo(search: string): string | null {
  const candidate = new URLSearchParams(search).get('next');
  if (!candidate || !candidate.startsWith('/') || candidate.includes('\\')) return null;

  try {
    const target = new URL(candidate, 'https://cleverln.invalid');
    if (target.origin !== 'https://cleverln.invalid') return null;
    // Check the normalised path, not the raw input: "/..//evil.com" normalises
    // to "//evil.com", which a browser treats as another website.
    const path = target.pathname;
    if (path.startsWith('//') || path.includes('\\')) return null;
    if (!ALLOWED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return null;
    return `${path}${target.search}${target.hash}`;
  } catch {
    return null;
  }
}

export function withReturnTo(path: string, returnTo: string | null): string {
  if (!returnTo) return path;
  return `${path}?next=${encodeURIComponent(returnTo)}`;
}
