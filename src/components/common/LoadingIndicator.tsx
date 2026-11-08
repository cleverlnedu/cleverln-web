import styles from "./LoadingIndicator.module.css";

type LoadingIndicatorProps = {
  label?: string;
  // page-sized version, with the label under the dots
  large?: boolean;
  // white dots, for a green or dark background (e.g. the navbar button)
  tone?: "light";
  // show only the dots; the label is still read out to screen readers
  hideLabel?: boolean;
};

export default function LoadingIndicator({ label, large = false, tone, hideLabel = false }: LoadingIndicatorProps) {
  const className = [styles.loading, large && styles.large, tone === "light" && styles.light].filter(Boolean).join(" ");
  return <span className={className} role="status">
    <span className={styles.dots} aria-hidden="true">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </span>
    {label && <span className={hideLabel ? styles.srOnly : undefined}>{label}</span>}
  </span>;
}
