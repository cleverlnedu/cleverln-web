import Image from "next/image";
import styles from "./HireTrust.module.css";

export default function HireTrust() {
  return (
    <section className={styles.hireTrustSection}>
      <div className={styles.hireTrustContainer}>

        {/* =================================================
            HIRING REPORT
        ================================================= */}

        <div className={styles.hireTrustVisual}>
          <Image
            src="/images/report-card.png"
            alt="CleverLN hiring report chart peaking at 100+ in September"
            width={1620}
            height={1496}
            sizes="(max-width: 700px) 100vw, 434px"
            className={styles.hireTrustImage}
          />
        </div>


        {/* =================================================
            CONTENT
        ================================================= */}

        <div className={styles.hireTrustContent}>
          <h2 className={styles.hireTrustTitle}>
            100+ companies trust CleverLN for authentic, AI-driven
            insights on every student report.
          </h2>

          <p className={styles.hireTrustDescription}>
            So many people trust us—now imagine the impact, vision, and
            CleverLN stands for trust, growth, and proven success.
          </p>
        </div>

      </div>
    </section>
  );
}
