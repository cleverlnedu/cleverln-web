"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "./SkillsTrending.module.css";

const skills = [
  {
    title: "AI Based",
    profiles: "857+ Profiles Already In",
    icon: "/images/website/skills/ai-based.png",
  },
  {
    title: "Finance",
    profiles: "447+ Profiles Already In",
    icon: "/images/website/skills/finance.png",
  },
  {
    title: "Design",
    profiles: "2857+ Profiles Already In",
    icon: "/images/website/skills/design.png",
  },
  {
    title: "Development",
    profiles: "1157+ Profiles Already In",
    icon: "/images/website/skills/development.png",
  },
  {
    title: "Business",
    profiles: "597+ Profiles Already In",
    icon: "/images/website/skills/business.png",
  },
  {
    title: "HR",
    profiles: "1839+ Profiles Already In",
    icon: "/images/website/skills/hr.png",
  },
];

export default function SkillsTrending() {
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
      className={`${styles.skillsSection} ${
        visible ? styles.skillsVisible : ""
      }`}
    >
      <div className={styles.skillsContainer}>

        {/* =================================================
            INTRO
        ================================================= */}

        <div className={styles.skillsIntro}>
          <h2 className={styles.skillsTitle}>
            Discover What’s Trending. Learn the
            
            Skills in Global Demand.
          </h2>

          <p className={styles.skillsDescription}>
            Every course is thoughtfully designed to be learner-friendly,
            career-focused, and built around the skills in demand.
          </p>
        </div>


        {/* =================================================
            SKILL CARDS
        ================================================= */}

        {skills.map((skill, index) => (
          <div
            key={skill.title}
            className={styles.skillCard}
            style={{
              transitionDelay: visible
                ? `${index * 80}ms`
                : "0ms",
            }}
          >

            {/* SVG ICON */}

            <div className={styles.skillIcon}>
              <Image
                src={skill.icon}
                alt=""
                width={32}
                height={32}
                className={styles.skillIconImage}
              />
            </div>


            {/* CARD CONTENT */}

            <div className={styles.skillInfo}>

              <h3 className={styles.skillTitle}>
                {skill.title}
              </h3>

              <p className={styles.skillProfiles}>
                {skill.profiles}
              </p>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}