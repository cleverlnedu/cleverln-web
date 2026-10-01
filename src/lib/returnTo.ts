export function safeReturnTo(search: string): string | null {
  const candidate = new URLSearchParams(search).get('next');
  if (!candidate || !candidate.startsWith('/') || candidate.startsWith('//') || candidate.includes('\\')) return null;

  try {
    const target = new URL(candidate, 'https://cleverln.invalid');
    if (target.origin !== 'https://cleverln.invalid' || target.pathname === '/auth/callback') return null;
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return null;
  }
}

export function withReturnTo(path: string, returnTo: string | null): string {
  if (!returnTo) return path;
  return `${path}?next=${encodeURIComponent(returnTo)}`;
}
