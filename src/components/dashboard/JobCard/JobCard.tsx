"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./JobCard.module.css";

export default function JobCard() {
  return (
    <motion.section
      className={styles.djobRoot}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.djobCard}>
        <div className={styles.djobHeader}>
          <h3 className={styles.djobTitle}>
            Job Applied
          </h3>
        </div>

        <div className={styles.djobBody}>
          <Image
            src="/images/dashboard/course-empty.svg"
            alt="Job Applied"
            width={42}
            height={42}
            className={styles.djobIcon}
          />

          <h4 className={styles.djobHeading}>
            No Single Job Applied Yet
          </h4>

          <button className={styles.djobButton}>
            Get Start
          </button>
        </div>
      </div>
    </motion.section>
  );
}