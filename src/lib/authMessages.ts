/** Plain-language versions of the auth errors people actually hit. */
export function friendlyAuthError(message: string): string {
  if (/invalid login credentials/i.test(message)) return 'That email and password don’t match. Try again, or reset your password.';
  if (/email not confirmed/i.test(message)) return 'Please confirm your email first — use the link we sent when you signed up.';
  if (/already registered|already been registered|already exists/i.test(message)) return 'An account with this email already exists. Log in instead.';
  if (/password should be at least|weak password/i.test(message)) return 'Use a stronger password with at least 8 characters.';
  if (/rate limit|too many/i.test(message)) return 'Too many attempts. Please wait a minute and try again.';
  if (/failed to fetch|network/i.test(message)) return 'We couldn’t reach the server. Check your connection and try again.';
  if (/code verifier|flow state|auth code|otp_expired|link is invalid|has expired/i.test(message)) {
    return 'This sign-in link has expired or was opened in a different browser. Please log in again from this device.';
  }
  return message;
}

export function isEmailNotConfirmed(message: string) {
  return /email not confirmed/i.test(message);
}

/** Returns an error message, or '' when the phone number looks valid. */
export function phoneNumberError(value: string): string {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, '');
  if (!trimmed) return 'Enter your phone number.';
  if (!/^[+\d\s()-]+$/.test(trimmed) || digits.length < 7 || digits.length > 15) return 'Enter a valid phone number.';
  return '';
}
