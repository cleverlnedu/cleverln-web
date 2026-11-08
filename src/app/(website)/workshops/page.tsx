import type { Metadata } from "next";

import WorkshopsView from "./WorkshopsView";

export const metadata: Metadata = {
  title: "Workshops: Coming soon",
  description: "CleverLN workshops are on their way: live, hands-on sessions with industry experts, behind-the-scenes access and live Q&A.",
};

export default function WorkshopsPage() {
  return <WorkshopsView />;
}
