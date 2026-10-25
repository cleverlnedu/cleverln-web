// One Supabase sign-in shared by cleverln.com and lms.cleverln.com.
// The session lives in cookies scoped to the parent domain (.cleverln.com), so
// both sites read the same session: signing in or out on one applies to both.
// On localhost the cookies are host-only, and browsers share them across ports,
// so the website (:3000) and the LMS (:3001) share the session locally too.
// The LMS has a copy of this file (src/services/sharedSession.js): keep them in step.

const SHARED_DOMAIN = 'cleverln.com';
const REMEMBER_COOKIE = 'cleverln_auth_remember';
const CHUNK_LENGTH = 3000; // keeps each cookie under the browser's ~4 KB limit
const MAX_AGE_SECONDS = 400 * 24 * 60 * 60; // the longest lifetime browsers allow
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const inBrowser = () => typeof document !== 'undefined';

function cookieAttributes(maxAgeSeconds?: number) {
  const host = window.location.hostname;
  const shared = host === SHARED_DOMAIN || host.endsWith(`.${SHARED_DOMAIN}`);
  return [
    'Path=/',
    'SameSite=Lax',
    shared ? `Domain=.${SHARED_DOMAIN}` : '',
    window.location.protocol === 'https:' ? 'Secure' : '',
    maxAgeSeconds === undefined ? '' : `Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`,
  ].filter(Boolean).join('; ');
}

function readCookies(): Map<string, string> {
  const cookies = new Map<string, string>();
  for (const part of document.cookie.split(';')) {
    const index = part.indexOf('=');
    if (index > 0) cookies.set(part.slice(0, index).trim(), part.slice(index + 1).trim());
  }
  return cookies;
}

/** Auth cookie lifetime from the "Remember for 30 days" choice; undefined = ends when the browser closes. */
function sessionMaxAge(): number | undefined {
  const preference = readCookies().get(REMEMBER_COOKIE);
  if (preference === 'browser') return undefined;
  const until = Number(preference?.match(/^until:(\d+)$/)?.[1]);
  return until ? (until - Date.now()) / 1000 : MAX_AGE_SECONDS;
}

function writeCookie(name: string, value: string, maxAgeSeconds?: number) {
  document.cookie = `${name}=${value}; ${cookieAttributes(maxAgeSeconds)}`;
}

function chunkNames(key: string, cookies: Map<string, string>) {
  return [...cookies.keys()].filter((name) => name === key || name.startsWith(`${key}.`));
}

function removeItem(key: string) {
  if (!inBrowser()) return;
  for (const name of chunkNames(key, readCookies())) writeCookie(name, '', 0);
}

function setItem(key: string, value: string) {
  if (!inBrowser()) return;
  removeItem(key);
  const encoded = encodeURIComponent(value);
  const maxAge = sessionMaxAge();
  if (encoded.length <= CHUNK_LENGTH) {
    writeCookie(key, encoded, maxAge);
    return;
  }
  for (let index = 0; index * CHUNK_LENGTH < encoded.length; index += 1) {
    writeCookie(`${key}.${index}`, encoded.slice(index * CHUNK_LENGTH, (index + 1) * CHUNK_LENGTH), maxAge);
  }
}

function getItem(key: string): string | null {
  if (!inBrowser()) return null;
  const cookies = readCookies();
  let encoded = cookies.get(key) ?? null;
  if (encoded === null && cookies.has(`${key}.0`)) {
    encoded = '';
    for (let index = 0; cookies.has(`${key}.${index}`); index += 1) encoded += cookies.get(`${key}.${index}`);
  }
  // Sign-ins made before the session moved to cookies were kept in this site's localStorage.
  let legacy: string | null = null;
  try {
    legacy = window.localStorage.getItem(key);
    if (legacy !== null) window.localStorage.removeItem(key);
  } catch {
    // Storage blocked: nothing to carry over.
  }
  if (encoded !== null) return decodeURIComponent(encoded);
  if (legacy !== null) setItem(key, legacy);
  return legacy;
}

/** Supabase `auth.storage` adapter that keeps the session in the shared cookies. */
export const sharedSessionStorage = { getItem, setItem, removeItem };

// "Remember for 30 days" on the login page. Checked: the sign-in lasts 30 days.
// Unchecked: it ends when the browser is closed. Both sites honour the choice.
export function setRememberPreference(remember: boolean) {
  if (!inBrowser()) return;
  const until = Date.now() + THIRTY_DAYS_MS;
  writeCookie(REMEMBER_COOKIE, remember ? `until:${until}` : 'browser', remember ? THIRTY_DAYS_MS / 1000 : undefined);
  // Re-issue any session cookies already written so they take the new lifetime.
  const maxAge = sessionMaxAge();
  for (const [name, value] of readCookies()) if (name.startsWith('sb-')) writeCookie(name, value, maxAge);
}

export function clearRememberPreference() {
  if (inBrowser()) writeCookie(REMEMBER_COOKIE, '', 0);
}
