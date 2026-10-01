"use client";

import { syncLmsProfile } from '@/lib/profileSync';
import { supabase } from '@/lib/supabase';
import { safeReturnTo, withReturnTo } from '@/lib/returnTo';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import styles from '../auth.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const signInWithGoogle = async () => {
    setError('');
    setBusy(true);
    const returnTo = safeReturnTo(window.location.search);
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}${withReturnTo('/auth/callback', returnTo)}` },
    });
    if (authError) {
      setError(authError.message);
      setBusy(false);
    }
  };

  const signInWithEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    const returnTo = safeReturnTo(window.location.search);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setBusy(false);
      return;
    }
    if (!data.user.user_metadata?.phone_number) {
      window.location.assign(withReturnTo('/profile-complete', returnTo));
      return;
    }
    try {
      await syncLmsProfile();
      window.location.assign(returnTo || '/dashboard');
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : 'Could not load your profile.');
      setBusy(false);
    }
  };

  return (
    <main className={styles.authPage}>
      <section className={styles.authPanel}>
        <p className={styles.authEyebrow}>CleverLN account</p>
        <h1 className={styles.authTitle}>Welcome back</h1>
        <p className={styles.authDescription}>Sign in to view your courses and account.</p>

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={busy}
          className={styles.googleButton}
        >
          <span className={styles.buttonContent}>{busy && <span className={styles.buttonSpinner} aria-hidden="true" />}{busy ? 'Connecting…' : 'Continue with Google'}</span>
        </button>

        <div className={styles.divider}>OR USE EMAIL</div>

        <form onSubmit={signInWithEmail} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className={styles.alert} role="alert">{error}</p>}
          <button type="submit" disabled={busy} className={styles.submitButton}>
            <span className={styles.buttonContent}>{busy && <span className={styles.buttonSpinner} aria-hidden="true" />}{busy ? 'Signing in…' : 'Sign in'}</span>
          </button>
        </form>

        <p className={styles.authFooter}>
          New to CleverLN? <Link className={styles.authLink} href="/signup" onClick={(event) => {
            const returnTo = safeReturnTo(window.location.search);
            if (returnTo) {
              event.preventDefault();
              window.location.assign(withReturnTo('/signup', returnTo));
            }
          }}>Create an account</Link>
        </p>
      </section>
    </main>
  );
}
