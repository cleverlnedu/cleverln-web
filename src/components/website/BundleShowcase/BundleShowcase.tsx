"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import styles from "./BundleShowcase.module.css";

export default function BundleShowcase() {
  const bundleSectionRef = useRef<HTMLElement | null>(null);

  const [bundleVisible, setBundleVisible] = useState(false);

  useEffect(() => {
    const bundleSection = bundleSectionRef.current;

    if (!bundleSection) return;

    const bundleObserver = new IntersectionObserver(
      ([entry]) => {
        setBundleVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    bundleObserver.observe(bundleSection);

    return () => {
      bundleObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={bundleSectionRef}
      className={`${styles.bundleShowcaseSection} ${
        bundleVisible ? styles.bundleShowcaseVisible : ""
      }`}
    >
      <div className={styles.bundleShowcaseContainer}>

        {/* =================================================
            COMPLETE BUNDLE IMAGE
        ================================================= */}
        <h2 className={styles.bundleShowcaseTitle}>
          Take the test. Qualify. Unlock your LMS for Free.
        </h2>

        <div className={styles.bundleImageWrapper}>

          {/* DESKTOP IMAGE */}

          <picture>
            <source
              media="(max-width: 700px)"
              srcSet="/images/bundle/bundle-mobile.webp"
            />

            <img
              src="/images/bundle/bundle-desktop.webp"
              alt="CleverLN learning bundle"
              className={styles.bundleShowcaseImage}
            />
          </picture>


          {/* =================================================
              CLICKABLE CTA
          ================================================= */}

          <Link
            href="/courses"
            className={styles.bundleClickableButton}
            aria-label="Claim the CleverLN learning bundle"
          >
            <span className={styles.bundleButtonText}>
              CLAIM NOW
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}