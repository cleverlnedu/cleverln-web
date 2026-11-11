"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Dashboard animations follow the visitor's "reduce motion" system setting. */
export default function MotionPreferences({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
