"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./CourseCard.module.css";

export default function CourseCard() {
  return (
    <motion.section
      className={styles.dcourseRoot}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.dcourseCard}>
        <div className={styles.dcourseHeader}>
          <h3 className={styles.dcourseTitle}>
            Course
          </h3>
        </div>

        <div className={styles.dcourseBody}>
          <Image
            src="/images/dashboard/course-empty.svg"
            alt="Course"
            width={42}
            height={42}
            className={styles.dcourseIcon}
          />

          <h4 className={styles.dcourseHeading}>
            No Course Purchased Yet
          </h4>

          <button className={styles.dcourseButton}>
            Get Start
          </button>
        </div>
      </div>
    </motion.section>
  );
}