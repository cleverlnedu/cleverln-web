"use client";

import { useEffect } from "react";
import styles from "./loading.module.css";

// Shown when a page fails while rendering, instead of a blank screen.
export default function PageError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.loadingScreen}>
      <div className={styles.loadingBrand} aria-hidden="true">
        <span className={styles.loadingMark}>C</span>
        <span>CleverLN</span>
      </div>
      <p className={styles.loadingMessage} role="alert">
        Something went wrong while loading this page. Please try again.
      </p>
      <button type="button" className={styles.loadingRetry} onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
