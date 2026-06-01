"use client";

import styles from "./jobcard.module.css";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Jobcard = () => {
  const sectionRef = useRef<HTMLDivElement>(null); // 🔥 single ref

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(styles.show);
      } else {
        entry.target.classList.remove(styles.show);
      }
    },
    {
      threshold: 0.15,                 // 🔥 lower threshold
      rootMargin: "0px 0px -120px 0px", // 🔥 trigger earlier
    }
  );

  if (sectionRef.current) observer.observe(sectionRef.current);

  return () => observer.disconnect();
}, []);


  return (
    <section ref={sectionRef} className={styles.jobSection}>
      <div className={styles.container}>

       {/* LEFT IMAGE */}
<div className={styles.imageWrap}>
  <picture>
    {/* 🔥 Mobile-only image */}
    <source
      srcSet="/girl1.jpg"
      media="(max-width: 468px)"
    />

    {/* 🔥 Existing desktop image (UNCHANGED) */}
    <Image
      src="/girl2.jpg"
      alt="Apply smarter for jobs"
      width={420}
      height={520}
      priority
      className={styles.image}
    />
  </picture>
</div>


        {/* RIGHT CONTENT */}
        <div className={styles.content}>
          <h2 className={styles.heading}>
            You Didn’t Fail. <br />
            The System Ignored You <strong>!!</strong>
          </h2>

          <p className={styles.subtext}>
            Cleverln gives students and graduates direct access to real
            openings — with <strong>5 FREE trials</strong>.
            <br />
            Access opportunities early. Apply with confidence.
          </p>

          <button className={styles.cta}>APPLY FOR JOBS</button>
        </div>

      </div>
    </section>
  );
};

export default Jobcard;
