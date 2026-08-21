"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "./TrustedCompanies.module.css";

const companies = [
  {
    name: "rpay",
    image: "/images/website/trusted/rpay.webp",
  },
  {
    name: "buf",
    image: "/images/website/trusted/buffer.webp",
  },
  {
    name: "trello",
    image: "/images/website/trusted/trello.webp",
  },
  
  {
    name: "spot",
    image: "/images/website/trusted/spotify.webp",
  },
  {
    name: "del",
    image: "/images/website/trusted/dell.webp",
  },
  {
    name: "linkedln",
    image: "/images/website/trusted/linkedin.webp",
  },
  {
    name: "slack",
    image: "/images/website/trusted/slack.webp",
  },
  {
    name: "hpp",
    image: "/images/website/trusted/host.webp",
  },
  
];

export default function TrustedCompanies() {
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
      className={`${styles.reviewsTrustSection} ${
        visible ? styles.reviewsTrustVisible : ""
      }`}
    >
      <div className={styles.reviewsTrustContainer}>

        {/* =================================================
            TRUST TEXT
        ================================================= */}

        <p className={styles.reviewsTrustText}>
          Trusted by over 500+ companies and 10k+ learners around the world.
        </p>


        {/* =================================================
            LOGO STRIP
        ================================================= */}

        <div className={styles.reviewsTrustLogoViewport}>
          <div className={styles.reviewsTrustLogos}>

            {companies.map((company, index) => (
              <div
                key={company.name}
                className={styles.reviewsTrustLogo}
                style={{
                  transitionDelay: visible
                    ? `${index * 70}ms`
                    : "0ms",
                }}
              >
                <Image
                  src={company.image}
                  alt={company.name}
                  width={90}
                  height={32}
                  className={styles.reviewsTrustLogoImage}
                />
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}