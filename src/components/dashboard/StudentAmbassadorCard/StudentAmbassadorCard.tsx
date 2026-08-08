"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./StudentAmbassadorCard.module.css";

export default function StudentAmbassadorCard() {
  return (
    <motion.section
      className={styles.dambCard}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Left */}

      <div className={styles.dambImageWrap}>
        <Image
          src="/images/dashboard/student-ambassador.webp"
          alt="Student Ambassador"
          fill
          priority
          className={styles.dambImage}
        />
      </div>

      {/* Right */}

      <div className={styles.dambContent}>
        <h2 className={styles.dambTitle}>
          Shape Your Future Through Leadership.
        </h2>

        <p className={styles.dambDescription}>
          Become a CleverLN Student Ambassador,
          gain real leadership experience,
          and make a lasting impact on your campus.
        </p>

        <button
          className={styles.dambButton}
          type="button"
        >
          Lead Now
        </button>
      </div>
    </motion.section>
  );
}