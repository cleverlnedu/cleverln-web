"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./Testimonials.module.css";

const testimonials = [
  {
    initials: "DS",
    name: "Diksha S",
    text: "Taking the UI/UX course on Cleverln gave me the exact skills I needed. I successfully cleared two interviews right after finishing! Truly incredible.",
    course: "UI/UX Designer",
  },
  {
    initials: "CB",
    name: "Chetan B",
    text: "Thanks to this course, I successfully leveled up from a frontend engineer to a full-stack engineer. Invaluable content for career growth!",
    course: "Full Stack developer",
  },
  {
    initials: "BK",
    name: "Batchu K",
    text: "Today, I work as a digital marketer, and I credit a massive part of my career success to the rock-solid foundation I built through this course.",
    course: "Digital Marketing",
  },
  {
    initials: "AK",
    name: "Ankit K",
    text: "I would highly recommend this AI program to anyone looking to future-proof their career or dive deep into cutting-edge AI engineering.",
    course: "Agentic AI",
  },
];

export default function Testimonials() {
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
      className={`${styles.reviewsTestimonialsSection} ${
        visible ? styles.reviewsTestimonialsVisible : ""
      }`}
    >
      <div className={styles.reviewsTestimonialsContainer}>

        {/* =================================================
            TITLE
        ================================================= */}

        <h2 className={styles.reviewsTestimonialsTitle}>
          Real stories, Real growth: See what our Learners are Achieving
        </h2>


        {/* =================================================
            TESTIMONIAL GRID
        ================================================= */}

        <div className={styles.reviewsTestimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={styles.reviewsTestimonialCard}
              style={{
                transitionDelay: visible
                  ? `${index * 80}ms`
                  : "0ms",
              }}
            >

              {/* Quote */}

              <div className={styles.reviewsQuoteMark}>
                “
              </div>


              {/* Testimonial */}

              <p className={styles.reviewsTestimonialText}>
                {testimonial.text}
              </p>


              {/* User */}

              <div className={styles.reviewsTestimonialUser}>

                <div className={styles.reviewsAvatar}>
                  {testimonial.initials}
                </div>

                <span className={styles.reviewsUserName}>
                  {testimonial.name}
                </span>

              </div>


              {/* Course */}

              <a
                href="#"
                className={styles.reviewsCourseLink}
              >
                {testimonial.course}

                <span className={styles.reviewsArrow}>
                  ›
                </span>
              </a>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}