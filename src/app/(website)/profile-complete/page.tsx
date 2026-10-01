"use client";

import { syncLmsProfile } from '@/lib/profileSync';
import { supabase } from '@/lib/supabase';
import { safeReturnTo } from '@/lib/returnTo';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import styles from '../auth.module.css';

export default function CompleteProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

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
    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({
      data: { name: name.trim(), phone_number: phone.trim() },
    });
    if (updateError) {
      setError(updateError.message);
      setBusy(false);
      return;
    }
    try {
      await syncLmsProfile();
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : 'Could not save your LMS profile.');
      setBusy(false);
      return;
    }
    router.replace(safeReturnTo(window.location.search) || '/dashboard');
  };

  return (
    <main className={styles.authPage}>
      <section className={styles.authPanel}>
        {loadingProfile ? <div className={styles.callbackPanel} role="status"><div className={styles.loadingIndicator} aria-hidden="true" /><p className={styles.authDescription}>Loading your verified account details…</p></div> : <>
        <p className={styles.authEyebrow}>CleverLN profile</p>
        <h1 className={styles.authTitle}>Review your details</h1>
        <p className={styles.authDescription}>Your sign-in email is verified and read-only. Add the details needed for your learner profile.</p>

        <form onSubmit={saveProfile} className={`${styles.form} ${styles.profileForm}`}>
          <label className={styles.label}>
            Full name
            <input className={styles.input} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" maxLength={80} required />
          </label>
          <label className={styles.label}>
            Verified email
            <input className={styles.input} value={email} readOnly aria-readonly="true" />
          </label>
          <label className={styles.label}>
            Phone number
            <input className={styles.input} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" maxLength={30} required />
          </label>
          {error && <p className={styles.alert} role="alert">{error}</p>}
          <button type="submit" disabled={busy} className={styles.submitButton}>
            <span className={styles.buttonContent}>{busy && <span className={styles.buttonSpinner} aria-hidden="true" />}{busy ? 'Saving profile…' : 'Save and continue'}</span>
          </button>
        </form>
        </>}
      </section>
    </main>
  );
}
