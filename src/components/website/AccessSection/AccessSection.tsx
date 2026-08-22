"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "./AccessSection.module.css";

const audienceItems = [
  "FRESHERS",
  "EXPERIENCED",
  "STUDENTS",
];

export default function AccessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
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
      className={`${styles.accessSection} ${
        visible ? styles.accessVisible : ""
      }`}
    >
      <div className={styles.accessContainer}>

        {/* =================================================
            LEFT IMAGE
        ================================================= */}

        <div className={styles.accessVisual}>
          <Image
            src="/images/website/access-opportunities.webp"
            alt="Access career opportunities with CleverLN"
            width={900}
            height={700}
            className={styles.accessImage}
            priority={false}
          />
        </div>


        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <div className={styles.accessContent}>

          {/* =================================================
              TITLE
          ================================================= */}

          <h2 className={styles.accessTitle}>
            You Didn’t Fail.{" "}
            <span>The System</span>{" "}
            Ignored you.
          </h2>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p className={styles.accessDescription}>
            CleverLN gives students and graduates direct access to
            real openings —{" "}
            <strong>with 5 FREE trials.</strong>
          </p>


          {/* =================================================
              AUDIENCE BUTTONS
          ================================================= */}

          <div className={styles.accessAudience}>
            {audienceItems.map((item) => (
              <button
                type="button"
                className={styles.accessAudienceButton}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>


          {/* =================================================
              CTA
          ================================================= */}

          <a
            href="/opportunities"
            className={styles.accessButton}
          >
            Get Access
          </a>

        </div>

      </div>
    </section>
  );
}