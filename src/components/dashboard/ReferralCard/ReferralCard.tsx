"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./ReferralCard.module.css";

export default function ReferralCard() {
  return (
    <motion.section
      className={styles.drefRoot}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.drefCard}>
        {/* Left Illustration */}

        <div className={styles.drefImageWrapper}>
          <Image
            src="/images/dashboard/referral.webp"
            alt="Refer & Earn"
            fill
            priority
            className={styles.drefImage}
          />
        </div>

        {/* Right Content */}

        <div className={styles.drefContent}>
          <h3 className={styles.drefTitle}>
            Refer 2 friends. Get Rs.100 cash Instantly.
          </h3>

          <p className={styles.drefDescription}>
            Once both referrals successfully join,
            the cash 100 will be credited to your
            CleverLN Wallet. Share, earn and grow
            with CleverLN!
          </p>

          <button
            type="button"
            className={styles.drefButton}
          >
            Claim it
          </button>
        </div>
      </div>
    </motion.section>
  );
}