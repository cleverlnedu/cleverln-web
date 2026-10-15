"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { List, Star, FilePlus2 } from "lucide-react";

import styles from "./JobCard.module.css";

interface JobCardProps {
  purchased?: boolean;
}

export default function JobCard({
  purchased = false,
}: JobCardProps) {
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

      {purchased ? (

        <div className={styles.djobPurchasedCard}>

          {/* =================================================
              SECTION TITLE
          ================================================= */}

          <p className={styles.djobSectionTitle}>
            Job Portal
          </p>


          {/* =================================================
              MAIN PRODUCT ROW
          ================================================= */}

          <div className={styles.djobProductRow}>

            {/* LEFT IMAGE */}

            <div className={styles.djobBanner}>

              <Image
                src="/images/course/job-portal-banner.webp"
                alt="Job Assistance & Job Portal"
                fill
                priority
                className={styles.djobBannerImage}
              />

            </div>


            {/* RIGHT CONTENT */}

            <div className={styles.djobContent}>

              <h2 className={styles.djobTitle}>
                Job Assistance & Job Portal
              </h2>


              <div className={styles.djobMeta}>

                <span>
                  <List size={15} />
                  No Limitations
                </span>

                <span>
                  <Star size={15} />
                  AI Smart Insights
                </span>

              </div>


              <div className={styles.djobLine} />


              <p className={styles.djobDescription}>
                Apply to unlimited jobs every day through
                CleverLN. Explore 1,000+ opportunities from
                verified HR’s and reputed companies, powered
                by AI-driven insights, smart tracking, and
                personalized job recommendations.
              </p>

            </div>

          </div>


          {/* =================================================
              APPLY BUTTON
          ================================================= */}

          <button
            type="button"
            className={styles.djobApplyButton}
          >
            Apply Now
          </button>

        </div>

      ) : (

        /* =====================================================
           EMPTY STATE
        ===================================================== */

        <div className={styles.djobEmptyCard}>

          <p className={styles.djobSectionTitle}>
            Job Applied
          </p>

          <div className={styles.djobEmptyBody}>

            <Image
              src="/images/dashboard/course-empty.svg"
              alt="Course"
              width={42}
              height={42}
              className={styles.djobEmptyIcon}
            />

            <h4 className={styles.djobEmptyHeading}>
              No Single Job Applied Yet
            </h4>

            <button
              type="button"
              className={styles.djobEmptyButton}
            >
              Get Started
            </button>

          </div>

        </div>

      )}

    </motion.section>
  );
}