'use client';

import styles from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
  // ===== BACKGROUND CIRCLE (INLINE COMPONENT LOGIC) =====
  const CircleBackground = ({
    size = 420,
    outerColor = "#ffffff",
    innerColor = "#ababab",
  }) => {
    const borderWidth = size * 0.002;
    const outerShadowBlur = size * 0.14;
    const innerShadowBlur = size * 0.15;

    return (
      <div className={styles.circleContainer}>


          <div
    className={styles.outerCircle1}
    style={{
      width: `${size * 1.03}px`,
      height: `${size *1.03}px`,
      
      boxShadow: `0px ${outerShadowBlur / 1.8}px ${outerShadowBlur * 1.15}px rgba(0,0,0,0.48)`,
      padding: `${borderWidth}px`,
    }}
  > </div>

        
         <div
    className={styles.outerCircle}
    style={{
      width: `${size}px`,
      height: `${size *1}px`,
      backgroundColor: outerColor,
      boxShadow: `0px ${outerShadowBlur / 0.8}px ${outerShadowBlur * 1.15}px rgba(0,0,0,0)`,
      padding: `${borderWidth}px`,
    }}
  >      
  
      
          <div
  className={styles.innerCircle}
  style={{
    backgroundColor: "#e6e6e6", // neutral inner circle base
    boxShadow: `
      inset 5px ${innerShadowBlur / 3}px ${innerShadowBlur}px rgba(0,0,0,0.95),
      inset 0px -${innerShadowBlur / 3}px ${innerShadowBlur / 2}px rgba(255,255,255,0.15)
    `,
  }}
>
  {/* ELLIPSE INSIDE THE INNER CIRCLE */}
  <div
    className={styles.innerEllipse}
    style={{
      backgroundColor: "#B9EDDC",
    }}
  />
</div>

        </div>
      </div>
    );
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>

        {/* ===== LEFT CONTENT (UNCHANGED) ===== */}
        <div className={styles.left}>
          <h1 className={styles.heading}>
            Your Degree Isn’t <br />
            Enough. <span>Your Skills Are.</span>
          </h1>

          <p className={styles.subtext}>
            Learn <strong>Cleverln’s</strong> job-ready skills, find jobs,
            freelance, internships and connect with<br/> companies — all in one place.
          </p>

          <button className={styles.cta}>
            Explore Now
          </button>
        </div>

        <div className={styles.right}>
  {/* BACKGROUND CIRCLE */}
  <div className={styles.bgWrapper}>
    <CircleBackground size={420} outerColor="#ffffff" innerColor="#B9EDDC" />
  </div>

  {/* MAIN HERO IMAGE */}
  
</div>

      </div>
    </section>
  );
};

export default Hero;