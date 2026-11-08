import type { Metadata } from "next";

import RefundPolicy from "@/components/website/RefundPolicy/RefundPolicy";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "CleverLN fees are non-refundable: when you register, a slot in the batch is allotted to you, so a booked slot cannot be cancelled or undone.",
};

export default function RefundPolicyPage() {
  return <RefundPolicy />;
}
