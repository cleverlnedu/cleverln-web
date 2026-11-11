import { Suspense } from "react";
import { DashboardFromQuery } from "./DashboardClient";

// The query string is read in the browser, so this page is built once and
// served as a static file instead of being rendered on the server per visit.
export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardFromQuery />
    </Suspense>
  );
}
