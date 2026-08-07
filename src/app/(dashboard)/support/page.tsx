"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/common/Container";
import ReferralCard from "@/components/dashboard/ReferralCard";
import PortalCard from "@/components/dashboard/PortalCard";

import styles from "./Support.module.css";

const supportData = [
  {
    icon: Phone,
    title: "Call Us On",
    details: [
      "Tel : +91 8069585748",
      "Mob : +91 8069585748",
    ],
  },
  {
    icon: Mail,
    title: "Mail Us On",
    details: [
      "G-Mail Id :",
      "support@cleverln.com",
    ],
  },
  {
    icon: Clock3,
    title: "Office Hours",
    details: [
      "Call : 10AM to 8PM",
      "Mail : All Time",
    ],
  },
  {
    icon: ShieldCheck,
    title: "View Policies",
    details: [
      "Know our policy for good",
      "understanding",
    ],
  },
];

export default function SupportPage() {
  return (
    <Container>
      <motion.section
        className={styles.dsupportRoot}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* ======================================
                SUPPORT HERO CARD
        ====================================== */}

        <div className={styles.dsupportCard}>
          <div className={styles.dsupportHero}>
            <p className={styles.dsupportTag}>
              Talk to Our Experts
            </p>

            <h1 className={styles.dsupportTitle}>
              Even if you have a small query,
              <br />
              we're just one call away.
            </h1>

            <p className={styles.dsupportDescription}>
              Have a question? We're always here to help.
              Even the smallest query matters to us.
              Our expert team is just one call or message away.
              Reach out anytime and get the guidance you need.
            </p>
          </div>

          {/* ======================================
                  CONTACT CARDS
          ====================================== */}

          <div className={styles.dsupportCardGrid}>
            {supportData.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  className={styles.dsupportContactCard}
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <div
                    className={
                      styles.dsupportCardHeader
                    }
                  >
                    <Icon
                      className={
                        styles.dsupportIcon
                      }
                      size={22}
                      strokeWidth={2.2}
                    />

                    <h3>{item.title}</h3>
                  </div>

                  <div
                    className={
                      styles.dsupportCardBody
                    }
                  >
                    {item.details.map(
                      (detail, detailIndex) => (
                        <p key={detailIndex}>
                          {detail}
                        </p>
                      )
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ======================================
                EXISTING COMPONENTS
        ====================================== */}

        <div
          className={
            styles.dsupportBottomCards
          }
        >
          <ReferralCard />

          <PortalCard />
        </div>
      </motion.section>
    </Container>
  );
}