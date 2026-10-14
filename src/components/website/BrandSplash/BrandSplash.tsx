"use client";

import { useEffect, useRef } from "react";
import BrandLoader from "@/components/common/BrandLoader";
import styles from "./BrandSplash.module.css";

export default function BrandSplash() {
  const splash = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const element = splash.current;
    if (!element || root.dataset.brandIntro !== "play") return;
    let active = true;
    root.style.overflow = "hidden";

    const finish = () => {
      if (!active) return;
      root.dataset.brandIntro = "seen";
      root.style.removeProperty("overflow");
    };
    // The fade-out is pure CSS; this also resolves if it already finished before hydration.
    void Promise.all(element.getAnimations().map((animation) => animation.finished)).then(finish, finish);

    return () => {
      active = false;
      root.style.removeProperty("overflow");
    };
  }, []);

  return <div ref={splash} className={styles.brandSplash}>
    <BrandLoader label="Welcome to CleverLN" showStatus={false} />
  </div>;
}
