"use client";

import { motion } from "framer-motion";

import Container from "@/components/common/Container";
import SupportContact from "@/components/common/SupportContact/SupportContact";
import ReferralCard from "@/components/dashboard/ReferralCard";
import PortalCard from "@/components/dashboard/PortalCard";

import styles from "./Support.module.css";

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

        <SupportContact />

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
