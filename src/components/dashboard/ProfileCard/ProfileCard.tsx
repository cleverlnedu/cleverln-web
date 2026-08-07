"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  GraduationCap,
  MapPin,
} from "lucide-react";

import styles from "./ProfileCard.module.css";

export default function ProfileCard() {
  return (
    <motion.section
      className={styles.dprofileRoot}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.dprofileCard}>
        <div className={styles.dprofileWrapper}>

          {/* Avatar */}

          <div className={styles.dprofileAvatarWrapper}>
            <div className={styles.dprofileAvatarBox}>
              <Image
                src="/images/dashboard/avatar.webp"
                alt="Profile"
                fill
                priority
                className={styles.dprofileAvatar}
              />
            </div>
          </div>

          {/* Content */}

          <div className={styles.dprofileContent}>

            {/* Name */}

            <h2 className={styles.dprofileName}>
              Ms. Anvitha H
            </h2>

            {/* Subtitle */}

            <p className={styles.dprofileSubtitle}>
              I am a Full Stack Developer from The Oxford College of Engineering
            </p>

            {/* Information */}

            <div className={styles.dprofileInfoRow}>

              <div className={styles.dprofileInfoItem}>
                <Mail size={17} strokeWidth={2} />
                <span>iamanvitha@gmail.com</span>
              </div>

              <div className={styles.dprofileInfoItem}>
                <Phone size={17} strokeWidth={2} />
                <span>8904683524</span>
              </div>

              <div className={styles.dprofileInfoItem}>
                <GraduationCap size={17} strokeWidth={2} />
                <span>Graduated</span>
              </div>

              <div className={styles.dprofileInfoItem}>
                <MapPin size={17} strokeWidth={2} />
                <span>Bangalore, Karnataka</span>
              </div>

            </div>

            {/* Buttons */}

            <div className={styles.dprofileButtonRow}>

              <a
                href="https://linkedin.com"
                target="_blank"
                className={styles.dprofileLinkedinBtn}
              >
                LinkedIn
              </a>

              <button
                className={styles.dprofileEditBtn}
              >
                Edit Profile
              </button>

              <button
                className={styles.dprofileLogoutBtn}
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      </div>
    </motion.section>
  );
}