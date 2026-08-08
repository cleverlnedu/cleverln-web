"use client";

import { useState } from "react";
import Image from "next/image";
import { List, Star } from "lucide-react";

import styles from "./PurchaseVerification.module.css";

interface PurchaseVerificationProps {
  plan: string;
  onPaymentSuccess?: () => void;
}

export default function PurchaseVerification({
  plan,
  onPaymentSuccess,
}: PurchaseVerificationProps) {

  const [buildPackAdded, setBuildPackAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const course =
    plan === "advantage"
      ? {
          title: "Digital Marketing",
          price: 1499,
          platformCharge: 61,
          gst: 29,
          sessions: "52 Sessions",
          rating: "4.8 out of 5.0 (1248)",
        }
      : {
          title: "Digital Marketing",
          price: 399,
          platformCharge: 61,
          gst: 29,
          sessions: "52 Sessions",
          rating: "4.8 out of 5.0 (1248)",
        };

  const total =
    course.price +
    course.platformCharge +
    course.gst;

  const handleBuildPack = () => {

    if (!buildPackAdded) {

      setBuildPackAdded(true);

      setShowToast(true);

      setTimeout(() => {

        setShowToast(false);

      }, 2200);

    } else {

      setBuildPackAdded(false);

    }

  };

  return (

    <section className={styles.dpurchaseRoot}>

      <div className={styles.dpurchaseCard}>
                

                <p className={styles.dpurchaseSectionTitle}>
          Course
        </p>

        <div className={styles.dpurchaseCourse}>

          <div className={styles.dpurchaseCourseBanner}>

            <Image
              src="/images/course/digital-marketing-banner.webp"
              alt="Digital Marketing"
              fill
              priority
              className={styles.dpurchaseBannerImage}
            />

          </div>

          <div className={styles.dpurchaseCourseContent}>

            <h2 className={styles.dpurchaseCourseTitle}>
              {course.title}
            </h2>

            <div className={styles.dpurchaseMeta}>

              <span>

                <List size={15} />

                {course.sessions}

              </span>

              <span>

                <Star size={15} />

                {course.rating}

              </span>

            </div>

            <div className={styles.dpurchaseLine} />

            <p className={styles.dpurchaseDescription}>

              Digital marketing is the backbone
              of modern businesses.

              Learn SEO, Ads, AI,
              Social Media, Analytics,
              Content Marketing and build
              real-world projects.

            </p>

          </div>

        </div>

        {!buildPackAdded && (

          <div className={styles.dpurchaseDivider} />

        )}

                {/* =========================
            CAREER BUILD PACK
        ========================= */}

        <div className={styles.dpurchaseAddon}>

          {/* LEFT */}

          <div className={styles.dpurchaseAddonBanner}>

            <Image
              src="/images/course/career-build-pack.webp"
              alt="Career Build Pack"
              fill
              className={styles.dpurchaseAddonImage}
            />

          </div>

          {/* RIGHT */}

          <div className={styles.dpurchaseAddonContent}>

            <h3 className={styles.dpurchaseAddonTitle}>
              Career Build Pack
            </h3>

            <div className={styles.dpurchaseMeta}>

              <span>

                <List size={15} />

                Resume + LinkedIn

              </span>

              <span>

                <Star size={15} />

                AI Powered

              </span>

            </div>

            <div className={styles.dpurchaseAddonBottom}>

              <div className={styles.dpurchasePrice}>

                ₹0

                {!buildPackAdded && (

                  <span>

                    ₹499

                  </span>

                )}

              </div>

              <button
                type="button"
                className={
                  buildPackAdded
                    ? styles.dpurchaseRemoveButton
                    : styles.dpurchaseAddButton
                }
                onClick={handleBuildPack}
              >

                {buildPackAdded
                  ? "REMOVE"
                  : "ADD"}

              </button>

            </div>

            

          </div>

          

        </div>

        {showToast && (

          <div className={styles.dpurchaseToast}>

            <div className={styles.dpurchaseToastEmoji}>
              🎉
            </div>

            <div>

              <h5>
                Congratulations!
              </h5>

              <p>
                Career Build Pack unlocked for FREE.
              </p>

            </div>

          </div>

        )}

        {/* =========================
            PURCHASE SUMMARY
        ========================= */}

        <div className={styles.dpurchaseSummary}>

          <h4 className={styles.dpurchaseSummaryTitle}>
            COURSE PURCHASE SUMMARY
          </h4>

          <div className={styles.dpurchaseSummaryRow}>

            <span>
              Course Price
            </span>

            <span>
              ₹{course.price}
            </span>

          </div>

          <div className={styles.dpurchaseSummaryRow}>

            <span>
              Career Build Pack
            </span>

            <span
              className={
                buildPackAdded
                  ? styles.dpurchaseIncluded
                  : styles.dpurchaseNotAdded
              }
            >

              {buildPackAdded
                ? "✓ Included"
                : "Not Added"}

            </span>

          </div>

                    <div className={styles.dpurchaseSummaryRow}>

            <span>
              Platform Charges
            </span>

            <span>
              ₹{course.platformCharge}
            </span>

          </div>

          <div className={styles.dpurchaseSummaryRow}>

            <span>
              CGST & SGST
            </span>

            <span>
              ₹{course.gst}
            </span>

          </div>

          <div className={styles.dpurchaseTotal}>

            <span>
              TOTAL AMOUNT PAYABLE :
            </span>

            <strong>
              ₹{total}
            </strong>

          </div>

        </div>

        {/* =========================
            TERMS
        ========================= */}

        <label className={styles.dpurchaseTerms}>

          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) =>
              setAcceptedTerms(e.target.checked)
            }
          />

          <span>
            I agree to CleverLN's Terms &
            Conditions and Refund Policy.
          </span>

        </label>

        {/* =========================
            PAY BUTTON
        ========================= */}

        <button

            type="button"

            disabled={!acceptedTerms}

            className={styles.dpurchasePayButton}

            onClick={() => {

                if (!acceptedTerms) return;

                onPaymentSuccess?.();

            }}

        >

            Pay Now

        </button>

      </div>

    </section>

  );

}