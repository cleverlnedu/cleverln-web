"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./product.module.css";
import Image from "next/image";

export default function ProductPage() {


  /* =====================================================
  STATES
  ===================================================== */
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [submitted, setSubmitted] =
    useState(false);

  /* =====================================================
  NEXT BUTTON LOGIC
  ===================================================== */

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




  


const [activeFAQ, setActiveFAQ] =
  useState<number | null>(null);

const faqs = [
  {
    question:
      "Is technical support available if I encounter issues with the online platform?",
    answer:
      "Yes, our dedicated technical support team is available 24/7 to assist you with any platform-related issues. You can reach us via chat, email, or our support portal.",
  },
  {
    question:
      "Will I get practical projects during the course?",
    answer:
      "Yes, the program focuses on practical, hands-on learning so you can apply what you learn through real-world projects and use cases.",
  },
  {
    question:
      "Do I receive a certificate after completing the program?",
    answer:
      "Yes, you receive a certificate after successfully completing the required course and program activities.",
  },
  {
    question:
      "Can CleverLN help me with job opportunities after the course?",
    answer:
      "Yes, CleverLN provides access to career opportunities and job-related support to help you move forward after building your skills.",
  },
];



const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {

  if (e.key === "Enter") {

    handleNext();
  }
};




  return (
    <main className={styles.page}>
      
      {/* ================= HERO SECTION ================= */}
    <section className={styles.prohero}>
      <div className={styles.proheroContainer}>

        {/* LEFT CONTENT */}
        <div className={styles.proheroLeft}>

          <h1 className={styles.proheroHeading}>
            Learn UI/UX and build your skills through a modern, innovative approach.
          </h1>

          <p className={styles.proheroSubtext}>
            Learn UI/UX design through a practical, hands-on approach focused on
            applications and helps you understand user behavior, design intuitive
            interfaces, and work with industry tools like Figma.
          </p>

          <div className={styles.proheroButtons}>
            <button className={styles.proheroPrimaryBtn}>
              Enroll Now
            </button>

            <button className={styles.proheroSecondaryBtn}>
              Know More
            </button>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.proheroRight}>
          <div className={styles.proheroImageWrapper}>

            {/* DESKTOP IMAGE */}
            <Image
              src="/products/ui-ux complete course and internship.webp"
              alt="UI/UX course"
              fill
              priority
              className={styles.proheroDesktopImage}
            />

            {/* MOBILE IMAGE */}
            <Image
              src="/products/student-ambassador.webp"
              alt="UI/UX course"
              fill
              priority
              className={styles.proheroMobileImage}
            />

          </div>
        </div>

      </div>
    </section>







    {/* ================= TRUSTED LOGOS ================= */}
    <section className={styles.protrusted}>
      <div className={styles.protrustedContainer}>

        <p className={styles.protrustedText}>
          Join us, grow with us, and build your future with

        </p>

        <div className={styles.protrustedLogos}>

          <img
            src="/logos/dell.webp"
            alt="Rise"
          />

          <img
            src="/logos/host.webp"
            alt="Vertigo"
          />

          <img
            src="/logos/linkedin.webp"
            alt="Minty"
          />

          <img
            src="/logos/rpay.webp"
            alt="Glossy"
          />

          <img
            src="/logos/slack.webp"
            alt="Rise"
          />

          <img
            src="/logos/spotify.webp"
            alt="Waveless"
          />

        </div>

      </div>
    </section>





      {/* ================= IMPACT SECTION ================= */}
      <section className={styles.proimpactSection}>
        <div className={styles.proimpactContainer}>

          {/* TOP LABEL */}
          <p className={styles.proimpactTag}>
            WHAT THIS PROGRAM IS ABOUT
          </p>

          {/* MAIN HEADING */}
          <h2 className={styles.proimpactHeading}>
            Turn ideas into real impact with CleverLN.
          </h2>

          {/* SUBTEXT */}
          <p className={styles.proimpactSubHeading}>
            Build. Apply. Impact
          </p>

          {/* DESCRIPTION */}
          <p className={styles.proimpactDescription}>
            Bring your ideas to life with designs that are creative,
            intuitive, and user-focused.
            
            Where creativity meets usability.
          </p>

          {/* SMALL TEXT */}
          <p className={styles.proimpactSmallText}>
            Learn by building-weekly AI use cases inspired by real companies.
          </p>

          {/* COMPANY LOGOS */}
          <div className={styles.proimpactLogos}>

            <div className={styles.proimpactLogoItem}>
              <img
                src="/products/mmmiles.webp"
                alt="Miles"
              />
            </div>

            <div className={styles.proimpactLogoItem}>
              <img
                src="/products/redit.webp"
                alt="Reddit"
              />
            </div>

            <div className={styles.proimpactLogoItem}>
              <img
                src="/products/swiggy.webp"
                alt="Swiggy"
              />
            </div>

          </div>

          {/* FOOTER TEXT */}
          <p className={styles.proimpactFooter}>
            Learn from those who’ve built real AI systems and driven measurable growth.
          </p>

        </div>
      </section>










      {/* ================= STATS ================= */}
      <section className={styles.prostatsSection}>
        <div className={styles.prostatsContainer}>

          {/* LEFT CARD */}
          <div className={styles.prostatsCard}>

            <div className={styles.prostatsCardInner}>
              <h3>07+</h3>

              <p>YEARS OF EXPERIENCE</p>
            </div>

          </div>

          {/* CENTER CARD */}
          <div className={styles.prostatsCenterCard}>

            <div className={styles.prostatsCenterLeft}>
              <h2>20000+</h2>
            </div>

            <div className={styles.prostatsDivider}></div>

            <div className={styles.prostatsCenterRight}>

              <p>
                Jobs are Listed this year.
              </p>

              <p>
                Don’t wait <span>Start with CleverLN</span> and are you ready?
              </p>

            </div>

          </div>

          {/* RIGHT CARD */}
          <div className={styles.prostatsCard}>

            <h3>2K+</h3>

            <p>
              STUDENTS REGISTERED
            </p>

          </div>

        </div>
      </section>











    {/* ================= CONTACT SECTION ================= */}
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

                  <span
                    className={`${styles.procontactProgressBar} ${
                      step >= 1
                        ? styles.procontactProgressActive
                        : ""
                    }`}
                  />

                  <span
                    className={`${styles.procontactProgressBar} ${
                      step >= 2
                        ? styles.procontactProgressActive
                        : ""
                    }`}
                  />

                  <span
                    className={`${styles.procontactProgressBar} ${
                      step >= 3
                        ? styles.procontactProgressActive
                        : ""
                    }`}
                  />

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












    
<section className={styles.protoolsSection}>
  <div className={styles.protoolsContainer}>

    {/* ================= HEADING ================= */}
    <div className={styles.protoolsHeader}>
      <h2>
        Work with Industry Tools
      </h2>

      <p>
        Core Skills You’ll Build with CleverLN
      </p>
    </div>


    {/* ================= LOGOS ================= */}
        <div className={styles.protoolsLogos}>

          <img
            src="/tools/canva.png"
            alt="Canva"
          />

          <img
            src="/tools/figma.png"
            alt="Figma"
          />

          <img
            src="/tools/claude.png"
            alt="Claude"
          />

          <img
            src="/tools/adobe.png"
            alt="Adobe XD"
          />

          <img
            src="/tools/framer.png"
            alt="Framer"
          />

        </div>


        {/* ================= BROCHURE CARD ================= */}
        <div className={styles.protoolsBrochureCard}>

          {/* LEFT */}
          <div className={styles.protoolsBrochureLeft}>

            <h3>
              Access Course Brochure
            </h3>

            <p>
              Want to know more about the course? Click the download button to check it out.
            </p>

          </div>


          {/* RIGHT */}
          <button
            type="button"
            className={styles.protoolsBrochureButton}
          >
            Download Brochure
          </button>

        </div>

      </div>
    </section>




















      




{/* =========================================================
   FAQ SECTION
========================================================= */}

<section className={styles.profaqSection}>

  <div className={styles.profaqContainer}>

    {/* HEADER */}

    <div className={styles.profaqHeader}>

      <h2>
        Let’s Clear Things Up
      </h2>

      <p>
        Quick answers to help you move forward with confidence.
      </p>

    </div>


    {/* FAQ LIST */}

    <div className={styles.profaqList}>

      {faqs.map((faq, index) => {

        const isOpen = activeFAQ === index;

        return (
          <div
            key={index}
            className={`${styles.profaqItem} ${
              isOpen ? styles.profaqItemOpen : ""
            }`}
          >

            {/* QUESTION */}

            <button
              type="button"
              className={styles.profaqQuestion}
              onClick={() =>
                setActiveFAQ(
                  isOpen ? null : index
                )
              }
              aria-expanded={isOpen}
              aria-controls={`profaq-answer-${index}`}
            >

              <span className={styles.profaqQuestionText}>
                {faq.question}
              </span>

              <span
                className={`${styles.profaqIcon} ${
                  isOpen
                    ? styles.profaqIconOpen
                    : ""
                }`}
                aria-hidden="true"
              >
                <span className={styles.profaqChevron} />
              </span>

            </button>


            {/* ANSWER */}

            <div
              id={`profaq-answer-${index}`}
              className={`${styles.profaqAnswerWrapper} ${
                isOpen
                  ? styles.profaqAnswerWrapperOpen
                  : ""
              }`}
            >

              <div className={styles.profaqAnswer}>

                <p>
                  {faq.answer}
                </p>

              </div>

            </div>

          </div>
        );

      })}

    </div>

  </div>

</section>


















      </main>

  );
}




