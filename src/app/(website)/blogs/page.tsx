"use client";

import { useState } from "react";
import styles from "./blogs.module.css";

const blogsData = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  image: i % 2 === 0 ? "/blogs/blog.1.png" : "/blogs/blog.2.png",
}));

export default function BlogsPage() {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className={styles.container}>
      
      {/* TITLE */}
      <h1 className={styles.title}>
        Expert & Student Review Blogs
      </h1>

      {/* TABS */}
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "students" ? styles.active : ""}`}
            onClick={() => setActiveTab("students")}
          >
            By students
          </button>

          <div className={styles.divider}></div>

          <button
            className={`${styles.tab} ${activeTab === "problems" ? styles.active : ""}`}
            onClick={() => setActiveTab("problems")}
          >
            Current Problems
          </button>

          <div className={styles.divider}></div>

          <button
            className={`${styles.tab} ${activeTab === "interesting" ? styles.active : ""}`}
            onClick={() => setActiveTab("interesting")}
          >
            Interesting
          </button>
        </div>
      </div>

      {/* GRID (IMAGE ONLY) */}
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {blogsData.map((blog) => (
            <div key={blog.id} className={styles.card}>
              <img src={blog.image} className={styles.imageOnly} alt="blog" />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ FOOTER ADDED HERE */}
<div className={styles.footer}>

  <div className={styles.top}>

    {/* LEFT ZONE */}
    <div className={styles.left}>
      <div className={styles.column}>
        <h4>Explore</h4>
        <ul>
          <li>Courses to learn</li>
          <li>Programs to explore</li>
          <li>Certifications</li>
          <li>Workshops</li>
          <li>Resources</li>
        </ul>
      </div>

      <div className={styles.column}>
        <h4>Important Links</h4>
        <ul>
          <li>Help Center</li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li>Support system</li>
        </ul>
      </div>
    </div>

    {/* CENTER CARD */}
    <div className={styles.centerCard}>
      <h3>CleverLN</h3>
      <p className={styles.tagline}>Empowering Smart Learning</p>

      <h2>Be a Part of Our Journey</h2>
      <p className={styles.subtext}>
        Get updates, insights, and exclusive learning content.
      </p>

      <div className={styles.subscribe}>
        <input type="email" placeholder="Email address" />
        <button>Subscribe</button>
      </div>
    </div>

    {/* RIGHT ZONE */}
    <div className={styles.right}>
      <div className={styles.column}>
        <h4>Learn</h4>
        <ul>
          <li>Get to Know About Us</li>
          <li>Blog</li>
          <li>Careers</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className={styles.column}>
        <h4>Connect With Us</h4>
        <div className={styles.socials}>
          <span>FB</span>
          <span>IG</span>
          <span>YT</span>
          <span>X</span>
        </div>
        <p className={styles.badge}>Trusted Learning Platform</p>
      </div>
    </div>

  </div>

  {/* BOTTOM BAR */}
  <div className={styles.bottom}>
    <p>© 2026 CleverLN. All rights reserved.</p>
    <p>Made with ❤️ by CleverLN Team</p>
  </div>

</div>
</div>
  )
}

