"use client";

import { useEffect, useEffectEvent, useId } from "react";
import Image from "next/image";
import styles from "./BrandLoader.module.css";

// Shapes traced from /public/logo.webp (608×174) so the animation lands exactly on the real logo.
const TOP_ARC = "M73.8 .4C73.4 .7 72.5 .9 71.6 1C69.8 1.2 65.3 2.3 63.2 3C58 4.9 54.4 6.2 53.3 6.8C52.8 7 51.5 7.6 50.3 8.1C45.1 10.6 38.4 14.7 34.7 17.7C28.5 22.6 27.4 23.6 24.9 26.3C22.7 28.7 20.2 31.5 19.8 32.1C19.6 32.4 18.7 33.6 17.7 34.9C15.8 37.4 12.7 42 12.1 43.3C11.8 43.8 11.4 44.6 11.1 44.9C8.4 49 3 63.8 2.1 69.7C2 70.1 1.8 71.1 1.7 72C1.5 72.9 1.2 74.8 1 76.3C.8 78 .5 79.4 .3 79.8C0 80.6-.2 92.5.1 92.5C.5 92.5.8 91.3 1.1 89.5C2.7 78.4 6 69.2 11.7 59.8C18.6 48.6 30.8 37.6 42.3 32.4C43 32.1 44.2 31.5 45 31.1C47 30.2 51.4 28.5 53.9 27.8C55.7 27.3 59 26.6 63.1 25.9L66.4 25.3 81.8 25.3 85.2 25.8C87 26.1 89 26.5 89.5 26.6C90 26.7 91.1 27 91.9 27.1C94.2 27.5 98.9 28.9 100.2 29.6C100.4 29.7 101.1 30 101.7 30.2C103 30.6 109 33.6 111.8 35.1C114.8 36.8 117.6 38.7 121.8 42.2C125.8 45.3 125.5 45.4 129.1 42C130.8 40.5 132.1 39.4 136.3 35.8C137.7 34.6 139.5 33 140.3 32.3C142.3 30.6 144.2 28.9 145.7 27.7C148 25.9 148 25.5 145.6 23.1C139.5 16.9 127.6 9.4 118.5 6C117.8 5.8 116.6 5.3 115.8 5C113.7 4.2 108.8 2.8 105.7 2.1C104.7 1.9 103.6 1.6 103.2 1.5C102.9 1.4 101.8 1.2 100.8 1.1C98.8.8 97 .4 96.9.1C96.9.1 91.8 0 85.7 0L74.6 0Z";
const BOTTOM_ARC = "M125.4 132.2C117.8 139.9 109.4 145.6 100.4 149C100 149.2 99.2 149.5 98.8 149.7C91.8 152.6 80.5 153.8 72.8 152.4C61.2 150.2 54.1 144.4 50.5 134C49.3 130.6 48.7 130.2 48.4 132.8C48.2 135.3 48.9 143 49.5 145C49.7 145.6 49.9 146.5 50.1 147.1C54.6 165.5 72 175.8 94.7 173.3C95.6 173.2 97.1 173.1 98.2 173C100.8 172.8 107.3 171.3 109.8 170.4C110.2 170.3 112.2 169.6 114.2 169C116.1 168.3 118 167.7 118.2 167.5C118.5 167.4 119.1 167.2 119.6 167C122.2 166.1 127.8 163.4 130.3 161.8C131.2 161.3 133 160.3 134.4 159.5C138.1 157.5 140.5 155.8 142.1 154.2C142.8 153.4 143.9 152.4 144.6 152C146.5 150.7 147.7 149.3 147.7 148.3C147.7 147.3 129.5 129.3 128.5 129.3C128.3 129.3 127 130.6 125.4 132.2Z";
const BODY = "M40.8 37.8C31.8 42.3 22 51.4 15.8 60.9C14 63.5 11.5 67.7 11.2 68.7C11.1 69 10.8 69.6 10.6 70C9.3 72.8 8.8 74.3 7.8 77.3C7.1 79.2 6.2 82.3 6.1 83.1C6 83.5 5.8 84.3 5.6 85C3.5 93.7 3.9 107.9 6.7 116.7C8.1 121.3 8.9 123.6 9.6 125.1C9.7 125.4 10.2 126.4 10.7 127.5C15.8 139.1 26 150.8 38.1 159C44.7 163.4 47.3 164.8 55.4 168.2C59 169.7 60.8 170.2 61 169.5C61 169.1 61 169.1 58.3 166.8C51.6 161 46.1 150.8 45.2 142.3C43.8 130.1 45.4 122.2 50.8 113.1C54.2 107.3 61.6 101.1 70.2 96.9C77.3 93.4 79 92.8 84.5 91.8C91 90.5 95 90.7 102 92.7C105.9 93.9 101.3 89.1 95.1 85.7C88.1 81.8 78.9 80.9 65 82.6C55.6 83.8 48.6 83.2 42.9 80.8C38.6 79 34.4 73.8 32.7 68.2L32.3 66.6 32.3 61.6C32.3 56.9 32.3 56.5 32.6 54.9C33.8 50 37.2 43.7 41 39.2C42.5 37.4 42.5 36.9 40.8 37.8Z";

