"use client";

import { friendlyAuthError } from '@/lib/authMessages';
import { syncLmsProfile } from '@/lib/profileSync';
import { safeReturnTo, withReturnTo } from '@/lib/returnTo';
import { supabase } from '@/lib/supabase';
import AuthLayout from '@/components/website/Auth/AuthLayout';
import styles from '@/components/website/Auth/Auth.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
        if (active) setError(friendlyAuthError(exchangeError.message));
        return;
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        if (active) setError(friendlyAuthError(userError.message));
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

  const backToLogin = () => {
    router.replace(withReturnTo('/login', safeReturnTo(window.location.search)));
  };

  // The characters keep celebrating from the Google button while the sign-in completes.
  return (
    <AuthLayout mood={error ? 'sad' : 'happy'}>
      <h1 className={styles.authTitle}>{error ? 'Sign-in could not be completed' : 'Finishing sign-in'}</h1>
      <p className={styles.authSubtitle}>{error ? 'Something went wrong on the way back' : 'You’re verified. One moment…'}</p>

      <div className={styles.authForm}>
        {error ? (
          <>
            <p className={styles.authAlert} role="alert">{error}</p>
            <div className={styles.authButtons}>
              <button type="button" className={styles.authButton} onClick={backToLogin}>Back to log in</button>
            </div>
          </>
        ) : (
          <div className={styles.authStatus} role="status">
            <span className={styles.authSpinner} aria-hidden="true" />
            Signing you in
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
