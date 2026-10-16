"use client";

import { Eye, EyeOff } from 'lucide-react';
import { useId, type FocusEvent } from 'react';
import styles from './Auth.module.css';

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggleShow: () => void;
  autoComplete: 'current-password' | 'new-password';
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

export default function PasswordField({ label, value, onChange, show, onToggleShow, autoComplete, placeholder = '••••••••', error, hint, disabled, onFocus, onBlur }: PasswordFieldProps) {
  const id = useId();
  const noteId = `${id}-note`;
  const note = error || hint;
  return (
    <div className={styles.authField}>
      <label className={styles.authLabel} htmlFor={id}>{label}</label>
      <div className={styles.authInputWrap}>
        <input
          id={id}
          className={styles.authInput}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={note ? noteId : undefined}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          required
        />
        <button
          type="button"
          className={styles.authEye}
          onClick={onToggleShow}
          aria-label={show ? 'Hide password' : 'Show password'}
          aria-pressed={show}
          // Keep focus in the field so the characters keep their reaction.
          onMouseDown={(event) => event.preventDefault()}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {note && <span id={noteId} className={error ? styles.authFieldError : styles.authHint}>{note}</span>}
    </div>
  );
}
