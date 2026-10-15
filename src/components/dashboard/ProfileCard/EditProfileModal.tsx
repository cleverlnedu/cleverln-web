"use client";

import { syncLmsProfile, type LearnerProfile } from '@/lib/profileSync';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';
import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from './EditProfileModal.module.css';

type EditProfileModalProps = {
  profile: LearnerProfile;
  initials: string;
  onClose: () => void;
  onSaved: (profile: LearnerProfile) => void;
};

type Fields = { name: string; phone: string; headline: string; education: string; city: string; linkedin: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;

const EDUCATION_OPTIONS = ['Pursuing graduation', 'Graduated', 'Pursuing post-graduation', 'Post-graduated', 'Working professional'];

const LINKEDIN_URL = /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/\S+$/i;

function normaliseLinkedin(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  const phoneDigits = fields.phone.replace(/\D/g, '');
  if (fields.name.trim().length < 2) errors.name = 'Enter your full name.';
  if (!fields.phone.trim()) errors.phone = 'Enter your phone number.';
  else if (!/^[+\d\s()-]+$/.test(fields.phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Enter a valid phone number.';
  }
  if (fields.linkedin.trim() && !LINKEDIN_URL.test(fields.linkedin.trim())) {
    errors.linkedin = 'Enter your LinkedIn profile link, e.g. linkedin.com/in/your-name';
  }
  return errors;
}

export default function EditProfileModal({ profile, initials, onClose, onSaved }: EditProfileModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState<Fields>({
    name: profile.name ?? '',
    phone: profile.phone ?? '',
    headline: profile.headline ?? '',
    education: profile.education ?? '',
    city: profile.city ?? '',
    linkedin: profile.linkedin ?? '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Lock the page behind the popup, focus the first field, and give focus back to the button that opened it on close.
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    nameRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  const close = () => {
    if (!busy) onClose();
  };

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  // Escape closes; Tab stays inside the popup.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled])')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      dialogRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    setBusy(true);
    setSaveError('');
    // Saved to the account itself (and synced to the LMS), so every device shows the same details.
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        name: fields.name.trim(),
        phone_number: fields.phone.trim(),
        headline: fields.headline.trim(),
        education_status: fields.education,
        city: fields.city.trim(),
        linkedin_url: normaliseLinkedin(fields.linkedin),
      },
    });
    if (updateError) {
      setSaveError(updateError.message);
      setBusy(false);
      return;
    }
    try {
      onSaved(await syncLmsProfile({ forceRefresh: true }));
    } catch (syncError) {
      setSaveError(syncError instanceof Error ? syncError.message : 'Could not save your profile. Please try again.');
      setBusy(false);
    }
  };

  const errorId = (key: keyof Fields) => `${titleId}-${key}-error`;
  const fieldProps = (key: keyof Fields) => ({
    value: fields[key],
    disabled: busy,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? errorId(key) : undefined,
  });
  const fieldError = (key: keyof Fields) => errors[key] && <span id={errorId(key)} className={styles.editProfileFieldError}>{errors[key]}</span>;
  const label = (text: string, optional = false) => <span className={styles.editProfileLabel}>{text}{optional && <em> (optional)</em>}</span>;

  // Opened from a click in the browser; never rendered on the server.
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.editProfileOverlay} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div
        ref={dialogRef}
        className={styles.editProfileDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onKeyDown={onKeyDown}
      >
        <div className={styles.editProfileHeader}>
          <div>
            <h2 id={titleId} className={styles.editProfileTitle}>Edit profile</h2>
            <p id={descriptionId} className={styles.editProfileSubtitle}>Changes are saved to your account and show on all your devices.</p>
          </div>
          <button type="button" className={styles.editProfileClose} onClick={close} disabled={busy} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className={styles.editProfileIdentity}>
          <div
            className={styles.editProfileAvatar}
            style={profile.avatar ? { backgroundImage: `url("${profile.avatar}")` } : undefined}
            aria-hidden="true"
          >
            {!profile.avatar && initials}
          </div>
          <div className={styles.editProfileIdentityText}>
            <span>Signed in as</span>
            <strong>{profile.email}</strong>
          </div>
        </div>

        <form className={styles.editProfileForm} onSubmit={(event) => void save(event)} noValidate>
          <div className={styles.editProfileGrid}>
            <label className={styles.editProfileField}>
              {label('Full name')}
              <input ref={nameRef} className={styles.editProfileInput} {...fieldProps('name')} onChange={(event) => update('name', event.target.value)} autoComplete="name" maxLength={80} />
              {fieldError('name')}
            </label>

            <label className={styles.editProfileField}>
              {label('Phone number')}
              <input className={styles.editProfileInput} {...fieldProps('phone')} onChange={(event) => update('phone', event.target.value)} type="tel" inputMode="tel" autoComplete="tel" maxLength={20} />
              {fieldError('phone')}
            </label>

            <label className={`${styles.editProfileField} ${styles.editProfileFieldWide}`}>
              {label('About you', true)}
              <input
                className={styles.editProfileInput}
                {...fieldProps('headline')}
                onChange={(event) => update('headline', event.target.value)}
                placeholder="e.g. I am a Full Stack Developer from The Oxford College of Engineering"
                maxLength={120}
              />
              {fieldError('headline')}
            </label>

            <label className={styles.editProfileField}>
              {label('Education', true)}
              <select className={`${styles.editProfileInput} ${styles.editProfileSelect}`} {...fieldProps('education')} onChange={(event) => update('education', event.target.value)}>
                <option value="">Select status</option>
                {EDUCATION_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                {fields.education && !EDUCATION_OPTIONS.includes(fields.education) && <option value={fields.education}>{fields.education}</option>}
              </select>
              {fieldError('education')}
            </label>

            <label className={styles.editProfileField}>
              {label('Location', true)}
              <input className={styles.editProfileInput} {...fieldProps('city')} onChange={(event) => update('city', event.target.value)} autoComplete="address-level2" placeholder="e.g. Bengaluru, Karnataka" maxLength={80} />
              {fieldError('city')}
            </label>

            <label className={`${styles.editProfileField} ${styles.editProfileFieldWide}`}>
              {label('LinkedIn profile', true)}
              <input
                className={styles.editProfileInput}
                {...fieldProps('linkedin')}
                onChange={(event) => update('linkedin', event.target.value)}
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="linkedin.com/in/your-name"
                maxLength={200}
              />
              {fieldError('linkedin')}
            </label>
          </div>

          {saveError && <p className={styles.editProfileError} role="alert">{saveError}</p>}

          <div className={styles.editProfileActions}>
            <button type="button" className={styles.editProfileCancel} onClick={close} disabled={busy}>Cancel</button>
            <button type="submit" className={styles.editProfileSave} disabled={busy}>{busy ? 'Saving…' : 'Save changes'}</button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
