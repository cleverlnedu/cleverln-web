"use client";

import { supabase } from '@/lib/supabase';
import { getAuthCallbackUrl } from '@/lib/authRedirect';
import { safeReturnTo, withReturnTo } from '@/lib/returnTo';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import styles from '../auth.module.css';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const signInWithGoogle = async () => {
    setError('');
    setBusy(true);
    const returnTo = safeReturnTo(window.location.search);
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getAuthCallbackUrl(returnTo) },
    });
    if (authError) {
      setError(authError.message);
      setBusy(false);
    }
  };

  const createAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setBusy(true);
    const returnTo = safeReturnTo(window.location.search);
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: name.trim(), phone_number: phone.trim() },
        emailRedirectTo: getAuthCallbackUrl(returnTo),
      },
    });
    if (authError) {
      setError(authError.message);
      setBusy(false);
      return;
    }
    if (data.session) {
      window.location.assign(withReturnTo('/profile-complete', returnTo));
      return;
    }
    setMessage(`Check ${email} for a confirmation link to finish creating your account.`);
    setBusy(false);
  };

  return (
    <main className={styles.authPage}>
      <section className={styles.authPanel}>
        <p className={styles.authEyebrow}>CleverLN account</p>
        <h1 className={styles.authTitle}>Create your account</h1>
        <p className={styles.authDescription}>Your verified email is used for sign-in and receipts.</p>

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={busy}
          className={styles.googleButton}
        >
          <span className={styles.buttonContent}>{busy && <span className={styles.buttonSpinner} aria-hidden="true" />}{busy ? 'Connecting…' : 'Continue with Google'}</span>
        </button>
        <div className={styles.divider}>OR USE EMAIL</div>

        <form onSubmit={createAccount} className={styles.form}>
          <label className={styles.label}>
            Full name
            <input className={styles.input} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" maxLength={80} required />
          </label>
          <label className={styles.label}>
            Phone number
            <input className={styles.input} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" maxLength={30} required />
          </label>
          <label className={styles.label}>
            Email
            <input className={styles.input} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
          </label>
          <label className={styles.label}>
            Password
            <input className={styles.input} type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={8} required />
          </label>
          {message && <p className={styles.notice} role="status">{message}</p>}
          {error && <p className={styles.alert} role="alert">{error}</p>}
          <button type="submit" disabled={busy} className={styles.submitButton}>
            <span className={styles.buttonContent}>{busy && <span className={styles.buttonSpinner} aria-hidden="true" />}{busy ? 'Creating account…' : 'Create account'}</span>
          </button>
        </form>

        <p className={styles.authFooter}>
          Already registered? <Link className={styles.authLink} href="/login" onClick={(event) => {
            const returnTo = safeReturnTo(window.location.search);
            if (returnTo) {
              event.preventDefault();
              window.location.assign(withReturnTo('/login', returnTo));
            }
          }}>Sign in</Link>
        </p>
      </section>
    </main>
  );
}
