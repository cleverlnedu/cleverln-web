"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Container from "@/components/common/Container";

import ProfileCard from "@/components/dashboard/ProfileCard";
import CourseCard from "@/components/dashboard/CourseCard";
import StudentAmbassadorCard from "@/components/dashboard/StudentAmbassadorCard";
import PurchaseVerification from "@/components/dashboard/PurchaseVerification";
import JobPurchaseVerification from "@/components/dashboard/JobPurchaseVerification";
import JobCard from "@/components/dashboard/JobCard";
import ReferralCard from "@/components/dashboard/ReferralCard";
import PortalCard from "@/components/dashboard/PortalCard";

import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* =========================================================
     COURSE PURCHASE
  ========================================================= */

  const verify =
    searchParams.get("verify") === "true";

  const purchased =
    searchParams.get("purchased") === "true";


  /* =========================================================
     JOB PORTAL PURCHASE
  ========================================================= */

  const jobVerify =
    searchParams.get("jobVerify") === "true";

  const jobPurchased =
    searchParams.get("jobPurchased") === "true";


  /* =========================================================
     PLAN
  ========================================================= */

  const plan =
    searchParams.get("plan") || "standard";


  /* =========================================================
     PAYMENT PAGE
  ========================================================= */

  const isPaymentPage =
    verify || jobVerify;


  /* =========================================================
     ANY PURCHASE COMPLETED
  ========================================================= */

  const purchaseCompleted =
    purchased || jobPurchased;


  /* =========================================================
     JOB CARD VISIBILITY
     
     Show JobCard when:
     - Course has NOT been purchased
     - OR Job Portal has been purchased

     Hide JobCard when:
     - Course is purchased
     - Job Portal is NOT purchased
  ========================================================= */

  const showJobCard =
    !purchased || jobPurchased;


  return (
    <Container>

      <div className={styles.ddashboardWrapper}>

        {/* =====================================================
            PROFILE
        ===================================================== */}

        <ProfileCard />


        {/* =====================================================
            PAYMENT PAGES
        ===================================================== */}

        {verify ? (

          /* ---------------------------------------------------
             COURSE PURCHASE VERIFICATION
          --------------------------------------------------- */

          <PurchaseVerification
            plan={plan}
            onPaymentSuccess={() => {
              router.push(
                "/dashboard?purchased=true"
              );
            }}
          />

        ) : jobVerify ? (

          /* ---------------------------------------------------
             JOB PORTAL PURCHASE VERIFICATION
          --------------------------------------------------- */

          <JobPurchaseVerification
            plan={plan}
            onPaymentSuccess={() => {
              router.push(
                "/dashboard?jobPurchased=true"
              );
            }}
          />

        ) : (

          /* ===================================================
             NORMAL DASHBOARD
          =================================================== */

          <>

            {/* =================================================
                COURSE CARD
            ================================================= */}

            <CourseCard
              purchased={purchased}
            />


            {/* =================================================
                JOB CARD

                Hidden after course purchase unless
                Job Portal itself has also been purchased.
            ================================================= */}

            {showJobCard && (
              <JobCard
                purchased={jobPurchased}
              />
            )}


            {/* =================================================
                REFERRAL + AMBASSADOR / PORTAL
            ================================================= */}

            <div className={styles.ddashboardGrid}>

              <ReferralCard />

              {purchaseCompleted ? (

                <StudentAmbassadorCard />

              ) : (

                <PortalCard />

              )}

            </div>

          </>
        )}

      </div>

    </Container>
  );
}