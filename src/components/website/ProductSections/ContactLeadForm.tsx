"use client";

import { useState } from "react";

import styles from "../ProductPageTemplate.module.css";

// "Want to know more?" green card with a three-step name / phone / email form.
// Shared by the course pages and Opportunities (styles live in ProductPageTemplate.module.css).
export default function ContactLeadForm() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      if (!name.trim()) {
        alert("Please enter your name");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!phone.trim()) {
        alert("Please enter your phone number");
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!email.trim()) {
        alert("Please enter your email");
        return;
      }

      setSubmitted(true);

      console.log({
        name,
        phone,
        email,
      });

      setTimeout(() => {
        setStep(1);
        setName("");
        setPhone("");
        setEmail("");
        setSubmitted(false);
      }, 10500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleNext();
  };

  return (
    <section className={styles.procontactSection}>
      <div className={styles.procontactContainer}>

        <div className={styles.procontactCard}>

          {/* LEFT CONTENT */}
          <div className={styles.procontactLeft}>

            <h2 className={styles.procontactTitle}>
              Want to know more?
            </h2>

            <h1 className={styles.procontactHeading}>
              Submit the form to get complete details.
            </h1>

            <p className={styles.procontactDescription}>
              Whether you have questions, need clarity, or are looking for the right
              direction, connect with our experts for the right guidance.
            </p>

          </div>

          {/* RIGHT FORM */}
          <div className={styles.procontactRight}>

            {!submitted ? (
              <>
                <div className={styles.procontactInputWrapper}>

                  {/* STEP 1 */}
                  {step === 1 && (
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={styles.procontactInput}
                    />
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <input
                      type="tel"
                      placeholder="Enter Your Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={styles.procontactInput}
                    />
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={styles.procontactInput}
                    />
                  )}

                  <button
                    onClick={handleNext}
                    className={styles.procontactButton}
                  >
                    {step === 3 ? "Submit" : "Next"}
                  </button>

                </div>

                {/* PROGRESS */}
                <div className={styles.procontactProgressWrapper}>
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className={`${styles.procontactProgressBar} ${step >= n ? styles.procontactProgressActive : ""}`}
                    />
                  ))}
                </div>

                <p className={styles.procontactResponseText}>
                  Get Response within 12 Hours
                </p>

              </>
            ) : (

              <div className={styles.procontactSuccessWrapper}>
                <p className={styles.procontactSuccessMessage}>
                  Thank you for taking the first step
                  <br />
                  toward becoming your best.
                </p>

                <p className={styles.procontactSuccessResponse}>
                  Get Response within 12 Hours
                </p>
              </div>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}
