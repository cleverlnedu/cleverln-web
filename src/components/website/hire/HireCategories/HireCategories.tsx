import Image from "next/image";
import styles from "./HireCategories.module.css";

const categories = [
  {
    title: "Marketing",
    profiles: "857+ Profiles Already In",
    icon: "/icons/marketing.png",
  },
  {
    title: "Finance",
    profiles: "447+ Profiles Already In",
    icon: "/icons/finance.png",
  },
  {
    title: "Sales",
    profiles: "2857+ Profiles Already In",
    icon: "/icons/sales.png",
  },
  {
    title: "Engineering",
    profiles: "1157+ Profiles Already In",
    icon: "/icons/engineering.png",
  },
  {
    title: "Business",
    profiles: "597+ Profiles Already In",
    icon: "/icons/business.png",
  },
  {
    title: "HR",
    profiles: "1839+ Profiles Already In",
    icon: "/icons/hr.png",
  },
];

export default function HireCategories() {
  return (
    <section className={styles.hireCategoriesSection}>
      <div className={styles.hireCategoriesGrid}>

        {/* =================================================
            INTRO
        ================================================= */}

        <div className={styles.hireCategoriesIntro}>
          <h2 className={styles.hireCategoriesTitle}>
            With CleverLN Pro, explore top talent and hire the best
            with confidence.
          </h2>

          <p className={styles.hireCategoriesDescription}>
            Evaluate candidates with data-driven insights and detailed
            reports. Hire the best talent and build stronger teams—faster.
          </p>
        </div>


        {/* =================================================
            CATEGORY CARDS
        ================================================= */}

        {categories.map((category) => (
          <div key={category.title} className={styles.hireCategoryCard}>
            <div className={styles.hireCategoryIcon}>
              <Image
                src={category.icon}
                alt=""
                width={40}
                height={40}
                className={styles.hireCategoryIconImage}
              />
            </div>

            <div>
              <h3 className={styles.hireCategoryTitle}>
                {category.title}
              </h3>

              <p className={styles.hireCategoryProfiles}>
                {category.profiles}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
