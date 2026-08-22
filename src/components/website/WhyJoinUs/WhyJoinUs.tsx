"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WhyJoinUs.module.css";

const benefits = [
  {
    icon: "/images/why-join-us/influence.webp",
    title: "INFLUENCE",
    description:
      "Become the voice people trust and turn your skills into real impact in your career.",
  },
  {
    icon: "/images/why-join-us/mentorship.webp",
    title: "MENTORSHIP",
    description:
      "Learn directly from industry experts through workshops, BTS sessions, and insider access.",
  },
  {
    icon: "/images/why-join-us/ai-skill-check.webp",
    title: "AI SKILL CHECK",
    description:
      "Learn with AI insights. Identify your weak areas and focus where you need to improve.",
  },
  {
    icon: "/images/why-join-us/opportunities.webp",
    title: "OPPORTUNITIES",
    description:
      "Unlock paid internships, job community, event access, certificates, and brand shoutouts.",
  },
  {
    icon: "/images/why-join-us/community.webp",
    title: "COMMUNITY",
    description:
      "Connect with people who think like you, build with you, and rise alongside you.",
  },
  {
    icon: "/images/why-join-us/growth.webp",
    title: "GROWTH",
    description:
      "Get constant challenges, feedback, and resources that level up your skills and confidence.",
  },
];

export default function WhyJoinUs() {
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
        threshold: 0.18,
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
      className={`${styles.whyJoinUsSection} ${
        visible ? styles.whyJoinUsVisible : ""
      }`}
    >
      <div className={styles.whyJoinUsContainer}>

        {/* =================================================
            EYEBROW
        ================================================= */}

        <div className={styles.whyJoinUsEyebrow}>
          WHY JOIN US
        </div>


        {/* =================================================
            TITLE
        ================================================= */}

        <h2 className={styles.whyJoinUsTitle}>
          A Space Where{" "}
          <span>Your Voice, Your Growth,</span> and{" "}
          <span>Your Influence</span> Actually Matter.
        </h2>


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p className={styles.whyJoinUsDescription}>
          Upskill, build your future, and level up your career with a high-impact certificate.
        </p>


        {/* =================================================
            BENEFITS
        ================================================= */}

        <div className={styles.whyJoinUsGrid}>
          {benefits.map((benefit, index) => (
            <div
              className={styles.whyJoinUsItem}
              key={benefit.title}
              style={
                {
                  "--why-join-delay": `${index * 120}ms`,
                } as React.CSSProperties
              }
            >

              {/* ICON CIRCLE */}

              <div className={styles.whyJoinUsIconWrapper}>
                
                  <img
                    src={benefit.icon}
                    alt=""
                    className={styles.whyJoinUsIcon}
                  />
                
              </div>


              {/* CONTENT */}

              <div className={styles.whyJoinUsContent}>
                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}