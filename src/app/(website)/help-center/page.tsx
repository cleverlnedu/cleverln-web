import type { Metadata } from "next";

import HelpCenter from "@/components/website/HelpCenter/HelpCenter";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Talk to CleverLN's experts by phone or email. Calls 10AM to 8PM, email any time.",
};

export default function HelpCenterPage() {
  return <HelpCenter />;
}
