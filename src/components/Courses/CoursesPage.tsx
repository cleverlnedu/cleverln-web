"use client";
import Link from 'next/link';
import { useState } from "react";
import styles from "./Courses.module.css";


type Course = {
  id: number;
  title: string;
  description: string;
  sessions: number;
  price: number;
  oldPrice: number;
  type: "live" | "recorded";
};

const coursesData: Course[] = [
  {
    id: 1,
    title: "Full-Stack Programmer",
    description:
      "Upgrade your skills, this program is designed to take you from zero to building real-world, professional websites and applications.",
    sessions: 125,
    price: 8000,
    oldPrice: 9999,
    type: "live",
  },
  {
    id: 2,
    title: "Full-Stack Programmer",
    description:
      "Upgrade your skills, this program is designed to take you from zero to building real-world, professional websites and applications.",
    sessions: 125,
    price: 8000,
    oldPrice: 9999,
    type: "recorded",
  },
  {
    id: 3,
    title: "Full-Stack Programmer",
    description:
      "Upgrade your skills, this program is designed to take you from zero to building real-world, professional websites and applications.",
    sessions: 125,
    price: 8000,
    oldPrice: 9999,
    type: "live",
  },
  {
    id: 4,
    title: "Full-Stack Programmer",
    description:
      "Upgrade your skills, this program is designed to take you from zero to building real-world, professional websites and applications.",
    sessions: 125,
    price: 8000,
    oldPrice: 9999,
    type: "recorded",
  },
  {
    id: 5,
    title: "Full-Stack Programmer",
    description:
      "Upgrade your skills, this program is designed to take you from zero to building real-world, professional websites and applications.",
    sessions: 125,
    price: 8000,
    oldPrice: 9999,
    type: "live",
  },
  {
    id: 6,
    title: "Full-Stack Programmer",
    description:
      "Upgrade your skills, this program is designed to take you from zero to building real-world, professional websites and applications.",
    sessions: 125,
    price: 8000,
    oldPrice: 9999,
    type: "recorded",
  },
];

export default function CoursesPage() {
  // ✅ FIX: show all 6 cards by default
  const [activeTab, setActiveTab] = useState<"live" | "recorded" | "all">(
    "all"
  );

  const filteredCourses =
    activeTab === "all"
      ? coursesData
      : coursesData.filter((course) => course.type === activeTab);

  return (
    <div className={styles.container}>


      {/* Tabs */}

      <div className={styles.tabs}>
  <div className={styles.tabWrapper}>
    
    <button
      className={`${styles.tab} ${
        activeTab === "live" ? styles.activeTab : ""
      }`}
      onClick={() => setActiveTab("live")}
    >
      Live Sessions
    </button>

    <div className={styles.divider}></div>

    <button
      className={`${styles.tab} ${
        activeTab === "recorded" ? styles.activeTab : ""
      }`}
      onClick={() => setActiveTab("recorded")}
    >
      Recorded Sessions
    </button>

    <div className={styles.divider}></div>

    <button
      className={`${styles.tab} ${
        activeTab === "all" ? styles.activeTab : ""
      }`}
      onClick={() => setActiveTab("all")}
    >
      Both Sessions
    </button>

  </div>
</div>

      {/* Cards Wrapper */}
      <div className={styles.cardsWrapper}>
        <div className={styles.grid}>
          {filteredCourses.map((course) => (
            <div key={course.id} className={styles.card}>
              <div>
                <div className={styles.cardTop}>
                  <span className={styles.sessions}>
                    {course.sessions} SESSIONS
                  </span>

                  {/* ✅ Match UI exactly */}
                  <span className={styles.badge}>Live Classes</span>
                </div>

                <h3 className={styles.title}>{course.title}</h3>
                <p className={styles.description}>{course.description}</p>
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.priceWrapper}>
                  <span className={styles.oldPrice}>
                    ₹{course.oldPrice.toLocaleString()}
                  </span>
                  <span className={styles.price}>
                    Rs.{course.price.toLocaleString()}
                  </span>
                </div>

                <button className={styles.button} ><Link href="/product">Know more</Link></button>
              </div>
            </div>
          ))}
        </div>
      </div>

           
</div>
  )
}
