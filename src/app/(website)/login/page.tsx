"use client";

import { friendlyAuthError, isEmailNotConfirmed } from '@/lib/authMessages';
import { getAuthCallbackUrl } from '@/lib/authRedirect';
import { syncLmsProfile } from '@/lib/profileSync';
import { setRememberPreference } from '@/lib/sharedSession';
import { safeReturnTo, withReturnTo } from '@/lib/returnTo';
import { supabase } from '@/lib/supabase';
import AuthLayout from '@/components/website/Auth/AuthLayout';
import GoogleIcon from '@/components/website/Auth/GoogleIcon';
import PasswordField from '@/components/website/Auth/PasswordField';
import { useAuthMood } from '@/components/website/Auth/useAuthMood';
import styles from '@/components/website/Auth/Auth.module.css';
import { useAuth } from '@/components/website/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';

// Long enough for the characters' happy bounce to register before Google opens.
const CELEBRATE_MS = 650;

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [emailBusy, setEmailBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const signingIn = useRef(false);
  const checkedExistingSession = useRef(false);
  const { mood, watchTarget, typed, focusProps, setHappy, flashSad } = useAuthMood(showPassword);
  const busy = emailBusy || googleBusy;

  // Someone who is already signed in doesn't need this page.
  useEffect(() => {
    if (loading || checkedExistingSession.current) return;
    checkedExistingSession.current = true;
    if (!user || signingIn.current) return;
    const returnTo = safeReturnTo(window.location.search);
    router.replace(user.user_metadata?.phone_number ? returnTo || '/dashboard' : withReturnTo('/profile-complete', returnTo));
  }, [loading, user, router]);

  const fail = (message: string) => {
    setError(friendlyAuthError(message));
    setNeedsConfirmation(isEmailNotConfirmed(message));
    flashSad();
  };

  const signInWithGoogle = async () => {
    setError('');
    setNotice('');
    setGoogleBusy(true);
    setHappy(true);
    setRememberPreference(remember);
    const returnTo = safeReturnTo(window.location.search);
    await new Promise((resolve) => window.setTimeout(resolve, CELEBRATE_MS));
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getAuthCallbackUrl(returnTo) },
    });
    if (authError) {
      setGoogleBusy(false);
      setHappy(false);
      fail(authError.message);
    }
  };

  const signInWithEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setNeedsConfirmation(false);
    setEmailBusy(true);
    signingIn.current = true;
    const returnTo = safeReturnTo(window.location.search);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (authError) {
      signingIn.current = false;
      setEmailBusy(false);
      fail(authError.message);
      return;
    }
    setRememberPreference(remember);
    setHappy(true);
    if (!data.user.user_metadata?.phone_number) {
      window.location.assign(withReturnTo('/profile-complete', returnTo));
      return;
    }
    try {
      await syncLmsProfile();
      window.location.assign(returnTo || '/dashboard');
    } catch (syncError) {
      setHappy(false);
      setEmailBusy(false);
      fail(syncError instanceof Error ? syncError.message : 'Could not load your profile.');
    }
  };

  const resendConfirmation = async () => {
    setResendBusy(true);
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim(),
      options: { emailRedirectTo: getAuthCallbackUrl(safeReturnTo(window.location.search)) },
    });
    setResendBusy(false);
    if (resendError) {
      setError(friendlyAuthError(resendError.message));
      return;
    }
    setNeedsConfirmation(false);
    setError('');
    setNotice(`We sent a new confirmation link to ${email.trim()}.`);
  };

  // Keep ?next= when moving between login and signup.
  const keepReturnTo = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const returnTo = safeReturnTo(window.location.search);
    if (returnTo) {
      event.preventDefault();
      window.location.assign(withReturnTo(path, returnTo));
    }
  };

  return (
    <AuthLayout mood={mood} watchTarget={watchTarget} typed={typed}>
      <h1 className={styles.authTitle}>Welcome back!</h1>
      <p className={styles.authSubtitle}>Please enter your details</p>

      <form className={styles.authForm} onSubmit={(event) => void signInWithEmail(event)}>
        <div className={styles.authField}>
          <label className={styles.authLabel} htmlFor="login-email">Email</label>
          <input
            id="login-email"
            className={styles.authInput}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            disabled={busy}
            required
            {...focusProps()}
          />
        </div>

        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          show={showPassword}
          onToggleShow={() => setShowPassword((current) => !current)}
          autoComplete="current-password"
          disabled={busy}
          {...focusProps(true)}
        />

        <div className={styles.authRow}>
          <label className={styles.authCheck}>
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            Remember for 30 days
          </label>
          <Link className={styles.authLink} href="/forgot-password">Forgot password?</Link>
        </div>

        {error && (
          <p className={styles.authAlert} role="alert">
            {error}
            {needsConfirmation && (
              <button type="button" className={`${styles.authLink} ${styles.authInlineAction}`} onClick={() => void resendConfirmation()} disabled={resendBusy}>
                {resendBusy ? 'Sending…' : 'Resend link'}
              </button>
            )}
          </p>
        )}
        {notice && <p className={styles.authNotice} role="status">{notice}</p>}

        <div className={styles.authButtons}>
          <button type="submit" className={styles.authButton} disabled={busy}>
            {emailBusy && <span className={styles.authSpinner} aria-hidden="true" />}
            {emailBusy ? 'Logging in…' : 'Log in'}
          </button>
          <button
            type="button"
            className={`${styles.authButton} ${styles.authGoogle}`}
            onClick={() => void signInWithGoogle()}
            disabled={busy}
            onMouseEnter={() => setHappy(true)}
            onMouseLeave={() => { if (!googleBusy) setHappy(false); }}
            onFocus={() => setHappy(true)}
            onBlur={() => { if (!googleBusy) setHappy(false); }}
          >
            {googleBusy ? <span className={styles.authSpinner} aria-hidden="true" /> : <GoogleIcon />}
            {googleBusy ? 'Opening Google…' : 'Log in with Google'}
          </button>
        </div>
      </form>

      <p className={styles.authFooter}>
        Don’t have an account? <Link href="/signup" onClick={keepReturnTo('/signup')}>Sign Up</Link>
      </p>
    </AuthLayout>
  );
}
