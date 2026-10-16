"use client";

import { friendlyAuthError } from '@/lib/authMessages';
import { supabase } from '@/lib/supabase';
import AuthLayout from '@/components/website/Auth/AuthLayout';
import PasswordField from '@/components/website/Auth/PasswordField';
import { useAuthMood } from '@/components/website/Auth/useAuthMood';
import styles from '@/components/website/Auth/Auth.module.css';
import { useAuth } from '@/components/website/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const { mood, watchTarget, typed, focusProps, setHappy, flashSad } = useAuthMood(showPassword);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const nextErrors: typeof errors = {};
    if (password.length < 8) nextErrors.password = 'Use at least 8 characters.';
    if (confirm !== password) nextErrors.confirm = 'The passwords don’t match.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      flashSad();
      return;
    }
    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError(friendlyAuthError(updateError.message));
      flashSad();
      return;
    }
    setDone(true);
    setHappy(true);
    window.setTimeout(() => router.replace('/dashboard'), 1600);
  };

  // The reset link signs the person in; without that there is nothing to reset.
  const linkExpired = !loading && !user && !done;

  return (
    <AuthLayout mood={linkExpired ? 'sad' : mood} watchTarget={watchTarget} typed={typed}>
      <h1 className={styles.authTitle}>Choose a new password</h1>
      <p className={styles.authSubtitle}>Make it at least 8 characters</p>

      {loading ? (
        <div className={styles.authForm} role="status"><span className={styles.authSpinner} aria-hidden="true" /></div>
      ) : linkExpired ? (
        <div className={styles.authForm}>
          <p className={styles.authAlert} role="alert">This reset link has expired or was opened on a different device. Request a new one to continue.</p>
          <Link className={styles.authButton} href="/forgot-password">Request a new link</Link>
        </div>
      ) : done ? (
        <div className={styles.authForm}>
          <p className={styles.authNotice} role="status">Your password has been updated. Taking you to your dashboard…</p>
        </div>
      ) : (
        <form className={styles.authForm} onSubmit={(event) => void save(event)} noValidate>
          <PasswordField
            label="New password"
            value={password}
            onChange={(value) => { setPassword(value); setErrors((current) => ({ ...current, password: undefined })); }}
            show={showPassword}
            onToggleShow={() => setShowPassword((current) => !current)}
            autoComplete="new-password"
            error={errors.password}
            disabled={busy}
            {...focusProps(true)}
          />
          <PasswordField
            label="Confirm password"
            value={confirm}
            onChange={(value) => { setConfirm(value); setErrors((current) => ({ ...current, confirm: undefined })); }}
            show={showPassword}
            onToggleShow={() => setShowPassword((current) => !current)}
            autoComplete="new-password"
            error={errors.confirm}
            disabled={busy}
            {...focusProps(true)}
          />
          {error && <p className={styles.authAlert} role="alert">{error}</p>}
          <div className={styles.authButtons}>
            <button type="submit" className={styles.authButton} disabled={busy}>
              {busy && <span className={styles.authSpinner} aria-hidden="true" />}
              {busy ? 'Saving…' : 'Update password'}
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
