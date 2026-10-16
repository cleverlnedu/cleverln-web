"use client";

import { friendlyAuthError } from '@/lib/authMessages';
import { getAuthCallbackUrl } from '@/lib/authRedirect';
import { supabase } from '@/lib/supabase';
import AuthLayout from '@/components/website/Auth/AuthLayout';
import { useAuthMood } from '@/components/website/Auth/useAuthMood';
import styles from '@/components/website/Auth/Auth.module.css';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sentTo, setSentTo] = useState('');
  const { mood, watchTarget, typed, focusProps, setHappy, flashSad } = useAuthMood(false);

  const sendLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const address = email.trim();
    setError('');
    if (!/^\S+@\S+\.\S+$/.test(address)) {
      setError('Enter a valid email address.');
      flashSad();
      return;
    }
    setBusy(true);
    // The link signs the person in through /auth/callback, which then opens /reset-password.
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(address, {
      redirectTo: getAuthCallbackUrl('/reset-password'),
    });
    setBusy(false);
    if (resetError) {
      setError(friendlyAuthError(resetError.message));
      flashSad();
      return;
    }
    setSentTo(address);
    setHappy(true);
  };

  return (
    <AuthLayout mood={mood} watchTarget={watchTarget} typed={typed}>
      <h1 className={styles.authTitle}>Forgot password?</h1>
      <p className={styles.authSubtitle}>We’ll email you a link to reset it</p>

      {sentTo ? (
        <div className={styles.authForm}>
          <p className={styles.authNotice} role="status">
            If an account exists for {sentTo}, a reset link is on its way. Open it on this device to choose a new password.
          </p>
          <button type="button" className={styles.authButton} onClick={() => { setSentTo(''); setHappy(false); }}>
            Use a different email
          </button>
        </div>
      ) : (
        <form className={styles.authForm} onSubmit={(event) => void sendLink(event)} noValidate>
          <div className={styles.authField}>
            <label className={styles.authLabel} htmlFor="forgot-email">Email</label>
            <input
              id="forgot-email"
              className={styles.authInput}
              type="email"
              inputMode="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              disabled={busy}
              {...focusProps()}
            />
          </div>
          {error && <p className={styles.authAlert} role="alert">{error}</p>}
          <div className={styles.authButtons}>
            <button type="submit" className={styles.authButton} disabled={busy}>
              {busy && <span className={styles.authSpinner} aria-hidden="true" />}
              {busy ? 'Sending…' : 'Send reset link'}
            </button>
          </div>
        </form>
      )}

      <p className={styles.authFooter}>
        Remembered it? <Link href="/login">Back to log in</Link>
      </p>
    </AuthLayout>
  );
}
