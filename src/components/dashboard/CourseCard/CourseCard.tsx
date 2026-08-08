"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { List, Star } from "lucide-react";

import styles from "./CourseCard.module.css";

interface CourseCardProps {
  purchased: boolean;
}

export default function CourseCard({
  purchased,
}: CourseCardProps) {

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

        <h3 className={styles.dcourseTitle}>
          Course
        </h3>

        {/* ===========================
            EMPTY STATE
        =========================== */}

        {!purchased && (

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

            <button
              className={styles.dcourseButton}
            >
              Get Started
            </button>

          </div>

        )}






        {/* ===========================
            PURCHASED STATE
        =========================== */}

        {purchased && (

  <div className={styles.dcoursePurchased}>

    {/* =============================
        COURSE ROW
    ============================== */}

    <div className={styles.dcourseCourseRow}>

      {/* LEFT */}

      <div className={styles.dcourseBanner}>

        <Image
          src="/images/course/digital-marketing-banner.webp"
          alt="Digital Marketing"
          fill
          priority
          className={styles.dcourseBannerImage}
        />

      </div>

      {/* RIGHT */}

      <div className={styles.dcourseContent}>

        <h2 className={styles.dcourseCourseTitle}>

          Digital Marketing

        </h2>

        <div className={styles.dcourseMeta}>

          <span>

            <List size={15} />

            52 Sessions

          </span>

          <span>

            <Star size={15} />

            4.8 out of 5.0 (1248)

          </span>

        </div>

        <div className={styles.dcourseLine} />

        <p className={styles.dcourseDescription}>

          Digital marketing is no longer just
          a skill—it is the foundation of modern
          business growth.

          Learn SEO, Google Ads,
          Meta Ads, AI, Analytics,
          Content Marketing and build
          real-world projects.

        </p>

      </div>

    </div>

    {/* =============================
        DIVIDER
    ============================== */}

    <div className={styles.dcourseDivider} />


        {/* =============================
        BUILD PACK ROW
    ============================== */}

    <div className={styles.dcourseBuildRow}>

      {/* LEFT */}

      <div className={styles.dcourseBuildBanner}>

        <Image
          src="/images/course/career-build-pack.webp"
          alt="Career Build Pack"
          fill
          className={styles.dcourseBuildBannerImage}
        />

      </div>

      {/* RIGHT */}

      <div className={styles.dcourseBuildContent}>

        <h3 className={styles.dcourseBuildTitle}>

          Career Build Pack

        </h3>

        <div className={styles.dcourseBuildMeta}>

          <span>

            <List size={15} />

            Resume + LinkedIn

          </span>

          <span>

            <Star size={15} />

            AI Powered

          </span>

        </div>

        <div className={styles.dcourseIncludedRow}>

          <div className={styles.dcourseIncludedBadge}>

            ✓ Included in your purchase

          </div>

        </div>

      </div>

    </div>

    {/* =============================
        START BUTTON
    ============================== */}

    <button
      className={styles.dcourseStartButton}
      onClick={() => {

        // router.push("/dashboard/course");

      }}
    >

      Start Learning

    </button>

    








          </div>

        )}

      </div>

    </motion.section>

  );

}