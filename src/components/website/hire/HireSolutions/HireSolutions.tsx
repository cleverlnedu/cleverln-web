"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./HireSolutions.module.css";

const hiringTabs = ["Freshers", "Experienced", "Interns"];

export default function HireSolutions() {
  const [activeTab, setActiveTab] = useState(hiringTabs[0]);

  return (
    <section className={styles.hireSolutionsSection}>
      <div className={styles.hireSolutionsContainer}>

        {/* =================================================
            HEADING
        ================================================= */}

        <div className={styles.hireSolutionsHeader}>
          <h2 className={styles.hireSolutionsTitle}>
            Your all in one Hiring solution.
          </h2>

          <p className={styles.hireSolutionsDescription}>
            One platform for HRs to hire candidates across all
            industries—with CleverLN Pro.
          </p>
        </div>


        {/* =================================================
            TABS
        ================================================= */}

        <div className={styles.hireSolutionsTabs}>
          {hiringTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-pressed={activeTab === tab}
              className={`${styles.hireSolutionsTab} ${
                activeTab === tab ? styles.hireSolutionsTabActive : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>


        {/* =================================================
            AI HIRING CARD
        ================================================= */}

        <div className={styles.hireSolutionsCard}>

          <div className={styles.hireSolutionsContent}>
            <h3 className={styles.hireSolutionsCardTitle}>
              Hire smarter with AI analysis and top candidate priority.
            </h3>

            <p className={styles.hireSolutionsCardDescription}>
              Discover top talent with advanced AI analysis. Gain deep
              insights through comprehensive reports. Shortlist the best
              candidates with speed and accuracy. Scale your hiring with
              CleverLN Pro.
            </p>

            <button
              type="button"
              className={styles.hireSolutionsButton}
            >
              Hire Now
            </button>
          </div>

          <div className={styles.hireSolutionsVisual}>
            <Image
              src="/images/hire/ai-hiring-visual.webp"
              alt="CleverLN monthly sign-ups report showing 73% new profiles, next to a graduate"
              width={1490}
              height={1073}
              sizes="(max-width: 700px) 100vw, 745px"
              className={styles.hireSolutionsImage}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
