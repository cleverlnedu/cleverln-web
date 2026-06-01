'use client';
import Link from "next/link";

import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
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

  <li>
    <Link href="/blogs">Blog</Link>
  </li>

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
    </footer>
  );
};

export default Footer;


