"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SkillsHero.module.css";

const heroProfiles = [
  {
    image: "/images/hero/1.webp",
    role: "Buyer",
  },
  {
    image: "/images/hero/users.webp",
    role: "Agent",
  },
  {
    image: "/images/hero/buyer.webp",
    role: "Transaction Coordinator",
  },
  {
    image: "/images/hero/users.webp",
    role: "Seller",
  },
  {
    image: "/images/hero/buyer.webp",
    role: "Buyer",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);

  /* =========================================================
     TOUCH SWIPE
  ========================================================= */

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);


  /* =========================================================
     DESKTOP AUTO ROTATION
     MOBILE DOES NOT AUTO ROTATE
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      // Force React update when screen size changes.
      // The interval itself checks the current screen width.
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    if (isHovered) return;

    /*
      Do not automatically rotate on mobile.
    */

    if (window.innerWidth <= 700) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroProfiles.length);
    }, 4800);

    return () => clearInterval(interval);
  }, [isHovered]);


  /* =========================================================
     TOUCH START
  ========================================================= */

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };


  /* =========================================================
     TOUCH END
  ========================================================= */

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const touchEndX =
      event.changedTouches[0].clientX;

    const touchEndY =
      event.changedTouches[0].clientY;

    const differenceX =
      touchEndX - touchStartX.current;

    const differenceY =
      touchEndY - touchStartY.current;


    /* Reset touch values */

    touchStartX.current = null;
    touchStartY.current = null;


    /*
      Ignore vertical swipes.

      This allows the user to scroll the page normally.
    */

    if (
      Math.abs(differenceY) >
      Math.abs(differenceX)
    ) {
      return;
    }


    /*
      Minimum horizontal swipe distance.
    */

    if (Math.abs(differenceX) < 50) {
      return;
    }


    /*
      Swipe LEFT
      → NEXT CARD
    */

    if (differenceX < 0) {
      setActiveIndex(
        (prev) =>
          (prev + 1) %
          heroProfiles.length
      );

      return;
    }


    /*
      Swipe RIGHT
      → PREVIOUS CARD
    */

    setActiveIndex(
      (prev) =>
        (prev - 1 + heroProfiles.length) %
        heroProfiles.length
    );
  };


  /* =========================================================
     CARD POSITION
  ========================================================= */

  const getPosition = (index: number) => {
    const total = heroProfiles.length;

    let difference =
      index - activeIndex;

    if (
      difference >
      Math.floor(total / 2)
    ) {
      difference -= total;
    }

    if (
      difference <
      -Math.floor(total / 2)
    ) {
      difference += total;
    }

    return difference;
  };


  return (
    <section
      className={styles.heroSection}
    >

      <div
        className={styles.heroContainer}
      >

        {/* =================================================
            HEADING
        ================================================= */}

        <div
          className={styles.heroContent}
        >

          <h1
            className={styles.heroTitle}
          >
            Your Degree Isn’t Enough.{" "}
            <span>
              Your Skills Are.
            </span>
          </h1>


          <p
            className={styles.heroDescription}
          >
            <strong>
              CleverLN’s
            </strong>{" "}
            helps you learn job-ready skills,
            find jobs, freelance, connect and
            grow.
          </p>


          <a
            href="/courses"
            className={styles.heroButton}
          >
            Explore Now
          </a>

        </div>


        {/* =================================================
            PROFILE CAROUSEL
        ================================================= */}

        <div
          className={styles.heroCarousel}

          onMouseEnter={() =>
            setIsHovered(true)
          }

          onMouseLeave={() =>
            setIsHovered(false)
          }

          onTouchStart={handleTouchStart}

          onTouchEnd={handleTouchEnd}
        >

          <div
            className={styles.heroGlow}
          />


          <div
            className={styles.heroProfiles}
          >

            {heroProfiles.map(
              (profile, index) => {

                const position =
                  getPosition(index);

                return (
                  <div
                    key={`${profile.role}-${index}`}

                    className={`
                      ${styles.heroProfile}
                      ${
                        position === 0
                          ? styles.heroProfileCenter
                          : ""
                      }
                    `}

                    data-position={position}
                  >

                    <div
                      className={
                        styles.heroProfileImageWrap
                      }
                    >

                      <img
                        src={profile.image}

                        alt={profile.role}

                        className={
                          styles.heroProfileImage
                        }

                        draggable={false}
                      />

                    </div>

                  </div>
                );
              }
            )}

          </div>


          {/* =================================================
              CAROUSEL INDICATORS
          ================================================= */}

          <div
            className={styles.heroIndicators}
          >

            {heroProfiles.map(
              (_, index) => (

                <button
                  key={index}

                  type="button"

                  aria-label={
                    `Show profile ${index + 1}`
                  }

                  className={`
                    ${styles.heroIndicator}
                    ${
                      index === activeIndex
                        ? styles.heroIndicatorActive
                        : ""
                    }
                  `}

                  onClick={() =>
                    setActiveIndex(index)
                  }
                />

              )
            )}

          </div>

        </div>

      </div>

    </section>
  );
}