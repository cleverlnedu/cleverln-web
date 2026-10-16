// "Remember for 30 days" on the login page.
// Checked: the sign-in lasts 30 days. Unchecked: it ends when the browser is closed
// (tracked with a cookie that has no expiry, which the browser drops on close).
// Sign-ins made before this existed have no preference and keep working as before.

const PREFERENCE_KEY = 'cleverln:auth-remember';
const BROWSER_SESSION_COOKIE = 'cleverln_auth_alive';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

type RememberPreference = { mode: 'days'; until: number } | { mode: 'browser' };

export function setRememberPreference(remember: boolean) {
  try {
    const preference: RememberPreference = remember ? { mode: 'days', until: Date.now() + THIRTY_DAYS_MS } : { mode: 'browser' };
    localStorage.setItem(PREFERENCE_KEY, JSON.stringify(preference));
    document.cookie = `${BROWSER_SESSION_COOKIE}=1; path=/; SameSite=Lax`;
  } catch {
    // Without storage the sign-in simply behaves as before.
  }
}

export function clearRememberPreference() {
  try {
    localStorage.removeItem(PREFERENCE_KEY);
  } catch {
    // Nothing stored.
  }
}

/** True when the saved preference says this sign-in should no longer be kept. */
export function isRememberedSessionExpired(): boolean {
  try {
    const raw = localStorage.getItem(PREFERENCE_KEY);
    if (!raw) return false;
    const preference = JSON.parse(raw) as RememberPreference;
    if (preference.mode === 'browser') {
      return !document.cookie.split(';').some((part) => part.trim().startsWith(`${BROWSER_SESSION_COOKIE}=`));
    }
    return typeof preference.until === 'number' && Date.now() > preference.until;
  } catch {
    return false;
  }
}
