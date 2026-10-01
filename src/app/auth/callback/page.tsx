"use client";

import { syncLmsProfile } from '@/lib/profileSync';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { safeReturnTo, withReturnTo } from '@/lib/returnTo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../(website)/auth.module.css';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const completeSignIn = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const returnTo = safeReturnTo(window.location.search);
      if (!code) {
        setError('The sign-in link is missing its authorization code.');
        return;
      }

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        if (active) setError(exchangeError.message);
        return;
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        if (active) setError(userError.message);
        return;
      }

      if (active) {
        if (user?.user_metadata?.phone_number) {
          try {
            await syncLmsProfile();
            if (active) router.replace(returnTo || '/dashboard');
          } catch (syncError) {
            if (active) setError(syncError instanceof Error ? syncError.message : 'Could not load your LMS profile.');
          }
        } else {
          router.replace(withReturnTo('/profile-complete', returnTo));
        }
      }
    };

    void completeSignIn();
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <main className={styles.authPage}>
      <section className={`${styles.authPanel} ${styles.callbackPanel}`}>
        {!error && <div className={styles.loadingIndicator} aria-hidden="true" />}
        <p className={styles.authEyebrow}>CleverLN account</p>
        <h1 className={styles.authTitle}>
          {error ? 'Sign-in could not be completed' : 'Finishing sign-in'}
        </h1>
        <p className={error ? styles.alert : styles.authDescription} role={error ? 'alert' : 'status'}>
          {error || 'Your Google account is verified. One moment…'}
        </p>
        {error && (
          <Link className={`${styles.authLink} ${styles.callbackLink}`} href="/login" onClick={(event) => {
            const returnTo = safeReturnTo(window.location.search);
            if (returnTo) {
              event.preventDefault();
              router.replace(withReturnTo('/login', returnTo));
            }
          }}>
            Return to login
          </Link>
        )}
      </section>
    </main>
  );
}
