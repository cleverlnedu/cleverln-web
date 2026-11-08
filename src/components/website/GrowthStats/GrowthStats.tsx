"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./GrowthStats.module.css";

// The last two repeat claims made elsewhere on the site (pricing: "Trusted by 519+ universities";
// support FAQ: team available 24/7), so the numbers stay consistent across pages.
const stats = [
  {
    value: "10X",
    description: "faster placement",
  },
  {
    value: "100%",
    description: "hands-on learning experience",
  },
  {
    value: "519+",
    description: "universities trust CleverLN",
  },
  {
    value: "24/7",
    description: "learner support",
  },
];

export default function GrowthStats() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.growthSection} ${
        visible ? styles.growthVisible : ""
      }`}
    >
      <div className={styles.growthContainer}>

        {/* =================================================
            TITLE
        ================================================= */}

        <h2 className={styles.growthTitle}>
          Fastest Growing. Most Loved. Built for a Reason.
        </h2>


        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div
              key={`${stat.value}-${stat.description}`}
              className={styles.statCard}
              style={{
                transitionDelay: visible
                  ? `${index * 90}ms`
                  : "0ms",
              }}
            >
              <div className={styles.statValue}>
                {stat.value}
              </div>

              <p className={styles.statDescription}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}