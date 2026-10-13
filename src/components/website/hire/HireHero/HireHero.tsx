import styles from "./HireHero.module.css";

const places = ["Bangalore", "Coimbatore"];

export default function HireHero() {
  return (
    <section className={styles.hireHeroSection}>
      <div className={styles.hireHeroContainer}>

        <p className={styles.hireHeroEyebrow}>
          Got a vacancy? Hire smarter.
        </p>

        <h1 className={styles.hireHeroTitle}>
          Hire the <span>Perfect Fit</span>
        </h1>

        <p className={styles.hireHeroDescription}>
          Post jobs. Hire and Build Team — CleverLN.
        </p>


        {/* =================================================
            PLACE SELECT + POST JOBS
        ================================================= */}

        <div className={styles.hireHeroSearch}>

          <select
            className={styles.hireHeroSelect}
            aria-label="Select your place"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select your place
            </option>

            {places.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={styles.hireHeroButton}
          >
            Post Jobs
          </button>

        </div>

      </div>
    </section>
  );
}
