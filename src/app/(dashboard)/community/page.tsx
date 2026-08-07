"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

import styles from "./Community.module.css";

const communityPosters = [
  "/images/community/post.webp",
  "/images/community/post.webp",
  "/images/community/post.webp",
  "/images/community/post.webp",
];

export default function CommunityPage() {
  return (
    <Container>
      <motion.section
        className={styles.dcommunityRoot}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className={styles.dcommunityCard}>
          {/* ==========================================
              HERO SECTION
          ========================================== */}

          <div className={styles.dcommunityHero}>
            <p className={styles.dcommunityTag}>
              Join - Connect - Grow
            </p>

            <h1 className={styles.dcommunityTitle}>
              Grow with Expert{" "}
              <span>Mentors</span> and a Strong{" "}
              <span>Community.</span>
            </h1>

            <p className={styles.dcommunityDescription}>
              Join the CleverLN Community and learn from top mentors with
              expert career guidance. Build valuable connections with
              students, professionals, and industry leaders. Join
              thousands of learners already growing their skills,
              careers, and future with CleverLN.
            </p>

            <Button
              variant="primary"
              className={styles.dcommunityJoinButton}
            >
              Join Now
            </Button>
          </div>

          {/* ==========================================
              COMMUNITY POSTERS
          ========================================== */}

          <div className={styles.dcommunityPosterWrapper}>
            {communityPosters.map((poster, index) => (
              <motion.div
                key={index}
                className={styles.dcommunityPoster}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <Image
                  src={poster}
                  alt={`Community Poster ${index + 1}`}
                  fill
                  priority={index === 0}
                  className={styles.dcommunityPosterImage}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </Container>
  );
}