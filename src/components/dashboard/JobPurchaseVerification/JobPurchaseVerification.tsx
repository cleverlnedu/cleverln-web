"use client";

import Image from "next/image";
import { List, Star } from "lucide-react";
import styles from "./JobPurchaseVerification.module.css";

interface JobPurchaseVerificationProps {
  plan: string;
  onPaymentSuccess?: () => void;
}

export default function JobPurchaseVerification({
  plan,
  onPaymentSuccess,
}: JobPurchaseVerificationProps) {
  const jobProduct = {
    title: "Job Assistance & Job Portal",
    price: 499,
    platformCharge: 61,
    gst: 29,
    sessions: "No Limitations",
    rating: "AI Smart Insights",
  };

  const total =
    jobProduct.price +
    jobProduct.platformCharge +
    jobProduct.gst;

  return (
    <section className={styles.djobPurchaseRoot}>
      <div className={styles.djobPurchaseCard}>

        {/* =====================================================
            PRODUCT
        ===================================================== */}

        <div className={styles.djobProduct}>

          {/* IMAGE */}

          <div className={styles.djobProductBanner}>

            <Image
              src="/images/course/job-portal-banner.webp"
              alt="Job Assistance & Job Portal"
              fill
              priority
              className={styles.djobBannerImage}
            />

          </div>

          {/* CONTENT */}

          <div className={styles.djobProductContent}>

            <h2 className={styles.djobProductTitle}>
              {jobProduct.title}
            </h2>

            <div className={styles.djobMeta}>

              <span>
                <List size={15} />
                {jobProduct.sessions}
              </span>

              <span>
                <Star size={15} />
                {jobProduct.rating}
              </span>

            </div>

            <div className={styles.djobLine} />

            <p className={styles.djobDescription}>
              Apply to unlimited jobs every day through
              CleverLN. Explore 1,000+ opportunities from
              verified HR’s and reputed companies, powered
              by AI-driven insights, smart tracking, and
              personalized job recommendations.
            </p>

          </div>

        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div className={styles.djobDivider} />

        {/* =====================================================
            PURCHASE SUMMARY
        ===================================================== */}

        <div className={styles.djobSummary}>

          <h4 className={styles.djobSummaryTitle}>
            COURSE PURCHASE SUMMARY
          </h4>

          <div className={styles.djobSummaryRow}>

            <span>
              Course Price
            </span>

            <span>
              {jobProduct.price}
            </span>

          </div>

          <div className={styles.djobSummaryRow}>

            <span>
              Platform Charges
            </span>

            <span>
              {jobProduct.platformCharge}
            </span>

          </div>

          <div className={styles.djobSummaryRow}>

            <span>
              cgst & sgst
            </span>

            <span>
              {jobProduct.gst}
            </span>

          </div>

          <div className={styles.djobTotalLine} />

          <div className={styles.djobTotal}>

            <span>
              TOTAL AMOUNT PAYABLE :
            </span>

            <strong>
              RS. {total}
            </strong>

          </div>

        </div>

        {/* =====================================================
            TERMS
        ===================================================== */}

        <label className={styles.djobTerms}>

          <input
            type="checkbox"
            className={styles.djobCheckbox}
          />

          <span>
            I agree to CleverLN's Terms & Conditions and
            Refund Policy.
          </span>

        </label>

        {/* =====================================================
            PAY NOW
        ===================================================== */}

        <button
          type="button"
          className={styles.djobPayButton}
          onClick={() => {
            onPaymentSuccess?.();
          }}
        >
          Pay Now
        </button>

      </div>
    </section>
  );
}