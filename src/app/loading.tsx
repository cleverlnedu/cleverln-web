import LoadingIndicator from "@/components/common/LoadingIndicator";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.loadingScreen} role="status" aria-live="polite" aria-label="Loading CleverLN">
      <div className={styles.loadingBrand} aria-hidden="true">
        <span className={styles.loadingMark}>C</span>
        <span>CleverLN</span>
      </div>
      <LoadingIndicator large label="Loading" />
    </main>
  );
}
