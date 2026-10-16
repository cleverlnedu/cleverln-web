"use client";

import { useEffect, useState, type FocusEvent } from 'react';
import type { CharacterMood } from './AuthCharacters';

/** Turns what the person is doing on the form into the characters' mood. */
export function useAuthMood(showPassword: boolean) {
  const [field, setField] = useState<{ element: HTMLInputElement; secret: boolean } | null>(null);
  const [happy, setHappy] = useState(false);
  const [sad, setSad] = useState(false);

  useEffect(() => {
    if (!sad) return;
    const timer = window.setTimeout(() => setSad(false), 1800);
    return () => window.clearTimeout(timer);
  }, [sad]);

  const focusProps = (secret = false) => ({
    onFocus: (event: FocusEvent<HTMLInputElement>) => setField({ element: event.currentTarget, secret }),
    onBlur: () => setField(null),
  });

  let mood: CharacterMood = 'idle';
  if (happy) mood = 'happy';
  else if (sad) mood = 'sad';
  else if (field?.secret) mood = showPassword ? 'peek' : 'shy';
  else if (field) mood = 'watching';

  return {
    mood,
    watchTarget: field?.element ?? null,
    // The page re-renders on every keystroke, so this stays current.
    typed: field?.element.value.length ?? 0,
    focusProps,
    setHappy,
    flashSad: () => setSad(true),
  };
}
