"use client";

import { useEffect } from "react";

import SupportContact from "@/components/common/SupportContact/SupportContact";

import styles from "./HelpCenter.module.css";

// Opened from "Help Center" in the footer: the same "Talk to Our Experts" card as the dashboard Support page.
export default function HelpCenter() {
  // Coming from the footer, start at the top of the page (like Privacy Policy and Terms).
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <main className={styles.helpPage}>
      <div className={styles.helpWrap}>
        <SupportContact />
      </div>
    </main>
  );
}
