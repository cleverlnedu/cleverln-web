"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./PortalCard.module.css";

export default function PortalCard() {
  return (
    <motion.section
      className={styles.dportalRoot}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.dportalCard}>
        {/* Left Image */}

        <div className={styles.dportalImageWrapper}>
          <Image
            src="/images/dashboard/jobportal.webp"
            alt="Job Portal"
            fill
            priority
            className={styles.dportalImage}
          />
        </div>

        {/* Right Content */}

        <div className={styles.dportalContent}>
          <h3 className={styles.dportalTitle}>
            Apply Early. Get Noticed Faster.
          </h3>

          <p className={styles.dportalDescription}>
            With CleverLN Job Portal, apply for jobs that match your
            skills and location and join a platform trusted by
            15,000+ graduates and students.
          </p>

          <button
            type="button"
            className={styles.dportalButton}
          >
            Know More
          </button>
        </div>
      </div>
    </motion.section>
  );
}