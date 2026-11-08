import LoadingIndicator from "@/components/common/LoadingIndicator";
import styles from "./loading.module.css";

// Between pages: only the three moving dots (the label is read out to screen readers, not shown).
export default function Loading() {
  return (
    <main className={styles.loadingScreen}>
      <LoadingIndicator large label="Loading CleverLN" hideLabel />
    </main>
  );
}
