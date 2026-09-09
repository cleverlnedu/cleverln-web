"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Courses.module.css";

import {
  cleverLNCourses,
  cleverLNCategories,
  CleverLNCourse,
} from "@/data/coursesData";


/* =========================================================
   COURSE CARD
========================================================= */

function CleverLNCourseCard({
  course,
}: {
  course: CleverLNCourse;
}) {
  return (
    <Link
      href="/product"
      className={styles.coursesMarketplaceCard}
    >

      {/* =================================================
          COURSE IMAGE
      ================================================= */}

      <div
        className={
          styles.coursesMarketplaceImageWrapper
        }
      >

        {/* PREMIUM BADGE */}

        {course.premium && (
          <span
            className={
              styles.coursesMarketplacePremiumBadge
            }
          >
            ✺ Premium
          </span>
        )}

        <Image
          src={course.image}
          alt={course.title}
          width={320}
          height={180}
          className={
            styles.coursesMarketplaceImage
          }
        />

      </div>


      {/* =================================================
          COURSE TITLE
      ================================================= */}

      <h3
        className={
          styles.coursesMarketplaceCardTitle
        }
      >
        {course.title}
      </h3>


      {/* =================================================
          RATING
      ================================================= */}

      <div
        className={
          styles.coursesMarketplaceRating
        }
      >

        <span
          className={
            styles.coursesMarketplaceRatingNumber
          }
        >
          {course.rating}
        </span>

        <span className={styles.coursesMarketplaceStars}>
          <span className={styles.coursesMarketplaceStarsEmpty}>
            ★★★★★
          </span>

          <span
            className={styles.coursesMarketplaceStarsFill}
            style={{
              width: `${(course.rating / 5) * 100}%`,
            }}
          >
            ★★★★★
          </span>
        </span>

        <span
          className={
            styles.coursesMarketplaceReviewCount
          }
        >
          ({course.reviews})
        </span>

      </div>

    </Link>
  );
}


/* =========================================================
   COURSE SECTION
========================================================= */

function CleverLNCourseSection({
  title,
  courses,
  sectionId,
}: {
  title: string;
  courses: CleverLNCourse[];
  sectionId: string;
}) {

  const sliderRef =
    useRef<HTMLDivElement | null>(null);


  /* =======================================================
     SCROLL SLIDER
  ======================================================= */

  const scrollSlider = (
    direction: "next" | "prev"
  ) => {

    if (!sliderRef.current) return;

    const slider =
      sliderRef.current;

    const firstCard =
      slider.querySelector(
        `.${styles.coursesMarketplaceCard}`
      ) as HTMLElement | null;

    if (!firstCard) return;

    const cardWidth =
      firstCard.offsetWidth;

    const computedStyle =
      window.getComputedStyle(slider);

    const gap =
      parseFloat(
        computedStyle.columnGap ||
        computedStyle.gap ||
        "32"
      );

    const scrollAmount =
      cardWidth + gap;

    slider.scrollBy({
      left:
        direction === "next"
          ? scrollAmount
          : -scrollAmount,
      behavior: "smooth",
    });
  };


  /* =======================================================
     NO COURSES
  ======================================================= */

  if (!courses || courses.length === 0) {
    return null;
  }


  return (
    <section
      id={sectionId}
      className={
        styles.coursesMarketplaceSection
      }
    >

      {/* =================================================
          SECTION HEADING
      ================================================= */}

      <div
        className={
          styles.coursesMarketplaceHeadingRow
        }
      >

        <h2
          className={
            styles.coursesMarketplaceSectionTitle
          }
        >
          {title}
        </h2>

      </div>


      {/* =================================================
          COURSE SLIDER
      ================================================= */}

      <div
        className={
          styles.coursesMarketplaceSlider
        }
      >

        


        {/* =================================================
            HORIZONTAL TRACK

            Desktop:
            Courses stay in ONE ROW.

            Mobile:
            Native horizontal touch/swipe scrolling.
        ================================================= */}

        <div
          ref={sliderRef}
          className={
            styles.coursesMarketplaceTrack
          }
        >

          {courses.map((course) => (
            <CleverLNCourseCard
              key={course.id}
              course={course}
            />
          ))}

        </div>


        {/* =================================================
            NEXT ARROW
        ================================================= */}

        {courses.length > 5 && (
          <button
            type="button"
            className={`${styles.coursesMarketplaceSliderArrow} ${styles.coursesMarketplaceSliderArrowNext}`}
            onClick={() =>
              scrollSlider("next")
            }
            aria-label={`Next ${title} courses`}
          >
            ›
          </button>
        )}

      </div>

    </section>
  );
}


/* =========================================================
   MAIN COURSES PAGE
========================================================= */

export default function Courses() {

  return (
    <main
      className={
        styles.coursesMarketplacePage
      }
    >

      {/* =====================================================
          STICKY CATEGORY NAVIGATION

          This exists ONLY inside the Courses component,
          so it will not appear on other pages.
      ===================================================== */}

      <div
        className={
          styles.coursesMarketplaceCategoryBar
        }
      >

        <nav
          className={
            styles.coursesMarketplaceCategoryContainer
          }
        >

          {cleverLNCategories.map(
            (category) => {

              const sectionId =
                category
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "");

              return (
                <a
                  key={category}
                  href={`#${sectionId}`}
                  className={
                    styles.coursesMarketplaceCategoryItem
                  }
                >
                  {category}
                </a>
              );
            }
          )}

        </nav>

      </div>


      {/* =====================================================
          COURSE CONTENT
      ===================================================== */}

      <div
        className={
          styles.coursesMarketplaceContainer
        }
      >

        {/* =================================================
            RECOMMENDED
        ================================================= */}

        <CleverLNCourseSection
          title="Recommended for you"
          sectionId="recommended"
          courses={
            cleverLNCourses.slice(0, 7)
          }
        />


        {/* =================================================
            TRENDING
        ================================================= */}

        <CleverLNCourseSection
          title="Trending Courses in CleverLN"
          sectionId="trending"
          courses={
            cleverLNCourses.slice(7, 14)
          }
        />


        {/* =================================================
            CATEGORY SECTIONS
        ================================================= */}

        {cleverLNCategories.map(
          (category) => {

            const categoryCourses =
              cleverLNCourses.filter(
                (course) =>
                  course.category === category
              );

            const sectionId =
              category
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

            return (
              <CleverLNCourseSection
                key={category}
                title={category}
                sectionId={sectionId}
                courses={categoryCourses}
              />
            );
          }
        )}

      </div>

    </main>
  );
}