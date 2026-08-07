import Container from "@/components/common/Container";

import ProfileCard from "@/components/dashboard/ProfileCard";
import CourseCard from "@/components/dashboard/CourseCard";
import JobCard from "@/components/dashboard/JobCard";
import ReferralCard from "@/components/dashboard/ReferralCard";
import PortalCard from "@/components/dashboard/PortalCard";

import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  return (
    <Container>
      <div className={styles.ddashboardRoot}>
        <ProfileCard />

        
          <CourseCard />
          <JobCard />
       

        <div className={styles.ddashboardGrid}>
          <ReferralCard />
          <PortalCard />
        </div>
      </div>
    </Container>
  );
}