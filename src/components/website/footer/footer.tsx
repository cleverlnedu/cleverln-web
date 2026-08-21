"use client";

import Link from "next/link";

import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerFooter}>

      <div className={styles.footerTop}>

        {/* =================================================
            LEFT ZONE
        ================================================= */}

        <div className={styles.footerLeft}>

          <div className={styles.footerColumn}>
            <h4>Explore</h4>

            <ul>
              <li>Courses to learn</li>
              <li>Programs to explore</li>
              <li>Certifications</li>
              <li>Workshops</li>
              <li>Resources</li>
            </ul>
          </div>


          <div className={styles.footerColumn}>
            <h4>Policies</h4>

            <ul>
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Support system</li>
            </ul>
          </div>

        </div>


        {/* =================================================
            CENTER CARD
        ================================================= */}

        <div className={styles.footerCenterCard}>

          <h3>CleverLN</h3>

          <p className={styles.footerTagline}>
            Empowering Smart Learning
          </p>

          <h2>
            Be a Part of Our Journey
          </h2>

          <p className={styles.footerSubtext}>
            Get updates, insights, and exclusive learning content.
          </p>

          <div className={styles.footerSubscribe}>

            <input
              type="email"
              placeholder="Email address"
            />

            <button>
              Subscribe
            </button>

          </div>

        </div>


        {/* =================================================
            RIGHT ZONE
        ================================================= */}

        <div className={styles.footerRight}>

          <div className={styles.footerColumn}>

            <h4>About Cleverln</h4>

            <ul>

              <li>
                About Us
              </li>

              <li>
                <Link href="/blogs">
                  Blog
                </Link>
              </li>

              <li>
                Careers
              </li>

              <li>
                Contact
              </li>

            </ul>

          </div>


          <div className={styles.footerColumn}>

            <h4>
              Connect With Us
            </h4>

            <div className={styles.footerSocials}>

              <span>FB</span>

              <span>IG</span>

              <span>YT</span>

              <span>X</span>

            </div>

            <p className={styles.footerBadge}>
              Trusted Learning Platform
            </p>

          </div>

        </div>


        {/* =================================================
            SECOND ROW — FOUR ADDITIONAL BLOCKS
        ================================================= */}

        <div className={styles.footerExtraLinks}>

          {/* BLOCK 1 */}

          <div className={styles.footerColumn}>

            <h4>
              Trending Courses
            </h4>

            <ul>

              <li>
                Courses to learn
              </li>

              <li>
                Programs to explore
              </li>

              <li>
                Certifications
              </li>

              <li>
                Workshops
              </li>

              <li>
                Resources
              </li>

            </ul>

          </div>


          {/* BLOCK 2 */}

          <div className={styles.footerColumn}>

            <h4>
              Hire Candidates
            </h4>

            <ul>

              <li>
                Help Center
              </li>

              <li>
                Privacy Policy
              </li>

              <li>
                Terms & Conditions
              </li>

              <li>
                Support system
              </li>

            </ul>

          </div>


          {/* BLOCK 3 */}

          <div className={styles.footerColumn}>

            <h4>
              Get OfferLater
            </h4>

            <ul>

              <li>
                Courses to learn
              </li>

              <li>
                Programs to explore
              </li>

              <li>
                Certifications
              </li>

              <li>
                Workshops
              </li>

              <li>
                Resources
              </li>

            </ul>

          </div>


          {/* BLOCK 4 */}

          <div className={styles.footerColumn}>

            <h4>
              For Leaders
            </h4>

            <ul>

              <li>
                Help Center
              </li>

              <li>
                Privacy Policy
              </li>

              <li>
                Terms & Conditions
              </li>

              <li>
                Support system
              </li>

            </ul>

          </div>

          <div className={styles.footerColumn}>

            <h4>
              Important Links
            </h4>

            <ul>

              <li>
                Help Center
              </li>

              <li>
                Privacy Policy
              </li>

              <li>
                Terms & Conditions
              </li>

              <li>
                Support system
              </li>

            </ul>

          </div>

        </div>

      </div>


      {/* =================================================
          BOTTOM BAR
      ================================================= */}

      <div className={styles.footerBottom}>

        <p>
          © 2026 CleverLN. All rights reserved.
        </p>

        <p>
          Shaped by the makers at CleverLN
        </p>

      </div>

    </footer>
  );
};

export default Footer;