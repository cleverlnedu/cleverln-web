"use client";
import Link from "next/link";
import styles from "./certifie.module.css";
import { motion } from "framer-motion";

const stats = [
  {
    id: 1,
    number: "10+",
    text: "Advanced Courses helped students get recognized by TechWorld",
    button: "View Courses",
    link: "/courses",   // ✅ added
  },
  {
    id: 2,
    number: "100+",
    text: "Jobs are waiting for you to apply when you have skills to show",
    button: "View Jobs",
    link: "/opportunities",      // ✅ added
  },
  {
    id: 3,
    number: "2k+",
    text: "Students are ready to develop the company to next milestone",
    button: "Hire Now",
    link: "/hire",      // ✅ added
  },
];

export default function certifie() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* TITLE */}
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          Why you need to certifie with <span className={styles.gradientText}>CleverLn</span>
        </motion.h2>

        {/* SUBTITLE */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false}}
        >
          Learn <span>Cleverln’s</span> job-ready skills, find jobs, freelance,
          internships and connect with companies all in one place.
        </motion.p>

        {/* CARDS */}
        <div className={styles.cards}>
          {stats.map((item, index) => (
  <motion.div
    key={item.id}
    className={styles.card}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6,
      delay: index * 0.2,
    }}
    viewport={{ once: false }}
  >
    <h3 className={styles.number}>{item.number}</h3>
    <p className={styles.text}>{item.text}</p>

    <Link href={item.link} className={styles.button}>
      {item.button}
    </Link>
  </motion.div>
))}
        </div>

      </div>
    </section>
  );
}