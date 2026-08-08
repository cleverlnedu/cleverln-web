"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Container from "@/components/common/Container";

import ProfileCard from "@/components/dashboard/ProfileCard";
import CourseCard from "@/components/dashboard/CourseCard";
import StudentAmbassadorCard from "@/components/dashboard/StudentAmbassadorCard";
import PurchaseVerification from "@/components/dashboard/PurchaseVerification";
import JobCard from "@/components/dashboard/JobCard";
import ReferralCard from "@/components/dashboard/ReferralCard";
import PortalCard from "@/components/dashboard/PortalCard";

import styles from "./Dashboard.module.css";

export default function DashboardPage() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const verify =
    searchParams.get("verify") === "true";

  const purchased =
    searchParams.get("purchased") === "true";

  const plan =
    searchParams.get("plan") || "standard";

  return (

    <Container>

      <div className={styles.ddashboardWrapper}>

        <ProfileCard />

        {verify ? (

          <PurchaseVerification

            plan={plan}

            onPaymentSuccess={() => {

              router.push(
                "/dashboard?purchased=true"
              );

            }}

          />

        ) : (

          <CourseCard
            purchased={purchased}
          />

        )}

        <JobCard />

        <div className={styles.ddashboardGrid}>

            <ReferralCard />

            {purchased ? (

                <StudentAmbassadorCard />

            ) : (

                <PortalCard />

            )}

            </div>

      </div>

    </Container>

  );

}