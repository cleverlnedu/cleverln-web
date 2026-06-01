'use client';

import { useEffect, useRef } from "react";
import styles from "./recommend.module.css";
import Image from "next/image";

const Recommend = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null); // 🔥 NEW

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.show);
        } else {
          entry.target.classList.remove(styles.show); // 🔥 THIS LINE
        }
      });
    },
    { threshold: 0.3 }
  );

  if (statsRef.current) observer.observe(statsRef.current);
  if (cardRef.current) observer.observe(cardRef.current);

  return () => observer.disconnect();
}, []);


  return (
    <section className={styles.section}>
      {/* Top Stats */}
      <div className={styles.stats_up}>
        <p>The fastest-growing product on CleverLn for a reason</p>
      </div>

      {/* STATS */}
      <div ref={statsRef} className={styles.stats}>
        <div className={styles.statCard}>
          <h2>10X</h2>
          <p>faster video production</p>
        </div>
        <div className={styles.statCard}>
          <h2>40%</h2>
          <p>increase in video watch time</p>
        </div>
        <div className={styles.statCard}>
          <h2>5X</h2>
          <p>increase in video asset output</p>
        </div>
        <div className={styles.statCard}>
          <h2>5X</h2>
          <p>return on ad spend</p>
        </div>
      </div>

      {/* Recommendation Content */}
      <div className={styles.content}>
        {/* Left */}
        <div className={styles.textBlock}>
          <span className={styles.tag}>Globally Acclaimed</span>
          <h3 className={styles.heading}>
            Recommended by your Favourite Influencers <br />
            and Creators
          </h3>
        </div>

        {/* 🔥 CARD WITH ANIMATION */}
        <div ref={cardRef} className={styles.card}>
          <div className={styles.left}>
            <div className={styles.profileBg} />
            <Image
              src="/girl.jpg"
              alt="Profile sticker"
              width={190}
              height={190}
              className={styles.stickerImg}
              priority
            />
          </div>

          <div className={styles.right}>
            <p className={styles.quote}>
              The strategies taught in this program helped me grow my personal brand
              exponentially.
            </p>

            <div className={styles.author}>
              <h4>Tanmay Bhat</h4>
              <span>Youtuber, Comedian & Investor</span>
            </div>

            <div className={styles.users}>
              <Image src="/user1.jpg" alt="" width={32} height={32} />
              <Image src="/user2.jpg" alt="" width={32} height={32} />
              <Image src="/user3.jpg" alt="" width={32} height={32} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommend;
