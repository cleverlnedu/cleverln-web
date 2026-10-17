import type { ReactNode } from "react";
import LoadingIndicator from "@/components/common/LoadingIndicator";

type PageLoaderProps = {
  label: string;
  // A page-specific loader; defaults to the large spinner.
  fallback?: ReactNode;
};

/**
 * Loading state for pages. The logo animation is reserved for the splash on a tab refresh,
 * so pages always use the regular loader.
 */
export default function PageLoader({ label, fallback }: PageLoaderProps) {
  return fallback ?? <LoadingIndicator large label={label} />;
}
