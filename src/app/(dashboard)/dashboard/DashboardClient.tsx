"use client";

import { useRouter } from "next/navigation";

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

interface DashboardClientProps {
  verify: boolean;
  purchased: boolean;
  jobVerify: boolean;
  jobPurchased: boolean;
  plan: string;
}

export default function DashboardClient({
  verify,
  purchased,
  jobVerify,
  jobPurchased,
  plan,
}: DashboardClientProps) {
  const router = useRouter();

  /* =========================================================
     ANY PURCHASE COMPLETED
  ========================================================= */

  const purchaseCompleted =
    purchased || jobPurchased;


  /* =========================================================
     JOB CARD VISIBILITY
     
     Hide empty JobCard after Course purchase.

     Show it when:
     - Course not purchased
     - OR Job Portal purchased
  ========================================================= */

  const showJobCard =
    !purchased || jobPurchased;


  /* =========================================================
     PAYMENT PAGE
  ========================================================= */

  const isPaymentPage =
    verify || jobVerify;


  return (
    <Container>

      <div className={styles.ddashboardWrapper}>

        {/* =====================================================
            PROFILE
        ===================================================== */}

        <ProfileCard />


        {/* =====================================================
            PAYMENT PAGE
        ===================================================== */}

        {verify ? (

          <PurchaseVerification
            plan={plan}
            onPaymentSuccess={() => {
              router.push(
                "/dashboard?purchased=true"
              );
            }}
          />

        ) : jobVerify ? (

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
                COURSE
            ================================================= */}

            <CourseCard
              purchased={purchased}
            />


            {/* =================================================
                JOB

                Hidden after course purchase unless the
                Job Portal has also been purchased.
            ================================================= */}

            {showJobCard && (
              <JobCard
                purchased={jobPurchased}
              />
            )}


            {/* =================================================
                REFERRAL + RIGHT CARD
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