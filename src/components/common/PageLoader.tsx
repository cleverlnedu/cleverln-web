"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import BrandLoader from "@/components/common/BrandLoader";
import LoadingIndicator from "@/components/common/LoadingIndicator";

// Pages left at least once since the last full page load. Resets on refresh, when the splash plays anyway.
const visitedPaths = new Set<string>();

/** Mounted once in the root layout: marks a page as visited when the user navigates away from it. */
export function PageVisitTracker() {
  const pathname = usePathname();
  useEffect(() => () => { visitedPaths.add(pathname); }, [pathname]);
  return null;
}

type PageLoaderProps = {
  label: string;
  // The regular loader shown from the second visit on. Defaults to the large spinner.
  fallback?: ReactNode;
};

/**
 * Logo animation the first time a page loads during in-app navigation; the regular loader after that.
 * On a full page load the splash already plays the animation, so this shows the regular loader
 * (that is also what the server renders, keeping hydration consistent).
 */
export default function PageLoader({ label, fallback }: PageLoaderProps) {
  const pathname = usePathname();
  const [animate] = useState(() => typeof document !== "undefined" &&
    document.documentElement.dataset.brandIntro !== "play" &&
    !visitedPaths.has(pathname));

  if (animate) return <BrandLoader label={label} />;
  return fallback ?? <LoadingIndicator large label={label} />;
}
