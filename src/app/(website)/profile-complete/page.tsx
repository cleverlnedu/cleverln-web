"use client";

import { friendlyAuthError, phoneNumberError } from '@/lib/authMessages';
import { syncLmsProfile } from '@/lib/profileSync';
import { safeReturnTo } from '@/lib/returnTo';
import { supabase } from '@/lib/supabase';
import AuthLayout from '@/components/website/Auth/AuthLayout';
import { useAuthMood } from '@/components/website/Auth/useAuthMood';
import styles from '@/components/website/Auth/Auth.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';

type FieldErrors = { name?: string; phone?: string };

export default function CompleteProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const { mood, watchTarget, typed, focusProps, setHappy, flashSad } = useAuthMood(false);

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data, error: authError }) => {
      if (!active) return;
      if (authError || !data.user) {
        router.replace('/login');
        return;
      }
      setEmail(data.user.email || '');
      setName(data.user.user_metadata?.name || data.user.user_metadata?.full_name || '');
      setPhone(data.user.user_metadata?.phone_number || '');
      setLoadingProfile(false);
    }).catch(() => {
      if (active) router.replace('/login');
    });
    return () => {
      active = false;
    };
  }, [router]);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const nextErrors: FieldErrors = {};
    if (name.trim().length < 2) nextErrors.name = 'Enter your full name.';
    const phoneError = phoneNumberError(phone);
    if (phoneError) nextErrors.phone = phoneError;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      flashSad();
      event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({
      data: { name: name.trim(), phone_number: phone.trim() },
    });
    if (updateError) {
      setError(friendlyAuthError(updateError.message));
      setBusy(false);
      flashSad();
      return;
    }
    try {
      await syncLmsProfile();
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : 'Could not save your LMS profile.');
      setBusy(false);
      flashSad();
      return;
    }
    setHappy(true);
    router.replace(safeReturnTo(window.location.search) || '/dashboard');
  };

  return (
    <AuthLayout mood={mood} watchTarget={watchTarget} typed={typed}>
      <h1 className={styles.authTitle}>Review your details</h1>
      <p className={styles.authSubtitle}>Add the details for your learner profile</p>

      {loadingProfile ? (
        <div className={styles.authForm}>
          <div className={styles.authStatus} role="status">
            <span className={styles.authSpinner} aria-hidden="true" />
            Loading your account details
          </div>
        </div>
      ) : (
        <form className={styles.authForm} onSubmit={(event) => void saveProfile(event)} noValidate>
          <div className={styles.authField}>
            <label className={styles.authLabel} htmlFor="profile-name">Full name</label>
            <input
              id="profile-name"
              className={styles.authInput}
              value={name}
              onChange={(event) => { setName(event.target.value); setErrors((current) => ({ ...current, name: undefined })); }}
              autoComplete="name"
              placeholder="Your full name"
              maxLength={80}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'profile-name-error' : undefined}
              disabled={busy}
              {...focusProps()}
            />
            {errors.name && <span id="profile-name-error" className={styles.authFieldError}>{errors.name}</span>}
          </div>

          <div className={styles.authField}>
            <label className={styles.authLabel} htmlFor="profile-email">Verified email</label>
            <input id="profile-email" className={styles.authInput} value={email} readOnly aria-readonly="true" />
            <span className={styles.authHint}>This is your sign-in email and can’t be changed here.</span>
          </div>

          <div className={styles.authField}>
            <label className={styles.authLabel} htmlFor="profile-phone">Phone number</label>
            <input
              id="profile-phone"
              className={styles.authInput}
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(event) => { setPhone(event.target.value); setErrors((current) => ({ ...current, phone: undefined })); }}
              autoComplete="tel"
              placeholder="+91 98765 43210"
              maxLength={20}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? 'profile-phone-error' : undefined}
              disabled={busy}
              {...focusProps()}
            />
            {errors.phone && <span id="profile-phone-error" className={styles.authFieldError}>{errors.phone}</span>}
          </div>

          {error && <p className={styles.authAlert} role="alert">{error}</p>}

          <div className={styles.authButtons}>
            <button type="submit" className={styles.authButton} disabled={busy}>
              {busy && <span className={styles.authSpinner} aria-hidden="true" />}
              {busy ? 'Saving…' : 'Save and continue'}
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