// Matches the end of the last animation step in BrandLoader.module.css.
const INTRO_MS = 2900;

type BrandLoaderProps = {
  label?: string;
  onIntroEnd?: () => void;
};

export default function BrandLoader({ label = "Loading", onIntroEnd }: BrandLoaderProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const fill = `url(#${id}-fill)`;

  const handleIntroEnd = useEffectEvent(() => onIntroEnd?.());

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => handleIntroEnd(), reduceMotion ? 0 : INTRO_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return <div className={styles.brandLoader} role="status" aria-label={label}>
    <div className={styles.brandLoaderLogo}>
      <Image src="/logo.webp" alt="" width={608} height={174} loading="eager" className={styles.brandLoaderImage} />
      <svg className={styles.brandLoaderStage} viewBox="0 0 608 174" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" x2="1">
            <stop offset="0" stopColor="#13b07b" />
            <stop offset="1" stopColor="#045a3b" />
          </linearGradient>
          <linearGradient id={`${id}-board`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#0d7a56" />
            <stop offset="1" stopColor="#03382a" />
          </linearGradient>
          <clipPath id={`${id}-ring`}><circle cx="74" cy="87" r="89" /></clipPath>
          <g id={`${id}-cap`}>
            <path d="M-9-1V6C-9 9.5 9 9.5 9 6V-1Z" fill="#06573d" />
            <path d="M0-9 16-2.5 0 4-16-2.5Z" fill={`url(#${id}-board)`} />
            <path d="M0-2.5 11 1.5V8" fill="none" stroke="#f4b740" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M9.8 8H12.2L12.8 12.5H9.2Z" fill="#f4b740" />
            <circle cx="0" cy="-2.5" r="1.3" fill="#f4b740" />
          </g>
        </defs>

        <g clipPath={`url(#${id}-ring)`}>
          <g className={styles.boyRise}>
            <g className={styles.boySwing}>
              <path d={BODY} fill={fill} />
              <circle cx="55.45" cy="60.05" r="14.5" fill={fill} />
              <g className={styles.heldCap}>
                <use href={`#${id}-cap`} transform="translate(104 76) rotate(-12) scale(1.6)" />
              </g>
            </g>
          </g>
        </g>

        <g className={styles.topArcIn}>
          <g className={styles.topArcGrip}><path d={TOP_ARC} fill={fill} /></g>
        </g>
        <g className={styles.bottomArcIn}><path d={BOTTOM_ARC} fill={fill} /></g>

        <g className={styles.flyingCap}><use href={`#${id}-cap`} /></g>
      </svg>
    </div>
    <span className={styles.brandLoaderLabel} aria-hidden="true">{label}</span>
    <span className={styles.brandLoaderBar} aria-hidden="true" />
  </div>;
}
