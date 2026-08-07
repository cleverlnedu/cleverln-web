import Container from "@/components/common/Container";
import UpdateCard from "@/components/dashboard/UpdateCard";

import styles from "./LiveUpdates.module.css";

const updates = [
  {
    department: "Hiring dept",
    title: "Job Assistance & Job Portal",
    description:
      "Apply to unlimited jobs every day through CleverLN. Explore 1,000+ opportunities from verified HR's and reputed companies, powered by AI-driven insights, smart tracking, and personalized job recommendations.",
    author: "Krupa",
    designation: "HR manager",
    avatar: "/images/live-updates/krupa.webp",
    time: "08.23AM",
    featured: true,
  },

  {
    department: "Student dept",
    title: "Proven record 2000 New enrollment",
    description:
      "Apply to unlimited jobs every day through CleverLN. Explore 1,000+ opportunities from verified HR's and reputed companies, powered by AI-driven insights, smart tracking, and personalized job recommendations.",
    author: "Karunya",
    designation: "Mentoring Head",
    avatar: "/images/live-updates/krupa.webp",
    time: "05.23PM",
  },


   {
    department: "Hiring dept",
    title: "Job Assistance & Job Portal",
    description:
      "Apply to unlimited jobs every day through CleverLN. Explore 1,000+ opportunities from verified HR's and reputed companies, powered by AI-driven insights, smart tracking, and personalized job recommendations.",
    author: "Krupa",
    designation: "HR manager",
    avatar: "/images/live-updates/krupa.webp",
    time: "08.23AM",
    featured: true,
  },

  {
    department: "Student dept",
    title: "Proven record 2000 New enrollment",
    description:
      "Apply to unlimited jobs every day through CleverLN. Explore 1,000+ opportunities from verified HR's and reputed companies, powered by AI-driven insights, smart tracking, and personalized job recommendations.",
    author: "Karunya",
    designation: "Mentoring Head",
    avatar: "/images/live-updates/krupa.webp",
    time: "05.23PM",
  },


  {
    department: "Product dept",
    title: "New product has been added to list",
    description:
      "Apply to unlimited jobs every day through CleverLN. Explore 1,000+ opportunities from verified HR's and reputed companies, powered by AI-driven insights, smart tracking, and personalized job recommendations.",
    author: "Deepan",
    designation: "Product manager",
    avatar: "/images/live-updates/krupa.webp",
    time: "12.23AM",
  },

  {
    department: "Student dept",
    title: "40 Leaders become a CA",
    description:
      "Apply to unlimited jobs every day through CleverLN. Explore 1,000+ opportunities from verified HR's and reputed companies, powered by AI-driven insights, smart tracking, and personalized job recommendations.",
    author: "Karunya",
    designation: "Mentoring Head",
    avatar: "/images/live-updates/krupa.webp",
    time: "05.23PM",
  },
];

export default function LiveUpdatesPage() {
  return (
    <Container>
      <section className={styles.dliveRoot}>
        <div className={styles.dliveContainer}>
          <div className={styles.dliveHeader}>
            <h1 className={styles.dliveTitle}>
              Today's Updates
            </h1>
          </div>

          <div className={styles.dliveCards}>
            {updates.map((update, index) => (
              <UpdateCard
                key={index}
                department={update.department}
                title={update.title}
                description={update.description}
                author={update.author}
                designation={update.designation}
                avatar={update.avatar}
                time={update.time}
                featured={update.featured}
              />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}