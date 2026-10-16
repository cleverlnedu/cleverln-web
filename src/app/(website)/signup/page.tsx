"use client";

import { friendlyAuthError, phoneNumberError } from '@/lib/authMessages';
import { getAuthCallbackUrl } from '@/lib/authRedirect';
import { setRememberPreference } from '@/lib/rememberSession';
import { safeReturnTo, withReturnTo } from '@/lib/returnTo';
import { supabase } from '@/lib/supabase';
import AuthLayout from '@/components/website/Auth/AuthLayout';
import GoogleIcon from '@/components/website/Auth/GoogleIcon';
import PasswordField from '@/components/website/Auth/PasswordField';
import { useAuthMood } from '@/components/website/Auth/useAuthMood';
import styles from '@/components/website/Auth/Auth.module.css';
import Link from 'next/link';
import { useEffect, useState, type FormEvent, type MouseEvent } from 'react';

const CELEBRATE_MS = 650;

type Fields = { name: string; phone: string; email: string; password: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (fields.name.trim().length < 2) errors.name = 'Enter your full name.';
  const phoneError = phoneNumberError(fields.phone);
  if (phoneError) errors.phone = phoneError;
  if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) errors.email = 'Enter a valid email address.';
  if (fields.password.length < 8) errors.password = 'Use at least 8 characters.';
  return errors;
}

export default function SignupPage() {
  const [fields, setFields] = useState<Fields>({ name: '', phone: '', email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [emailBusy, setEmailBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const { mood, watchTarget, typed, focusProps, setHappy, flashSad } = useAuthMood(showPassword);
  const busy = emailBusy || googleBusy;

  // A short celebration after the account is created, then back to normal.
  useEffect(() => {
    if (!celebrating) return;
    const timer = window.setTimeout(() => {
      setCelebrating(false);
      setHappy(false);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [celebrating, setHappy]);

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const fail = (message: string) => {
    setError(friendlyAuthError(message));
    flashSad();
  };

  const signUpWithGoogle = async () => {
    setError('');
    setNotice('');
    setGoogleBusy(true);
    setHappy(true);
    setRememberPreference(true);
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

  const createAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setNotice('');
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      flashSad();
      event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    setEmailBusy(true);
    const returnTo = safeReturnTo(window.location.search);
    const email = fields.email.trim();
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password: fields.password,
      options: {
        data: { name: fields.name.trim(), phone_number: fields.phone.trim() },
        emailRedirectTo: getAuthCallbackUrl(returnTo),
      },
    });
    setEmailBusy(false);
    if (authError) {
      fail(authError.message);
      return;
    }
    // Supabase answers an existing email with an empty user (no error) so it can't be probed; say so plainly.
    if (data.user && data.user.identities?.length === 0) {
      fail('An account with this email already exists. Log in instead.');
      return;
    }
    setRememberPreference(true);
    setHappy(true);
    if (data.session) {
      window.location.assign(withReturnTo('/profile-complete', returnTo));
      return;
    }
    setCelebrating(true);
    setNotice(`Check ${email} for a confirmation link to finish creating your account.`);
  };

  const keepReturnTo = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const returnTo = safeReturnTo(window.location.search);
    if (returnTo) {
      event.preventDefault();
      window.location.assign(withReturnTo(path, returnTo));
    }
  };

  const textField = (key: Exclude<keyof Fields, 'password'>, label: string, input: { type: string; autoComplete: string; placeholder: string; inputMode?: 'tel' | 'email' }) => {
    const id = `signup-${key}`;
    return (
      <div className={styles.authField}>
        <label className={styles.authLabel} htmlFor={id}>{label}</label>
        <input
          id={id}
          className={styles.authInput}
          type={input.type}
          inputMode={input.inputMode}
          value={fields[key]}
          onChange={(event) => update(key, event.target.value)}
          autoComplete={input.autoComplete}
          placeholder={input.placeholder}
          maxLength={key === 'phone' ? 20 : 120}
          aria-invalid={errors[key] ? true : undefined}
          aria-describedby={errors[key] ? `${id}-error` : undefined}
          disabled={busy}
          {...focusProps()}
        />
        {errors[key] && <span id={`${id}-error`} className={styles.authFieldError}>{errors[key]}</span>}
      </div>
    );
  };

  return (
    <AuthLayout mood={mood} watchTarget={watchTarget} typed={typed}>
      <h1 className={styles.authTitle}>Create an account</h1>
      <p className={styles.authSubtitle}>Please enter your details</p>

      <form className={styles.authForm} onSubmit={(event) => void createAccount(event)} noValidate>
        {textField('name', 'Full name', { type: 'text', autoComplete: 'name', placeholder: 'Your full name' })}
        {textField('phone', 'Phone number', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '+91 98765 43210' })}
        {textField('email', 'Email', { type: 'email', inputMode: 'email', autoComplete: 'email', placeholder: 'you@example.com' })}

        <PasswordField
          label="Password"
          value={fields.password}
          onChange={(value) => update('password', value)}
          show={showPassword}
          onToggleShow={() => setShowPassword((current) => !current)}
          autoComplete="new-password"
          error={errors.password}
          hint="At least 8 characters"
          disabled={busy}
          {...focusProps(true)}
        />

        {error && <p className={styles.authAlert} role="alert">{error}</p>}
        {notice && <p className={styles.authNotice} role="status">{notice}</p>}

        <div className={styles.authButtons}>
          <button type="submit" className={styles.authButton} disabled={busy}>
            {emailBusy && <span className={styles.authSpinner} aria-hidden="true" />}
            {emailBusy ? 'Creating account…' : 'Sign up'}
          </button>
          <button
            type="button"
            className={`${styles.authButton} ${styles.authGoogle}`}
            onClick={() => void signUpWithGoogle()}
            disabled={busy}
            onMouseEnter={() => setHappy(true)}
            onMouseLeave={() => { if (!googleBusy && !celebrating) setHappy(false); }}
            onFocus={() => setHappy(true)}
            onBlur={() => { if (!googleBusy && !celebrating) setHappy(false); }}
          >
            {googleBusy ? <span className={styles.authSpinner} aria-hidden="true" /> : <GoogleIcon />}
            {googleBusy ? 'Opening Google…' : 'Sign up with Google'}
          </button>
        </div>
      </form>

      <p className={styles.authFooter}>
        Already have an account? <Link href="/login" onClick={keepReturnTo('/login')}>Log in</Link>
      </p>
    </AuthLayout>
  );
}
