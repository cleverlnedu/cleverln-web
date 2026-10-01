import styles from "./LoadingIndicator.module.css";

export default function LoadingIndicator({ label, large = false }: { label?: string; large?: boolean }) {
  return <span className={`${styles.loading} ${large ? styles.large : ""}`} role="status">
    <span className={styles.spinner} aria-hidden="true" />
    {label && <span>{label}</span>}
  </span>;
}
