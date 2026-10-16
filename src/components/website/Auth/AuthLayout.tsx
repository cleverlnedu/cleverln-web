import type { ReactNode } from 'react';
import AuthCharacters, { type CharacterMood } from './AuthCharacters';
import styles from './Auth.module.css';

type AuthLayoutProps = {
  mood: CharacterMood;
  watchTarget?: HTMLElement | null;
  typed?: number;
  children: ReactNode;
};

/** Split card used by login, signup and password reset: characters on the left, form on the right. */
export default function AuthLayout({ mood, watchTarget, typed, children }: AuthLayoutProps) {
  return (
    <main className={styles.authShell}>
      <div className={styles.authCard}>
        <div className={styles.authArt}>
          <div className={styles.authCharacters}>
            <AuthCharacters mood={mood} watchTarget={watchTarget} typed={typed} />
          </div>
        </div>
        <section className={styles.authFormSide}>
          <div className={styles.authFormInner}>{children}</div>
        </section>
      </div>
    </main>
  );
}
